import type { EThemeEditorDataMapping } from "../../../editor/e-editor-data-mapping";
import { EThemeDefaultEditor } from "./e-theme-default-editor";

export abstract class EThemeDefaultEditorDataMapping
	extends EThemeDefaultEditor
	implements EThemeEditorDataMapping
{
	abstract getLabel(): string | undefined;

	abstract getButtonNewTitle(): string | undefined;

	abstract getButtonDeleteTitle(): string | undefined;

	abstract getButtonBringForwardTitle(): string | undefined;

	abstract getButtonSendBackwardTitle(): string | undefined;
}
