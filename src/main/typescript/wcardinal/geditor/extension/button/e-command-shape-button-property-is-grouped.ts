import { EShape, EShapeButton, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "../../command/e-command-shape-property-simple";

export class ECommandShapeButtonPropertyIsGrouped extends ECommandShapePropertySimple<boolean> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): boolean {
		if (shape instanceof EShapeButton) {
			return shape.isGrouped;
		}
		return false;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: boolean
	): void {
		if (shape instanceof EShapeButton) {
			shape.isGrouped = property;
		}
	}
}
