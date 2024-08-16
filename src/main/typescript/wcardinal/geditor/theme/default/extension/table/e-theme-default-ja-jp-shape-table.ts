import { EThemeShapeTable } from "../../../../extension/table/e-theme-shape-table";

export class EThemeDefaultJaJpShapeTable implements EThemeShapeTable {
	getName(): string {
		return "テーブル";
	}

	getHeaderName(): string {
		return "テーブルヘッダー";
	}

	newHeaderLabel(): string {
		return "ラベル";
	}

	getBodyName(): string {
		return "テーブルボディー";
	}
}
