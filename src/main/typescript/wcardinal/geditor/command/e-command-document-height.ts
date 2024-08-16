import { DCommandBase, DDiagramCanvasEditor, DDiagramEditor } from "@wcardinal/wcardinal-ui";

export class ECommandDocumentHeight extends DCommandBase {
	protected _diagram: DDiagramEditor;
	protected _canvas: DDiagramCanvasEditor;
	protected _height: number;

	constructor(diagram: DDiagramEditor, canvas: DDiagramCanvasEditor, height: number) {
		super();
		this._diagram = diagram;
		this._canvas = canvas;
		this._height = height;
	}

	get diagram(): DDiagramEditor {
		return this._diagram;
	}

	get canvas(): DDiagramCanvasEditor {
		return this._canvas;
	}

	get height(): number {
		return this._height;
	}

	execute(): boolean {
		return this.redo();
	}

	redo(): boolean {
		const canvas = this._canvas;
		const height = this._height;
		this._height = canvas.height;
		canvas.y = canvas.y + (canvas.height - height) * 0.5;
		canvas.height = height;
		this._diagram.emit("change", this._diagram);
		return true;
	}

	undo(): boolean {
		return this.redo();
	}
}
