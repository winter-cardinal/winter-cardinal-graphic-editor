import { DThemes } from "@wcardinal/wcardinal-ui";
import { ESubthemeEditorShapeButton } from "../../../../extension/button/e-editor-shape-button";
import { EThemeShapeButton } from "../../../../extension/button/e-theme-shape-button";

export abstract class ESubthemeDefaultEditorShapeButton implements ESubthemeEditorShapeButton {
	protected _button: EThemeShapeButton;

	constructor() {
		this._button = DThemes.get<EThemeShapeButton>("EShapeButton");
	}

	getLabel(): string {
		return this._button.getName();
	}

	abstract getCheckIsToggleLabel(): string;
	abstract getCheckIsGroupedLabel(): string;
	abstract getCheckIsActiveLabel(): string;
}
