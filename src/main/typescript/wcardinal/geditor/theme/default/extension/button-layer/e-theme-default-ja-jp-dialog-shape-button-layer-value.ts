import { EThemeDefaultDialogShapeButtonLayerValue } from "./e-theme-default-dialog-shape-button-layer-value";

export class EThemeDefaultJaJpDialogShapeButtonLayerValue extends EThemeDefaultDialogShapeButtonLayerValue {
	override getInputLabelLabel(): string {
		return "ラベル";
	}

	override newInputLabel(): string {
		return "ラベル";
	}

	override getInputWidthLabel(): string {
		return "横幅";
	}

	override getSelectLayerLabel(): string {
		return "レイヤー";
	}

	override getCheckBringToFromLabel(): string {
		return "前面に移動";
	}

	override getCheckIsGroupedLabel(): string {
		return "グループピング";
	}

	override getCheckIsActiveLabel(): string {
		return "アクティブ";
	}
}
