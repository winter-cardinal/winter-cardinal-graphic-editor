import { DCommandBase, EShape, EShapeContainer } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";
import { EToolSelectSelectionUpdatedPart } from "../tool/e-tool-select-selection-updated-part";

interface Indexed {
	index: number;
}

const SHAPE_COMPARATOR = (a: Indexed, b: Indexed): number => {
	return a.index - b.index;
};

export class ECommandShapeTreeBringToFront extends DCommandBase {
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
		const children: Indexed[] = parent.children;

		const offset = children.length;
		for (let i = 0; i < offset; ++i) {
			children[i].index = i;
		}

		for (let i = 0, imax = indices.length; i < imax; ++i) {
			const index = indices[i];
			const child = children[index];
			child.index = offset + index;
		}

		children.sort(SHAPE_COMPARATOR);

		parent.toDirty();
		this._selection.update(EToolSelectSelectionUpdatedPart.TREE);
		return true;
	}

	undo(): boolean {
		const indices = this._indices;
		const parent = this._parent;
		const children: Indexed[] = parent.children;
		const offset = children.length;

		const indexSize = indices.length;
		for (let i = 0, imax = indexSize; i < imax; ++i) {
			const index = indices[i];
			const child = children[offset - 1 - i];
			child.index = index;
		}

		let indexIndex = indexSize - 1;
		let indexCurrent = indices[indexIndex];
		let indexOffset = 0;
		for (let i = 0, imax = offset - indexSize; i < imax; ++i) {
			const child = children[i];
			const index = i + indexOffset;
			if (index < indexCurrent) {
				child.index = index;
			} else {
				indexOffset += 1;
				indexIndex -= 1;
				if (0 <= indexIndex) {
					indexCurrent = indices[indexIndex];
				} else {
					indexCurrent = Number.MAX_SAFE_INTEGER;
				}
				i -= 1;
			}
		}

		children.sort(SHAPE_COMPARATOR);

		parent.toDirty();
		this._selection.update(EToolSelectSelectionUpdatedPart.TREE);
		return true;
	}

	destroy(): void {
		this._indices.length = 0;
	}
}
