import {
	EShapeResourceManagerDeserialization,
	EShapeResourceManagerSerialization
} from "@wcardinal/wcardinal-ui";

export type EShapeChartTickMajorSerialized = number;

export class EShapeChartTickMajor {
	count: number;

	constructor(count: number) {
		this.count = count;
	}

	copy(source: EShapeChartTickMajor): this {
		this.count = source.count;
		return this;
	}

	serialize(manager: EShapeResourceManagerSerialization): number {
		return manager.addResource(`${this.count}`);
	}

	deserialize(target: number, manager: EShapeResourceManagerDeserialization): void {
		const resources = manager.resources;
		if (0 <= target && target < resources.length) {
			let parsed = manager.getExtension<EShapeChartTickMajorSerialized>(target);
			if (parsed == null) {
				parsed = JSON.parse(resources[target]) as EShapeChartTickMajorSerialized;
				manager.setExtension(target, parsed);
			}
			this.count = parsed;
		}
	}
}
