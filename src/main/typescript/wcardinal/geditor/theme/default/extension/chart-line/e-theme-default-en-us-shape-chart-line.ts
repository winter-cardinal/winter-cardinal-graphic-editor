import { EThemeShapeChartLine } from "../../../../extension/chart-line/e-theme-shape-chart-line";

export class EThemeDefaultEnUsShapeChartLine implements EThemeShapeChartLine {
	getName(): string {
		return "Line Chart";
	}

	newPlotAreaLabel(): string {
		return "Title";
	}

	newXAxisLabel(): string {
		return "X Axis";
	}

	newYAxisLabel(): string {
		return "Y Axis";
	}
}
