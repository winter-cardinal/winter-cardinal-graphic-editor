import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "./e-command-shape-property-simple";

export class ECommandShapePropertyShortcut extends ECommandShapePropertySimple<string | undefined> {
	protected override getProperty(
		shape: EShape,
		capability: EShapeCapability
	): string | undefined {
		return shape.shortcut;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: string | undefined
	): void {
		shape.shortcut = property;
	}
}
