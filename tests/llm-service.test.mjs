import { beforeEach, describe, expect, it, vi } from "vitest";

// mock fetch before importing the module under test
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

const { LLMService } = await import("../src/main/llm-service.js");

function makeMockDb() {
	return {
		getCharacter: () => ({ id: "luna_moonwhisper", currentMood: "gentle" }),
		getAppState: () => ({ currentMode: "pet", apiKey: "sk-test" }),
		getRelationship: () => ({
			stage: "acquaintance",
			totalTasksCompleted: 3,
			totalConversations: 5,
			totalPomodoros: 0,
		}),
		getWorldState: () => ({ currentChapter: 1 }),
		getActiveConversation: () => ({ id: "conv_1", messages: [] }),
		getRecentMessages: () => [],
		getTasks: () => [],
		addMessage: vi.fn(),
		updateCharacter: vi.fn(),
		updateRelationship: vi.fn(),
	};
}

const mockWorldBook = {
	title: "埃瑟利亚大陆",
	description: "一个由魔法与蒸汽科技共存的世界。",
	rules: ["魔法需要消耗生命力或魔晶"],
	character: {
		name: "露娜·月语",
		background: "最后一支星语者部族的幸存者",
		personality: "温柔、坚强",
		speechStyle: "习惯使用星辰比喻",
	},
	storyChapters: [{ chapterId: 1, title: "觉醒的星辰" }],
};

describe("LLMService", () => {
	let service, db;

	beforeEach(() => {
		mockFetch.mockReset();
		db = makeMockDb();
		service = new LLMService({
			apiKey: "sk-test",
			db,
			worldBook: mockWorldBook,
		});
	});

	describe("buildSystemPrompt", () => {
		it("includes character name and world title", () => {
			const prompt = service.buildSystemPrompt({ currentMode: "pet" });
			expect(prompt).toContain("露娜·月语");
			expect(prompt).toContain("埃瑟利亚大陆");
			expect(prompt).toContain("最后一支星语者部族的幸存者");
		});

		it("includes relationship stage and task count", () => {
			const prompt = service.buildSystemPrompt({ currentMode: "pet" });
			expect(prompt).toContain("acquaintance");
			expect(prompt).toContain("3");
		});

		it("includes active task title when provided", () => {
			const prompt = service.buildSystemPrompt({
				currentMode: "pet",
				activeTask: { realTitle: "Learn Vue" },
			});
			expect(prompt).toContain("Learn Vue");
		});

		it("includes task conversion JSON format", () => {
			const prompt = service.buildSystemPrompt({ currentMode: "pet" });
			expect(prompt).toContain("create_task");
		});
	});

	describe("chat", () => {
		it("calls DeepSeek API with correct parameters", async () => {
			const readable = new ReadableStream({
				start(controller) {
					controller.enqueue(
						new TextEncoder().encode(
							'data: {"choices":[{"delta":{"content":"Hello"}}]}\n\n',
						),
					);
					controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
					controller.close();
				},
			});

			mockFetch.mockResolvedValueOnce({
				ok: true,
				body: readable,
			});

			const chunks = [];
			let doneData = null;

			await service.chat(
				{ message: "Hi" },
				(c) => chunks.push(c),
				(full, meta) => {
					doneData = { full, meta };
				},
				vi.fn(),
			);

			expect(chunks).toEqual(["Hello"]);
			expect(doneData.full).toBe("Hello");
			expect(mockFetch).toHaveBeenCalledTimes(1);
			const [url, init] = mockFetch.mock.calls[0];
			expect(url).toContain("deepseek.com");
			expect(init.headers.Authorization).toBe("Bearer sk-test");
			expect(init.body).toContain("Hi");
			expect(init.body).toContain("deepseek-chat");
			expect(init.body).toContain('"stream":true');
		});

		it("retries once on network error, then calls onError", async () => {
			mockFetch.mockRejectedValue(new Error("ECONNREFUSED"));

			const onError = vi.fn();
			await service.chat({ message: "Hi" }, vi.fn(), vi.fn(), onError);

			expect(mockFetch).toHaveBeenCalledTimes(2);
			expect(onError).toHaveBeenCalledTimes(1);
			expect(onError.mock.calls[0][0]).toMatchObject({
				type: "network",
				retried: true,
			});
		});

		it("does not retry on 4xx API error", async () => {
			mockFetch.mockResolvedValueOnce({ ok: false, status: 401 });

			const onError = vi.fn();
			await service.chat({ message: "Hi" }, vi.fn(), vi.fn(), onError);

			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(onError.mock.calls[0][0]).toMatchObject({
				type: "api",
				retried: false,
			});
		});

		it("extracts task intent from response", async () => {
			const taskJson = JSON.stringify({
				intent: "create_task",
				realTask: "Buy groceries",
				rpgTitle: "Gather Provisions",
				rpgDescription: "The village needs supplies",
				estimatedPomodoros: 2,
				estimatedMinutes: 50,
				subtasks: [{ realDesc: "Milk", rpgDesc: "White Elixir" }],
			});

			const readable = new ReadableStream({
				start(controller) {
					const escapedJson = taskJson.replace(/"/g, '\\"');
					controller.enqueue(
						new TextEncoder().encode(
							`data: {"choices":[{"delta":{"content":"${escapedJson}"}}]}\n\n`,
						),
					);
					controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
					controller.close();
				},
			});

			mockFetch.mockResolvedValueOnce({ ok: true, body: readable });

			const onDone = vi.fn();
			await service.chat(
				{ message: "I need to buy groceries" },
				vi.fn(),
				onDone,
				vi.fn(),
			);

			expect(onDone.mock.calls[0][1]).toMatchObject({
				intent: "create_task",
				taskPayload: expect.objectContaining({
					realTitle: "Buy groceries",
					rpgTitle: "Gather Provisions",
				}),
			});
		});

		it("returns empty metadata for plain text without task intent", async () => {
			const readable = new ReadableStream({
				start(controller) {
					controller.enqueue(
						new TextEncoder().encode(
							'data: {"choices":[{"delta":{"content":"Hello there"}}]}\n\n',
						),
					);
					controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
					controller.close();
				},
			});

			mockFetch.mockResolvedValueOnce({ ok: true, body: readable });

			const onDone = vi.fn();
			await service.chat({ message: "Hi" }, vi.fn(), onDone, vi.fn());

			expect(onDone.mock.calls[0][1]).toEqual({});
		});

		it("saves user and assistant messages on completion", async () => {
			const readable = new ReadableStream({
				start(controller) {
					controller.enqueue(
						new TextEncoder().encode(
							'data: {"choices":[{"delta":{"content":"Hey"}}]}\n\n',
						),
					);
					controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
					controller.close();
				},
			});

			mockFetch.mockResolvedValueOnce({ ok: true, body: readable });

			await service.chat({ message: "Hi" }, vi.fn(), vi.fn(), vi.fn());

			expect(db.addMessage).toHaveBeenCalledTimes(2);
			expect(db.addMessage.mock.calls[0][1]).toMatchObject({
				role: "user",
				content: "Hi",
			});
			expect(db.addMessage.mock.calls[1][1]).toMatchObject({
				role: "assistant",
				content: "Hey",
			});
		});
	});
});
