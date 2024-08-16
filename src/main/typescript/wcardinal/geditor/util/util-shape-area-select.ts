import { EShape, EShapeContainer } from "@wcardinal/wcardinal-ui";
import { Rectangle } from "pixi.js";

export class UtilShapeAreaSelect {
	protected static _work?: Rectangle;

	static isShapeIn(shape: EShape, rect: Rectangle): shape is EShape {
		const bound = shape.getBounds(false, (this._work ??= new Rectangle()));
		const x = bound.x;
		const y = bound.y;
		const w = bound.width;
		const h = bound.height;
		return (
			rect.contains(x, y) &&
			rect.contains(x + w, y) &&
			rect.contains(x, y + h) &&
			rect.contains(x + w, y + h)
		);
	}

	static findShapes(container: EShapeContainer, rect: Rectangle, result: EShape[]): void {
		const children = container.children;
		for (let i = 0, imax = children.length; i < imax; ++i) {
			const child = children[i];
			if (this.isShapeIn(child, rect)) {
				result.push(child);
			}
		}
	}
}
