import { EThemeShapeButtonLayer } from "../../../../extension/button-layer/e-theme-shape-button-layer";

export class EThemeDefaultEnUsShapeButtonLayer implements EThemeShapeButtonLayer {
	getName(): string {
		return "Layer Button";
	}

	getLabel(): string {
		return "Label";
	}
}
