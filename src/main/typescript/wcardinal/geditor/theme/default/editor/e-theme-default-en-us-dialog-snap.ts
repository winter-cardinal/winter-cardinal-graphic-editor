import { ESnapperTargetValueType } from "@wcardinal/wcardinal-ui";
import { EThemeDefaultDialogSnap } from "./e-theme-default-dialog-snap";

export class EThemeDefaultEnUsDialogSnap extends EThemeDefaultDialogSnap {
	override getSelectDirectionLabel(): string | undefined {
		return "Dir.";
	}

	override getSelectDirectionValueLabel(value: ESnapperTargetValueType): string | undefined {
		switch (value) {
			case ESnapperTargetValueType.VERTICAL:
				return "Vertical";
			case ESnapperTargetValueType.HORIZONTAL:
				return "Horizontal";
		}
		return "Unknown";
	}

	override getInputPositionLabel(): string | undefined {
		return "Position";
	}
}
