import { toLabel } from "../to-label";
import { EThemeDefaultEditorTree } from "./e-theme-default-editor-tree";

export class EThemeDefaultEnUsEditorTree extends EThemeDefaultEditorTree {
	override getLabel(): string | undefined {
		return "Tree";
	}

	override getButtonBringToFrontTitle(): string | undefined {
		return toLabel("Bring to Front", this.getButtonBringToFrontShortcut());
	}

	override getButtonBringForwardTitle(): string | undefined {
		return toLabel("Bring Forward", this.getButtonBringForwardShortcut());
	}

	override getButtonSendBackwardTitle(): string | undefined {
		return toLabel("Send Backward", this.getButtonSendBackwardShortcut());
	}

	override getButtonSendToBackTitle(): string | undefined {
		return toLabel("Send to Back", this.getButtonSendToBackShortcut());
	}
}
