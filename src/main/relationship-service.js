/**
 * @typedef {'stranger'|'acquaintance'|'familiar'|'close'|'soulmate'} RelStage
 */

const STAGE_ORDER = [
	"stranger",
	"acquaintance",
	"familiar",
	"close",
	"soulmate",
];

/** @type {Record<string, Partial<{tasksCompleted: number, pomodoros: number, consecutiveDays: number}>>} */
const THRESHOLDS = {
	stranger_to_acquaintance: { tasksCompleted: 1 },
	acquaintance_to_familiar: { tasksCompleted: 5, pomodoros: 10 },
	familiar_to_close: { tasksCompleted: 15, pomodoros: 30, consecutiveDays: 7 },
	close_to_soulmate: { tasksCompleted: 30, pomodoros: 60, consecutiveDays: 30 },
};

class RelationshipService {
	/**
	 * @param {import('./database').Database} db
	 */
	constructor(db) {
		this.db = db;
	}

	/** @returns {RelStage} */
	getCurrentStage() {
		return /** @type {RelStage} */ (this.db.getRelationship().stage);
	}

	/**
	 * @param {'tasksCompleted'|'pomodoros'|'conversations'} stat
	 * @returns {object}
	 */
	incrementStat(stat) {
		const rel = this.db.getRelationship();
		const mapping = {
			tasksCompleted: "totalTasksCompleted",
			pomodoros: "totalPomodoros",
			conversations: "totalConversations",
		};
		const field = mapping[stat] || stat;
		const newValue = (rel[field] || 0) + 1;
		return this.db.updateRelationship({ [field]: newValue });
	}

	/** @returns {{ upgraded: boolean, from?: RelStage, to?: RelStage }} */
	checkAndUpgrade() {
		const rel = this.db.getRelationship();
		const currentIdx = STAGE_ORDER.indexOf(rel.stage);
		if (currentIdx === -1 || currentIdx >= STAGE_ORDER.length - 1) {
			return { upgraded: false };
		}

		const nextStage = STAGE_ORDER[currentIdx + 1];
		const key = `${rel.stage}_to_${nextStage}`;
		const threshold = THRESHOLDS[key];
		if (!threshold) return { upgraded: false };

		const meetsThreshold =
			(threshold.tasksCompleted === undefined ||
				rel.totalTasksCompleted >= threshold.tasksCompleted) &&
			(threshold.pomodoros === undefined ||
				rel.totalPomodoros >= threshold.pomodoros) &&
			(threshold.consecutiveDays === undefined ||
				rel.consecutiveDays >= threshold.consecutiveDays);

		if (meetsThreshold) {
			const fromStage = rel.stage;
			this.db.updateRelationship({ stage: nextStage });
			return { upgraded: true, from: fromStage, to: /** @type {RelStage} */ (nextStage) };
		}

		return { upgraded: false };
	}

	touchLastInteraction() {
		return this.db.updateRelationship({
			lastInteractionAt: new Date().toISOString(),
		});
	}

	/** @returns {number} */
	updateConsecutiveDays() {
		const rel = this.db.getRelationship();
		const last = rel.lastInteractionAt ? new Date(rel.lastInteractionAt) : null;
		const now = new Date();
		const current = rel.consecutiveDays || 0;

		if (!last) {
			return this.db.updateRelationship({ consecutiveDays: 1 }).consecutiveDays;
		}

		const diffMs = now.getTime() - last.getTime();
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

		if (diffDays <= 1) {
			// same or next day
			const newDays = diffDays === 0 ? current : current + 1;
			return this.db.updateRelationship({ consecutiveDays: newDays })
				.consecutiveDays;
		} else {
			return this.db.updateRelationship({ consecutiveDays: 1 }).consecutiveDays;
		}
	}
}

module.exports = { RelationshipService };
