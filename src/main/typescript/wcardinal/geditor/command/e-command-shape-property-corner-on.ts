import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapeProperty } from "./e-command-shape-property";

export class ECommandShapePropertyCornerOn extends ECommandShapeProperty<number, number> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): number {
		return shape.corner;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: number
	): void {
		shape.corner = property;
	}

	protected override initProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: number
	): void {
		shape.corner |= property;
	}
}
