import { EShape, EShapeRuntimeImpl } from "@wcardinal/wcardinal-ui";
import { EShapeTable } from "./e-shape-table";
import { EShapeTableActionRuntime } from "./e-shape-table-action-runtime";
import { EShapeTableColumnValueRuntime } from "./e-shape-table-column-value-runtime";

export class EShapeTableRuntime extends EShapeRuntimeImpl {
	constructor(shape: EShape) {
		super(shape);
		if (shape instanceof EShapeTable) {
			// Columns
			const values = shape.column.values;
			for (let i = 0, imax = values.length; i < imax; ++i) {
				const value = values[i];
				value.runtime = new EShapeTableColumnValueRuntime(value);
			}

			// Action
			this.actions.push(new EShapeTableActionRuntime(shape));
		}
	}
}
