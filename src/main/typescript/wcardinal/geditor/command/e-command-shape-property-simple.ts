import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapeProperty } from "./e-command-shape-property";

export abstract class ECommandShapePropertySimple<PROPERTY> extends ECommandShapeProperty<
	PROPERTY,
	PROPERTY
> {
	protected override initProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: PROPERTY
	): void {
		this.setProperty(shape, capability, property);
	}
}
