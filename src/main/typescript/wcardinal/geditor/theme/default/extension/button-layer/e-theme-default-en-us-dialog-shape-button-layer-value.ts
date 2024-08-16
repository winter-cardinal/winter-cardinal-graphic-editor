import { EThemeDefaultDialogShapeButtonLayerValue } from "./e-theme-default-dialog-shape-button-layer-value";

export class EThemeDefaultEnUsDialogShapeButtonLayerValue extends EThemeDefaultDialogShapeButtonLayerValue {
	override getInputLabelLabel(): string {
		return "Label";
	}

	override newInputLabel(): string {
		return "Label";
	}

	override getInputWidthLabel(): string {
		return "Width";
	}

	override getSelectLayerLabel(): string {
		return "Layer";
	}

	override getCheckBringToFromLabel(): string {
		return "Bring to Front";
	}

	override getCheckIsGroupedLabel(): string {
		return "Grouped";
	}

	override getCheckIsActiveLabel(): string {
		return "Active";
	}
}
