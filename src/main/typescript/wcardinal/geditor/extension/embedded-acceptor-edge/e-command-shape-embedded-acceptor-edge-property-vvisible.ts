import { EShape, EShapeCapability, EShapeEmbeddedAcceptorEdge } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "../../command/e-command-shape-property-simple";

export class ECommandShapeEmbeddedAcceptorEdgePropertyVvisible extends ECommandShapePropertySimple<boolean> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): boolean {
		if (shape instanceof EShapeEmbeddedAcceptorEdge) {
			return shape.vvisible;
		}
		return false;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: boolean
	): void {
		if (shape instanceof EShapeEmbeddedAcceptorEdge) {
			shape.vvisible = property;
		}
	}
}
