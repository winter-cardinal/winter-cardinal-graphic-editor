import {
	EShapeResourceManagerDeserialization,
	EShapeResourceManagerSerialization
} from "@wcardinal/wcardinal-ui";
import { EShapeTableColumnValue } from "./e-shape-table-column-value";

export class EShapeTableColumn {
	values: EShapeTableColumnValue[];
	protected _sizeX: number;
	protected _onChange: () => void;

	constructor(onChange: () => void) {
		this.values = [];
		this._sizeX = 1;
		this._onChange = onChange;
	}

	add(value: EShapeTableColumnValue, at?: number): void {
		if (at != null) {
			this.values.splice(at, 0, value);
		} else {
			this.values.push(value);
		}
		this._onChange();
	}

	remove(index: number): EShapeTableColumnValue | null {
		const values = this.values;
		if (0 <= index && index < values.length) {
			const result = values.splice(index, 1)[0];
			this._onChange();
			return result;
		}
		return null;
	}

	indexOf(target: EShapeTableColumnValue): number {
		const values = this.values;

		// Instance-based matching
		for (let i = 0, imax = values.length; i < imax; ++i) {
			const value = values[i];
			if (value === target) {
				return i;
			}
		}

		// Data-based matching
		for (let i = 0, imax = values.length; i < imax; ++i) {
			const value = values[i];
			if (value.isEquals(target)) {
				return i;
			}
		}

		return -1;
	}

	get(index: number): EShapeTableColumnValue | null {
		const result = this.values[index];
		if (result != null) {
			return result;
		}
		return null;
	}

	set(index: number, value: EShapeTableColumnValue): void {
		this.values[index] = value;
		this._onChange();
	}

	swap(indexA: number, indexB: number): void {
		const values = this.values;
		const tmp = values[indexB];
		values[indexB] = values[indexA];
		values[indexA] = tmp;
		this._onChange();
	}

	size(): number {
		return this.values.length;
	}

	copy(source: EShapeTableColumn): this {
		// Values
		const values = this.values;
		const sourceValues = source.values;
		const sourceValuesLength = sourceValues.length;
		for (let i = 0; i < sourceValuesLength; ++i) {
			values.push(sourceValues[i]);
		}
		if (values.length !== sourceValuesLength) {
			values.length = sourceValuesLength;
		}

		//
		this._sizeX = source._sizeX;

		this._onChange();
		return this;
	}

	serialize(manager: EShapeResourceManagerSerialization): number {
		let serialized = "";
		let delimiter = "[";
		const values = this.values;
		for (let i = 0, imax = values.length; i < imax; ++i) {
			const value = values[i];
			serialized += delimiter + value.serialize(manager);
			delimiter = ",";
		}
		serialized += "]";
		return manager.addResource(serialized);
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
			const values = this.values;
			if (0 < values.length) {
				values.length = 0;
				isChanged = true;
			}
			for (let i = 0, imax = parsed.length; i < imax; ++i) {
				const value = EShapeTableColumnValue.deserialize(parsed[i], manager);
				if (value != null) {
					values.push(value);
				}
			}
			if (0 < values.length) {
				isChanged = true;
			}
			if (isChanged) {
				this._onChange();
			}
		}
	}
}
