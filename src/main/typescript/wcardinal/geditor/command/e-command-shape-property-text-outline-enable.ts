import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "./e-command-shape-property-simple";

export class ECommandShapePropertyTextOutlineEnable extends ECommandShapePropertySimple<boolean> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): boolean {
		return shape.text.outline.enable;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: boolean
	): void {
		shape.text.outline.enable = property;
	}
}
