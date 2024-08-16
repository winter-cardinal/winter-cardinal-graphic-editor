import { DCommandBase, DDiagramCanvasEditor, DDiagramEditor } from "@wcardinal/wcardinal-ui";

export class ECommandDocumentWidth extends DCommandBase {
	protected _diagram: DDiagramEditor;
	protected _canvas: DDiagramCanvasEditor;
	protected _width: number;

	constructor(diagram: DDiagramEditor, canvas: DDiagramCanvasEditor, width: number) {
		super();
		this._diagram = diagram;
		this._canvas = canvas;
		this._width = width;
	}

	get diagram(): DDiagramEditor {
		return this._diagram;
	}

	get canvas(): DDiagramCanvasEditor {
		return this._canvas;
	}

	get width(): number {
		return this._width;
	}

	execute(): boolean {
		return this.redo();
	}

	redo(): boolean {
		const canvas = this._canvas;
		const width = this._width;
		this._width = canvas.width;
		canvas.x = canvas.x + (canvas.width - width) * 0.5;
		canvas.width = width;
		this._diagram.emit("change", this._diagram);
		return true;
	}

	undo(): boolean {
		return this.redo();
	}
}
