import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertyRecursiveSimple } from "./e-command-shape-property-recursive-simple";

export class ECommandShapePropertyStrokeEnable extends ECommandShapePropertyRecursiveSimple<boolean> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): boolean {
		return shape.stroke.enable;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: boolean
	): void {
		shape.stroke.enable = property;
	}
}
