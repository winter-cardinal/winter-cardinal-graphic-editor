import { DThemes } from "@wcardinal/wcardinal-ui";
import { ESubthemeEditorShapeButtonLayer } from "../../../../extension/button-layer/e-editor-shape-button-layer";
import { EThemeShapeButtonLayer } from "../../../../extension/button-layer/e-theme-shape-button-layer";

export abstract class ESubthemeDefaultEditorShapeButtonLayer
	implements ESubthemeEditorShapeButtonLayer
{
	protected _buttonLayer: EThemeShapeButtonLayer;

	constructor() {
		this._buttonLayer = DThemes.get<EThemeShapeButtonLayer>("EShapeButtonLayer");
	}

	getLabel(): string {
		return this._buttonLayer.getName();
	}

	abstract getButtonNewTitle(): string | undefined;
	abstract getButtonDeleteTitle(): string | undefined;
	abstract getButtonBringForwardTitle(): string | undefined;
	abstract getButtonSendBackwardTitle(): string | undefined;
	abstract getInputMarginLabel(): string;
}
