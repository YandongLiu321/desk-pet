import { beforeEach, describe, expect, it } from "vitest";
import { TaskService } from "../src/main/task-service.js";

function makeMockDb() {
	const tasks = [];
	return {
		tasks: [],
		_store: tasks,
		getTasks(filter) {
			if (filter?.status)
				return tasks.filter((t) => t.status === filter.status);
			return [...tasks];
		},
		getTaskById(id) {
			return tasks.find((t) => t.id === id);
		},
		createTask(data) {
			const task = {
				id: `task_${Date.now()}`,
				createdAt: new Date().toISOString(),
				status: "active",
				completedAt: null,
				subtasks: [],
				...data,
			};
			tasks.push(task);
			return task;
		},
		updateTask(id, partial) {
			const t = tasks.find((t) => t.id === id);
			if (!t) throw new Error(`Task not found: ${id}`);
			Object.assign(t, partial);
			return t;
		},
		toggleSubtask(id, subId) {
			const t = tasks.find((t) => t.id === id);
			if (!t) throw new Error(`Task not found: ${id}`);
			const s = t.subtasks.find((s) => s.id === subId);
			if (!s) throw new Error(`Subtask not found: ${subId}`);
			s.completed = !s.completed;
			return t;
		},
		completeTask(id) {
			const t = tasks.find((t) => t.id === id);
			if (!t) throw new Error(`Task not found: ${id}`);
			t.status = "completed";
			t.completedAt = new Date().toISOString();
			return t;
		},
		deleteTask(id) {
			const idx = tasks.findIndex((t) => t.id === id);
			if (idx !== -1) tasks.splice(idx, 1);
		},
	};
}

describe("TaskService", () => {
	let service, db;

	beforeEach(() => {
		db = makeMockDb();
		service = new TaskService(db);
	});

	describe("createTask", () => {
		it("requires realTitle and rpgTitle", () => {
			expect(() => service.createTask({})).toThrow(
				"realTitle and rpgTitle are required",
			);
		});

		it("creates a task with required fields", () => {
			const task = service.createTask({ realTitle: "Test", rpgTitle: "Quest" });
			expect(task.realTitle).toBe("Test");
			expect(task.rpgTitle).toBe("Quest");
			expect(task.status).toBe("active");
		});
	});

	describe("createFromAIResponse", () => {
		it("validates required fields", () => {
			expect(() => service.createFromAIResponse({})).toThrow("required fields");
		});

		it("creates task from valid AI payload with subtasks", () => {
			const task = service.createFromAIResponse({
				realTitle: "Buy groceries",
				rpgTitle: "Gather Provisions",
				rpgDescription: "Village needs supplies",
				estimatedPomodoros: 2,
				estimatedMinutes: 50,
				subtasks: [{ realDesc: "Milk", rpgDesc: "White Elixir" }],
			});
			expect(task.realTitle).toBe("Buy groceries");
			expect(task.subtasks).toHaveLength(1);
			expect(task.subtasks[0].id).toBeTruthy();
		});

		it("fills defaults for missing optional fields", () => {
			const task = service.createFromAIResponse({
				realTitle: "Simple task",
				rpgTitle: "Simple Quest",
			});
			expect(task.estimatedPomodoros).toBe(1);
			expect(task.estimatedMinutes).toBe(25);
			expect(task.subtasks).toEqual([]);
		});
	});

	describe("completeTask", () => {
		it("isFullyCompleted is true when no subtasks", () => {
			const task = service.createTask({ realTitle: "T", rpgTitle: "T" });
			const result = service.completeTask(task.id);
			expect(result.isFullyCompleted).toBe(true);
		});

		it("isFullyCompleted is false when subtasks not all done", () => {
			const task = service.createTask({
				realTitle: "T",
				rpgTitle: "T",
				subtasks: [
					{ id: "s1", realDesc: "a", rpgDesc: "a", completed: true },
					{ id: "s2", realDesc: "b", rpgDesc: "b", completed: false },
				],
			});
			const result = service.completeTask(task.id);
			expect(result.isFullyCompleted).toBe(false);
		});

		it("isFullyCompleted is true when all subtasks done", () => {
			const task = service.createTask({
				realTitle: "T",
				rpgTitle: "T",
				subtasks: [
					{ id: "s1", realDesc: "a", rpgDesc: "a", completed: true },
					{ id: "s2", realDesc: "b", rpgDesc: "b", completed: true },
				],
			});
			const result = service.completeTask(task.id);
			expect(result.isFullyCompleted).toBe(true);
		});
	});
});
