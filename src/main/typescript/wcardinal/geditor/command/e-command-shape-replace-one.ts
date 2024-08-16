import { DCommandBase, EShape, EShapeContainer } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";

export class ECommandShapeReplaceOne extends DCommandBase {
	protected _parent: EShapeContainer | EShape;
	protected _oldShape: EShape;
	protected _newShape: EShape;
	protected _index: number;
	protected _selection: EToolSelectSelection;

	constructor(
		newShape: EShape,
		oldShape: EShape,
		parent: EShapeContainer | EShape,
		selection: EToolSelectSelection
	) {
		super();
		this._parent = parent;
		this._newShape = newShape;
		this._oldShape = oldShape;
		this._selection = selection;
		this._index = parent.children.indexOf(oldShape);

		newShape.reference += 1;
		oldShape.reference += 1;
	}

	get parent(): EShapeContainer | EShape {
		return this._parent;
	}

	get oldShape(): EShape {
		return this._oldShape;
	}

	get newShape(): EShape {
		return this._newShape;
	}

	get index(): number {
		return this._index;
	}

	get selection(): EToolSelectSelection {
		return this._selection;
	}

	execute(): boolean {
		this._oldShape.detach();
		this._newShape.attach(this._parent, this._index);
		this._selection.swapLast(this._oldShape, this._newShape);
		return true;
	}

	redo(): boolean {
		this._newShape.attach(this._parent, this._index);
		this._oldShape.detach();
		this._selection.swapLast(this._oldShape, this._newShape);
		return true;
	}

	undo(): boolean {
		this._newShape.detach();
		this._oldShape.attach(this._parent, this._index);
		this._selection.swapLast(this._newShape, this._oldShape);
		return true;
	}

	destroy(): void {
		// Destroy new shapes
		const newShape = this._newShape;
		newShape.reference -= 1;
		if (newShape.parent == null && newShape.reference <= 0) {
			newShape.destroy();
		}

		// Destroy old shapes
		const oldShape = this._oldShape;
		oldShape.reference -= 1;
		if (oldShape.parent == null && oldShape.reference <= 0) {
			oldShape.destroy();
		}
	}
}
