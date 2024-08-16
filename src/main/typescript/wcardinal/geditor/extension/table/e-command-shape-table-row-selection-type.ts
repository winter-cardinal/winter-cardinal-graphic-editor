import { DCommandBase } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../../tool/e-tool-select-selection";
import { EShapeTable } from "./e-shape-table";
import { EShapeTableRowSelectionType } from "./e-shape-table-row-selection";

export class ECommandShapeTableRowSelectionType extends DCommandBase {
	protected _selection: EToolSelectSelection;
	protected _values: EShapeTableRowSelectionType[];

	constructor(value: EShapeTableRowSelectionType, selection: EToolSelectSelection) {
		super();
		const shapes = selection.get();
		const values: EShapeTableRowSelectionType[] = [];
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			if (shape instanceof EShapeTable) {
				values.push(shape.row.selection.type);
				shape.row.selection.type = value;
			} else {
				values.push(EShapeTableRowSelectionType.NONE);
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
		const values: EShapeTableRowSelectionType[] = [];
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			if (shape instanceof EShapeTable) {
				const value = values[i];
				values[i] = shape.row.selection.type;
				shape.row.selection.type = value;
			}
		}
		selection.update("PROPERTY");
		return true;
	}

	undo(): boolean {
		return this.redo();
	}
}
