import { toLabel } from "../to-label";
import { EThemeDefaultEditorTree } from "./e-theme-default-editor-tree";

export class EThemeDefaultJaJpEditorTree extends EThemeDefaultEditorTree {
	override getLabel(): string | undefined {
		return "ツリー";
	}

	override getButtonBringToFrontTitle(): string | undefined {
		return toLabel("最前面へ移動", this.getButtonBringToFrontShortcut());
	}

	override getButtonBringForwardTitle(): string | undefined {
		return toLabel("前面へ移動", this.getButtonBringForwardShortcut());
	}

	override getButtonSendBackwardTitle(): string | undefined {
		return toLabel("背面へ移動", this.getButtonSendBackwardShortcut());
	}

	override getButtonSendToBackTitle(): string | undefined {
		return toLabel("最背面へ移動", this.getButtonSendToBackShortcut());
	}
}
