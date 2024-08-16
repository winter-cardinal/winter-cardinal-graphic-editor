import { EThemeShapeTable } from "../../../../extension/table/e-theme-shape-table";

export class EThemeDefaultEnUsShapeTable implements EThemeShapeTable {
	getName(): string {
		return "Table";
	}

	getHeaderName(): string {
		return "Table Header";
	}

	newHeaderLabel(): string {
		return "Label";
	}

	getBodyName(): string {
		return "Table Body";
	}
}
