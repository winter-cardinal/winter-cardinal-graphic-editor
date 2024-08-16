import {
	DCommandBase,
	EShape,
	EShapeCapabilities,
	EShapeCapability,
	EShapeConnectorLine,
	EShapeConnectors,
	EShapeContainer,
	EShapeGroup,
	EShapeLockPart,
	EShapeResourceManagerDeserializationMode
} from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection, EToolSelectSelectionStored } from "../tool/e-tool-select-selection";
import { UtilShapeDeleter } from "../util/util-shape-deleter";
import { UtilShapeSearch } from "../util/util-shape-search";

export class ECommandShapeGroup extends DCommandBase {
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
		this._before = selection.store();
		selection.lock();

		// Unselect shapes that do not have the grouping capability
		const shapes = selection.get();
		for (let i = shapes.length - 1; 0 <= i; --i) {
			const shape = shapes[i];
			if (!EShapeCapabilities.contains(shape, EShapeCapability.GROUPING)) {
				shape.selected = false;
				shapes.splice(i, 1);
			}
		}

		// Delete selected shapes
		const parent = this._parent;
		const deletedSet = new Set<EShape>();
		const deleteds = UtilShapeDeleter.delete(parent, shapes, true, deletedSet) || [];
		this._deleteds = deleteds;
		for (let i = 0, imax = deleteds.length; i < imax; ++i) {
			deleteds[i].reference += 1;
		}

		// Create a new group
		const modifier = selection.modifier;
		const x = modifier.position.x + modifier.width * 0.5;
		const y = modifier.position.y + modifier.height * 0.5;
		const w = modifier.width;
		const h = modifier.height;
		const group = new EShapeGroup(EShapeResourceManagerDeserializationMode.EDITOR);
		group.transform.position.set(x, y);
		group.size.set(w, h);
		group.attach(parent);
		const groupChildren = group.children;
		for (let i = 0, imax = deleteds.length; i < imax; ++i) {
			const clone = deleteds[i].clone();
			clone.lock(EShapeLockPart.ALL);
			const clonePosition = clone.transform.position;
			clonePosition.set(clonePosition.x - x, clonePosition.y - y);
			if (clone instanceof EShapeConnectorLine) {
				const edge = clone.edge;
				const tail = edge.tail;
				const tailAcceptor = tail.acceptor;
				const tailAcceptorShape = tailAcceptor.shape;
				const tailLocal = tail.local;
				if (tailAcceptorShape == null) {
					tailLocal.set(tailLocal.x - x, tailLocal.y - y);
				} else if (!deletedSet.has(tailAcceptorShape)) {
					tailAcceptor.shape = null;
					tailLocal.set(tailLocal.x - x, tailLocal.y - y);
				}
				const head = edge.head;
				const headAcceptor = head.acceptor;
				const headAcceptorShape = headAcceptor.shape;
				const headLocal = head.local;
				if (headAcceptorShape == null) {
					headLocal.set(headLocal.x - x, headLocal.y - y);
				} else if (!deletedSet.has(headAcceptorShape)) {
					headAcceptor.shape = null;
					headLocal.set(headLocal.x - x, headLocal.y - y);
				}
			}
			clone.parent = group;
			groupChildren.push(clone);
		}
		EShapeConnectors.moveAll(deleteds, groupChildren, deleteds, groupChildren);
		for (let i = 0, imax = groupChildren.length; i < imax; ++i) {
			groupChildren[i].unlock(EShapeLockPart.ALL, true);
		}
		group.onChildTransformChange();
		group.toDirty();
		group.onAttach();
		group.reference += 1;
		this._createds = [group];
		deletedSet.clear();

		// Indices
		this._indices = UtilShapeSearch.toIndices(deleteds);

		// Select a group
		selection.clearAndAddAll(this._createds);
		selection.update("TREE");
		selection.unlock();
		return true;
	}

	redo(): boolean {
		// Delete shapes
		const selection = this._selection;
		selection.lock();
		selection.clearAndAddAll(this._deleteds);
		selection.delete(false);

		// Add a group and select it
		const parent = this._parent;
		const createds = this._createds;
		for (let i = 0, imax = createds.length; i < imax; ++i) {
			createds[i].attach(parent);
		}

		// Select created shapes
		selection.update("TREE");
		selection.unlock();
		return true;
	}

	undo(): boolean {
		// Delete a group
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
