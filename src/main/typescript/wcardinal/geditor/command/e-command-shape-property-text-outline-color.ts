import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "./e-command-shape-property-simple";

type PROPERTY = [number, number];

export class ECommandShapePropertyTextOutlineColor extends ECommandShapePropertySimple<PROPERTY> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): PROPERTY {
		const outline = shape.text.outline;
		return [outline.color, outline.alpha];
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: PROPERTY
	): void {
		const outline = shape.text.outline;
		outline.color = property[0];
		outline.alpha = property[1];
	}
}
