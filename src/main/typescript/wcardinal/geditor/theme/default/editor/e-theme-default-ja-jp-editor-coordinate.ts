import { EThemeDefaultEditorCoordinate } from "./e-theme-default-editor-coordinate";

export class EThemeDefaultJaJpEditorCoordinate extends EThemeDefaultEditorCoordinate {
	override getLabel(): string | undefined {
		return "位置とサイズ";
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
		return "左端";
	}

	override getInputPositionTopLabel(): string | undefined {
		return "上端";
	}

	override getInputSizeXLabel(): string | undefined {
		return "幅";
	}

	override getInputSizeYLabel(): string | undefined {
		return "高さ";
	}

	override getInputRotationLabel(): string | undefined {
		return "角度";
	}

	override getInputSkewLabel(): string | undefined {
		return "歪";
	}

	override getButtonAlignLeftTitle(): string | undefined {
		return "左揃え";
	}

	override getButtonAlignCenterTitle(): string | undefined {
		return "中央揃え";
	}

	override getButtonAlignRightTitle(): string | undefined {
		return "右揃え";
	}

	override getButtonAlignTopTitle(): string | undefined {
		return "上揃え";
	}

	override getButtonAlignMiddleTitle(): string | undefined {
		return "上下中央揃え";
	}

	override getButtonAlignBottomTitle(): string | undefined {
		return "下揃え";
	}

	override getButtonDistributeHorizontallyTitle(): string | undefined {
		return "左右に整列";
	}

	override getButtonDistributeVerticallyTitle(): string | undefined {
		return "上下に整列";
	}

	override getButtonRotateLeftTitle(): string | undefined {
		return "左回転";
	}

	override getButtonRotateRightTitle(): string | undefined {
		return "右回転";
	}
}
