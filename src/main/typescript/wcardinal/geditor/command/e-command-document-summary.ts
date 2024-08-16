import { DCommandBase, DDiagramCanvasEditor, DDiagramEditor } from "@wcardinal/wcardinal-ui";

export class ECommandDocumentSummary extends DCommandBase {
	protected _diagram: DDiagramEditor;
	protected _canvas: DDiagramCanvasEditor;
	protected _summary: string;

	constructor(diagram: DDiagramEditor, canvas: DDiagramCanvasEditor, summary: string) {
		super();
		this._diagram = diagram;
		this._canvas = canvas;
		this._summary = summary;
	}

	get diagram(): DDiagramEditor {
		return this._diagram;
	}

	get canvas(): DDiagramCanvasEditor {
		return this._canvas;
	}

	get summary(): string {
		return this._summary;
	}

	execute(): boolean {
		return this.redo();
	}

	redo(): boolean {
		const canvas = this._canvas;
		const summary = this._summary;
		this._summary = canvas.summary;
		canvas.summary = summary;
		this._diagram.emit("change", this._diagram);
		return true;
	}

	undo(): boolean {
		return this.redo();
	}
}
