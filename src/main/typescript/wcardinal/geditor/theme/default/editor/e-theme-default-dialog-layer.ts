import {
	DThemeDialogLayered,
	DThemes,
	EShapeActionValueGestureOperationType
} from "@wcardinal/wcardinal-ui";
import type { EThemeDialogLayer } from "../../../editor/e-dialog-layer";

export abstract class EThemeDefaultDialogLayer
	extends DThemes.getClass<DThemeDialogLayered>("DDialogLayered")
	implements EThemeDialogLayer
{
	abstract getInputNameLabel(): string | undefined;

	abstract getInputPositionLabel(): string | undefined;

	abstract getInputSizeLabel(): string | undefined;

	abstract getTextBackgroundLabel(): string | undefined;

	abstract getCheckBackgroundLabel(): string | undefined;

	abstract getCheckVisibleLabel(): string | undefined;

	abstract getCheckInteractiveLabel(): string | undefined;

	abstract getSelectGestureLabel(): string | undefined;

	abstract getSelectGestureValueLabel(
		type: EShapeActionValueGestureOperationType
	): string | undefined;
}
