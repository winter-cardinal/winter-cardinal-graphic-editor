import {
	EShapeResourceManagerDeserialization,
	EShapeResourceManagerSerialization
} from "@wcardinal/wcardinal-ui";
import { EShapeChartTickMajor } from "./e-shape-chart-tick-major";
import { EShapeChartTickMinor } from "./e-shape-chart-tick-minor";

export type EShapeChartTickSerialized = [number, number];

export class EShapeChartTick {
	major: EShapeChartTickMajor;
	minor: EShapeChartTickMinor;

	constructor(major: EShapeChartTickMajor, minor: EShapeChartTickMinor) {
		this.major = major;
		this.minor = minor;
	}

	copy(source: EShapeChartTick): this {
		this.major.copy(source.major);
		this.minor.copy(source.minor);
		return this;
	}

	serialize(manager: EShapeResourceManagerSerialization): number {
		return manager.addResource(
			`[${this.major.serialize(manager)},${this.minor.serialize(manager)}]`
		);
	}

	deserialize(target: number, manager: EShapeResourceManagerDeserialization): void {
		const resources = manager.resources;
		if (0 <= target && target < resources.length) {
			let parsed = manager.getExtension<EShapeChartTickSerialized>(target);
			if (parsed == null) {
				parsed = JSON.parse(resources[target]) as EShapeChartTickSerialized;
				manager.setExtension(target, parsed);
			}
			this.major.deserialize(parsed[0], manager);
			this.minor.deserialize(parsed[1], manager);
		}
	}
}
