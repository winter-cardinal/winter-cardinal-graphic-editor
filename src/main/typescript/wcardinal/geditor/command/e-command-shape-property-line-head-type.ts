import {
	EShape,
	EShapeCapabilities,
	EShapeCapability,
	EShapePointsMarkerType
} from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertyRecursiveSimple } from "./e-command-shape-property-recursive-simple";

export class ECommandShapePropertyLineHeadType extends ECommandShapePropertyRecursiveSimple<EShapePointsMarkerType> {
	protected override toCapability(shape: EShape): EShapeCapability {
		if (EShapeCapabilities.contains(shape, EShapeCapability.LINE_HEAD)) {
			return EShapeCapability.LINE_HEAD;
		}
		return EShapeCapability.NONE;
	}

	protected override getProperty(
		shape: EShape,
		capability: EShapeCapability
	): EShapePointsMarkerType {
		const points = shape.points;
		if (points) {
			return points.marker.head.type;
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
			points.marker.head.type = property;
		}
	}
}
