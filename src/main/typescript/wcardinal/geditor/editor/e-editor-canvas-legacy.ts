import {
	DButtonColor,
	DColorAndAlpha,
	DContentOptions,
	DControllers,
	DDiagramCanvasEditor,
	DDiagramEditor,
	DInputIntegerAndLabel,
	DInputLabel,
	DInputTextAndLabel,
	DInputTextArea,
	DLayoutHorizontal,
	DLayoutVertical,
	DMenu,
	DPane,
	DPaneOptions,
	DSelect,
	DText,
	DThemePane,
	isNumber
} from "@wcardinal/wcardinal-ui";
import { DisplayObject } from "pixi.js";
import { ECommandDocumentBackground } from "../command/e-command-document-background";
import { ECommandDocumentName } from "../command/e-command-document-name";
import { ECommandDocumentHeight } from "../command/e-command-document-height";
import { ECommandDocumentWidth } from "../command/e-command-document-width";
import { ECommandDocumentLabel } from "../command/e-command-document-label";
import { ECommandDocumentSummary } from "../command/e-command-document-summary";
import { ECommandDocumentDescription } from "../command/e-command-document-description";
import { ECommandDocumentCategory } from "../command/e-command-document-category";
import { UtilCanvas, UtilCanvasValue } from "../util/util-canvas";

export interface EEditorCanvasLegacyOptions extends DPaneOptions<EThemeEditorCanvasLegacy> {
	diagram: DDiagramEditor;
	canvas: UtilCanvas;
}

export interface EThemeEditorCanvasLegacy extends DThemePane {
	getLabel(): string | undefined;
	getInputNameLabel(): string | undefined;
	getInputLabelLabel(): string | undefined;
	getInputWidthLabel(): string | undefined;
	getInputHeightLabel(): string | undefined;
	getSelectCategoryLabel(): string | undefined;
	getInputBackgroundLabel(): string | undefined;
	getInputSummaryLabel(): string | undefined;
	getInputDescriptionLabel(): string | undefined;
}

export class EEditorCanvasLegacy extends DPane<
	EThemeEditorCanvasLegacy,
	DContentOptions,
	EEditorCanvasLegacyOptions
> {
	protected _diagram: DDiagramEditor;
	protected _canvas: UtilCanvas;

	constructor(options: EEditorCanvasLegacyOptions) {
		super(options);

		const diagram = options.diagram;
		this._diagram = diagram;
		this.state.isDisabled = diagram.canvas == null;
		diagram.on("unset", (): void => {
			this.state.isDisabled = true;
		});
		diagram.on("set", (): void => {
			this.state.isDisabled = false;
		});

		this._canvas = options.canvas;

		this.content.addChild(this.newLayout());
	}

	protected newLayout(): DLayoutVertical {
		return new DLayoutVertical({
			x: "padding",
			y: "padding",
			width: "padding",
			height: "auto",
			children: this.newLayoutItems()
		});
	}

	protected newLayoutItems(): Array<DisplayObject | null> {
		return [
			this.newTextLabel(),
			this.newLayoutName(),
			this.newLayoutLabel(),
			this.newLayoutWidth(),
			this.newLayoutHeight(),
			this.newLayoutCategory(),
			this.newLayoutSummary(),
			this.newLayoutDescription(),
			this.newLayoutBackground()
		];
	}

	protected newTextLabel(): DText<string> {
		return new DText<string>({
			width: "100%",
			text: {
				value: this.theme.getLabel()
			}
		});
	}

	protected newLayoutName(): DInputTextAndLabel {
		const diagram = this._diagram;
		const result = new DInputTextAndLabel({
			width: "100%",
			label: {
				text: {
					value: this.theme.getInputNameLabel()
				}
			},
			input: {
				weight: 1,
				on: {
					change: (value: string): void => {
						const canvas = diagram.canvas;
						if (canvas != null && canvas.name !== value) {
							DControllers.getCommandController().push(
								new ECommandDocumentName(diagram, canvas, value)
							);
						}
					}
				}
			}
		});
		const update = (): void => {
			const canvas = diagram.canvas;
			if (canvas != null) {
				result.input.value = canvas.name;
			}
		};
		update();
		diagram.on("change", update);
		diagram.on("set", (canvas: DDiagramCanvasEditor): void => {
			result.input.value = canvas.name;
		});
		return result;
	}

	protected newLayoutLabel(): DInputTextAndLabel {
		const diagram = this._diagram;
		const result = new DInputTextAndLabel({
			width: "100%",
			label: {
				text: {
					value: this.theme.getInputLabelLabel()
				}
			},
			input: {
				weight: 1,
				on: {
					change: (value: string): void => {
						const canvas = diagram.canvas;
						if (canvas != null && canvas.label !== value) {
							DControllers.getCommandController().push(
								new ECommandDocumentLabel(diagram, canvas, value)
							);
						}
					}
				}
			}
		});
		const update = (): void => {
			const canvas = diagram.canvas;
			if (canvas != null) {
				result.input.value = canvas.label;
			}
		};
		update();
		diagram.on("change", update);
		diagram.on("set", (canvas: DDiagramCanvasEditor): void => {
			result.input.value = canvas.label;
		});
		return result;
	}

	protected newLayoutWidth(): DInputIntegerAndLabel {
		const diagram = this._diagram;
		const result = new DInputIntegerAndLabel({
			width: "100%",
			label: {
				text: {
					value: this.theme.getInputWidthLabel()
				}
			},
			input: {
				weight: 1,
				min: 1,
				on: {
					change: (value: number): void => {
						const canvas = diagram.canvas;
						if (canvas != null && canvas.width !== value) {
							DControllers.getCommandController().push(
								new ECommandDocumentWidth(diagram, canvas, value)
							);
						}
					}
				}
			}
		});
		const update = (): void => {
			const canvas = diagram.canvas;
			if (canvas != null) {
				result.input.value = canvas.width;
			}
		};
		update();
		diagram.on("change", update);
		diagram.on("set", (canvas: DDiagramCanvasEditor): void => {
			result.input.value = canvas.width;
		});
		return result;
	}

	protected newLayoutHeight(): DInputIntegerAndLabel {
		const diagram = this._diagram;
		const result = new DInputIntegerAndLabel({
			width: "100%",
			label: {
				text: {
					value: this.theme.getInputHeightLabel()
				}
			},
			input: {
				weight: 1,
				min: 1,
				on: {
					change: (value: number): void => {
						const canvas = diagram.canvas;
						if (canvas != null && canvas.height !== value) {
							DControllers.getCommandController().push(
								new ECommandDocumentHeight(diagram, canvas, value)
							);
						}
					}
				}
			}
		});
		const update = (): void => {
			const canvas = diagram.canvas;
			if (canvas != null) {
				result.input.value = canvas.height;
			}
		};
		update();
		diagram.on("change", update);
		diagram.on("set", (canvas: DDiagramCanvasEditor): void => {
			result.input.value = canvas.height;
		});
		return result;
	}

	protected newLayoutBackground(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "padding",
			height: "auto",
			children: [this.newLabelBackground(), this.newInputBackground()]
		});
	}

	protected newLabelBackground(): DInputLabel<string> {
		return new DInputLabel<string>({
			width: 60,
			text: {
				value: this.theme.getInputBackgroundLabel()
			}
		});
	}

	protected newInputBackground(): DButtonColor {
		const diagram = this._diagram;
		const result = new DButtonColor({
			weight: 1,
			on: {
				change: (value: DColorAndAlpha): void => {
					DControllers.getCommandController().push(
						new ECommandDocumentBackground(diagram, value.color, value.alpha)
					);
				}
			}
		});
		result.dialog.on("open", (): void => {
			const dialog = result.dialog;
			const dialogNew = dialog.new;
			const dialogCurrent = dialog.current;
			dialogNew.color = dialogCurrent.color;
			dialogNew.alpha = dialogCurrent.alpha;
		});
		const update = (): void => {
			const value = result.value;
			const canvas = diagram.canvas;
			if (canvas != null) {
				const background = canvas.background;
				const backgroundColor = background.color;
				const backgroundAlpha = background.alpha;
				value.color = isNumber(backgroundColor) ? backgroundColor : 0xffffff;
				value.alpha = isNumber(backgroundAlpha) ? backgroundAlpha : 1;
			}
		};
		update();
		diagram.on("change", update);
		diagram.on("set", update);
		return result;
	}

	protected newLayoutCategory(): DLayoutHorizontal {
		const label = this.newLabelCategory();
		const select = this.newSelectCategory();
		const result = new DLayoutHorizontal({
			width: "padding",
			height: "auto",
			visible: false,
			children: [label, select]
		});
		this._canvas.get().then((canvas) => {
			this.onCanvasValueFetched(canvas, result, select);
		});
		return result;
	}

	protected onCanvasValueFetched(
		canvas: UtilCanvasValue,
		layout: DLayoutHorizontal,
		select: DSelect<string>
	): void {
		const category = canvas.category;
		const categoryDefault = category.default;
		const categoryItems = category.items;
		if (categoryDefault != null && 0 < categoryItems.length) {
			const items = [];
			for (let i = 0, imax = categoryItems.length; i < imax; ++i) {
				const categoryItem = categoryItems[i];
				items.push({
					value: categoryItem.id,
					text: {
						value: categoryItem.label
					}
				});
			}
			select.menu = new DMenu<string>({
				fit: true,
				items
			});
			select.value = categoryDefault;

			const diagram = this._diagram;
			const update = (): void => {
				const diagramCanvas = diagram.canvas;
				if (diagramCanvas != null) {
					select.value = diagramCanvas.category ?? canvas.category.default;
				}
			};
			update();
			diagram.on("change", update);
			diagram.on("set", (diagramCanvas: DDiagramCanvasEditor): void => {
				select.value = diagramCanvas.category ?? canvas.category.default;
			});

			layout.state.isEnabled = category.writable;
			layout.show();
		} else {
			select.value = null;
			layout.hide();
		}
	}

	protected newLabelCategory(): DInputLabel<string> {
		return new DInputLabel<string>({
			width: 60,
			text: {
				value: this.theme.getSelectCategoryLabel()
			}
		});
	}

	protected newSelectCategory(): DSelect<string> {
		return new DSelect<string>({
			weight: 1,
			on: {
				change: (value: string): void => {
					const diagram = this._diagram;
					const canvas = diagram.canvas;
					if (canvas != null && canvas.category !== value) {
						DControllers.getCommandController().push(
							new ECommandDocumentCategory(diagram, canvas, value)
						);
					}
				}
			}
		});
	}

	protected newLayoutSummary(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "padding",
			height: "auto",
			children: [this.newLabelSummary(), this.newInputSummary()]
		});
	}

	protected newLabelSummary(): DInputLabel<string> {
		return new DInputLabel<string>({
			width: 60,
			text: {
				value: this.theme.getInputSummaryLabel()
			}
		});
	}

	protected newInputSummary(): DInputTextArea {
		const diagram = this._diagram;
		const result = new DInputTextArea({
			weight: 1,
			height: 60,
			on: {
				change: (value: string): void => {
					const canvas = diagram.canvas;
					if (canvas != null && canvas.summary !== value) {
						DControllers.getCommandController().push(
							new ECommandDocumentSummary(diagram, canvas, value)
						);
					}
				}
			}
		});
		const update = (): void => {
			const canvas = diagram.canvas;
			if (canvas != null) {
				result.value = canvas.summary;
			}
		};
		update();
		diagram.on("change", update);
		diagram.on("set", (canvas: DDiagramCanvasEditor): void => {
			result.value = canvas.summary;
		});
		return result;
	}

	protected newLayoutDescription(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "padding",
			height: "auto",
			children: [this.newLabelDescription(), this.newInputDescription()]
		});
	}

	protected newLabelDescription(): DInputLabel<string> {
		return new DInputLabel<string>({
			width: 60,
			text: {
				value: this.theme.getInputDescriptionLabel()
			}
		});
	}

	protected newInputDescription(): DInputTextArea {
		const diagram = this._diagram;
		const result = new DInputTextArea({
			weight: 1,
			height: 100,
			on: {
				change: (value: string): void => {
					const canvas = diagram.canvas;
					if (canvas != null && canvas.description !== value) {
						DControllers.getCommandController().push(
							new ECommandDocumentDescription(diagram, canvas, value)
						);
					}
				}
			}
		});
		const update = (): void => {
			const canvas = diagram.canvas;
			if (canvas != null) {
				result.value = canvas.description;
			}
		};
		update();
		diagram.on("change", update);
		diagram.on("set", (canvas: DDiagramCanvasEditor): void => {
			result.value = canvas.description;
		});
		return result;
	}

	protected override getType(): string {
		return "EEditorCanvasLegacy";
	}
}
