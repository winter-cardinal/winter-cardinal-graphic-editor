import {
	DButton,
	DButtonAmbient,
	DButtonCheckRight,
	DButtonColor,
	DColorAndAlpha,
	DContentOptions,
	DDropdown,
	DInputReal,
	DInputRealAndLabel,
	DInputTextArea,
	DLayoutHorizontal,
	DLayoutVertical,
	DMenuItemOptionsUnion,
	DPane,
	DPaneOptions,
	DText,
	DThemePane,
	EShape,
	EShapeTextAlignHorizontal,
	EShapeTextAlignVertical,
	EShapeTextDirection,
	EShapeTextStyle,
	EShapeTextWeight
} from "@wcardinal/wcardinal-ui";
import { Texture } from "pixi.js";
import { EEDITOR_BUTTON_COUNT } from "./e-editors";

export interface EEditorTextSelection {
	isEmpty(): boolean;
	last(): EShape | null;
	setText(text: string): void;
	setTextColor(color: number, alpha: number): void;
	setTextFamily(family: string): void;
	setTextSize(size: number): void;
	setTextSizeDelta(delta: number): void;
	setTextWeight(weight: EShapeTextWeight): void;
	setTextStyle(style: EShapeTextStyle): void;
	setTextAlignHorizontal(align: EShapeTextAlignHorizontal): void;
	setTextAlignVertical(align: EShapeTextAlignVertical): void;
	setTextPaddingHorizontal(padding: number): void;
	setTextPaddingVertical(padding: number): void;
	setTextOffsetHorizontal(offset: number): void;
	setTextOffsetVertical(offset: number): void;
	setTextOutlineColor(color: number, alpha: number): void;
	setTextOutlineWidth(width: number): void;
	setTextOutlineEnabled(enable: boolean): void;
	setTextClipping(clipping: boolean): void;
	setTextFitting(fitting: boolean): void;
	setTextSpacingHorizontal(spacing: number): void;
	setTextSpacingVertical(spacing: number): void;
	setTextDirection(direction: EShapeTextDirection): void;
	on(name: "change", handler: () => void): void;
}

export interface EEditorTextOptions extends DPaneOptions<EThemeEditorText> {
	selection: EEditorTextSelection;
	icons: Record<string, Texture>;
}

export interface EThemeEditorText extends DThemePane {
	getLabel(): string | undefined;
	getInputTextHeight(): number;
	getTextFontLabel(): string | undefined;
	getFontFamilies(): Map<string, string>;
	getButtonFontSizeIncreaseTitle(): string | undefined;
	getButtonFontSizeDecreaseTitle(): string | undefined;
	getButtonFontItalicTitle(): string | undefined;
	getButtonFontBoldTitle(): string | undefined;
	getButtonOutlineLabel(): string | undefined;
	getInputOutlineWidthLabel(): string | undefined;

	getTextAlignLabel(): string | undefined;
	getButtonAlignOutsideLeftTitle(): string | undefined;
	getButtonAlignLeftTitle(): string | undefined;
	getButtonAlignCenterTitle(): string | undefined;
	getButtonAlignRightTitle(): string | undefined;
	getButtonAlignOutsideRightTitle(): string | undefined;
	getButtonAlignOutsideTopTitle(): string | undefined;
	getButtonAlignTopTitle(): string | undefined;
	getButtonAlignMiddleTitle(): string | undefined;
	getButtonAlignBottomTitle(): string | undefined;
	getButtonAlignOutsideBottomTitle(): string | undefined;
	getButtonDirectionLeftToRightTitle(): string | undefined;
	getButtonDirectionTopToBottomTitle(): string | undefined;
	getButtonDirectionBottomToTopTitle(): string | undefined;
	getButtonDirectionRightToLeftTitle(): string | undefined;
	getButtonClippingLabel(): string | undefined;
	getButtonFittingLabel(): string | undefined;

	getTextSpacingLabel(): string | undefined;

	getTextPaddingLabel(): string | undefined;

	getTextOffsetLabel(): string | undefined;
}

export class EEditorText extends DPane<EThemeEditorText, DContentOptions, EEditorTextOptions> {
	protected _selection: EEditorTextSelection;
	protected _icons: Record<string, Texture>;

	protected _inputText?: DInputTextArea;
	protected _fontFamilies?: Map<string, string>;
	protected _dropdownFontFamily?: DDropdown<string>;
	protected _buttonFontColor?: DButtonColor;
	protected _inputFontSize?: DInputReal;
	protected _buttonFontSizeDecrease?: DButton<string>;
	protected _buttonFontSizeIncrease?: DButton<string>;
	protected _buttonFontItalic?: DButton<string>;
	protected _buttonFontBold?: DButton<string>;
	protected _buttonOutline?: DButtonCheckRight<string>;
	protected _buttonOutlineColor?: DButtonColor;
	protected _inputOutlineWidth?: DInputRealAndLabel;
	protected _buttonAlignOutsideLeft?: DButton<string>;
	protected _buttonAlignLeft?: DButton<string>;
	protected _buttonAlignCenter?: DButton<string>;
	protected _buttonAlignRight?: DButton<string>;
	protected _buttonAlignOutsideRight?: DButton<string>;
	protected _buttonAlignOutsideTop?: DButton<string>;
	protected _buttonAlignTop?: DButton<string>;
	protected _buttonAlignMiddle?: DButton<string>;
	protected _buttonAlignBottom?: DButton<string>;
	protected _buttonAlignOutsideBottom?: DButton<string>;
	protected _buttonDirectionLeftToRight?: DButton<string>;
	protected _buttonDirectionTopToBottom?: DButton<string>;
	protected _buttonDirectionBottomToTop?: DButton<string>;
	protected _buttonDirectionRightToLeft?: DButton<string>;
	protected _buttonClipping?: DButtonCheckRight<string>;
	protected _buttonFitting?: DButtonCheckRight<string>;
	protected _inputSpacingHorizontal?: DInputReal;
	protected _inputSpacingVertical?: DInputReal;
	protected _inputPaddingHorizontal?: DInputReal;
	protected _inputTextPaddingVertical?: DInputReal;
	protected _inputOffsetHorizontal?: DInputReal;
	protected _inputOffsetVertical?: DInputReal;

	protected _fromShapeTextRegEx = /\\+n|\n/g;
	protected _toShapeTextRegEx = /\\+n/g;

	constructor(options: EEditorTextOptions) {
		super(options);

		const selection = options.selection;
		this._selection = selection;
		const icons = options.icons;
		this._icons = icons;

		const theme = this.theme;
		new DLayoutVertical({
			parent: this.content,
			x: "padding",
			y: "padding",
			width: "padding",
			height: "auto",
			children: [
				this.newLabel(theme.getLabel()),
				this.inputText,
				this.newLabel(theme.getTextFontLabel()),
				this.dropdownFontFamily,
				this.buttonFontColor,
				new DLayoutHorizontal({
					width: "100%",
					height: "auto",
					children: [
						this.inputFontSize,
						this.buttonFontSizeDecrease,
						this.buttonFontSizeIncrease,
						this.buttonFontItalic,
						this.buttonFontBold
					]
				}),
				this.buttonOutline,
				this.buttonOutlineColor,
				this.inputOutlineWidth,
				this.newLabel(theme.getTextAlignLabel()),
				new DLayoutVertical({
					width: "100%",
					height: "auto",
					column: EEDITOR_BUTTON_COUNT,
					children: [
						this.buttonAlignOutsideLeft,
						this.buttonAlignLeft,
						this.buttonAlignCenter,
						this.buttonAlignRight,
						this.buttonAlignOutsideRight,
						this.buttonAlignOutsideTop,
						this.buttonAlignTop,
						this.buttonAlignMiddle,
						this.buttonAlignBottom,
						this.buttonAlignOutsideBottom,

						this.buttonDirectionLeftToRight,
						this.buttonDirectionTopToBottom,
						this.buttonDirectionBottomToTop,
						this.buttonDirectionRightToLeft
					]
				}),
				this.buttonClipping,
				this.buttonFitting,
				this.newLabel(theme.getTextSpacingLabel()),
				new DLayoutHorizontal({
					width: "100%",
					children: [this.inputSpacingHorizontal, this.inputSpacingVertical]
				}),
				this.newLabel(theme.getTextPaddingLabel()),
				new DLayoutHorizontal({
					width: "100%",
					children: [this.inputPaddingHorizontal, this.inputPaddingVertical]
				}),
				this.newLabel(theme.getTextOffsetLabel()),
				new DLayoutHorizontal({
					width: "100%",
					children: [this.inputOffsetHorizontal, this.inputOffsetVertical]
				})
			]
		});

		selection.on("change", (): void => {
			this.onSelectionChange(selection);
		});
		this.onSelectionChange(selection);
	}

	protected newLabel(label?: string): DText<string> {
		return new DText<string>({
			width: "100%",
			text: {
				value: label
			}
		});
	}

	protected get inputText(): DInputTextArea {
		let result = this._inputText;
		if (result == null) {
			result = this.newInputText();
			this._inputText = result;
		}
		return result;
	}

	protected newInputText(): DInputTextArea {
		return new DInputTextArea({
			width: "100%",
			height: this.theme.getInputTextHeight(),
			text: {
				value: ""
			},
			on: {
				input: (value: string): void => {
					this._selection.setText(value);
				}
			}
		});
	}

	protected get dropdownFontFamily(): DDropdown<string> {
		let result = this._dropdownFontFamily;
		if (result == null) {
			result = this.newDropdownFontFamily();
			this._dropdownFontFamily = result;
		}
		return result;
	}

	protected newDropdownFontFamily(): DDropdown<string> {
		return new DDropdown<string>({
			width: "100%",
			text: {
				value: this.fontFamilies.get("auto")
			},
			menu: {
				width: "auto",
				column: 3,
				fit: false,
				items: this.newDropdownFontFamilyMenuItems()
			},
			on: {
				select: (value): void => {
					this.dropdownFontFamily.text = this.fontFamilies.get(value) ?? value;
					this._selection.setTextFamily(value);
				}
			}
		});
	}

	protected newDropdownFontFamilyMenuItems(): DMenuItemOptionsUnion<string>[] {
		const result: DMenuItemOptionsUnion<string>[] = [];
		this.fontFamilies.forEach((label, fontFamily): void => {
			result.push({
				width: 200,
				value: fontFamily,
				text: {
					value: label
				}
			});
		});
		return result;
	}

	protected get fontFamilies(): Map<string, string> {
		let result = this._fontFamilies;
		if (result == null) {
			result = this.theme.getFontFamilies();
			this._fontFamilies = result;
		}
		return result;
	}

	protected get buttonFontColor(): DButtonColor {
		let result = this._buttonFontColor;
		if (result == null) {
			result = this.newButtonFontColor();
			this._buttonFontColor = result;
		}
		return result;
	}

	protected newButtonFontColor(): DButtonColor {
		const result = new DButtonColor({
			width: "100%",
			on: {
				change: (value: DColorAndAlpha): void => {
					this._selection.setTextColor(value.color, value.alpha);
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
		return result;
	}

	protected get inputFontSize(): DInputReal {
		let result = this._inputFontSize;
		if (result == null) {
			result = this.newInputFontSize();
			this._inputFontSize = result;
		}
		return result;
	}

	protected newInputFontSize(): DInputReal {
		return new DInputReal({
			weight: 1,
			text: {
				value: 0
			},
			min: 0,
			on: {
				input: (size: number): void => {
					this._selection.setTextSize(size);
				}
			}
		});
	}

	protected get buttonFontSizeDecrease(): DButton<string> {
		let result = this._buttonFontSizeDecrease;
		if (result == null) {
			result = this.newButtonFontSizeDecrease();
			this._buttonFontSizeDecrease = result;
		}
		return result;
	}

	protected newButtonFontSizeDecrease(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.editor_font_size_decrease
			},
			title: this.theme.getButtonFontSizeDecreaseTitle(),
			on: {
				active: (): void => {
					this._selection.setTextSizeDelta(-1);
				}
			}
		});
	}

	protected get buttonFontSizeIncrease(): DButton<string> {
		let result = this._buttonFontSizeIncrease;
		if (result == null) {
			result = this.newButtonFontSizeIncrease();
			this._buttonFontSizeIncrease = result;
		}
		return result;
	}

	protected newButtonFontSizeIncrease(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.editor_font_size_increase
			},
			title: this.theme.getButtonFontSizeIncreaseTitle(),
			on: {
				active: (): void => {
					this._selection.setTextSizeDelta(+1);
				}
			}
		});
	}

	protected get buttonFontItalic(): DButton<string> {
		let result = this._buttonFontItalic;
		if (result == null) {
			result = this.newButtonFontItalic();
			this._buttonFontItalic = result;
		}
		return result;
	}

	protected newButtonFontItalic(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.italic
			},
			toggle: true,
			title: this.theme.getButtonFontItalicTitle(),
			on: {
				active: (): void => {
					this._selection.setTextStyle(EShapeTextStyle.ITALIC);
				},

				inactive: (): void => {
					this._selection.setTextStyle(EShapeTextStyle.NORMAL);
				}
			}
		});
	}

	protected get buttonFontBold(): DButton<string> {
		let result = this._buttonFontBold;
		if (result == null) {
			result = this.newButtonFontBold();
			this._buttonFontBold = result;
		}
		return result;
	}

	protected newButtonFontBold(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.bold
			},
			toggle: true,
			title: this.theme.getButtonFontBoldTitle(),
			on: {
				active: (): void => {
					this._selection.setTextWeight(EShapeTextWeight.BOLD);
				},

				inactive: (): void => {
					this._selection.setTextWeight(EShapeTextWeight.NORMAL);
				}
			}
		});
	}

	protected get buttonOutline(): DButtonCheckRight<string> {
		let result = this._buttonOutline;
		if (result == null) {
			result = this.newButtonOutline();
			this._buttonOutline = result;
		}
		return result;
	}

	protected newButtonOutline(): DButtonCheckRight<string> {
		return new DButtonCheckRight<string>({
			width: "100%",
			text: {
				value: this.theme.getButtonOutlineLabel()
			},
			padding: 0,
			background: {
				color: null
			},
			on: {
				active: (): void => {
					this._selection.setTextOutlineEnabled(true);
				},
				inactive: (): void => {
					this._selection.setTextOutlineEnabled(false);
				}
			}
		});
	}

	protected get buttonOutlineColor(): DButtonColor {
		let result = this._buttonOutlineColor;
		if (result == null) {
			result = this.newButtonOutlineColor();
			this._buttonOutlineColor = result;
		}
		return result;
	}

	protected newButtonOutlineColor(): DButtonColor {
		const result = new DButtonColor({
			width: "100%",
			on: {
				change: (value: DColorAndAlpha): void => {
					this._selection.setTextOutlineColor(value.color, value.alpha);
				}
			}
		});
		result.dialog.on("open", () => {
			const dialog = result.dialog;
			const dialogNew = dialog.new;
			const dialogCurrent = dialog.current;
			dialogNew.color = dialogCurrent.color;
			dialogNew.alpha = dialogCurrent.alpha;
		});
		return result;
	}

	protected get inputOutlineWidth(): DInputRealAndLabel {
		return (this._inputOutlineWidth ??= this.newInputOutlineWidth());
	}

	protected newInputOutlineWidth(): DInputRealAndLabel {
		return new DInputRealAndLabel({
			width: "100%",
			label: {
				text: {
					value: this.theme.getInputOutlineWidthLabel()
				}
			},
			input: {
				weight: 1,
				min: 0,
				step: 1,
				max: 100,
				on: {
					change: (value: number): void => {
						this._selection.setTextOutlineWidth(value * 0.01);
					}
				}
			}
		});
	}

	protected get buttonAlignOutsideLeft(): DButton<string> {
		let result = this._buttonAlignOutsideLeft;
		if (result == null) {
			result = this.newButtonAlignOutsideLeft();
			this._buttonAlignOutsideLeft = result;
		}
		return result;
	}

	protected newButtonAlignOutsideLeft(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.text_align_outside_left
			},
			title: this.theme.getButtonAlignOutsideLeftTitle(),
			on: {
				active: (): void => {
					this._selection.setTextAlignHorizontal(EShapeTextAlignHorizontal.OUTSIDE_LEFT);
				}
			}
		});
	}

	protected get buttonAlignLeft(): DButton<string> {
		let result = this._buttonAlignLeft;
		if (result == null) {
			result = this.newButtonAlignLeft();
			this._buttonAlignLeft = result;
		}
		return result;
	}

	protected newButtonAlignLeft(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.text_align_left
			},
			title: this.theme.getButtonAlignLeftTitle(),
			on: {
				active: (): void => {
					this._selection.setTextAlignHorizontal(EShapeTextAlignHorizontal.LEFT);
				}
			}
		});
	}

	protected get buttonAlignCenter(): DButton<string> {
		let result = this._buttonAlignCenter;
		if (result == null) {
			result = this.newButtonAlignCenter();
			this._buttonAlignCenter = result;
		}
		return result;
	}

	protected newButtonAlignCenter(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.text_align_center
			},
			title: this.theme.getButtonAlignCenterTitle(),
			on: {
				active: (): void => {
					this._selection.setTextAlignHorizontal(EShapeTextAlignHorizontal.CENTER);
				}
			}
		});
	}

	protected get buttonAlignRight(): DButton<string> {
		let result = this._buttonAlignRight;
		if (result == null) {
			result = this.newButtonAlignRight();
			this._buttonAlignRight = result;
		}
		return result;
	}

	protected newButtonAlignRight(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.text_align_right
			},
			title: this.theme.getButtonAlignRightTitle(),
			on: {
				active: (): void => {
					this._selection.setTextAlignHorizontal(EShapeTextAlignHorizontal.RIGHT);
				}
			}
		});
	}

	protected get buttonAlignOutsideRight(): DButton<string> {
		let result = this._buttonAlignOutsideRight;
		if (result == null) {
			result = this.newButtonAlignOutsideRight();
			this._buttonAlignOutsideRight = result;
		}
		return result;
	}

	protected newButtonAlignOutsideRight(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.text_align_outside_right
			},
			title: this.theme.getButtonAlignOutsideRightTitle(),
			on: {
				active: (): void => {
					this._selection.setTextAlignHorizontal(EShapeTextAlignHorizontal.OUTSIDE_RIGHT);
				}
			}
		});
	}

	protected get buttonAlignOutsideTop(): DButton<string> {
		let result = this._buttonAlignOutsideTop;
		if (result == null) {
			result = this.newButtonAlignOutsideTop();
			this._buttonAlignOutsideTop = result;
		}
		return result;
	}

	protected newButtonAlignOutsideTop(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.text_align_outside_top
			},
			title: this.theme.getButtonAlignOutsideTopTitle(),
			on: {
				active: (): void => {
					this._selection.setTextAlignVertical(EShapeTextAlignVertical.OUTSIDE_TOP);
				}
			}
		});
	}

	protected get buttonAlignTop(): DButton<string> {
		let result = this._buttonAlignTop;
		if (result == null) {
			result = this.newButtonAlignTop();
			this._buttonAlignTop = result;
		}
		return result;
	}

	protected newButtonAlignTop(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.text_align_top
			},
			title: this.theme.getButtonAlignTopTitle(),
			on: {
				active: (): void => {
					this._selection.setTextAlignVertical(EShapeTextAlignVertical.TOP);
				}
			}
		});
	}

	protected get buttonAlignMiddle(): DButton<string> {
		let result = this._buttonAlignMiddle;
		if (result == null) {
			result = this.newButtonAlignMiddle();
			this._buttonAlignMiddle = result;
		}
		return result;
	}

	protected newButtonAlignMiddle(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.text_align_middle
			},
			title: this.theme.getButtonAlignMiddleTitle(),
			on: {
				active: (): void => {
					this._selection.setTextAlignVertical(EShapeTextAlignVertical.MIDDLE);
				}
			}
		});
	}

	protected get buttonAlignBottom(): DButton<string> {
		let result = this._buttonAlignBottom;
		if (result == null) {
			result = this.newButtonAlignBottom();
			this._buttonAlignBottom = result;
		}
		return result;
	}

	protected newButtonAlignBottom(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.text_align_bottom
			},
			title: this.theme.getButtonAlignBottomTitle(),
			on: {
				active: (): void => {
					this._selection.setTextAlignVertical(EShapeTextAlignVertical.BOTTOM);
				}
			}
		});
	}

	protected get buttonAlignOutsideBottom(): DButton<string> {
		let result = this._buttonAlignOutsideBottom;
		if (result == null) {
			result = this.newButtonAlignOutsideBottom();
			this._buttonAlignOutsideBottom = result;
		}
		return result;
	}

	protected newButtonAlignOutsideBottom(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.text_align_outside_bottom
			},
			title: this.theme.getButtonAlignOutsideBottomTitle(),
			on: {
				active: (): void => {
					this._selection.setTextAlignVertical(EShapeTextAlignVertical.OUTSIDE_BOTTOM);
				}
			}
		});
	}

	protected get buttonDirectionLeftToRight(): DButton<string> {
		let result = this._buttonDirectionLeftToRight;
		if (result == null) {
			result = this.newButtonDirectionLeftToRight();
			this._buttonDirectionLeftToRight = result;
		}
		return result;
	}

	protected newButtonDirectionLeftToRight(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.text_direction_left_to_right
			},
			title: this.theme.getButtonDirectionLeftToRightTitle(),
			on: {
				active: (): void => {
					this._selection.setTextDirection(EShapeTextDirection.LEFT_TO_RIGHT);
				}
			}
		});
	}

	protected get buttonDirectionTopToBottom(): DButton<string> {
		let result = this._buttonDirectionTopToBottom;
		if (result == null) {
			result = this.newButtonDirectionTopToBottom();
			this._buttonDirectionTopToBottom = result;
		}
		return result;
	}

	protected newButtonDirectionTopToBottom(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.text_direction_top_to_bottom
			},
			title: this.theme.getButtonDirectionTopToBottomTitle(),
			on: {
				active: (): void => {
					this._selection.setTextDirection(EShapeTextDirection.TOP_TO_BOTTOM);
				}
			}
		});
	}

	protected get buttonDirectionBottomToTop(): DButton<string> {
		let result = this._buttonDirectionBottomToTop;
		if (result == null) {
			result = this.newButtonDirectionBottomToTop();
			this._buttonDirectionBottomToTop = result;
		}
		return result;
	}

	protected newButtonDirectionBottomToTop(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.text_direction_bottom_to_top
			},
			title: this.theme.getButtonDirectionBottomToTopTitle(),
			on: {
				active: (): void => {
					this._selection.setTextDirection(EShapeTextDirection.BOTTOM_TO_TOP);
				}
			}
		});
	}

	protected get buttonDirectionRightToLeft(): DButton<string> {
		let result = this._buttonDirectionRightToLeft;
		if (result == null) {
			result = this.newButtonDirectionRightToLeft();
			this._buttonDirectionRightToLeft = result;
		}
		return result;
	}

	protected newButtonDirectionRightToLeft(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.text_direction_right_to_left
			},
			title: this.theme.getButtonDirectionRightToLeftTitle(),
			on: {
				active: (): void => {
					this._selection.setTextDirection(EShapeTextDirection.RIGHT_TO_LEFT);
				}
			}
		});
	}

	protected get buttonClipping(): DButtonCheckRight<string> {
		let result = this._buttonClipping;
		if (result == null) {
			result = this.newButtonClipping();
			this._buttonClipping = result;
		}
		return result;
	}

	protected newButtonClipping(): DButtonCheckRight<string> {
		return new DButtonCheckRight<string>({
			width: "100%",
			text: {
				value: this.theme.getButtonClippingLabel()
			},
			padding: 0,
			background: {
				color: null
			},
			on: {
				active: (): void => {
					this._selection.setTextClipping(true);
				},
				inactive: (): void => {
					this._selection.setTextClipping(false);
				}
			}
		});
	}

	protected get buttonFitting(): DButtonCheckRight<string> {
		let result = this._buttonFitting;
		if (result == null) {
			result = this.newButtonFitting();
			this._buttonFitting = result;
		}
		return result;
	}

	protected newButtonFitting(): DButtonCheckRight<string> {
		return new DButtonCheckRight<string>({
			width: "100%",
			text: {
				value: this.theme.getButtonFittingLabel()
			},
			padding: 0,
			background: {
				color: null
			},
			on: {
				active: (): void => {
					this._selection.setTextFitting(true);
				},
				inactive: (): void => {
					this._selection.setTextFitting(false);
				}
			}
		});
	}

	protected get inputSpacingHorizontal(): DInputReal {
		let result = this._inputSpacingHorizontal;
		if (result == null) {
			result = this.newInputSpacingHorizontal();
			this._inputSpacingHorizontal = result;
		}
		return result;
	}

	protected newInputSpacingHorizontal(): DInputReal {
		return new DInputReal({
			weight: 1,
			step: 1,
			text: {
				value: 0
			},
			on: {
				change: (value: number): void => {
					this._selection.setTextSpacingHorizontal(value);
				}
			}
		});
	}

	protected get inputSpacingVertical(): DInputReal {
		let result = this._inputSpacingVertical;
		if (result == null) {
			result = this.newInputSpacingVertical();
			this._inputSpacingVertical = result;
		}
		return result;
	}

	protected newInputSpacingVertical(): DInputReal {
		return new DInputReal({
			weight: 1,
			step: 1,
			text: {
				value: 0
			},
			on: {
				change: (value: number): void => {
					this._selection.setTextSpacingVertical(value);
				}
			}
		});
	}

	protected get inputPaddingHorizontal(): DInputReal {
		let result = this._inputPaddingHorizontal;
		if (result == null) {
			result = this.newInputPaddingHorizontal();
			this._inputPaddingHorizontal = result;
		}
		return result;
	}

	protected newInputPaddingHorizontal(): DInputReal {
		return new DInputReal({
			weight: 1,
			step: 1,
			text: {
				value: 0
			},
			on: {
				change: (value: number): void => {
					this._selection.setTextPaddingHorizontal(value);
				}
			}
		});
	}

	protected get inputPaddingVertical(): DInputReal {
		let result = this._inputTextPaddingVertical;
		if (result == null) {
			result = this.newInputPaddingVertical();
			this._inputTextPaddingVertical = result;
		}
		return result;
	}

	protected newInputPaddingVertical(): DInputReal {
		return new DInputReal({
			weight: 1,
			step: 1,
			text: {
				value: 0
			},
			on: {
				change: (value: number): void => {
					this._selection.setTextPaddingVertical(value);
				}
			}
		});
	}

	protected get inputOffsetHorizontal(): DInputReal {
		let result = this._inputOffsetHorizontal;
		if (result == null) {
			result = this.newInputOffsetHorizontal();
			this._inputOffsetHorizontal = result;
		}
		return result;
	}

	protected newInputOffsetHorizontal(): DInputReal {
		return new DInputReal({
			weight: 1,
			step: 1,
			text: {
				value: 0
			},
			on: {
				change: (value: number): void => {
					this._selection.setTextOffsetHorizontal(value);
				}
			}
		});
	}

	protected get inputOffsetVertical(): DInputReal {
		let result = this._inputOffsetVertical;
		if (result == null) {
			result = this.newInputOffsetVertical();
			this._inputOffsetVertical = result;
		}
		return result;
	}

	protected newInputOffsetVertical(): DInputReal {
		return new DInputReal({
			weight: 1,
			step: 1,
			text: {
				value: 0
			},
			on: {
				change: (value: number): void => {
					this._selection.setTextOffsetVertical(value);
				}
			}
		});
	}

	protected onSelectionChange(selection: EEditorTextSelection): void {
		this.state.isDisabled = selection.isEmpty();

		const last = selection.last();
		if (last != null) {
			const text = last.text;

			this.inputText.value = text.value;

			const textFamily = text.family;
			this.dropdownFontFamily.text = this.fontFamilies.get(textFamily) ?? textFamily;

			const buttonFontColor = this.buttonFontColor.value;
			buttonFontColor.color = text.color;
			buttonFontColor.alpha = text.alpha;

			this.inputFontSize.value = text.size;

			this.buttonFontItalic.state.isActive = text.style === EShapeTextStyle.ITALIC;

			this.buttonFontBold.state.isActive = text.weight === EShapeTextWeight.BOLD;

			const outline = text.outline;
			this.buttonOutline.state.isActive = outline.enable;

			const buttonOutlineColor = this.buttonOutlineColor;
			const buttonOutlineColorValue = buttonOutlineColor.value;
			buttonOutlineColorValue.color = outline.color;
			buttonOutlineColorValue.alpha = outline.alpha;
			buttonOutlineColor.state.isDisabled = !outline.enable;

			const inputOutlineWidth = this.inputOutlineWidth;
			inputOutlineWidth.input.value = outline.width * 100;
			inputOutlineWidth.state.isDisabled = !outline.enable;

			this.buttonClipping.state.isActive = text.clipping;

			this.buttonFitting.state.isActive = text.fitting;

			const spacing = text.spacing;
			this.inputSpacingHorizontal.value = spacing.horizontal;
			this.inputSpacingVertical.value = spacing.vertical;

			const padding = text.padding;
			this.inputPaddingHorizontal.value = padding.horizontal;
			this.inputPaddingVertical.value = padding.vertical;

			const offset = text.offset;
			this.inputOffsetHorizontal.value = offset.horizontal;
			this.inputOffsetVertical.value = offset.vertical;
		}
	}

	protected override getType(): string {
		return "EEditorText";
	}
}
