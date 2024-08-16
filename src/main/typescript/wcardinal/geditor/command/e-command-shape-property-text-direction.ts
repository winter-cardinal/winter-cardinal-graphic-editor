import { EShape, EShapeCapability, EShapeTextDirection } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "./e-command-shape-property-simple";

export class ECommandShapePropertyTextDirection extends ECommandShapePropertySimple<EShapeTextDirection> {
	protected override getProperty(
		shape: EShape,
		capability: EShapeCapability
	): EShapeTextDirection {
		return shape.text.direction;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: EShapeTextDirection
	): void {
		shape.text.direction = property;
	}
}
