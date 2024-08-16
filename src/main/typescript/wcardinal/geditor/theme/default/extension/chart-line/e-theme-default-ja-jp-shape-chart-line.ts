import { EThemeShapeChartLine } from "../../../../extension/chart-line/e-theme-shape-chart-line";

export class EThemeDefaultJaJpShapeChartLine implements EThemeShapeChartLine {
	getName(): string {
		return "ラインチャート";
	}

	newPlotAreaLabel(): string {
		return "タイトル";
	}

	newXAxisLabel(): string {
		return "X軸";
	}

	newYAxisLabel(): string {
		return "Y軸";
	}
}
