import { EShape, EShapeCapabilities, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertyStrokeStyle } from "./e-command-shape-property-stroke-style";

export class ECommandShapePropertyStrokeStyleScaling extends ECommandShapePropertyStrokeStyle {
	protected override toCapability(shape: EShape): EShapeCapability {
		if (EShapeCapabilities.contains(shape, EShapeCapability.STROKE_STYLE_SCALING)) {
			return EShapeCapability.STROKE_STYLE_SCALING;
		}
		return EShapeCapability.NONE;
	}
}
