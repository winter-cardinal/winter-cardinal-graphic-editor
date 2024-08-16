import { EThemeShapeButtonLayer } from "../../../../extension/button-layer/e-theme-shape-button-layer";

export class EThemeDefaultJaJpShapeButtonLayer implements EThemeShapeButtonLayer {
	getName(): string {
		return "レイヤーボタン";
	}

	getLabel(): string {
		return "ラベル";
	}
}
