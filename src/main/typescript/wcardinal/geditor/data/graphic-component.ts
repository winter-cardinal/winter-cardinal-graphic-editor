import { DDiagramEditorController, DDialogSelectController } from "@wcardinal/wcardinal-ui";
import { Graphic } from "./graphic";
import { GraphicName } from "./graphic-name";
import { GraphicPieceComponent } from "./graphic-piece-component";

export interface GraphicComponent
	extends DDiagramEditorController,
		DDialogSelectController<GraphicName, string> {
	piece: GraphicPieceComponent;
	search(word: string, categoryId?: string | null): Promise<GraphicName[]>;
	getByName(name: string): Promise<Graphic>;
}
