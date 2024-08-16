import { EShape, EShapeButton, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "../../command/e-command-shape-property-simple";

export class ECommandShapeButtonPropertyIsActive extends ECommandShapePropertySimple<boolean> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): boolean {
		if (shape instanceof EShapeButton) {
			return shape.state.isActive;
		}
		return false;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: boolean
	): void {
		if (shape instanceof EShapeButton) {
			shape.state.isActive = property;
		}
	}
}
