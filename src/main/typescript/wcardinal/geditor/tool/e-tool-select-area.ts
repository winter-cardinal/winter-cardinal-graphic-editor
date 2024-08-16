import { Graphics, Point } from "pixi.js";

const FILL_COLOR = 0x1e87f0;
const FILL_ALPHA = 0.5;

export class EToolSelectArea extends Graphics {
	protected _size: Point;

	constructor() {
		super();
		this._size = new Point();
	}

	get size(): Point {
		return this._size;
	}

	update(): void {
		this.clear();

		const size = this._size;
		const x = Math.min(0, size.x);
		const y = Math.min(0, size.y);
		const width = Math.abs(size.x);
		const height = Math.abs(size.y);

		this.beginFill(FILL_COLOR, FILL_ALPHA);
		this.drawRect(x, y, width, height);
		this.endFill();
	}
}
