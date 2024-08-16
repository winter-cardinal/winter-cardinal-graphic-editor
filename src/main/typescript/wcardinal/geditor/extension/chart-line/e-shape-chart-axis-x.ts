import {
	EShapeResourceManagerDeserialization,
	EShapeResourceManagerSerialization
} from "@wcardinal/wcardinal-ui";
import { EShapeChartTick } from "./e-shape-chart-tick";
import { EShapeChartTickMajor } from "./e-shape-chart-tick-major";
import { EShapeChartTickMinor } from "./e-shape-chart-tick-minor";

export type EShapeChartAxisXSerialized = [number, number];

export class EShapeChartAxisX {
	padding: number;
	tick: EShapeChartTick;

	constructor() {
		this.padding = 10;
		this.tick = new EShapeChartTick(new EShapeChartTickMajor(3), new EShapeChartTickMinor(3));
	}

	copy(source: EShapeChartAxisX): this {
		this.padding = source.padding;
		this.tick.copy(source.tick);
		return this;
	}

	serialize(manager: EShapeResourceManagerSerialization): number {
		return manager.addResource(`[${this.padding},${this.tick.serialize(manager)}]`);
	}

	deserialize(target: number, manager: EShapeResourceManagerDeserialization): void {
		const resources = manager.resources;
		if (0 <= target && target < resources.length) {
			let parsed = manager.getExtension<EShapeChartAxisXSerialized>(target);
			if (parsed == null) {
				parsed = JSON.parse(resources[target]) as EShapeChartAxisXSerialized;
				manager.setExtension(target, parsed);
			}
			this.padding = parsed[0];
			this.tick.deserialize(parsed[1], manager);
		}
	}
}
