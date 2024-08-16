import type { EThemeEditorValidation } from "../../../editor/e-editor-validation";
import { EThemeDefaultEditor } from "./e-theme-default-editor";

export abstract class EThemeDefaultEditorValidation
	extends EThemeDefaultEditor
	implements EThemeEditorValidation
{
	abstract getLabel(): string | undefined;

	abstract getButtonRevalidateTitle(): string | undefined;
}
