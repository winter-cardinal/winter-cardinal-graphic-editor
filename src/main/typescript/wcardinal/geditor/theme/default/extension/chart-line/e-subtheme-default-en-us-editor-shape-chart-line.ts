import { ESubthemeDefaultEditorShapeChartLine } from "./e-subtheme-default-editor-shape-chart-line";

export class ESubthemeDefaultEnUsEditorShapeChartLine extends ESubthemeDefaultEditorShapeChartLine {
	override getCheckXAxisLabel(): string {
		return "X Axis";
	}

	override getCheckXAxisMajorTickLabel(): string {
		return "Major Tick";
	}

	override getCheckXAxisMinorTickLabel(): string {
		return "Minor Tick";
	}

	override getCheckYAxisLabel(): string {
		return "Y Axis";
	}

	override getCheckYAxisMajorTickLabel(): string {
		return "Major Tick";
	}

	override getCheckYAxisMinorTickLabel(): string {
		return "Minor Tick";
	}

	override getTextMajorTickCountLabel(): string {
		return "Major Tick Count";
	}

	override getTextMinorTickCountLabel(): string {
		return "Minor Tick Count";
	}

	override getTextPaddingLabel(): string {
		return "Padding";
	}
}
