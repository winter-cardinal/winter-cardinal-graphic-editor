import { EShape, EShapeActionRuntimeBase, EShapeRuntime } from "@wcardinal/wcardinal-ui";
import { EShapeTable } from "./e-shape-table";
import { EShapeTableColumn } from "./e-shape-table-column";
import { EShapeTableIds } from "./e-shape-table-ids";
import { UtilShapeSearch } from "../../util/util-shape-search";

export class EShapeTableActionRuntime extends EShapeActionRuntimeBase {
	body: EShape | null;
	column?: EShapeTableColumn;

	constructor(table: EShapeTable) {
		super();
		this.body = UtilShapeSearch.findChildByType(table, EShapeTableIds.BODY_ID);
		this.column = table.column;
	}

	execute(shape: EShape, runtime: EShapeRuntime, time: number): void {
		const body = this.body;
		const column = this.column;
		if (body != null && column != null) {
			const data = shape.data;
			if (data.isChanged) {
				const rows = body.children;
				const rowsLength = rows.length;
				const first = data.get(0);
				if (first != null) {
					const columnValues = column.values;
					const values = first.values;
					const valuesLength = values.length;
					const imin = Math.min(rowsLength, valuesLength);
					for (let i = 0; i < imin; ++i) {
						const value = values[i];
						const row = rows[i];
						const cells = row.children;
						const cellsLength = cells.length;
						const jmin = Math.min(cellsLength, columnValues.length);
						for (let j = 0; j < jmin; ++j) {
							const cell = cells[j];
							const columnValue = columnValues[j];
							const columnRuntime = columnValue.runtime;
							if (columnRuntime != null) {
								cell.state.isFocusable = true;
								cell.text.value = columnRuntime.formatter(
									columnRuntime.toValue(value, j, values),
									j
								);
							}
						}

						for (let j = jmin; j < cellsLength; ++j) {
							const cell = cells[j];
							cell.state.isFocusable = false;
							cell.text.value = "";
						}
					}

					for (let i = imin; i < rowsLength; ++i) {
						const row = rows[i];
						const cells = row.children;
						const cellsLength = cells.length;
						for (let j = 0; j < cellsLength; ++j) {
							const cell = cells[j];
							cell.state.isFocusable = false;
							cell.text.value = "";
						}
					}
				} else {
					for (let i = 0; i < rowsLength; ++i) {
						const row = rows[i];
						const cells = row.children;
						const cellsLength = cells.length;
						for (let j = 0; j < cellsLength; ++j) {
							const cell = cells[j];
							cell.state.isFocusable = false;
							cell.text.value = "";
						}
					}
				}
			}
		}
	}
}
