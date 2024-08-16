import {
	DApplications,
	DDiagramCanvasEditor,
	EShapeAcceptorEdgeType,
	EShapeCircle,
	EShapeContainer,
	EShapeDefaults,
	EShapeLockPart
} from "@wcardinal/wcardinal-ui";
import { Renderer } from "pixi.js";
import { EToolShapeAcceptorEdge, EToolShapeAcceptorEdgeFound } from "./e-tool-shape-acceptor-edge";

export class EToolShapeAcceptorEdgeRenderer extends EShapeContainer {
	protected _edge: EToolShapeAcceptorEdge;
	protected _circles: EShapeCircle[];
	protected _foundEdges: EToolShapeAcceptorEdgeFound[];
	protected _radius: number;

	protected _scaleBound: number;
	protected _scaleBoundInverse: number;

	protected _timeout?: number | null;
	protected _type: EShapeAcceptorEdgeType;
	protected _x: number;
	protected _y: number;
	protected _ox: number;
	protected _oy: number;
	protected _isDirty: boolean;
	protected _isBegan: boolean;
	protected _doUpdateBound: () => void;

	constructor(edge: EToolShapeAcceptorEdge) {
		super();

		this._edge = edge;
		this._circles = this.newCircles();
		this._foundEdges = [];
		this._radius = EShapeDefaults.SIZE_X * 2;

		this._scaleBound = 1;
		this._scaleBoundInverse = 1;

		this._type = EShapeAcceptorEdgeType.TAIL;
		this._x = 0;
		this._y = 0;
		this._ox = 0;
		this._oy = 0;
		this._isDirty = false;
		this._isBegan = false;
		this._doUpdateBound = (): void => {
			this._timeout = null;
			if (this._isDirty) {
				this._isDirty = false;
				if (this._isBegan) {
					this.visible = true;
					this.doUpdate();
				}
			}
		};
	}

	protected newCircles(): EShapeCircle[] {
		const result: EShapeCircle[] = [];
		const color = EShapeDefaults.STROKE_COLOR;
		const alpha = EShapeDefaults.STROKE_ALPHA;
		for (let i = 0, imax = 64; i < imax; ++i) {
			const shape = new EShapeCircle();
			shape.stroke.set(false);
			shape.fill.set(true, color, alpha);
			shape.visible = false;
			shape.attach(this);
			result.push(shape);
		}
		return result;
	}

	begin(canvas: DDiagramCanvasEditor): void {
		canvas.addChild(this);
		const layer = canvas.layer.active;
		if (layer != null) {
			const position = layer.transform.position;
			this._ox = position.x;
			this._oy = position.y;
		} else {
			this._ox = 0;
			this._oy = 0;
		}
		this.visible = false;
		this._isBegan = true;
	}

	end(): void {
		const parent = this.parent;
		if (parent != null) {
			parent.removeChild(this);
		}
		this.visible = false;
		this._isBegan = false;
	}

	protected onPrerender(): void {
		const scale0 = this.getParentScale();
		const scale1 = this._scaleBound;
		if (0.001 < Math.abs(scale0 - scale1)) {
			this._scaleBound = scale0;
			this._scaleBoundInverse = 1 / scale0;
			const size = this.getCircleSize();
			const circles = this._circles;
			for (let i = 0, imax = circles.length; i < imax; ++i) {
				circles[i].size.set(size, size);
			}
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
			return parent.scale.y;
		}
		return 1;
	}

	getCircleSize(): number {
		return 10 * Math.min(1, this._scaleBoundInverse);
	}

	update(type: EShapeAcceptorEdgeType, x: number, y: number): void {
		if (this._isBegan) {
			this._type = type;
			this._x = x;
			this._y = y;
			if (this._timeout == null) {
				this.visible = true;
				this.doUpdate();
				this._timeout = window.setTimeout(this._doUpdateBound, 100);
			} else {
				this._isDirty = true;
			}
		}
	}

	protected doUpdate(): void {
		const radius = this._radius;
		const circles = this._circles;
		const circlesLength = circles.length;
		const edges = this._foundEdges;
		this._edge.findAll(this._type, this._x, this._y, radius, circlesLength, edges);
		const edgesLength = edges.length;
		const ox = this._ox;
		const oy = this._oy;
		const size = this.getCircleSize();
		const isize = Math.min(circlesLength, edgesLength);
		const distance = radius * radius;
		for (let i = 0; i < isize; ++i) {
			const edge = edges[i];
			const edgeCenter = edge.center;
			const circle = circles[i];
			circle.lock(EShapeLockPart.UPLOADED);
			circle.transform.position.set(ox + edgeCenter.x, oy + edgeCenter.y);
			circle.size.set(size, size);
			circle.fill.alpha = 0.5 * Math.max(0, 1 - edge.distance / distance);
			circle.visible = true;
			circle.unlock(EShapeLockPart.UPLOADED, true);
		}
		for (let i = isize; i < circlesLength; ++i) {
			circles[i].visible = false;
		}
		DApplications.update(this);
	}
}
