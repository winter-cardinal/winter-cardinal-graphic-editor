import type { EThemeEditorTree } from "../../../editor/e-editor-tree";
import { EThemeDefaultEditor } from "./e-theme-default-editor";

export abstract class EThemeDefaultEditorTree
	extends EThemeDefaultEditor
	implements EThemeEditorTree
{
	abstract getLabel(): string | undefined;

	abstract getButtonBringToFrontTitle(): string | undefined;

	getButtonBringToFrontShortcut(): string | undefined {
		return "Alt+Shift+F";
	}

	abstract getButtonBringForwardTitle(): string | undefined;

	getButtonBringForwardShortcut(): string | undefined {
		return "Alt+Ctrl+F";
	}

	abstract getButtonSendBackwardTitle(): string | undefined;

	getButtonSendBackwardShortcut(): string | undefined {
		return "Alt+Ctrl+B";
	}

	abstract getButtonSendToBackTitle(): string | undefined;

	getButtonSendToBackShortcut(): string | undefined {
		return "Alt+Shift+B";
	}
}
