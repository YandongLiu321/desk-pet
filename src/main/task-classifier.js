const path = require("node:path");
const fs = require("node:fs");

/**
 * Keywords for mode classification.
 * Each entry is [keyword, weight] — higher weight = stronger signal.
 */
const MODE_KEYWORDS = {
	computer: [
		// Explicit computer tools
		["代码", 5], ["编程", 5], ["debug", 5], ["调试", 5],
		["开发", 5], ["写代码", 5], ["重构", 5],
		["网站", 4], ["应用", 3], ["app", 3], ["程序", 4],
		["页面", 3], ["组件", 3], ["接口", 3], ["api", 3],
		["前端", 5], ["后端", 5], ["数据库", 5], ["服务器", 5],
		["部署", 5], ["上线", 5], ["配置", 4], ["环境", 3],
		["git", 5], ["commit", 5], ["push", 5], ["pr", 4],
		// Documents / office
		["ppt", 5], ["幻灯片", 5], ["演示", 3],
		["excel", 5], ["表格", 4], ["数据", 2],
		["文档", 3], ["报告", 4], ["汇报", 3],
		["邮件", 4], ["email", 4],
		// Design / media
		["设计稿", 5], ["ui", 4], ["figma", 5], ["ps", 4],
		["剪辑", 5], ["视频", 3], ["修图", 4],
		// Search / research on computer
		["搜索", 2], ["查资料", 3], ["调研", 2], ["数据分析", 4],
		// Writing on computer (context: article/blog/copy)
		["写文章", 4], ["博客", 4], ["blog", 4], ["文案", 4],
	],
	reading: [
		// Explicit reading
		["看书", 5], ["读书", 5], ["阅读", 5], ["翻阅", 4],
		["看教材", 5], ["读论文", 5], ["看论文", 5],
		["看文献", 5], ["读文献", 5], ["文献", 3],
		["看资料", 3], ["翻资料", 3],
		// Learning / reviewing
		["复习", 4], ["预习", 4], ["学习", 2],
		["背单词", 5], ["背公式", 5], ["记忆", 3], ["背诵", 5],
		["掌握", 1], ["了解", 1], ["理解", 1],
		// Reading specific
		["教材", 4], ["课本", 4], ["论文", 3], ["章节", 2],
		["读", 2],
	],
	writing: [
		// Handwriting
		["手写", 5], ["练字", 5], ["抄写", 5], ["默写", 5],
		["写笔记", 5], ["整理笔记", 5], ["笔记", 2],
		// Exercises / homework
		["做题", 5], ["刷题", 5], ["习题", 5], ["试卷", 5],
		["作业", 4], ["练习", 3], ["题目", 3],
		// Drawing by hand
		["画草图", 5], ["手绘", 5], ["画图", 3], ["画", 1],
		["思维导图", 3],
		// Writing by hand
		["写作业", 5], ["写题", 5], ["写字", 4],
	],
};

/**
 * Classifies tasks into one of three modes based on semantic keyword analysis.
 * Results are stored in a separate JSON mapping file (not visible to the user).
 */
class TaskClassifier {
	/**
	 * @param {string} dataDir — path to the data/ directory
	 */
	constructor(dataDir) {
		this._path = path.join(dataDir, "task-mode-mapping.json");
		this._mapping = this._load();
	}

	/**
	 * Classify a task and persist the mapping.
	 * @param {import('./database').Task} task
	 * @param {'computer'|'reading'|'writing'|null} llmMode — LLM-provided mode hint (trusted)
	 * @returns {'computer'|'reading'|'writing'}
	 */
	classify(task, llmMode) {
		const mode = llmMode || this._analyzeKeywords(task);
		this._mapping[task.id] = mode;
		this._persist();
		return mode;
	}

	/**
	 * @param {string} taskId
	 * @returns {'computer'|'reading'|'writing'|null}
	 */
	getMode(taskId) {
		return this._mapping[taskId] || null;
	}

	/**
	 * @returns {{ [taskId]: 'computer'|'reading'|'writing' }}
	 */
	getAllMappings() {
		return { ...this._mapping };
	}

	// ── private ──

	_load() {
		try {
			if (fs.existsSync(this._path)) {
				return JSON.parse(fs.readFileSync(this._path, "utf-8"));
			}
		} catch { /* corrupt file → start fresh */ }
		return {};
	}

	_persist() {
		const dir = path.dirname(this._path);
		if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
		fs.writeFileSync(this._path, JSON.stringify(this._mapping, null, 2), "utf-8");
	}

	/**
	 * Score-based keyword analysis on the task's text content.
	 * @param {import('./database').Task} task
	 * @returns {'computer'|'reading'|'writing'}
	 */
	_analyzeKeywords(task) {
		// Build a combined text blob from all text fields
		const text = [
			task.realTitle || "",
			task.rpgTitle || "",
			task.rpgDescription || "",
			...(task.subtasks || []).map((s) => `${s.realDesc || ""} ${s.rpgDesc || ""}`),
		].join(" ").toLowerCase();

		const scores = { computer: 0, reading: 0, writing: 0 };

		for (const [mode, keywords] of Object.entries(MODE_KEYWORDS)) {
			for (const [keyword, weight] of keywords) {
				if (text.includes(keyword.toLowerCase())) {
					scores[mode] += weight;
				}
			}
		}

		// Find the mode with the highest score
		let bestMode = "computer"; // default fallback
		let bestScore = 0;
		for (const [mode, score] of Object.entries(scores)) {
			if (score > bestScore) {
				bestScore = score;
				bestMode = mode;
			}
		}

		return bestMode;
	}
}

module.exports = { TaskClassifier };
