import { EThemeShapeButton } from "../../../../extension/button/e-theme-shape-button";

export class EThemeDefaultJaJpShapeButton implements EThemeShapeButton {
	getName(): string {
		return "ボタン";
	}

	getLabel(): string {
		return "ラベル";
	}
}
