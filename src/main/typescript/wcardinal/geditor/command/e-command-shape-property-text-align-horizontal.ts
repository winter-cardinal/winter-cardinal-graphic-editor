import { EShape, EShapeCapability, EShapeTextAlignHorizontal } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "./e-command-shape-property-simple";

export class ECommandShapePropertyTextAlignHorizontal extends ECommandShapePropertySimple<EShapeTextAlignHorizontal> {
	protected override getProperty(
		shape: EShape,
		capability: EShapeCapability
	): EShapeTextAlignHorizontal {
		return shape.text.align.horizontal;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: EShapeTextAlignHorizontal
	): void {
		shape.text.align.horizontal = property;
	}
}
