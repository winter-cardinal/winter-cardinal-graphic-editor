import { EShapeTextAlignHorizontal } from "@wcardinal/wcardinal-ui";
import { EShapeTableColumnValueType } from "../../../../extension/table/e-shape-table-column-value";
import { EThemeDefaultDialogShapeTableColumn } from "./e-theme-default-dialog-shape-table-column";

export class EThemeDefaultEnUsDialogShapeTableColumn extends EThemeDefaultDialogShapeTableColumn {
	override getSelectColumnValueTypeLabel(): string {
		return "Type";
	}

	override toSelectColumnValueTypeLabel(type: EShapeTableColumnValueType): string {
		switch (type) {
			case EShapeTableColumnValueType.NUMBER:
				return "Number";
			default:
				return "Text";
		}
	}

	override getInputLabelLabel(): string {
		return "Label";
	}

	override newInputLabel(): string {
		return "Label";
	}

	override getInputWidthLabel(): string {
		return "Width";
	}

	override getInputGetterLabel(): string {
		return "Getter";
	}

	override getInputSetterLabel(): string {
		return "Setter";
	}

	override getInputFormatLabel(): string {
		return "Format";
	}

	override getSelectTextAlignLabel(): string {
		return "Align";
	}

	override toTextAlignLabel(align: EShapeTextAlignHorizontal): string {
		switch (align) {
			case EShapeTextAlignHorizontal.LEFT:
				return "Left";
			case EShapeTextAlignHorizontal.RIGHT:
				return "Right";
			default:
				return "Center";
		}
	}
}
