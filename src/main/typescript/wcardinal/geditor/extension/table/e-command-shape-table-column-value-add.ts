import { DCommandBase } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../../tool/e-tool-select-selection";
import { EShapeTable } from "./e-shape-table";
import { EShapeTableColumnValue } from "./e-shape-table-column-value";

export class ECommandShapeTableColumnValueAdd extends DCommandBase {
	protected _selection: EToolSelectSelection;
	protected _value: EShapeTableColumnValue;

	constructor(value: EShapeTableColumnValue, selection: EToolSelectSelection) {
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
			if (shape instanceof EShapeTable) {
				shape.column.add(value);
			}
		}
		this._selection.update("PROPERTY");
		return true;
	}

	undo(): boolean {
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			if (shape instanceof EShapeTable) {
				shape.column.remove(shape.column.size() - 1);
			}
		}
		this._selection.update("PROPERTY");
		return true;
	}
}
