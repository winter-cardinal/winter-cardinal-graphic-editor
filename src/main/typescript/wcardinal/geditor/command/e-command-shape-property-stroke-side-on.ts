import { EShape, EShapeCapability, EShapeStrokeSide } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertyRecursive } from "./e-command-shape-property-recursive";

export class ECommandShapePropertyStrokeSideOn extends ECommandShapePropertyRecursive<
	EShapeStrokeSide,
	EShapeStrokeSide
> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): EShapeStrokeSide {
		return shape.stroke.side;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: EShapeStrokeSide
	): void {
		shape.stroke.side = property;
	}

	protected override initProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: number
	): void {
		shape.stroke.side |= property;
	}
}
