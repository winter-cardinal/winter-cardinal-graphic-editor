import {
	EShapeResourceManagerDeserialization,
	EShapeResourceManagerSerialization
} from "@wcardinal/wcardinal-ui";

export type EShapeTableColumnValueHeaderSerialized = [number];

export class EShapeTableColumnValueHeader {
	readonly label: string;

	constructor(label: string) {
		this.label = label;
	}

	isEquals(target: EShapeTableColumnValueHeader): boolean {
		return this.label === target.label;
	}

	serialize(manager: EShapeResourceManagerSerialization): number {
		const labelId = manager.addResource(this.label);
		return manager.addResource(`[${labelId}]`);
	}

	static deserialize(
		target: number,
		manager: EShapeResourceManagerDeserialization
	): EShapeTableColumnValueHeader {
		const resources = manager.resources;
		if (0 <= target && target < resources.length) {
			let parsed = manager.getExtension<EShapeTableColumnValueHeaderSerialized>(target);
			if (parsed == null) {
				parsed = JSON.parse(resources[target]) as EShapeTableColumnValueHeaderSerialized;
				manager.setExtension(target, parsed);
			}

			return new EShapeTableColumnValueHeader(resources[parsed[0]]);
		}
		return new EShapeTableColumnValueHeader("");
	}
}
