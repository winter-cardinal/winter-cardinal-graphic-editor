import { DBaseStateSetImpl, DCommandBase, DDiagramEditor } from "@wcardinal/wcardinal-ui";

export class ECommandDocumentBackground extends DCommandBase {
	protected _diagram: DDiagramEditor;
	protected _color: number | null | undefined;
	protected _alpha: number | undefined;

	constructor(diagram: DDiagramEditor, color: number, alpha: number) {
		super();
		this._diagram = diagram;
		this._color = color;
		this._alpha = alpha;
	}

	get diagram(): DDiagramEditor {
		return this._diagram;
	}

	get color(): number | null | undefined {
		return this._color;
	}

	get alpha(): number | undefined {
		return this._alpha;
	}

	execute(): boolean {
		return this.redo();
	}

	redo(): boolean {
		const canvas = this._diagram.canvas;
		if (canvas != null) {
			const background = canvas.background;
			const color = this._color;
			const alpha = this._alpha;
			const state = new DBaseStateSetImpl();
			this._color = background.getColor(state);
			this._alpha = background.getAlpha(state);
			background.color = color;
			background.alpha = alpha;
			this._diagram.emit("change", this._diagram);
		}
		return true;
	}

	undo(): boolean {
		return this.redo();
	}
}
