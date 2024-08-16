import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";
import { ECommandShapePropertyRecursive } from "./e-command-shape-property-recursive";

type PROPERTY = [number, number];

export class ECommandShapePropertyImageFitTo extends ECommandShapePropertyRecursive<
	PROPERTY,
	void
> {
	constructor(selection: EToolSelectSelection) {
		super(selection, undefined);
	}

	protected override getProperty(shape: EShape, capability: EShapeCapability): PROPERTY {
		const size = shape.size;
		return [size.x, size.y];
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: PROPERTY
	): void {
		shape.size.set(property[0], property[1]);
	}

	protected initProperty(shape: EShape, capability: EShapeCapability, property: void): void {
		const image = shape.image;
		if (image) {
			shape.size.set(image.width, image.height);
		}
	}
}
