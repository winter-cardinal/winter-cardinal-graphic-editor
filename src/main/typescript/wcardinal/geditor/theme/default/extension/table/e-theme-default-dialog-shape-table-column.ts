import { DThemeDialogLayered, DThemes, EShapeTextAlignHorizontal } from "@wcardinal/wcardinal-ui";
import { EShapeTableColumnValueType } from "../../../../extension/table/e-shape-table-column-value";
import { EThemeDialogShapeTableColumn } from "../../../../extension/table/e-dialog-shape-table-column";

export abstract class EThemeDefaultDialogShapeTableColumn
	extends DThemes.getClass<DThemeDialogLayered>("DDialogLayered")
	implements EThemeDialogShapeTableColumn
{
	abstract getSelectColumnValueTypeLabel(): string;
	abstract toSelectColumnValueTypeLabel(type: EShapeTableColumnValueType): string;
	abstract getInputLabelLabel(): string;
	abstract newInputLabel(): string;
	abstract getInputWidthLabel(): string;
	abstract getInputGetterLabel(): string;
	abstract getInputSetterLabel(): string;
	abstract getInputFormatLabel(): string;
	abstract getSelectTextAlignLabel(): string;
	abstract toTextAlignLabel(align: EShapeTextAlignHorizontal): string;
}
