import { DCommandBase, EShape, EShapeContainer } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";
import { UtilShapeDeleter } from "../util/util-shape-deleter";

export class ECommandShapeDelete extends DCommandBase {
	protected _parent: EShape | EShapeContainer;
	protected _shapes: EShape[];
	protected _indices: number[];
	protected _selection: EToolSelectSelection;
	protected _select: boolean;

	constructor(
		shapes: EShape[],
		indices: number[],
		parent: EShape | EShapeContainer,
		selection: EToolSelectSelection,
		select: boolean
	) {
		super();
		this._shapes = shapes;
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			shapes[i].reference += 1;
		}
		this._indices = indices;
		this._parent = parent;
		this._selection = selection;
		this._select = select;
	}

	get parent(): EShape | EShapeContainer {
		return this._parent;
	}

	get shapes(): EShape[] {
		return this._shapes;
	}

	get indices(): number[] {
		return this._indices;
	}

	get selection(): EToolSelectSelection {
		return this._selection;
	}

	get select(): boolean {
		return this._select;
	}

	execute(): boolean {
		return true;
	}

	redo(): boolean {
		const selection = this._selection;
		if (this._select) {
			selection.delete(false);
		} else {
			const shapes = this._shapes;
			for (let i = 0, imax = shapes.length; i < imax; ++i) {
				shapes[i].selected = true;
			}
			UtilShapeDeleter.delete(this._parent, undefined, false);
			selection.update("TREE");
		}
		return true;
	}

	undo(): boolean {
		const shapes = this._shapes;
		const indices = this._indices;
		const parent = this._parent;
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			shapes[i].attach(parent, indices[i]);
		}
		const selection = this._selection;
		selection.lock();
		if (this._select) {
			selection.clearAndAddAll(shapes);
		}
		selection.update("TREE");
		selection.unlock();
		return true;
	}

	destroy(): void {
		const shapes = this._shapes;
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			shape.reference -= 1;
			if (shape.parent == null && shape.reference <= 0) {
				shape.destroy();
			}
		}
		shapes.length = 0;
	}
}
