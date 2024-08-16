import { EShapeTableRowSelectionType } from "../../../../extension/table/e-shape-table-row-selection";
import { ESubthemeDefaultEditorShapeTable } from "./e-subtheme-default-editor-shape-table";

export class ESubthemeDefaultEnUsEditorShapeTable extends ESubthemeDefaultEditorShapeTable {
	override getButtonNewTitle(): string {
		return "Create New Column";
	}

	override getButtonDeleteTitle(): string {
		return "Delete Selected Column";
	}

	override getButtonBringForwardTitle(): string {
		return "Bring Selected Column Forward";
	}

	override getButtonSendBackwardTitle(): string {
		return "Send Selected Column Backward";
	}

	override getInputRowHeightLabel(): string {
		return "Row Height";
	}

	override getSelectRowSelectionTypeLabel(): string {
		return "Row Selection Type";
	}

	override toSelectRowSelectionTypeLabel(type: EShapeTableRowSelectionType): string {
		switch (type) {
			case EShapeTableRowSelectionType.NONE:
				return "None";
			case EShapeTableRowSelectionType.SINGLE:
				return "Single";
			case EShapeTableRowSelectionType.MULTIPLE:
				return "Multiple";
		}
	}
}
