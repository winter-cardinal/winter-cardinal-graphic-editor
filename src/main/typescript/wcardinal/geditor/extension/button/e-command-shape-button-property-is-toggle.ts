import { EShape, EShapeButton, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "../../command/e-command-shape-property-simple";

export class ECommandShapeButtonPropertyIsToggle extends ECommandShapePropertySimple<boolean> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): boolean {
		if (shape instanceof EShapeButton) {
			return shape.isToggle;
		}
		return false;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: boolean
	): void {
		if (shape instanceof EShapeButton) {
			shape.isToggle = property;
		}
	}
}
