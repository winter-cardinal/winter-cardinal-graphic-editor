import { EShape, EShapeCapability, EShapeImageLike } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";
import { ECommandShapeProperty } from "./e-command-shape-property";

export class ECommandShapePropertyImageClear extends ECommandShapeProperty<
	EShapeImageLike | undefined,
	void
> {
	constructor(selection: EToolSelectSelection) {
		super(selection, undefined);
	}

	protected override getProperty(
		shape: EShape,
		capability: EShapeCapability
	): EShapeImageLike | undefined {
		return shape.image;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: EShapeImageLike | undefined
	): void {
		shape.image = property;
	}

	protected override initProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: void
	): void {
		shape.image = undefined;
		shape.gradient = undefined;
	}
}
