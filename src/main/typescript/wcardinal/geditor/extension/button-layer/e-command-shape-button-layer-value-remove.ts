import { DCommandBase } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../../tool/e-tool-select-selection";
import { EShapeButtonLayer } from "./e-shape-button-layer";
import { EShapeButtonLayerButtonValue } from "./e-shape-button-layer-button-value";

export class ECommandShapeButtonLayerValueRemove extends DCommandBase {
	protected _selection: EToolSelectSelection;
	protected _target: EShapeButtonLayerButtonValue;
	protected _indices: number[];

	constructor(target: EShapeButtonLayerButtonValue, selection: EToolSelectSelection) {
		super();
		this._selection = selection;
		this._target = target;
		const indices: number[] = [];
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			if (shape instanceof EShapeButtonLayer) {
				const index = shape.button.indexOf(target);
				indices.push(index);
				if (0 <= index) {
					shape.button.remove(index);
				}
			}
		}
		this._indices = indices;
		this._selection.update("PROPERTY");
	}

	execute(): boolean {
		return true;
	}

	redo(): boolean {
		const indices = this._indices;
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			if (shape instanceof EShapeButtonLayer) {
				const index = indices[i];
				if (0 <= index) {
					shape.button.remove(index);
				}
			}
		}
		this._selection.update("PROPERTY");
		return true;
	}

	undo(): boolean {
		const target = this._target;
		const indices = this._indices;
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			if (shape instanceof EShapeButtonLayer) {
				const index = indices[i];
				if (0 <= index) {
					shape.button.add(target, index);
				}
			}
		}
		this._selection.update("PROPERTY");
		return true;
	}
}
