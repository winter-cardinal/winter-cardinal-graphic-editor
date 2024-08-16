import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertyRecursiveSimple } from "./e-command-shape-property-recursive-simple";

export class ECommandShapePropertyStrokeAlign extends ECommandShapePropertyRecursiveSimple<number> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): number {
		return shape.stroke.align;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: number
	): void {
		shape.stroke.align = property;
	}

	protected override isMergeable(): boolean {
		return true;
	}
}
