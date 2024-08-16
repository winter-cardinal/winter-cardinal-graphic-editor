import { DDiagramData, EShapeDataValueState } from "@wcardinal/wcardinal-ui";

export interface UtilDataValue {
	value?: unknown;
	state?: EShapeDataValueState;
	time?: number;
}

export interface UtilDataValuesParent {
	readonly data: DDiagramData;
	update(): void;
}

export class UtilDataValues {
	protected mappings: Record<string, UtilDataValue>;
	protected parent: UtilDataValuesParent;

	constructor(parent: UtilDataValuesParent) {
		this.parent = parent;
		this.mappings = {};
	}

	set(mappings: Record<string, UtilDataValue>): void {
		this.mappings = mappings;
		const parent = this.parent;
		const parentData = parent.data;
		for (const id in mappings) {
			const value = mappings[id];
			if (value) {
				parentData.set(id, value.value, value.time, value.state);
			}
		}
		parent.update();
	}

	retain(ids: string[]): void {
		const retained: Record<string, UtilDataValue> = {};
		const mapping = this.mappings;
		for (let i = 0, imax = ids.length; i < imax; ++i) {
			const id = ids[i];
			if (id in mapping) {
				retained[id] = mapping[id];
			}
		}
		this.set(retained);
	}
}
