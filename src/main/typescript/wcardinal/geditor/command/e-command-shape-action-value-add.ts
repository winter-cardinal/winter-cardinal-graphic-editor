import { DCommandBase, EShapeActionValue } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";

export class ECommandShapeActionValueAdd extends DCommandBase {
	protected _selection: EToolSelectSelection;
	protected _value: EShapeActionValue;

	constructor(value: EShapeActionValue, selection: EToolSelectSelection) {
		super();
		this._selection = selection;
		this._value = value;
	}

	get selection(): EToolSelectSelection {
		return this._selection;
	}

	get value(): EShapeActionValue {
		return this._value;
	}

	execute(): boolean {
		return this.redo();
	}

	redo(): boolean {
		const value = this._value;
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			shapes[i].action.add(value);
		}
		this._selection.update("PROPERTY");
		return true;
	}

	undo(): boolean {
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			shape.action.remove(shape.action.size() - 1);
		}
		this._selection.update("PROPERTY");
		return true;
	}
}
