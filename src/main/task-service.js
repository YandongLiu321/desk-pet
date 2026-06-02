/**
 * @typedef {import('./database').Task} Task
 * @typedef {import('./database').SubTask} SubTask
 */

class TaskService {
	/**
	 * @param {import('./database').Database} db
	 */
	constructor(db) {
		this.db = db;
	}

	/** @param {Partial<Task>} data */
	createTask(data) {
		if (!data.realTitle || !data.rpgTitle) {
			throw new Error("realTitle and rpgTitle are required");
		}
		return this.db.createTask(data);
	}

	/**
	 * Validates and creates a task from AI response payload.
	 * @param {object} payload
	 * @returns {Task}
	 */
	createFromAIResponse(payload) {
		if (!payload.realTitle || !payload.rpgTitle) {
			throw new Error(
				"AI task payload missing required fields: realTitle, rpgTitle",
			);
		}
		const taskData = {
			realTitle: payload.realTitle,
			rpgTitle: payload.rpgTitle,
			rpgDescription: payload.rpgDescription || "",
			estimatedPomodoros: payload.estimatedPomodoros || 1,
			estimatedMinutes: payload.estimatedMinutes || 25,
			deadline: payload.deadline || "",
			subtasks: (payload.subtasks || []).map((s, i) => ({
				id: s.id || `sub_${Date.now()}_${i}`,
				realDesc: s.realDesc || "",
				rpgDesc: s.rpgDesc || "",
				completed: s.completed || false,
			})),
		};
		return this.db.createTask(taskData);
	}

	/** @returns {Task[]} */
	getActiveTasks() {
		return this.db.getTasks({ status: "active" });
	}

	/** @returns {Task[]} */
	getAllTasks() {
		return this.db.getTasks();
	}

	/** @param {string} taskId */
	getTaskById(taskId) {
		return this.db.getTaskById(taskId);
	}

	updateTask(taskId, partial) {
		return this.db.updateTask(taskId, partial);
	}

	toggleSubtask(taskId, subId) {
		return this.db.toggleSubtask(taskId, subId);
	}

	/**
	 * Completes a task and checks if all subtasks are done.
	 * @returns {{ task: Task, isFullyCompleted: boolean }}
	 */
	completeTask(taskId) {
		const task = this.db.completeTask(taskId);
		const allSubtasksDone =
			task.subtasks.length === 0 || task.subtasks.every((s) => s.completed);
		return { task, isFullyCompleted: allSubtasksDone };
	}

	deleteTask(taskId) {
		this.db.deleteTask(taskId);
	}
}

module.exports = { TaskService };
