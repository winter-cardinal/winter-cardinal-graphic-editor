import { EThemeDefaultEditorValidation } from "./e-theme-default-editor-validation";

export class EThemeDefaultJaJpEditorValidation extends EThemeDefaultEditorValidation {
	override getLabel(): string | undefined {
		return "検証";
	}

	override getButtonRevalidateTitle(): string | undefined {
		return "再検証";
	}
}
