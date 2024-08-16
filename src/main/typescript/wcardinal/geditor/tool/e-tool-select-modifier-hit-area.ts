import { ESnapperModifierAnchor } from "@wcardinal/wcardinal-ui";
import { Rectangle } from "pixi.js";
import { EToolSelectModifier } from "./e-tool-select-modifier";

export class EToolSelectModifierHitArea extends Rectangle {
	protected _modifier: EToolSelectModifier;

	constructor(modifier: EToolSelectModifier) {
		super();
		this._modifier = modifier;
	}

	contains(x: number, y: number): boolean {
		const modifier = this._modifier;

		const s = modifier.getAnchorSize() * 2;
		const t = s * 0.5;
		const w = modifier.width;
		const h = modifier.height;
		const p = w * 0.5;
		const q = h * 0.5;
		const d = modifier.getAnchorRotationDistance();
		const r = modifier.getAnchorRotationSize() * 2;

		// Top left
		if (0 - t <= x && 0 - t <= y && x <= 0 - t + s && y <= 0 - t + s) {
			modifier.setLastHitAnchor(ESnapperModifierAnchor.TOP_LEFT);
			return true;
		}

		// Top right
		if (w - t <= x && 0 - t <= y && x <= w - t + s && y <= 0 - t + s) {
			modifier.setLastHitAnchor(ESnapperModifierAnchor.TOP_RIGHT);
			return true;
		}

		// Bottom left
		if (0 - t <= x && h - t <= y && x <= 0 - t + s && y <= h - t + s) {
			modifier.setLastHitAnchor(ESnapperModifierAnchor.BOTTOM_LEFT);
			return true;
		}

		// Bottom right
		if (w - t <= x && h - t <= y && x <= w - t + s && y <= h - t + s) {
			modifier.setLastHitAnchor(ESnapperModifierAnchor.BOTTOM_RIGHT);
			return true;
		}

		// Top Center
		if (p - t <= x && 0 - t <= y && x <= p - t + s && y <= 0 - t + s) {
			modifier.setLastHitAnchor(ESnapperModifierAnchor.TOP_CENTER);
			return true;
		}

		// Middle Right
		if (w - t <= x && q - t <= y && x <= w - t + s && y <= q - t + s) {
			modifier.setLastHitAnchor(ESnapperModifierAnchor.MIDDLE_RIGHT);
			return true;
		}

		// Bottom Center
		if (p - t <= x && h - t <= y && x <= p - t + s && y <= h - t + s) {
			modifier.setLastHitAnchor(ESnapperModifierAnchor.BOTTOM_CENTER);
			return true;
		}

		// Middle Left
		if (0 - t <= x && q - t <= y && x <= 0 - t + s && y <= q - t + s) {
			modifier.setLastHitAnchor(ESnapperModifierAnchor.MIDDLE_LEFT);
			return true;
		}

		// Rotate
		if (p - r <= x && d - r <= y && x <= p + r && y <= d + r) {
			modifier.setLastHitAnchor(ESnapperModifierAnchor.ROTATION);
			return true;
		}
		return false;
	}
}
