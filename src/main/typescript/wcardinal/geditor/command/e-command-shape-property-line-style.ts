import { EShape, EShapeCapabilities, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertyStrokeStyle } from "./e-command-shape-property-stroke-style";

export class ECommandShapePropertyLineStyle extends ECommandShapePropertyStrokeStyle {
	protected override toCapability(shape: EShape): EShapeCapability {
		if (EShapeCapabilities.contains(shape, EShapeCapability.LINE)) {
			return EShapeCapability.LINE;
		}
		return EShapeCapability.NONE;
	}
}
