import {
	EShapeResourceManagerDeserialization,
	EShapeResourceManagerSerialization
} from "@wcardinal/wcardinal-ui";

export type EShapeChartTickMinorSerialized = number;

export class EShapeChartTickMinor {
	count: number;

	constructor(count: number) {
		this.count = count;
	}

	copy(source: EShapeChartTickMinor): this {
		this.count = source.count;
		return this;
	}

	serialize(manager: EShapeResourceManagerSerialization): number {
		return manager.addResource(`${this.count}`);
	}

	deserialize(target: number, manager: EShapeResourceManagerDeserialization): void {
		const resources = manager.resources;
		if (0 <= target && target < resources.length) {
			let parsed = manager.getExtension<EShapeChartTickMinorSerialized>(target);
			if (parsed == null) {
				parsed = JSON.parse(resources[target]) as EShapeChartTickMinorSerialized;
				manager.setExtension(target, parsed);
			}
			this.count = parsed;
		}
	}
}
