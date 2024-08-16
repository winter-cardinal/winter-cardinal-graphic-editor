import { EShapeTextAlignHorizontal } from "@wcardinal/wcardinal-ui";
import { EShapeTableColumnValueType } from "../../../../extension/table/e-shape-table-column-value";
import { EThemeDefaultDialogShapeTableColumn } from "./e-theme-default-dialog-shape-table-column";

export class EThemeDefaultJaJpDialogShapeTableColumn extends EThemeDefaultDialogShapeTableColumn {
	override getSelectColumnValueTypeLabel(): string {
		return "種別";
	}

	override toSelectColumnValueTypeLabel(type: EShapeTableColumnValueType): string {
		switch (type) {
			case EShapeTableColumnValueType.NUMBER:
				return "数値";
			default:
				return "文字";
		}
	}

	override getInputLabelLabel(): string {
		return "ラベル";
	}

	override newInputLabel(): string {
		return "ラベル";
	}

	override getInputWidthLabel(): string {
		return "横幅";
	}

	override getInputGetterLabel(): string {
		return "ゲッター";
	}

	override getInputSetterLabel(): string {
		return "セッター";
	}

	override getInputFormatLabel(): string {
		return "書式";
	}

	override getSelectTextAlignLabel(): string {
		return "文字寄せ";
	}

	override toTextAlignLabel(align: EShapeTextAlignHorizontal): string {
		switch (align) {
			case EShapeTextAlignHorizontal.LEFT:
				return "左寄せ";
			case EShapeTextAlignHorizontal.RIGHT:
				return "右寄せ";
			default:
				return "中央揃え";
		}
	}
}
