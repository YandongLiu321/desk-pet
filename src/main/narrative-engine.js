class NarrativeEngine {
	/**
	 * @param {import('./llm-service').LLMService} llmService
	 */
	constructor(llmService) {
		this.llmService = llmService;
	}

	/**
	 * @param {import('./database').Task} task
	 * @returns {string}
	 */
	buildSettlementPrompt(task) {
		return [
			`用户刚刚完成了任务「${task.realTitle}」（RPG 化标题：「${task.rpgTitle}」）。`,
			`任务描述：${task.rpgDescription || "无"}`,
			`子任务完成情况：${(task.subtasks || []).map((s) => `${s.realDesc} ${s.completed ? "✅" : "❌"}`).join("，")}`,
			"",
			`请以角色的口吻，生成一段简短的任务完成叙事反馈（50-100 字），`,
			`称赞用户的努力，并将任务的完成关联到当前的世界状态（水晶完整性等）。`,
			`返回纯文本，不要包含 JSON。`,
		].join("\n");
	}

	/**
	 * @param {import('./database').Task} task
	 * @param {string} [completionType]
	 * @returns {Promise<{ narrative: string, worldStateChanges?: object }>}
	 */
	async generateFeedback(task, completionType = "on_time") {
		const prompt = this.buildSettlementPrompt(task);

		return new Promise((resolve, _reject) => {
			let fullText = "";

			this.llmService.chat(
				{ message: prompt },
				(chunk) => {
					fullText += chunk;
				},
				() => {
					resolve({
						narrative: fullText.trim(),
						worldStateChanges:
							completionType === "on_time"
								? { crystalIntegrity: 1 }
								: undefined,
					});
				},
				(_err) => {
					// fallback narrative on error
					resolve({
						narrative: `你完成了「${task.rpgTitle}」。星辰因你的努力而更加明亮~`,
						worldStateChanges: undefined,
					});
				},
			);
		});
	}
}

module.exports = { NarrativeEngine };
