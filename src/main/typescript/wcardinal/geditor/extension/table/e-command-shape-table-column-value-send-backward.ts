import { DCommandBase } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../../tool/e-tool-select-selection";
import { EShapeTable } from "./e-shape-table";
import { EShapeTableColumnValue } from "./e-shape-table-column-value";

export class ECommandShapeTableColumnValueSendBackward extends DCommandBase {
	protected _selection: EToolSelectSelection;
	protected _target: EShapeTableColumnValue;
	protected _indices: number[];

	constructor(target: EShapeTableColumnValue, selection: EToolSelectSelection) {
		super();
		this._selection = selection;
		this._target = target;

		const indices: number[] = [];
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			if (shape instanceof EShapeTable) {
				const column = shape.column;
				const index = column.indexOf(target);
				indices.push(index);
				if (0 <= index && index < column.size() - 1) {
					column.swap(index + 1, index);
				}
			} else {
				indices.push(-1);
			}
		}
		this._indices = indices;
		this._selection.update("PROPERTY");
	}

	execute(): boolean {
		return true;
	}

	redo(): boolean {
		const shapes = this._selection.get();
		const indices = this._indices;
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			if (shape instanceof EShapeTable) {
				const column = shape.column;
				const index = indices[i];
				if (0 <= index && index < column.size() - 1) {
					column.swap(index + 1, index);
				}
			}
		}
		this._selection.update("PROPERTY");
		return true;
	}

	undo(): boolean {
		return this.redo();
	}
}
