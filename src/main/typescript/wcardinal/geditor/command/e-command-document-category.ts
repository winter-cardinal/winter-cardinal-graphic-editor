import { DCommandBase, DDiagramCanvasEditor, DDiagramEditor } from "@wcardinal/wcardinal-ui";

export class ECommandDocumentCategory extends DCommandBase {
	protected _diagram: DDiagramEditor;
	protected _canvas: DDiagramCanvasEditor;
	protected _category: string | null;

	constructor(diagram: DDiagramEditor, canvas: DDiagramCanvasEditor, category: string | null) {
		super();
		this._diagram = diagram;
		this._canvas = canvas;
		this._category = category;
	}

	get diagram(): DDiagramEditor {
		return this._diagram;
	}

	get canvas(): DDiagramCanvasEditor {
		return this._canvas;
	}

	get category(): string | null {
		return this._category;
	}

	execute(): boolean {
		return this.redo();
	}

	redo(): boolean {
		const canvas = this._canvas;
		const category = this._category;
		this._category = canvas.category;
		canvas.category = category;
		this._diagram.emit("change", this._diagram);
		return true;
	}

	undo(): boolean {
		return this.redo();
	}
}
