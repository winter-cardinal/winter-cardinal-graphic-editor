import { EShapeCapability } from "@wcardinal/wcardinal-ui";
import { Point, Rectangle } from "pixi.js";

export interface EToolShapeEditLineHitAreaParent {
	points: Point[];
	closed: boolean;
	isEditing(): boolean;
	getAnchorSize(): number;
	setLastHitAnchor(index: number): void;
	setLastHitSegment(index: number, position: number): void;
}

export class EToolShapeEditLineHitArea extends Rectangle {
	protected _parent: EToolShapeEditLineHitAreaParent;
	protected _capability: EShapeCapability;

	constructor(parent: EToolShapeEditLineHitAreaParent) {
		super();
		this._parent = parent;
		this._capability = EShapeCapability.LINE_TAIL | EShapeCapability.LINE_HEAD;
	}

	get capability(): EShapeCapability {
		return this._capability;
	}

	set capability(capability: EShapeCapability) {
		this._capability = capability;
	}

	contains(x: number, y: number): boolean {
		const parent = this._parent;
		if (parent.isEditing()) {
			return true;
		}

		const points = parent.points;
		const pointsClosed = parent.closed;
		const capability = this._capability;
		const hasTail = !!(capability & EShapeCapability.LINE_TAIL);
		const hasHead = !!(capability & EShapeCapability.LINE_HEAD);

		// Anchors
		const s = parent.getAnchorSize() * 2;
		const thresholdLine = s * s;
		const thresholdAnchor = thresholdLine * 2;
		for (let i = hasTail ? 0 : 1, imax = points.length - (hasHead ? 0 : 1); i < imax; ++i) {
			const point = points[i];
			const dx = point.x - x;
			const dy = point.y - y;
			const d = dx * dx + dy * dy;
			if (d < thresholdAnchor) {
				parent.setLastHitAnchor(i);
				return true;
			}
		}

		// Lines
		for (let i = 0, imax = points.length - 1; i < imax; ++i) {
			const p0 = points[i + 0];
			const p1 = points[i + 1];
			const hitPoint = this.calcHitPoint(x, y, p0.x, p0.y, p1.x, p1.y, thresholdLine);
			if (0 <= hitPoint) {
				parent.setLastHitSegment(i, hitPoint);
				return true;
			}
		}
		if (hasTail && hasHead && pointsClosed) {
			const p0 = points[points.length - 1];
			const p1 = points[0];
			const hitPoint = this.calcHitPoint(x, y, p0.x, p0.y, p1.x, p1.y, thresholdLine);
			if (0 <= hitPoint) {
				parent.setLastHitSegment(points.length - 1, hitPoint);
				return true;
			}
		}
		parent.setLastHitSegment(-1, -1);

		return false;
	}

	protected calcHitPoint(
		x: number,
		y: number,
		p0x: number,
		p0y: number,
		p1x: number,
		p1y: number,
		threshold: number
	): number {
		const d0x = p1x - p0x;
		const d0y = p1y - p0y;
		const d1x = x - p0x;
		const d1y = y - p0y;
		const a = d0x * d0x + d0y * d0y;
		const b = d0x * d1x + d0y * d1y;
		const c = d1x * d1x + d1y * d1y;
		if (0.0001 < a) {
			const t = Math.max(0, Math.min(1, b / a));
			const d = a * t * t - 2 * b * t + c;
			if (d < threshold) {
				return t;
			}
		}
		return -1;
	}
}
