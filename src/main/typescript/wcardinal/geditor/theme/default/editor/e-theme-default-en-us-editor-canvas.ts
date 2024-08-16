import { EThemeDefaultEditorCanvas } from "./e-theme-default-editor-canvas";

export class EThemeDefaultEnUsEditorCanvas extends EThemeDefaultEditorCanvas {
	override getLabel(): string | undefined {
		return "Canvas";
	}

	override getDefaultName(): string {
		return "Untitled";
	}

	override getInputNameLabel(): string | undefined {
		return "Name";
	}

	override getInputLabelLabel(): string | undefined {
		return "Label";
	}

	override getInputWidthLabel(): string | undefined {
		return "Width";
	}

	override getInputHeightLabel(): string | undefined {
		return "Height";
	}

	override getSelectCategoryLabel(): string | undefined {
		return "Ctgry";
	}

	override getInputBackgroundLabel(): string | undefined {
		return "Bckgrd";
	}

	override getInputSummaryLabel(): string | undefined {
		return "Smmry";
	}

	override getInputDescriptionLabel(): string | undefined {
		return "Desc";
	}
}
