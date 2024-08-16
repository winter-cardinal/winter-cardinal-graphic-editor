import {
	EShape,
	EShapeCapability,
	EShapeLockPart,
	EShapePointsStyle,
	toPointsBoundary
} from "@wcardinal/wcardinal-ui";
import {
	EToolShapeEditLineBase,
	EToolShapeEditLineBaseOptions
} from "./e-tool-shape-edit-line-base";

export interface EToolShapeEditLineOptions extends EToolShapeEditLineBaseOptions {}

export class EToolShapeEditLine<
	OPTIONS extends EToolShapeEditLineOptions = EToolShapeEditLineOptions
> extends EToolShapeEditLineBase<OPTIONS> {
	constructor(options: OPTIONS) {
		super(options);
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
		const px = transformPosition.x;
		const py = transformPosition.y;

		const localTransform = oldShape.transform.localTransform;
		const dx = localTransform.a * cx + localTransform.c * cy;
		const dy = localTransform.b * cx + localTransform.d * cy;

		const newValues: number[] = [];
		for (let i = 0, imax = values.length; i < imax; i += 2) {
			newValues.push(values[i + 0] - cx, values[i + 1] - cy);
		}

		result.lock(EShapeLockPart.UPLOADED);
		result.transform.position.set(px + dx, py + dy);
		result.size.set(sx, sy);
		const points = result.points;
		if (points) {
			points.set(newValues, segments, style);
		}
		result.unlock(EShapeLockPart.UPLOADED, true);
		return result;
	}
}
