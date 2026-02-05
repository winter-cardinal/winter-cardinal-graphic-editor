import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertyRecursiveSimple } from "./e-command-shape-property-recursive-simple";

export class ECommandShapePropertyFillPercent extends ECommandShapePropertyRecursiveSimple<number> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): number {
		return shape.fill.percent;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: number
	): void {
		shape.fill.percent = property;
	}
}
