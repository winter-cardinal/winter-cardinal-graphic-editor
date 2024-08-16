import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelectionUpdatedPart } from "../tool/e-tool-select-selection-updated-part";
import { ECommandShapePropertySimple } from "./e-command-shape-property-simple";

export class ECommandShapePropertyId extends ECommandShapePropertySimple<string> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): string {
		return shape.id;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: string
	): void {
		shape.id = property;
	}

	protected override getParts(): EToolSelectSelectionUpdatedPart {
		return EToolSelectSelectionUpdatedPart.PROPERTY_ID;
	}
}
