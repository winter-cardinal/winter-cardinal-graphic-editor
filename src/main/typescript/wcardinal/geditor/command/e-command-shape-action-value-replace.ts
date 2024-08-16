import { DCommandBase, DList, EShapeActionValue } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";

export class ECommandShapeActionValueReplace extends DCommandBase {
	protected _selection: EToolSelectSelection;
	protected _oldValue: EShapeActionValue;
	protected _newValue: EShapeActionValue;
	protected _indices: number[];
	protected _oldValues: EShapeActionValue[];
	protected _list: DList<EShapeActionValue>;

	constructor(
		oldValue: EShapeActionValue,
		newValue: EShapeActionValue,
		selection: EToolSelectSelection,
		list: DList<EShapeActionValue>
	) {
		super();
		this._selection = selection;
		this._oldValue = oldValue;
		this._newValue = newValue;
		this._list = list;
		this._indices = [];
		this._oldValues = [];
	}

	get selection(): EToolSelectSelection {
		return this._selection;
	}

	get oldValue(): EShapeActionValue {
		return this._oldValue;
	}

	get newValue(): EShapeActionValue {
		return this._newValue;
	}

	get indices(): number[] {
		return this._indices;
	}

	get oldValues(): EShapeActionValue[] {
		return this._oldValues;
	}

	get list(): DList<EShapeActionValue> {
		return this._list;
	}

	execute(): boolean {
		const oldValue = this._oldValue;
		const newValue = this._newValue;

		const indices = this._indices;
		const oldValues = this._oldValues;
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			const index = shape.action.indexOf(oldValue);
			indices.push(index);
			if (0 <= index) {
				oldValues.push(shape.action.get(index)!);
				shape.action.set(index, newValue);
			} else {
				oldValues.push(newValue);
			}
		}

		const list = this._list;
		if (list.data.selection.contains(oldValue)) {
			list.data.selection.clearAndAdd(newValue);
		}
		this._selection.update("PROPERTY");
		return true;
	}

	redo(): boolean {
		const newValue = this._newValue;
		const indices = this._indices;
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const index = indices[i];
			if (0 <= index) {
				shapes[i].action.set(index, newValue);
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
				shapes[i].action.set(index, oldValues[i]);
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
