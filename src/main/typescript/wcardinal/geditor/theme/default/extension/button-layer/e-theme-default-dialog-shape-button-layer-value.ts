import { DThemeDialogLayered, DThemes } from "@wcardinal/wcardinal-ui";
import { EThemeDialogShapeButtonLayerValue } from "../../../../extension/button-layer/e-dialog-shape-button-layer-value";

export abstract class EThemeDefaultDialogShapeButtonLayerValue
	extends DThemes.getClass<DThemeDialogLayered>("DDialogLayered")
	implements EThemeDialogShapeButtonLayerValue
{
	abstract getInputLabelLabel(): string;
	abstract newInputLabel(): string;
	abstract getInputWidthLabel(): string;
	abstract getSelectLayerLabel(): string;
	abstract getCheckBringToFromLabel(): string;
	abstract getCheckIsGroupedLabel(): string;
	abstract getCheckIsActiveLabel(): string;
}
