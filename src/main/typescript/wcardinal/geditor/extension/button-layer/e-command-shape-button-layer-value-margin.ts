import { DCommandBase } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../../tool/e-tool-select-selection";
import { EShapeButtonLayer } from "./e-shape-button-layer";

export class ECommandShapeButtonLayerValueMargin extends DCommandBase {
	protected _selection: EToolSelectSelection;
	protected _values: number[];

	constructor(value: number, selection: EToolSelectSelection) {
		super();
		const shapes = selection.get();
		const values: number[] = [];
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			if (shape instanceof EShapeButtonLayer) {
				values.push(shape.button.margin);
				shape.button.margin = value;
			} else {
				values.push(0);
			}
		}
		this._values = values;
		this._selection = selection;
	}

	execute(): boolean {
		return true;
	}

	redo(): boolean {
		const selection = this._selection;
		const shapes = selection.get();
		const values: number[] = [];
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			if (shape instanceof EShapeButtonLayer) {
				const value = values[i];
				values[i] = shape.button.margin;
				shape.button.margin = value;
			}
		}
		selection.update("PROPERTY");
		return true;
	}

	undo(): boolean {
		return this.redo();
	}
}
