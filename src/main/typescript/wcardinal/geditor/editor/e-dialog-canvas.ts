import {
	DButtonColor,
	DColorAndAlpha,
	DDiagramEditor,
	DDialogLayered,
	DDialogLayeredOptions,
	DInputIntegerAndLabel,
	DInputLabel,
	DInputTextAndLabel,
	DInputTextArea,
	DLayoutHorizontal,
	DLayoutSpace,
	DMenu,
	DSelect,
	DThemeDialogLayered,
	isNumber
} from "@wcardinal/wcardinal-ui";
import { DisplayObject } from "pixi.js";
import { UtilCanvasValue } from "../util/util-canvas";

export interface EDialogCanvasValue {
	name: string;
	label: string;
	width: number;
	height: number;
	category: string | null;
	summary: string;
	description: string;
	background: DColorAndAlpha;
}

export interface EThemeDialogCanvas extends DThemeDialogLayered {
	getInputNameLabel(): string | undefined;
	getInputLabelLabel(): string | undefined;
	getInputWidthLabel(): string | undefined;
	getInputHeightLabel(): string | undefined;
	getSelectCategoryLabel(): string | undefined;
	getInputSummaryLabel(): string | undefined;
	getInputDescriptionLabel(): string | undefined;
	getInputBackgroundLabel(): string | undefined;
}

export interface EDialogCanvasOptions
	extends DDialogLayeredOptions<EDialogCanvasValue, EThemeDialogCanvas> {
	canvas: UtilCanvasValue;
}

export class EDialogCanvas extends DDialogLayered<
	EDialogCanvasValue,
	EThemeDialogCanvas,
	EDialogCanvasOptions
> {
	protected _layoutName?: DInputTextAndLabel;
	protected _layoutLabel?: DInputTextAndLabel;
	protected _layoutWidth?: DInputIntegerAndLabel;
	protected _layoutHeight?: DInputIntegerAndLabel;
	protected _layoutCategory?: DLayoutHorizontal;
	protected _selectCategory?: DSelect<string>;
	protected _isCategoryFetched?: boolean;
	protected _layoutSummary?: DLayoutHorizontal;
	protected _inputSummary?: DInputTextArea;
	protected _layoutDescription?: DLayoutHorizontal;
	protected _inputDescription?: DInputTextArea;
	protected _layoutBackground?: DLayoutHorizontal;
	protected _inputBackground?: DButtonColor;

	protected _canvas: UtilCanvasValue;

	constructor(options: EDialogCanvasOptions) {
		super(options);

		const canvas = options.canvas;
		this._canvas = options.canvas;
		this.onDefaultChange(canvas);
	}

	protected onDefaultChange(def: UtilCanvasValue): void {
		const category = def.category;
		const categoryDefault = category.default;
		const categoryItems = category.items;
		const layout = this.layoutCategory;
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
			const selectCategory = this.selectCategory;
			selectCategory.menu = new DMenu<string>({
				fit: true,
				items
			});
			selectCategory.value = category.default;
			layout.state.isEnabled = category.writable;
			layout.show();
		} else {
			layout.hide();
		}
	}

	protected override newContentChildren(
		theme: EThemeDialogCanvas,
		options?: EDialogCanvasOptions
	): Array<DisplayObject | null> {
		const result = super.newContentChildren(theme, options);
		result.push(
			this.layoutName,
			this.layoutLabel,
			this.layoutWidth,
			this.layoutHeight,
			this.layoutCategory,
			this.layoutSummary,
			this.layoutDescription,
			this.layoutBackground
		);
		return result;
	}

	protected get layoutName(): DInputTextAndLabel {
		let result = this._layoutName;
		if (result == null) {
			result = this.newLayoutName();
			this._layoutName = result;
		}
		return result;
	}

	protected newLayoutName(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			label: {
				text: {
					value: this.theme.getInputNameLabel()
				}
			},
			input: {
				weight: 1,
				on: {
					enter: (): void => {
						this.ok();
					}
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected get layoutLabel(): DInputTextAndLabel {
		let result = this._layoutLabel;
		if (result == null) {
			result = this.newLayoutLabel();
			this._layoutLabel = result;
		}
		return result;
	}

	protected newLayoutLabel(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			label: {
				text: {
					value: this.theme.getInputLabelLabel()
				}
			},
			input: {
				weight: 1,
				on: {
					enter: (): void => {
						this.ok();
					}
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected get layoutWidth(): DInputIntegerAndLabel {
		let result = this._layoutWidth;
		if (result == null) {
			result = this.newLayoutWidth();
			this._layoutWidth = result;
		}
		return result;
	}

	protected newLayoutWidth(): DInputIntegerAndLabel {
		return new DInputIntegerAndLabel({
			width: "padding",
			label: {
				text: {
					value: this.theme.getInputWidthLabel()
				}
			},
			input: {
				weight: 1,
				min: 1,
				on: {
					enter: (): void => {
						this.ok();
					}
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected get layoutHeight(): DInputIntegerAndLabel {
		let result = this._layoutHeight;
		if (result == null) {
			result = this.newLayoutHeight();
			this._layoutHeight = result;
		}
		return result;
	}

	protected newLayoutHeight(): DInputIntegerAndLabel {
		return new DInputIntegerAndLabel({
			width: "padding",
			label: {
				text: {
					value: this.theme.getInputHeightLabel()
				}
			},
			input: {
				weight: 1,
				min: 1,
				on: {
					enter: (): void => {
						this.ok();
					}
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected get layoutCategory(): DLayoutHorizontal {
		let result = this._layoutCategory;
		if (result == null) {
			result = this.newLayoutCategory();
			this._layoutCategory = result;
		}
		return result;
	}

	protected newLayoutCategory(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "padding",
			visible: false,
			children: [
				new DInputLabel<string>({
					text: {
						value: this.theme.getSelectCategoryLabel()
					}
				}),
				this.selectCategory,
				new DLayoutSpace({
					width: 60
				})
			]
		});
	}

	protected get selectCategory(): DSelect<string> {
		let result = this._selectCategory;
		if (result == null) {
			result = this.newSelectCategory();
			this._selectCategory = result;
		}
		return result;
	}

	protected newSelectCategory(): DSelect<string> {
		return new DSelect<string>({
			weight: 1
		});
	}

	protected get layoutSummary(): DLayoutHorizontal {
		let result = this._layoutSummary;
		if (result == null) {
			result = this.newLayoutSummary();
			this._layoutSummary = result;
		}
		return result;
	}

	protected newLayoutSummary(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "padding",
			height: "auto",
			children: [
				this.newLabelSummary(),
				this.inputSummary,
				new DLayoutSpace({
					width: 60
				})
			]
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

	protected get inputSummary(): DInputTextArea {
		let result = this._inputSummary;
		if (result == null) {
			result = this.newInputSummary();
			this._inputSummary = result;
		}
		return result;
	}

	protected newInputSummary(): DInputTextArea {
		return new DInputTextArea({
			weight: 1,
			height: 60
		});
	}

	protected get layoutDescription(): DLayoutHorizontal {
		let result = this._layoutDescription;
		if (result == null) {
			result = this.newLayoutDescription();
			this._layoutDescription = result;
		}
		return result;
	}

	protected newLayoutDescription(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "padding",
			height: "auto",
			children: [
				this.newLabelDescription(),
				this.inputDescription,
				new DLayoutSpace({
					width: 60
				})
			]
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

	protected get inputDescription(): DInputTextArea {
		let result = this._inputDescription;
		if (result == null) {
			result = this.newInputDescription();
			this._inputDescription = result;
		}
		return result;
	}

	protected newInputDescription(): DInputTextArea {
		return new DInputTextArea({
			weight: 1,
			height: 100
		});
	}

	protected get layoutBackground(): DLayoutHorizontal {
		let result = this._layoutBackground;
		if (result == null) {
			result = this.newLayoutBackground();
			this._layoutBackground = result;
		}
		return result;
	}

	protected newLayoutBackground(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "padding",
			height: "auto",
			children: [
				this.newLabelBackground(),
				this.inputBackground,
				new DLayoutSpace({
					width: 60
				})
			]
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

	protected get inputBackground(): DButtonColor {
		let result = this._inputBackground;
		if (result == null) {
			result = this.newInputBackground();
			this._inputBackground = result;
		}
		return result;
	}

	protected newInputBackground(): DButtonColor {
		const result = new DButtonColor({
			weight: 1
		});
		result.dialog.on("open", (): void => {
			const dialog = result.dialog;
			const dialogNew = dialog.new;
			const dialogCurrent = dialog.current;
			dialogNew.color = dialogCurrent.color;
			dialogNew.alpha = dialogCurrent.alpha;
		});
		return result;
	}

	reset(diagram?: DDiagramEditor): this {
		const diagramCanvas = diagram?.canvas;
		if (diagramCanvas != null) {
			const background = diagramCanvas.background;
			const backgroundColor = background.color;
			const backgroundAlpha = background.alpha;
			this.value = {
				name: diagramCanvas.name,
				label: diagramCanvas.label,
				width: diagramCanvas.width,
				height: diagramCanvas.height,
				category: diagramCanvas.category,
				summary: diagramCanvas.summary,
				description: diagramCanvas.description,
				background: {
					color: isNumber(backgroundColor) ? backgroundColor : 0xffffff,
					alpha: isNumber(backgroundAlpha) ? backgroundAlpha : 1
				}
			};
		} else {
			const canvas = this._canvas;
			this.value = {
				name: canvas.name,
				label: canvas.label,
				width: canvas.width,
				height: canvas.height,
				category: canvas.category.default,
				summary: canvas.summary,
				description: canvas.description,
				background: {
					color: canvas.background.color,
					alpha: canvas.background.alpha
				}
			};
		}
		return this;
	}

	get value(): EDialogCanvasValue {
		return {
			name: this.layoutName.input.value,
			label: this.layoutLabel.input.value,
			width: this.layoutWidth.input.value,
			height: this.layoutHeight.input.value,
			category: this.selectCategory.value,
			summary: this.inputSummary.value,
			description: this.inputDescription.value,
			background: this.inputBackground.value
		};
	}

	set value(value: EDialogCanvasValue) {
		this.layoutName.input.value = value.name;
		this.layoutLabel.input.value = value.label;
		this.layoutWidth.input.value = value.width;
		this.layoutHeight.input.value = value.height;
		this.selectCategory.value = value.category ?? this._canvas.category.default ?? null;
		this.inputSummary.value = value.summary;
		this.inputDescription.value = value.description;
		this.inputBackground.value.color = value.background.color;
		this.inputBackground.value.alpha = value.background.alpha;
	}

	protected getResolvedValue(): EDialogCanvasValue {
		return this.value;
	}

	protected getType(): string {
		return "EDialogCanvas";
	}
}
