import {
	DBoard,
	DBoardOptions,
	DButtonAmbient,
	DControllers,
	DCornerMask,
	DDiagramCanvasEditor,
	DDiagramEditor,
	DDialogOpener,
	DInputText,
	DLayoutHorizontal,
	DThemeBoard
} from "@wcardinal/wcardinal-ui";
import { Texture } from "pixi.js";
import { ECommandDocumentName } from "../command/e-command-document-name";
import { EDialogCanvas } from "./e-dialog-canvas";
import { ECommandDocumentAll } from "../command/e-command-document-all";
import { UtilCanvas } from "../util/util-canvas";

interface EEditorCanvasOptions extends DBoardOptions<EThemeEditorCanvas> {
	icons: Record<string, Texture>;
	diagram: DDiagramEditor;
	canvas: UtilCanvas;
}

export interface EThemeEditorCanvas extends DThemeBoard {
	getLabel(): string | undefined;

	getDefaultName(): string;
	getDefaultLabel(): string;
	getDefaultWidth(): number;
	getDefaultHeight(): number;
	getDefaultCategory(): string | null;
	getDefaultSummary(): string;
	getDefaultDescription(): string;
	getDefaultBackgroundColor(): number;
	getDefaultBackgroundAlpha(): number;

	getInputNameLabel(): string | undefined;
	getInputLabelLabel(): string | undefined;
	getInputWidthLabel(): string | undefined;
	getInputHeightLabel(): string | undefined;
	getSelectCategoryLabel(): string | undefined;
	getInputBackgroundLabel(): string | undefined;
	getInputSummaryLabel(): string | undefined;
	getInputDescriptionLabel(): string | undefined;

	toCategoryId(category: unknown): string;
	toCategoryLabel(category: unknown): string;
	isCategoryWritable(): boolean;
}

const toOptions = (options: EEditorCanvasOptions): EEditorCanvasOptions => {
	options.width ??= 200;
	options.height ??= 30;
	options.padding ??= 0;
	options.corner ??= { mask: "BOTTOM" };
	options.shadow ??= "WEAK";
	return options;
};

export class EEditorCanvas extends DBoard<EThemeEditorCanvas, EEditorCanvasOptions> {
	protected _icons: Record<string, Texture>;
	protected _diagram: DDiagramEditor;
	protected _canvas: UtilCanvas;

	protected _inputName?: DInputText;
	protected _buttonEditor?: DButtonAmbient;
	protected _dialogEditor?: Promise<EDialogCanvas>;

	constructor(options: EEditorCanvasOptions) {
		super(toOptions(options));
		this._icons = options.icons;
		const diagram = options.diagram;
		this._diagram = diagram;
		diagram.on("change", () => {
			const canvas = diagram.canvas;
			if (canvas != null) {
				this.inputName.value = canvas.name;
			}
		});
		diagram.on("set", (canvas: DDiagramCanvasEditor) => {
			this.inputName.value = canvas.name;
			this.show();
		});
		diagram.on("unset", (canvas: DDiagramCanvasEditor) => {
			this.hide();
		});

		this._canvas = options.canvas;

		this.addChild(
			new DLayoutHorizontal({
				x: "padding",
				y: "padding",
				width: "padding",
				height: "padding",
				margin: 0,
				children: [this.inputName, this.buttonEditor]
			})
		);

		this.hide();
	}

	get inputName(): DInputText {
		let result = this._inputName;
		if (result == null) {
			result = this.newInputName();
			this._inputName = result;
		}
		return result;
	}

	protected newInputName(): DInputText {
		return new DInputText({
			weight: 1,
			background: {
				color: null
			},
			border: {
				color: null
			},
			corner: {
				mask: DCornerMask.ALL & ~DCornerMask.TOP_LEFT
			},
			on: {
				change: (value: string): void => {
					this.onInputNameChange(value);
				}
			}
		});
	}

	protected onInputNameChange(value: string): void {
		const diagram = this._diagram;
		const canvas = diagram.canvas;
		if (canvas != null && canvas.name !== value) {
			DControllers.getCommandController().push(
				new ECommandDocumentName(diagram, canvas, value)
			);
		}
	}

	get buttonEditor(): DButtonAmbient {
		let result = this._buttonEditor;
		if (result == null) {
			result = this.newButtonEditor();
			this._buttonEditor = result;
		}
		return result;
	}

	protected newButtonEditor(): DButtonAmbient {
		return new DButtonAmbient({
			width: 30,
			image: {
				source: this._icons.editor_canvas
			},
			on: {
				active: (emitter: DButtonAmbient) => {
					this.onButtonEditorActive(emitter);
				}
			}
		});
	}

	protected onButtonEditorActive(opener?: DDialogOpener): void {
		this.dialogEditor.then((dialogEditor) => {
			const diagram = this._diagram;
			dialogEditor
				.reset(diagram)
				.open(opener)
				.then((value) => {
					const canvas = diagram.canvas;
					if (canvas != null) {
						DControllers.getCommandController().push(
							new ECommandDocumentAll(
								diagram,
								canvas,
								value.name,
								value.label,
								value.width,
								value.height,
								value.category,
								value.summary,
								value.description,
								value.background.color,
								value.background.alpha
							)
						);
					}
				});
		});
	}

	get dialogEditor(): Promise<EDialogCanvas> {
		let result = this._dialogEditor;
		if (result == null) {
			result = this.newDialogEditor();
			this._dialogEditor = result;
		}
		return result;
	}

	protected newDialogEditor(): Promise<EDialogCanvas> {
		return this._canvas.get().then((canvas) => {
			return new EDialogCanvas({
				canvas
			});
		});
	}

	render(renderer: PIXI.Renderer): void {
		const diagram = this._diagram;
		const canvas = diagram.canvas;
		if (canvas != null) {
			const position = canvas.position;
			this.position.set(position.x, position.y - this.height);
			this.updateTransform();
		}
		super.render(renderer);
	}

	protected override getType(): string {
		return "EEditorCanvas";
	}
}
