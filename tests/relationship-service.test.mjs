import { beforeEach, describe, expect, it } from "vitest";
import { RelationshipService } from "../src/main/relationship-service.js";

function makeMockDb() {
	const data = {
		relationship: {
			characterId: "luna_moonwhisper",
			stage: "acquaintance",
			totalTasksCompleted: 0,
			totalPomodoros: 0,
			totalConversations: 0,
			consecutiveDays: 1,
			lastInteractionAt: new Date().toISOString(),
		},
	};
	return {
		getRelationship() {
			return { ...data.relationship };
		},
		updateRelationship(partial) {
			Object.assign(data.relationship, partial);
			return { ...data.relationship };
		},
	};
}

describe("RelationshipService", () => {
	let service;

	beforeEach(() => {
		service = new RelationshipService(makeMockDb());
	});

	describe("getCurrentStage", () => {
		it("returns current relationship stage", () => {
			expect(service.getCurrentStage()).toBe("acquaintance");
		});
	});

	describe("incrementStat", () => {
		it("increments tasksCompleted", () => {
			const rel = service.incrementStat("tasksCompleted");
			expect(rel.totalTasksCompleted).toBe(1);
		});

		it("increments pomodoros", () => {
			const rel = service.incrementStat("pomodoros");
			expect(rel.totalPomodoros).toBe(1);
		});

		it("increments conversations", () => {
			const rel = service.incrementStat("conversations");
			expect(rel.totalConversations).toBe(1);
		});
	});

	describe("checkAndUpgrade", () => {
		it("does not upgrade when thresholds not met", () => {
			const result = service.checkAndUpgrade();
			expect(result.upgraded).toBe(false);
		});

		it("upgrades stranger to acquaintance with 1 task", () => {
			const db = {
				relationship: {
					stage: "stranger",
					totalTasksCompleted: 1,
					totalPomodoros: 0,
					totalConversations: 0,
					consecutiveDays: 1,
					lastInteractionAt: "",
				},
				getRelationship() {
					return { ...this.relationship };
				},
				updateRelationship(partial) {
					Object.assign(this.relationship, partial);
					return { ...this.relationship };
				},
			};
			const svc = new RelationshipService(db);
			const result = svc.checkAndUpgrade();
			expect(result.upgraded).toBe(true);
			expect(result.from).toBe("stranger");
			expect(result.to).toBe("acquaintance");
		});

		it("upgrades acquaintance to familiar when all thresholds met", () => {
			const db = {
				relationship: {
					stage: "acquaintance",
					totalTasksCompleted: 5,
					totalPomodoros: 10,
					totalConversations: 0,
					consecutiveDays: 1,
					lastInteractionAt: "",
				},
				getRelationship() {
					return { ...this.relationship };
				},
				updateRelationship(partial) {
					Object.assign(this.relationship, partial);
					return { ...this.relationship };
				},
			};
			const svc = new RelationshipService(db);
			const result = svc.checkAndUpgrade();
			expect(result.upgraded).toBe(true);
			expect(result.from).toBe("acquaintance");
			expect(result.to).toBe("familiar");
		});

		it("does not upgrade when only partial thresholds met", () => {
			const db = {
				relationship: {
					stage: "acquaintance",
					totalTasksCompleted: 5,
					totalPomodoros: 3, // not enough
					totalConversations: 0,
					consecutiveDays: 1,
					lastInteractionAt: "",
				},
				getRelationship() {
					return { ...this.relationship };
				},
				updateRelationship(partial) {
					Object.assign(this.relationship, partial);
					return { ...this.relationship };
				},
			};
			const svc = new RelationshipService(db);
			const result = svc.checkAndUpgrade();
			expect(result.upgraded).toBe(false);
		});

		it("does not upgrade from soulmate (max level)", () => {
			const db = {
				relationship: {
					stage: "soulmate",
					totalTasksCompleted: 99,
					totalPomodoros: 99,
					totalConversations: 99,
					consecutiveDays: 99,
					lastInteractionAt: "",
				},
				getRelationship() {
					return { ...this.relationship };
				},
				updateRelationship(partial) {
					Object.assign(this.relationship, partial);
					return { ...this.relationship };
				},
			};
			const svc = new RelationshipService(db);
			const result = svc.checkAndUpgrade();
			expect(result.upgraded).toBe(false);
		});
	});

	describe("updateConsecutiveDays", () => {
		it("resets to 1 if more than 1 day since last interaction", () => {
			const db = {
				relationship: {
					stage: "acquaintance",
					totalTasksCompleted: 0,
					totalPomodoros: 0,
					totalConversations: 0,
					consecutiveDays: 5,
					lastInteractionAt: new Date(Date.now() - 3 * 86400000).toISOString(),
				},
				getRelationship() {
					return { ...this.relationship };
				},
				updateRelationship(partial) {
					Object.assign(this.relationship, partial);
					return { ...this.relationship };
				},
			};
			const svc = new RelationshipService(db);
			const result = svc.updateConsecutiveDays();
			expect(result).toBe(1);
		});

		it("increments if interaction was yesterday", () => {
			const yesterday = new Date(Date.now() - 86400000).toISOString();
			const db = {
				relationship: {
					stage: "acquaintance",
					totalTasksCompleted: 0,
					totalPomodoros: 0,
					totalConversations: 0,
					consecutiveDays: 3,
					lastInteractionAt: yesterday,
				},
				getRelationship() {
					return { ...this.relationship };
				},
				updateRelationship(partial) {
					Object.assign(this.relationship, partial);
					return { ...this.relationship };
				},
			};
			const svc = new RelationshipService(db);
			const result = svc.updateConsecutiveDays();
			expect(result).toBe(4);
		});

		it("keeps same count if same day", () => {
			const db = {
				relationship: {
					stage: "acquaintance",
					totalTasksCompleted: 0,
					totalPomodoros: 0,
					totalConversations: 0,
					consecutiveDays: 3,
					lastInteractionAt: new Date().toISOString(),
				},
				getRelationship() {
					return { ...this.relationship };
				},
				updateRelationship(partial) {
					Object.assign(this.relationship, partial);
					return { ...this.relationship };
				},
			};
			const svc = new RelationshipService(db);
			const result = svc.updateConsecutiveDays();
			expect(result).toBe(3);
		});
	});
});
