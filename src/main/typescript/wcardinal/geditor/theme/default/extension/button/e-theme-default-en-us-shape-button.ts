import { EThemeShapeButton } from "../../../../extension/button/e-theme-shape-button";

export class EThemeDefaultEnUsShapeButton implements EThemeShapeButton {
	getName(): string {
		return "Button";
	}

	getLabel(): string {
		return "Label";
	}
}
