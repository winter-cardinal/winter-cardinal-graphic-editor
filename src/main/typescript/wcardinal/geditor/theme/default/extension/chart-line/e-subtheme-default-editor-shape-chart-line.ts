import { DThemes } from "@wcardinal/wcardinal-ui";
import { ESubthemeEditorShapeChartLine } from "../../../../extension/chart-line/e-editor-shape-chart-line";
import { EThemeShapeChartLine } from "../../../../extension/chart-line/e-theme-shape-chart-line";

export abstract class ESubthemeDefaultEditorShapeChartLine
	implements ESubthemeEditorShapeChartLine
{
	protected _chartLine: EThemeShapeChartLine;

	constructor() {
		this._chartLine = DThemes.get<EThemeShapeChartLine>("EShapeChartLine");
	}

	getLabel(): string {
		return this._chartLine.getName();
	}

	abstract getCheckXAxisLabel(): string;
	abstract getCheckXAxisMajorTickLabel(): string;
	abstract getCheckXAxisMinorTickLabel(): string;
	abstract getCheckYAxisLabel(): string;
	abstract getCheckYAxisMajorTickLabel(): string;
	abstract getCheckYAxisMinorTickLabel(): string;
	abstract getTextMajorTickCountLabel(): string;
	abstract getTextMinorTickCountLabel(): string;
	abstract getTextPaddingLabel(): string;
}
