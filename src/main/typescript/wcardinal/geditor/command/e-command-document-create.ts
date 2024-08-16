import { DCommandCreate, DDiagramCanvasEditor, DDiagramEditor } from "@wcardinal/wcardinal-ui";

export class ECommandDocumentCreate extends DCommandCreate {
	protected _diagram: DDiagramEditor;
	protected _canvas: DDiagramCanvasEditor;

	constructor(diagram: DDiagramEditor, canvas: DDiagramCanvasEditor) {
		super();
		this._diagram = diagram;
		this._canvas = canvas;
	}

	get diagram(): DDiagramEditor {
		return this._diagram;
	}

	get canvas(): DDiagramCanvasEditor {
		return this._canvas;
	}

	execute(): boolean {
		return true;
	}
}
