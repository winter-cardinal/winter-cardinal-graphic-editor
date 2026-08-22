import { EShape, EShapeCapabilities, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertyStrokeStyle } from "./e-command-shape-property-stroke-style";

export class ECommandShapePropertyStrokeStyleCosmetic extends ECommandShapePropertyStrokeStyle {
	protected override toCapability(shape: EShape): EShapeCapability {
		if (EShapeCapabilities.contains(shape, EShapeCapability.STROKE_STYLE_COSMETIC)) {
			return EShapeCapability.STROKE_STYLE_COSMETIC;
		}
		return EShapeCapability.NONE;
	}
}
