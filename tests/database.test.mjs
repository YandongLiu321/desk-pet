import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Database } from "../src/main/database.js";

function tmpDbPath() {
	return path.join(
		os.tmpdir(),
		`desk-pet-test-${Date.now()}-${Math.random().toString(36).slice(2)}.json`,
	);
}

function cleanup(filePath) {
	try {
		fs.unlinkSync(filePath);
	} catch {}
}

describe("Database", () => {
	let dbPath, db;

	beforeEach(() => {
		dbPath = tmpDbPath();
		db = new Database(dbPath);
	});

	afterEach(() => {
		cleanup(dbPath);
	});

	describe("appState", () => {
		it("returns defaults when file does not exist", () => {
			const state = db.getAppState();
			expect(state.currentMode).toBe("pet");
			expect(state.apiKey).toBe("");
		});

		it("updateAppState merges and returns", () => {
			const updated = db.updateAppState({ currentMode: "wallpaper" });
			expect(updated.currentMode).toBe("wallpaper");
			expect(db.getAppState().currentMode).toBe("wallpaper");
		});

		it("persists across reload", () => {
			db.updateAppState({ currentMode: "software" });
			const db2 = new Database(dbPath);
			expect(db2.getAppState().currentMode).toBe("software");
		});
	});

	describe("tasks", () => {
		it("getTasks returns empty array by default", () => {
			expect(db.getTasks()).toEqual([]);
		});

		it("createTask generates id and createdAt", () => {
			const task = db.createTask({ realTitle: "Test", rpgTitle: "Quest" });
			expect(task.id).toMatch(/^task_/);
			expect(task.createdAt).toBeTruthy();
			expect(task.status).toBe("active");
			expect(task.subtasks).toEqual([]);
		});

		it("getTasks can filter by status", () => {
			db.createTask({ realTitle: "A", rpgTitle: "A" });
			const t2 = db.createTask({ realTitle: "B", rpgTitle: "B" });
			db.completeTask(t2.id);
			expect(db.getTasks({ status: "active" })).toHaveLength(1);
			expect(db.getTasks({ status: "completed" })).toHaveLength(1);
		});

		it("getTaskById finds or returns undefined", () => {
			const t = db.createTask({ realTitle: "X", rpgTitle: "X" });
			expect(db.getTaskById(t.id).realTitle).toBe("X");
			expect(db.getTaskById("nonexistent")).toBeUndefined();
		});

		it("updateTask merges partial", () => {
			const t = db.createTask({ realTitle: "Old", rpgTitle: "Old" });
			const updated = db.updateTask(t.id, { realTitle: "New" });
			expect(updated.realTitle).toBe("New");
			expect(updated.rpgTitle).toBe("Old");
		});

		it("updateTask throws for unknown id", () => {
			expect(() => db.updateTask("bad_id", {})).toThrow("Task not found");
		});

		it("deleteTask removes task", () => {
			const t = db.createTask({ realTitle: "Del", rpgTitle: "Del" });
			db.deleteTask(t.id);
			expect(db.getTasks()).toHaveLength(0);
		});

		it("toggleSubtask flips completed", () => {
			const t = db.createTask({
				realTitle: "T",
				rpgTitle: "T",
				subtasks: [
					{ id: "s1", realDesc: "Sub1", rpgDesc: "Sub1", completed: false },
				],
			});
			const result = db.toggleSubtask(t.id, "s1");
			expect(result.subtasks[0].completed).toBe(true);
			db.toggleSubtask(t.id, "s1");
			expect(db.getTaskById(t.id).subtasks[0].completed).toBe(false);
		});

		it("toggleSubtask throws for unknown task or subtask", () => {
			expect(() => db.toggleSubtask("bad", "s1")).toThrow("Task not found");
			const t = db.createTask({ realTitle: "T", rpgTitle: "T" });
			expect(() => db.toggleSubtask(t.id, "bad")).toThrow("Subtask not found");
		});

		it("completeTask sets status and completedAt", () => {
			const t = db.createTask({ realTitle: "C", rpgTitle: "C" });
			const result = db.completeTask(t.id);
			expect(result.status).toBe("completed");
			expect(result.completedAt).toBeTruthy();
		});

		it("completeTask throws for unknown id", () => {
			expect(() => db.completeTask("bad")).toThrow("Task not found");
		});
	});

	describe("character", () => {
		it("getCharacter returns default", () => {
			expect(db.getCharacter().id).toBe("luna_moonwhisper");
		});

		it("updateCharacter merges fields", () => {
			db.updateCharacter({ currentMood: "happy" });
			expect(db.getCharacter().currentMood).toBe("happy");
		});
	});

	describe("relationship", () => {
		it("getRelationship returns default", () => {
			expect(db.getRelationship().stage).toBe("acquaintance");
		});

		it("updateRelationship merges fields", () => {
			db.updateRelationship({ totalTasksCompleted: 5 });
			expect(db.getRelationship().totalTasksCompleted).toBe(5);
		});
	});

	describe("worldState", () => {
		it("getWorldState returns default", () => {
			expect(db.getWorldState().currentChapter).toBe(1);
		});

		it("updateWorldState merges fields", () => {
			db.updateWorldState({ currentChapter: 2 });
			expect(db.getWorldState().currentChapter).toBe(2);
		});
	});

	describe("conversations", () => {
		it("getActiveConversation creates one if none exists", () => {
			const conv = db.getActiveConversation();
			expect(conv.id).toMatch(/^conv_/);
			expect(conv.messages).toEqual([]);
		});

		it("returns existing active conversation", () => {
			const c1 = db.getActiveConversation();
			const c2 = db.getActiveConversation();
			expect(c2.id).toBe(c1.id);
		});

		it("addMessage appends and returns", () => {
			const conv = db.getActiveConversation();
			const msg = db.addMessage(conv.id, { role: "user", content: "hello" });
			expect(msg.role).toBe("user");
			expect(msg.content).toBe("hello");
			expect(msg.timestamp).toBeTruthy();
		});

		it("addMessage throws for unknown conversation", () => {
			expect(() =>
				db.addMessage("bad", { role: "user", content: "hi" }),
			).toThrow("Conversation not found");
		});

		it("getRecentMessages returns limited results", () => {
			const conv = db.getActiveConversation();
			db.addMessage(conv.id, { role: "user", content: "1" });
			db.addMessage(conv.id, { role: "assistant", content: "2" });
			db.addMessage(conv.id, { role: "user", content: "3" });
			const recent = db.getRecentMessages(conv.id, 2);
			expect(recent).toHaveLength(2);
			expect(recent[0].content).toBe("2");
			expect(recent[1].content).toBe("3");
		});

		it("getRecentMessages returns empty for unknown conversation", () => {
			expect(db.getRecentMessages("bad", 10)).toEqual([]);
		});
	});

	describe("apiKey", () => {
		it("getApiKey returns empty string by default", () => {
			expect(db.getApiKey()).toBe("");
		});

		it("setApiKey stores and getApiKey retrieves", () => {
			db.setApiKey("sk-test-123");
			expect(db.getApiKey()).toBe("sk-test-123");
		});
	});
});
