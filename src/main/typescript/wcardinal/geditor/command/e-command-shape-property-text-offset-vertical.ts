import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "./e-command-shape-property-simple";

export class ECommandShapePropertyTextOffsetVertical extends ECommandShapePropertySimple<number> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): number {
		return shape.text.offset.vertical;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: number
	): void {
		shape.text.offset.vertical = property;
	}
}
