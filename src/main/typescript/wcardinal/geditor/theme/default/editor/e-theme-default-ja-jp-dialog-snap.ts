import { ESnapperTargetValueType } from "@wcardinal/wcardinal-ui";
import { EThemeDefaultDialogSnap } from "./e-theme-default-dialog-snap";

export class EThemeDefaultJaJpDialogSnap extends EThemeDefaultDialogSnap {
	override getSelectDirectionLabel(): string | undefined {
		return "方向";
	}

	override getSelectDirectionValueLabel(value: ESnapperTargetValueType): string | undefined {
		switch (value) {
			case ESnapperTargetValueType.VERTICAL:
				return "垂直";
			case ESnapperTargetValueType.HORIZONTAL:
				return "水平";
		}
		return "不明";
	}

	override getInputPositionLabel(): string | undefined {
		return "位置";
	}
}
