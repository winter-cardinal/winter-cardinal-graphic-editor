import {
	EShapeResourceManagerDeserialization,
	EShapeResourceManagerSerialization
} from "@wcardinal/wcardinal-ui";
import { EShapeButtonLayerButtonValue } from "./e-shape-button-layer-button-value";

export class EShapeButtonLayerButtonValueContainer {
	protected _values: EShapeButtonLayerButtonValue[];
	protected _sizeX: number;
	protected _margin: number;
	protected _onChange: () => void;

	constructor(onChange: () => void) {
		this._values = [];
		this._sizeX = 1;
		this._margin = 2;
		this._onChange = onChange;
	}

	get values(): EShapeButtonLayerButtonValue[] {
		return this._values;
	}

	get margin(): number {
		return this._margin;
	}

	set margin(margin: number) {
		if (this._margin !== margin) {
			this._margin = margin;
			this._onChange();
		}
	}

	add(value: EShapeButtonLayerButtonValue, at?: number): void {
		if (at != null) {
			this._values.splice(at, 0, value);
		} else {
			this._values.push(value);
		}
		this._onChange();
	}

	remove(index: number): EShapeButtonLayerButtonValue | null {
		const values = this._values;
		if (0 <= index && index < values.length) {
			const result = values.splice(index, 1)[0];
			this._onChange();
			return result;
		}
		return null;
	}

	indexOf(target: EShapeButtonLayerButtonValue): number {
		const values = this._values;

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

	get(index: number): EShapeButtonLayerButtonValue | null {
		const result = this._values[index];
		if (result != null) {
			return result;
		}
		return null;
	}

	set(index: number, value: EShapeButtonLayerButtonValue): void {
		this._values[index] = value;
		this._onChange();
	}

	swap(indexA: number, indexB: number): void {
		const values = this._values;
		const tmp = values[indexB];
		values[indexB] = values[indexA];
		values[indexA] = tmp;
		this._onChange();
	}

	size(): number {
		return this._values.length;
	}

	copy(source: EShapeButtonLayerButtonValueContainer): this {
		// Values
		const values = this._values;
		const sourceValues = source._values;
		const sourceValuesLength = sourceValues.length;
		for (let i = 0; i < sourceValuesLength; ++i) {
			values[i] = sourceValues[i];
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
		const values = this._values;
		for (let i = 0, imax = values.length; i < imax; ++i) {
			serialized += delimiter + values[i].serizlize(manager);
			delimiter = ",";
		}
		serialized += delimiter + this._margin + "]";
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
			const values = this._values;
			if (0 < values.length) {
				values.length = 0;
				isChanged = true;
			}
			for (let i = 0, imax = parsed.length - 1; i < imax; ++i) {
				const value = EShapeButtonLayerButtonValue.deserialize(parsed[i], manager);
				if (value != null) {
					values.push(value);
				}
			}
			const margin = parsed[parsed.length - 1];
			if (this._margin !== margin) {
				this._margin = margin;
				isChanged = true;
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
