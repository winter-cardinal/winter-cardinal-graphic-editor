import { EShape, EShapeCapabilities, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "./e-command-shape-property-simple";

export class ECommandShapePropertySkew extends ECommandShapePropertySimple<number> {
	protected override toCapability(shape: EShape): EShapeCapability {
		if (EShapeCapabilities.contains(shape, EShapeCapability.SKEW)) {
			return EShapeCapability.SKEW;
		}
		return EShapeCapability.NONE;
	}

	protected override getProperty(shape: EShape, capability: EShapeCapability): number {
		return shape.transform.skew.x;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: number
	): void {
		shape.transform.skew.set(property, property);
	}

	protected override isMergeable(): boolean {
		return true;
	}
}
