import {
	EShape,
	EShapeCapabilities,
	EShapeCapability,
	EShapePointsMarkerType
} from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertyRecursiveSimple } from "./e-command-shape-property-recursive-simple";

export class ECommandShapePropertyLineTailType extends ECommandShapePropertyRecursiveSimple<EShapePointsMarkerType> {
	protected override toCapability(shape: EShape): EShapeCapability {
		if (EShapeCapabilities.contains(shape, EShapeCapability.LINE_TAIL)) {
			return EShapeCapability.LINE_TAIL;
		}
		return EShapeCapability.NONE;
	}

	protected override getProperty(
		shape: EShape,
		capability: EShapeCapability
	): EShapePointsMarkerType {
		const points = shape.points;
		if (points) {
			return points.marker.tail.type;
		}
		return EShapePointsMarkerType.NONE;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: EShapePointsMarkerType
	): void {
		const points = shape.points;
		if (points) {
			points.marker.tail.type = property;
		}
	}
}
