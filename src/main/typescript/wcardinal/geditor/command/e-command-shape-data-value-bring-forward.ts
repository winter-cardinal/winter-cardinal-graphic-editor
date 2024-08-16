import { DCommandBase, EShapeDataValue } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";

export class ECommandShapeDataValueBringForward extends DCommandBase {
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
			if (0 < index) {
				shape.data.swap(index - 1, index);
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
		const shapes = this._selection.get();
		const indices = this._indices;
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			const index = indices[i];
			if (0 < index) {
				shape.data.swap(index - 1, index);
			}
		}
		this._selection.update("PROPERTY");
		return true;
	}

	undo(): boolean {
		return this.redo();
	}
}
