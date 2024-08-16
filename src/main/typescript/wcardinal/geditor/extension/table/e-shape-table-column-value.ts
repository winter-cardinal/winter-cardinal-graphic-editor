import {
	EShapeResourceManagerDeserialization,
	EShapeResourceManagerSerialization,
	EShapeTextAlignHorizontal
} from "@wcardinal/wcardinal-ui";
import { EShapeTableColumnValueBody } from "./e-shape-table-column-value-body";
import { EShapeTableColumnValueHeader } from "./e-shape-table-column-value-header";
import { EShapeTableColumnValueRuntime } from "./e-shape-table-column-value-runtime";

export const EShapeTableColumnValueType = {
	TEXT: 0,
	NUMBER: 1
} as const;

export type EShapeTableColumnValueType =
	(typeof EShapeTableColumnValueType)[keyof typeof EShapeTableColumnValueType];

export type EShapeTableColumnValueSerialized = [
	number,
	EShapeTableColumnValueType,
	number,
	number,
	number,
	EShapeTextAlignHorizontal,
	number,
	number,
	number
];

export class EShapeTableColumnValue {
	weight: number;
	type: EShapeTableColumnValueType;
	getter: string;
	setter: string;
	format: string;
	align: EShapeTextAlignHorizontal;
	header: EShapeTableColumnValueHeader;
	body: EShapeTableColumnValueBody;

	runtime?: EShapeTableColumnValueRuntime;

	constructor(
		weight: number,
		type: EShapeTableColumnValueType,
		getter: string,
		setter: string,
		format: string,
		align: EShapeTextAlignHorizontal,
		header: EShapeTableColumnValueHeader,
		body: EShapeTableColumnValueBody
	) {
		this.weight = weight;
		this.type = type;
		this.getter = getter;
		this.setter = setter;
		this.format = format;
		this.align = align;
		this.header = header;
		this.body = body;
	}

	isEquals(target: EShapeTableColumnValue): boolean {
		return (
			this.weight === target.weight &&
			this.type === target.type &&
			this.getter === target.getter &&
			this.setter === target.setter &&
			this.format === target.format &&
			this.align === target.align &&
			this.header.isEquals(target.header) &&
			this.body.isEquals(target.body)
		);
	}

	toLabel(): string {
		return this.header.label;
	}

	serialize(manager: EShapeResourceManagerSerialization): number {
		const getterId = manager.addResource(this.getter);
		const setterId = manager.addResource(this.setter);
		const formatterId = manager.addResource(this.format);
		const headerId = this.header.serialize(manager);
		const bodyId = this.body.serialize(manager);
		return manager.addResource(
			`[${this.weight},${this.type},${getterId},${setterId},` +
				`${formatterId},${this.align},-1,${headerId},${bodyId}]`
		);
	}

	static deserialize(
		target: number,
		manager: EShapeResourceManagerDeserialization
	): EShapeTableColumnValue | null {
		const resources = manager.resources;
		if (0 <= target && target < resources.length) {
			let parsed = manager.getExtension<EShapeTableColumnValueSerialized>(target);
			if (parsed == null) {
				parsed = JSON.parse(resources[target]) as EShapeTableColumnValueSerialized;
				manager.setExtension(target, parsed);
			}

			return new EShapeTableColumnValue(
				parsed[0],
				parsed[1],
				resources[parsed[2]],
				resources[parsed[3]],
				resources[parsed[4]],
				parsed[5],
				EShapeTableColumnValueHeader.deserialize(parsed[7], manager),
				EShapeTableColumnValueBody.deserialize(parsed[8], manager)
			);
		}
		return null;
	}
}
