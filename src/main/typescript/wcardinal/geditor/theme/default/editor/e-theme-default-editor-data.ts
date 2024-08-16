import type { EThemeEditorData } from "../../../editor/e-editor-data";
import { EThemeDefaultEditor } from "./e-theme-default-editor";

export abstract class EThemeDefaultEditorData
	extends EThemeDefaultEditor
	implements EThemeEditorData
{
	abstract getLabel(): string | undefined;

	abstract getButtonNewTitle(): string | undefined;

	abstract getButtonDeleteTitle(): string | undefined;

	abstract getButtonBringForwardTitle(): string | undefined;

	abstract getButtonSendBackwardTitle(): string | undefined;
}
