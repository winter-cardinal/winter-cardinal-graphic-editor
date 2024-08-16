import {
	DDiagramEditor,
	EShape,
	EShapeAcceptorEdgeSide,
	EShapeAcceptorEdgeType,
	EShapeCapabilities,
	EShapeCapability,
	EShapeConnectorBodies,
	EShapeConnectorLine,
	EShapeLockPart,
	EShapePoints,
	EShapePointsStyle,
	toPointsBoundary
} from "@wcardinal/wcardinal-ui";
import { InteractionEvent, IPoint, Matrix, Point } from "pixi.js";
import { EToolShapeAcceptorEdge, EToolShapeAcceptorEdgeFound } from "./e-tool-shape-acceptor-edge";
import {
	EToolShapeEditLineBase,
	EToolShapeEditLineBaseOptions
} from "./e-tool-shape-edit-line-base";

export interface EToolShapeEditLineConnectorOptions extends EToolShapeEditLineBaseOptions {
	dangling?: boolean;
}

export class EToolShapeEditLineConnector<
	OPTIONS extends EToolShapeEditLineConnectorOptions = EToolShapeEditLineConnectorOptions
> extends EToolShapeEditLineBase<EToolShapeEditLineConnectorOptions> {
	protected _edge: EToolShapeAcceptorEdge;
	protected _edgeTail?: EToolShapeAcceptorEdgeFound | null;
	protected _edgeHead?: EToolShapeAcceptorEdgeFound | null;
	protected _work: Point;

	constructor(options: OPTIONS) {
		super(options);
		this._edge = new EToolShapeAcceptorEdge(this._diagram, true);
		this._work = new Point();
	}

	protected override toCapability(shape: EShape | null): EShapeCapability {
		let result = EShapeCapability.NONE;
		if (EShapeCapabilities.contains(shape, EShapeCapability.LINE_TAIL)) {
			result |= EShapeCapability.LINE_TAIL;
		}
		if (EShapeCapabilities.contains(shape, EShapeCapability.LINE_HEAD)) {
			result |= EShapeCapability.LINE_HEAD;
		}
		return result;
	}

	protected override onActivate(): void {
		this._edge.begin(this._diagram.canvas, this._shape);
		this._edgeTail = undefined;
		this._edgeHead = undefined;
		super.onActivate();
	}

	protected override onDeactivate(): void {
		this._edge.end();
		this._edgeTail = undefined;
		this._edgeHead = undefined;
		super.onDeactivate();
	}

	protected override onTargetChange(targetIndex: number, point: IPoint | null): void {
		if (targetIndex === 0) {
			const edge = this._edge;
			edge.show();
			if (point != null) {
				edge.update(EShapeAcceptorEdgeType.TAIL, point.x, point.y);
			}
		} else if (targetIndex === this._points.length - 1) {
			const edge = this._edge;
			edge.show();
			if (point != null) {
				edge.update(EShapeAcceptorEdgeType.HEAD, point.x, point.y);
			}
		} else {
			this._edge.hide();
		}
	}

	protected override onTargetMove(point: IPoint): void {
		const targetIndex = this._targetIndex;
		if (targetIndex === 0) {
			this._edge.update(EShapeAcceptorEdgeType.TAIL, point.x, point.y);
		} else if (targetIndex === this._points.length - 1) {
			this._edge.update(EShapeAcceptorEdgeType.HEAD, point.x, point.y);
		}
	}

	protected override onTargetNotMove(e: InteractionEvent): void {
		const targetIndex = this._targetIndex;
		if (targetIndex === 0) {
			const canvas = this._diagram.canvas;
			if (canvas) {
				const onMovePoint = canvas.toLocal(e.data.global, undefined, this._onMovePoint);
				this._edge.update(EShapeAcceptorEdgeType.TAIL, onMovePoint.x, onMovePoint.y);
			}
		} else if (targetIndex === this._points.length - 1) {
			const canvas = this._diagram.canvas;
			if (canvas) {
				const onMovePoint = canvas.toLocal(e.data.global, undefined, this._onMovePoint);
				this._edge.update(EShapeAcceptorEdgeType.HEAD, onMovePoint.x, onMovePoint.y);
			}
		}
	}

	protected override toSnapped(target: IPoint, diagram: DDiagramEditor, result: IPoint): void {
		const targetIndex = this._targetIndex;
		if (targetIndex === 0) {
			const edge = this._edge.find(EShapeAcceptorEdgeType.TAIL, target.x, target.y);
			if (edge != null) {
				result.copyFrom(edge.local);
			}
			this._edgeTail = edge;
		} else {
			const points = this._points;
			const pointsLength = points.length;
			if (targetIndex === pointsLength - 1) {
				const edge = this._edge.find(EShapeAcceptorEdgeType.HEAD, target.x, target.y);
				if (edge != null) {
					result.copyFrom(edge.local);
				}
				this._edgeHead = edge;
			} else {
				diagram.snapper.toSnapped(target, result);
			}
		}
	}

	protected override toPoints(shape: EShape, points: EShapePoints, transform: Matrix): Point[] {
		const result: Point[] = [];
		if (shape instanceof EShapeConnectorLine) {
			const edge = shape.edge;
			const tailLocal = edge.tail.local;
			const headLocal = edge.head.local;

			const transformPosition = shape.transform.position;
			const px = transformPosition.x;
			const py = transformPosition.y;

			const x0 = tailLocal.x - px;
			const y0 = tailLocal.y - py;
			const x1 = headLocal.x - px;
			const y1 = headLocal.y - py;

			const tailPoint = new Point(x0, y0);
			result.push(transform.apply(tailPoint, tailPoint));

			const bodyValues = shape.body.values;
			const bodyValuesLength = bodyValues.length;
			if (0 < bodyValuesLength) {
				const cx = (x1 + x0) * 0.5;
				const cy = (y1 + y0) * 0.5;
				const dx = x1 - x0;
				const dy = y1 - y0;
				const a = Math.atan2(dy, dx);
				const l = Math.sqrt(dx * dx + dy * dy);
				const c = Math.cos(a) * l;
				const s = Math.sin(a) * l;
				for (let i = 0; i < bodyValuesLength; i += 2) {
					const x = bodyValues[i + 0];
					const y = bodyValues[i + 1];
					const x2 = cx + c * x - s * y;
					const y2 = cy + c * y + s * x;
					const middlePoint = new Point(x2, y2);
					result.push(transform.apply(middlePoint, middlePoint));
				}
			}

			const headPoint = new Point(x1, y1);
			result.push(transform.apply(headPoint, headPoint));
		}
		return result;
	}

	protected override newShape(
		values: number[],
		segments: number[],
		style: EShapePointsStyle,
		oldShape: EShape
	): EShape {
		const boundary = toPointsBoundary(values, [0, 0, 0, 0]);
		const cx = (boundary[2] + boundary[0]) * 0.5;
		const cy = (boundary[3] + boundary[1]) * 0.5;
		const sx = boundary[2] - boundary[0];
		const sy = boundary[3] - boundary[1];

		const result = oldShape.clone() as EShapeConnectorLine;
		const transform = result.transform;
		const transformPosition = transform.position;
		const px = transformPosition.x;
		const py = transformPosition.y;

		result.lock(EShapeLockPart.UPLOADED);
		transformPosition.set(px + cx, py + cy);
		transform.scale.set(1, 1);
		transform.rotation = 0;
		transform.skew.set(0, 0);
		result.points.toFitted(sx, sy);
		result.size.set(sx, sy);
		result.edge.lock();
		result.body.set(EShapeConnectorBodies.from(values, 0, 0));
		const local = this._work;
		if (2 <= values.length) {
			local.set(px + values[0], py + values[1]);
		} else {
			local.set(px, py);
		}
		const edgeTail = this._edgeTail;
		if (edgeTail !== undefined) {
			if (this.isTailAccepted(result, local, edgeTail)) {
				this.onTailAccepted(result, local, edgeTail);
			}
		}
		if (2 <= values.length) {
			const valuesLength = values.length;
			local.set(px + values[valuesLength - 2], py + values[valuesLength - 1]);
		} else {
			local.set(px, py);
		}
		const edgeHead = this._edgeHead;
		if (edgeHead !== undefined) {
			if (this.isHeadAccepted(result, local, edgeHead)) {
				this.onHeadAccepted(result, local, edgeHead);
			}
		}
		result.edge.unlock();
		result.unlock(EShapeLockPart.UPLOADED, true);

		return result;
	}

	protected isDanglingEdgeAllowed(): boolean {
		return this._options.dangling ?? false;
	}

	protected isTailAccepted(
		connector: EShapeConnectorLine | undefined,
		local: IPoint,
		edge: EToolShapeAcceptorEdgeFound | null | undefined
	): boolean {
		if (edge == null) {
			return this.isDanglingEdgeAllowed();
		} else {
			return true;
		}
	}

	protected onTailAccepted(
		connector: EShapeConnectorLine,
		local: IPoint,
		edge: EToolShapeAcceptorEdgeFound | null | undefined
	): void {
		if (edge != null) {
			connector.edge.tail.set(
				edge.shape,
				edge.id,
				edge.x,
				edge.y,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				edge.acceptor.side
			);
		} else {
			connector.edge.tail.set(
				null,
				null,
				null,
				null,
				undefined,
				local.x,
				local.y,
				undefined,
				undefined,
				EShapeAcceptorEdgeSide.TOP
			);
		}
	}

	protected isHeadAccepted(
		connector: EShapeConnectorLine | undefined,
		local: IPoint,
		edge: EToolShapeAcceptorEdgeFound | null | undefined
	): boolean {
		if (edge == null) {
			return this.isDanglingEdgeAllowed();
		} else {
			return true;
		}
	}

	protected onHeadAccepted(
		connector: EShapeConnectorLine,
		local: IPoint,
		edge: EToolShapeAcceptorEdgeFound | null | undefined
	): void {
		if (edge != null) {
			connector.edge.head.set(
				edge.shape,
				edge.id,
				edge.x,
				edge.y,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				edge.acceptor.side
			);
		} else {
			connector.edge.head.set(
				null,
				null,
				null,
				null,
				undefined,
				local.x,
				local.y,
				undefined,
				undefined,
				EShapeAcceptorEdgeSide.TOP
			);
		}
	}
}
