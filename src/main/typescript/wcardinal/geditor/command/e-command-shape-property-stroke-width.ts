import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertyRecursiveSimple } from "./e-command-shape-property-recursive-simple";

export class ECommandShapePropertyStrokeWidth extends ECommandShapePropertyRecursiveSimple<number> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): number {
		return shape.stroke.width;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: number
	): void {
		shape.stroke.width = property;
	}

	protected override isMergeable(): boolean {
		return true;
	}
}
