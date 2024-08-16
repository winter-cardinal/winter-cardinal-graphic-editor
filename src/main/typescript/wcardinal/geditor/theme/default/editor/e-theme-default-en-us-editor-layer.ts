import { EThemeDefaultEditorLayer } from "./e-theme-default-editor-layer";

export class EThemeDefaultEnUsEditorLayer extends EThemeDefaultEditorLayer {
	override getLabel(): string | undefined {
		return "Layer";
	}

	override getButtonNewTitle(): string | undefined {
		return "New Layer";
	}

	override getButtonDeleteTitle(): string | undefined {
		return "Delete Selected Layer";
	}

	override getButtonBringForwardTitle(): string | undefined {
		return "Bring Selected Layer Forward";
	}

	override getButtonSendBackwardTitle(): string | undefined {
		return "Send Selected Layer Backward";
	}
}
