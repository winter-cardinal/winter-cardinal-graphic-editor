import { DCommandBase, EShapeDataValue } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";

export class ECommandShapeDataValueRemove extends DCommandBase {
	protected _selection: EToolSelectSelection;
	protected _target: EShapeDataValue;
	protected _indices: number[];

	constructor(target: EShapeDataValue, selection: EToolSelectSelection) {
		super();
		this._selection = selection;
		this._target = target;
		const indices: number[] = [];
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			const index = shape.data.indexOf(target);
			indices.push(index);
			if (0 <= index) {
				shape.data.remove(index);
			}
		}
		this._indices = indices;
		this._selection.update("PROPERTY");
	}

	get selection(): EToolSelectSelection {
		return this._selection;
	}

	get target(): EShapeDataValue {
		return this._target;
	}

	get indices(): number[] {
		return this._indices;
	}

	execute(): boolean {
		return true;
	}

	redo(): boolean {
		const indices = this._indices;
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			const index = indices[i];
			if (0 <= index) {
				shape.data.remove(index);
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
				shape.data.add(target, index);
			}
		}
		this._selection.update("PROPERTY");
		return true;
	}
}
