import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertyRecursiveSimple } from "./e-command-shape-property-recursive-simple";

type PROPERTY = [number, number];

export class ECommandShapePropertyStrokeColor extends ECommandShapePropertyRecursiveSimple<PROPERTY> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): PROPERTY {
		return [shape.stroke.color, shape.stroke.alpha];
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: PROPERTY
	): void {
		shape.stroke.set(undefined, property[0], property[1]);
	}
}
