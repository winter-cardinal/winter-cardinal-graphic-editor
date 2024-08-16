import { ESubthemeDefaultEditorShapeButtonLayer } from "./e-subtheme-default-editor-shape-button-layer";

export class ESubthemeDefaultEnUsEditorShapeButtonLayer extends ESubthemeDefaultEditorShapeButtonLayer {
	override getButtonNewTitle(): string | undefined {
		return "Create New Column";
	}

	override getButtonDeleteTitle(): string | undefined {
		return "Delete Selected Column";
	}

	override getButtonBringForwardTitle(): string | undefined {
		return "Bring Selected Column Forward";
	}

	override getButtonSendBackwardTitle(): string | undefined {
		return "Send Selected Column Backward";
	}

	override getInputMarginLabel(): string {
		return "Margin";
	}
}
