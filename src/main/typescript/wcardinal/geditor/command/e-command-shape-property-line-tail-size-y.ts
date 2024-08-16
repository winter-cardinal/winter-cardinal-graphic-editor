import { EShape, EShapeCapabilities, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertyRecursiveSimple } from "./e-command-shape-property-recursive-simple";

export class ECommandShapePropertyLineTailSizeY extends ECommandShapePropertyRecursiveSimple<number> {
	protected override toCapability(shape: EShape): EShapeCapability {
		if (EShapeCapabilities.contains(shape, EShapeCapability.LINE_TAIL)) {
			return EShapeCapability.LINE_TAIL;
		}
		return EShapeCapability.NONE;
	}

	protected override getProperty(shape: EShape, capability: EShapeCapability): number {
		const points = shape.points;
		if (points) {
			return points.marker.tail.size.y;
		}
		return 0;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: number
	): void {
		const points = shape.points;
		if (points) {
			points.marker.tail.size.y = property;
		}
	}
}
