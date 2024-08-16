import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertyCapability } from "./e-command-shape-property-capability";

export class ECommandShapePropertyCapabilityLock extends ECommandShapePropertyCapability {
	protected override initProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: EShapeCapability
	): void {
		shape.capability.locked |= property;
	}
}
