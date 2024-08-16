import { DCommandBase, DList } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../../tool/e-tool-select-selection";
import { EShapeTable } from "./e-shape-table";
import { EShapeTableColumnValue } from "./e-shape-table-column-value";

export class ECommandShapeTableColumnValueReplace extends DCommandBase {
	protected _selection: EToolSelectSelection;
	protected _oldValue: EShapeTableColumnValue;
	protected _newValue: EShapeTableColumnValue;
	protected _indices: number[];
	protected _oldValues: EShapeTableColumnValue[];
	protected _list: DList<EShapeTableColumnValue>;

	constructor(
		oldValue: EShapeTableColumnValue,
		newValue: EShapeTableColumnValue,
		selection: EToolSelectSelection,
		list: DList<EShapeTableColumnValue>
	) {
		super();
		this._selection = selection;
		this._oldValue = oldValue;
		this._newValue = newValue;
		this._list = list;

		const indices: number[] = [];
		const oldValues: EShapeTableColumnValue[] = [];
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			if (shape instanceof EShapeTable) {
				const index = shape.column.indexOf(oldValue);
				indices.push(index);
				if (0 <= index) {
					oldValues.push(shape.column.get(index)!);
					shape.column.set(index, newValue);
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
			if (shape instanceof EShapeTable) {
				const index = indices[i];
				if (0 <= index) {
					shape.column.set(index, newValue);
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
			if (shape instanceof EShapeTable) {
				const index = indices[i];
				if (0 <= index) {
					shape.column.set(index, oldValues[i]);
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
