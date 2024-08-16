import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "./e-command-shape-property-simple";

export class ECommandShapePropertyTextFamily extends ECommandShapePropertySimple<string> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): string {
		return shape.text.family;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: string
	): void {
		shape.text.family = property;
	}
}
