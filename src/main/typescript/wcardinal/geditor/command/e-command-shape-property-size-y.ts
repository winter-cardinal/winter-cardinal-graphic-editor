import { EShape, EShapeCapabilities, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "./e-command-shape-property-simple";

export class ECommandShapePropertySizeY extends ECommandShapePropertySimple<number> {
	protected override toCapability(shape: EShape): EShapeCapability {
		if (EShapeCapabilities.contains(shape, EShapeCapability.HEIGHT)) {
			return EShapeCapability.HEIGHT;
		}
		return EShapeCapability.NONE;
	}

	protected override getProperty(shape: EShape, capability: EShapeCapability): number {
		return shape.size.y;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: number
	): void {
		shape.size.y = property;
	}

	protected override isMergeable(): boolean {
		return true;
	}
}
