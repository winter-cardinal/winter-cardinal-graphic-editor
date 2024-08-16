import { EShapeTableRowSelectionType } from "../../../../extension/table/e-shape-table-row-selection";
import { ESubthemeDefaultEditorShapeTable } from "./e-subtheme-default-editor-shape-table";

export class ESubthemeDefaultJaJpEditorShapeTable extends ESubthemeDefaultEditorShapeTable {
	override getButtonNewTitle(): string {
		return "新規列の作成";
	}

	override getButtonDeleteTitle(): string {
		return "選択列の削除";
	}

	override getButtonBringForwardTitle(): string {
		return "選択列を前に移動";
	}

	override getButtonSendBackwardTitle(): string {
		return "選択列を後ろに移動";
	}

	override getInputRowHeightLabel(): string {
		return "行の高さ";
	}

	override getSelectRowSelectionTypeLabel(): string {
		return "行の選択方法";
	}

	override toSelectRowSelectionTypeLabel(type: EShapeTableRowSelectionType): string {
		switch (type) {
			case EShapeTableRowSelectionType.NONE:
				return "なし";
			case EShapeTableRowSelectionType.SINGLE:
				return "シングル";
			case EShapeTableRowSelectionType.MULTIPLE:
				return "マルチ";
		}
	}
}
