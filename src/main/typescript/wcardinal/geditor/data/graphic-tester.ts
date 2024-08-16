import { GraphicTesterObject } from "./graphic-tester-object";

export interface GraphicTester {
	id?: number;
	graphicId: number;
	name: string;
	mappings: Map<number, GraphicTesterObject>;
}
