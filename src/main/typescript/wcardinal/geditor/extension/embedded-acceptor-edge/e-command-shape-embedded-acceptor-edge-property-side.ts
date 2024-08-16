import {
	EShape,
	EShapeAcceptorEdgeSide,
	EShapeCapability,
	EShapeEmbeddedAcceptorEdge
} from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "../../command/e-command-shape-property-simple";

export class ECommandShapeEmbeddedAcceptorEdgePropertySide extends ECommandShapePropertySimple<EShapeAcceptorEdgeSide> {
	protected override getProperty(
		shape: EShape,
		capability: EShapeCapability
	): EShapeAcceptorEdgeSide {
		if (shape instanceof EShapeEmbeddedAcceptorEdge) {
			return shape.side;
		}
		return EShapeAcceptorEdgeSide.NONE;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: EShapeAcceptorEdgeSide
	): void {
		if (shape instanceof EShapeEmbeddedAcceptorEdge) {
			shape.side = property;
		}
	}
}
