import { EShape, EShapeCapability, EShapeTextStyle } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "./e-command-shape-property-simple";

export class ECommandShapePropertyTextStyle extends ECommandShapePropertySimple<EShapeTextStyle> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): EShapeTextStyle {
		return shape.text.style;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: EShapeTextStyle
	): void {
		shape.text.style = property;
	}
}
