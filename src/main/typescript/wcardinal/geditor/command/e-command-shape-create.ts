import { DCommandBase, EShape, EShapeContainer } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection, EToolSelectSelectionStored } from "../tool/e-tool-select-selection";

export class ECommandShapeCreate extends DCommandBase {
	protected _parent: EShape | EShapeContainer;
	protected _shapes: EShape[];
	protected _selection: EToolSelectSelection;
	protected _selectionStored?: EToolSelectSelectionStored;
	protected _select: boolean;

	constructor(
		shapes: EShape[],
		parent: EShape | EShapeContainer,
		selection: EToolSelectSelection,
		select: boolean
	) {
		super();
		this._shapes = shapes;
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			shapes[i].reference += 1;
		}
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

	get selection(): EToolSelectSelection {
		return this._selection;
	}

	get selectionStored(): EToolSelectSelectionStored | undefined {
		return this._selectionStored;
	}

	get select(): boolean {
		return this._select;
	}

	execute(): boolean {
		const selection = this._selection;
		selection.lock();
		if (this._select) {
			this._selectionStored = selection.store();
			selection.clearAndAddAll(this._shapes);
		}
		selection.update("TREE");
		selection.unlock();
		return true;
	}

	redo(): boolean {
		const shapes = this._shapes;
		const parent = this._parent;
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			shapes[i].attach(parent);
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

	undo(): boolean {
		const shapes = this._shapes;
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			shapes[i].detach();
		}
		const selection = this._selection;
		const selectionStored = this._selectionStored;
		selection.lock();
		if (this._select && selectionStored != null) {
			selection.restore(selectionStored);
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
	}
}
