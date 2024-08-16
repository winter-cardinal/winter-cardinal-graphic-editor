import {
	EShapeCircle,
	EShapeContainer,
	EShapeLockPart,
	EShapeRectangle,
	ESnapperModifierAnchor
} from "@wcardinal/wcardinal-ui";
import { Renderer } from "pixi.js";
import { EToolSelectModifierHitArea } from "./e-tool-select-modifier-hit-area";

export interface EToolSelectModifierOptions {
	editable?: boolean;
}

export class EToolSelectModifier extends EShapeContainer {
	protected _width: number;
	protected _height: number;
	protected _scaleBound: number;
	protected _scaleBoundInverse: number;
	protected _isAllowed: boolean;
	protected _lastHitAnchor: ESnapperModifierAnchor;
	group: boolean;

	protected _anchorRotate: EShapeCircle;
	protected _anchorsScale: EShapeRectangle[];
	protected _anchorBase: EShapeRectangle;

	// Note that this is a work space for sorting.
	public index: number;
	public selected = false;

	constructor(options?: EToolSelectModifierOptions) {
		super();

		this.index = 0;

		this._width = 0;
		this._height = 0;
		this._scaleBound = 1;
		this._scaleBoundInverse = 1;
		this._isAllowed = true;
		this._lastHitAnchor = ESnapperModifierAnchor.NONE;
		if (options == null || options.editable !== false) {
			this.cursor = "grab";
			this.interactive = true;
			this.hitArea = new EToolSelectModifierHitArea(this);
		} else {
			this.interactive = false;
		}
		this.group = false;

		this._anchorBase = new EShapeRectangle().attach(this);
		this._anchorsScale = [
			new EShapeRectangle().attach(this),
			new EShapeRectangle().attach(this),
			new EShapeRectangle().attach(this),
			new EShapeRectangle().attach(this),
			new EShapeRectangle().attach(this),
			new EShapeRectangle().attach(this),
			new EShapeRectangle().attach(this),
			new EShapeRectangle().attach(this)
		];
		this._anchorRotate = new EShapeCircle().attach(this);
	}

	protected onPrerender(): void {
		const scale0 = this.getParentScale();
		const scale1 = this._scaleBound;
		if (0.001 < Math.abs(scale0 - scale1)) {
			this._scaleBound = scale0;
			this._scaleBoundInverse = 1 / scale0;
			this.update();
		}
	}

	render(renderer: Renderer): void {
		if (!this.visible || this.worldAlpha <= 0 || !this.renderable) {
			return;
		}
		this.onPrerender();
		super.render(renderer);
	}

	protected getParentScale(): number {
		const parent = this.parent;
		if (parent != null) {
			const parentParent = parent.parent;
			if (parentParent != null) {
				return parentParent.scale.y;
			}
		}
		return 1;
	}

	get factor(): number {
		return this._scaleBoundInverse;
	}

	get width(): number {
		return this._width;
	}

	set width(width: number) {
		this._width = width;
	}

	get height(): number {
		return this._height;
	}

	set height(height: number) {
		this._height = height;
	}

	getLastHitAnchor(): ESnapperModifierAnchor {
		return this._lastHitAnchor;
	}

	setLastHitAnchor(anchor: ESnapperModifierAnchor): ESnapperModifierAnchor {
		const result = this._lastHitAnchor;
		this._lastHitAnchor = anchor;
		return result;
	}

	getAnchorSize(): number {
		return 7 * this._scaleBoundInverse;
	}

	getAnchorRotationDistance(): number {
		return (0 <= this._height ? -18 : +18) * this._scaleBoundInverse;
	}

	getAnchorRotationSize(): number {
		return 5 * this._scaleBoundInverse;
	}

	update(): void {
		const color = this.group ? 0x1ef087 : 0x1e87f0;
		const width = this._width;
		const height = this._height;
		const scaleInverse = this._scaleBoundInverse;

		const s = this.getAnchorSize();
		const w = width;
		const h = height;
		const p = w * 0.5;
		const q = h * 0.5;
		const d = this.getAnchorRotationDistance();
		const r = 2 * this.getAnchorRotationSize();
		const l = 2 * scaleInverse;
		const o = 1.5 * l;

		// Anchor base
		const anchorBase = this._anchorBase;
		anchorBase.lock(EShapeLockPart.UPLOADED);
		anchorBase.fill.enable = false;
		anchorBase.stroke.set(true, color, 0.333, l, 2);
		anchorBase.transform.position.set(width * 0.5, height * 0.5);
		anchorBase.size.set(width, height);
		anchorBase.unlock(EShapeLockPart.UPLOADED, true);

		// Anchor for rotation
		const anchorRotate = this._anchorRotate;
		anchorRotate.lock(EShapeLockPart.UPLOADED);
		anchorRotate.stroke.enable = false;
		anchorRotate.fill.set(true, color, 1.0);
		anchorRotate.size.set(r, r);
		anchorRotate.transform.position.set(p, d);
		anchorRotate.unlock(EShapeLockPart.UPLOADED, true);

		// Anchor for scaling
		const anchorsScale = this._anchorsScale;
		for (let i = 0, imax = anchorsScale.length; i < imax; ++i) {
			const anchorScale = anchorsScale[i];
			anchorScale.lock(EShapeLockPart.UPLOADED);
			anchorScale.stroke.enable = false;
			anchorScale.fill.set(true, color, 1.0);
			anchorScale.size.set(s, s);
		}
		anchorsScale[0].transform.position.set(-o, -o);
		anchorsScale[1].transform.position.set(+o + w, -o);
		anchorsScale[2].transform.position.set(-o, +o + h);
		anchorsScale[3].transform.position.set(+o + w, +o + h);

		anchorsScale[4].transform.position.set(p, -o);
		anchorsScale[5].transform.position.set(+o + w, q);
		anchorsScale[6].transform.position.set(p, +o + h);
		anchorsScale[7].transform.position.set(-o, q);
		for (let i = 0, imax = anchorsScale.length; i < imax; ++i) {
			anchorsScale[i].unlock(EShapeLockPart.UPLOADED, true);
		}
	}

	allow(): void {
		this._isAllowed = true;
	}

	isAllowed(): boolean {
		return this._isAllowed;
	}

	disallow(): void {
		this._isAllowed = false;
	}

	destroy(): void {
		const parent = this.parent;
		if (parent) {
			parent.removeChild(this);
		}
	}
}
