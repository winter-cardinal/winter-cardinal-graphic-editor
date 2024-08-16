import { ESubthemeDefaultEditorShapeChartLine } from "./e-subtheme-default-editor-shape-chart-line";

export class ESubthemeDefaultJaJpEditorShapeChartLine extends ESubthemeDefaultEditorShapeChartLine {
	override getCheckXAxisLabel(): string {
		return "X軸";
	}

	override getCheckXAxisMajorTickLabel(): string {
		return "目盛";
	}

	override getCheckXAxisMinorTickLabel(): string {
		return "補助目盛";
	}

	override getCheckYAxisLabel(): string {
		return "Y軸";
	}

	override getCheckYAxisMajorTickLabel(): string {
		return "目盛";
	}

	override getCheckYAxisMinorTickLabel(): string {
		return "補助目盛";
	}

	override getTextMajorTickCountLabel(): string {
		return "目盛数";
	}

	override getTextMinorTickCountLabel(): string {
		return "補助目盛数";
	}

	override getTextPaddingLabel(): string {
		return "余白";
	}
}
