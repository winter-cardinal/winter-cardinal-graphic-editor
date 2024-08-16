import { EThemeDefaultEditorDataMapping } from "./e-theme-default-editor-data-mapping";

export class EThemeDefaultEnUsEditorDataMapping extends EThemeDefaultEditorDataMapping {
	override getLabel(): string | undefined {
		return "Data Mapping";
	}

	override getButtonNewTitle(): string | undefined {
		return "New Data Mapping";
	}

	override getButtonDeleteTitle(): string | undefined {
		return "Delete Selected Data Mapping";
	}

	override getButtonBringForwardTitle(): string | undefined {
		return "Bring Selected Data Mapping Forward";
	}

	override getButtonSendBackwardTitle(): string | undefined {
		return "Send Selected Data Mapping Backward";
	}
}
