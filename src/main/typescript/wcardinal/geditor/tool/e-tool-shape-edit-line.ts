import {
	EShape,
	EShapeCapability,
	EShapeLockPart,
	EShapePoints,
	EShapePointsFormatter,
	EShapePointsFormatters,
	EShapePointsStyle,
	toPointsBoundary
} from "@wcardinal/wcardinal-ui";
import {
	EToolShapeEditLineBase,
	EToolShapeEditLineBaseOptions
} from "./e-tool-shape-edit-line-base";
import { Matrix, Point } from "pixi.js";

export interface EToolShapeEditLineOptions extends EToolShapeEditLineBaseOptions {}

export class EToolShapeEditLine<
	OPTIONS extends EToolShapeEditLineOptions = EToolShapeEditLineOptions
> extends EToolShapeEditLineBase<OPTIONS> {
	protected override onShapeSet(shape: EShape): void {
		const points = shape.points;
		if (points) {
			shape.updateTransform();
			this._points = this.toPoints(points, this.toTransform(shape));
			this._pointsStyle = this.toPointsStyle(points);
			this._formatter = this.toFormatter(points, this._pointsStyle);
		} else {
			this._points = [];
			this._pointsStyle = EShapePointsStyle.NONE;
			this._formatter = undefined;
		}
		this.reshape();
		const canvas = this._diagram.canvas;
		if (canvas) {
			canvas.addChild(this);
		}
	}

	protected toPoints(points: EShapePoints, transform: Matrix): Point[] {
		const result: Point[] = [];
		const values = points.values;
		for (let i = 0, imax = values.length; i < imax; i += 2) {
			const point = new Point(values[i], values[i + 1]);
			result.push(transform.apply(point, point));
		}
		return result;
	}

	protected toPointsStyle(points: EShapePoints): EShapePointsStyle {
		return points.style;
	}

	protected toFormatter(
		points: EShapePoints,
		pointsStyle: EShapePointsStyle
	): EShapePointsFormatter | undefined {
		return points.formatter ?? EShapePointsFormatters.find(pointsStyle)?.formatter;
	}

	protected override toCapability(shape: EShape | null): EShapeCapability {
		return EShapeCapability.LINE_TAIL | EShapeCapability.LINE_HEAD;
	}

	protected newShape(
		values: number[],
		segments: number[],
		style: EShapePointsStyle,
		oldShape: EShape
	): EShape {
		const boundary = toPointsBoundary(values, [0, 0, 0, 0]);
		const cx = (boundary[2] + boundary[0]) * 0.5;
		const cy = (boundary[3] + boundary[1]) * 0.5;
		const sx = boundary[2] - boundary[0];
		const sy = boundary[3] - boundary[1];

		const result = oldShape.clone();
		const transform = result.transform;
		const transformPosition = transform.position;
		const localTransform = oldShape.transform.localTransform;
		const x = localTransform.a * cx + localTransform.c * cy + transformPosition.x;
		const y = localTransform.b * cx + localTransform.d * cy + transformPosition.y;

		const newValues: number[] = [];
		for (let i = 0, imax = values.length; i < imax; i += 2) {
			newValues.push(values[i] - cx, values[i + 1] - cy);
		}

		result.lock(EShapeLockPart.UPLOADED);
		result.transform.position.set(x, y);
		result.size.set(sx, sy);
		const points = result.points;
		if (points) {
			points.set(newValues, segments, style);
		}
		result.unlock(EShapeLockPart.UPLOADED, true);
		return result;
	}
}
