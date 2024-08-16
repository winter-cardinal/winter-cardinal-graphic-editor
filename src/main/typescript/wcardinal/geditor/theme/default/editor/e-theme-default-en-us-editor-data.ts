import { EThemeDefaultEditorData } from "./e-theme-default-editor-data";

export class EThemeDefaultEnUsEditorData extends EThemeDefaultEditorData {
	override getLabel(): string | undefined {
		return "Data";
	}

	override getButtonNewTitle(): string | undefined {
		return "New Data";
	}

	override getButtonDeleteTitle(): string | undefined {
		return "Delete Selected Data";
	}

	override getButtonBringForwardTitle(): string | undefined {
		return "Bring Selected Data Forward";
	}

	override getButtonSendBackwardTitle(): string | undefined {
		return "Send Selected Data Backward";
	}
}
