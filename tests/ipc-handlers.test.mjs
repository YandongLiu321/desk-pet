import { beforeEach, describe, expect, it, vi } from "vitest";
import { registerIpcHandlers } from "../src/main/ipc-handlers.js";

function makeMockDeps() {
	return {
		ipcMain: { handle: vi.fn() },
		BrowserWindow: {
			fromWebContents: () => ({
				isDestroyed: () => false,
				webContents: { send: vi.fn() },
			}),
		},
	};
}

function makeMockServices() {
	return {
		db: {
			getActiveConversation: () => ({
				id: "c1",
				messages: [{ role: "user", content: "hi" }],
			}),
			getAppState: () => ({
				currentMode: "pet",
				wallpaperSettings: { opacity: 0.8 },
			}),
			getCharacter: () => ({ id: "luna", currentMood: "gentle" }),
			getRelationship: () => ({
				stage: "acquaintance",
				totalTasksCompleted: 3,
			}),
			updateAppState: vi.fn(),
			setApiKey: vi.fn(),
			getApiKey: () => "sk-test",
		},
		windowManager: {
			switchMode: vi.fn(),
			getCurrentWindow: () => ({
				hide: vi.fn(),
				isDestroyed: () => false,
				webContents: { send: vi.fn() },
			}),
			getCurrentMode: () => "pet",
		},
		llmService: {
			chat: vi.fn(),
			abort: vi.fn(),
		},
		taskService: {
			getActiveTasks: () => [{ id: "t1", realTitle: "Test" }],
			getAllTasks: () => [
				{ id: "t1", realTitle: "Test" },
				{ id: "t2", realTitle: "Done", status: "completed" },
			],
			getTaskById: (id) =>
				id === "t1" ? { id: "t1", realTitle: "Test" } : undefined,
			createTask: vi.fn(() => ({ id: "new_t1", realTitle: "New" })),
			updateTask: vi.fn((id) => ({ id, realTitle: "Updated" })),
			toggleSubtask: vi.fn(() => ({
				id: "t1",
				subtasks: [{ id: "s1", completed: true }],
			})),
			completeTask: vi.fn(() => ({
				task: { id: "t1", status: "completed" },
				isFullyCompleted: true,
			})),
			deleteTask: vi.fn(),
		},
		relationshipService: {
			incrementStat: vi.fn(),
			checkAndUpgrade: vi.fn(() => ({ upgraded: false })),
		},
		pomodoroService: {
			start: vi.fn(),
			stop: vi.fn(),
			isRunning: () => false,
			getRemaining: () => null,
			getCurrentTaskId: () => null,
		},
	};
}

describe("IPC Handlers", () => {
	let services, deps;

	function getHandler(channel) {
		const call = deps.ipcMain.handle.mock.calls.find((c) => c[0] === channel);
		if (!call)
			throw new Error(`Handler not registered for channel: ${channel}`);
		return call[1];
	}

	beforeEach(() => {
		deps = makeMockDeps();
		services = makeMockServices();
		registerIpcHandlers(services, deps);
	});

	it("registers all expected channels", () => {
		const channels = deps.ipcMain.handle.mock.calls.map((c) => c[0]);
		expect(channels).toContain("conversation:send");
		expect(channels).toContain("task:create");
		expect(channels).toContain("task:complete");
		expect(channels).toContain("app:switch-mode");
		expect(channels).toContain("pomodoro:start");
		expect(channels).toContain("settings:get-api-key");
	});

	describe("task:create", () => {
		it("returns error for invalid data", async () => {
			const handler = getHandler("task:create");
			const result = await handler({}, { data: {} });
			expect(result.ok).toBe(false);
			expect(result.error.code).toBe("TASK_CREATE_INVALID");
		});

		it("creates task with valid data", async () => {
			const handler = getHandler("task:create");
			const result = await handler(
				{},
				{ data: { realTitle: "T", rpgTitle: "Q" } },
			);
			expect(result.ok).toBe(true);
			expect(services.taskService.createTask).toHaveBeenCalled();
		});
	});

	describe("task:get-by-id", () => {
		it("returns TASK_NOT_FOUND for unknown id", async () => {
			const handler = getHandler("task:get-by-id");
			const result = await handler({}, { taskId: "bad" });
			expect(result.ok).toBe(false);
			expect(result.error.code).toBe("TASK_NOT_FOUND");
		});

		it("returns task for valid id", async () => {
			const handler = getHandler("task:get-by-id");
			const result = await handler({}, { taskId: "t1" });
			expect(result.ok).toBe(true);
			expect(result.data.realTitle).toBe("Test");
		});
	});

	describe("app:switch-mode", () => {
		it("rejects invalid mode", async () => {
			const handler = getHandler("app:switch-mode");
			const result = await handler({}, { mode: "invalid" });
			expect(result.ok).toBe(false);
			expect(result.error.code).toBe("MODE_INVALID");
		});

		it("switches to valid mode", async () => {
			const handler = getHandler("app:switch-mode");
			const result = await handler({}, { mode: "wallpaper" });
			expect(result.ok).toBe(true);
			expect(services.windowManager.switchMode).toHaveBeenCalledWith(
				"wallpaper",
			);
		});
	});

	describe("settings:get-api-key", () => {
		it("returns api key", async () => {
			const handler = getHandler("settings:get-api-key");
			const result = await handler();
			expect(result.ok).toBe(true);
			expect(result.data.apiKey).toBe("sk-test");
		});
	});

	describe("window:hide", () => {
		it("hides current window", async () => {
			const handler = getHandler("window:hide");
			const result = await handler();
			expect(result.ok).toBe(true);
		});
	});

	describe("conversation:abort", () => {
		it("calls llmService abort", async () => {
			const handler = getHandler("conversation:abort");
			const result = await handler();
			expect(result.ok).toBe(true);
			expect(services.llmService.abort).toHaveBeenCalled();
		});
	});
});
