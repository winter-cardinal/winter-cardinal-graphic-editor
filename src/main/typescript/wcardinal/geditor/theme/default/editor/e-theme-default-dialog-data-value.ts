import {
	DThemeDialogLayered,
	DThemes,
	EShapeDataValueOrder,
	EShapeDataValueRangeType,
	EShapeDataValueScope,
	EShapeDataValueType
} from "@wcardinal/wcardinal-ui";
import type { EThemeDialogDataValue } from "../../../editor/e-dialog-data-value";

export abstract class EThemeDefaultDialogDataValue
	extends DThemes.getClass<DThemeDialogLayered>("DDialogLayered")
	implements EThemeDialogDataValue
{
	abstract getInputIdLabel(): string | undefined;

	abstract getInputAsLabel(): string | undefined;

	abstract getSelectTypeLabel(): string | undefined;

	abstract getSelectTypeValueLabel(type: EShapeDataValueType): string | undefined;

	abstract getSelectScopeLabel(): string | undefined;

	abstract getSelectScopeValueLabel(type: EShapeDataValueScope): string | undefined;

	abstract getInputInitialLabel(): string | undefined;

	abstract getInputIntervalLabel(): string | undefined;

	abstract getInputIntervalUnitLabel(): string | undefined;

	abstract getInputFormatLabel(): string | undefined;

	abstract getSelectRangeTypeLabel(): string | undefined;

	abstract getSelectRangeTypeValueLabel(type: EShapeDataValueRangeType): string | undefined;

	abstract getInputRangeFromLabel(): string | undefined;

	abstract getInputRangeToLabel(): string | undefined;

	abstract getInputCapacityLabel(): string | undefined;

	abstract getSelectOrderLabel(): string | undefined;

	abstract getSelectOrderValueLabel(order: EShapeDataValueOrder): string | undefined;
}
