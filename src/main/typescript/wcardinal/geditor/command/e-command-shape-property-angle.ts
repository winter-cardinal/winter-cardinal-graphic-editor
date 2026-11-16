import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "./e-command-shape-property-simple";

export class ECommandShapePropertyAngle extends ECommandShapePropertySimple<number> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): number {
		return shape.angle;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: number
	): void {
		shape.angle = property;
	}

	protected override isMergeable(): boolean {
		return true;
	}
}
