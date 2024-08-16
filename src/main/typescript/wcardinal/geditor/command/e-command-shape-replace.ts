import {
	DCommandBase,
	EShape,
	EShapeCapabilities,
	EShapeCapability,
	EShapeContainer,
	EShapeGroup,
	EShapeLockPart
} from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";
import { EToolSelectSelectionUpdatedPart } from "../tool/e-tool-select-selection-updated-part";

export class ECommandShapeReplace extends DCommandBase {
	protected _parent: EShape | EShapeContainer;
	protected _factory: (shape: EShape) => EShape | null;
	protected _selection: EToolSelectSelection;

	protected _oldShapes: EShape[];
	protected _newShapes: EShape[];
	protected _indices: number[];

	constructor(
		parent: EShape | EShapeContainer,
		factory: (shape: EShape) => EShape | null,
		selection: EToolSelectSelection
	) {
		super();
		this._parent = parent;
		this._factory = factory;
		this._selection = selection;

		this._newShapes = [];
		this._oldShapes = [];
		this._indices = [];
	}

	get parent(): EShape | EShapeContainer {
		return this._parent;
	}

	get oldShapes(): EShape[] {
		return this._oldShapes;
	}

	get newShapes(): EShape[] {
		return this._newShapes;
	}

	get indices(): number[] {
		return this._indices;
	}

	get selection(): EToolSelectSelection {
		return this._selection;
	}

	execute(): boolean {
		const parent = this._parent;
		const indices = this._indices;
		const newShapes = this._newShapes;
		const oldShapes = this._oldShapes;
		const children = parent.children;
		const factory = this._factory;
		for (let i = 0, imax = children.length; i < imax; ++i) {
			const child = children[i];
			if (child.selected) {
				let newShape: EShape;
				if (EShapeCapabilities.contains(child, EShapeCapability.REPLACING)) {
					if (child instanceof EShapeGroup) {
						const pivot = child.transform.pivot;
						const pivotX = pivot.x;
						const pivotY = pivot.y;
						if (pivotX !== 0 || pivotY !== 0) {
							child.lock(EShapeLockPart.TRANSFORM);
							pivot.set(0, 0);
							newShape = factory(child) || child;
							pivot.set(pivotX, pivotY);
							child.unlock(EShapeLockPart.TRANSFORM, false);
						} else {
							newShape = factory(child) || child;
						}
					} else {
						newShape = factory(child) || child;
					}
					if (newShape !== child) {
						child.reference += 1;
						newShape.reference += 1;
						child.detach();
						newShape.attach(parent, i);
					}
				} else {
					newShape = child;
				}
				indices.push(i);
				newShapes.push(newShape);
				oldShapes.push(child);
			}
		}
		const selection = this._selection;
		selection.lock();
		selection.clearAndAddAll(newShapes);
		selection.update(
			EToolSelectSelectionUpdatedPart.TREE | EToolSelectSelectionUpdatedPart.SELECTION
		);
		selection.unlock();
		return true;
	}

	redo(): boolean {
		const parent = this._parent;
		const indices = this._indices;
		const oldShapes = this._oldShapes;
		const newShapes = this._newShapes;
		for (let i = 0, imax = newShapes.length; i < imax; ++i) {
			const oldShape = oldShapes[i];
			const newShape = newShapes[i];
			if (oldShape !== newShape) {
				oldShape.detach();
				newShape.attach(parent, indices[i]);
			}
		}
		const selection = this._selection;
		selection.lock();
		selection.clearAndAddAll(newShapes);
		selection.update(
			EToolSelectSelectionUpdatedPart.TREE | EToolSelectSelectionUpdatedPart.SELECTION
		);
		selection.unlock();
		return true;
	}

	undo(): boolean {
		const parent = this._parent;
		const indices = this._indices;
		const oldShapes = this._oldShapes;
		const newShapes = this._newShapes;
		for (let i = 0, imax = newShapes.length; i < imax; ++i) {
			const oldShape = oldShapes[i];
			const newShape = newShapes[i];
			if (oldShape !== newShape) {
				newShape.detach();
				oldShape.attach(parent, indices[i]);
			}
		}
		const selection = this._selection;
		selection.lock();
		selection.clearAndAddAll(oldShapes);
		selection.update(
			EToolSelectSelectionUpdatedPart.TREE | EToolSelectSelectionUpdatedPart.SELECTION
		);
		selection.unlock();
		return true;
	}

	destroy(): void {
		// Destroy Shapes
		const oldShapes = this._oldShapes;
		const newShapes = this._newShapes;
		for (let i = 0, imax = newShapes.length; i < imax; ++i) {
			const oldShape = oldShapes[i];
			const newShape = newShapes[i];
			if (oldShape !== newShape) {
				newShape.reference -= 1;
				if (newShape.parent == null && newShape.reference <= 0) {
					newShape.destroy();
				}
				oldShape.reference -= 1;
				if (oldShape.parent == null && oldShape.reference <= 0) {
					oldShape.destroy();
				}
			}
		}
		oldShapes.length = 0;
		newShapes.length = 0;
		this.indices.length = 0;
	}
}
