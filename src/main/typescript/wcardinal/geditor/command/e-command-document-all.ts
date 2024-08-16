import {
	DBaseStateSetImpl,
	DCommandBase,
	DDiagramCanvasEditor,
	DDiagramEditor
} from "@wcardinal/wcardinal-ui";

export class ECommandDocumentAll extends DCommandBase {
	protected _diagram: DDiagramEditor;
	protected _canvas: DDiagramCanvasEditor;
	protected _name: string;
	protected _label: string;
	protected _width: number;
	protected _height: number;
	protected _category: string | null;
	protected _summary: string;
	protected _description: string;
	protected _backgroundColor: number | null;
	protected _backgroundAlpha: number;

	constructor(
		diagram: DDiagramEditor,
		canvas: DDiagramCanvasEditor,
		name: string,
		label: string,
		width: number,
		height: number,
		category: string | null,
		summary: string,
		description: string,
		backgroundColor: number | null,
		backgroundAlpha: number
	) {
		super();
		this._diagram = diagram;
		this._canvas = canvas;
		this._name = name;
		this._label = label;
		this._width = width;
		this._height = height;
		this._category = category;
		this._summary = summary;
		this._description = description;
		this._backgroundColor = backgroundColor;
		this._backgroundAlpha = backgroundAlpha;
	}

	get diagram(): DDiagramEditor {
		return this._diagram;
	}

	get canvas(): DDiagramCanvasEditor {
		return this._canvas;
	}

	get name(): string {
		return this._name;
	}

	get label(): string {
		return this._label;
	}

	get width(): number {
		return this._width;
	}

	get height(): number {
		return this._height;
	}

	get category(): string | null {
		return this._category;
	}

	get summary(): string {
		return this._summary;
	}

	get description(): string {
		return this._description;
	}

	get backgroundColor(): number | null {
		return this._backgroundColor;
	}

	get backgroundAlpha(): number {
		return this._backgroundAlpha;
	}

	execute(): boolean {
		return this.redo();
	}

	redo(): boolean {
		const canvas = this._canvas;

		const name = this._name;
		this._name = canvas.name;
		canvas.name = name;

		const label = this._label;
		this._label = canvas.label;
		canvas.label = label;

		const width = this._width;
		this._width = canvas.width;
		canvas.width = width;

		const height = this._height;
		this._height = canvas.height;
		canvas.height = height;

		const category = this._category;
		this._category = canvas.category;
		canvas.category = category;

		const summary = this._summary;
		this._summary = canvas.summary;
		canvas.summary = summary;

		const description = this._description;
		this._description = canvas.description;
		canvas.description = description;

		const backgroundColor = this._backgroundColor;
		const backgroundAlpha = this._backgroundAlpha;
		const state = new DBaseStateSetImpl();
		const background = canvas.background;
		this._backgroundColor = background.getColor(state);
		this._backgroundAlpha = background.getAlpha(state);
		background.color = backgroundColor;
		background.alpha = backgroundAlpha;

		this._diagram.emit("change", this._diagram);
		return true;
	}

	undo(): boolean {
		return this.redo();
	}
}
