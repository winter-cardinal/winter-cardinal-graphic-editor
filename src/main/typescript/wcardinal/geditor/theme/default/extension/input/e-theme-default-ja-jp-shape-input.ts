import { EThemeShapeInput } from "../../../../extension/input/e-theme-shape-input";

export class EThemeDefaultJaJpShapeInput implements EThemeShapeInput {
	getName(): string {
		return "インプット";
	}

	getLabel(): string {
		return "テキスト";
	}
}
