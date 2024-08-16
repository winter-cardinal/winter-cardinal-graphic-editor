import { EShapeTableCellParent } from "./e-shape-table-cell-parent";

export class EShapeTableCell {
	protected _parent: EShapeTableCellParent;

	constructor(parent: EShapeTableCellParent) {
		this._parent = parent;
	}

	get values(): unknown[][] {
		const parent = this._parent;
		const values = parent.data.values;
		const columnValues = parent.column.values;
		const result: unknown[][] = [];
		for (let i = 0, imax = values.length; i < imax; ++i) {
			const value = values[i];
			const row: unknown[] = [];
			for (let j = 0, jmax = columnValues.length; j < jmax; ++j) {
				const columnValue = columnValues[j];
				const columnValueRuntime = columnValue.runtime;
				if (columnValueRuntime != null) {
					row.push(columnValueRuntime.toValue(value, j, values));
				}
			}
			result.push(row);
		}
		return result;
	}
}
