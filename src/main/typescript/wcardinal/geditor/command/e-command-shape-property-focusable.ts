import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "./e-command-shape-property-simple";

export class ECommandShapePropertyFocusable extends ECommandShapePropertySimple<boolean> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): boolean {
		return shape.state.isFocusable;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: boolean
	): void {
		shape.state.isFocusable = property;
	}
}
