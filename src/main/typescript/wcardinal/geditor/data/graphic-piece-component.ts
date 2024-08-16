import { DDiagramSerialized, DDiagramSerializedSimple } from "@wcardinal/wcardinal-ui";
import { Graphic } from "./graphic";
import { GraphicName } from "./graphic-name";

export interface GraphicPieceComponent {
	search(word: string, categoryId?: string | null): Promise<GraphicName[]>;
	get(id: number): Promise<DDiagramSerializedSimple | DDiagramSerialized>;
	getByName(name: string): Promise<Graphic>;
	save(simple: DDiagramSerializedSimple): Promise<number>;
	delete(id: number): Promise<void>;
}
