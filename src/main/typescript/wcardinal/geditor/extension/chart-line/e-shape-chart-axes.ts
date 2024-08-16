import {
	createLine,
	DControllers,
	DThemes,
	EShape,
	EShapeBar,
	EShapeBarPosition,
	EShapeDefaults,
	EShapePointsStyle,
	EShapeRectangle,
	EShapeTextAlignHorizontal,
	EShapeTextAlignVertical,
	EShapeTextDirection
} from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../../tool/e-tool-select-selection";
import { ECommandChartAxisXPadding } from "./e-command-chart-axis-x-padding";
import { ECommandChartAxisYPadding } from "./e-command-chart-axis-y-padding";
import { ECommandChartTickXMajorCount } from "./e-command-chart-tick-x-major-count";
import { ECommandChartTickXMinorCount } from "./e-command-chart-tick-x-minor-count";
import { ECommandChartTickYMajorCount } from "./e-command-chart-tick-y-major-count";
import { ECommandChartTickYMinorCount } from "./e-command-chart-tick-y-minor-count";
import { EShapeChartLineIds } from "./e-shape-chart-line-ids";
import { UtilShapeSearch } from "../../util/util-shape-search";
import { EThemeShapeChartLine } from "./e-theme-shape-chart-line";

export class EShapeChartAxes {
	static getTheme(): EThemeShapeChartLine {
		return DThemes.get<EThemeShapeChartLine>("EShapeChartLine");
	}

	static getPlotArea(shape: EShape): EShape | null {
		return UtilShapeSearch.findChildById(shape, EShapeChartLineIds.PLOT_AREA_ID);
	}

	static newPlotArea(shape: EShape): EShape {
		const result = new EShapeRectangle();
		result.id = EShapeChartLineIds.PLOT_AREA_ID;
		result.size.set(shape.size.x, shape.size.y);
		result.stroke.enable = false;
		result.fill.alpha = EShapeDefaults.FILL_ALPHA * 0.5;
		result.text.value = this.getTheme().newPlotAreaLabel();
		result.text.align.vertical = EShapeTextAlignVertical.OUTSIDE_TOP;
		result.attach(shape);
		return result;
	}

	static getLine(shape: EShape): EShape | null {
		return UtilShapeSearch.findChildById(shape, EShapeChartLineIds.LINE_ID);
	}

	static newLine(shape: EShape): EShape {
		const sx = 0.8 * shape.size.x;
		const sy = 0.8 * shape.size.y;
		const sxh = sx * 0.5;
		const syh = sy * 0.5;
		const result = createLine(
			[-sxh, +syh, +sxh, -syh],
			[],
			EShapeDefaults.STROKE_WIDTH,
			EShapePointsStyle.NONE
		);
		result.id = EShapeChartLineIds.LINE_ID;
		result.attach(shape);
		return result;
	}

	static getXAxis(shape: EShape): EShape | null {
		return UtilShapeSearch.findChildById(shape, EShapeChartLineIds.X_AXIS_ID);
	}

	static getXAxisTickMajor(shape: EShape): EShape | null {
		return UtilShapeSearch.findChildById(shape, EShapeChartLineIds.X_AXIS_TICK_MAJOR_ID);
	}

	static getXAxisTickMinor(shape: EShape): EShape | null {
		return UtilShapeSearch.findChildById(shape, EShapeChartLineIds.X_AXIS_TICK_MINOR_ID);
	}

	static newXAxis(shape: EShape): EShape {
		const result = new EShapeBar();
		result.id = EShapeChartLineIds.X_AXIS_ID;
		result.size.set(shape.size.x, 0);
		result.transform.position.set(0, shape.size.y * 0.5);
		result.points.position = EShapeBarPosition.LEFT;
		result.points.size = -1;
		result.stroke.width = EShapeDefaults.STROKE_WIDTH;
		result.text.value = this.getTheme().newXAxisLabel();
		result.text.align.vertical = EShapeTextAlignVertical.OUTSIDE_BOTTOM;
		result.text.padding.set(50, 50);
		result.attach(shape);
		return result;
	}

	static createXAxis(selection: EToolSelectSelection): void {
		selection.createChildren((shape: EShape): EShape[] | null => {
			return [EShapeChartAxes.newXAxis(shape)];
		});
	}

	static deleteXAxis(selection: EToolSelectSelection): void {
		selection.deleteChildren((shape: EShape): EShape[] | null => {
			let result = null;

			const axis = EShapeChartAxes.getXAxis(shape);
			if (axis != null) {
				result = [axis];
			}

			const major = EShapeChartAxes.getXAxisTickMajor(shape);
			if (major != null) {
				if (result == null) {
					result = [major];
				} else {
					result.push(major);
				}
			}

			const minor = EShapeChartAxes.getXAxisTickMinor(shape);
			if (minor != null) {
				if (result == null) {
					result = [minor];
				} else {
					result.push(minor);
				}
			}

			return result;
		});
	}

	static setXAxisPadding(padding: number, selection: EToolSelectSelection): void {
		DControllers.getCommandController().push(new ECommandChartAxisXPadding(selection, padding));
	}

	static newXAxisTickMajor(shape: EShape): EShape {
		const result = new EShapeBar();
		result.id = EShapeChartLineIds.X_AXIS_TICK_MAJOR_ID;
		result.size.set(0, 0);
		result.transform.position.set(0, shape.size.y * 0.5);
		result.points.position = EShapeBarPosition.TOP;
		result.points.size = 10;
		result.stroke.width = EShapeDefaults.STROKE_WIDTH;
		result.text.value = "%YMD\n%Hms.%mi";
		result.text.align.vertical = EShapeTextAlignVertical.TOP;
		result.text.padding.set(12.5, 12.5);
		result.attach(shape);
		return result;
	}

	static newXAxisTickMinor(shape: EShape, x: number, y: number): EShape {
		const result = new EShapeBar();
		result.id = EShapeChartLineIds.X_AXIS_TICK_MINOR_ID;
		result.size.set(0, 0);
		result.transform.position.set(x, y);
		result.points.position = EShapeBarPosition.TOP;
		result.points.size = 5;
		result.stroke.width = EShapeDefaults.STROKE_WIDTH * 0.5;
		result.attach(shape);
		return result;
	}

	static createXAxisTickMajor(selection: EToolSelectSelection): void {
		selection.createChildren((shape: EShape): EShape[] | null => {
			const axis = EShapeChartAxes.getXAxis(shape);
			if (axis != null) {
				return [this.newXAxisTickMajor(shape)];
			}
			return null;
		});
	}

	static deleteXAxisTickMajor(selection: EToolSelectSelection): void {
		selection.deleteChildren((shape: EShape): EShape[] | null => {
			let result = null;

			const major = EShapeChartAxes.getXAxisTickMajor(shape);
			if (major != null) {
				result = [major];
			}

			const minor = EShapeChartAxes.getXAxisTickMinor(shape);
			if (minor != null) {
				if (result == null) {
					result = [minor];
				} else {
					result.push(minor);
				}
			}

			return result;
		});
	}

	static setXAxisTickMajorCount(count: number, selection: EToolSelectSelection): void {
		DControllers.getCommandController().push(
			new ECommandChartTickXMajorCount(selection, count)
		);
	}

	static createXAxisTickMinor(selection: EToolSelectSelection): void {
		selection.createChildren((shape: EShape): EShape[] | null => {
			const axis = EShapeChartAxes.getXAxis(shape);
			if (axis != null) {
				const sizeX = axis.size.x;
				const position = axis.transform.position;
				return [this.newXAxisTickMinor(shape, position.x - sizeX * 0.25, position.y)];
			}
			return null;
		});
	}

	static deleteXAxisTickMinor(selection: EToolSelectSelection): void {
		selection.deleteChildren((shape: EShape): EShape[] | null => {
			const minor = EShapeChartAxes.getXAxisTickMinor(shape);
			if (minor != null) {
				return [minor];
			}
			return null;
		});
	}

	static setXAxisTickMinorCount(count: number, selection: EToolSelectSelection): void {
		DControllers.getCommandController().push(
			new ECommandChartTickXMinorCount(selection, count)
		);
	}

	static getYAxis(shape: EShape): EShape | null {
		return UtilShapeSearch.findChildById(shape, EShapeChartLineIds.Y_AXIS_ID);
	}

	static getYAxisTickMajor(shape: EShape): EShape | null {
		return UtilShapeSearch.findChildById(shape, EShapeChartLineIds.Y_AXIS_TICK_MAJOR_ID);
	}

	static getYAxisTickMinor(shape: EShape): EShape | null {
		return UtilShapeSearch.findChildById(shape, EShapeChartLineIds.Y_AXIS_TICK_MINOR_ID);
	}

	static newYAxis(shape: EShape): EShape {
		const result = new EShapeBar();
		result.id = EShapeChartLineIds.Y_AXIS_ID;
		result.size.set(0, shape.size.y);
		result.transform.position.set(-shape.size.x * 0.5, 0);
		result.points.position = EShapeBarPosition.TOP;
		result.points.size = -1;
		result.stroke.width = EShapeDefaults.STROKE_WIDTH;
		result.text.value = this.getTheme().newYAxisLabel();
		result.text.align.horizontal = EShapeTextAlignHorizontal.OUTSIDE_LEFT;
		result.text.direction = EShapeTextDirection.BOTTOM_TO_TOP;
		result.text.padding.set(50, 50);
		result.attach(shape);
		return result;
	}

	static createYAxis(selection: EToolSelectSelection): void {
		selection.createChildren((shape: EShape): EShape[] | null => {
			return [EShapeChartAxes.newYAxis(shape)];
		});
	}

	static deleteYAxis(selection: EToolSelectSelection): void {
		selection.deleteChildren((shape: EShape): EShape[] | null => {
			let result = null;

			const axis = EShapeChartAxes.getYAxis(shape);
			if (axis != null) {
				result = [axis];
			}

			const major = EShapeChartAxes.getYAxisTickMajor(shape);
			if (major != null) {
				if (result == null) {
					result = [major];
				} else {
					result.push(major);
				}
			}

			const minor = EShapeChartAxes.getYAxisTickMinor(shape);
			if (minor != null) {
				if (result == null) {
					result = [minor];
				} else {
					result.push(minor);
				}
			}

			return result;
		});
	}

	static setYAxisPadding(padding: number, selection: EToolSelectSelection): void {
		DControllers.getCommandController().push(new ECommandChartAxisYPadding(selection, padding));
	}

	static newYAxisTickMajor(shape: EShape): EShape {
		const result = new EShapeBar();
		result.id = EShapeChartLineIds.Y_AXIS_TICK_MAJOR_ID;
		result.size.set(0, 0);
		result.transform.position.set(-shape.size.x * 0.5, 0);
		result.points.position = EShapeBarPosition.RIGHT;
		result.points.size = 10;
		result.stroke.width = EShapeDefaults.STROKE_WIDTH;
		result.text.value = "%ssi";
		result.text.align.horizontal = EShapeTextAlignHorizontal.RIGHT;
		result.text.padding.set(12.5, 12.5);
		result.attach(shape);
		return result;
	}

	static newYAxisTickMinor(shape: EShape, x: number, y: number): EShape {
		const result = new EShapeBar();
		result.id = EShapeChartLineIds.Y_AXIS_TICK_MINOR_ID;
		result.size.set(0, 0);
		result.transform.position.set(x, y);
		result.points.position = EShapeBarPosition.RIGHT;
		result.points.size = 5;
		result.stroke.width = EShapeDefaults.STROKE_WIDTH * 0.5;
		result.attach(shape);
		return result;
	}

	static createYAxisTickMajor(selection: EToolSelectSelection): void {
		selection.createChildren((shape: EShape): EShape[] | null => {
			const axis = EShapeChartAxes.getYAxis(shape);
			if (axis != null) {
				return [this.newYAxisTickMajor(shape)];
			}
			return null;
		});
	}

	static deleteYAxisTickMajor(selection: EToolSelectSelection): void {
		selection.deleteChildren((shape: EShape): EShape[] | null => {
			let result = null;

			const major = EShapeChartAxes.getYAxisTickMajor(shape);
			if (major != null) {
				result = [major];
			}

			const minor = EShapeChartAxes.getYAxisTickMinor(shape);
			if (minor != null) {
				if (result == null) {
					result = [minor];
				} else {
					result.push(minor);
				}
			}

			return result;
		});
	}

	static setYAxisTickMajorCount(count: number, selection: EToolSelectSelection): void {
		DControllers.getCommandController().push(
			new ECommandChartTickYMajorCount(selection, count)
		);
	}

	static createYAxisTickMinor(selection: EToolSelectSelection): void {
		selection.createChildren((shape: EShape): EShape[] | null => {
			const axis = EShapeChartAxes.getYAxis(shape);
			if (axis != null) {
				const sizeY = axis.size.y;
				const position = axis.transform.position;
				return [this.newYAxisTickMinor(shape, position.x, position.y + sizeY * 0.25)];
			}
			return null;
		});
	}

	static deleteYAxisTickMinor(selection: EToolSelectSelection): void {
		selection.deleteChildren((shape: EShape): EShape[] | null => {
			const minor = EShapeChartAxes.getYAxisTickMinor(shape);
			if (minor != null) {
				return [minor];
			}
			return null;
		});
	}

	static setYAxisTickMinorCount(count: number, selection: EToolSelectSelection): void {
		DControllers.getCommandController().push(
			new ECommandChartTickYMinorCount(selection, count)
		);
	}
}
