import { EShape, EShapeCapability, EShapeStrokeStyle } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";
import { ECommandShapeProperty } from "./e-command-shape-property";

type PROPERTY = EShapeStrokeStyle;
type INITIAL_PROPERTY = [EShapeStrokeStyle, EShapeStrokeStyle];

export class ECommandShapePropertyStrokeStyle extends ECommandShapeProperty<
	PROPERTY,
	INITIAL_PROPERTY
> {
	constructor(
		selection: EToolSelectSelection,
		added: EShapeStrokeStyle,
		removed: EShapeStrokeStyle
	) {
		super(selection, [added, removed]);
	}

	protected override getProperty(shape: EShape, capability: EShapeCapability): PROPERTY {
		return shape.stroke.style;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: PROPERTY
	): void {
		shape.stroke.style = property;
	}

	protected override initProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: INITIAL_PROPERTY
	): void {
		const stroke = shape.stroke;
		stroke.style = (stroke.style & ~property[1]) | property[0];
	}
}
