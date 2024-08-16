import {
	EShapeResourceManagerDeserialization,
	EShapeResourceManagerSerialization
} from "@wcardinal/wcardinal-ui";

export class EShapeTableColumnValueBody {
	isEquals(target: EShapeTableColumnValueBody): boolean {
		return true;
	}

	serialize(manager: EShapeResourceManagerSerialization): number {
		return -1;
	}

	static deserialize(
		target: number,
		manager: EShapeResourceManagerDeserialization
	): EShapeTableColumnValueBody {
		return new EShapeTableColumnValueBody();
	}
}
