import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertyRecursive } from "./e-command-shape-property-recursive";

export abstract class ECommandShapePropertyRecursiveSimple<
	PROPERTY
> extends ECommandShapePropertyRecursive<PROPERTY, PROPERTY> {
	protected override initProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: PROPERTY
	): void {
		this.setProperty(shape, capability, property);
	}
}
