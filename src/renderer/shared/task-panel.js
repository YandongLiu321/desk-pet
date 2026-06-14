class TaskPanel {
	/**
	 * @param {HTMLElement} container
	 * @param {{ compact?: boolean, onToggle?: (taskId: string, subId: string) => void, onViewDetail?: (taskId: string) => void }} options
	 */
	constructor(container, options = {}) {
		this.container = container;
		this.compact = options.compact || false;
		this.onToggle = options.onToggle || (() => {});
		this.onViewDetail = options.onViewDetail || (() => {});
		this._tasks = [];
	}

	mount() {
		this.container.innerHTML = "";
		this.container.style.flexDirection = "column";
		this.container.style.gap = "var(--space-xs)";
		this.container.style.overflowY = "auto";
		this.container.style.padding = "var(--space-xs)";
		this._listEl = document.createElement("div");
		this._listEl.className = "task-list";
		this.container.appendChild(this._listEl);
	}

	/** @param {Array<object>} tasks */
	setTasks(tasks) {
		this._tasks = tasks || [];
		this.refresh();
	}

	refresh() {
		if (!this._listEl) return;
		this._listEl.innerHTML = "";

		if (this._tasks.length === 0) {
			const empty = document.createElement("div");
			empty.style.cssText =
				"color:var(--color-text-muted);font-size:var(--font-sm);text-align:center;padding:var(--space-md);";
			empty.textContent = "暂无任务，和柚子说说你想做什么吧~";
			this._listEl.appendChild(empty);
			return;
		}

		for (const task of this._tasks) {
			const el = this._renderTask(task);
			this._listEl.appendChild(el);
		}
	}

	/** @param {object} task */
	_renderTask(task) {
		const item = document.createElement("div");
		item.className = `task-item ${task.status === "completed" ? "task-item--done" : ""}`;
		item.style.cssText = `background:var(--color-bg-medium);border-radius:var(--radius-sm);padding:var(--space-sm);font-size:var(--font-sm);cursor:pointer;`;

		const header = document.createElement("div");
		header.style.cssText =
			"display:flex;justify-content:space-between;align-items:center;";

		const title = document.createElement("span");
		title.textContent = this.compact
			? task.rpgTitle
			: `${task.rpgTitle} (${task.realTitle})`;
		title.style.cssText = `color:var(--color-text-primary);${task.status === "completed" ? "text-decoration:line-through;color:var(--color-text-muted);" : ""}`;

		const status = document.createElement("span");
		status.textContent =
			task.status === "completed"
				? "✓"
				: `${task.subtasks?.filter((s) => s.completed).length || 0}/${task.subtasks?.length || 0}`;
		status.style.cssText = `font-size:var(--font-xs);color:${task.status === "completed" ? "var(--color-success)" : "var(--color-text-muted)"};`;

		header.appendChild(title);
		header.appendChild(status);
		item.appendChild(header);

		if (!this.compact && task.subtasks?.length > 0) {
			const subList = document.createElement("div");
			subList.style.cssText =
				"margin-top:var(--space-xs);padding-left:var(--space-md);";
			for (const sub of task.subtasks) {
				const subEl = document.createElement("div");
				subEl.style.cssText = `display:flex;align-items:center;gap:var(--space-xs);padding:2px 0;font-size:var(--font-xs);color:${sub.completed ? "var(--color-text-muted)" : "var(--color-text-secondary)"};`;
				const cb = document.createElement("input");
				cb.type = "checkbox";
				cb.checked = sub.completed;
				cb.style.cssText = "accent-color:var(--color-primary);";
				cb.addEventListener("change", () => this.onToggle(task.id, sub.id));
				subEl.appendChild(cb);
				subEl.appendChild(document.createTextNode(sub.rpgDesc || sub.realDesc));
				subList.appendChild(subEl);
			}
			item.appendChild(subList);
		}

		item.addEventListener("click", (e) => {
			if (e.target.tagName !== "INPUT") this.onViewDetail(task.id);
		});

		return item;
	}
}

window.TaskPanel = TaskPanel;
