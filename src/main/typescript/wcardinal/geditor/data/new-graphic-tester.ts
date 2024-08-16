import { DDiagramSerialized } from "@wcardinal/wcardinal-ui";
import { GraphicTester } from "./graphic-tester";
import { GraphicTesterObject } from "./graphic-tester-object";

export function newGraphicTester(name: string, graphic: DDiagramSerialized): GraphicTester {
	return {
		id: undefined,
		graphicId: graphic.id!,
		name,
		mappings: new Map<number, GraphicTesterObject>()
	};
}
