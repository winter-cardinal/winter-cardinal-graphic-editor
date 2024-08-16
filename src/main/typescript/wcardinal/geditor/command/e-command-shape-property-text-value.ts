import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "./e-command-shape-property-simple";

export class ECommandShapePropertyTextValue extends ECommandShapePropertySimple<string> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): string {
		return shape.text.value;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: string
	): void {
		shape.text.value = property;
	}

	protected override isMergeable(): boolean {
		return true;
	}
}
