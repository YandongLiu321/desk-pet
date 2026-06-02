import { beforeEach, describe, expect, it, vi } from "vitest";
import { NarrativeEngine } from "../src/main/narrative-engine.js";

describe("NarrativeEngine", () => {
	let engine, mockLlm;

	beforeEach(() => {
		mockLlm = {
			chat: vi.fn(),
		};
		engine = new NarrativeEngine(mockLlm);
	});

	describe("buildSettlementPrompt", () => {
		it("includes task title and RPG title", () => {
			const prompt = engine.buildSettlementPrompt({
				realTitle: "Write report",
				rpgTitle: "Scribe the Chronicles",
				rpgDescription: "Record the events",
				subtasks: [
					{ realDesc: "Draft", rpgDesc: "First ink", completed: true },
				],
			});
			expect(prompt).toContain("Write report");
			expect(prompt).toContain("Scribe the Chronicles");
			expect(prompt).toContain("Draft");
		});
	});

	describe("generateFeedback", () => {
		it("returns narrative from LLM", async () => {
			mockLlm.chat.mockImplementation((_opts, onChunk, onDone) => {
				onChunk("Great ");
				onChunk("job!");
				onDone("Great job!");
			});

			const result = await engine.generateFeedback({
				realTitle: "Test",
				rpgTitle: "Quest",
				rpgDescription: "",
				subtasks: [],
			});

			expect(result.narrative).toBe("Great job!");
			expect(result.worldStateChanges).toEqual({ crystalIntegrity: 1 });
		});

		it("falls back on LLM error", async () => {
			mockLlm.chat.mockImplementation((_opts, _onChunk, _onDone, onError) => {
				onError({ type: "network", message: "fail" });
			});

			const result = await engine.generateFeedback({
				realTitle: "Test",
				rpgTitle: "Quest",
				rpgDescription: "",
				subtasks: [],
			});

			expect(result.narrative).toContain("Quest");
			expect(result.worldStateChanges).toBeUndefined();
		});
	});
});
