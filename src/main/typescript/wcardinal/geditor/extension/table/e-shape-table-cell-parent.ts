import { EShapeData } from "@wcardinal/wcardinal-ui";
import { EShapeTableColumn } from "./e-shape-table-column";

export interface EShapeTableCellParent {
	column: EShapeTableColumn;
	data: EShapeData;
}
