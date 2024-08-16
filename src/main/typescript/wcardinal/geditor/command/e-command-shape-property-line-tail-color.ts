import { EShape, EShapeCapabilities, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertyRecursiveSimple } from "./e-command-shape-property-recursive-simple";

type PROPERTY = [number, number];

export class ECommandShapePropertyLineTailColor extends ECommandShapePropertyRecursiveSimple<PROPERTY> {
	protected override toCapability(shape: EShape): EShapeCapability {
		if (EShapeCapabilities.contains(shape, EShapeCapability.LINE_TAIL)) {
			return EShapeCapability.LINE_TAIL;
		}
		return EShapeCapability.NONE;
	}

	protected override getProperty(shape: EShape, capability: EShapeCapability): PROPERTY {
		const points = shape.points;
		if (points) {
			const fill = points.marker.tail.fill;
			return [fill.color, fill.alpha];
		}
		return [0, 0];
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: PROPERTY
	): void {
		const points = shape.points;
		if (points) {
			points.marker.tail.fill.set(undefined, property[0], property[1]);
		}
	}
}
