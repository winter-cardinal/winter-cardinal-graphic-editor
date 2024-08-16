import { EThemeDefaultEditorSnap } from "./e-theme-default-editor-snap";

export class EThemeDefaultEnUsEditorSnap extends EThemeDefaultEditorSnap {
	override getLabel(): string | undefined {
		return "Snap";
	}

	override getButtonTargetLabel(): string | undefined {
		return "Snap on Target";
	}

	override getButtonTargetNewTitle(): string | undefined {
		return "New Snap Target";
	}

	override getButtonTargetDeleteTitle(): string | undefined {
		return "Delete Selected Snap Target";
	}

	override getButtonTargetBringForwardTitle(): string | undefined {
		return "Bring Selected Snap Target Forward";
	}

	override getButtonTargetSendBackwardTitle(): string | undefined {
		return "Send Selected Snap Target Backward";
	}

	override getButtonTargetEyeTitle(): string | undefined {
		return "Show / Hide Snap Targets";
	}

	override getButtonGridLabel(): string | undefined {
		return "Snap on Grid";
	}

	override getButtonGridEyeTitle(): string | undefined {
		return "Show / Hide Snap Grid";
	}

	override getInputGridSizeLabel(): string | undefined {
		return "Size";
	}
}
