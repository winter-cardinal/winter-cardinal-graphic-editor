import { DCommandBase } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../../tool/e-tool-select-selection";
import { EShapeButtonLayer } from "./e-shape-button-layer";
import { EShapeButtonLayerButtonValue } from "./e-shape-button-layer-button-value";

export class ECommandShapeButtonLayerValueAdd extends DCommandBase {
	protected _selection: EToolSelectSelection;
	protected _value: EShapeButtonLayerButtonValue;

	constructor(value: EShapeButtonLayerButtonValue, selection: EToolSelectSelection) {
		super();
		this._selection = selection;
		this._value = value;
	}

	execute(): boolean {
		return this.redo();
	}

	redo(): boolean {
		const value = this._value;
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			if (shape instanceof EShapeButtonLayer) {
				shape.button.add(value);
			}
		}
		this._selection.update("PROPERTY");
		return true;
	}

	undo(): boolean {
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			if (shape instanceof EShapeButtonLayer) {
				shape.button.remove(shape.button.size() - 1);
			}
		}
		this._selection.update("PROPERTY");
		return true;
	}
}
