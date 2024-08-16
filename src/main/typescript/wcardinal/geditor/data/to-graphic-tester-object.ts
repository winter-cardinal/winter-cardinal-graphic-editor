import { UtilCsv } from "../util/util-csv";
import { GraphicTesterObject } from "./graphic-tester-object";

export function toGraphicTesterObject(data: string): Map<number, GraphicTesterObject> {
	const rows = UtilCsv.parse(data);
	const result: Map<number, GraphicTesterObject> = new Map<number, GraphicTesterObject>();
	for (let i = 0, imax = rows.length; i < imax; ++i) {
		const row = rows[i];
		const uuid = parseInt(row[0], 10);
		if (uuid === uuid) {
			const original = row[1] || "";
			const value = row[2] || "";
			if (0 < original.length && 0 < value.length) {
				let object = result.get(uuid);
				if (object == null) {
					object = {};
					result.set(uuid, object);
				}
				object[original] = value;
			}
		}
	}
	return result;
}
