import { GraphicTester } from "./graphic-tester";
import { GraphicTesterObject } from "./graphic-tester-object";
import { GraphicTesterSimple } from "./graphic-tester-simple";

export function toGraphicTesterSimple(serialized: GraphicTester): GraphicTesterSimple {
	const mappings = serialized.mappings;
	const uuids: number[] = [];
	const objects: GraphicTesterObject[] = [];
	mappings.forEach((object, key) => {
		uuids.push(key);
		objects.push(object);
	});
	return {
		id: serialized.id,
		graphicId: serialized.graphicId,
		name: serialized.name,
		mappings: JSON.stringify([uuids, objects])
	};
}
