import {
	createLine,
	DApplications,
	DControllers,
	DDiagramEditor,
	EShapeDefaults,
	EShapeLine,
	EShapePointsStyle,
	UtilKeyboardEvent,
	UtilPointerEvent
} from "@wcardinal/wcardinal-ui";
import { InteractionEvent, Point } from "pixi.js";
import { ECommandShapeCreate } from "../command/e-command-shape-create";
import { EToolImpl } from "./e-tool-impl";
import { EToolSelectSelection } from "./e-tool-select-selection";

export interface EToolShapeCreateLineOptions {
	selection: EToolSelectSelection;
	diagram: DDiagramEditor;
}

export class EToolShapeCreateLine<
	OPTIONS extends EToolShapeCreateLineOptions = EToolShapeCreateLineOptions
> extends EToolImpl {
	protected _line?: EShapeLine;

	protected _options: OPTIONS;
	protected _selection: EToolSelectSelection;
	protected _diagram: DDiagramEditor;
	protected _isNewPoint: boolean;

	protected _onDownPoint: Point;
	protected _onMovePoint: Point;
	protected _onDownBound: (e: InteractionEvent) => void;
	protected _onMoveBound: (e: InteractionEvent) => void;
	protected _onDblClickBound: () => void;
	protected _onKeydownBound: (e: KeyboardEvent) => void;

	constructor(options: OPTIONS) {
		super();

		this._options = options;
		this._selection = options.selection;
		this._diagram = options.diagram;
		this._isNewPoint = false;

		this._onDownPoint = new Point();
		this._onMovePoint = new Point();
		this._onDownBound = (e: InteractionEvent): void => {
			this.onDown(e);
		};
		this._onMoveBound = (e: InteractionEvent): void => {
			this.onMove(e);
		};
		this._onDblClickBound = (): void => {
			this.onDblClick();
		};
		this._onKeydownBound = (e: KeyboardEvent): void => {
			this.onKeydown(e);
		};
	}

	protected onActivate(): void {
		const diagram = this._diagram;
		diagram.on(UtilPointerEvent.down, this._onDownBound);
		diagram.on(UtilPointerEvent.move, this._onMoveBound);
		diagram.on("dblclick", this._onDblClickBound);
		diagram.on("keydown", this._onKeydownBound);

		const selection = this._selection;
		selection.modifier.disallow();
		selection.updateModifier();
	}

	protected onDeactivate(): void {
		const diagram = this._diagram;
		diagram.off(UtilPointerEvent.down, this._onDownBound);
		diagram.off(UtilPointerEvent.move, this._onMoveBound);
		diagram.off("dblclick", this._onDblClickBound);
		diagram.off("keydown", this._onKeydownBound);
		this.onCancel();

		const selection = this._selection;
		selection.modifier.allow();
		selection.updateModifier();
	}

	onDown(e: InteractionEvent): void {
		const originalEvent = e.data.originalEvent;
		if (originalEvent.altKey) {
			return;
		}
		const diagram = this._diagram;
		const canvas = diagram.canvas;
		const layer = diagram.layer;
		if (canvas && layer) {
			this._isNewPoint = true;
			const line = this._line;
			if (line == null) {
				const onDownPoint = this._onDownPoint;
				canvas.toLocal(e.data.global, undefined, onDownPoint);
				diagram.snapper.toSnapped(onDownPoint, onDownPoint);
				layer.transform.localTransform.applyInverse(onDownPoint, onDownPoint);
				const newLine = createLine(
					[onDownPoint.x, onDownPoint.y],
					[],
					EShapeDefaults.STROKE_WIDTH,
					EShapePointsStyle.NONE
				);
				newLine.attach(layer);
				this._line = newLine;
			}
		}
	}

	onMove(e: InteractionEvent): void {
		const originalEvent = e.data.originalEvent;
		if (originalEvent.altKey) {
			return;
		}
		const line = this._line;
		if (line) {
			const diagram = this._diagram;
			const canvas = diagram.canvas;
			if (canvas) {
				const values = line.points.values;
				if (this._isNewPoint) {
					this._isNewPoint = false;
					values.push(0, 0);
				}

				const onMovePoint = this._onMovePoint;
				canvas.toLocal(e.data.global, undefined, onMovePoint);
				diagram.snapper.toSnapped(onMovePoint, onMovePoint);
				const parent = line.parent;
				if (parent) {
					parent.transform.localTransform.applyInverse(onMovePoint, onMovePoint);
				}
				const position = line.transform.position;
				const x = onMovePoint.x - position.x;
				const y = onMovePoint.y - position.y;
				const length = values.length;
				if (originalEvent.shiftKey && 4 <= length) {
					const px = values[length - 4];
					const py = values[length - 3];
					const dx = x - px;
					const dy = y - py;
					const dangle = Math.PI * 0.25;
					const angle = Math.round(Math.atan2(dy, dx) / dangle) * dangle;
					const d = Math.sqrt(dx * dx + dy * dy) | 0;
					values[length - 2] = px + d * Math.cos(angle);
					values[length - 1] = py + d * Math.sin(angle);
				} else {
					values[length - 2] = x | 0;
					values[length - 1] = y | 0;
				}
				line.points.values = values;
				DApplications.update(diagram);
			}
		}
	}

	protected toValues(line: EShapeLine): number[] {
		const position = line.transform.position;
		const px = position.x;
		const py = position.y;
		const values = line.points.values;

		const result: number[] = [];
		let prevx = NaN;
		let prevy = NaN;
		for (let i = 0, imax = values.length; i < imax; i += 2) {
			const x = values[i + 0];
			const y = values[i + 1];
			if (prevx !== x || prevy !== y) {
				result.push(px + x, py + y);
				prevx = x;
				prevy = y;
			}
		}
		return result;
	}

	protected add(values: number[]): void {
		const diagram = this._diagram;
		const layer = diagram.layer;
		if (layer && 4 <= values.length) {
			const newLine = createLine(
				values,
				[],
				EShapeDefaults.STROKE_WIDTH,
				EShapePointsStyle.NONE
			);
			newLine.attach(layer);
			DControllers.getCommandController().push(
				new ECommandShapeCreate([newLine], layer, this._selection, true)
			);
		}
	}

	onDblClick(): void {
		const line = this._line;
		if (line) {
			this._line = undefined;
			line.detach();
			this.add(this.toValues(line));
			DApplications.update(this._diagram);
			this.emit("done", this);
		}
	}

	protected onCancel(): void {
		const line = this._line;
		if (line) {
			line.points.values.length -= 2;
			this.onDblClick();
		}
	}

	onKeydown(e: KeyboardEvent): void {
		if (UtilKeyboardEvent.isCancelKey(e)) {
			this.onCancel();
		}
	}
}
