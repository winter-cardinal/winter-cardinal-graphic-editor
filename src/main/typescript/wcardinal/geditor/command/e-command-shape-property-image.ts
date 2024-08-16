import {
	EShape,
	EShapeCapability,
	EShapeGradientLike,
	EShapeImageLike
} from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";
import { ECommandShapeProperty } from "./e-command-shape-property";

type PROPERTY = EShapeImageLike | undefined;
type INITIAL_PROPERTY = [EShapeImageLike | undefined, EShapeGradientLike | undefined];

export class ECommandShapePropertyImage extends ECommandShapeProperty<PROPERTY, INITIAL_PROPERTY> {
	constructor(
		selection: EToolSelectSelection,
		image: EShapeImageLike | undefined,
		gradient: EShapeGradientLike | undefined
	) {
		super(selection, [image, gradient]);
	}

	protected override getProperty(shape: EShape, capability: EShapeCapability): PROPERTY {
		return shape.image;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: PROPERTY
	): void {
		shape.image = property;
	}

	protected override initProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: INITIAL_PROPERTY
	): void {
		shape.image = property[0];
		shape.gradient = property[1];
	}
}
