import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapeProperty } from "./e-command-shape-property";

export class ECommandShapePropertyTextSizeDelta extends ECommandShapeProperty<number, number> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): number {
		return shape.text.size;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: number
	): void {
		shape.text.size = property;
	}

	protected override initProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: number
	): void {
		const text = shape.text;
		text.size = Math.max(0, text.size + property);
	}
}
