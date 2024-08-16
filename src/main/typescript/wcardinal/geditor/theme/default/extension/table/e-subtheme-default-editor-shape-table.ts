import { DThemes } from "@wcardinal/wcardinal-ui";
import { ESubthemeEditorShapeTable } from "../../../../extension/table/e-editor-shape-table";
import { EShapeTableRowSelectionType } from "../../../../extension/table/e-shape-table-row-selection";
import { EThemeShapeTable } from "../../../../extension/table/e-theme-shape-table";

export abstract class ESubthemeDefaultEditorShapeTable implements ESubthemeEditorShapeTable {
	protected _table: EThemeShapeTable;

	constructor() {
		this._table = DThemes.get<EThemeShapeTable>("EShapeTable");
	}

	getLabel(): string {
		return this._table.getName();
	}

	abstract getButtonNewTitle(): string;
	abstract getButtonDeleteTitle(): string;
	abstract getButtonBringForwardTitle(): string;
	abstract getButtonSendBackwardTitle(): string;
	abstract getInputRowHeightLabel(): string;
	abstract getSelectRowSelectionTypeLabel(): string;
	abstract toSelectRowSelectionTypeLabel(type: EShapeTableRowSelectionType): string;
}
