import {
	EShape,
	EShapeCapabilities,
	EShapeCapability,
	EShapePointsStyle
} from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";
import { ECommandShapeProperty } from "./e-command-shape-property";

type PROPERTY = EShapePointsStyle;
type INITIAL_PROPERTY = [EShapePointsStyle, EShapePointsStyle];

export class ECommandShapePropertyPointsStyle extends ECommandShapeProperty<
	PROPERTY,
	INITIAL_PROPERTY
> {
	constructor(
		selection: EToolSelectSelection,
		added: EShapePointsStyle,
		removed: EShapePointsStyle
	) {
		super(selection, [added, removed]);
	}

	protected override toCapability(shape: EShape): EShapeCapability {
		if (EShapeCapabilities.contains(shape, EShapeCapability.LINE)) {
			return EShapeCapability.LINE;
		}
		return EShapeCapability.NONE;
	}

	protected override getProperty(shape: EShape, capability: EShapeCapability): PROPERTY {
		const points = shape.points;
		if (points != null) {
			return points.style;
		}
		return EShapePointsStyle.NONE;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: PROPERTY
	): void {
		const points = shape.points;
		if (points != null) {
			points.style = property;
		}
	}

	protected override initProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: INITIAL_PROPERTY
	): void {
		const points = shape.points;
		if (points != null) {
			points.style = (points.style & ~property[1]) | property[0];
		}
	}
}
