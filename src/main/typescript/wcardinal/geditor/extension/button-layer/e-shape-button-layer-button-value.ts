import {
	EShapeActionValueShowHideLayer,
	EShapeResourceManagerDeserialization,
	EShapeResourceManagerSerialization
} from "@wcardinal/wcardinal-ui";

export type EShapeButtonLayerButtonValueSerialized = [number, number, number, number];

export class EShapeButtonLayerButtonValue {
	readonly label: string;
	readonly weight: number;
	readonly layers: number[];
	readonly bringToFront: boolean;
	readonly isGrouped: boolean;
	readonly isActive: boolean;
	readonly action: EShapeActionValueShowHideLayer;

	constructor(
		label: string,
		weight: number,
		layers: number[],
		bringToFront: boolean,
		isGrouped: boolean,
		isActive: boolean
	) {
		this.label = label;
		this.weight = weight;
		this.layers = layers;
		this.bringToFront = bringToFront;
		this.isGrouped = isGrouped;
		this.isActive = isActive;
		this.action = new EShapeActionValueShowHideLayer("isActive", layers, bringToFront);
	}

	isEquals(target: EShapeButtonLayerButtonValue): boolean {
		if (this.label !== target.label) {
			return false;
		}
		if (this.weight !== target.weight) {
			return false;
		}
		if (this.bringToFront !== target.bringToFront) {
			return false;
		}
		if (this.isGrouped !== target.isGrouped) {
			return false;
		}
		if (this.isActive !== target.isActive) {
			return false;
		}
		const layers = this.layers;
		const layersLength = layers.length;
		const targetLayers = target.layers;
		if (layersLength !== targetLayers.length) {
			return false;
		}
		for (let i = 0; i < layersLength; ++i) {
			if (layers[i] !== targetLayers[i]) {
				return false;
			}
		}
		return true;
	}

	serizlize(manager: EShapeResourceManagerSerialization): number {
		const layersId = this.serializedLayers(manager);
		const bringToFront = this.bringToFront ? 1 : 0;
		const isGrouped = this.isGrouped ? 2 : 0;
		const isActive = this.isActive ? 4 : 0;
		const type = bringToFront | isGrouped | isActive;
		return manager.addResource(
			`[${manager.addResource(this.label)},${this.weight},${layersId},${type}]`
		);
	}

	serializedLayers(manager: EShapeResourceManagerSerialization): number {
		const layers = this.layers;
		let serialized: string = "[";
		let delimiter = "";
		for (let i = 0, imax = layers.length; i < imax; ++i) {
			serialized += delimiter + layers[i];
			delimiter = ",";
		}
		serialized += "]";
		return manager.addResource(serialized);
	}

	static deserialize(
		target: number,
		manager: EShapeResourceManagerDeserialization
	): EShapeButtonLayerButtonValue | null {
		const resources = manager.resources;
		if (0 <= target && target < resources.length) {
			let parsed = manager.getExtension<EShapeButtonLayerButtonValueSerialized>(target);
			if (parsed == null) {
				parsed = JSON.parse(resources[target]) as EShapeButtonLayerButtonValueSerialized;
				manager.setExtension(target, parsed);
			}
			return new EShapeButtonLayerButtonValue(
				resources[parsed[0]],
				parsed[1],
				this.deserializeLayers(parsed[2], manager),
				!!(parsed[3] & 0x1),
				!!(parsed[3] & 0x2),
				!!(parsed[3] & 0x4)
			);
		}
		return null;
	}

	static deserializeLayers(
		target: number,
		manager: EShapeResourceManagerDeserialization
	): number[] {
		const result: number[] = [];
		const resources = manager.resources;
		const resourcesLength = resources.length;
		if (0 <= target && target < resourcesLength) {
			let parsed = manager.getExtension<number[]>(target);
			if (parsed == null) {
				parsed = JSON.parse(resources[target]) as number[];
				manager.setExtension(target, parsed);
			}
			for (let i = 0, imax = parsed.length; i < imax; ++i) {
				result.push(parsed[i]);
			}
		}
		return result;
	}
}
