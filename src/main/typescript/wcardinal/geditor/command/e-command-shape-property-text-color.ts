import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "./e-command-shape-property-simple";

type PROPERTY = [number, number];

export class ECommandShapePropertyTextColor extends ECommandShapePropertySimple<PROPERTY> {
	protected getProperty(shape: EShape, capability: EShapeCapability): PROPERTY {
		const text = shape.text;
		return [text.color, text.alpha];
	}

	protected setProperty(shape: EShape, capability: EShapeCapability, property: PROPERTY): void {
		const text = shape.text;
		text.color = property[0];
		text.alpha = property[1];
	}
}
