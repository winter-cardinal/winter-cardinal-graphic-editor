import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertyRecursiveSimple } from "./e-command-shape-property-recursive-simple";

type PROPERTY = [number, number];

export class ECommandShapePropertyFillColor extends ECommandShapePropertyRecursiveSimple<PROPERTY> {
	protected getProperty(shape: EShape, capability: EShapeCapability): PROPERTY {
		return [shape.fill.color, shape.fill.alpha];
	}

	protected setProperty(shape: EShape, capability: EShapeCapability, property: PROPERTY): void {
		shape.fill.set(undefined, property[0], property[1]);
	}
}
