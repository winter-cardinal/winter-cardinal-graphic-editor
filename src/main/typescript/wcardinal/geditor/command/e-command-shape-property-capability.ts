import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapeProperty } from "./e-command-shape-property";

export abstract class ECommandShapePropertyCapability extends ECommandShapeProperty<
	EShapeCapability,
	EShapeCapability
> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): EShapeCapability {
		const shapeCapability = shape.getCapability();
		if (shapeCapability != null) {
			return shapeCapability.locked;
		}
		return EShapeCapability.NONE;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: EShapeCapability
	): void {
		if (property !== EShapeCapability.NONE) {
			shape.capability.locked = property;
		} else {
			const shapeCapability = shape.getCapability();
			if (shapeCapability != null) {
				shapeCapability.locked = property;
			}
		}
	}
}
