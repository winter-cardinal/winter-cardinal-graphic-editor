import {
	EShape,
	EShapeResourceManagerDeserialization,
	EShapeResourceManagerSerialization
} from "@wcardinal/wcardinal-ui";
import { EShapeTableIds } from "./e-shape-table-ids";
import { EShapeTableRowParent } from "./e-shape-table-row-parent";
import { UtilShapeSearch } from "../../util/util-shape-search";

export const EShapeTableRowSelectionType = {
	NONE: 0,
	SINGLE: 1,
	MULTIPLE: 2
} as const;

export type EShapeTableRowSelectionType =
	(typeof EShapeTableRowSelectionType)[keyof typeof EShapeTableRowSelectionType];

export class EShapeTableRowSelection {
	parent: EShapeTableRowParent;
	type: EShapeTableRowSelectionType;
	indices: number[];
	protected _values?: unknown[];
	body: EShape | null;

	constructor(parent: EShapeTableRowParent) {
		this.parent = parent;
		this.type = EShapeTableRowSelectionType.NONE;
		this.indices = [];
		this.body = null;
	}

	get values(): unknown[] {
		const indices = this.indices;
		const values = this.parent.data.values;
		const result: unknown[] = (this._values = this._values || []);
		if (values != null) {
			result.length = 0;
			for (let i = 0, imax = indices.length; i < imax; ++i) {
				const index = indices[i];
				if (0 <= index && index < values.length) {
					result.push(values[index]);
				}
			}
		}
		return result;
	}

	size(): number {
		return this.indices.length;
	}

	isEmpty(): boolean {
		return this.indices.length <= 0;
	}

	toggle(index: number): void {
		const indices = this.indices;
		const indexIndex = indices.indexOf(index);
		if (indexIndex < 0) {
			indices.push(index);
			const body = this.getBody();
			if (body != null) {
				this.setRowActive(body, index, true);
			}
		} else {
			indices.splice(indexIndex, 1);
			const body = this.getBody();
			if (body != null) {
				this.setRowActive(body, index, false);
			}
		}
	}

	add(index: number): void {
		const indices = this.indices;
		const indexIndex = indices.indexOf(index);
		if (indexIndex < 0) {
			indices.push(index);
			const body = this.getBody();
			if (body != null) {
				this.setRowActive(body, index, true);
			}
		}
	}

	addTo(index: number): void {
		const indices = this.indices;
		const lastIndex = indices[indices.length - 1];
		if (lastIndex < index) {
			const body = this.getBody();
			for (let i = lastIndex + 1; i <= index; ++i) {
				if (indices.indexOf(i) < 0) {
					indices.push(i);
					if (body != null) {
						this.setRowActive(body, i, true);
					}
				}
			}
		} else if (index < lastIndex) {
			const body = this.getBody();
			for (let i = lastIndex - 1; index <= i; --i) {
				if (indices.indexOf(i) < 0) {
					indices.push(i);
					if (body != null) {
						this.setRowActive(body, i, true);
					}
				}
			}
		}
	}

	remove(index: number): void {
		const indices = this.indices;
		const indexIndex = indices.indexOf(index);
		if (0 <= indexIndex) {
			indices.splice(indexIndex, 1);
			const body = this.getBody();
			if (body != null) {
				this.setRowActive(body, index, false);
			}
		}
	}

	clear(): void {
		const indices = this.indices;
		const body = this.getBody();
		if (body != null) {
			for (let i = 0, imax = indices.length; i < imax; ++i) {
				this.setRowActive(body, indices[i], false);
			}
		}
		indices.length = 0;
	}

	clearAndAdd(index: number): void {
		const indices = this.indices;
		const body = this.getBody();
		if (body != null) {
			for (let i = 0, imax = indices.length; i < imax; ++i) {
				const target = indices[i];
				if (target !== index) {
					this.setRowActive(body, target, false);
				}
			}
			this.setRowActive(body, index, true);
		}
		indices.length = 0;
		indices.push(index);
	}

	protected getBody(): EShape | null {
		const body = this.body;
		if (body != null) {
			return body;
		}
		return (this.body = UtilShapeSearch.findChildByType(this.parent, EShapeTableIds.BODY_ID));
	}

	protected getRow(body: EShape, index: number): EShape | null {
		const rows = body.children;
		if (0 <= index && index < rows.length) {
			return rows[index];
		}
		return null;
	}

	protected setRowActive(body: EShape, index: number, isActive: boolean): void {
		const row = this.getRow(body, index);
		if (row != null) {
			const cells = row.children;
			for (let i = 0, imax = cells.length; i < imax; ++i) {
				cells[i].state.isActive = isActive;
			}
		}
	}

	serialize(manager: EShapeResourceManagerSerialization): number {
		return manager.addResource(`[${this.type}]`);
	}

	deserialize(target: number, manager: EShapeResourceManagerDeserialization): void {
		const resources = manager.resources;
		if (0 <= target && target < resources.length) {
			let parsed = manager.getExtension<[EShapeTableRowSelectionType]>(target);
			if (parsed == null) {
				parsed = JSON.parse(resources[target]) as [EShapeTableRowSelectionType];
				manager.setExtension(target, parsed);
			}

			const type = parsed[0];
			if (this.type !== type) {
				this.type = type;
			}
		}
	}
}
