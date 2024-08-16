import {
	DCommandBase,
	EShape,
	EShapeCapabilities,
	EShapeCapability,
	EShapeConnectorLine,
	EShapeConnectors,
	EShapeContainer,
	EShapeGroup,
	EShapeLockPart
} from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection, EToolSelectSelectionStored } from "../tool/e-tool-select-selection";
import { UtilShapeTransforms } from "../util/util-shape-transforms";
import { UtilShapeDeleter } from "../util/util-shape-deleter";
import { UtilShapeSearch } from "../util/util-shape-search";

export class ECommandShapeUngroup extends DCommandBase {
	protected _parent: EShape | EShapeContainer;
	protected _selection: EToolSelectSelection;
	protected _before: EToolSelectSelectionStored;
	protected _deleteds: EShape[];
	protected _indices: number[];
	protected _createds: EShape[];

	constructor(parent: EShape | EShapeContainer, selection: EToolSelectSelection) {
		super();
		this._parent = parent;
		this._selection = selection;
		this._before = [];
		this._deleteds = [];
		this._indices = [];
		this._createds = [];
	}

	get parent(): EShape | EShapeContainer {
		return this._parent;
	}

	get selection(): EToolSelectSelection {
		return this._selection;
	}

	get before(): EToolSelectSelectionStored {
		return this._before;
	}

	get deleteds(): EShape[] {
		return this._deleteds;
	}

	get indices(): number[] {
		return this._indices;
	}

	get createds(): EShape[] {
		return this._createds;
	}

	execute(): boolean {
		// Save the current selection
		const selection = this._selection;
		selection.lock();
		this._before = selection.store();

		// Unselect non-group shapes
		const shapes = selection.get();
		for (let i = shapes.length - 1; 0 <= i; --i) {
			const shape = shapes[i];
			if (!this.isUngroupable(shape)) {
				shape.selected = false;
				shapes.splice(i, 1);
			}
		}

		// Delete groups
		const parent = this._parent;
		const deleteds = UtilShapeDeleter.delete(parent, shapes, true) || [];
		this._deleteds = deleteds;
		for (let i = 0, imax = deleteds.length; i < imax; ++i) {
			deleteds[i].reference += 1;
		}

		// Create shapes
		const createds = [];
		for (let i = 0, imax = deleteds.length; i < imax; ++i) {
			const target = deleteds[i];
			const targetLocalTransform = target.transform.localTransform;
			const a = targetLocalTransform.a;
			const b = targetLocalTransform.b;
			const c = targetLocalTransform.c;
			const d = targetLocalTransform.d;
			const tx = targetLocalTransform.tx;
			const ty = targetLocalTransform.ty;
			const targetChildren = target.children;
			const clones: EShape[] = [];
			for (let j = 0, jmax = targetChildren.length; j < jmax; ++j) {
				const clone = targetChildren[j].clone();
				clone.lock(EShapeLockPart.ALL);
				clone.parent = null;
				clone.updateTransform();
				const localTransform = clone.transform.localTransform;
				localTransform.prepend(targetLocalTransform);
				let capability = EShapeCapability.NONE;
				if (EShapeCapabilities.contains(clone, EShapeCapability.POSITION)) {
					capability |= EShapeCapability.POSITION;
				}
				if (EShapeCapabilities.contains(clone, EShapeCapability.ROTATION)) {
					capability |= EShapeCapability.ROTATION;
				}
				if (EShapeCapabilities.contains(clone, EShapeCapability.SKEW)) {
					capability |= EShapeCapability.SKEW;
				}
				if (capability !== EShapeCapability.NONE) {
					UtilShapeTransforms.applyLocal(clone, localTransform, capability);
				}
				if (clone instanceof EShapeConnectorLine) {
					const edge = clone.edge;
					const tail = edge.tail;
					if (tail.acceptor.shape == null) {
						// Local
						const tailLocal = tail.local;
						const tailLocalX = tailLocal.x;
						const tailLocalY = tailLocal.y;
						tailLocal.set(
							a * tailLocalX + c * tailLocalY + tx,
							b * tailLocalX + d * tailLocalY + ty
						);

						// Normal
						const tailNormal = tail.normal;
						const tailNormalX = tailNormal.x;
						const tailNormalY = tailNormal.y;
						const ndx = a * tailNormalX + c * tailNormalY;
						const ndy = b * tailNormalX + d * tailNormalY;
						const nd = ndx * ndx + ndy * ndy;
						if (0.000001 < nd) {
							const f = Math.sqrt(1 / nd);
							tailNormal.set(ndx * f, ndy * f);
						}
					}
					const head = edge.head;
					if (head.acceptor.shape == null) {
						// Local
						const headLocal = head.local;
						const headLocalX = headLocal.x;
						const headLocalY = headLocal.y;
						headLocal.set(
							a * headLocalX + c * headLocalY + tx,
							b * headLocalX + d * headLocalY + ty
						);

						// Normal
						const headNormal = head.normal;
						const headNormalX = headNormal.x;
						const headNormalY = headNormal.y;
						const ndx = a * headNormalX + c * headNormalY;
						const ndy = b * headNormalX + d * headNormalY;
						const nd = ndx * ndx + ndy * ndy;
						if (0.000001 < nd) {
							const f = Math.sqrt(1 / nd);
							headNormal.set(ndx * f, ndy * f);
						}
					}
				}
				clones.push(clone);
			}
			EShapeConnectors.moveAll(targetChildren, clones, targetChildren, clones);
			for (let j = 0, jmax = clones.length; j < jmax; ++j) {
				const clone = clones[j];
				clone.unlock(EShapeLockPart.ALL, true);
				clone.attach(parent);
				clone.reference += 1;
				createds.push(clone);
			}
		}
		this._createds = createds;

		// Indices
		this._indices = UtilShapeSearch.toIndices(deleteds);

		// Select created shapes
		selection.clearAndAddAll(createds);
		selection.update("TREE");
		selection.unlock();
		return true;
	}

	protected isUngroupable(shape: EShape): boolean {
		return (
			shape instanceof EShapeGroup &&
			EShapeCapabilities.contains(shape, EShapeCapability.CHILDREN) &&
			EShapeCapabilities.contains(shape, EShapeCapability.UNGROUPING)
		);
	}

	redo(): boolean {
		// Delete shapes
		const selection = this._selection;
		selection.lock();
		selection.clearAndAddAll(this._deleteds);
		selection.delete(false);

		// Add created shapes
		const parent = this._parent;
		const createds = this._createds;
		for (let i = 0, imax = createds.length; i < imax; ++i) {
			createds[i].attach(parent);
		}

		// Select created shapes
		selection.clearAndAddAll(createds);
		selection.update("TREE");
		selection.unlock();
		return true;
	}

	undo(): boolean {
		// Delete created shapes
		const parent = this._parent;
		const selection = this._selection;
		selection.lock();
		const createds = this._createds;
		for (let i = createds.length - 1; 0 <= i; --i) {
			createds[i].detach();
		}

		// Restore deleted shapes
		const deleteds = this._deleteds;
		const indices = this._indices;
		for (let i = 0, imax = deleteds.length; i < imax; ++i) {
			deleteds[i].attach(parent, indices[i]);
		}

		// Restore the selection
		this._selection.restore(this._before);
		selection.update("TREE");
		selection.unlock();
		return true;
	}

	destroy(): void {
		// Stored selection
		this._before.length = 0;

		// Deleted shapes
		const deleteds = this._deleteds;
		for (let i = 0, imax = deleteds.length; i < imax; ++i) {
			const deleted = deleteds[i];
			deleted.reference -= 1;
			if (deleted.parent == null && deleted.reference <= 0) {
				deleted.destroy();
			}
		}
		deleteds.length = 0;

		// Created shapes
		const createds = this._createds;
		for (let i = 0, imax = createds.length; i < imax; ++i) {
			const created = createds[i];
			created.reference -= 1;
			if (created.parent == null && created.reference <= 0) {
				created.destroy();
			}
		}
		createds.length = 0;
	}
}
