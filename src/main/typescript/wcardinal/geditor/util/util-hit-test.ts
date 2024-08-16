import { DisplayObject, InteractionManager, IPoint, Point } from "pixi.js";

export interface UtilHitTestTarget<R> {
	hitTest(global: IPoint): R;
}

export class UtilHitTest {
	static WORK?: Point;
	static OFFSETS?: number[];

	static execute<R>(global: IPoint, target: UtilHitTestTarget<R>): R | null;
	static execute<R>(
		global: IPoint,
		target: UtilHitTestTarget<R>,
		interactionManager: InteractionManager
	): R | DisplayObject | null;
	static execute<R>(
		global: IPoint,
		target: UtilHitTestTarget<R>,
		interactionManager?: InteractionManager
	): R | DisplayObject | null {
		const offsets = (UtilHitTest.OFFSETS ??= this.newOffsets());
		const work = (UtilHitTest.WORK ??= new Point());
		const x = global.x;
		const y = global.y;
		if (interactionManager) {
			for (let i = 0, imax = offsets.length; i < imax; i += 1) {
				work.set(x + offsets[i], y + offsets[i + 1]);
				const result = interactionManager.hitTest(work, target as any);
				if (result != null) {
					return result;
				}
			}
		} else {
			for (let i = 0, imax = offsets.length; i < imax; i += 1) {
				work.set(x + offsets[i], y + offsets[i + 1]);
				const result = target.hitTest(work);
				if (result != null) {
					return result;
				}
			}
		}
		return null;
	}

	protected static newOffsets(): number[] {
		return [
			+0, +0, -1, -1, +1, -1, +1, +1, -1, +1, +0, -2, +2, +0, +0, -2, -2, +0, -2, -2, +2, -2,
			+2, +2, -2, +2, +0, -4, +4, +0, +0, -4, -4, +0
		];
	}
}
