import type { EThemeEditorLayer } from "../../../editor/e-editor-layer";
import { EThemeDefaultEditor } from "./e-theme-default-editor";

export abstract class EThemeDefaultEditorLayer
	extends EThemeDefaultEditor
	implements EThemeEditorLayer
{
	abstract getLabel(): string | undefined;

	abstract getButtonNewTitle(): string | undefined;

	abstract getButtonDeleteTitle(): string | undefined;

	abstract getButtonBringForwardTitle(): string | undefined;

	abstract getButtonSendBackwardTitle(): string | undefined;
}
