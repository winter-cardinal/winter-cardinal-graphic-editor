import {
	EShape,
	EShapeRuntime,
	EShapeData,
	NumberFormatter,
	NumberFormatters,
	EShapeActionRuntimeBase,
	EShapeLockPart
} from "@wcardinal/wcardinal-ui";
import { EShapeChartLine } from "./e-shape-chart-line";
import { EShapeChartLineIds } from "./e-shape-chart-line-ids";
import { UtilShapeSearch } from "../../util/util-shape-search";

export class EShapeChartLineActionRuntime extends EShapeActionRuntimeBase {
	protected lines: EShape[];
	protected plotArea: EShape | null;
	protected xmajorCount: number;
	protected ymajorCount: number;
	protected xminorCount: number;
	protected yminorCount: number;
	protected xmajors: EShape[];
	protected ymajors: EShape[];
	protected xminors: EShape[];
	protected yminors: EShape[];
	protected workMajorPositions: Float64Array;
	protected xformatter: NumberFormatter;
	protected yformatter: NumberFormatter;
	protected xpadding: number;
	protected ypadding: number;

	constructor(shape: EShape) {
		super();

		// Lines
		const line = UtilShapeSearch.findChildById(shape, "line");
		if (line != null) {
			const data = shape.data;
			if (data.size() <= 0) {
				line.detach();
				this.lines = [];
			} else {
				const lines = [line];
				for (let i = 1, imax = data.size(); i < imax; ++i) {
					const cloned = line.clone();
					cloned.attach(shape);
					lines.push(cloned);
				}
				this.lines = lines;
			}
		} else {
			this.lines = [];
		}

		// Ticks
		let xmajorCount = 3;
		let ymajorCount = 3;
		let xminorCount = 3;
		let yminorCount = 3;
		if (shape instanceof EShapeChartLine) {
			xmajorCount = shape.axis.x.tick.major.count;
			ymajorCount = shape.axis.y.tick.major.count;
			xminorCount = shape.axis.x.tick.minor.count;
			yminorCount = shape.axis.y.tick.minor.count;
		}
		this.xmajorCount = xmajorCount;
		this.ymajorCount = ymajorCount;
		this.xminorCount = xminorCount;
		this.yminorCount = yminorCount;
		this.xmajors = this.initTicks(shape, EShapeChartLineIds.X_AXIS_TICK_MAJOR_ID, xmajorCount);
		this.ymajors = this.initTicks(shape, EShapeChartLineIds.Y_AXIS_TICK_MAJOR_ID, ymajorCount);
		this.xminors = this.initTicks(
			shape,
			EShapeChartLineIds.X_AXIS_TICK_MINOR_ID,
			(xmajorCount + 1) * xminorCount
		);
		this.yminors = this.initTicks(
			shape,
			EShapeChartLineIds.Y_AXIS_TICK_MINOR_ID,
			(ymajorCount + 1) * yminorCount
		);
		this.workMajorPositions = new Float64Array(Math.max(xmajorCount, ymajorCount));

		// Tick format
		const xtick = UtilShapeSearch.findChildById(shape, EShapeChartLineIds.X_AXIS_TICK_MAJOR_ID);
		this.xformatter = NumberFormatters.create(xtick != null ? xtick.text.value : "");
		const ytick = UtilShapeSearch.findChildById(shape, EShapeChartLineIds.Y_AXIS_TICK_MAJOR_ID);
		this.yformatter = NumberFormatters.create(ytick != null ? ytick.text.value : "");

		// Plot area
		this.plotArea = UtilShapeSearch.findChildById(shape, "plot-area");

		// Padding
		let xpadding = 10;
		let ypadding = 10;
		if (shape instanceof EShapeChartLine) {
			xpadding = shape.axis.x.padding;
			ypadding = shape.axis.y.padding;
		}
		this.xpadding = xpadding;
		this.ypadding = ypadding;
	}

	protected initTicks(shape: EShape, id: string, count: number): EShape[] {
		const tick = UtilShapeSearch.findChildById(shape, id);
		if (tick != null) {
			if (count <= 0) {
				tick.detach();
				return [];
			} else {
				const ticks = [tick];
				for (let i = 1; i < count; ++i) {
					const cloned = tick.clone();
					cloned.attach(shape);
					ticks.push(cloned);
				}
				return ticks;
			}
		} else {
			return [];
		}
	}

	protected toStepScale(scale: number): number {
		if (5.5 <= scale) {
			return 10;
		} else if (2.2 <= scale) {
			return 5;
		} else if (1.1 <= scale) {
			return 2;
		}
		return 1;
	}

	protected getStep(min: number, max: number, count: number): number {
		if (count <= 0 || max <= min) {
			return -1;
		}

		// Calculate the step
		const span = (max - min) / count;
		const power = Math.floor(Math.log(span) / Math.LN10);
		const base = Math.pow(10, power);
		return this.toStepScale(span / base) * base;
	}

	protected getTickPositions(
		min: number,
		max: number,
		count: number,
		step: number,
		padding: number,
		ratio: number,
		result: Float64Array
	): Float64Array {
		if (count <= 0) {
			return result;
		}

		if (max <= min || step <= 0) {
			result[0] = min;
			for (let i = 1; i < count; ++i) {
				result[i] = NaN;
			}
			return result;
		}

		// Set positions
		const start = min / step;
		let istart = Math.floor(start);
		const dstart = start - istart;
		if (padding < dstart * step * ratio) {
			istart = Math.ceil(start);
		}

		const stop = max / step;
		let istop = Math.ceil(stop);
		const dstop = istop - stop;
		if (padding < dstop * step * ratio) {
			istop = Math.floor(stop);
		}

		const nticks = Math.min(count, Math.ceil(istop - istart + 1));
		for (let i = 0; i < nticks; ++i) {
			result[i] = (istart + i) * step;
		}
		for (let i = nticks; i < count; ++i) {
			result[i] = NaN;
		}

		//
		return result;
	}

	protected updateTicksXMinor(
		mstep: number,
		index: number,
		position: number,
		min: number,
		ratio: number,
		lmin: number,
		lmax: number
	): void {
		const mticks = this.xminors;
		if (0 < mticks.length) {
			const minorCount = this.xminorCount;
			if (0 < mstep) {
				const padding = this.xpadding;
				if (index < 0) {
					for (let i = 0, j = (index + 1) * minorCount; i < minorCount; i += 1, j += 1) {
						const mtick = mticks[j];
						const x = (position - (minorCount - i) * mstep - min) * ratio + lmin;
						if (lmin - padding <= x) {
							mtick.lock(EShapeLockPart.UPLOADED);
							mtick.visible = true;
							mtick.transform.position.x = x;
							mtick.unlock(EShapeLockPart.UPLOADED, true);
						} else {
							mtick.visible = false;
						}
					}
				} else {
					for (let i = 0, j = (index + 1) * minorCount; i < minorCount; i += 1, j += 1) {
						const mtick = mticks[j];
						const x = (position + (i + 1) * mstep - min) * ratio + lmin;
						if (x <= lmax + padding) {
							mtick.lock(EShapeLockPart.UPLOADED);
							mtick.visible = true;
							mtick.transform.position.x = x;
							mtick.unlock(EShapeLockPart.UPLOADED, true);
						} else {
							mtick.visible = false;
						}
					}
				}
			} else {
				for (let i = (index + 1) * minorCount, imax = i + minorCount; i < imax; ++i) {
					mticks[i].visible = false;
				}
			}
		}
	}

	protected toStepMinor(step: number, minorCount: number): number {
		if (0 <= step) {
			return step / (minorCount + 1);
		} else {
			return -1;
		}
	}

	protected updateTicksX(
		min: number,
		max: number,
		ratio: number,
		lmin: number,
		lmax: number
	): void {
		const ticks = this.xmajors;
		const mticks = this.xminors;
		const minorCount = this.xminorCount;
		const padding = this.xpadding;

		// Major tick positions
		const step = this.getStep(min, max, ticks.length);
		const positions = this.getTickPositions(
			min,
			max,
			ticks.length,
			step,
			padding,
			ratio,
			this.workMajorPositions
		);

		// First minors
		const mstep = this.toStepMinor(step, minorCount);
		this.updateTicksXMinor(mstep, -1, positions[0], min, ratio, lmin, lmax);

		// Major and minor ticks
		for (let i = 0, imax = ticks.length; i < imax; ++i) {
			const tick = ticks[i];
			const position = positions[i];
			if (position === position) {
				// Major tick
				tick.lock(EShapeLockPart.UPLOADED);
				tick.visible = true;
				tick.transform.position.x = (position - min) * ratio + lmin;
				tick.text.value = this.xformatter.format(position, step);
				tick.unlock(EShapeLockPart.UPLOADED, true);

				// Minor ticks
				this.updateTicksXMinor(mstep, i, positions[i], min, ratio, lmin, lmax);
			} else {
				// Major tick
				tick.visible = false;

				// Minor ticks
				if (0 < mticks.length) {
					for (let j = (i + 1) * minorCount, jmax = j + minorCount; j < jmax; ++j) {
						mticks[j].visible = false;
					}
				}
			}
		}
	}

	protected updateTicksYMinor(
		mstep: number,
		index: number,
		position: number,
		min: number,
		ratio: number,
		lmin: number,
		lmax: number
	): void {
		const mticks = this.yminors;
		if (0 < mticks.length) {
			const minorCount = this.yminorCount;
			if (0 < mstep) {
				const padding = this.ypadding;
				if (index < 0) {
					for (let i = 0, j = (index + 1) * minorCount; i < minorCount; i += 1, j += 1) {
						const mtick = mticks[j];
						const y = lmax - (position - (minorCount - i) * mstep - min) * ratio;
						if (y <= lmax + padding) {
							mtick.lock(EShapeLockPart.UPLOADED);
							mtick.visible = true;
							mtick.transform.position.y = y;
							mtick.unlock(EShapeLockPart.UPLOADED, true);
						} else {
							mtick.visible = false;
						}
					}
				} else {
					for (let i = 0, j = (index + 1) * minorCount; i < minorCount; i += 1, j += 1) {
						const mtick = mticks[j];
						const y = lmax - (position + (i + 1) * mstep - min) * ratio;
						if (lmin - padding <= y) {
							mtick.lock(EShapeLockPart.UPLOADED);
							mtick.visible = true;
							mtick.transform.position.y = y;
							mtick.unlock(EShapeLockPart.UPLOADED, true);
						} else {
							mtick.visible = false;
						}
					}
				}
			} else {
				for (let i = (index + 1) * minorCount, imax = i + minorCount; i < imax; ++i) {
					mticks[i].visible = false;
				}
			}
		}
	}

	protected updateTicksY(
		min: number,
		max: number,
		ratio: number,
		lmin: number,
		lmax: number
	): void {
		const ticks = this.ymajors;
		const mticks = this.yminors;
		const minorCount = this.yminorCount;
		const padding = this.ypadding;

		// Major tick positions
		const step = this.getStep(min, max, ticks.length);
		const positions = this.getTickPositions(
			min,
			max,
			ticks.length,
			step,
			padding,
			ratio,
			this.workMajorPositions
		);

		// First minors
		const mstep = this.toStepMinor(step, minorCount);
		this.updateTicksYMinor(mstep, -1, positions[0], min, ratio, lmin, lmax);

		// Major and minor ticks
		for (let i = 0, imax = ticks.length; i < imax; ++i) {
			const tick = ticks[i];
			const position = positions[i];
			if (position === position) {
				// Major tick
				tick.lock(EShapeLockPart.UPLOADED);
				tick.visible = true;
				tick.transform.position.y = lmax - (position - min) * ratio;
				tick.text.value = this.yformatter.format(position, step);
				tick.unlock(EShapeLockPart.UPLOADED, true);

				// Minor ticks
				this.updateTicksYMinor(mstep, i, positions[i], min, ratio, lmin, lmax);
			} else {
				// Major tick
				tick.visible = false;

				// Minor ticks
				if (0 < mticks.length) {
					for (let j = (i + 1) * minorCount, jmax = j + minorCount; j < jmax; ++j) {
						mticks[j].visible = false;
					}
				}
			}
		}
	}

	protected updateLines(
		data: EShapeData,
		xmin: number,
		xratio: number,
		lxmin: number,
		ymin: number,
		yratio: number,
		lymax: number
	): void {
		const lines = this.lines;
		for (let i = 0, imax = Math.min(lines.length, data.size()); i < imax; ++i) {
			const value = data.get(i);
			if (value != null) {
				const line = lines[i];
				const points = line.points;
				if (points != null) {
					const pointsValues = points.values;
					const valueValues = value.values as number[];
					const valueValuesLength = valueValues.length;
					if (2 <= valueValuesLength) {
						const valueTimes = value.times;
						const valueTimesLength = valueTimes.length;
						if (valueTimesLength < valueValuesLength) {
							// Index mode
							for (let j = 0; j < valueValuesLength; ++j) {
								const index = j << 1;
								pointsValues[index + 0] = (j + 1 - xmin) * xratio + lxmin;
								pointsValues[index + 1] = lymax - (valueValues[j] - ymin) * yratio;
							}
						} else {
							// Time mode
							for (let j = 0; j < valueValuesLength; ++j) {
								const index = j << 1;
								pointsValues[index + 0] = (valueTimes[j] - xmin) * xratio + lxmin;
								pointsValues[index + 1] = lymax - (valueValues[j] - ymin) * yratio;
							}
						}
						line.lock(EShapeLockPart.UPLOADED);
						line.visible = true;
						points.values = pointsValues;
						line.unlock(EShapeLockPart.UPLOADED, true);
					} else {
						line.visible = false;
					}
				}
			}
		}
	}

	execute(shape: EShape, runtime: EShapeRuntime, time: number): void {
		const data = shape.data;
		if (data.isChanged) {
			// Calculate the plot range in the time-value coordinate
			let xmin = +Infinity;
			let xmax = -Infinity;
			let ymin = +Infinity;
			let ymax = -Infinity;
			for (let i = 0, imax = data.size(); i < imax; ++i) {
				const value = data.get(i);
				if (value != null) {
					const values = value.values;
					const valuesLength = values.length;
					const times = value.times;
					const timesLength = times.length;

					// X
					if (timesLength < valuesLength) {
						// Index mode
						if (1 < xmin) {
							xmin = 1;
						}
						if (xmax < valuesLength) {
							xmax = valuesLength;
						}
					} else {
						// Time mode
						for (let j = 0; j < timesLength; ++j) {
							const t = times[j];
							if (t < xmin) {
								xmin = t;
							}
							if (xmax < t) {
								xmax = t;
							}
						}
					}

					// Y
					for (let j = 0; j < valuesLength; ++j) {
						const v: number = values[j] as number;
						if (v < ymin) {
							ymin = v;
						}
						if (ymax < v) {
							ymax = v;
						}
					}
				}
			}
			if (xmax < xmin) {
				xmin = 0;
				xmax = 1;
			} else if (xmax <= xmin) {
				xmax = xmin + 1;
			}
			if (ymax < ymin) {
				ymax = 1;
				ymin = 0;
			} else if (ymax <= ymin) {
				ymax = ymin + 1;
			}
			const xspan = xmax - xmin;
			const yspan = ymax - ymin;

			// Calculate plot range in the local coordinate
			const plotArea = this.plotArea;
			const size = plotArea != null ? plotArea.size : shape.size;
			const sx = size.x * 0.5;
			const sy = size.y * 0.5;
			const xpadding = this.xpadding;
			const ypadding = this.ypadding;
			const lxmin = -sx + xpadding;
			let lxmax = +sx - xpadding;
			const lymin = -sy + ypadding;
			let lymax = +sy - ypadding;
			if (lxmax <= lxmin) {
				lxmax = lxmin + 1;
			}
			if (lymax <= lymin) {
				lymax = lymin + 1;
			}
			const lxspan = lxmax - lxmin;
			const lyspan = lymax - lymin;

			// x (in the time-value coordinate)
			// lx (in the local coordinate)
			// lx = (x - xmin) / (xmax - xmin) * (lxmax - lxmin) + lxmin
			//    = (x - xmin) * xratio + lxmin
			// where xratio := (lxmax - lxmin) / (xmax - xmin)
			//
			// Please note thay the y coordinate in the local coordinate is upside down.
			// Namely, ly = lymax - (y - ymin) * yratio.
			const xratio = lxspan / xspan;
			const yratio = lyspan / yspan;

			// X ticks
			this.updateTicksX(xmin, xmax, xratio, lxmin, lxmax);

			// Y ticks
			this.updateTicksY(ymin, ymax, yratio, lymin, lymax);

			// Lines
			this.updateLines(data, xmin, xratio, lxmin, ymin, yratio, lymax);
		}
	}
}
