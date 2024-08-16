import { DCommandBase } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../../tool/e-tool-select-selection";
import { EShapeTable } from "./e-shape-table";

export class ECommandShapeTableRowHeight extends DCommandBase {
	protected _selection: EToolSelectSelection;
	protected _values: number[];

	constructor(value: number, selection: EToolSelectSelection) {
		super();
		const shapes = selection.get();
		const values: number[] = [];
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			if (shape instanceof EShapeTable) {
				values.push(shape.row.height);
				shape.row.height = value;
			} else {
				values.push(35);
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
			if (shape instanceof EShapeTable) {
				const value = values[i];
				values[i] = shape.row.height;
				shape.row.height = value;
			}
		}
		selection.update("PROPERTY");
		return true;
	}

	undo(): boolean {
		return this.redo();
	}
}
