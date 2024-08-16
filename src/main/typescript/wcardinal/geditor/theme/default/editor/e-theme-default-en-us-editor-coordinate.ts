import { EThemeDefaultEditorCoordinate } from "./e-theme-default-editor-coordinate";

export class EThemeDefaultEnUsEditorCoordinate extends EThemeDefaultEditorCoordinate {
	override getLabel(): string | undefined {
		return "Coordinate";
	}

	override getInputIdLabel(): string | undefined {
		return "ID";
	}

	override getInputPositionXLabel(): string | undefined {
		return "X";
	}

	override getInputPositionYLabel(): string | undefined {
		return "Y";
	}

	override getInputPositionLeftLabel(): string | undefined {
		return "Left";
	}

	override getInputPositionTopLabel(): string | undefined {
		return "Top";
	}

	override getInputSizeXLabel(): string | undefined {
		return "Width";
	}

	override getInputSizeYLabel(): string | undefined {
		return "Height";
	}

	override getInputRotationLabel(): string | undefined {
		return "Rotation";
	}

	override getInputSkewLabel(): string | undefined {
		return "Skew";
	}

	override getButtonAlignLeftTitle(): string | undefined {
		return "Align Left";
	}

	override getButtonAlignCenterTitle(): string | undefined {
		return "Align Center";
	}

	override getButtonAlignRightTitle(): string | undefined {
		return "Align Right";
	}

	override getButtonAlignTopTitle(): string | undefined {
		return "Align Top";
	}

	override getButtonAlignMiddleTitle(): string | undefined {
		return "Align Middle";
	}

	override getButtonAlignBottomTitle(): string | undefined {
		return "Align Bottom";
	}

	override getButtonDistributeHorizontallyTitle(): string | undefined {
		return "Distribute Horizontally";
	}

	override getButtonDistributeVerticallyTitle(): string | undefined {
		return "Distribute Vertically";
	}

	override getButtonRotateLeftTitle(): string | undefined {
		return "Rotate Left";
	}

	override getButtonRotateRightTitle(): string | undefined {
		return "Rotate Right";
	}
}
