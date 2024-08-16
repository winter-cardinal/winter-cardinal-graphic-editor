import { EShape, EShapeCapabilities, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "./e-command-shape-property-simple";

export class ECommandShapePropertyPositionX extends ECommandShapePropertySimple<number> {
	protected override toCapability(shape: EShape): EShapeCapability {
		if (EShapeCapabilities.contains(shape, EShapeCapability.POSITION)) {
			return EShapeCapability.POSITION;
		}
		return EShapeCapability.NONE;
	}

	protected override getProperty(shape: EShape, capability: EShapeCapability): number {
		return shape.transform.position.x;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: number
	): void {
		shape.transform.position.x = property;
	}

	protected override isMergeable(): boolean {
		return true;
	}
}
