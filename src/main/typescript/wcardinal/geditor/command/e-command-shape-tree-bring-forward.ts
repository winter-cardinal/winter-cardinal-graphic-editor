import { DCommandBase, EShape, EShapeContainer } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";
import { EToolSelectSelectionUpdatedPart } from "../tool/e-tool-select-selection-updated-part";

export class ECommandShapeTreeBringForward extends DCommandBase {
	protected _indices: number[];
	protected _parent: EShape | EShapeContainer;
	protected _selection: EToolSelectSelection;

	/**
	 *
	 * @param indices indices of moved children sorted in the "descending" order
	 * @param parent
	 * @param selection
	 */
	constructor(
		indices: number[],
		parent: EShape | EShapeContainer,
		selection: EToolSelectSelection
	) {
		super();
		this._indices = indices;
		this._parent = parent;
		this._selection = selection;
	}

	get indices(): number[] {
		return this._indices;
	}

	get parent(): EShape | EShapeContainer {
		return this._parent;
	}

	get selection(): EToolSelectSelection {
		return this._selection;
	}

	execute(): boolean {
		return true;
	}

	redo(): boolean {
		const indices = this._indices;
		const parent = this._parent;
		const children = parent.children;
		for (let i = 0, imax = indices.length; i < imax; ++i) {
			const index = indices[i];
			const child = children[index];
			children[index] = children[index + 1];
			children[index + 1] = child;
		}
		parent.toDirty();
		this._selection.update(EToolSelectSelectionUpdatedPart.TREE);
		return true;
	}

	undo(): boolean {
		const indices = this._indices;
		const parent = this._parent;
		const children = parent.children;
		for (let i = indices.length - 1; 0 <= i; --i) {
			const index = indices[i];
			const child = children[index + 1];
			children[index + 1] = children[index];
			children[index] = child;
		}
		parent.toDirty();
		this._selection.update(EToolSelectSelectionUpdatedPart.TREE);
		return true;
	}

	destroy(): void {
		this._indices.length = 0;
	}
}
