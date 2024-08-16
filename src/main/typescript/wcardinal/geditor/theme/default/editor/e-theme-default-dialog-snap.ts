import { DThemeDialogLayered, DThemes, ESnapperTargetValueType } from "@wcardinal/wcardinal-ui";
import type { EThemeDialogSnap } from "../../../editor/e-dialog-snap";

export abstract class EThemeDefaultDialogSnap
	extends DThemes.getClass<DThemeDialogLayered>("DDialogLayered")
	implements EThemeDialogSnap
{
	abstract getSelectDirectionLabel(): string | undefined;

	abstract getSelectDirectionValueLabel(value: ESnapperTargetValueType): string | undefined;

	abstract getInputPositionLabel(): string | undefined;
}
