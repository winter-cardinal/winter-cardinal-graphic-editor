import { createPolygon, EShape } from "@wcardinal/wcardinal-ui";
import { EToolShapeCreateLine, EToolShapeCreateLineOptions } from "./e-tool-shape-create-line";

export interface EToolShapeCreatePolygonOptions extends EToolShapeCreateLineOptions {}

export class EToolShapeCreatePolygon extends EToolShapeCreateLine<EToolShapeCreatePolygonOptions> {
	protected override toShape(values: number[]): EShape | null {
		if (6 <= values.length) {
			return createPolygon(values);
		}
		return null;
	}
}
