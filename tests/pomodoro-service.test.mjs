import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PomodoroService } from "../src/main/pomodoro-service.js";

describe("PomodoroService", () => {
	let service;

	beforeEach(() => {
		vi.useFakeTimers();
		service = new PomodoroService();
	});

	afterEach(() => {
		service.destroy();
		vi.useRealTimers();
	});

	it("starts with correct totalSeconds", () => {
		const { totalSeconds } = service.start(25);
		expect(totalSeconds).toBe(1500);
		expect(service.isRunning()).toBe(true);
		expect(service.getRemaining()).toBe(1500);
	});

	it("calls onTick with decrementing values", () => {
		const ticks = [];
		service.start(1, { onTick: (r) => ticks.push(r) });

		vi.advanceTimersByTime(1000);
		expect(ticks[0]).toBe(59);

		vi.advanceTimersByTime(1000);
		expect(ticks[1]).toBe(58);
	});

	it("calls onEnd when timer reaches 0", () => {
		const onEnd = vi.fn();
		service.start(0.1, { onEnd }); // 6 seconds

		vi.advanceTimersByTime(7000);
		expect(onEnd).toHaveBeenCalledTimes(1);
		expect(service.isRunning()).toBe(false);
	});

	it("stop clears interval and resets state", () => {
		service.start(25);
		service.stop();
		expect(service.isRunning()).toBe(false);
		expect(service.getRemaining()).toBeNull();
	});

	it("returns current taskId", () => {
		service.start(25, { taskId: "task_1" });
		expect(service.getCurrentTaskId()).toBe("task_1");
	});

	it("destroy cleans up", () => {
		service.start(25);
		service.destroy();
		expect(service.isRunning()).toBe(false);
	});
});
