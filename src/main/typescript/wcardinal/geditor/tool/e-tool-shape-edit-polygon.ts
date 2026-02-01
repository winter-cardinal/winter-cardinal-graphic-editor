import {
	EShape,
	EShapeCapability,
	EShapeLockPart,
	EShapePointsStyle,
	EShapePolygon,
	toPointsBoundary
} from "@wcardinal/wcardinal-ui";
import {
	EToolShapeEditLineBase,
	EToolShapeEditLineBaseOptions
} from "./e-tool-shape-edit-line-base";
import { Matrix, Point } from "pixi.js";

export interface EToolShapeEditPolygonOptions extends EToolShapeEditLineBaseOptions {}

export class EToolShapeEditPolygon<
	OPTIONS extends EToolShapeEditPolygonOptions = EToolShapeEditPolygonOptions
> extends EToolShapeEditLineBase<OPTIONS> {
	constructor(options: OPTIONS) {
		super(options);
	}

	protected override onShapeSet(shape: EShape): void {
		if (shape instanceof EShapePolygon) {
			shape.updateTransform();
			this._points = this.toPolygonPoints(shape, this.toTransform(shape));
			this._pointsStyle = EShapePointsStyle.CLOSED;
			this._formatter = undefined;
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

	protected toPolygonPoints(shape: EShapePolygon, transform: Matrix): Point[] {
		const result: Point[] = [];
		const vertices = shape.vertices;
		const size = shape.size;
		const sx = size.x;
		const sy = size.y;
		for (let i = 0, imax = vertices.length; i < imax; i += 2) {
			const point = new Point(vertices[i] * sx, vertices[i + 1] * sy);
			result.push(transform.apply(point, point));
		}
		return result;
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

		result.lock(EShapeLockPart.UPLOADED);
		result.transform.position.set(x, y);
		result.size.set(sx, sy);
		if (0 < sx && 0 < sy && result instanceof EShapePolygon) {
			const fx = 1 / sx;
			const fy = 1 / sy;
			const newVertices: number[] = [];
			for (let i = 0, imax = values.length; i < imax; i += 2) {
				newVertices.push((values[i + 0] - cx) * fx, (values[i + 1] - cy) * fy);
			}
			result.vertices = newVertices;
		}
		result.unlock(EShapeLockPart.UPLOADED, true);
		return result;
	}
}
