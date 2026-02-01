import {
	DApplications,
	DControllers,
	DDiagramCanvasEditor,
	DDiagramEditor,
	EShape,
	EShapeCapability,
	EShapePointsFormattedWithoutBoundary,
	EShapePointsFormatter,
	EShapePointsStyle,
	UtilKeyboardEvent,
	UtilPointerEvent
} from "@wcardinal/wcardinal-ui";
import { Graphics, IPoint, InteractionEvent, Matrix, Point, Renderer } from "pixi.js";
import { ECommandShapeReplaceOne } from "../command/e-command-shape-replace-one";
import { ETool } from "./e-tool";
import { EToolSelectSelection } from "./e-tool-select-selection";
import {
	EToolShapeEditLineHitArea,
	EToolShapeEditLineHitAreaParent
} from "./e-tool-shape-edit-line-base-hit-area";

export interface EToolShapeEditLineBaseOptions {
	selection: EToolSelectSelection;
	diagram: DDiagramEditor;
}

export abstract class EToolShapeEditLineBase<
		OPTIONS extends EToolShapeEditLineBaseOptions = EToolShapeEditLineBaseOptions
	>
	extends Graphics
	implements EToolShapeEditLineHitAreaParent, ETool
{
	protected _options: OPTIONS;
	protected _diagram: DDiagramEditor;
	protected _onDownBound: (e: InteractionEvent) => void;
	protected _onMoveBound: (e: InteractionEvent) => void;
	protected _onUpBound: (e: InteractionEvent) => void;
	protected _onKeydownBound: (e: KeyboardEvent) => void;
	protected _onSetBound: (canvas: DDiagramCanvasEditor) => void;
	protected _onUnsetBound: (canvas: DDiagramCanvasEditor) => void;
	protected _onDownPoint: Point;
	protected _points: Point[];
	protected _pointsStyle: EShapePointsStyle;
	protected _onMovePoint: Point;
	protected _isEditing: boolean;
	protected _isEdited: boolean;
	protected _selection: EToolSelectSelection;
	protected _isActive: boolean;
	protected _shape: EShape | null;
	protected _capability: EShapeCapability;
	protected _scaleBound: number;
	protected _scaleBoundInverse: number;
	protected _lastHitAnchor: number;
	protected _lastHitSegment: number;
	protected _lastHitSegmentPosition: number;
	protected _targetCopy: Point;
	protected _target: Point | null;
	protected _targetIndex: number;
	protected _workTransform?: Matrix;

	protected _formatter?: EShapePointsFormatter;
	protected _unformatted: EShapePointsFormattedWithoutBoundary;
	protected _formatted: EShapePointsFormattedWithoutBoundary;

	hitArea: EToolShapeEditLineHitArea;

	constructor(options: OPTIONS) {
		super();
		this._options = options;
		this._selection = options.selection;
		this._diagram = options.diagram;
		this._onDownPoint = new Point();
		this._points = [];
		this._pointsStyle = EShapePointsStyle.NONE;
		this._onMovePoint = new Point();
		this._isEditing = false;
		this._isEdited = false;
		this._isActive = false;
		this._shape = null;
		this._capability = EShapeCapability.LINE_TAIL | EShapeCapability.LINE_HEAD;
		this._scaleBound = 1;
		this._scaleBoundInverse = 1;
		this._lastHitAnchor = -1;
		this._lastHitSegment = -1;
		this._lastHitSegmentPosition = -1;
		this._targetCopy = new Point();
		this._target = null;
		this._targetIndex = -1;

		this._onDownBound = (e: InteractionEvent): void => {
			this.onDown(e);
		};
		this._onMoveBound = (e: InteractionEvent): void => {
			this.onMove(e);
		};
		this._onUpBound = (e: InteractionEvent): void => {
			this.onUp(e);
		};
		this._onKeydownBound = (e: KeyboardEvent): void => {
			this.onKeydown(e);
		};
		this._onSetBound = (canvas: DDiagramCanvasEditor): void => {
			this.onSet(canvas);
		};
		this._onUnsetBound = (canvas: DDiagramCanvasEditor): void => {
			this.onUnset(canvas);
		};

		this.cursor = "grab";
		this.interactive = true;
		this.hitArea = new EToolShapeEditLineHitArea(this);
		this._unformatted = {
			length: 0,
			plength: 0,
			values: [],
			segments: [],
			style: EShapePointsStyle.NONE
		};
		this._formatted = {
			length: 0,
			plength: 0,
			values: [],
			segments: [],
			style: EShapePointsStyle.NONE
		};
	}

	protected abstract toCapability(shape: EShape | null): EShapeCapability;

	protected onPrerender(): void {
		const scale0 = this.getParentScale();
		const scale1 = this._scaleBound;
		if (0.001 < Math.abs(scale0 - scale1)) {
			this._scaleBound = scale0;
			this._scaleBoundInverse = 1 / scale0;
			this.reshape();
		}
	}

	protected getParentScale(): number {
		const parent = this.parent;
		return parent != null ? parent.scale.y : 1;
	}

	render(renderer: Renderer): void {
		this.onPrerender();
		super.render(renderer);
	}

	getAnchorSize(): number {
		return 6 * this._scaleBoundInverse;
	}

	activate(): void {
		if (!this._isActive) {
			this._isActive = true;
			this.onActivate();
		}
	}

	protected onActivate(): void {
		this._isEditing = false;
		this._isEdited = false;
		this._target = null;
		this._targetIndex = -1;

		const diagram = this._diagram;
		const layer = DApplications.getLayer(diagram);
		if (layer) {
			const interactionManager = layer.renderer.plugins.interaction;
			diagram.on(UtilPointerEvent.down, this._onDownBound);
			interactionManager.on(UtilPointerEvent.move, this._onMoveBound);
			const onUpBound = this._onUpBound;
			interactionManager.on(UtilPointerEvent.up, onUpBound);
			interactionManager.on(UtilPointerEvent.upoutside, onUpBound);
			interactionManager.on(UtilPointerEvent.cancel, onUpBound);
			diagram.on("keydown", this._onKeydownBound);
			diagram.on("set", this._onSetBound);
			diagram.on("unset", this._onUnsetBound);
		}

		const selection = this._selection;
		selection.modifier.disallow();
		selection.updateModifier();
	}

	deactivate(): void {
		if (this._isActive) {
			this._isActive = false;
			this.onDeactivate();
		}
	}

	protected onDeactivate(): void {
		this._isEditing = false;
		this._isEdited = false;
		this._target = null;
		this._targetIndex = -1;
		this.shape = null;

		const diagram = this._diagram;
		const layer = DApplications.getLayer(diagram);
		if (layer) {
			const interactionManager = layer.renderer.plugins.interaction;
			diagram.off(UtilPointerEvent.down, this._onDownBound);
			interactionManager.off(UtilPointerEvent.move, this._onMoveBound);
			const onUpBound = this._onUpBound;
			interactionManager.off(UtilPointerEvent.up, onUpBound);
			interactionManager.off(UtilPointerEvent.upoutside, onUpBound);
			interactionManager.off(UtilPointerEvent.cancel, onUpBound);
			diagram.off("keydown", this._onKeydownBound);
			diagram.off("set", this._onSetBound);
			diagram.off("unset", this._onUnsetBound);
		}

		const selection = this._selection;
		selection.modifier.allow();
		selection.updateModifier();
	}

	protected onSet(canvas: DDiagramCanvasEditor): void {
		// DO NOTHING
	}

	protected onUnset(canvas: DDiagramCanvasEditor): void {
		this.onCancel();
	}

	isActive(): boolean {
		return this._isActive;
	}

	isEditing(): boolean {
		return this._isEditing;
	}

	get points(): Point[] {
		return this._points;
	}

	get closed(): boolean {
		return (this._pointsStyle & EShapePointsStyle.CLOSED) !== 0;
	}

	get shape(): EShape | null {
		return this._shape;
	}

	set shape(shape: EShape | null) {
		if (this._shape !== shape) {
			this._shape = shape;
			const capability = this.toCapability(shape);
			this.hitArea.capability = capability;
			this._capability = capability;
			this._isEdited = false;
			if (shape == null) {
				this.onShapeUnset();
			} else {
				this.onShapeSet(shape);
			}
		}
	}

	protected abstract onShapeSet(shape: EShape): void;

	protected onShapeUnset(): void {
		this._points = [];
		this._pointsStyle = EShapePointsStyle.NONE;
		this._formatter = undefined;
		const parent = this.parent;
		if (parent) {
			parent.removeChild(this);
			DApplications.update(this);
		}
	}

	protected toTransform(shape: EShape): Matrix {
		const result = (this._workTransform ??= new Matrix());
		result.copyFrom(shape.transform.internalTransform);

		// If the layer this shape belongs to has a non-zero position,
		// we have to take that into consideration.
		const parent = shape.root.parent;
		if (parent) {
			result.prepend(parent.transform.localTransform);
		}

		return result;
	}

	setLastHitAnchor(index: number): void {
		if (this._lastHitAnchor !== index || this._lastHitSegment !== -1) {
			this._lastHitAnchor = index;
			this._lastHitSegment = -1;
			this._lastHitSegmentPosition = -1;
			this.reshape();
			DApplications.update(this);
		}
	}

	setLastHitSegment(index: number, position: number): void {
		this._lastHitSegmentPosition = position;
		if (this._lastHitAnchor !== -1 || this._lastHitSegment !== index) {
			this._lastHitAnchor = -1;
			this._lastHitSegment = index;
			this.reshape();
			DApplications.update(this);
		}
	}

	protected reshape(): void {
		const graphics = this;
		const points = this._points;
		const pointsLength = points.length;
		const pointsStyle = this._pointsStyle;
		const formatter = this._formatter;
		const pointsClosed = !!(pointsStyle & EShapePointsStyle.CLOSED);
		const capability = this._capability;
		const hasTail = !!(capability & EShapeCapability.LINE_TAIL);
		const hasHead = !!(capability & EShapeCapability.LINE_HEAD);

		graphics.clear();
		if (0 < pointsLength) {
			const s = this.getAnchorSize();
			const hs = s * 0.5;
			const color = 0x1e87f0;
			const colorHit = 0xf36f27;
			const colorFormatted = 0xaaaaaa;
			const alpha = 1;
			const alphaFormatted = 0.5;
			const anchor = this._lastHitAnchor;
			const segment = this._lastHitSegment;

			// Formatted
			if (formatter != null) {
				const unformatted = this._unformatted;
				const uvalues = unformatted.values;
				const usegments = unformatted.segments;
				for (let i = 0, j = 0; i < pointsLength; i += 1, j += 2) {
					const point = points[i];
					uvalues[j] = point.x;
					uvalues[j + 1] = point.y;
				}
				const formatted = this._formatted;
				formatter(pointsLength, uvalues, usegments, pointsStyle, formatted);
				const fvalues = formatted.values;
				graphics.lineStyle(hs, colorFormatted, alphaFormatted);
				if (0 < fvalues.length) {
					graphics.moveTo(fvalues[0], fvalues[1]);
					for (let i = 2, imax = fvalues.length; i < imax; i += 2) {
						graphics.lineTo(fvalues[i], fvalues[i + 1]);
					}
				}
			}

			// Line
			for (let i = 0, imax = pointsLength - 1; i < imax; ++i) {
				const p0 = points[i];
				const p1 = points[i + 1];
				const c = segment === i ? colorHit : color;
				graphics.lineStyle(hs, c, alpha);
				graphics.moveTo(p0.x, p0.y);
				graphics.lineTo(p1.x, p1.y);
			}
			if (hasTail && hasHead && pointsClosed) {
				const i = points.length - 1;
				const p0 = points[i];
				const p1 = points[0];
				const c = segment === i ? colorHit : color;
				graphics.lineStyle(hs, c, alpha);
				graphics.moveTo(p0.x, p0.y);
				graphics.lineTo(p1.x, p1.y);
			}

			// Anchors
			const targetIndex = this._targetIndex;
			for (let i = hasTail ? 0 : 1, imax = pointsLength - (hasHead ? 0 : 1); i < imax; ++i) {
				const point = points[i];
				const c = anchor === i || targetIndex === i ? colorHit : color;
				graphics.lineStyle(hs, c, alpha);
				graphics.beginFill(c, alpha);
				graphics.drawRect(point.x - hs, point.y - hs, s, s);
				graphics.endFill();
			}
		}
	}

	protected replace(): void {
		const oldShape = this._shape;
		const points = this._points;
		if (oldShape && oldShape.parent && 2 <= points.length) {
			const values = this.toValues(points, oldShape);
			if (2 < values.length) {
				const newShape = this.newShape(values, [], this._pointsStyle, oldShape);
				DControllers.getCommandController().push(
					new ECommandShapeReplaceOne(
						newShape,
						oldShape,
						oldShape.parent,
						this._selection
					)
				);
			}
		}
	}

	protected toValues(points: Point[], shape: EShape): number[] {
		shape.updateTransform();
		const transform = this.toTransform(shape).invert();
		const result: number[] = [];
		const a = transform.a;
		const b = transform.b;
		const c = transform.c;
		const d = transform.d;
		const tx = transform.tx;
		const ty = transform.ty;
		let pprevx = NaN;
		let pprevy = NaN;
		for (let i = 0, imax = points.length; i < imax; ++i) {
			const point = points[i];
			const px = point.x;
			const py = point.y;
			if (pprevx !== px || pprevy !== py) {
				const x = a * px + c * py + tx;
				const y = b * px + d * py + ty;
				result.push(x, y);
				pprevx = x;
				pprevy = y;
			}
		}
		return result;
	}

	protected abstract newShape(
		values: number[],
		segments: number[],
		style: EShapePointsStyle,
		oldShape: EShape
	): EShape;

	onDown(e: InteractionEvent): void {
		if (e.target === this) {
			const originalEvent = e.data.originalEvent;
			if (originalEvent.altKey) {
				return;
			}
			const diagram = this._diagram;
			const canvas = diagram.canvas;
			if (canvas != null && !this._isEditing) {
				const lastHitAnchor = this._lastHitAnchor;
				const points = this._points;
				const onDownPoint = this._onDownPoint;
				if (0 <= lastHitAnchor && lastHitAnchor < points.length) {
					this._isEditing = true;
					canvas.toLocal(e.data.global, undefined, onDownPoint);
					this._target = points[lastHitAnchor];
					this._targetCopy.copyFrom(this._target);
					this._targetIndex = lastHitAnchor;
					this.onTargetChange(lastHitAnchor, onDownPoint);
					this.reshape();
					DApplications.update(this);
				} else {
					const lastHitSegment = this._lastHitSegment;
					if (0 <= lastHitSegment) {
						this._lastHitSegment = -1;
						this._isEditing = true;
						canvas.toLocal(e.data.global, undefined, onDownPoint);
						const p0 = points[lastHitSegment + 0];
						const p1 =
							points[lastHitSegment < points.length - 1 ? lastHitSegment + 1 : 0];
						const t = this._lastHitSegmentPosition;
						const ti = 1 - t;
						const x = ti * p0.x + t * p1.x;
						const y = ti * p0.y + t * p1.y;
						const point = new Point(x, y);
						points.splice(lastHitSegment + 1, 0, point);
						this._target = point;
						this._targetCopy.copyFrom(point);
						this._targetIndex = lastHitSegment + 1;
						this.onTargetChange(this._targetIndex, onDownPoint);
						this.reshape();
						DApplications.update(this);
					}
				}
			}
		} else {
			this.onDone();
		}
	}

	protected onTargetChange(targetIndex: number, point: IPoint | null): void {
		// DO NOTHING
	}

	onMove(e: InteractionEvent): void {
		if (this._isEditing) {
			const originalEvent = e.data.originalEvent;
			if (originalEvent.altKey) {
				return;
			}
			const diagram = this._diagram;
			const canvas = diagram.canvas;
			const target = this._target;
			const targetCopy = this._targetCopy;
			if (canvas && target) {
				this._isEdited = true;

				const onDownPoint = this._onDownPoint;
				const onMovePoint = canvas.toLocal(e.data.global, undefined, this._onMovePoint);
				target.set(
					targetCopy.x + onMovePoint.x - onDownPoint.x,
					targetCopy.y + onMovePoint.y - onDownPoint.y
				);
				this.toSnapped(target, diagram, target);

				if (originalEvent.shiftKey) {
					const points = this._points;
					const targetIndex = this._targetIndex;
					const previousIndex = 0 < targetIndex ? targetIndex - 1 : targetIndex + 1;
					if (0 <= previousIndex && previousIndex < points.length) {
						const previous = points[previousIndex];
						const dx = target.x - previous.x;
						const dy = target.y - previous.y;
						const dangle = Math.PI * 0.25;
						const angle = Math.round(Math.atan2(dy, dx) / dangle) * dangle;
						const d = Math.sqrt(dx * dx + dy * dy);
						target.set(
							previous.x + d * Math.cos(angle),
							previous.y + d * Math.sin(angle)
						);
					}
				}

				this.onTargetMove(onMovePoint);
				this.reshape();
				DApplications.update(this);
			}
		} else {
			this.onTargetNotMove(e);
		}
	}

	protected onTargetMove(point: IPoint): void {
		// DO NOTHING
	}

	protected onTargetNotMove(e: InteractionEvent): void {
		// DO NOTHING
	}

	protected toSnapped(target: IPoint, diagram: DDiagramEditor, result: IPoint): void {
		diagram.snapper.toSnapped(target, result);
	}

	onUp(e: InteractionEvent): void {
		if (this._isEditing) {
			this._isEditing = false;
			this._target = null;
		}
	}

	protected onDone(): void {
		this._isEditing = false;
		if (this._isEdited) {
			this._isEdited = false;
			this.replace();
		}
		this.emit("done", this);
	}

	protected onCancel(): void {
		this._isEditing = false;
		this._isEdited = false;
		const parent = this.parent;
		if (parent) {
			parent.removeChild(this);
			DApplications.update(this);
		}
		this.emit("cancel", this);
	}

	onKeydown(e: KeyboardEvent): void {
		if (UtilKeyboardEvent.isCancelKey(e)) {
			this.onDone();
		} else if (UtilKeyboardEvent.isDeleteKey(e)) {
			const targetIndex = this._targetIndex;
			const points = this._points;
			if (0 <= targetIndex && targetIndex < points.length && 2 < points.length) {
				this._isEdited = true;
				points.splice(targetIndex, 1);
				if (targetIndex === points.length) {
					this._targetIndex -= 1;
					this.onTargetChange(this._targetIndex, null);
				}
				this.reshape();
				DApplications.update(this);
			}
		}
	}
}
