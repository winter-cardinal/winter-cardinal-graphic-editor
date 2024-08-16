import {
	EShape,
	EShapeAcceptorEdgeType,
	EShapeCapability,
	EShapeEmbeddedAcceptorEdge
} from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "../../command/e-command-shape-property-simple";

export class ECommandShapeEmbeddedAcceptorEdgePropertySubtype extends ECommandShapePropertySimple<EShapeAcceptorEdgeType> {
	protected override getProperty(
		shape: EShape,
		capability: EShapeCapability
	): EShapeAcceptorEdgeType {
		if (shape instanceof EShapeEmbeddedAcceptorEdge) {
			return shape.subtype;
		}
		return EShapeAcceptorEdgeType.HEAD;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: EShapeAcceptorEdgeType
	): void {
		if (shape instanceof EShapeEmbeddedAcceptorEdge) {
			shape.subtype = property;
		}
	}
}
