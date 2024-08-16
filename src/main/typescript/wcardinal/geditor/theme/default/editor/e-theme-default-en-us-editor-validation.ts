import { EThemeDefaultEditorValidation } from "./e-theme-default-editor-validation";

export class EThemeDefaultEnUsEditorValidation extends EThemeDefaultEditorValidation {
	override getLabel(): string | undefined {
		return "Validation";
	}

	override getButtonRevalidateTitle(): string | undefined {
		return "Revalidate";
	}
}
