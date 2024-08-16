import { EThemeShapeInput } from "../../../../extension/input/e-theme-shape-input";

export class EThemeDefaultEnUsShapeInput implements EThemeShapeInput {
	getName(): string {
		return "Input";
	}

	getLabel(): string {
		return "Text";
	}
}
