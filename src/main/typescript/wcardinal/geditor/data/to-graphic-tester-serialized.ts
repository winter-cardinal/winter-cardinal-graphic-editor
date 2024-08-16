import { GraphicTester } from "./graphic-tester";
import { GraphicTesterObject } from "./graphic-tester-object";
import { GraphicTesterSimple } from "./graphic-tester-simple";

export function toGraphicTesterSerialized(simple: GraphicTesterSimple): GraphicTester {
	const parsed: [number[], GraphicTesterObject[]] = JSON.parse(simple.mappings);
	const uuids = parsed[0];
	const objects = parsed[1];
	const mappings = new Map<number, GraphicTesterObject>();
	for (let i = 0, imax = Math.min(uuids.length, objects.length); i < imax; ++i) {
		mappings.set(uuids[i], objects[i]);
	}
	return {
		id: simple.id,
		graphicId: simple.graphicId,
		name: simple.name,
		mappings
	};
}
