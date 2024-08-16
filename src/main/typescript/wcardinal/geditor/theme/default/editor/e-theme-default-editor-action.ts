import type { EThemeEditorAction } from "../../../editor/e-editor-action";
import { EThemeDefaultEditor } from "./e-theme-default-editor";

export abstract class EThemeDefaultEditorAction
	extends EThemeDefaultEditor
	implements EThemeEditorAction
{
	abstract getLabel(): string | undefined;

	abstract getButtonNewTitle(): string | undefined;

	abstract getButtonDeleteTitle(): string | undefined;

	abstract getButtonBringForwardTitle(): string | undefined;

	abstract getButtonSendBackwardTitle(): string | undefined;

	abstract getCheckInteractiveLabel(): string | undefined;

	abstract getCheckFocusableLabel(): string | undefined;

	abstract getInputShortcutLabel(): string | undefined;

	abstract getInputTitleLabel(): string | undefined;

	abstract getDropdownCursorLabel(): string | undefined;

	abstract getCursors(): Map<string, string>;
}
