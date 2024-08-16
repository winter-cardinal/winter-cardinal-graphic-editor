import { EShape, EShapeCapability, EShapeTextWeight } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "./e-command-shape-property-simple";

export class ECommandShapePropertyTextWeight extends ECommandShapePropertySimple<EShapeTextWeight> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): EShapeTextWeight {
		return shape.text.weight;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: EShapeTextWeight
	): void {
		shape.text.weight = property;
	}
}
