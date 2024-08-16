import { EShape, EShapeCapabilities, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { Rectangle } from "pixi.js";
import { ECommandShapeProperty } from "./e-command-shape-property";

export class ECommandShapePropertyPositionLeft extends ECommandShapeProperty<number, number> {
	protected static WORK?: Rectangle;

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

	protected override initProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: number
	): void {
		const rectangle = (ECommandShapePropertyPositionLeft.WORK ??= new Rectangle());
		shape.getBoundsLocal(false, rectangle);
		shape.transform.position.x += property - rectangle.x;
	}

	protected override isMergeable(): boolean {
		return true;
	}
}
