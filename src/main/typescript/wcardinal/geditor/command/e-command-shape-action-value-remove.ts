import { DCommandBase, EShapeActionValue } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";

export class ECommandShapeActionValueRemove extends DCommandBase {
	protected _selection: EToolSelectSelection;
	protected _target: EShapeActionValue;
	protected _indices: number[];

	constructor(target: EShapeActionValue, selection: EToolSelectSelection) {
		super();
		this._selection = selection;
		this._target = target;
		this._indices = [];
	}

	get selection(): EToolSelectSelection {
		return this._selection;
	}

	get target(): EShapeActionValue {
		return this._target;
	}

	get indices(): number[] {
		return this._indices;
	}

	execute(): boolean {
		const target = this._target;
		const indices = this._indices;
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			const index = shape.action.indexOf(target);
			indices.push(index);
			if (0 <= index) {
				shape.action.remove(index);
			}
		}
		this._selection.update("PROPERTY");
		return true;
	}

	redo(): boolean {
		const indices = this._indices;
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			const index = indices[i];
			if (0 <= index) {
				shape.action.remove(index);
			}
		}
		this._selection.update("PROPERTY");
		return true;
	}

	undo(): boolean {
		const target = this._target;
		const indices = this._indices;
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			const index = indices[i];
			if (0 <= index) {
				shape.action.add(target, index);
			}
		}
		this._selection.update("PROPERTY");
		return true;
	}
}
