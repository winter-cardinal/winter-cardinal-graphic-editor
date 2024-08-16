import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertyRecursiveSimple } from "./e-command-shape-property-recursive-simple";

export class ECommandShapePropertyFillEnable extends ECommandShapePropertyRecursiveSimple<boolean> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): boolean {
		return shape.fill.enable;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: boolean
	): void {
		shape.fill.enable = property;
	}
}
