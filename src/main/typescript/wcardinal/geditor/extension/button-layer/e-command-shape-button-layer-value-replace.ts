import { DCommandBase, DList } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../../tool/e-tool-select-selection";
import { EShapeButtonLayer } from "./e-shape-button-layer";
import { EShapeButtonLayerButtonValue } from "./e-shape-button-layer-button-value";

export class ECommandShapeButtonLayerValueReplace extends DCommandBase {
	protected _selection: EToolSelectSelection;
	protected _oldValue: EShapeButtonLayerButtonValue;
	protected _newValue: EShapeButtonLayerButtonValue;
	protected _indices: number[];
	protected _oldValues: EShapeButtonLayerButtonValue[];
	protected _list: DList<EShapeButtonLayerButtonValue>;

	constructor(
		oldValue: EShapeButtonLayerButtonValue,
		newValue: EShapeButtonLayerButtonValue,
		selection: EToolSelectSelection,
		list: DList<EShapeButtonLayerButtonValue>
	) {
		super();
		this._selection = selection;
		this._oldValue = oldValue;
		this._newValue = newValue;
		this._list = list;

		const indices: number[] = [];
		const oldValues: EShapeButtonLayerButtonValue[] = [];
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			if (shape instanceof EShapeButtonLayer) {
				const index = shape.button.indexOf(oldValue);
				indices.push(index);
				if (0 <= index) {
					oldValues.push(shape.button.get(index)!);
					shape.button.set(index, newValue);
				} else {
					oldValues.push(newValue);
				}
			} else {
				indices.push(-1);
				oldValues.push(newValue);
			}
		}
		this._indices = indices;
		this._oldValues = oldValues;
		if (list.data.selection.contains(oldValue)) {
			list.data.selection.clearAndAdd(newValue);
		}
		this._selection.update("PROPERTY");
	}

	execute(): boolean {
		return true;
	}

	redo(): boolean {
		const newValue = this._newValue;
		const indices = this._indices;
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			if (shape instanceof EShapeButtonLayer) {
				const index = indices[i];
				if (0 <= index) {
					shape.button.set(index, newValue);
				}
			}
		}
		const list = this._list;
		if (list.data.selection.contains(this._oldValue)) {
			list.data.selection.clearAndAdd(newValue);
		}
		this._selection.update("PROPERTY");
		return true;
	}

	undo(): boolean {
		const indices = this._indices;
		const oldValues = this._oldValues;
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			if (shape instanceof EShapeButtonLayer) {
				const index = indices[i];
				if (0 <= index) {
					shape.button.set(index, oldValues[i]);
				}
			}
		}
		const list = this._list;
		if (list.data.selection.contains(this._newValue)) {
			list.data.selection.clearAndAdd(this._oldValue);
		}
		this._selection.update("PROPERTY");
		return true;
	}
}
