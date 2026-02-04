import { EToolShapeEditLineBaseOptions } from "./e-tool-shape-edit-line-base";
import { EToolShapeEditLine } from "./e-tool-shape-edit-line";

export interface EToolShapeEditPolygonOptions extends EToolShapeEditLineBaseOptions {}

export class EToolShapeEditPolygon<
	OPTIONS extends EToolShapeEditPolygonOptions = EToolShapeEditPolygonOptions
> extends EToolShapeEditLine<OPTIONS> {
	override get closed(): boolean {
		return true;
	}
}
