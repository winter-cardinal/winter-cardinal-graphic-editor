import { EShape, EShapeCapability, EShapeFillDirection } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertyRecursiveSimple } from "./e-command-shape-property-recursive-simple";

export class ECommandShapePropertyFillDirection extends ECommandShapePropertyRecursiveSimple<EShapeFillDirection> {
	protected override getProperty(
		shape: EShape,
		capability: EShapeCapability
	): EShapeFillDirection {
		return shape.fill.direction;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: EShapeFillDirection
	): void {
		shape.fill.direction = property;
	}
}
