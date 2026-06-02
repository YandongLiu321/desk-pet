/**
 * @typedef {import('./database').Task} Task
 * @typedef {import('./database').SubTask} SubTask
 */

class TaskService {
	/**
	 * @param {object} deps
	 * @param {import('./database').Database} deps.db
	 * @param {object} deps.worldBook
	 */
	constructor({ db, worldBook }) {
		this.db = db;
		this.worldBook = worldBook;
	}

	/** @param {Partial<Task>} data */
	createTask(data) {
		if (!data.realTitle || !data.realTitle.trim()) {
			throw new Error("TASK_CREATE_INVALID: realTitle is required");
		}
		return this.db.createTask(data);
	}

	/**
	 * Validates and creates a task from AI response payload.
	 * Auto-fills milestoneId from current chapter.
	 * @param {object} payload
	 * @returns {Task}
	 */
	createFromAIResponse(payload) {
		if (!payload.realTitle || !payload.rpgTitle) {
			throw new Error(
				"AI task payload missing required fields: realTitle, rpgTitle",
			);
		}

		// Auto-fill milestoneId from worldBook (config) + lowdb (progress)
		let milestoneId = null;
		const worldState = this.db.getWorldState();
		const chapter = this.worldBook.storyChapters?.find(
			(c) => c.chapterId === worldState.currentChapter,
		);
		if (chapter?.milestones?.length) {
			const mp = worldState.milestoneProgress || {};
			const next = chapter.milestones.find(
				(m) => (mp[m.id] || 0) < m.required,
			);
			if (next) milestoneId = next.id;
		}

		const taskData = {
			realTitle: payload.realTitle,
			rpgTitle: payload.rpgTitle,
			rpgDescription: payload.rpgDescription || "",
			estimatedPomodoros: payload.estimatedPomodoros || 1,
			estimatedMinutes: payload.estimatedMinutes || 25,
			deadline: payload.deadline || "",
			milestoneId,
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
	 * Completes a task. If all subtasks done, progresses milestone in lowdb worldState.
	 * @returns {{ task: Task, isFullyCompleted: boolean, milestoneProgress?: object }}
	 */
	completeTask(taskId) {
		const task = this.db.getTaskById(taskId);
		if (!task) throw new Error(`Task not found: ${taskId}`);

		const allSubtasksDone =
			task.subtasks.length === 0 ||
			task.subtasks.every((s) => s.completed);
		if (!allSubtasksDone) {
			return { task, isFullyCompleted: false };
		}

		const completedTask = this.db.completeTask(taskId);
		let milestoneProgress = null;

		// Milestone progression — persist to lowdb, NOT to worldBook (read-only config)
		if (task.milestoneId) {
			const worldState = this.db.getWorldState();
			const chapter = this.worldBook.storyChapters?.find(
				(c) => c.chapterId === worldState.currentChapter,
			);
			const milestone = chapter?.milestones?.find(
				(m) => m.id === task.milestoneId,
			);

			if (milestone) {
				const mp = worldState.milestoneProgress || {};
				const prev = mp[task.milestoneId] || 0;
				const next = prev + 1;
				const newMp = { ...mp, [task.milestoneId]: next };
				this.db.updateWorldState({ milestoneProgress: newMp });

				milestoneProgress = {
					milestoneId: milestone.id,
					progress: next,
					required: milestone.required,
				};

				// Chapter advancement check
				if (chapter.milestones.length > 0) {
					const allDone = chapter.milestones.every(
						(m) => (newMp[m.id] || 0) >= m.required,
					);
					if (allDone) {
						this.db.updateWorldState({
							currentChapter: worldState.currentChapter + 1,
						});
					}
				}
			}
		}

		// Update world variables
		const vars = this.db.getWorldState().variables || {};
		this.db.updateWorldState({
			variables: {
				...vars,
				crystalIntegrity: (vars.crystalIntegrity || 0) + 2,
			},
		});

		return { task: this.db.getTaskById(taskId), isFullyCompleted: true, milestoneProgress };
	}

	deleteTask(taskId) {
		this.db.deleteTask(taskId);
	}
}

module.exports = { TaskService };
