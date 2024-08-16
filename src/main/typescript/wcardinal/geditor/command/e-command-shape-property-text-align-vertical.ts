import { EShape, EShapeCapability, EShapeTextAlignVertical } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "./e-command-shape-property-simple";

export class ECommandShapePropertyTextAlignVertical extends ECommandShapePropertySimple<EShapeTextAlignVertical> {
	protected override getProperty(
		shape: EShape,
		capability: EShapeCapability
	): EShapeTextAlignVertical {
		return shape.text.align.vertical;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: EShapeTextAlignVertical
	): void {
		shape.text.align.vertical = property;
	}
}
