import { DCommandBase, DList, EShapeDataValue } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";

export class ECommandShapeDataValueReplace extends DCommandBase {
	protected _selection: EToolSelectSelection;
	protected _oldValue: EShapeDataValue;
	protected _newValue: EShapeDataValue;
	protected _indices: number[];
	protected _oldValues: EShapeDataValue[];
	protected _list: DList<EShapeDataValue>;

	constructor(
		oldValue: EShapeDataValue,
		newValue: EShapeDataValue,
		selection: EToolSelectSelection,
		list: DList<EShapeDataValue>
	) {
		super();
		this._selection = selection;
		this._oldValue = oldValue;
		this._newValue = newValue;
		this._list = list;

		const indices: number[] = [];
		const oldValues: EShapeDataValue[] = [];
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			const index = shape.data.indexOf(oldValue);
			indices.push(index);
			if (0 <= index) {
				oldValues.push(shape.data.get(index)!);
				shape.data.set(index, newValue);
			} else {
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

	get selection(): EToolSelectSelection {
		return this._selection;
	}

	get oldValue(): EShapeDataValue {
		return this._oldValue;
	}

	get newValue(): EShapeDataValue {
		return this._newValue;
	}

	get indices(): number[] {
		return this._indices;
	}

	get oldValues(): EShapeDataValue[] {
		return this._oldValues;
	}

	get list(): DList<EShapeDataValue> {
		return this._list;
	}

	execute(): boolean {
		return true;
	}

	redo(): boolean {
		const newValue = this._newValue;
		const indices = this._indices;
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const index = indices[i];
			if (0 <= index) {
				shapes[i].data.set(index, newValue);
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
			const index = indices[i];
			if (0 <= index) {
				shapes[i].data.set(index, oldValues[i]);
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
