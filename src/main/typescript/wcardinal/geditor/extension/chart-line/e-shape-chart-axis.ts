import {
	EShapeResourceManagerDeserialization,
	EShapeResourceManagerSerialization
} from "@wcardinal/wcardinal-ui";
import { EShapeChartAxisX } from "./e-shape-chart-axis-x";
import { EShapeChartAxisY } from "./e-shape-chart-axis-y";

export type EShapeChartAxisSerialized = [number, number];

export class EShapeChartAxis {
	x: EShapeChartAxisX;
	y: EShapeChartAxisY;

	constructor() {
		this.x = new EShapeChartAxisX();
		this.y = new EShapeChartAxisY();
	}

	copy(source: EShapeChartAxis): this {
		this.x.copy(source.x);
		this.y.copy(source.y);
		return this;
	}

	serialize(manager: EShapeResourceManagerSerialization): number {
		return manager.addResource(`[${this.x.serialize(manager)},${this.y.serialize(manager)}]`);
	}

	deserialize(target: number, manager: EShapeResourceManagerDeserialization): void {
		const resources = manager.resources;
		if (0 <= target && target < resources.length) {
			let parsed = manager.getExtension<EShapeChartAxisSerialized>(target);
			if (parsed == null) {
				parsed = JSON.parse(resources[target]) as EShapeChartAxisSerialized;
				manager.setExtension(target, parsed);
			}
			this.x.deserialize(parsed[0], manager);
			this.y.deserialize(parsed[1], manager);
		}
	}
}
