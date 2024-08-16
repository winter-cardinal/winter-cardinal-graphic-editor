import {
	EShapeResourceManagerDeserialization,
	EShapeResourceManagerSerialization
} from "@wcardinal/wcardinal-ui";
import { EShapeTableRowParent } from "./e-shape-table-row-parent";
import { EShapeTableRowSelection } from "./e-shape-table-row-selection";

export class EShapeTableRow {
	protected _height: number;
	protected _isCellUpdateAllowed: boolean;
	protected _isCellUpdateCalled: boolean;
	protected _onChange: () => void;

	selection: EShapeTableRowSelection;

	constructor(parent: EShapeTableRowParent, onChange: () => void) {
		this._height = 40;
		this._onChange = onChange;
		this._isCellUpdateAllowed = true;
		this._isCellUpdateCalled = false;

		this.selection = new EShapeTableRowSelection(parent);
	}

	toDirty(): void {
		this.updateCells();
	}

	disallowCellUpdate(): void {
		this._isCellUpdateAllowed = false;
		this._isCellUpdateCalled = false;
	}

	allowCellUpdate(invoke: boolean): void {
		this._isCellUpdateAllowed = true;
		const isCellUpdatedCalled = this._isCellUpdateCalled;
		if (invoke && isCellUpdatedCalled) {
			this.updateCells();
		}
	}

	updateCells(): void {
		if (this._isCellUpdateAllowed) {
			this._onChange();
		} else {
			this._isCellUpdateCalled = true;
		}
	}

	get height(): number {
		return this._height;
	}

	set height(height: number) {
		height = Math.max(5, height);
		if (this._height !== height) {
			this._height = height;
			this.updateCells();
		}
	}

	copy(source: EShapeTableRow): this {
		this.disallowCellUpdate();
		this._height = source._height;
		this.allowCellUpdate(false);
		this.updateCells();
		return this;
	}

	serialize(manager: EShapeResourceManagerSerialization): number {
		const selectionId = this.selection.serialize(manager);
		return manager.addResource(`[${this._height},${selectionId}]`);
	}

	deserialize(target: number, manager: EShapeResourceManagerDeserialization): void {
		const resources = manager.resources;
		if (0 <= target && target < resources.length) {
			let parsed = manager.getExtension<number[]>(target);
			if (parsed == null) {
				parsed = JSON.parse(resources[target]) as number[];
				manager.setExtension(target, parsed);
			}

			let isChanged = false;
			const height = parsed[0];
			if (this._height !== height) {
				this._height = height;
				isChanged = true;
			}
			this.selection.deserialize(parsed[1], manager);
			if (isChanged) {
				this._onChange();
			}
		}
	}
}
