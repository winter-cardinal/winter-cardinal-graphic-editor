import {
	EShape,
	EShapeCapabilities,
	EShapeCapability,
	EShapeConnectorLine,
	EShapePointsMarkerType
} from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertyRecursiveSimple } from "./e-command-shape-property-recursive-simple";

export class ECommandShapePropertyLineTailMargin extends ECommandShapePropertyRecursiveSimple<number> {
	protected override toCapability(shape: EShape): EShapeCapability {
		if (EShapeCapabilities.contains(shape, EShapeCapability.LINE_TAIL)) {
			return EShapeCapability.LINE_TAIL;
		}
		return EShapeCapability.NONE;
	}

	protected override getProperty(shape: EShape, capability: EShapeCapability): number {
		if (shape instanceof EShapeConnectorLine) {
			return shape.edge.tail.margin;
		}
		return 0;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: EShapePointsMarkerType
	): void {
		if (shape instanceof EShapeConnectorLine) {
			shape.edge.tail.margin = property;
		}
	}
}
