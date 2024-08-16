import { DCommandBase, DDiagramCanvasEditor, DDiagramEditor } from "@wcardinal/wcardinal-ui";

export class ECommandDocumentLabel extends DCommandBase {
	protected _diagram: DDiagramEditor;
	protected _canvas: DDiagramCanvasEditor;
	protected _label: string;

	constructor(diagram: DDiagramEditor, canvas: DDiagramCanvasEditor, label: string) {
		super();
		this._diagram = diagram;
		this._canvas = canvas;
		this._label = label;
	}

	get diagram(): DDiagramEditor {
		return this._diagram;
	}

	get canvas(): DDiagramCanvasEditor {
		return this._canvas;
	}

	get label(): string {
		return this._label;
	}

	execute(): boolean {
		return this.redo();
	}

	redo(): boolean {
		const canvas = this._canvas;
		const label = this._label;
		this._label = canvas.label;
		canvas.label = label;
		this._diagram.emit("change", this._diagram);
		return true;
	}

	undo(): boolean {
		return this.redo();
	}
}
