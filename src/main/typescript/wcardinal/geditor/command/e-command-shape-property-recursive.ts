import { EToolSelectSelection } from "../tool/e-tool-select-selection";
import { ECommandShapeProperty } from "./e-command-shape-property";

export abstract class ECommandShapePropertyRecursive<
	PROPERTY,
	INITIAL_PROPERTY
> extends ECommandShapeProperty<PROPERTY, INITIAL_PROPERTY> {
	constructor(selection: EToolSelectSelection, property: INITIAL_PROPERTY) {
		super(selection, property);
	}

	protected override isRecursive(): boolean {
		return true;
	}
}
