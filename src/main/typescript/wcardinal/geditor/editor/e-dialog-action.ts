import {
	DAlignHorizontal,
	DBase,
	DButtonCheck,
	DButtonColor,
	DDiagram,
	DDiagramEditor,
	DDialogLayered,
	DDialogLayeredOptions,
	DInputInteger,
	DInputLabel,
	DInputReal,
	DInputTextAndLabel,
	DLayoutHorizontal,
	DLayoutSpace,
	DMenu,
	DMenuItemCheckOptions,
	DMenuItemOptions,
	DSelect,
	DSelectMultiple,
	DText,
	DThemes,
	EShapeActionValue,
	EShapeActionValueBlink,
	EShapeActionValueBlinkType,
	EShapeActionValueChangeColor,
	EShapeActionValueChangeColorBrightness,
	EShapeActionValueChangeColorCode,
	EShapeActionValueChangeColorTarget,
	EShapeActionValueChangeColorType,
	EShapeActionValueChangeColorTypes,
	EShapeActionValueChangeCursor,
	EShapeActionValueChangeText,
	EShapeActionValueChangeTextType,
	EShapeActionValueEmitEvent,
	EShapeActionValueMisc,
	EShapeActionValueMiscEmitEvent,
	EShapeActionValueGesture,
	EShapeActionValueGestureType,
	EShapeActionValueMiscHtmlElement,
	EShapeActionValueMiscInput,
	EShapeActionValueShowHideLayer,
	EShapeActionValueMiscType,
	EShapeActionValueMiscWrite,
	EShapeActionValueOnInputAction,
	EShapeActionValueOpen,
	EShapeActionValueOpenType,
	EShapeActionValueShowHideShape,
	EShapeActionValueShowHideType,
	EShapeActionValueTransformMove,
	EShapeActionValueTransformMoveType,
	EShapeActionValueTransformResize,
	EShapeActionValueTransformResizeType,
	EShapeActionValueTransformRotate,
	EShapeActionValueTransformRotateType,
	EShapeActionValueTransformType,
	EShapeActionValueType,
	EThemeShapeActionValue,
	UtilHtmlElementWhen,
	EShapeActionValueGestureOperationType,
	EShapeActionValueShowHide,
	EShapeActionValueOpenDialog,
	EShapeActionValueOpenDialogType,
	DMenuItemOptionsUnion,
	EShapeActionValueOpenExtension,
	EShapeActionOpenExtensions,
	EShapeActionOpenExtension,
	EShapeActionValueMiscExecute,
	DThemeDialogLayered,
	EShapeActionValueOpenDialogExtension,
	EShapeActionOpenDialogExtensions,
	DButtonAmbient,
	DButton,
	DApplications,
	EShapeActionMiscExtensions,
	EShapeActionValueMiscExtension
} from "@wcardinal/wcardinal-ui";
import { DisplayObject, Texture } from "pixi.js";
import { EShapeActionExtensions } from "../extension";
import { EDialogActionExtensionContainer } from "./e-dialog-action-extension-container";
import { EDialogActionKeywordBoard } from "./e-dialog-action-keyword-board";

export interface EDialogActionOption
	extends DDialogLayeredOptions<EShapeActionValue | null, EThemeDialogAction> {
	icons: Record<string, Texture>;
	diagram: DDiagram | DDiagramEditor;
}

export interface EDialogActionKeyword {
	keyword: string;
	type: string;
	description: string;
}

export interface EThemeDialogAction extends DThemeDialogLayered {
	getSelectActionLabel(): string | undefined;
	getButtonKeywordTitle(): string | undefined;
	getInputOriginXLabel(): string | undefined;
	getInputOriginYLabel(): string | undefined;
	getSelectWhenLabel(): string | undefined;
	getSelectLayerLabel(): string | undefined;
	getInputConditionLabel(): string | undefined;
	getInputIntervalLabel(): string | undefined;
	getInputIntervalUnitLabel(): string | undefined;
	getInputSizeLabel(): string | undefined;
	getInputAmountLabel(): string | undefined;
	getInputValueLabel(): string | undefined;
	getInputInitializationLabel(): string | undefined;
	getCheckPointEventsLabel(): string | undefined;
	getInputTargetNameLabel(): string | undefined;
	getButtonColorLabel(): string | undefined;
	getInputTargetLabel(): string | undefined;
	getInputArgumentLabel(): string | undefined;
	getInputColorCodeLabel(): string | undefined;
	getInputAlphaCodeLabel(): string | undefined;
	getInputBrightnessLabel(): string | undefined;
	getInputBlendLabel(): string | undefined;
	getInputInitialLabel(): string | undefined;
	getInputStepLabel(): string | undefined;
	getInputMinLabel(): string | undefined;
	getInputMaxLabel(): string | undefined;
	getInputScaleLabel(): string | undefined;
	getCheckBringToFrontLabel(): string | undefined;
	getCheckInNewWindowLabel(): string | undefined;
	newKeywords(): EDialogActionKeyword[];
}

export class EDialogAction extends DDialogLayered<
	EShapeActionValue | null,
	EThemeDialogAction,
	EDialogActionOption
> {
	protected _themeShape?: EThemeShapeActionValue;

	protected _select?: DSelect<EShapeActionValueType>;
	protected _selectLayout?: DLayoutHorizontal;
	protected _showHideType?: DSelect<EShapeActionValueShowHideType>;
	protected _showHideTypeLayout?: DLayoutHorizontal;
	protected _blinkType?: DSelect<EShapeActionValueBlinkType>;
	protected _blinkTypeLayout?: DLayoutHorizontal;
	protected _transformType?: DSelect<EShapeActionValueTransformType>;
	protected _transformTypeLayout?: DLayoutHorizontal;
	protected _changeColorType?: DSelectMultiple<EShapeActionValueChangeColorType>;
	protected _changeColorTypeLayout?: DLayoutHorizontal;
	protected _changeColorTarget?: DSelect<EShapeActionValueChangeColorTarget>;
	protected _changeColorTargetLayout?: DLayoutHorizontal;
	protected _resizeType?: DSelect<EShapeActionValueTransformResizeType>;
	protected _resizeTypeLayout?: DLayoutHorizontal;
	protected _originX?: DInputReal;
	protected _originXLayout?: DLayoutHorizontal;
	protected _originY?: DInputReal;
	protected _originYLayout?: DLayoutHorizontal;
	protected _moveType?: DSelect<EShapeActionValueTransformMoveType>;
	protected _moveTypeLayout?: DLayoutHorizontal;
	protected _rotateType?: DSelect<EShapeActionValueTransformRotateType>;
	protected _rotateTypeLayout?: DLayoutHorizontal;
	protected _openType?: DSelect<EShapeActionValueOpenType>;
	protected _openTypeLayout?: DLayoutHorizontal;
	protected _openDialogType?: DSelect<EShapeActionValueOpenDialogType>;
	protected _openDialogTypeLayout?: DLayoutHorizontal;
	protected _onInputAction?: DSelect<EShapeActionValueOnInputAction>;
	protected _onInputActionLayout?: DLayoutHorizontal;
	protected _changeTextType?: DSelect<EShapeActionValueChangeTextType>;
	protected _changeTextTypeLayout?: DLayoutHorizontal;
	protected _miscType?: DSelect<EShapeActionValueMiscType>;
	protected _miscTypeLayout?: DLayoutHorizontal;
	protected _whenType?: DSelect<UtilHtmlElementWhen>;
	protected _whenTypeLayout?: DLayoutHorizontal;
	protected _gestureType?: DSelect<EShapeActionValueGestureType>;
	protected _gestureTypeLayout?: DLayoutHorizontal;
	protected _gestureOperationType?: DSelectMultiple<EShapeActionValueGestureOperationType>;
	protected _gestureOperationTypeLayout?: DLayoutHorizontal;
	protected _selectLayer?: DSelectMultiple<number>;
	protected _selectLayerLayout?: DLayoutHorizontal;

	protected _condition?: DInputTextAndLabel;
	protected _size?: DInputTextAndLabel;
	protected _amount?: DInputTextAndLabel;
	protected _contents?: DInputTextAndLabel;
	protected _initialization?: DInputTextAndLabel;
	protected _pointerEventsLayout?: DLayoutHorizontal;
	protected _pointerEvents?: DButtonCheck<string>;
	protected _targetName?: DInputTextAndLabel;
	protected _interval?: DInputInteger;
	protected _intervalLayout?: DLayoutHorizontal;
	protected _color?: DButtonColor;
	protected _colorLayout?: DLayoutHorizontal;
	protected _target?: DInputTextAndLabel;
	protected _argument?: DInputTextAndLabel;
	protected _colorCode?: DInputTextAndLabel;
	protected _alphaCode?: DInputTextAndLabel;
	protected _brightness?: DInputTextAndLabel;
	protected _blend?: DInputTextAndLabel;
	protected _initial?: DInputTextAndLabel;
	protected _step?: DInputTextAndLabel;
	protected _min?: DInputTextAndLabel;
	protected _max?: DInputTextAndLabel;
	protected _scaleMin?: DInputReal;
	protected _scaleMax?: DInputReal;
	protected _scaleLayout?: DLayoutHorizontal;
	protected _checkBringToFront?: DButtonCheck<string>;
	protected _checkBringToFrontLayout?: DLayoutHorizontal;
	protected _inNewWindowLayout?: DLayoutHorizontal;
	protected _inNewWindow?: DButtonCheck<string>;

	protected _extension?: EDialogActionExtensionContainer;

	protected _buttonKeyword?: DButton<string>;
	protected _boardKeyword?: EDialogActionKeywordBoard;

	protected override newContentChildren(
		theme: EThemeDialogAction,
		options?: EDialogActionOption
	): Array<DisplayObject | null> {
		const result = super.newContentChildren(theme, options);
		result.push(
			this.selectLayout,
			this.showHideTypeLayout,
			this.blinkTypeLayout,
			this.transformTypeLayout,
			this.changeColorTypeLayout,
			this.changeColorTargetLayout,
			this.rotateTypeLayout,
			this.resizeTypeLayout,
			this.originXLayout,
			this.originYLayout,
			this.moveTypeLayout,
			this.openTypeLayout,
			this.openDialogTypeLayout,
			this.changeTextTypeLayout,
			this.miscTypeLayout,
			this.onInputActionLayout,
			this.whenTypeLayout,
			this.gestureTypeLayout,
			this.gestureOperationTypeLayout,
			this.selectLayerLayout,

			this.condition,
			this.intervalLayout,
			this.size,
			this.amount,
			this.targetName,
			this.colorLayout,
			this.target,
			this.argument,
			this.contents,
			this.initialization,
			this.pointerEventsLayout,
			this.colorCode,
			this.alphaCode,
			this.brightness,
			this.blend,
			this.initial,
			this.step,
			this.min,
			this.max,
			this.scaleLayout,
			this.checkBringToFrontLayout,
			this.inNewWindowLayout
		);

		const onChangeBound = () => {
			this.onChange();
		};
		this.select.on("change", onChangeBound);
		this.showHideType.on("change", onChangeBound);
		this.blinkType.on("change", onChangeBound);
		this.transformType.on("change", onChangeBound);
		this.resizeType.on("change", onChangeBound);
		this.changeColorTarget.on("change", onChangeBound);
		this.openType.on("change", onChangeBound);
		this.openDialogType.on("change", onChangeBound);
		this.miscType.on("change", onChangeBound);

		return result;
	}

	protected newLabel(label?: string): DInputLabel {
		return new DInputLabel({
			width: 60,
			text: {
				value: label
			}
		});
	}

	protected newSpace(): DLayoutSpace {
		return new DLayoutSpace({
			width: 60
		});
	}

	protected newLabeled<INPUT extends DBase>(
		label: string | null | undefined,
		input: INPUT
	): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "padding",
			height: "auto",
			children: [
				label != null ? this.newLabel(label) : this.newSpace(),
				input,
				this.newSpace()
			]
		});
	}

	// Theme
	protected get themeShape(): EThemeShapeActionValue {
		return (this._themeShape ??= this.newThemeShape());
	}

	protected newThemeShape(): EThemeShapeActionValue {
		return DThemes.get<EThemeShapeActionValue>("EShapeActionValue");
	}

	// Select
	protected get select(): DSelect<EShapeActionValueType> {
		return (this._select ??= this.newSelect());
	}

	protected newSelect(): DSelect<EShapeActionValueType> {
		return new DSelect<EShapeActionValueType>({
			weight: 1,
			value: EShapeActionValueType.SHOW_HIDE,
			menu: {
				items: this.newSelectMenuItems()
			}
		});
	}

	protected newSelectMenuItems(): DMenuItemOptionsUnion<EShapeActionValueType>[] {
		const themeShape = this.themeShape;
		const result: DMenuItemOptionsUnion<EShapeActionValueType>[] = [
			{
				value: EShapeActionValueType.SHOW_HIDE,
				text: {
					value: themeShape.toTypeLabel(EShapeActionValueType.SHOW_HIDE)
				}
			},
			{
				value: EShapeActionValueType.BLINK,
				text: {
					value: themeShape.toTypeLabel(EShapeActionValueType.BLINK)
				}
			},
			{
				value: EShapeActionValueType.TRANSFORM,
				text: {
					value: themeShape.toTypeLabel(EShapeActionValueType.TRANSFORM)
				}
			},
			{
				value: EShapeActionValueType.CHANGE_COLOR,
				text: {
					value: themeShape.toTypeLabel(EShapeActionValueType.CHANGE_COLOR)
				}
			},
			{
				value: EShapeActionValueType.CHANGE_TEXT,
				text: {
					value: themeShape.toTypeLabel(EShapeActionValueType.CHANGE_TEXT)
				}
			},
			{
				value: EShapeActionValueType.CHANGE_CURSOR,
				text: {
					value: themeShape.toTypeLabel(EShapeActionValueType.CHANGE_CURSOR)
				}
			},
			{
				value: EShapeActionValueType.OPEN,
				text: {
					value: themeShape.toTypeLabel(EShapeActionValueType.OPEN)
				}
			},
			{
				value: EShapeActionValueType.GESTURE,
				text: {
					value: themeShape.toTypeLabel(EShapeActionValueType.GESTURE)
				}
			},
			{
				value: EShapeActionValueType.MISC,
				text: {
					value: themeShape.toTypeLabel(EShapeActionValueType.MISC)
				}
			}
		];
		EShapeActionExtensions.each((extension): void => {
			result.push({
				value: extension.type,
				text: {
					value: extension.label
				}
			});
		});
		return result;
	}

	protected get selectLayout(): DLayoutHorizontal {
		return (this._selectLayout ??= this.newSelectLayout());
	}

	protected newSelectLayout(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "padding",
			height: "auto",
			children: [
				this.newLabel(this.theme.getSelectActionLabel()),
				this.select,
				new DLayoutHorizontal({
					width: 60,
					height: "auto",
					children: [
						new DLayoutSpace({
							weight: 1
						}),
						this.buttonKeyword
					]
				})
			]
		});
	}

	// Keyword button
	protected get buttonKeyword(): DButton<string> {
		return (this._buttonKeyword ??= this.newButtonKeyword());
	}

	protected newButtonKeyword(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			toggle: true,
			image: {
				source: this.options?.icons.action_keyword
			},
			title: this.theme.getButtonKeywordTitle(),
			on: {
				active: () => {
					this.onButtonKeywordActive();
				},

				inactive: () => {
					this.onButtonKeywordInactive();
				}
			}
		});
	}

	protected onButtonKeywordActive(): void {
		const boardKeyword = this.boardKeyword;
		const offset = this.getBoardKeywordOffset();
		const width = this.width;
		const layer = DApplications.getLayer(this);
		if (layer != null) {
			const boardKeywordWidth = boardKeyword.width;
			if (layer.width < this.position.x + width + offset + boardKeywordWidth) {
				boardKeyword.position.x = -boardKeywordWidth - offset;
			} else {
				boardKeyword.position.x = width + offset;
			}
		} else {
			boardKeyword.position.x = width + offset;
		}
		boardKeyword.show();
	}

	protected onButtonKeywordInactive(): void {
		this.boardKeyword.hide();
	}

	// Keyword board
	protected get boardKeyword(): EDialogActionKeywordBoard {
		return (this._boardKeyword ??= this.newBoardKeyword());
	}

	protected newBoardKeyword(): EDialogActionKeywordBoard {
		// To exclude this board from the automatic height calculation targets,
		// The width and the height must be functions.
		return new EDialogActionKeywordBoard({
			parent: this,
			x: 0,
			y: 0,
			width: () => 300,
			height: () => 400,
			padding: 16
		});
	}

	protected getBoardKeywordOffset(): number {
		return 16;
	}

	// Select show / hide type
	protected get showHideType(): DSelect<EShapeActionValueShowHideType> {
		return (this._showHideType ??= this.newShowHideType());
	}

	protected newShowHideType(): DSelect<EShapeActionValueShowHideType> {
		const themeShape = this.themeShape;
		return new DSelect<EShapeActionValueShowHideType>({
			weight: 1,
			value: EShapeActionValueShowHideType.SHAPE,
			menu: {
				items: [
					{
						value: EShapeActionValueShowHideType.SHAPE,
						text: {
							value: themeShape.toShowHideTypeLabel(
								EShapeActionValueShowHideType.SHAPE
							)
						}
					},
					{
						value: EShapeActionValueShowHideType.LAYER,
						text: {
							value: themeShape.toShowHideTypeLabel(
								EShapeActionValueShowHideType.LAYER
							)
						}
					}
				]
			}
		});
	}

	protected get showHideTypeLayout(): DLayoutHorizontal {
		return (this._showHideTypeLayout ??= this.newLabeled(null, this.showHideType));
	}

	protected onChangeShowHideTypeLayout(select: number | null): void {
		const showHideTypeLayout = this.showHideTypeLayout;
		if (select === EShapeActionValueType.SHOW_HIDE) {
			showHideTypeLayout.show();
		} else {
			showHideTypeLayout.hide();
		}
	}

	// Select blink type
	protected get blinkType(): DSelect<EShapeActionValueBlinkType> {
		return (this._blinkType ??= this.newBlinkType());
	}

	protected newBlinkType(): DSelect<EShapeActionValueBlinkType> {
		const themeShape = this.themeShape;
		return new DSelect<EShapeActionValueBlinkType>({
			weight: 1,
			value: EShapeActionValueBlinkType.VISIBILITY,
			menu: {
				items: [
					{
						value: EShapeActionValueBlinkType.VISIBILITY,
						text: {
							value: themeShape.toBlinkTypeLabel(
								EShapeActionValueBlinkType.VISIBILITY
							)
						}
					},
					{
						value: EShapeActionValueBlinkType.BRIGHTEN,
						text: {
							value: themeShape.toBlinkTypeLabel(EShapeActionValueBlinkType.BRIGHTEN)
						}
					},
					{
						value: EShapeActionValueBlinkType.DARKEN,
						text: {
							value: themeShape.toBlinkTypeLabel(EShapeActionValueBlinkType.DARKEN)
						}
					},
					{
						value: EShapeActionValueBlinkType.OPACITY,
						text: {
							value: themeShape.toBlinkTypeLabel(EShapeActionValueBlinkType.OPACITY)
						}
					},
					{
						value: EShapeActionValueBlinkType.COLOR_FILL,
						text: {
							value: themeShape.toBlinkTypeLabel(
								EShapeActionValueBlinkType.COLOR_FILL
							)
						}
					},
					{
						value: EShapeActionValueBlinkType.COLOR_STROKE,
						text: {
							value: themeShape.toBlinkTypeLabel(
								EShapeActionValueBlinkType.COLOR_STROKE
							)
						}
					}
				]
			}
		});
	}

	protected get blinkTypeLayout(): DLayoutHorizontal {
		return (this._blinkTypeLayout ??= this.newLabeled(null, this.blinkType));
	}

	protected onChangeBlinkTypeLayout(select: number | null): void {
		const blinkTypeLayout = this.blinkTypeLayout;
		if (select === EShapeActionValueType.BLINK) {
			blinkTypeLayout.show();
		} else {
			blinkTypeLayout.hide();
		}
	}

	// Transform type
	protected get transformType(): DSelect<EShapeActionValueTransformType> {
		return (this._transformType ??= this.newTransformType());
	}

	protected newTransformType(): DSelect<EShapeActionValueTransformType> {
		const themeShape = this.themeShape;
		return new DSelect<EShapeActionValueTransformType>({
			weight: 1,
			value: EShapeActionValueTransformType.MOVE,
			menu: {
				items: [
					{
						value: EShapeActionValueTransformType.MOVE,
						text: {
							value: themeShape.toTransformTypeLabel(
								EShapeActionValueTransformType.MOVE
							)
						}
					},
					{
						value: EShapeActionValueTransformType.ROTATE,
						text: {
							value: themeShape.toTransformTypeLabel(
								EShapeActionValueTransformType.ROTATE
							)
						}
					},
					{
						value: EShapeActionValueTransformType.RESIZE,
						text: {
							value: themeShape.toTransformTypeLabel(
								EShapeActionValueTransformType.RESIZE
							)
						}
					}
				]
			}
		});
	}

	protected get transformTypeLayout(): DLayoutHorizontal {
		return (this._transformTypeLayout ??= this.newLabeled(null, this.transformType));
	}

	protected onChangeTransformTypeLayout(select: number | null): void {
		const transformTypeLayout = this.transformTypeLayout;
		if (select === EShapeActionValueType.TRANSFORM) {
			transformTypeLayout.show();
		} else {
			transformTypeLayout.hide();
		}
	}

	// Select color type
	protected get changeColorType(): DSelectMultiple<EShapeActionValueChangeColorType> {
		return (this._changeColorType ??= this.newChangeColorType());
	}

	protected newChangeColorType(): DSelectMultiple<EShapeActionValueChangeColorType> {
		const themeShape = this.themeShape;
		return new DSelectMultiple<EShapeActionValueChangeColorType>({
			weight: 1,
			values: [EShapeActionValueChangeColorType.FILL],
			menu: {
				items: [
					{
						value: EShapeActionValueChangeColorType.FILL,
						text: {
							value: themeShape.toChangeColorTypeLabel(
								EShapeActionValueChangeColorType.FILL
							)
						},
						check: true
					},
					{
						value: EShapeActionValueChangeColorType.STROKE,
						text: {
							value: themeShape.toChangeColorTypeLabel(
								EShapeActionValueChangeColorType.STROKE
							)
						},
						check: true
					},
					{
						value: EShapeActionValueChangeColorType.TEXT,
						text: {
							value: themeShape.toChangeColorTypeLabel(
								EShapeActionValueChangeColorType.TEXT
							)
						},
						check: true
					},
					{
						value: EShapeActionValueChangeColorType.TEXT_OUTLINE,
						text: {
							value: themeShape.toChangeColorTypeLabel(
								EShapeActionValueChangeColorType.TEXT_OUTLINE
							)
						},
						check: true
					}
				]
			}
		});
	}

	protected get changeColorTypeLayout(): DLayoutHorizontal {
		return (this._changeColorTypeLayout ??= this.newLabeled(null, this.changeColorType));
	}

	protected onChangeChangeColorTypeLayout(select: number | null): void {
		const changeColorTypeLayout = this.changeColorTypeLayout;
		if (select === EShapeActionValueType.CHANGE_COLOR) {
			changeColorTypeLayout.show();
		} else {
			changeColorTypeLayout.hide();
		}
	}

	// Select color target
	protected get changeColorTarget(): DSelect<EShapeActionValueChangeColorTarget> {
		return (this._changeColorTarget ??= this.newChangeColorTarget());
	}

	protected newChangeColorTarget(): DSelect<EShapeActionValueChangeColorTarget> {
		const themeShape = this.themeShape;
		return new DSelect<EShapeActionValueChangeColorTarget>({
			weight: 1,
			value: EShapeActionValueChangeColorTarget.COLOR_AND_ALPHA,
			menu: {
				items: [
					{
						value: EShapeActionValueChangeColorTarget.COLOR_AND_ALPHA,
						text: {
							value: themeShape.toChangeColorTargetLabel(
								EShapeActionValueChangeColorTarget.COLOR_AND_ALPHA
							)
						}
					},
					{
						value: EShapeActionValueChangeColorTarget.COLOR,
						text: {
							value: themeShape.toChangeColorTargetLabel(
								EShapeActionValueChangeColorTarget.COLOR
							)
						}
					},
					{
						value: EShapeActionValueChangeColorTarget.ALPHA,
						text: {
							value: themeShape.toChangeColorTargetLabel(
								EShapeActionValueChangeColorTarget.ALPHA
							)
						}
					},
					{
						value: EShapeActionValueChangeColorTarget.CODE,
						text: {
							value: themeShape.toChangeColorTargetLabel(
								EShapeActionValueChangeColorTarget.CODE
							)
						}
					},
					{
						value: EShapeActionValueChangeColorTarget.BRIGHTNESS,
						text: {
							value: themeShape.toChangeColorTargetLabel(
								EShapeActionValueChangeColorTarget.BRIGHTNESS
							)
						}
					}
				]
			}
		});
	}

	protected get changeColorTargetLayout(): DLayoutHorizontal {
		return (this._changeColorTargetLayout ??= this.newLabeled(null, this.changeColorTarget));
	}

	protected onChangeChangeColorTargetLayout(select: number | null): void {
		const changeColorTargetLayout = this.changeColorTargetLayout;
		if (select === EShapeActionValueType.CHANGE_COLOR) {
			changeColorTargetLayout.show();
		} else {
			changeColorTargetLayout.hide();
		}
	}

	// Select rotate type
	protected get rotateType(): DSelect<EShapeActionValueTransformRotateType> {
		return (this._rotateType ??= this.newRotateType());
	}

	protected newRotateType(): DSelect<EShapeActionValueTransformRotateType> {
		const themeShape = this.themeShape;
		return new DSelect<EShapeActionValueTransformRotateType>({
			weight: 1,
			value: EShapeActionValueTransformRotateType.RELATIVE,
			menu: {
				items: [
					{
						value: EShapeActionValueTransformRotateType.RELATIVE,
						text: {
							value: themeShape.toTransformRotateTypeLabel(
								EShapeActionValueTransformRotateType.RELATIVE
							)
						}
					},
					{
						value: EShapeActionValueTransformRotateType.ABSOLUTE,
						text: {
							value: themeShape.toTransformRotateTypeLabel(
								EShapeActionValueTransformRotateType.ABSOLUTE
							)
						}
					}
				]
			}
		});
	}

	protected get rotateTypeLayout(): DLayoutHorizontal {
		return (this._rotateTypeLayout ??= this.newLabeled(null, this.rotateType));
	}

	protected onChangeRotateTypeLayout(select: number | null): void {
		const rotateTypeLayout = this.rotateTypeLayout;
		if (select === EShapeActionValueType.TRANSFORM) {
			if (this.transformType.value === EShapeActionValueTransformType.ROTATE) {
				rotateTypeLayout.show();
			} else {
				rotateTypeLayout.hide();
			}
		} else {
			rotateTypeLayout.hide();
		}
	}

	// Select resize type
	protected get resizeType(): DSelect<EShapeActionValueTransformResizeType> {
		return (this._resizeType ??= this.newResizeType());
	}

	protected newResizeType(): DSelect<EShapeActionValueTransformResizeType> {
		const themeShape = this.themeShape;
		return new DSelect<EShapeActionValueTransformResizeType>({
			weight: 1,
			value: EShapeActionValueTransformResizeType.RELATIVE_SIZE,
			menu: {
				items: [
					{
						value: EShapeActionValueTransformResizeType.ABSOLUTE_SIZE,
						text: {
							value: themeShape.toTransformResizeTypeLabel(
								EShapeActionValueTransformResizeType.ABSOLUTE_SIZE
							)
						}
					},
					{
						value: EShapeActionValueTransformResizeType.RELATIVE_SIZE,
						text: {
							value: themeShape.toTransformResizeTypeLabel(
								EShapeActionValueTransformResizeType.RELATIVE_SIZE
							)
						}
					},
					{
						value: EShapeActionValueTransformResizeType.ABSOLUTE_HEIGHT,
						text: {
							value: themeShape.toTransformResizeTypeLabel(
								EShapeActionValueTransformResizeType.ABSOLUTE_HEIGHT
							)
						}
					},
					{
						value: EShapeActionValueTransformResizeType.RELATIVE_HEIGHT,
						text: {
							value: themeShape.toTransformResizeTypeLabel(
								EShapeActionValueTransformResizeType.RELATIVE_HEIGHT
							)
						}
					},
					{
						value: EShapeActionValueTransformResizeType.ABSOLUTE_WIDTH,
						text: {
							value: themeShape.toTransformResizeTypeLabel(
								EShapeActionValueTransformResizeType.ABSOLUTE_WIDTH
							)
						}
					},
					{
						value: EShapeActionValueTransformResizeType.RELATIVE_WIDTH,
						text: {
							value: themeShape.toTransformResizeTypeLabel(
								EShapeActionValueTransformResizeType.RELATIVE_WIDTH
							)
						}
					}
				]
			}
		});
	}

	protected get resizeTypeLayout(): DLayoutHorizontal {
		return (this._resizeTypeLayout ??= this.newLabeled(null, this.resizeType));
	}

	protected onChangeResizeTypeLayout(select: number | null): void {
		const resizeTypeLayout = this.resizeTypeLayout;
		if (select === EShapeActionValueType.TRANSFORM) {
			if (this.transformType.value === EShapeActionValueTransformType.RESIZE) {
				resizeTypeLayout.show();
			} else {
				resizeTypeLayout.hide();
			}
		} else {
			resizeTypeLayout.hide();
		}
	}

	// X Origin
	protected get originX(): DInputReal {
		return (this._originX ??= this.newOriginX());
	}

	protected newOriginX(): DInputReal {
		return new DInputReal({
			weight: 1,
			text: {
				value: 0.5
			},
			step: 0.1,
			on: {
				enter: (): void => {
					this.ok();
				}
			}
		});
	}

	protected get originXLayout(): DLayoutHorizontal {
		return (this._originXLayout ??= this.newLabeled(
			this.theme.getInputOriginXLabel(),
			this.originX
		));
	}

	protected onChangeOriginXLayout(select: number | null): void {
		const originXLayout = this.originXLayout;
		if (select === EShapeActionValueType.TRANSFORM) {
			const transformType = this.transformType.value;
			if (transformType === EShapeActionValueTransformType.RESIZE) {
				const resizeType = this.resizeType.value;
				if (
					resizeType === EShapeActionValueTransformResizeType.ABSOLUTE_SIZE ||
					resizeType === EShapeActionValueTransformResizeType.RELATIVE_SIZE ||
					resizeType === EShapeActionValueTransformResizeType.ABSOLUTE_WIDTH ||
					resizeType === EShapeActionValueTransformResizeType.RELATIVE_WIDTH
				) {
					originXLayout.show();
				} else {
					originXLayout.hide();
				}
			} else if (transformType === EShapeActionValueTransformType.ROTATE) {
				originXLayout.show();
			} else {
				originXLayout.hide();
			}
		} else {
			originXLayout.hide();
		}
	}

	// Y Origin
	protected get originY(): DInputReal {
		return (this._originY ??= this.newOriginY());
	}

	protected newOriginY(): DInputReal {
		return new DInputReal({
			weight: 1,
			text: {
				value: 0.5
			},
			step: 0.1,
			on: {
				enter: (): void => {
					this.ok();
				}
			}
		});
	}

	protected get originYLayout(): DLayoutHorizontal {
		return (this._originYLayout ??= this.newLabeled(
			this.theme.getInputOriginYLabel(),
			this.originY
		));
	}

	protected onChangeOriginYLayout(select: number | null): void {
		const originYLayout = this.originYLayout;
		if (select === EShapeActionValueType.TRANSFORM) {
			const transformType = this.transformType.value;
			if (transformType === EShapeActionValueTransformType.RESIZE) {
				const resizeType = this.resizeType.value;
				if (
					resizeType === EShapeActionValueTransformResizeType.ABSOLUTE_SIZE ||
					resizeType === EShapeActionValueTransformResizeType.RELATIVE_SIZE ||
					resizeType === EShapeActionValueTransformResizeType.ABSOLUTE_HEIGHT ||
					resizeType === EShapeActionValueTransformResizeType.RELATIVE_HEIGHT
				) {
					originYLayout.show();
				} else {
					originYLayout.hide();
				}
			} else if (transformType === EShapeActionValueTransformType.ROTATE) {
				originYLayout.show();
			} else {
				originYLayout.hide();
			}
		} else {
			originYLayout.hide();
		}
	}

	// Select move type
	protected get moveType(): DSelect<EShapeActionValueTransformMoveType> {
		return (this._moveType ??= this.newMoveType());
	}

	protected newMoveType(): DSelect<EShapeActionValueTransformMoveType> {
		const themeShape = this.themeShape;
		return new DSelect<EShapeActionValueTransformMoveType>({
			weight: 1,
			value: EShapeActionValueTransformMoveType.RELATIVE_X,
			menu: {
				items: [
					{
						value: EShapeActionValueTransformMoveType.RELATIVE_X,
						text: {
							value: themeShape.toTransformMoveTypeLabel(
								EShapeActionValueTransformMoveType.RELATIVE_X
							)
						}
					},
					{
						value: EShapeActionValueTransformMoveType.RELATIVE_Y,
						text: {
							value: themeShape.toTransformMoveTypeLabel(
								EShapeActionValueTransformMoveType.RELATIVE_Y
							)
						}
					},
					{
						value: EShapeActionValueTransformMoveType.ABSOLUTE_X,
						text: {
							value: themeShape.toTransformMoveTypeLabel(
								EShapeActionValueTransformMoveType.ABSOLUTE_X
							)
						}
					},
					{
						value: EShapeActionValueTransformMoveType.ABSOLUTE_Y,
						text: {
							value: themeShape.toTransformMoveTypeLabel(
								EShapeActionValueTransformMoveType.ABSOLUTE_Y
							)
						}
					},
					{
						value: EShapeActionValueTransformMoveType.FORWARD_OR_BACKWARD,
						text: {
							value: themeShape.toTransformMoveTypeLabel(
								EShapeActionValueTransformMoveType.FORWARD_OR_BACKWARD
							)
						}
					},
					{
						value: EShapeActionValueTransformMoveType.LEFT_OR_RIGHT,
						text: {
							value: themeShape.toTransformMoveTypeLabel(
								EShapeActionValueTransformMoveType.LEFT_OR_RIGHT
							)
						}
					}
				]
			}
		});
	}

	protected get moveTypeLayout(): DLayoutHorizontal {
		return (this._moveTypeLayout ??= this.newLabeled(null, this.moveType));
	}

	protected onChangeMoveTypeLayout(select: number | null): void {
		const moveTypeLayout = this.moveTypeLayout;
		if (select === EShapeActionValueType.TRANSFORM) {
			if (this.transformType.value === EShapeActionValueTransformType.MOVE) {
				moveTypeLayout.show();
			} else {
				moveTypeLayout.hide();
			}
		} else {
			moveTypeLayout.hide();
		}
	}

	// Select open type
	protected get openType(): DSelect<EShapeActionValueOpenType> {
		return (this._openType ??= this.newOpenType());
	}

	protected newOpenType(): DSelect<EShapeActionValueOpenType> {
		return new DSelect<EShapeActionValueOpenType>({
			weight: 1,
			value: EShapeActionValueOpenType.DIAGRAM,
			menu: {
				items: this.newOpenTypeMenuItems()
			}
		});
	}

	protected newOpenTypeMenuItems(): DMenuItemOptionsUnion<EShapeActionValueOpenType>[] {
		const themeShape = this.themeShape;
		const result: DMenuItemOptionsUnion<EShapeActionValueOpenType>[] = [
			{
				value: EShapeActionValueOpenType.DIAGRAM,
				text: {
					value: themeShape.toOpenTypeLabel(EShapeActionValueOpenType.DIAGRAM)
				}
			},
			{
				value: EShapeActionValueOpenType.PAGE,
				text: {
					value: themeShape.toOpenTypeLabel(EShapeActionValueOpenType.PAGE)
				}
			},
			{
				value: EShapeActionValueOpenType.DIALOG,
				text: {
					value: themeShape.toOpenTypeLabel(EShapeActionValueOpenType.DIALOG)
				}
			}
		];
		EShapeActionOpenExtensions.each((extension: EShapeActionOpenExtension): void => {
			result.push({
				value: extension.type,
				text: {
					value: extension.label
				}
			});
		});
		return result;
	}

	protected get openTypeLayout(): DLayoutHorizontal {
		return (this._openTypeLayout ??= this.newLabeled(null, this.openType));
	}

	protected onChangeOpenTypeLayout(select: number | null): void {
		const openTypeLayout = this.openTypeLayout;
		if (select === EShapeActionValueType.OPEN) {
			openTypeLayout.show();
		} else {
			openTypeLayout.hide();
		}
	}

	// Select open dialog type
	protected get openDialogType(): DSelect<EShapeActionValueOpenDialogType> {
		return (this._openDialogType ??= this.newOpenDialogType());
	}

	protected newOpenDialogType(): DSelect<EShapeActionValueOpenDialogType> {
		return new DSelect<EShapeActionValueOpenDialogType>({
			weight: 1,
			value: EShapeActionValueOpenDialogType.TEXT,
			menu: {
				items: this.newOpenDialogTypeMenuItems()
			}
		});
	}

	protected newOpenDialogTypeMenuItems(): DMenuItemOptionsUnion<EShapeActionValueOpenDialogType>[] {
		const themeShape = this.themeShape;
		const result: DMenuItemOptionsUnion<EShapeActionValueOpenDialogType>[] = [
			{
				value: EShapeActionValueOpenDialogType.TEXT,
				text: {
					value: themeShape.toOpenDialogTypeLabel(EShapeActionValueOpenDialogType.TEXT)
				}
			},
			{
				value: EShapeActionValueOpenDialogType.INTEGER,
				text: {
					value: themeShape.toOpenDialogTypeLabel(EShapeActionValueOpenDialogType.INTEGER)
				}
			},
			{
				value: EShapeActionValueOpenDialogType.REAL,
				text: {
					value: themeShape.toOpenDialogTypeLabel(EShapeActionValueOpenDialogType.REAL)
				}
			},
			{
				value: EShapeActionValueOpenDialogType.BOOLEAN,
				text: {
					value: themeShape.toOpenDialogTypeLabel(EShapeActionValueOpenDialogType.BOOLEAN)
				}
			},
			{
				value: EShapeActionValueOpenDialogType.DATE,
				text: {
					value: themeShape.toOpenDialogTypeLabel(EShapeActionValueOpenDialogType.DATE)
				}
			},
			{
				value: EShapeActionValueOpenDialogType.TIME,
				text: {
					value: themeShape.toOpenDialogTypeLabel(EShapeActionValueOpenDialogType.TIME)
				}
			},
			{
				value: EShapeActionValueOpenDialogType.DATETIME,
				text: {
					value: themeShape.toOpenDialogTypeLabel(
						EShapeActionValueOpenDialogType.DATETIME
					)
				}
			}
		];
		EShapeActionOpenDialogExtensions.each((extension): void => {
			result.push({
				value: extension.type,
				text: {
					value: extension.label
				}
			});
		});
		return result;
	}

	protected get openDialogTypeLayout(): DLayoutHorizontal {
		return (this._openDialogTypeLayout ??= this.newLabeled(null, this.openDialogType));
	}

	protected onChangeOpenDialogTypeLayout(select: number | null): void {
		const openDialogTypeLayout = this.openDialogTypeLayout;
		if (select === EShapeActionValueType.OPEN) {
			if (this.openType.value === EShapeActionValueOpenType.DIALOG) {
				openDialogTypeLayout.show();
			} else {
				openDialogTypeLayout.hide();
			}
		} else {
			openDialogTypeLayout.hide();
		}
	}

	// Select change text type
	protected get changeTextType(): DSelect<EShapeActionValueChangeTextType> {
		return (this._changeTextType ??= this.newChangeTextType());
	}

	protected newChangeTextType(): DSelect<EShapeActionValueChangeTextType> {
		const themeShape = this.themeShape;
		return new DSelect<EShapeActionValueChangeTextType>({
			weight: 1,
			value: EShapeActionValueChangeTextType.TEXT,
			menu: {
				items: [
					{
						value: EShapeActionValueChangeTextType.TEXT,
						text: {
							value: themeShape.toChangeTextTypeLabel(
								EShapeActionValueChangeTextType.TEXT
							)
						}
					},
					{
						value: EShapeActionValueChangeTextType.NUMBER,
						text: {
							value: themeShape.toChangeTextTypeLabel(
								EShapeActionValueChangeTextType.NUMBER
							)
						}
					}
				]
			}
		});
	}

	protected get changeTextTypeLayout(): DLayoutHorizontal {
		return (this._changeTextTypeLayout ??= this.newLabeled(null, this.changeTextType));
	}

	protected onChangeChangeTextTypeLayout(select: number | null): void {
		const changeTextTypeLayout = this.changeTextTypeLayout;
		if (select === EShapeActionValueType.CHANGE_TEXT) {
			changeTextTypeLayout.show();
		} else {
			changeTextTypeLayout.hide();
		}
	}

	// Select misc. type
	protected get miscType(): DSelect<EShapeActionValueMiscType> {
		return (this._miscType ??= this.newMiscType());
	}

	protected newMiscType(): DSelect<EShapeActionValueMiscType> {
		return new DSelect<EShapeActionValueMiscType>({
			weight: 1,
			value: EShapeActionValueMiscType.INPUT_TEXT,
			menu: {
				items: this.newMiscTypeMenuItems()
			}
		});
	}

	protected newMiscTypeMenuItems(): DMenuItemOptionsUnion<EShapeActionValueMiscType>[] {
		const themeShape = this.themeShape;
		const result: DMenuItemOptionsUnion<EShapeActionValueMiscType>[] = [
			{
				value: EShapeActionValueMiscType.INPUT_TEXT,
				text: {
					value: themeShape.toMiscTypeLabel(EShapeActionValueMiscType.INPUT_TEXT)
				}
			},
			{
				value: EShapeActionValueMiscType.INPUT_INTEGER,
				text: {
					value: themeShape.toMiscTypeLabel(EShapeActionValueMiscType.INPUT_INTEGER)
				}
			},
			{
				value: EShapeActionValueMiscType.INPUT_REAL,
				text: {
					value: themeShape.toMiscTypeLabel(EShapeActionValueMiscType.INPUT_REAL)
				}
			},
			{
				value: EShapeActionValueMiscType.EMIT_EVENT,
				text: {
					value: themeShape.toMiscTypeLabel(EShapeActionValueMiscType.EMIT_EVENT)
				}
			},
			{
				value: EShapeActionValueMiscType.WRITE_BOTH,
				text: {
					value: themeShape.toMiscTypeLabel(EShapeActionValueMiscType.WRITE_BOTH)
				}
			},
			{
				value: EShapeActionValueMiscType.WRITE_LOCAL,
				text: {
					value: themeShape.toMiscTypeLabel(EShapeActionValueMiscType.WRITE_LOCAL)
				}
			},
			{
				value: EShapeActionValueMiscType.WRITE_REMOTE,
				text: {
					value: themeShape.toMiscTypeLabel(EShapeActionValueMiscType.WRITE_REMOTE)
				}
			},
			{
				value: EShapeActionValueMiscType.HTML_ELEMENT,
				text: {
					value: themeShape.toMiscTypeLabel(EShapeActionValueMiscType.HTML_ELEMENT)
				}
			},
			{
				value: EShapeActionValueMiscType.EXECUTE,
				text: {
					value: themeShape.toMiscTypeLabel(EShapeActionValueMiscType.EXECUTE)
				}
			}
		];
		EShapeActionMiscExtensions.each((extension): void => {
			result.push({
				value: extension.type,
				text: {
					value: extension.label
				}
			});
		});
		return result;
	}

	protected get miscTypeLayout(): DLayoutHorizontal {
		return (this._miscTypeLayout ??= this.newLabeled(null, this.miscType));
	}

	protected onChangeMiscTypeLayout(select: number | null): void {
		const miscTypeLayout = this.miscTypeLayout;
		if (select === EShapeActionValueType.MISC) {
			miscTypeLayout.show();
		} else {
			miscTypeLayout.hide();
		}
	}

	// OnInput Action type
	protected get onInputAction(): DSelect<EShapeActionValueOnInputAction> {
		return (this._onInputAction ??= this.newOnInputAction());
	}

	protected newOnInputAction(): DSelect<EShapeActionValueOnInputAction> {
		const themeShape = this.themeShape;
		return new DSelect<EShapeActionValueOnInputAction>({
			weight: 1,
			value: EShapeActionValueOnInputAction.WRITE_REMOTE,
			menu: {
				items: [
					{
						value: EShapeActionValueOnInputAction.EMIT_EVENT,
						text: {
							value: themeShape.toOnInputActionLabel(
								EShapeActionValueOnInputAction.EMIT_EVENT
							)
						}
					},
					{
						value: EShapeActionValueOnInputAction.WRITE_BOTH,
						text: {
							value: themeShape.toOnInputActionLabel(
								EShapeActionValueOnInputAction.WRITE_BOTH
							)
						}
					},
					{
						value: EShapeActionValueOnInputAction.WRITE_LOCAL,
						text: {
							value: themeShape.toOnInputActionLabel(
								EShapeActionValueOnInputAction.WRITE_LOCAL
							)
						}
					},
					{
						value: EShapeActionValueOnInputAction.WRITE_REMOTE,
						text: {
							value: themeShape.toOnInputActionLabel(
								EShapeActionValueOnInputAction.WRITE_REMOTE
							)
						}
					}
				]
			}
		});
	}

	protected get onInputActionLayout(): DLayoutHorizontal {
		return (this._onInputActionLayout ??= this.newLabeled(null, this.onInputAction));
	}

	protected onChangeOnInputActionLayout(select: number | null): void {
		const onInputActionLayout = this.onInputActionLayout;
		if (select === EShapeActionValueType.OPEN) {
			switch (this.openType.value) {
				case EShapeActionValueOpenType.DIALOG_TEXT:
				case EShapeActionValueOpenType.DIALOG_INTEGER:
				case EShapeActionValueOpenType.DIALOG_REAL:
				case EShapeActionValueOpenType.DIALOG_BOOLEAN:
					onInputActionLayout.show();
					break;
				case EShapeActionValueOpenType.DIALOG:
					const openDialogType = this.openDialogType.value;
					if (openDialogType == null) {
						onInputActionLayout.hide();
					} else if (EShapeActionValueOpenDialogType.EXTENSION <= openDialogType) {
						onInputActionLayout.hide();
					} else {
						onInputActionLayout.show();
					}
					break;
				default:
					onInputActionLayout.hide();
					break;
			}
		} else if (select === EShapeActionValueType.MISC) {
			switch (this.miscType.value) {
				case EShapeActionValueMiscType.INPUT_TEXT:
				case EShapeActionValueMiscType.INPUT_INTEGER:
				case EShapeActionValueMiscType.INPUT_REAL:
					onInputActionLayout.show();
					break;
				default:
					onInputActionLayout.hide();
					break;
			}
		} else {
			onInputActionLayout.hide();
		}
	}

	// Select when type
	protected get whenType(): DSelect<UtilHtmlElementWhen> {
		return (this._whenType ??= this.newWhenType());
	}

	protected newWhenType(): DSelect<UtilHtmlElementWhen> {
		const themeShape = this.themeShape;
		return new DSelect<UtilHtmlElementWhen>({
			weight: 1,
			value: UtilHtmlElementWhen.FOCUSED,
			menu: {
				items: [
					{
						value: UtilHtmlElementWhen.CLICKED,
						text: {
							value: themeShape.toHtmlElementWhenLabel(UtilHtmlElementWhen.CLICKED)
						}
					},
					{
						value: UtilHtmlElementWhen.DOUBLE_CLICKED,
						text: {
							value: themeShape.toHtmlElementWhenLabel(
								UtilHtmlElementWhen.DOUBLE_CLICKED
							)
						}
					},
					{
						value: UtilHtmlElementWhen.FOCUSED,
						text: {
							value: themeShape.toHtmlElementWhenLabel(UtilHtmlElementWhen.FOCUSED)
						}
					},
					{
						value: UtilHtmlElementWhen.ALWAYS,
						text: {
							value: themeShape.toHtmlElementWhenLabel(UtilHtmlElementWhen.ALWAYS)
						}
					}
				]
			}
		});
	}

	protected get whenTypeLayout(): DLayoutHorizontal {
		return (this._whenTypeLayout ??= this.newLabeled(
			this.theme.getSelectWhenLabel(),
			this.whenType
		));
	}

	protected toWhenTypeValue(whenType: UtilHtmlElementWhen | null): string {
		switch (whenType) {
			case UtilHtmlElementWhen.CLICKED:
				return '"CLICKED"';
			case UtilHtmlElementWhen.DOUBLE_CLICKED:
				return '"DOUBLE_CLICKED"';
			case UtilHtmlElementWhen.FOCUSED:
				return '"FOCUSED"';
			case UtilHtmlElementWhen.ALWAYS:
				return '"ALWAYS"';
		}
		return '"FOCUSED"';
	}

	protected toWhenType(whenTypeValue: string): UtilHtmlElementWhen | null {
		switch (whenTypeValue) {
			case '"CLICKED"':
				return UtilHtmlElementWhen.CLICKED;
			case '"DOUBLE_CLICKED"':
				return UtilHtmlElementWhen.DOUBLE_CLICKED;
			case '"FOCUSED"':
				return UtilHtmlElementWhen.FOCUSED;
			case '"ALWAYS"':
				return UtilHtmlElementWhen.ALWAYS;
		}
		return UtilHtmlElementWhen.FOCUSED;
	}

	protected onChangeWhenTypeLayout(select: number | null): void {
		const whenTypeLayout = this.whenTypeLayout;
		if (select === EShapeActionValueType.MISC) {
			switch (this.miscType.value) {
				case EShapeActionValueMiscType.INPUT_TEXT:
				case EShapeActionValueMiscType.INPUT_INTEGER:
				case EShapeActionValueMiscType.INPUT_REAL:
				case EShapeActionValueMiscType.HTML_ELEMENT:
				case EShapeActionValueMiscType.HTML_ELEMENT_WITHOUT_POINTER_EVENTS:
					whenTypeLayout.show();
					break;
				default:
					whenTypeLayout.hide();
					break;
			}
		} else {
			whenTypeLayout.hide();
		}
	}

	protected get gestureType(): DSelect<EShapeActionValueGestureType> {
		return (this._gestureType ??= this.newGestureType());
	}

	protected newGestureType(): DSelect<EShapeActionValueGestureType> {
		const themeShape = this.themeShape;
		return new DSelect<EShapeActionValueGestureType>({
			weight: 1,
			value: EShapeActionValueGestureType.SHAPE,
			menu: {
				items: [
					{
						value: EShapeActionValueGestureType.SHAPE,
						text: {
							value: themeShape.toGestureTypeLabel(EShapeActionValueGestureType.SHAPE)
						}
					},
					{
						value: EShapeActionValueGestureType.LAYER,
						text: {
							value: themeShape.toGestureTypeLabel(EShapeActionValueGestureType.LAYER)
						}
					}
				]
			}
		});
	}

	protected get gestureTypeLayout(): DLayoutHorizontal {
		return (this._gestureTypeLayout ??= this.newLabeled("", this.gestureType));
	}

	protected onChangeGestureTypeLayout(select: number | null): void {
		const gestureTypeLayout = this.gestureTypeLayout;
		if (select === EShapeActionValueType.GESTURE) {
			gestureTypeLayout.show();
		} else {
			gestureTypeLayout.hide();
		}
	}

	protected get gestureOperationType(): DSelectMultiple<EShapeActionValueGestureOperationType> {
		return (this._gestureOperationType ??= this.newGestureOperationType());
	}

	protected newGestureOperationType(): DSelectMultiple<EShapeActionValueGestureOperationType> {
		const themeShape = this.themeShape;
		return new DSelectMultiple<EShapeActionValueGestureOperationType>({
			weight: 1,
			values: this.fromGestureOperationType(EShapeActionValueGestureOperationType.ALL),
			menu: {
				items: [
					{
						value: EShapeActionValueGestureOperationType.DRAG,
						text: {
							value: themeShape.toGestureOperationTypeLabel(
								EShapeActionValueGestureOperationType.DRAG
							)
						},
						check: true
					},
					{
						value: EShapeActionValueGestureOperationType.PINCH,
						text: {
							value: themeShape.toGestureOperationTypeLabel(
								EShapeActionValueGestureOperationType.PINCH
							)
						},
						check: true
					}
				]
			}
		});
	}

	protected toGestureOperationType(
		types: EShapeActionValueGestureOperationType[]
	): EShapeActionValueGestureOperationType {
		let result = EShapeActionValueGestureOperationType.NONE;
		for (let i = 0, imax = types.length; i < imax; ++i) {
			result |= types[i];
		}
		return result;
	}

	protected fromGestureOperationType(
		type: EShapeActionValueGestureOperationType
	): EShapeActionValueGestureOperationType[] {
		const result: EShapeActionValueGestureOperationType[] = [];
		if (type & EShapeActionValueGestureOperationType.DRAG) {
			result.push(EShapeActionValueGestureOperationType.DRAG);
		}
		if (type & EShapeActionValueGestureOperationType.PINCH) {
			result.push(EShapeActionValueGestureOperationType.PINCH);
		}
		return result;
	}

	protected get gestureOperationTypeLayout(): DLayoutHorizontal {
		return (this._gestureOperationTypeLayout ??= this.newLabeled(
			"",
			this.gestureOperationType
		));
	}

	protected onChangeGestureOperationTypeLayout(select: number | null): void {
		const gestureOperationTypeLayout = this.gestureOperationTypeLayout;
		if (select === EShapeActionValueType.GESTURE) {
			gestureOperationTypeLayout.show();
		} else {
			gestureOperationTypeLayout.hide();
		}
	}

	get selectLayer(): DSelectMultiple<number> {
		return (this._selectLayer ??= this.newSelectLayer());
	}

	protected newSelectLayer(): DSelectMultiple<number> {
		return new DSelectMultiple<number>({
			weight: 1
		});
	}

	protected newSelectLayerMenuItemOptions(): DMenuItemOptions<number>[] {
		const diagram = this.options?.diagram;
		if (diagram != null) {
			const canvas = diagram.canvas;
			if (canvas != null) {
				const result: Array<DMenuItemCheckOptions<number>> = [];
				const layers = canvas.layer.children;
				for (let i = layers.length - 1; 0 <= i; --i) {
					const layer = layers[i];
					result.push({
						value: i,
						text: {
							value: layer.name
						},
						check: true
					});
				}
				return result;
			}
		}
		return [];
	}

	protected get selectLayerLayout(): DLayoutHorizontal {
		return (this._selectLayerLayout ??= this.newLabeled(
			this.theme.getSelectLayerLabel(),
			this.selectLayer
		));
	}

	protected onChangeSelectLayerLayout(select: number | null): void {
		const selectLayerLayout = this.selectLayerLayout;
		if (select === EShapeActionValueType.SHOW_HIDE) {
			switch (this.showHideType.value) {
				case EShapeActionValueShowHideType.LAYER:
					selectLayerLayout.show();
					break;
				default:
					selectLayerLayout.hide();
					break;
			}
		} else {
			selectLayerLayout.hide();
		}
	}

	// Condition
	protected get condition(): DInputTextAndLabel {
		return (this._condition ??= this.newCondition());
	}

	protected newCondition(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
			label: {
				width: 60,
				text: {
					value: this.theme.getInputConditionLabel()
				}
			},
			input: {
				weight: 1,
				on: {
					enter: () => {
						this.ok();
					}
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected onChangeCondition(select: number | null): void {
		const condition = this.condition;
		if (select === EShapeActionValueType.MISC) {
			switch (this.miscType.value) {
				case EShapeActionValueMiscType.INPUT_TEXT:
				case EShapeActionValueMiscType.INPUT_INTEGER:
				case EShapeActionValueMiscType.INPUT_REAL:
				case EShapeActionValueMiscType.HTML_ELEMENT:
				case EShapeActionValueMiscType.HTML_ELEMENT_WITHOUT_POINTER_EVENTS:
					condition.hide();
					break;
				default:
					condition.show();
					break;
			}
		} else {
			condition.show();
		}
	}

	// Interval
	protected get interval(): DInputInteger {
		return (this._interval ??= this.newInterval());
	}

	protected newInterval(): DInputInteger {
		return new DInputInteger({
			weight: 1,
			text: {
				value: 1000
			},
			min: 0,
			step: 100,
			on: {
				enter: () => {
					this.ok();
				}
			}
		});
	}

	protected get intervalLayout(): DLayoutHorizontal {
		return (this._intervalLayout ??= this.newIntervalLayout());
	}

	protected newIntervalLayout(): DLayoutHorizontal {
		const theme = this.theme;
		return new DLayoutHorizontal({
			width: "padding",
			height: "auto",
			children: [
				this.newLabel(theme.getInputIntervalLabel()),
				this.interval,
				new DText<string>({
					width: 60,
					text: {
						value: theme.getInputIntervalUnitLabel(),
						align: {
							horizontal: DAlignHorizontal.LEFT
						}
					}
				})
			]
		});
	}

	protected onChangeIntervalLayout(select: number | null): void {
		const intervalLayout = this.intervalLayout;
		if (select === EShapeActionValueType.BLINK) {
			intervalLayout.show();
		} else {
			intervalLayout.hide();
		}
	}

	// Size
	protected get size(): DInputTextAndLabel {
		return (this._size ??= this.newSize());
	}

	protected newSize(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
			label: {
				width: 60,
				text: {
					value: this.theme.getInputSizeLabel()
				}
			},
			input: {
				weight: 1,
				on: {
					enter: () => {
						this.ok();
					}
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected onChangeSize(select: number | null): void {
		const size = this.size;
		if (select === EShapeActionValueType.TRANSFORM) {
			if (this.transformType.value === EShapeActionValueTransformType.RESIZE) {
				size.show();
			} else {
				size.hide();
			}
		} else {
			size.hide();
		}
	}

	// Move amount
	protected get amount(): DInputTextAndLabel {
		return (this._amount ??= this.newAmount());
	}

	protected newAmount(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
			label: {
				width: 60,
				text: {
					value: this.theme.getInputAmountLabel()
				}
			},
			input: {
				weight: 1,
				on: {
					enter: () => {
						this.ok();
					}
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected onChangeAmount(select: number | null): void {
		const amount = this.amount;
		if (select === EShapeActionValueType.TRANSFORM) {
			const transformType = this.transformType.value;
			if (
				transformType === EShapeActionValueTransformType.MOVE ||
				transformType === EShapeActionValueTransformType.ROTATE
			) {
				amount.show();
			} else {
				amount.hide();
			}
		} else {
			amount.hide();
		}
	}

	// Value
	protected get contents(): DInputTextAndLabel {
		return (this._contents ??= this.newContents());
	}

	protected newContents(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
			label: {
				width: 60,
				text: {
					value: this.theme.getInputValueLabel()
				}
			},
			input: {
				weight: 1,
				on: {
					enter: () => {
						this.ok();
					}
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected onChangeContents(select: number | null): void {
		const contents = this.contents;
		if (select === EShapeActionValueType.CHANGE_TEXT) {
			contents.show();
		} else if (select === EShapeActionValueType.MISC) {
			switch (this.miscType.value) {
				case EShapeActionValueMiscType.WRITE_BOTH:
				case EShapeActionValueMiscType.WRITE_LOCAL:
				case EShapeActionValueMiscType.WRITE_REMOTE:
					contents.show();
					break;
				default:
					contents.hide();
					break;
			}
		} else {
			contents.hide();
		}
	}

	// Initialization
	protected get initialization(): DInputTextAndLabel {
		return (this._initialization ??= this.newInitialization());
	}

	protected newInitialization(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
			label: {
				width: 60,
				text: {
					value: this.theme.getInputInitializationLabel()
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

	protected onChangeInitialization(select: number | null): void {
		const initialization = this.initialization;
		if (select === EShapeActionValueType.MISC) {
			switch (this.miscType.value) {
				case EShapeActionValueMiscType.HTML_ELEMENT:
				case EShapeActionValueMiscType.HTML_ELEMENT_WITHOUT_POINTER_EVENTS:
					initialization.show();
					break;
				default:
					initialization.hide();
					break;
			}
		} else {
			initialization.hide();
		}
	}

	// Pointer events layout
	protected get pointerEventsLayout(): DLayoutHorizontal {
		return (this._pointerEventsLayout ??= this.newLabeled(null, this.pointerEvents));
	}

	protected onChangePointerEventsLayout(select: number | null): void {
		const pointerEventsLayout = this.pointerEventsLayout;
		if (select === EShapeActionValueType.MISC) {
			switch (this.miscType.value) {
				case EShapeActionValueMiscType.HTML_ELEMENT:
				case EShapeActionValueMiscType.HTML_ELEMENT_WITHOUT_POINTER_EVENTS:
					pointerEventsLayout.show();
					break;
				default:
					pointerEventsLayout.hide();
					break;
			}
		} else {
			pointerEventsLayout.hide();
		}
	}

	// Pointer events
	protected get pointerEvents(): DButtonCheck<string> {
		return (this._pointerEvents ??= this.newPointerEvents());
	}

	protected newPointerEvents(): DButtonCheck<string> {
		return new DButtonCheck<string>({
			weight: 1,
			text: {
				value: this.theme.getCheckPointEventsLabel(),
				align: {
					horizontal: "LEFT"
				}
			}
		});
	}

	// Event Name / Cursor name
	protected get targetName(): DInputTextAndLabel {
		return (this._targetName ??= this.newTargetName());
	}

	protected newTargetName(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
			label: {
				width: 60,
				text: {
					value: this.theme.getInputTargetNameLabel()
				}
			},
			input: {
				weight: 1,
				on: {
					enter: () => {
						this.ok();
					}
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected onChangeTargetName(select: number | null): void {
		const targetName = this.targetName;
		if (
			select === EShapeActionValueType.EMIT_EVENT ||
			select === EShapeActionValueType.CHANGE_CURSOR
		) {
			targetName.show();
		} else {
			targetName.hide();
		}
	}

	// Color
	protected get color(): DButtonColor {
		return (this._color ??= this.newColor());
	}

	protected newColor(): DButtonColor {
		const result = new DButtonColor({
			weight: 1
		});
		result.dialog.on("open", () => {
			const dialogNew = result.dialog.new;
			const dialogCurrent = result.dialog.current;
			dialogNew.color = dialogCurrent.color;
			dialogNew.alpha = dialogCurrent.alpha;
		});
		return result;
	}

	protected get colorLayout(): DLayoutHorizontal {
		return (this._colorLayout ??= this.newColorLayout());
	}

	protected newColorLayout(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "padding",
			height: "auto",
			children: [
				new DInputLabel({
					width: 60,
					text: {
						value: this.theme.getButtonColorLabel()
					}
				}),
				this.color,
				new DLayoutSpace({
					width: 60
				})
			]
		});
	}

	protected onChangeColorLayout(select: number | null): void {
		const colorLayout = this.colorLayout;
		if (select === EShapeActionValueType.CHANGE_COLOR) {
			const changeColorTarget = this.changeColorTarget.value;
			if (
				changeColorTarget === EShapeActionValueChangeColorTarget.COLOR_AND_ALPHA ||
				changeColorTarget === EShapeActionValueChangeColorTarget.COLOR ||
				changeColorTarget === EShapeActionValueChangeColorTarget.ALPHA
			) {
				colorLayout.show();
			} else {
				colorLayout.hide();
			}
		} else if (select === EShapeActionValueType.BLINK) {
			const blinkType = this.blinkType.value;
			if (
				blinkType === EShapeActionValueBlinkType.COLOR_FILL ||
				blinkType === EShapeActionValueBlinkType.COLOR_STROKE
			) {
				colorLayout.show();
			} else {
				colorLayout.hide();
			}
		} else {
			colorLayout.hide();
		}
	}

	// Target
	protected get target(): DInputTextAndLabel {
		return (this._target ??= this.newTarget());
	}

	protected newTarget(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
			label: {
				width: 60,
				text: {
					value: this.theme.getInputTargetLabel()
				}
			},
			input: {
				weight: 1,
				on: {
					enter: () => {
						this.ok();
					}
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected onChangeTarget(select: number | null): void {
		const target = this.target;
		if (select === EShapeActionValueType.OPEN) {
			target.show();
		} else if (select === EShapeActionValueType.MISC) {
			const miscType = this.miscType.value;
			if (miscType == null) {
				target.show();
			} else if (
				miscType === EShapeActionValueMiscType.HTML_ELEMENT ||
				miscType === EShapeActionValueMiscType.HTML_ELEMENT_WITHOUT_POINTER_EVENTS ||
				EShapeActionValueMiscType.EXTENSION <= miscType
			) {
				target.hide();
			} else {
				target.show();
			}
		} else {
			target.hide();
		}
	}

	// Argument
	protected get argument(): DInputTextAndLabel {
		return (this._argument ??= this.newArgument());
	}

	protected newArgument(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
			label: {
				width: 60,
				text: {
					value: this.theme.getInputArgumentLabel()
				}
			},
			input: {
				weight: 1,
				on: {
					enter: () => {
						this.ok();
					}
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected onChangeArgument(select: number | null): void {
		const argument = this.argument;
		if (select === EShapeActionValueType.OPEN) {
			const openType = this.openType.value;
			if (openType === EShapeActionValueOpenType.DIALOG) {
				const openDialogType = this.openDialogType.value;
				if (openDialogType == null) {
					argument.hide();
				} else if (EShapeActionValueOpenDialogType.EXTENSION <= openDialogType) {
					argument.show();
				} else {
					argument.hide();
				}
			} else {
				argument.hide();
			}
		} else if (select === EShapeActionValueType.MISC) {
			const miscType = this.miscType.value;
			if (miscType != null && EShapeActionValueMiscType.EXTENSION <= miscType) {
				argument.show();
			} else {
				argument.hide();
			}
		} else {
			argument.hide();
		}
	}

	// Color code
	protected get colorCode(): DInputTextAndLabel {
		return (this._colorCode ??= this.newColorCode());
	}

	protected newColorCode(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
			label: {
				width: 60,
				text: {
					value: this.theme.getInputColorCodeLabel()
				}
			},
			input: {
				weight: 1,
				text: {
					value: ""
				},
				on: {
					enter: () => {
						this.ok();
					}
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected onChangeColorCode(select: number | null): void {
		const colorCode = this.colorCode;
		if (select === EShapeActionValueType.CHANGE_COLOR) {
			if (this.changeColorTarget.value === EShapeActionValueChangeColorTarget.CODE) {
				colorCode.show();
			} else {
				colorCode.hide();
			}
		} else {
			colorCode.hide();
		}
	}

	// Alpha code
	protected get alphaCode(): DInputTextAndLabel {
		return (this._alphaCode ??= this.newAlphaCode());
	}

	protected newAlphaCode(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
			input: {
				weight: 1,
				on: {
					enter: () => {
						this.ok();
					}
				}
			},
			label: {
				width: 60,
				text: {
					value: this.theme.getInputAlphaCodeLabel()
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected onChangeAlphaCode(select: number | null): void {
		const alphaCode = this.alphaCode;
		if (select === EShapeActionValueType.CHANGE_COLOR) {
			if (this.changeColorTarget.value === EShapeActionValueChangeColorTarget.CODE) {
				alphaCode.show();
			} else {
				alphaCode.hide();
			}
		} else {
			alphaCode.hide();
		}
	}

	// Brightness
	protected get brightness(): DInputTextAndLabel {
		return (this._brightness ??= this.newBrightness());
	}

	protected newBrightness(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
			input: {
				weight: 1,
				on: {
					enter: () => {
						this.ok();
					}
				}
			},
			label: {
				width: 60,
				text: {
					value: this.theme.getInputBrightnessLabel()
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected onChangeBrightness(select: number | null): void {
		const brightness = this.brightness;
		if (select === EShapeActionValueType.CHANGE_COLOR) {
			if (this.changeColorTarget.value === EShapeActionValueChangeColorTarget.BRIGHTNESS) {
				brightness.show();
			} else {
				brightness.hide();
			}
		} else {
			brightness.hide();
		}
	}

	// Blend
	protected get blend(): DInputTextAndLabel {
		return (this._blend ??= this.newBlend());
	}

	protected newBlend(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
			label: {
				width: 60,
				text: {
					value: this.theme.getInputBlendLabel()
				}
			},
			input: {
				weight: 1,
				on: {
					enter: () => {
						this.ok();
					}
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected onChangeBlend(select: number | null): void {
		const blend = this.blend;
		if (select === EShapeActionValueType.CHANGE_COLOR) {
			const changeColorTarget = this.changeColorTarget.value;
			if (
				changeColorTarget === EShapeActionValueChangeColorTarget.COLOR_AND_ALPHA ||
				changeColorTarget === EShapeActionValueChangeColorTarget.COLOR ||
				changeColorTarget === EShapeActionValueChangeColorTarget.ALPHA ||
				changeColorTarget === EShapeActionValueChangeColorTarget.CODE
			) {
				blend.show();
			} else {
				blend.hide();
			}
		} else {
			blend.hide();
		}
	}

	// Initial
	protected get initial(): DInputTextAndLabel {
		return (this._initial ??= this.newInitial());
	}

	protected newInitial(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
			label: {
				width: 60,
				text: {
					value: this.theme.getInputInitialLabel()
				}
			},
			input: {
				weight: 1,
				on: {
					enter: () => {
						this.ok();
					}
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected onChangeInitial(select: number | null): void {
		const initial = this.initial;
		if (select === EShapeActionValueType.OPEN) {
			switch (this.openType.value) {
				case EShapeActionValueOpenType.DIALOG:
					switch (this.openDialogType.value) {
						case EShapeActionValueOpenDialogType.TEXT:
						case EShapeActionValueOpenDialogType.INTEGER:
						case EShapeActionValueOpenDialogType.REAL:
						case EShapeActionValueOpenDialogType.BOOLEAN:
						case EShapeActionValueOpenDialogType.DATE:
						case EShapeActionValueOpenDialogType.TIME:
						case EShapeActionValueOpenDialogType.DATETIME:
							initial.show();
							break;
						default:
							initial.hide();
							break;
					}
					break;
				default:
					initial.hide();
					break;
			}
		} else {
			initial.hide();
		}
	}

	protected get step(): DInputTextAndLabel {
		return (this._step ??= this.newStep());
	}

	protected newStep(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
			label: {
				width: 60,
				text: {
					value: this.theme.getInputStepLabel()
				}
			},
			input: {
				weight: 1,
				on: {
					enter: () => {
						this.ok();
					}
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected onChangeStep(select: number | null): void {
		const step = this.step;
		if (select === EShapeActionValueType.OPEN) {
			switch (this.openType.value) {
				case EShapeActionValueOpenType.DIALOG:
					switch (this.openDialogType.value) {
						case EShapeActionValueOpenDialogType.INTEGER:
						case EShapeActionValueOpenDialogType.REAL:
							step.show();
							break;
						default:
							step.hide();
							break;
					}
					break;
				default:
					step.hide();
					break;
			}
		} else {
			step.hide();
		}
	}

	protected get min(): DInputTextAndLabel {
		return (this._min ??= this.newMin());
	}

	protected newMin(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
			label: {
				width: 60,
				text: {
					value: this.theme.getInputMinLabel()
				}
			},
			input: {
				weight: 1,
				on: {
					enter: () => {
						this.ok();
					}
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected onChangeMin(select: number | null): void {
		const min = this.min;
		if (select === EShapeActionValueType.OPEN) {
			switch (this.openType.value) {
				case EShapeActionValueOpenType.DIALOG:
					switch (this.openDialogType.value) {
						case EShapeActionValueOpenDialogType.INTEGER:
						case EShapeActionValueOpenDialogType.REAL:
							min.show();
							break;
						default:
							min.hide();
							break;
					}
					break;
				default:
					min.hide();
					break;
			}
		} else {
			min.hide();
		}
	}

	protected get max(): DInputTextAndLabel {
		return (this._max ??= this.newMax());
	}

	protected newMax(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
			label: {
				width: 60,
				text: {
					value: this.theme.getInputMaxLabel()
				}
			},
			input: {
				weight: 1,
				on: {
					enter: () => {
						this.ok();
					}
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected onChangeMax(select: number | null): void {
		const max = this.max;
		if (select === EShapeActionValueType.OPEN) {
			switch (this.openType.value) {
				case EShapeActionValueOpenType.DIALOG:
					switch (this.openDialogType.value) {
						case EShapeActionValueOpenDialogType.INTEGER:
						case EShapeActionValueOpenDialogType.REAL:
							max.show();
							break;
						default:
							max.hide();
							break;
					}
					break;
				default:
					max.hide();
					break;
			}
		} else {
			max.hide();
		}
	}

	// Scale layout
	protected get scaleLayout(): DLayoutHorizontal {
		return (this._scaleLayout ??= this.newScaleLayout());
	}

	protected newScaleLayout(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "padding",
			height: "auto",
			children: [
				new DInputLabel({
					width: 60,
					text: {
						value: this.theme.getInputScaleLabel()
					}
				}),
				this.scaleMin,
				this.scaleMax,
				new DLayoutSpace({
					width: 60
				})
			]
		});
	}

	protected onChangeScaleLayout(select: number | null): void {
		const scaleLayout = this.scaleLayout;
		if (select === EShapeActionValueType.GESTURE) {
			scaleLayout.show();
		} else {
			scaleLayout.hide();
		}
	}

	protected get scaleMin(): DInputReal {
		return (this._scaleMin ??= this.newScaleMin());
	}

	protected newScaleMin(): DInputReal {
		return new DInputReal({
			weight: 1,
			on: {
				enter: () => {
					this.ok();
				}
			}
		});
	}

	// Scale max
	protected get scaleMax(): DInputReal {
		return (this._scaleMax ??= this.newScaleMax());
	}

	protected newScaleMax(): DInputReal {
		return new DInputReal({
			weight: 1,
			on: {
				enter: () => {
					this.ok();
				}
			}
		});
	}

	protected get checkBringToFront(): DButtonCheck<string> {
		return (this._checkBringToFront ??= this.newCheckBringToFront());
	}

	protected newCheckBringToFront(): DButtonCheck<string> {
		return new DButtonCheck<string>({
			weight: 1,
			text: {
				value: this.theme.getCheckBringToFrontLabel(),
				align: {
					horizontal: "LEFT"
				}
			}
		});
	}

	protected get checkBringToFrontLayout(): DLayoutHorizontal {
		return (this._checkBringToFrontLayout ??= this.newLabeled(null, this.checkBringToFront));
	}

	protected onChangeCheckBringToFrontLayout(select: number | null): void {
		const checkBringToFrontLayout = this.checkBringToFrontLayout;
		if (select === EShapeActionValueType.SHOW_HIDE) {
			switch (this.showHideType.value) {
				case EShapeActionValueShowHideType.LAYER:
					checkBringToFrontLayout.show();
					break;
				default:
					checkBringToFrontLayout.hide();
					break;
			}
		} else {
			checkBringToFrontLayout.hide();
		}
	}

	// inNewWindow
	protected get inNewWindow(): DButtonCheck<string> {
		return (this._inNewWindow ??= this.newInNewWindow());
	}

	protected newInNewWindow(): DButtonCheck<string> {
		return new DButtonCheck<string>({
			weight: 1,
			text: {
				value: this.theme.getCheckInNewWindowLabel(),
				align: {
					horizontal: "LEFT"
				}
			}
		});
	}

	protected get inNewWindowLayout(): DLayoutHorizontal {
		return (this._inNewWindowLayout ??= this.newLabeled(null, this.inNewWindow));
	}

	protected onChangeInNewWindowLayout(select: number | null): void {
		const inNewWindowLayout = this.inNewWindowLayout;
		if (select === EShapeActionValueType.OPEN) {
			switch (this.openType.value) {
				case EShapeActionValueOpenType.DIALOG:
					inNewWindowLayout.hide();
					break;
				default:
					inNewWindowLayout.show();
					break;
			}
		} else {
			inNewWindowLayout.hide();
		}
	}

	protected get extension(): EDialogActionExtensionContainer {
		return (this._extension ??= new EDialogActionExtensionContainer(
			this,
			this.condition,
			this.content
		));
	}

	protected onChange(): void {
		const select = this.select.value;
		this.onChangeAlphaCode(select);
		this.onChangeAmount(select);
		this.onChangeBlend(select);
		this.onChangeBlinkTypeLayout(select);
		this.onChangeBrightness(select);
		this.onChangeChangeColorTargetLayout(select);
		this.onChangeChangeColorTypeLayout(select);
		this.onChangeChangeTextTypeLayout(select);
		this.onChangeCondition(select);
		this.onChangeColorCode(select);
		this.onChangeColorLayout(select);
		this.onChangeInitial(select);
		this.onChangeStep(select);
		this.onChangeMin(select);
		this.onChangeMax(select);
		this.onChangeIntervalLayout(select);
		this.onChangeMiscTypeLayout(select);
		this.onChangeMoveTypeLayout(select);
		this.onChangeOnInputActionLayout(select);
		this.onChangeWhenTypeLayout(select);
		this.onChangeGestureTypeLayout(select);
		this.onChangeGestureOperationTypeLayout(select);
		this.onChangeSelectLayerLayout(select);
		this.onChangeOpenTypeLayout(select);
		this.onChangeOpenDialogTypeLayout(select);
		this.onChangeOriginXLayout(select);
		this.onChangeOriginYLayout(select);
		this.onChangeResizeTypeLayout(select);
		this.onChangeRotateTypeLayout(select);
		this.onChangeShowHideTypeLayout(select);
		this.onChangeSize(select);
		this.onChangeTarget(select);
		this.onChangeArgument(select);
		this.onChangeTargetName(select);
		this.onChangeContents(select);
		this.onChangeInitialization(select);
		this.onChangePointerEventsLayout(select);
		this.onChangeTransformTypeLayout(select);
		this.onChangeScaleLayout(select);
		this.onChangeCheckBringToFrontLayout(select);
		this.onChangeInNewWindowLayout(select);
		this.extension.onChange(select);
	}

	reset(): this {
		this.select.value = EShapeActionValueType.SHOW_HIDE;
		this.showHideType.value = EShapeActionValueShowHideType.SHAPE;
		this.blinkType.value = EShapeActionValueBlinkType.VISIBILITY;
		this.transformType.value = EShapeActionValueTransformType.MOVE;
		this.changeColorType.values = [EShapeActionValueChangeColorType.FILL];
		this.changeColorTarget.value = EShapeActionValueChangeColorTarget.COLOR_AND_ALPHA;
		this.resizeType.value = EShapeActionValueTransformResizeType.RELATIVE_SIZE;
		this.originY.value = 0.5;
		this.originX.value = 0.5;
		this.moveType.value = EShapeActionValueTransformMoveType.RELATIVE_X;
		this.rotateType.value = EShapeActionValueTransformRotateType.RELATIVE;
		this.openType.value = EShapeActionValueOpenType.DIAGRAM;
		this.openDialogType.value = EShapeActionValueOpenDialogType.TEXT;
		this.changeTextType.value = EShapeActionValueChangeTextType.TEXT;
		this.miscType.value = EShapeActionValueMiscType.INPUT_TEXT;
		this.onInputAction.value = EShapeActionValueOnInputAction.WRITE_REMOTE;
		this.whenType.value = UtilHtmlElementWhen.FOCUSED;
		this.gestureType.value = EShapeActionValueGestureType.SHAPE;
		this.gestureOperationType.values = this.fromGestureOperationType(
			EShapeActionValueGestureOperationType.ALL
		);
		this.selectLayer.values = [];
		this.selectLayer.menu = new DMenu<number>({
			fit: true,
			items: this.newSelectLayerMenuItemOptions()
		});
		this.condition.input.value = "";
		this.size.input.value = "";
		this.amount.input.value = "";
		this.contents.input.value = "";
		this.initialization.input.value = "";
		this.pointerEvents.state.isActive = true;
		this.targetName.input.value = "";
		this.interval.value = 1000;
		this.color.value.color = 0xffffff;
		this.color.value.alpha = 1;
		this.target.input.value = "";
		this.argument.input.value = "";
		this.colorCode.input.value = "";
		this.alphaCode.input.value = "";
		this.brightness.input.value = "";
		this.blend.input.value = "";
		this.initial.input.value = "";
		this.step.input.value = "";
		this.min.input.value = "";
		this.max.input.value = "";
		this.scaleMin.value = 0.05;
		this.scaleMax.value = 20;
		this.checkBringToFront.state.isActive = false;
		this.inNewWindow.state.isActive = false;
		this.extension.reset();
		this.onChange();
		return this;
	}

	get value(): EShapeActionValue | null {
		const select = this.select.value;
		const condition = this.condition.input.value;
		if (select != null) {
			switch (select) {
				case EShapeActionValueType.SHOW_HIDE:
					switch (this.showHideType.value) {
						case EShapeActionValueShowHideType.SHAPE:
						case null:
							return new EShapeActionValueShowHideShape(condition);
						case EShapeActionValueShowHideType.LAYER:
							return new EShapeActionValueShowHideLayer(
								condition,
								this.selectLayer.values.slice(0),
								this.checkBringToFront.state.isActive
							);
					}
					break;
				case EShapeActionValueType.BLINK:
					const blinkType = this.blinkType.value || EShapeActionValueBlinkType.VISIBILITY;
					const interval = this.interval.value;
					const blinkColor = this.color.value;
					return new EShapeActionValueBlink(
						blinkType,
						condition,
						interval,
						blinkColor.color,
						blinkColor.alpha
					);
				case EShapeActionValueType.CHANGE_COLOR:
					const changeColorType = EShapeActionValueChangeColorTypes.pack(
						this.changeColorType.values
					);
					const changeColorTarget =
						this.changeColorTarget.value ||
						EShapeActionValueChangeColorTarget.COLOR_AND_ALPHA;
					switch (changeColorTarget) {
						case EShapeActionValueChangeColorTarget.COLOR_AND_ALPHA:
						case EShapeActionValueChangeColorTarget.COLOR:
						case EShapeActionValueChangeColorTarget.ALPHA:
							const changeColor = this.color.value;
							return new EShapeActionValueChangeColor(
								changeColorType,
								condition,
								changeColorTarget,
								changeColor.color,
								changeColor.alpha,
								this.blend.input.value
							);
						case EShapeActionValueChangeColorTarget.CODE:
							return new EShapeActionValueChangeColorCode(
								changeColorType,
								condition,
								this.colorCode.input.value,
								this.alphaCode.input.value,
								this.blend.input.value
							);
						case EShapeActionValueChangeColorTarget.BRIGHTNESS:
							return new EShapeActionValueChangeColorBrightness(
								changeColorType,
								condition,
								this.brightness.input.value
							);
					}
					break;
				case EShapeActionValueType.TRANSFORM:
					const transformType = this.transformType.value;
					const originX = this.originX.value;
					const originY = this.originY.value;
					switch (transformType) {
						case EShapeActionValueTransformType.RESIZE:
							const resizeType =
								this.resizeType.value ||
								EShapeActionValueTransformResizeType.RELATIVE_SIZE;
							return new EShapeActionValueTransformResize(
								resizeType,
								condition,
								originX,
								originY,
								this.size.input.value
							);
						case EShapeActionValueTransformType.MOVE:
							const moveType =
								this.moveType.value ||
								EShapeActionValueTransformMoveType.RELATIVE_X;
							return new EShapeActionValueTransformMove(
								moveType,
								condition,
								this.amount.input.value
							);
						case EShapeActionValueTransformType.ROTATE:
							const rotateType =
								this.rotateType.value ||
								EShapeActionValueTransformRotateType.RELATIVE;
							return new EShapeActionValueTransformRotate(
								rotateType,
								condition,
								originX,
								originY,
								this.amount.input.value
							);
					}
					break;
				case EShapeActionValueType.CHANGE_TEXT:
					const changeTextType =
						this.changeTextType.value || EShapeActionValueChangeTextType.TEXT;
					return new EShapeActionValueChangeText(
						changeTextType,
						condition,
						this.contents.input.value
					);
				case EShapeActionValueType.OPEN:
					const openType = this.openType.value ?? EShapeActionValueOpenType.DIAGRAM;
					switch (openType) {
						case EShapeActionValueOpenType.DIALOG:
							const openDialogType =
								this.openDialogType.value ?? EShapeActionValueOpenDialogType.TEXT;
							switch (openDialogType) {
								case EShapeActionValueOpenDialogType.INTEGER:
								case EShapeActionValueOpenDialogType.REAL:
									return new EShapeActionValueOpenDialog(
										condition,
										this.target.input.value,
										this.onInputAction.value ??
											EShapeActionValueOnInputAction.EMIT_EVENT,
										this.initial.input.value,
										this.step.input.value,
										this.min.input.value,
										this.max.input.value,
										openDialogType
									);
								case EShapeActionValueOpenDialogType.TEXT:
								case EShapeActionValueOpenDialogType.BOOLEAN:
								case EShapeActionValueOpenDialogType.DATE:
								case EShapeActionValueOpenDialogType.TIME:
								case EShapeActionValueOpenDialogType.DATETIME:
									return new EShapeActionValueOpenDialog(
										condition,
										this.target.input.value,
										this.onInputAction.value ??
											EShapeActionValueOnInputAction.EMIT_EVENT,
										this.initial.input.value,
										"",
										"",
										"",
										openDialogType
									);
								default:
									return new EShapeActionValueOpenDialogExtension(
										condition,
										this.target.input.value,
										this.argument.input.value,
										openDialogType
									);
							}
						case EShapeActionValueOpenType.DIAGRAM:
						case EShapeActionValueOpenType.PAGE:
							return new EShapeActionValueOpen(
								openType,
								condition,
								this.target.input.value,
								this.inNewWindow.state.isActive
							);
						default:
							return new EShapeActionValueOpenExtension(
								openType,
								condition,
								this.target.input.value,
								this.inNewWindow.state.isActive
							);
					}
				case EShapeActionValueType.EMIT_EVENT:
					return new EShapeActionValueEmitEvent(condition, this.targetName.input.value);
				case EShapeActionValueType.CHANGE_CURSOR:
					return new EShapeActionValueChangeCursor(
						condition,
						this.targetName.input.value
					);
				case EShapeActionValueType.GESTURE:
					return new EShapeActionValueGesture(
						condition,
						this.gestureType.value || EShapeActionValueGestureType.SHAPE,
						this.toGestureOperationType(this.gestureOperationType.values),
						this.scaleMin.value,
						this.scaleMax.value
					);
				case EShapeActionValueType.MISC:
					const miscType = this.miscType.value || EShapeActionValueMiscType.INPUT_TEXT;
					switch (miscType) {
						case EShapeActionValueMiscType.INPUT_TEXT:
						case EShapeActionValueMiscType.INPUT_REAL:
						case EShapeActionValueMiscType.INPUT_INTEGER:
							return new EShapeActionValueMiscInput(
								miscType,
								this.toWhenTypeValue(this.whenType.value),
								this.target.input.value,
								this.onInputAction.value ||
									EShapeActionValueOnInputAction.EMIT_EVENT
							);
						case EShapeActionValueMiscType.EMIT_EVENT:
							return new EShapeActionValueMiscEmitEvent(
								condition,
								this.target.input.value
							);
						case EShapeActionValueMiscType.WRITE_BOTH:
						case EShapeActionValueMiscType.WRITE_LOCAL:
						case EShapeActionValueMiscType.WRITE_REMOTE:
							return new EShapeActionValueMiscWrite(
								miscType,
								condition,
								this.target.input.value,
								this.contents.input.value
							);
						case EShapeActionValueMiscType.HTML_ELEMENT:
							if (this.pointerEvents.state.isActive) {
								return new EShapeActionValueMiscHtmlElement(
									miscType,
									this.toWhenTypeValue(this.whenType.value),
									this.initialization.input.value
								);
							} else {
								return new EShapeActionValueMiscHtmlElement(
									EShapeActionValueMiscType.HTML_ELEMENT_WITHOUT_POINTER_EVENTS,
									this.toWhenTypeValue(this.whenType.value),
									this.initialization.input.value
								);
							}
						case EShapeActionValueMiscType.HTML_ELEMENT_WITHOUT_POINTER_EVENTS:
							return new EShapeActionValueMiscHtmlElement(
								miscType,
								this.toWhenTypeValue(this.whenType.value),
								this.initialization.input.value
							);
						case EShapeActionValueMiscType.EXECUTE:
							return new EShapeActionValueMiscExecute(
								condition,
								this.target.input.value
							);
						default:
							if (EShapeActionValueMiscType.EXTENSION <= miscType) {
								return new EShapeActionValueMiscExtension(
									miscType,
									condition,
									this.argument.input.value
								);
							}
					}
					break;
				default:
					return this.extension.value;
			}
		}
		return null;
	}

	set value(value: EShapeActionValue | null) {
		this.selectLayer.menu = new DMenu<number>({
			fit: true,
			items: this.newSelectLayerMenuItemOptions()
		});
		if (value != null) {
			this.select.value = value.type;
			if (value instanceof EShapeActionValueShowHide) {
				this.condition.input.value = value.condition;
				this.showHideType.value = EShapeActionValueShowHideType.SHAPE;
			} else if (value instanceof EShapeActionValueShowHideShape) {
				this.condition.input.value = value.condition;
				this.showHideType.value = value.subtype;
			} else if (value instanceof EShapeActionValueShowHideLayer) {
				this.condition.input.value = value.condition;
				this.showHideType.value = value.subtype;
				this.selectLayer.values = value.layers.slice(0);
				this.checkBringToFront.state.isActive = value.bringToFront;
			} else if (value instanceof EShapeActionValueBlink) {
				this.condition.input.value = value.condition;
				this.blinkType.value = value.subtype;
				this.interval.value = value.interval;
				this.color.value.color = value.color;
				this.color.value.alpha = value.alpha;
			} else if (value instanceof EShapeActionValueChangeColor) {
				this.condition.input.value = value.condition;
				this.changeColorType.values = EShapeActionValueChangeColorTypes.unpack(
					value.subtype
				);
				this.changeColorTarget.value = value.target;
				this.color.value.color = value.color;
				this.color.value.alpha = value.alpha;
				this.blend.input.value = value.blend;
			} else if (value instanceof EShapeActionValueChangeColorCode) {
				this.condition.input.value = value.condition;
				this.changeColorType.values = EShapeActionValueChangeColorTypes.unpack(
					value.subtype
				);
				this.changeColorTarget.value = EShapeActionValueChangeColorTarget.CODE;
				this.colorCode.input.value = value.color;
				this.alphaCode.input.value = value.alpha;
				this.blend.input.value = value.blend;
			} else if (value instanceof EShapeActionValueChangeColorBrightness) {
				this.condition.input.value = value.condition;
				this.changeColorType.values = EShapeActionValueChangeColorTypes.unpack(
					value.subtype
				);
				this.changeColorTarget.value = EShapeActionValueChangeColorTarget.BRIGHTNESS;
				this.brightness.input.value = value.brightness;
			} else if (value instanceof EShapeActionValueTransformResize) {
				this.condition.input.value = value.condition;
				this.transformType.value = EShapeActionValueTransformType.RESIZE;
				this.resizeType.value = value.opetype;
				this.originX.value = value.originX;
				this.originY.value = value.originY;
				this.size.input.value = value.amount;
			} else if (value instanceof EShapeActionValueTransformMove) {
				this.condition.input.value = value.condition;
				this.transformType.value = EShapeActionValueTransformType.MOVE;
				this.moveType.value = value.opetype;
				this.amount.input.value = value.amount;
			} else if (value instanceof EShapeActionValueTransformRotate) {
				this.condition.input.value = value.condition;
				this.transformType.value = EShapeActionValueTransformType.ROTATE;
				this.rotateType.value = value.opetype;
				this.originX.value = value.originX;
				this.originY.value = value.originY;
				this.amount.input.value = value.amount;
			} else if (value instanceof EShapeActionValueChangeText) {
				this.condition.input.value = value.condition;
				this.changeTextType.value = value.subtype;
				this.contents.input.value = value.value;
			} else if (value instanceof EShapeActionValueOpen) {
				this.condition.input.value = value.condition;
				this.openType.value = value.subtype;
				this.target.input.value = value.target;
				this.inNewWindow.state.isActive = value.inNewWindow;
			} else if (value instanceof EShapeActionValueOpenDialog) {
				this.condition.input.value = value.condition;
				this.openType.value = value.subtype;
				this.target.input.value = value.target;
				this.onInputAction.value = value.onInputAction;
				this.initial.input.value = value.initial;
				this.step.input.value = value.step;
				this.min.input.value = value.min;
				this.max.input.value = value.max;
				this.openDialogType.value = value.dialogType;
			} else if (value instanceof EShapeActionValueOpenDialogExtension) {
				this.condition.input.value = value.condition;
				this.openType.value = value.subtype;
				this.target.input.value = value.target;
				this.argument.input.value = value.argument;
				this.openDialogType.value = value.dialogType;
			} else if (value instanceof EShapeActionValueOpenExtension) {
				this.condition.input.value = value.condition;
				this.openType.value = value.subtype;
				this.target.input.value = value.target;
				this.inNewWindow.state.isActive = value.inNewWindow;
			} else if (value instanceof EShapeActionValueEmitEvent) {
				this.condition.input.value = value.condition;
				this.targetName.input.value = value.name;
			} else if (value instanceof EShapeActionValueChangeCursor) {
				this.condition.input.value = value.condition;
				this.targetName.input.value = value.name;
			} else if (value instanceof EShapeActionValueGesture) {
				this.condition.input.value = value.condition;
				this.gestureType.value = value.subtype;
				this.gestureOperationType.values = this.fromGestureOperationType(
					value.operationType
				);
				this.scaleMin.value = value.scaleMin;
				this.scaleMax.value = value.scaleMax;
			} else if (value instanceof EShapeActionValueMisc) {
				switch (value.subtype) {
					case EShapeActionValueMiscType.INPUT_TEXT:
					case EShapeActionValueMiscType.INPUT_REAL:
					case EShapeActionValueMiscType.INPUT_INTEGER:
						this.miscType.value = value.subtype;
						this.whenType.value = this.toWhenType(value.condition);
						this.target.input.value = value.target;
						this.onInputAction.value = value.onInputAction;
						this.contents.input.value = value.value;
						break;
					case EShapeActionValueMiscType.HTML_ELEMENT:
						this.miscType.value = EShapeActionValueMiscType.HTML_ELEMENT;
						this.whenType.value = this.toWhenType(value.condition);
						this.target.input.value = value.target;
						this.onInputAction.value = value.onInputAction;
						this.initialization.input.value = value.value;
						this.pointerEvents.state.isActive = true;
						break;
					case EShapeActionValueMiscType.HTML_ELEMENT_WITHOUT_POINTER_EVENTS:
						this.miscType.value = EShapeActionValueMiscType.HTML_ELEMENT;
						this.whenType.value = this.toWhenType(value.condition);
						this.target.input.value = value.target;
						this.onInputAction.value = value.onInputAction;
						this.initialization.input.value = value.value;
						this.pointerEvents.state.isActive = false;
						break;
					default:
						this.condition.input.value = value.condition;
						this.miscType.value = value.subtype;
						this.target.input.value = value.target;
						this.onInputAction.value = value.onInputAction;
						this.contents.input.value = value.value;
						break;
				}
			} else if (value instanceof EShapeActionValueMiscExecute) {
				this.miscType.value = EShapeActionValueMiscType.EXECUTE;
				this.condition.input.value = value.condition;
				this.target.input.value = value.target;
			} else if (value instanceof EShapeActionValueMiscExtension) {
				this.miscType.value = EShapeActionValueMiscType.EXTENSION;
				this.condition.input.value = value.condition;
				this.argument.input.value = value.argument;
			} else {
				this.extension.value = value;
			}
			this.onChange();
		}
	}

	protected getResolvedValue(): EShapeActionValue | null {
		return this.value;
	}

	protected getType(): string {
		return "EDialogAction";
	}
}
