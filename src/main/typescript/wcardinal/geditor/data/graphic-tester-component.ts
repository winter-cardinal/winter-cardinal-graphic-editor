import { GraphicTesterName } from "./graphic-tester-name";
import { GraphicTesterSimple } from "./graphic-tester-simple";

export interface GraphicTesterComponent {
	search(graphicName: string, word: string): Promise<GraphicTesterName[]>;
	get(id: number): Promise<GraphicTesterSimple>;
	save(simple: GraphicTesterSimple): Promise<number>;
	delete(id: number): Promise<void>;
}
