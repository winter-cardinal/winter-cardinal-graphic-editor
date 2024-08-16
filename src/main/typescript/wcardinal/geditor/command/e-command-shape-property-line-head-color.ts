import { EShape, EShapeCapabilities, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertyRecursiveSimple } from "./e-command-shape-property-recursive-simple";

type PROPERTY = [number, number];

export class ECommandShapePropertyLineHeadColor extends ECommandShapePropertyRecursiveSimple<PROPERTY> {
	protected override toCapability(shape: EShape): EShapeCapability {
		if (EShapeCapabilities.contains(shape, EShapeCapability.LINE_HEAD)) {
			return EShapeCapability.LINE_HEAD;
		}
		return EShapeCapability.NONE;
	}

	protected getProperty(shape: EShape, capability: EShapeCapability): PROPERTY {
		const points = shape.points;
		if (points) {
			const fill = points.marker.head.fill;
			return [fill.color, fill.alpha];
		}
		return [0, 0];
	}

	protected setProperty(shape: EShape, capability: EShapeCapability, property: PROPERTY): void {
		const points = shape.points;
		if (points) {
			points.marker.head.fill.set(undefined, property[0], property[1]);
		}
	}
}
