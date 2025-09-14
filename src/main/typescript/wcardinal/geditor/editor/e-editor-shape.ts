import {
	createLine,
	DButton,
	DButtonAmbient,
	DButtonCheck,
	DButtonCheckRight,
	DButtonColor,
	DButtonColorGradient,
	DButtonFile,
	DButtonFileAs,
	DColorAndAlpha,
	DColorGradientObservable,
	DContentOptions,
	DDiagramSerializedName,
	DDialogOpener,
	DDialogSelect,
	DDialogSelectController,
	DInputReal,
	DInputRealAndLabel,
	DLayoutHorizontal,
	DLayoutSpace,
	DLayoutVertical,
	DMenuItemOptionsUnion,
	DPane,
	DPaneOptions,
	DSelect,
	DText,
	DThemePane,
	EShape,
	EShapeAcceptorEdgeSide,
	EShapeCapabilities,
	EShapeCapability,
	EShapeCircle,
	EShapeConnectorElbow,
	EShapeConnectorLine,
	EShapeCopyPart,
	EShapeCorner,
	EShapeDefaults,
	EShapeEmbeddeds,
	EShapeGradientLike,
	EShapeGroup,
	EShapeImage,
	EShapeImageLike,
	EShapeLine,
	EShapeLockPart,
	EShapePointsFormatters,
	EShapePointsMarkerType,
	EShapePointsStyle,
	EShapeRectangle,
	EShapeRectangleRounded,
	EShapeResourceManagerDeserializationMode,
	EShapeSemicircle,
	EShapeStrokeSide,
	EShapeStrokeStyle,
	EShapeTriangle,
	EShapeTriangleRounded,
	EShapeType,
	isFunction,
	isString,
	toGradientImageUrl,
	toImageElement
} from "@wcardinal/wcardinal-ui";
import { DisplayObject, Texture } from "pixi.js";
import { GraphicComponent } from "../data/graphic-component";
import { EShapeExtension } from "../extension/e-shape-extension";
import {
	EShapeExtensionCreateable,
	EShapeExtensionCreator
} from "../extension/e-shape-extension-creatable";
import { EShapeExtensionFactories } from "../extension/e-shape-extension-factories";
import { EShapeExtensionFactory } from "../extension/e-shape-extension-factory";
import { EShapeExtensionNewTypeCreatable } from "../extension/e-shape-extension-new-type-creatable";
import { EShapeExtensionNewTypeEditable } from "../extension/e-shape-extension-new-type-editable";
import { EShapeExtensions } from "../extension/e-shape-extensions";
import { newDialogSelectWithThumbnails } from "./e-dialog-select-with-thumbnails";
import { EEDITOR_BUTTON_COUNT } from "./e-editors";
import { UtilCanvas } from "../util/util-canvas";

export interface EEditorShapeSelection {
	isEmpty(): boolean;
	last(): EShape | null;
	size(): number;
	get(): EShape[];

	replace(shapeFactory: (existing: EShape) => EShape | null): void;

	group(): void;
	ungroup(): void;

	setFill(color: number, alpha: number): void;
	setFillEnabled(enable: boolean): void;

	setStroke(color: number, alpha: number): void;
	setStrokeEnabled(enable: boolean): void;
	setStrokeWidth(width: number): void;
	setStrokeAlign(align: number): void;
	setStrokeSide(side: number, isOn: boolean): void;
	setStrokeStyle(add: EShapeStrokeStyle, remove: EShapeStrokeStyle): void;

	setLineStyle(add: EShapeStrokeStyle, remove: EShapeStrokeStyle): void;
	setLineTailType(type: EShapePointsMarkerType): void;
	setLineTailSizeX(size: number): void;
	setLineTailSizeY(size: number): void;
	setLineTailColor(color: number, alpha: number): void;
	setLineTailMargin(margin: number): void;
	setLineHeadType(type: EShapePointsMarkerType): void;
	setLineHeadSizeX(size: number): void;
	setLineHeadSizeY(size: number): void;
	setLineHeadColor(color: number, alpha: number): void;
	setLineHeadMargin(margin: number): void;

	setRadius(radius: number): void;
	setCorner(corner: EShapeCorner, isOn: boolean): void;

	setPointsStyle(add: EShapePointsStyle, remove: EShapePointsStyle): void;

	setImage(image: EShapeImageLike): void;
	setGradient(image: EShapeImageLike, gradient: EShapeGradientLike): void;
	fitToImage(): void;
	clearImage(): void;

	lockCapability(target: EShapeCapability): void;
	unlockCapability(target: EShapeCapability): void;

	on(name: "change", handler: () => void): void;
}

export interface EEditorShapePieceController {
	graphic: GraphicComponent;
	toThumbnail?: (id: number) => string | Texture | DisplayObject | undefined;
	toPieceThumbnail?: (id: number) => string | Texture | DisplayObject | undefined;
}

export interface EEditorShapePieceOptions {
	enable: boolean;
	controller: EEditorShapePieceController;
	exclude: () => number | null;
}

export interface EEditorShapeConnectorOptions {
	dangling?: boolean;
}

export interface EEditorShapeOptions extends DPaneOptions<EThemeEditorShape> {
	selection: EEditorShapeSelection;
	icons: Record<string, Texture>;
	canvas: UtilCanvas;
	piece?: EEditorShapePieceOptions;
	connector?: EEditorShapeConnectorOptions;
	changeable?: boolean;
}

export interface EThemeEditorShape extends DThemePane {
	getLabel(): string | undefined;
	getTextChangeToLabel(): string | undefined;
	getButtonCircleTitle(): string | undefined;
	getButtonSemicircleTitle(): string | undefined;
	getButtonRectangleTitle(): string | undefined;
	getButtonRectangleRoundedTitle(): string | undefined;
	getButtonTriangleTitle(): string | undefined;
	getButtonTriangleRoundedTitle(): string | undefined;
	getButtonLineTitle(): string | undefined;
	getButtonLineConnectorTitle(): string | undefined;
	getButtonElbowConnectorTitle(): string | undefined;
	getButtonImageTitle(): string | undefined;
	getButtonGraphicPieceTitle(): string | undefined;
	getButtonGroupTitle(): string | undefined;
	getButtonGroupShortcut(): string | undefined;
	getButtonUngroupTitle(): string | undefined;
	getButtonUngroupShortcut(): string | undefined;
	getButtonFillLabel(): string | undefined;
	getButtonStrokeLabel(): string | undefined;
	getInputStrokeWidthLabel(): string | undefined;
	getInputStrokeAlignLabel(): string | undefined;
	getButtonStrokeSideTopTitle(): string | undefined;
	getButtonStrokeSideRightTitle(): string | undefined;
	getButtonStrokeSideBottomTitle(): string | undefined;
	getButtonStrokeSideLeftTitle(): string | undefined;
	getButtonStrokeExpandableTitle(): string | undefined;
	getButtonStrokeShrinkableTitle(): string | undefined;
	getButtonStrokeScalableDotDashTitle(): string | undefined;
	getTextCornerLabel(): string | undefined;
	getButtonCornerTopLeftTitle(): string | undefined;
	getButtonCornerTopRightTitle(): string | undefined;
	getButtonCornerBottomRightTitle(): string | undefined;
	getButtonCornerBottomLeftTitle(): string | undefined;
	getTextLineLabel(): string | undefined;
	getSelectLineStyleLabel(style: EShapeStrokeStyle): string | undefined;
	getSelectLineTypeLabel(style: EShapePointsStyle): string | undefined;
	getButtonLineClosedTitle(): string | undefined;
	getTextLineTailLabel(): string | undefined;
	getSelectLineTailTypeLabel(type: EShapePointsMarkerType): string | undefined;
	getInputLineTailMarginLabel(): string | undefined;
	getTextLineHeadLabel(): string | undefined;
	getSelectLineHeadTypeLabel(type: EShapePointsMarkerType): string | undefined;
	getInputLineHeadMarginLabel(): string | undefined;
	getButtonTextureImageTitle(): string | undefined;
	getButtonTextureGradientTitle(): string | undefined;
	getButtonTextureFitToTitle(): string | undefined;
	getButtonTextureClearTitle(): string | undefined;
}

export class EEditorShape extends DPane<EThemeEditorShape, DContentOptions, EEditorShapeOptions> {
	protected _icons: Record<string, Texture>;
	protected _canvas: UtilCanvas;
	protected _selection: EEditorShapeSelection;
	protected _isInitialized: boolean;
	protected _controller?: EEditorShapePieceController;
	protected _isPieceEnabled: boolean;
	protected _pieceExcluder?: () => number | null;
	protected _isChangeable?: boolean;
	protected _isDanglingConnectorAllowed: boolean;

	protected _layoutChangeTo?: DLayoutVertical | null;
	protected _buttonCircle?: DButton<string>;
	protected _buttonSemicircle?: DButton<string>;
	protected _buttonRectangle?: DButton<string>;
	protected _buttonRectangleRounded?: DButton<string>;
	protected _buttonTriangle?: DButton<string>;
	protected _buttonTriangleRounded?: DButton<string>;
	protected _buttonLineConnector?: DButton<string>;
	protected _buttonElbowConnector?: DButton<string>;
	protected _buttonLine?: DButton<string>;
	protected _buttonImage?: DButtonFile<string>;
	protected _buttonGraphicPiece?: DButton<string> | null;
	protected _dialogSelectGraphicPiece?: Promise<DDialogSelect<DDiagramSerializedName, string>>;
	protected _buttonGroup?: DButton<string>;
	protected _buttonUngroup?: DButton<string>;

	protected _buttonFill?: DButtonCheckRight<string>;
	protected _buttonFillColor?: DButtonColor;

	protected _buttonStroke?: DButtonCheckRight<string>;
	protected _buttonStrokeColor?: DButtonColor;
	protected _inputStrokeWidth?: DInputRealAndLabel;
	protected _inputStrokeAlign?: DInputRealAndLabel;
	protected _layoutStrokeSide?: DLayoutHorizontal;
	protected _buttonStrokeSideTop?: DButtonCheck<string>;
	protected _buttonStrokeSideRight?: DButtonCheck<string>;
	protected _buttonStrokeSideBottom?: DButtonCheck<string>;
	protected _buttonStrokeSideLeft?: DButtonCheck<string>;
	protected _buttonStrokeExpandable?: DButtonCheck<string>;
	protected _buttonStrokeShrinkable?: DButtonCheck<string>;
	protected _buttonStrokeScalableDotDash?: DButtonCheck<string>;

	protected _textCorner?: DText<string>;
	protected _inputCornerRadius?: DInputReal;
	protected _layoutCorner?: DLayoutHorizontal;
	protected _buttonCornerTopLeft?: DButtonCheck<string>;
	protected _buttonCornerTopRight?: DButtonCheck<string>;
	protected _buttonCornerBottomRight?: DButtonCheck<string>;
	protected _buttonCornerBottomLeft?: DButtonCheck<string>;

	protected _layoutLine?: DLayoutHorizontal;
	protected _textLine?: DText<string>;
	protected _buttonLineLock?: DButtonCheck<string>;
	protected _selectLineStyle?: DSelect<EShapeStrokeStyle>;
	protected _selectLineType?: DSelect<EShapePointsStyle>;
	protected _buttonLineClosed?: DButtonCheck<string>;

	protected _layoutLineTail?: DLayoutHorizontal;
	protected _textLineTail?: DText<string>;
	protected _buttonLineTailLock?: DButtonCheck<string>;
	protected _selectLineTailType?: DSelect<EShapePointsMarkerType>;
	protected _layoutLineTailSize?: DLayoutHorizontal;
	protected _inputLineTailSizeX?: DInputReal;
	protected _inputLineTailSizeY?: DInputReal;
	protected _buttonLineTailColor?: DButtonColor;
	protected _inputLineTailMargin?: DInputRealAndLabel;

	protected _layoutLineHead?: DLayoutHorizontal;
	protected _textLineHead?: DText<string>;
	protected _buttonLineHeadLock?: DButtonCheck<string>;
	protected _selectLineHeadType?: DSelect<EShapePointsMarkerType>;
	protected _layoutLineHeadSize?: DLayoutHorizontal;
	protected _inputLineHeadSizeX?: DInputReal;
	protected _inputLineHeadSizeY?: DInputReal;
	protected _buttonLineHeadColor?: DButtonColor;
	protected _inputLineHeadMargin?: DInputRealAndLabel;

	protected _layoutTexture?: DLayoutHorizontal;
	protected _buttonTextureImage?: DButtonFile<string>;
	protected _buttonTextureGradient?: DButtonColorGradient;
	protected _buttonTextureFitTo?: DButton<string>;
	protected _buttonTextureClear?: DButton<string>;

	constructor(options: EEditorShapeOptions) {
		super(options);

		this._icons = options.icons;
		this._canvas = options.canvas;
		this._selection = options.selection;
		this._isInitialized = false;
		const piece = options.piece;
		if (piece) {
			this._isPieceEnabled = piece.enable;
			this._pieceExcluder = piece.exclude;
			this._controller = piece.controller;
		} else {
			this._isPieceEnabled = false;
		}
		this._isChangeable = options.changeable;
		this._isDanglingConnectorAllowed = options?.connector?.dangling ?? false;
	}

	show(): this {
		super.show();
		this.onShow();
		return this;
	}

	protected onShow(): void {
		if (!this._isInitialized) {
			this._isInitialized = true;
			this.initLayout();
		}
		this.onSelectionChange();
	}

	protected initLayout(): void {
		new DLayoutVertical({
			parent: this.content,
			x: "padding",
			y: "padding",
			width: "padding",
			height: "auto",
			children: [
				this.layoutChangeTo,

				this.buttonFill,
				this.buttonFillColor,
				this.layoutTexture,

				this.buttonStroke,
				this.buttonStrokeColor,
				this.inputStrokeWidth,
				this.inputStrokeAlign,
				this.layoutStrokeSide,

				this.textCorner,
				this.inputCornerRadius,
				this.layoutCorner,

				this.layoutLine,
				this.selectLineStyle,
				this.selectLineType,

				this.layoutLineTail,
				this.selectLineTailType,
				this.layoutLineTailSize,
				this.buttonLineTailColor,
				this.inputLineTailMargin,

				this.layoutLineHead,
				this.selectLineHeadType,
				this.layoutLineHeadSize,
				this.buttonLineHeadColor,
				this.inputLineHeadMargin
			]
		});

		// Selection change handling
		this._selection.on("change", (): void => {
			if (this.isShown()) {
				this.onSelectionChange();
			}
		});
	}

	protected get layoutChangeTo(): DLayoutVertical | null {
		let result = this._layoutChangeTo;
		if (result === undefined) {
			result = this._isChangeable !== false ? this.newLayoutChangeTo() : null;
			this._layoutChangeTo = result;
		}
		return result;
	}

	protected newLayoutChangeTo(): DLayoutVertical {
		const children = [
			this.newTextChangeToLabel(),
			this.buttonCircle,
			this.buttonSemicircle,
			this.buttonRectangle,
			this.buttonRectangleRounded,
			this.buttonTriangle,
			this.buttonTriangleRounded,
			this.buttonLine,
			this.buttonLineConnector,
			this.buttonElbowConnector,
			this.buttonImage,
			this.buttonGraphicPiece
		];
		EShapeExtensionFactories.each((factory): void => {
			children.push(this.newButtonExtensionFactory(factory));
		});
		EShapeExtensions.each((extension): void => {
			if (this.isExtensionReplacable(extension)) {
				const creator = extension.creator;
				if (isFunction(creator)) {
					children.push(this.newButtonExtension(extension, creator));
				}
			}
		});
		children.push(this.buttonGroup, this.buttonUngroup);
		return new DLayoutVertical({
			width: "100%",
			height: "auto",
			column: EEDITOR_BUTTON_COUNT,
			children
		});
	}

	protected isExtensionReplacable(
		extension: EShapeExtension
	): extension is
		| EShapeExtensionCreateable
		| EShapeExtensionNewTypeCreatable
		| EShapeExtensionNewTypeEditable {
		if ("icon" in extension) {
			if ("type" in extension) {
				const capability = EShapeCapabilities.get(extension.type);
				if (capability != null) {
					if (capability & EShapeCapability.REPLACING) {
						return true;
					} else {
						return false;
					}
				}
			}
			return true;
		}
		return false;
	}

	protected newTextChangeToLabel(): DText<string> {
		return new DText<string>({
			width: "100%",
			text: {
				value: this.theme.getTextChangeToLabel()
			},
			clear: "AFTER"
		});
	}

	protected newButtonExtensionFactory(factory: EShapeExtensionFactory<unknown>): DButton<string> {
		let selectDialog: DDialogSelect<unknown> | null = null;
		return new DButtonAmbient<string>({
			image: {
				source: factory.icon.texture
			},
			title: this.toExtensionTitle(factory),
			theme: "EButtonEditor",
			on: {
				active: (emitter): void => {
					selectDialog = selectDialog || this.newDialogSelectExtensionFactory(factory);
					selectDialog.open(emitter);
				}
			}
		});
	}

	protected newDialogSelectExtensionFactory(
		factory: EShapeExtensionFactory<unknown>
	): DDialogSelect<unknown> {
		return new DDialogSelect<unknown>({
			controller: factory,
			list: {
				data: {
					toLabel: factory.item.toLabel
				}
			},
			on: {
				select: (value: unknown): void => {
					factory.item.toCreator(value).then((creator): void => {
						this._selection.replace(creator);
					});
				}
			}
		});
	}

	protected newButtonExtension(
		extension: EShapeExtensionCreateable,
		creator: EShapeExtensionCreator
	): DButton<string> {
		return new DButtonAmbient<string>({
			image: {
				source: extension.icon.texture
			},
			title: this.toExtensionTitle(extension),
			theme: "EButtonEditor",
			on: {
				active: (): void => {
					this._selection.replace(creator);
				}
			}
		});
	}

	protected toExtensionTitle(
		extension: EShapeExtensionCreateable | EShapeExtensionFactory<unknown>
	): string {
		const title = extension.title;
		if (isString(title)) {
			return title;
		}
		return title.change;
	}

	protected get buttonCircle(): DButton<string> {
		return (this._buttonCircle ??= this.newButtonCircle());
	}

	protected newButtonCircle(): DButton<string> {
		return new DButtonAmbient<string>({
			image: {
				source: this._icons.shape_circle
			},
			title: this.theme.getButtonCircleTitle(),
			theme: "EButtonEditor",
			on: {
				active: (): void => {
					this._selection.replace((existing) => {
						if (existing.type !== EShapeType.CIRCLE) {
							return new EShapeCircle().copy(existing);
						}
						return null;
					});
				}
			}
		});
	}

	protected get buttonSemicircle(): DButton<string> {
		return (this._buttonSemicircle ??= this.newButtonSemicircle());
	}

	protected newButtonSemicircle(): DButton<string> {
		return new DButtonAmbient<string>({
			image: {
				source: this._icons.shape_semicircle
			},
			title: this.theme.getButtonSemicircleTitle(),
			theme: "EButtonEditor",
			on: {
				active: (): void => {
					this._selection.replace((existing) => {
						if (existing.type !== EShapeType.SEMICIRCLE) {
							return new EShapeSemicircle().copy(existing);
						}
						return null;
					});
				}
			}
		});
	}

	protected get buttonRectangle(): DButton<string> {
		return (this._buttonRectangle ??= this.newButtonRectangle());
	}

	protected newButtonRectangle(): DButton<string> {
		return new DButtonAmbient<string>({
			image: {
				source: this._icons.shape_rectangle
			},
			title: this.theme.getButtonRectangleTitle(),
			theme: "EButtonEditor",
			on: {
				active: (): void => {
					this._selection.replace((existing) => {
						if (existing.type !== EShapeType.RECTANGLE) {
							return new EShapeRectangle().copy(existing);
						}
						return null;
					});
				}
			}
		});
	}

	protected get buttonRectangleRounded(): DButton<string> {
		return (this._buttonRectangleRounded ??= this.newButtonRectangleRounded());
	}

	protected newButtonRectangleRounded(): DButton<string> {
		return new DButtonAmbient<string>({
			image: {
				source: this._icons.shape_rectangle_rounded
			},
			title: this.theme.getButtonRectangleRoundedTitle(),
			theme: "EButtonEditor",
			on: {
				active: (): void => {
					this._selection.replace((existing) => {
						if (existing.type !== EShapeType.RECTANGLE_ROUNDED) {
							return new EShapeRectangleRounded().copy(existing);
						}
						return null;
					});
				}
			}
		});
	}

	protected get buttonTriangle(): DButton<string> {
		return (this._buttonTriangle ??= this.newButtonTriangle());
	}

	protected newButtonTriangle(): DButton<string> {
		return new DButtonAmbient<string>({
			image: {
				source: this._icons.shape_triangle
			},
			title: this.theme.getButtonTriangleTitle(),
			theme: "EButtonEditor",
			on: {
				active: (): void => {
					this._selection.replace((existing) => {
						if (existing.type !== EShapeType.TRIANGLE) {
							return new EShapeTriangle().copy(existing);
						}
						return null;
					});
				}
			}
		});
	}

	protected get buttonTriangleRounded(): DButton<string> {
		return (this._buttonTriangleRounded ??= this.newButtonTriangleRounded());
	}

	protected newButtonTriangleRounded(): DButton<string> {
		return new DButtonAmbient<string>({
			image: {
				source: this._icons.shape_triangle_rounded
			},
			title: this.theme.getButtonTriangleRoundedTitle(),
			theme: "EButtonEditor",
			on: {
				active: (): void => {
					this._selection.replace((existing) => {
						if (existing.type !== EShapeType.TRIANGLE_ROUNDED) {
							return new EShapeTriangleRounded().copy(existing);
						}
						return null;
					});
				}
			}
		});
	}

	protected get buttonLine(): DButton<string> {
		return (this._buttonLine ??= this.newButtonLine());
	}

	protected newButtonLine(): DButton<string> {
		return new DButtonAmbient<string>({
			image: {
				source: this._icons.shape_line
			},
			title: this.theme.getButtonLineTitle(),
			theme: "EButtonEditor",
			on: {
				active: (): void => {
					this._selection.replace((existing) => {
						return this.replaceLine(existing);
					});
				}
			}
		});
	}

	protected replaceLine(existing: EShape): EShapeLine | null {
		if (existing.type !== EShapeType.LINE) {
			if (existing instanceof EShapeConnectorLine) {
				return new EShapeLine().copy(existing);
			} else {
				const size = existing.size;
				const sxh = size.x * 0.5;
				const syh = size.y * 0.5;
				return createLine(
					[-sxh, -syh, +sxh, +syh],
					[],
					EShapeDefaults.STROKE_WIDTH,
					EShapePointsStyle.NONE
				).copy(
					existing,
					EShapeCopyPart.ALL & ~(EShapeCopyPart.SIZE | EShapeCopyPart.POINTS)
				);
			}
		}
		return null;
	}

	protected get buttonLineConnector(): DButton<string> {
		return (this._buttonLineConnector ??= this.newButtonLineConnector());
	}

	protected newButtonLineConnector(): DButton<string> {
		return new DButtonAmbient<string>({
			image: {
				source: this._icons.shape_line_connector
			},
			title: this.theme.getButtonLineConnectorTitle(),
			theme: "EButtonEditor",
			on: {
				active: (): void => {
					this._selection.replace((existing) => {
						return this.replaceLineConnector(existing);
					});
				}
			}
		});
	}

	protected replaceLineConnector(existing: EShape): EShapeConnectorLine | null {
		if (existing.type !== EShapeType.CONNECTOR_LINE) {
			if (existing instanceof EShapeConnectorLine) {
				return new EShapeConnectorLine().copy(existing);
			} else if (this._isDanglingConnectorAllowed) {
				return this.replaceConnector(existing, new EShapeConnectorLine());
			}
		}
		return null;
	}

	protected get buttonElbowConnector(): DButton<string> {
		return (this._buttonElbowConnector ??= this.newButtonElbowConnector());
	}

	protected newButtonElbowConnector(): DButton<string> {
		return new DButtonAmbient<string>({
			image: {
				source: this._icons.shape_elbow_connector
			},
			title: this.theme.getButtonElbowConnectorTitle(),
			theme: "EButtonEditor",
			on: {
				active: (): void => {
					this._selection.replace((existing) => {
						return this.replaceElbowConnector(existing);
					});
				}
			}
		});
	}

	protected replaceElbowConnector(existing: EShape): EShapeConnectorElbow | null {
		if (existing.type !== EShapeType.CONNECTOR_ELBOW) {
			if (existing instanceof EShapeConnectorLine) {
				return new EShapeConnectorElbow().copy(existing);
			} else if (this._isDanglingConnectorAllowed) {
				return this.replaceConnector(existing, new EShapeConnectorElbow());
			}
		}
		return null;
	}

	protected replaceConnector<T extends EShapeConnectorLine | EShapeConnectorElbow>(
		existing: EShape,
		result: T
	): T | null {
		result.lock(EShapeLockPart.ALL);
		result.fill.alpha = 1;
		const marker = result.points.marker;
		marker.tail.type = EShapePointsMarkerType.CIRCLE;
		marker.head.type = EShapePointsMarkerType.TRIANGLE;
		result.copy(
			existing,
			EShapeCopyPart.ALL &
				~(EShapeCopyPart.SIZE | EShapeCopyPart.POINTS | EShapeCopyPart.TRANSFORM)
		);
		const size = existing.size;
		const sxh = size.x * 0.5;
		const syh = size.y * 0.5;
		const localTransform = existing.transform.localTransform;
		const rx = localTransform.a * sxh + localTransform.c * syh;
		const ry = localTransform.b * sxh + localTransform.d * syh;
		const tx = localTransform.tx;
		const ty = localTransform.ty;
		const edge = result.edge;
		edge.lock();
		edge.tail.set(
			null,
			null,
			null,
			null,
			0,
			-rx + tx,
			-ry + ty,
			undefined,
			undefined,
			EShapeAcceptorEdgeSide.TOP
		);
		edge.head.set(
			null,
			null,
			null,
			null,
			0,
			+rx + tx,
			+ry + ty,
			undefined,
			undefined,
			EShapeAcceptorEdgeSide.TOP
		);
		edge.unlock();
		result.unlock(EShapeLockPart.ALL, true);
		return result;
	}

	protected get buttonImage(): DButtonFile<string> {
		return (this._buttonImage ??= this.newButtonImage());
	}

	protected newButtonImage(): DButtonFile<string> {
		return new DButtonFile<string>({
			image: {
				source: this._icons.editor_image
			},
			as: DButtonFileAs.DATA_URL,
			title: this.theme.getButtonImageTitle(),
			theme: "EButtonEditor",
			on: {
				open: (dataUrl: string): void => {
					toImageElement(dataUrl).then((item): void => {
						this._selection.replace((existing) => {
							return new EShapeImage(item).copy(
								existing,
								EShapeCopyPart.ALL & ~EShapeCopyPart.IMAGE
							);
						});
					});
				}
			}
		});
	}

	protected get buttonGraphicPiece(): DButton<string> | null {
		let result = this._buttonGraphicPiece;
		if (result === undefined) {
			result = this._isPieceEnabled ? this.newButtonGraphicPiece() : null;
			this._buttonGraphicPiece = result;
		}
		return result;
	}

	protected newButtonGraphicPiece(): DButton<string> | null {
		return new DButtonAmbient<string>({
			image: {
				source: this._icons.graphic_piece
			},
			title: this.theme.getButtonGraphicPieceTitle(),
			theme: "EButtonEditor",
			on: {
				active: (emitter): void => {
					this.onButtonGraphicPieceActive(emitter);
				}
			}
		});
	}

	protected onButtonGraphicPieceActive(opener?: DDialogOpener): void {
		this.dialogSelectGraphicPiece.then((dialogSelectGraphicPiece) => {
			dialogSelectGraphicPiece.open(opener);
		});
	}

	protected get dialogSelectGraphicPiece(): Promise<
		DDialogSelect<DDiagramSerializedName, string>
	> {
		return (this._dialogSelectGraphicPiece ??= this.newDialogSelectGraphicPiece());
	}

	protected newDialogSelectGraphicPiece(): Promise<
		DDialogSelect<DDiagramSerializedName, string>
	> {
		return this._canvas.get().then((canvas) => {
			const controller = this._controller;
			if (controller) {
				if (controller.toPieceThumbnail) {
					const result = this.newDialogSelectGraphicPieceImage(controller);
					result.categories = canvas.category.items;
					return result;
				} else {
					const result = this.newDialogSelectGraphicPieceNoImage(controller);
					result.categories = canvas.category.items;
					return result;
				}
			} else {
				const result = this.newDialogSelectGraphicPieceNoController();
				result.categories = canvas.category.items;
				return result;
			}
		});
	}

	protected newDialogSelectGraphicPieceNoImage(
		controller: EEditorShapePieceController
	): DDialogSelect<DDiagramSerializedName, string> {
		return new DDialogSelect<DDiagramSerializedName, string>({
			controller: this.newDialogSelectGraphicPieceController(controller),
			on: {
				select: (value: DDiagramSerializedName): void => {
					this.onDialogSelectGraphicPieceSelect(value, controller);
				}
			}
		});
	}

	protected newDialogSelectGraphicPieceImage(
		controller: EEditorShapePieceController
	): DDialogSelect<DDiagramSerializedName, string> {
		return newDialogSelectWithThumbnails(
			this.newDialogSelectGraphicPieceController(controller),
			controller.toPieceThumbnail,
			(value: DDiagramSerializedName): void => {
				this.onDialogSelectGraphicPieceSelect(value, controller);
			}
		);
	}

	protected newDialogSelectGraphicPieceNoController(): DDialogSelect<
		DDiagramSerializedName,
		string
	> {
		return new DDialogSelect<DDiagramSerializedName, string>({
			controller: {
				search: () => {
					return Promise.resolve([]);
				}
			}
		});
	}

	protected newDialogSelectGraphicPieceController(
		controller: EEditorShapePieceController
	): DDialogSelectController<DDiagramSerializedName, string> {
		const graphicPiece = controller.graphic.piece;
		return {
			search: (
				word: string,
				categoryId?: string | null
			): Promise<DDiagramSerializedName[]> => {
				return graphicPiece.search(word, categoryId).then((pieces) => {
					return this.toDialogSelectGraphicPieceResult(pieces);
				});
			}
		};
	}

	protected toDialogSelectGraphicPieceResult(
		targets: DDiagramSerializedName[]
	): DDiagramSerializedName[] {
		const pieceId = this._pieceExcluder?.();
		if (pieceId == null) {
			return targets;
		}
		const result: DDiagramSerializedName[] = [];
		for (let i = 0, imax = targets.length; i < imax; ++i) {
			const target = targets[i];
			if (target.id !== pieceId) {
				result.push(target);
			}
		}
		return result;
	}

	protected onDialogSelectGraphicPieceSelect(
		value: DDiagramSerializedName,
		controller: EEditorShapePieceController
	): void {
		controller.graphic.piece.get(value.id).then((serialized) => {
			EShapeEmbeddeds.from(
				serialized,
				controller.graphic,
				EShapeResourceManagerDeserializationMode.EDITOR
			).then((shape): void => {
				this._selection.replace((existing) => {
					return shape.clone().copy(existing);
				});
			});
		});
	}

	protected get buttonGroup(): DButton<string> {
		return (this._buttonGroup ??= this.newButtonGroup());
	}

	protected newButtonGroup(): DButton<string> {
		return new DButtonAmbient<string>({
			image: {
				source: this._icons.shape_group
			},
			title: this.theme.getButtonGroupTitle(),
			theme: "EButtonEditor",
			on: {
				active: (): void => {
					this._selection.group();
				}
			}
		});
	}

	protected get buttonUngroup(): DButton<string> {
		return (this._buttonUngroup ??= this.newButtonUngroup());
	}

	protected newButtonUngroup(): DButton<string> {
		return new DButtonAmbient<string>({
			image: {
				source: this._icons.shape_ungroup
			},
			title: this.theme.getButtonUngroupTitle(),
			theme: "EButtonEditor",
			on: {
				active: () => {
					this._selection.ungroup();
				}
			}
		});
	}

	protected get buttonFill(): DButtonCheckRight<string> {
		return (this._buttonFill ??= this.newButtonFill());
	}

	protected newButtonFill(): DButtonCheckRight<string> {
		const selection = this._selection;
		return new DButtonCheckRight<string>({
			width: "100%",
			text: {
				value: this.theme.getButtonFillLabel()
			},
			padding: 0,
			background: {
				color: null
			},
			on: {
				active: (): void => {
					selection.setFillEnabled(true);
				},
				inactive: (): void => {
					selection.setFillEnabled(false);
				}
			}
		});
	}

	protected get buttonFillColor(): DButtonColor {
		return (this._buttonFillColor ??= this.newButtonFillColor());
	}

	protected newButtonFillColor(): DButtonColor {
		const result = new DButtonColor({
			width: "100%",
			on: {
				change: (value: DColorAndAlpha): void => {
					this._selection.setFill(value.color, value.alpha);
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

	protected get buttonStroke(): DButtonCheckRight<string> {
		return (this._buttonStroke ??= this.newButtonStroke());
	}

	protected newButtonStroke(): DButtonCheckRight<string> {
		const selection = this._selection;
		return new DButtonCheckRight<string>({
			width: "100%",
			text: {
				value: this.theme.getButtonStrokeLabel()
			},
			padding: 0,
			background: {
				color: null
			},
			on: {
				active: () => {
					selection.setStrokeEnabled(true);
				},
				inactive: () => {
					selection.setStrokeEnabled(false);
				}
			}
		});
	}

	protected get buttonStrokeColor(): DButtonColor {
		return (this._buttonStrokeColor ??= this.newButtonStrokeColor());
	}

	protected newButtonStrokeColor(): DButtonColor {
		const result = new DButtonColor({
			width: "100%",
			on: {
				change: (value: DColorAndAlpha): void => {
					this._selection.setStroke(value.color, value.alpha);
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

	protected get inputStrokeWidth(): DInputRealAndLabel {
		return (this._inputStrokeWidth ??= this.newInputStrokeWidth());
	}

	protected newInputStrokeWidth(): DInputRealAndLabel {
		return new DInputRealAndLabel({
			width: "100%",
			label: {
				text: {
					value: this.theme.getInputStrokeWidthLabel()
				}
			},
			input: {
				weight: 1,
				min: 0,
				on: {
					change: (value: number): void => {
						this._selection.setStrokeWidth(value);
					}
				}
			}
		});
	}

	protected get inputStrokeAlign(): DInputRealAndLabel {
		return (this._inputStrokeAlign ??= this.newInputStrokeAlign());
	}

	protected newInputStrokeAlign(): DInputRealAndLabel {
		return new DInputRealAndLabel({
			width: "100%",
			label: {
				text: {
					value: this.theme.getInputStrokeAlignLabel()
				}
			},
			input: {
				weight: 1,
				min: 0,
				max: 1,
				on: {
					change: (value: number): void => {
						this._selection.setStrokeAlign(value);
					}
				}
			}
		});
	}

	protected get layoutStrokeSide(): DLayoutHorizontal {
		return (this._layoutStrokeSide ??= this.newLayoutStrokeSide());
	}

	protected newLayoutStrokeSide(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "100%",
			height: "auto",
			children: [
				new DLayoutSpace({ weight: 1 }),
				this.buttonStrokeSideTop,
				this.buttonStrokeSideRight,
				this.buttonStrokeSideBottom,
				this.buttonStrokeSideLeft,
				this.buttonStrokeExpandable,
				this.buttonStrokeShrinkable,
				this.buttonStrokeScalableDotDash,
				new DLayoutSpace({ weight: 1 })
			]
		});
	}

	protected get buttonStrokeSideTop(): DButtonCheck<string> {
		return (this._buttonStrokeSideTop ??= this.newButtonStrokeSideTop());
	}

	protected newButtonStrokeSideTop(): DButtonCheck<string> {
		const selection = this._selection;
		return new DButtonCheck<string>({
			image: {
				source: this._icons.stroke_side_top
			},
			title: this.theme.getButtonStrokeSideTopTitle(),
			theme: "EButtonEditorCheck",
			on: {
				active: (): void => {
					selection.setStrokeSide(EShapeStrokeSide.TOP, true);
				},

				inactive: (): void => {
					selection.setStrokeSide(EShapeStrokeSide.TOP, false);
				}
			}
		});
	}

	protected get buttonStrokeSideRight(): DButtonCheck<string> {
		return (this._buttonStrokeSideRight ??= this.newButtonStrokeSideRight());
	}

	protected newButtonStrokeSideRight(): DButtonCheck<string> {
		const selection = this._selection;
		return new DButtonCheck<string>({
			image: {
				source: this._icons.stroke_side_right
			},
			title: this.theme.getButtonStrokeSideRightTitle(),
			theme: "EButtonEditorCheck",
			on: {
				active: (): void => {
					selection.setStrokeSide(EShapeStrokeSide.RIGHT, true);
				},

				inactive: (): void => {
					selection.setStrokeSide(EShapeStrokeSide.RIGHT, false);
				}
			}
		});
	}

	protected get buttonStrokeSideBottom(): DButtonCheck<string> {
		return (this._buttonStrokeSideBottom ??= this.newButtonStrokeSideBottom());
	}

	protected newButtonStrokeSideBottom(): DButtonCheck<string> {
		const selection = this._selection;
		return new DButtonCheck<string>({
			image: {
				source: this._icons.stroke_side_bottom
			},
			title: this.theme.getButtonStrokeSideBottomTitle(),
			theme: "EButtonEditorCheck",
			on: {
				active: (): void => {
					selection.setStrokeSide(EShapeStrokeSide.BOTTOM, true);
				},

				inactive: (): void => {
					selection.setStrokeSide(EShapeStrokeSide.BOTTOM, false);
				}
			}
		});
	}

	protected get buttonStrokeSideLeft(): DButtonCheck<string> {
		return (this._buttonStrokeSideLeft ??= this.newButtonStrokeSideLeft());
	}

	protected newButtonStrokeSideLeft(): DButtonCheck<string> {
		const selection = this._selection;
		return new DButtonCheck<string>({
			image: {
				source: this._icons.stroke_side_left
			},
			title: this.theme.getButtonStrokeSideLeftTitle(),
			theme: "EButtonEditorCheck",
			on: {
				active: (): void => {
					selection.setStrokeSide(EShapeStrokeSide.LEFT, true);
				},

				inactive: (): void => {
					selection.setStrokeSide(EShapeStrokeSide.LEFT, false);
				}
			}
		});
	}

	protected get textCorner(): DText<string> {
		return (this._textCorner ??= this.newTextCorner());
	}

	protected newTextCorner(): DText<string> {
		return new DText<string>({
			width: "100%",
			text: {
				value: this.theme.getTextCornerLabel()
			}
		});
	}

	protected get inputCornerRadius(): DInputReal {
		return (this._inputCornerRadius ??= this.newInputCornerRadius());
	}

	protected newInputCornerRadius(): DInputReal {
		return new DInputReal({
			width: "100%",
			min: 0,
			step: 1,
			max: 100,
			text: {
				formatter: (value: number): string => {
					return `${+(value * 100).toFixed(2)} %`;
				}
			},
			editing: {
				formatter: (value: number): string => {
					return `${+(value * 100).toFixed(2)}`;
				},
				unformatter: (text: string): number => {
					return parseFloat(text) * 0.01;
				}
			},
			on: {
				change: (value: number): void => {
					this._selection.setRadius(value);
				}
			}
		});
	}

	protected get layoutCorner(): DLayoutHorizontal {
		return (this._layoutCorner ??= this.newLayoutCorner());
	}

	protected newLayoutCorner(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "100%",
			height: "auto",
			children: [
				new DLayoutSpace({ weight: 1 }),
				this.buttonCornerTopLeft,
				this.buttonCornerTopRight,
				this.buttonCornerBottomRight,
				this.buttonCornerBottomLeft,
				new DLayoutSpace({ weight: 1 })
			]
		});
	}

	protected get buttonCornerTopLeft(): DButtonCheck<string> {
		return (this._buttonCornerTopLeft ??= this.newButtonCornerTopLeft());
	}

	protected newButtonCornerTopLeft(): DButtonCheck<string> {
		const selection = this._selection;
		return new DButtonCheck<string>({
			image: {
				source: this._icons.corner_top_left
			},
			title: this.theme.getButtonCornerTopLeftTitle(),
			theme: "EButtonEditorCheck",
			on: {
				active: (): void => {
					selection.setCorner(EShapeCorner.TOP_LEFT, true);
				},

				inactive: (): void => {
					selection.setCorner(EShapeCorner.TOP_LEFT, false);
				}
			}
		});
	}

	protected get buttonCornerTopRight(): DButtonCheck<string> {
		return (this._buttonCornerTopRight ??= this.newButtonCornerTopRight());
	}

	protected newButtonCornerTopRight(): DButtonCheck<string> {
		const selection = this._selection;
		return new DButtonCheck<string>({
			image: {
				source: this._icons.corner_top_right
			},
			title: this.theme.getButtonCornerTopRightTitle(),
			theme: "EButtonEditorCheck",
			on: {
				active: (): void => {
					selection.setCorner(EShapeCorner.TOP_RIGHT, true);
				},

				inactive: (): void => {
					selection.setCorner(EShapeCorner.TOP_RIGHT, false);
				}
			}
		});
	}

	protected get buttonCornerBottomRight(): DButtonCheck<string> {
		return (this._buttonCornerBottomRight ??= this.newButtonCornerBottomRight());
	}

	protected newButtonCornerBottomRight(): DButtonCheck<string> {
		const selection = this._selection;
		return new DButtonCheck<string>({
			image: {
				source: this._icons.corner_bottom_right
			},
			title: this.theme.getButtonCornerBottomRightTitle(),
			theme: "EButtonEditorCheck",
			on: {
				active: (): void => {
					selection.setCorner(EShapeCorner.BOTTOM_RIGHT, true);
				},

				inactive: (): void => {
					selection.setCorner(EShapeCorner.BOTTOM_RIGHT, false);
				}
			}
		});
	}

	protected get buttonCornerBottomLeft(): DButtonCheck<string> {
		return (this._buttonCornerBottomLeft ??= this.newButtonCornerBottomLeft());
	}

	protected newButtonCornerBottomLeft(): DButtonCheck<string> {
		const selection = this._selection;
		return new DButtonCheck<string>({
			image: {
				source: this._icons.corner_bottom_left
			},
			title: this.theme.getButtonCornerBottomLeftTitle(),
			theme: "EButtonEditorCheck",
			on: {
				active: (): void => {
					selection.setCorner(EShapeCorner.BOTTOM_LEFT, true);
				},

				inactive: (): void => {
					selection.setCorner(EShapeCorner.BOTTOM_LEFT, false);
				}
			}
		});
	}

	protected get layoutLine(): DLayoutHorizontal {
		return (this._layoutLine ??= this.newLayoutLine());
	}

	protected newLayoutLine(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "100%",
			children: [this.textLine, this.buttonLineClosed, this.buttonLineLock]
		});
	}

	protected get textLine(): DText<string> {
		return (this._textLine ??= this.newTextLine());
	}

	protected newTextLine(): DText<string> {
		return new DText<string>({
			weight: 1,
			text: {
				value: this.theme.getTextLineLabel()
			}
		});
	}

	protected get buttonLineLock(): DButtonCheck<string> {
		return (this._buttonLineLock ??= this.newButtonLineLock());
	}

	protected newButtonLineLock(): DButtonCheck<string> {
		return new DButtonCheck<string>({
			theme: "EButtonEditorLock",
			on: {
				active: (): void => {
					this._selection.lockCapability(EShapeCapability.LINE);
				},
				inactive: (): void => {
					this._selection.unlockCapability(EShapeCapability.LINE);
				}
			}
		});
	}

	protected isLocked(last: EShape | null, target: EShapeCapability): boolean {
		if (last == null) {
			return false;
		}
		const capability = last.getCapability();
		if (capability == null) {
			return false;
		}
		if (capability.locked & target) {
			return true;
		}
		return false;
	}

	protected get selectLineStyle(): DSelect<EShapeStrokeStyle> {
		return (this._selectLineStyle ??= this.newSelectLineStyle());
	}

	protected newSelectLineStyle(): DSelect<EShapeStrokeStyle> {
		const theme = this.theme;
		return new DSelect<EShapeStrokeStyle>({
			width: "100%",
			value: EShapeStrokeStyle.NONE,
			menu: {
				items: [
					{
						value: EShapeStrokeStyle.NONE,
						text: {
							value: theme.getSelectLineStyleLabel(EShapeStrokeStyle.NONE)
						}
					},
					{
						value: EShapeStrokeStyle.DOTTED,
						text: {
							value: theme.getSelectLineStyleLabel(EShapeStrokeStyle.DOTTED)
						}
					},
					{
						value: EShapeStrokeStyle.DOTTED_DENSELY,
						text: {
							value: theme.getSelectLineStyleLabel(EShapeStrokeStyle.DOTTED_DENSELY)
						}
					},
					{
						value: EShapeStrokeStyle.DOTTED_LOOSELY,
						text: {
							value: theme.getSelectLineStyleLabel(EShapeStrokeStyle.DOTTED_LOOSELY)
						}
					},
					{
						value: EShapeStrokeStyle.DASHED,
						text: {
							value: theme.getSelectLineStyleLabel(EShapeStrokeStyle.DASHED)
						}
					},
					{
						value: EShapeStrokeStyle.DASHED_DENSELY,
						text: {
							value: theme.getSelectLineStyleLabel(EShapeStrokeStyle.DASHED_DENSELY)
						}
					},
					{
						value: EShapeStrokeStyle.DASHED_LOOSELY,
						text: {
							value: theme.getSelectLineStyleLabel(EShapeStrokeStyle.DASHED_LOOSELY)
						}
					}
				]
			},
			on: {
				change: (value: EShapeStrokeStyle | null): void => {
					this._selection.setLineStyle(
						value ?? EShapeStrokeStyle.NONE,
						EShapeStrokeStyle.DOTTED_MASK | EShapeStrokeStyle.DASHED_MASK
					);
				}
			}
		});
	}

	protected get selectLineType(): DSelect<EShapePointsStyle> {
		return (this._selectLineType ??= this.newSelectLineType());
	}

	protected newSelectLineType(): DSelect<EShapePointsStyle> {
		return new DSelect<EShapePointsStyle>({
			width: "100%",
			value: EShapePointsStyle.NONE,
			menu: {
				items: this.newSelectLineTypeMenuItems()
			},
			on: {
				change: (value: EShapePointsStyle | null): void => {
					this._selection.setPointsStyle(
						value ?? EShapePointsStyle.NONE,
						EShapePointsStyle.FORMATTER_MASK
					);
				}
			}
		});
	}

	protected newSelectLineTypeMenuItems(): DMenuItemOptionsUnion<EShapePointsStyle>[] {
		const result: DMenuItemOptionsUnion<EShapePointsStyle>[] = [
			{
				value: EShapePointsStyle.NONE,
				text: {
					value: this.theme.getSelectLineTypeLabel(EShapePointsStyle.NONE)
				}
			}
		];
		EShapePointsFormatters.each((id, datum) => {
			result.push({
				value: id << EShapePointsStyle.FORMATTER_SHIFT,
				text: {
					value: datum.label
				}
			});
		});
		return result;
	}

	protected get buttonLineClosed(): DButtonCheck<string> {
		return (this._buttonLineClosed ??= this.newButtonLineClosed());
	}

	protected newButtonLineClosed(): DButtonCheck<string> {
		const selection = this._selection;
		return new DButtonCheck<string>({
			image: {
				source: this._icons.line_closed
			},
			title: this.theme.getButtonLineClosedTitle(),
			theme: "EButtonEditorCheck",
			on: {
				active: (): void => {
					selection.setPointsStyle(EShapePointsStyle.CLOSED, EShapePointsStyle.NONE);
				},
				inactive: (): void => {
					selection.setPointsStyle(EShapePointsStyle.NONE, EShapePointsStyle.CLOSED);
				}
			}
		});
	}

	protected get buttonStrokeExpandable(): DButtonCheck<string> {
		return (this._buttonStrokeExpandable ??= this.newButtonStrokeExpandable());
	}

	protected newButtonStrokeExpandable(): DButtonCheck<string> {
		const selection = this._selection;
		return new DButtonCheck<string>({
			image: {
				source: this._icons.stroke_expandable
			},
			title: this.theme.getButtonStrokeExpandableTitle(),
			theme: "EButtonEditorCheck",
			on: {
				active: (): void => {
					selection.setStrokeStyle(
						EShapeStrokeStyle.NONE,
						EShapeStrokeStyle.NON_EXPANDING_WIDTH
					);
				},
				inactive: (): void => {
					selection.setStrokeStyle(
						EShapeStrokeStyle.NON_EXPANDING_WIDTH,
						EShapeStrokeStyle.NONE
					);
				}
			}
		});
	}

	protected get buttonStrokeShrinkable(): DButtonCheck<string> {
		return (this._buttonStrokeShrinkable ??= this.newButtonStrokeShrinkable());
	}

	protected newButtonStrokeShrinkable(): DButtonCheck<string> {
		const selection = this._selection;
		return new DButtonCheck<string>({
			image: {
				source: this._icons.stroke_shrinkable
			},
			title: this.theme.getButtonStrokeShrinkableTitle(),
			theme: "EButtonEditorCheck",
			on: {
				active: (): void => {
					selection.setStrokeStyle(
						EShapeStrokeStyle.NONE,
						EShapeStrokeStyle.NON_SHRINKING_WIDTH
					);
				},
				inactive: (): void => {
					selection.setStrokeStyle(
						EShapeStrokeStyle.NON_SHRINKING_WIDTH,
						EShapeStrokeStyle.NONE
					);
				}
			}
		});
	}

	protected get buttonStrokeScalableDotDash(): DButtonCheck<string> {
		return (this._buttonStrokeScalableDotDash ??= this.newButtonStrokeScalableDotDash());
	}

	protected newButtonStrokeScalableDotDash(): DButtonCheck<string> {
		const selection = this._selection;
		return new DButtonCheckRight<string>({
			image: {
				source: this._icons.stroke_scalable_dot_dash
			},
			title: this.theme.getButtonStrokeScalableDotDashTitle(),
			theme: "EButtonEditorCheck",
			on: {
				active: (): void => {
					selection.setStrokeStyle(
						EShapeStrokeStyle.NONE,
						EShapeStrokeStyle.NON_SCALING_DOT_AND_DASH
					);
				},
				inactive: (): void => {
					selection.setStrokeStyle(
						EShapeStrokeStyle.NON_SCALING_DOT_AND_DASH,
						EShapeStrokeStyle.NONE
					);
				}
			}
		});
	}

	protected get layoutLineTail(): DLayoutHorizontal {
		return (this._layoutLineTail ??= this.newLayoutLineTail());
	}

	protected newLayoutLineTail(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "100%",
			children: [this.textLineTail, this.buttonLineTailLock]
		});
	}

	protected get textLineTail(): DText<string> {
		return (this._textLineTail ??= this.newTextLineTail());
	}

	protected newTextLineTail(): DText<string> {
		return new DText<string>({
			weight: 1,
			text: {
				value: this.theme.getTextLineTailLabel()
			}
		});
	}

	protected get buttonLineTailLock(): DButtonCheck<string> {
		return (this._buttonLineTailLock ??= this.newButtonLineTailLock());
	}

	protected newButtonLineTailLock(): DButtonCheck<string> {
		return new DButtonCheck<string>({
			theme: "EButtonEditorLock",
			on: {
				active: (): void => {
					this._selection.lockCapability(EShapeCapability.LINE_TAIL);
				},
				inactive: (): void => {
					this._selection.unlockCapability(EShapeCapability.LINE_TAIL);
				}
			}
		});
	}

	protected get selectLineTailType(): DSelect<EShapePointsMarkerType> {
		return (this._selectLineTailType ??= this.newSelectLineTailType());
	}

	protected newSelectLineTailType(): DSelect<EShapePointsMarkerType> {
		const theme = this.theme;
		return new DSelect<EShapePointsMarkerType>({
			width: "100%",
			value: EShapePointsMarkerType.NONE,
			menu: {
				items: [
					{
						value: EShapePointsMarkerType.NONE,
						text: {
							value: theme.getSelectLineTailTypeLabel(EShapePointsMarkerType.NONE)
						}
					},
					{
						value: EShapePointsMarkerType.CIRCLE,
						text: {
							value: theme.getSelectLineTailTypeLabel(EShapePointsMarkerType.CIRCLE)
						}
					},
					{
						value: EShapePointsMarkerType.TRIANGLE,
						text: {
							value: theme.getSelectLineTailTypeLabel(EShapePointsMarkerType.TRIANGLE)
						}
					},
					{
						value: EShapePointsMarkerType.RECTANGLE,
						text: {
							value: theme.getSelectLineTailTypeLabel(
								EShapePointsMarkerType.RECTANGLE
							)
						}
					}
				]
			},
			on: {
				change: (value: EShapePointsMarkerType | null): void => {
					this._selection.setLineTailType(value ?? EShapePointsMarkerType.NONE);
				}
			}
		});
	}

	protected get layoutLineTailSize(): DLayoutHorizontal {
		return (this._layoutLineTailSize ??= this.newLayoutLineTailSize());
	}

	protected newLayoutLineTailSize(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "100%",
			children: [this.inputLineTailSizeX, this.inputLineTailSizeY]
		});
	}

	protected get inputLineTailSizeX(): DInputReal {
		return (this._inputLineTailSizeX ??= this.newInputLineTailSizeX());
	}

	protected newInputLineTailSizeX(): DInputReal {
		return new DInputReal({
			weight: 1,
			min: 0,
			on: {
				change: (value: number): void => {
					this._selection.setLineTailSizeX(value);
				}
			}
		});
	}

	protected get inputLineTailSizeY(): DInputReal {
		return (this._inputLineTailSizeY ??= this.newInputLineTailSizeY());
	}

	protected newInputLineTailSizeY(): DInputReal {
		return new DInputReal({
			weight: 1,
			min: 0,
			on: {
				change: (value: number): void => {
					this._selection.setLineTailSizeY(value);
				}
			}
		});
	}

	protected get buttonLineTailColor(): DButtonColor {
		return (this._buttonLineTailColor ??= this.newButtonLineTailColor());
	}

	protected newButtonLineTailColor(): DButtonColor {
		const result = new DButtonColor({
			width: "100%",
			on: {
				change: (value: DColorAndAlpha): void => {
					this._selection.setLineTailColor(value.color, value.alpha);
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

	protected get inputLineTailMargin(): DInputRealAndLabel {
		return (this._inputLineTailMargin ??= this.newInputLineTailMargin());
	}

	protected newInputLineTailMargin(): DInputRealAndLabel {
		return new DInputRealAndLabel({
			width: "100%",
			label: {
				text: {
					value: this.theme.getInputLineTailMarginLabel()
				}
			},
			input: {
				weight: 1,
				on: {
					change: (value: number): void => {
						this._selection.setLineTailMargin(value);
					}
				}
			}
		});
	}

	protected get layoutLineHead(): DLayoutHorizontal {
		return (this._layoutLineHead ??= this.newLayoutLineHead());
	}

	protected newLayoutLineHead(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "100%",
			children: [this.textLineHead, this.buttonLineHeadLock]
		});
	}

	protected get textLineHead(): DText<string> {
		return (this._textLineHead ??= this.newTextLineHead());
	}

	protected newTextLineHead(): DText<string> {
		return new DText<string>({
			weight: 1,
			text: {
				value: this.theme.getTextLineHeadLabel()
			}
		});
	}

	protected get buttonLineHeadLock(): DButtonCheck<string> {
		return (this._buttonLineHeadLock ??= this.newButtonLineHeadLock());
	}

	protected newButtonLineHeadLock(): DButtonCheck<string> {
		return new DButtonCheck<string>({
			theme: "EButtonEditorLock",
			on: {
				active: (): void => {
					this._selection.lockCapability(EShapeCapability.LINE_HEAD);
				},
				inactive: (): void => {
					this._selection.unlockCapability(EShapeCapability.LINE_HEAD);
				}
			}
		});
	}

	protected get selectLineHeadType(): DSelect<EShapePointsMarkerType> {
		return (this._selectLineHeadType ??= this.newSelectLineHeadType());
	}

	protected newSelectLineHeadType(): DSelect<EShapePointsMarkerType> {
		const theme = this.theme;
		return new DSelect<EShapePointsMarkerType>({
			width: "100%",
			value: EShapePointsMarkerType.NONE,
			menu: {
				items: [
					{
						value: EShapePointsMarkerType.NONE,
						text: {
							value: theme.getSelectLineHeadTypeLabel(EShapePointsMarkerType.NONE)
						}
					},
					{
						value: EShapePointsMarkerType.CIRCLE,
						text: {
							value: theme.getSelectLineHeadTypeLabel(EShapePointsMarkerType.CIRCLE)
						}
					},
					{
						value: EShapePointsMarkerType.TRIANGLE,
						text: {
							value: theme.getSelectLineHeadTypeLabel(EShapePointsMarkerType.TRIANGLE)
						}
					},
					{
						value: EShapePointsMarkerType.RECTANGLE,
						text: {
							value: theme.getSelectLineHeadTypeLabel(
								EShapePointsMarkerType.RECTANGLE
							)
						}
					}
				]
			},
			on: {
				change: (value: EShapePointsMarkerType | null): void => {
					this._selection.setLineHeadType(value ?? EShapePointsMarkerType.NONE);
				}
			}
		});
	}

	protected get layoutLineHeadSize(): DLayoutHorizontal {
		return (this._layoutLineHeadSize ??= this.newLayoutLineHeadSize());
	}

	protected newLayoutLineHeadSize(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "100%",
			children: [this.inputLineHeadSizeX, this.inputLineHeadSizeY]
		});
	}

	protected get inputLineHeadSizeX(): DInputReal {
		return (this._inputLineHeadSizeX ??= this.newInputLineHeadSizeX());
	}

	protected newInputLineHeadSizeX(): DInputReal {
		return new DInputReal({
			weight: 1,
			min: 0,
			on: {
				change: (value: number): void => {
					this._selection.setLineHeadSizeX(value);
				}
			}
		});
	}

	protected get inputLineHeadSizeY(): DInputReal {
		return (this._inputLineHeadSizeY ??= this.newInputLineHeadSizeY());
	}

	protected newInputLineHeadSizeY(): DInputReal {
		return new DInputReal({
			weight: 1,
			min: 0,
			on: {
				change: (value: number): void => {
					this._selection.setLineHeadSizeY(value);
				}
			}
		});
	}

	protected get buttonLineHeadColor(): DButtonColor {
		return (this._buttonLineHeadColor ??= this.newButtonLineHeadColor());
	}

	protected newButtonLineHeadColor(): DButtonColor {
		const result = new DButtonColor({
			width: "100%",
			on: {
				change: (value: DColorAndAlpha): void => {
					this._selection.setLineHeadColor(value.color, value.alpha);
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

	protected get inputLineHeadMargin(): DInputRealAndLabel {
		return (this._inputLineHeadMargin ??= this.newInputLineHeadMargin());
	}

	protected newInputLineHeadMargin(): DInputRealAndLabel {
		return new DInputRealAndLabel({
			width: "100%",
			label: {
				text: {
					value: this.theme.getInputLineHeadMarginLabel()
				}
			},
			input: {
				weight: 1,
				on: {
					change: (value: number): void => {
						this._selection.setLineHeadMargin(value);
					}
				}
			}
		});
	}

	protected get layoutTexture(): DLayoutHorizontal | null {
		let result = this._layoutTexture;
		if (result == null) {
			result = this.newLayoutTexture();
			this._layoutTexture = result;
		}
		return result;
	}

	protected newLayoutTexture(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "100%",
			height: "auto",
			children: [
				new DLayoutSpace({ weight: 1 }),
				this.buttonTextureImage,
				this.buttonTextureGradient,
				this.buttonTextureFitTo,
				this.buttonTextureClear,
				new DLayoutSpace({ weight: 1 })
			]
		});
	}

	protected get buttonTextureImage(): DButtonFile<string> {
		return (this._buttonTextureImage ??= this.newButtonTextureImage());
	}

	protected newButtonTextureImage(): DButtonFile<string> {
		const theme = this.theme;
		return new DButtonFile<string>({
			image: {
				source: this._icons.editor_image
			},
			as: DButtonFileAs.DATA_URL,
			title: theme.getButtonTextureImageTitle(),
			theme: "EButtonEditor",
			on: {
				open: (dataUrl: string): void => {
					toImageElement(dataUrl).then((imageElement) => {
						this._selection.setImage(imageElement);
					});
				}
			}
		});
	}

	protected get buttonTextureGradient(): DButtonColorGradient {
		return (this._buttonTextureGradient ??= this.newButtonTextureGradient());
	}

	protected newButtonTextureGradient(): DButtonColorGradient {
		const theme = this.theme;
		const result = new DButtonColorGradient({
			image: {
				source: this._icons.texture_gradient
			},
			text: {
				formatter: () => ""
			},
			title: theme.getButtonTextureGradientTitle(),
			theme: "EButtonEditor",
			on: {
				change: (value: DColorGradientObservable): void => {
					const url = toGradientImageUrl(value);
					toImageElement(url).then((imageElement) => {
						this._selection.setGradient(imageElement, value.toObject());
					});
				}
			}
		});
		result.dialog.on("open", (): void => {
			const last = this._selection.last();
			if (last != null && last.gradient != null) {
				result.dialog.value.fromObject(last.gradient);
			}
		});
		return result;
	}

	protected get buttonTextureFitTo(): DButton<string> {
		return (this._buttonTextureFitTo ??= this.newButtonTextureFitTo());
	}

	protected newButtonTextureFitTo(): DButton<string> {
		const theme = this.theme;
		return new DButton<string>({
			image: {
				source: this._icons.texture_fit_to
			},
			title: theme.getButtonTextureFitToTitle(),
			theme: "EButtonEditor",
			on: {
				active: (): void => {
					this._selection.fitToImage();
				}
			}
		});
	}

	protected get buttonTextureClear(): DButton<string> {
		return (this._buttonTextureClear ??= this.newButtonTextureClear());
	}

	protected newButtonTextureClear(): DButton<string> {
		const theme = this.theme;
		return new DButton<string>({
			image: {
				source: this._icons.texture_clear
			},
			title: theme.getButtonTextureClearTitle(),
			theme: "EButtonEditor",
			on: {
				active: (): void => {
					this._selection.clearImage();
				}
			}
		});
	}

	protected onSelectionChange(): void {
		const selection = this._selection;
		this.state.isDisabled = selection.isEmpty();
		const last = selection.last();

		// Change To
		const layoutChangeTo = this.layoutChangeTo;
		if (layoutChangeTo) {
			layoutChangeTo.state.isEnabled = EShapeCapabilities.contains(
				last,
				EShapeCapability.REPLACING
			);

			// Connector
			if (!this._isDanglingConnectorAllowed) {
				let hasConnector = false;
				const shapes = selection.get();
				for (let i = 0, imax = shapes.length; i < imax; ++i) {
					if (shapes[i] instanceof EShapeConnectorLine) {
						hasConnector = true;
						break;
					}
				}
				this.buttonLineConnector.state.isEnabled = hasConnector;
				this.buttonElbowConnector.state.isEnabled = hasConnector;
			}
		}

		// Grouping
		let ngroupable = 0;
		if (2 <= selection.size()) {
			const shapes = selection.get();
			for (let i = 0, imax = shapes.length; i < imax; ++i) {
				if (EShapeCapabilities.contains(shapes[i], EShapeCapability.GROUPING)) {
					ngroupable += 1;
					if (2 <= ngroupable) {
						break;
					}
				}
			}
		}
		this.buttonGroup.state.isEnabled = 2 <= ngroupable;

		// Ungrouping
		this.buttonUngroup.state.isEnabled =
			last instanceof EShapeGroup &&
			EShapeCapabilities.contains(last, EShapeCapability.CHILDREN) &&
			EShapeCapabilities.contains(last, EShapeCapability.UNGROUPING);

		// Fill
		if (last != null) {
			this.buttonFill.state.isActive = last.fill.enable;
			const fill = last.fill;
			const buttonFillColor = this.buttonFillColor;
			const value = buttonFillColor.value;
			value.color = fill.color;
			value.alpha = fill.alpha;
			buttonFillColor.state.isEnabled = fill.enable;
		}

		// Stroke
		if (last != null) {
			const stroke = last.stroke;
			const strokeEnable = stroke.enable;
			this.buttonStroke.state.isActive = strokeEnable;

			// Stroke color
			const buttonStrokeColor = this.buttonStrokeColor;
			const value = buttonStrokeColor.value;
			value.color = stroke.color;
			value.alpha = stroke.alpha;
			buttonStrokeColor.state.isEnabled = strokeEnable;

			// Stroke align
			const inputStrokeAlign = this.inputStrokeAlign;
			inputStrokeAlign.input.value = stroke.align;
			inputStrokeAlign.state.isEnabled = strokeEnable;

			// Stroke width
			const inputStrokeWidth = this.inputStrokeWidth;
			inputStrokeWidth.input.value = stroke.width;
			inputStrokeWidth.state.isEnabled = strokeEnable;

			// Stroke side
			const side = stroke.side;
			const hasStrokeSide =
				strokeEnable && EShapeCapabilities.contains(last, EShapeCapability.STROKE_SIDE);
			const buttonStrokeSideTop = this.buttonStrokeSideTop;
			const buttonStrokeSideRight = this.buttonStrokeSideRight;
			const buttonStrokeSideBottom = this.buttonStrokeSideBottom;
			const buttonStrokeSideLeft = this.buttonStrokeSideLeft;
			buttonStrokeSideTop.state.isEnabled = hasStrokeSide;
			buttonStrokeSideRight.state.isEnabled = hasStrokeSide;
			buttonStrokeSideBottom.state.isEnabled = hasStrokeSide;
			buttonStrokeSideLeft.state.isEnabled = hasStrokeSide;
			buttonStrokeSideTop.state.isActive = !!(side & EShapeStrokeSide.TOP);
			buttonStrokeSideRight.state.isActive = !!(side & EShapeStrokeSide.RIGHT);
			buttonStrokeSideBottom.state.isActive = !!(side & EShapeStrokeSide.BOTTOM);
			buttonStrokeSideLeft.state.isActive = !!(side & EShapeStrokeSide.LEFT);

			// Stroke style
			const style = stroke.style;
			const buttonStrokeExpandable = this.buttonStrokeExpandable;
			const buttonStrokeShrinkable = this.buttonStrokeShrinkable;
			const buttonStrokeScalableDotDash = this.buttonStrokeScalableDotDash;
			buttonStrokeExpandable.state.isEnabled = strokeEnable;
			buttonStrokeShrinkable.state.isEnabled = strokeEnable;
			buttonStrokeScalableDotDash.state.isEnabled = strokeEnable;
			buttonStrokeExpandable.state.isActive = !(
				style & EShapeStrokeStyle.NON_EXPANDING_WIDTH
			);
			buttonStrokeShrinkable.state.isActive = !(
				style & EShapeStrokeStyle.NON_SHRINKING_WIDTH
			);
			buttonStrokeScalableDotDash.state.isActive = !(
				style & EShapeStrokeStyle.NON_SCALING_DOT_AND_DASH
			);
		}

		// Line
		const layoutLine = this.layoutLine;
		const buttonLineLock = this.buttonLineLock;
		const selectLineStyle = this.selectLineStyle;
		const selectLineType = this.selectLineType;
		const buttonLineClosed = this.buttonLineClosed;

		const layoutLineTail = this.layoutLineTail;
		const buttonLineTailLock = this.buttonLineTailLock;
		const selectLineTailType = this.selectLineTailType;
		const inputLineTailSizeX = this.inputLineTailSizeX;
		const inputLineTailSizeY = this.inputLineTailSizeY;
		const buttonLineTailColor = this.buttonLineTailColor;
		const inputLineTailMargin = this.inputLineTailMargin;

		const layoutLineHead = this.layoutLineHead;
		const buttonLineHeadLock = this.buttonLineHeadLock;
		const selectLineHeadType = this.selectLineHeadType;
		const inputLineHeadSizeX = this.inputLineHeadSizeX;
		const inputLineHeadSizeY = this.inputLineHeadSizeY;
		const buttonLineHeadColor = this.buttonLineHeadColor;
		const inputLineHeadMargin = this.inputLineHeadMargin;

		if (last != null && last.points != null) {
			const points = last.points;
			const hasLine = EShapeCapabilities.contains(last, EShapeCapability.LINE);
			layoutLine.state.isEnabled = true;
			buttonLineLock.state.isActive = this.isLocked(last, EShapeCapability.LINE);
			buttonLineLock.state.isEnabled = true;
			const lineStrokeMask = EShapeStrokeStyle.DOTTED_MASK | EShapeStrokeStyle.DASHED_MASK;
			selectLineStyle.value = last.stroke.style & lineStrokeMask;
			selectLineStyle.state.isEnabled = hasLine;
			selectLineType.value = points.style & EShapePointsStyle.FORMATTER_MASK;
			selectLineType.state.isEnabled = hasLine;
			buttonLineClosed.state.isActive = (points.style & EShapePointsStyle.CLOSED) !== 0;
			buttonLineClosed.state.isEnabled = hasLine;

			const hasLineTail = EShapeCapabilities.contains(last, EShapeCapability.LINE_TAIL);
			layoutLineTail.state.isEnabled = true;
			buttonLineTailLock.state.isActive = this.isLocked(last, EShapeCapability.LINE_TAIL);
			buttonLineTailLock.state.isEnabled = true;
			const markerTail = points.marker.tail;
			selectLineTailType.value = markerTail.type;
			selectLineTailType.state.isEnabled = hasLineTail;
			inputLineTailSizeX.value = markerTail.size.x;
			inputLineTailSizeX.state.isEnabled = hasLineTail;
			inputLineTailSizeY.value = markerTail.size.y;
			inputLineTailSizeY.state.isEnabled = hasLineTail;
			const markerTailFill = markerTail.fill;
			const buttonLineTailColorValue = buttonLineTailColor.value;
			buttonLineTailColorValue.color = markerTailFill.color;
			buttonLineTailColorValue.alpha = markerTailFill.alpha;
			buttonLineTailColor.state.isEnabled = markerTailFill.enable && hasLineTail;
			if (last instanceof EShapeConnectorLine) {
				inputLineTailMargin.input.value = last.edge.tail.margin;
				inputLineTailMargin.state.isEnabled = hasLineTail;
			} else {
				inputLineTailMargin.state.isEnabled = false;
			}

			const hasLineHead = EShapeCapabilities.contains(last, EShapeCapability.LINE_HEAD);
			layoutLineHead.state.isEnabled = true;
			buttonLineHeadLock.state.isActive = this.isLocked(last, EShapeCapability.LINE_HEAD);
			buttonLineHeadLock.state.isEnabled = true;
			const markerHead = points.marker.head;
			selectLineHeadType.value = markerHead.type;
			selectLineHeadType.state.isEnabled = hasLineHead;
			inputLineHeadSizeX.value = markerHead.size.x;
			inputLineHeadSizeX.state.isEnabled = hasLineHead;
			inputLineHeadSizeY.value = markerHead.size.y;
			inputLineHeadSizeY.state.isEnabled = hasLineHead;
			const markerHeadFill = markerHead.fill;
			const buttonLineHeadColorValue = buttonLineHeadColor.value;
			buttonLineHeadColorValue.color = markerHeadFill.color;
			buttonLineHeadColorValue.alpha = markerHeadFill.alpha;
			buttonLineHeadColor.state.isEnabled = markerHeadFill.enable && hasLineHead;
			if (last instanceof EShapeConnectorLine) {
				inputLineHeadMargin.input.value = last.edge.head.margin;
				inputLineHeadMargin.state.isEnabled = hasLineHead;
			} else {
				inputLineHeadMargin.state.isEnabled = false;
			}
		} else {
			layoutLine.state.isEnabled = false;
			buttonLineLock.state.isEnabled = false;
			selectLineStyle.state.isEnabled = false;
			selectLineType.state.isEnabled = false;
			buttonLineClosed.state.isEnabled = false;

			layoutLineTail.state.isEnabled = false;
			buttonLineTailLock.state.isEnabled = false;
			selectLineTailType.state.isEnabled = false;
			inputLineTailSizeX.state.isEnabled = false;
			inputLineTailSizeY.state.isEnabled = false;
			buttonLineTailColor.state.isEnabled = false;
			inputLineTailMargin.state.isEnabled = false;

			layoutLineHead.state.isEnabled = false;
			buttonLineHeadLock.state.isEnabled = false;
			selectLineHeadType.state.isEnabled = false;
			inputLineHeadSizeX.state.isEnabled = false;
			inputLineHeadSizeY.state.isEnabled = false;
			buttonLineHeadColor.state.isEnabled = false;
			inputLineHeadMargin.state.isEnabled = false;
		}

		// Corner
		if (last != null) {
			const hasBorderRadius = EShapeCapabilities.contains(
				last,
				EShapeCapability.BORDER_RADIUS
			);
			this.textCorner.state.isEnabled = hasBorderRadius;
			this.inputCornerRadius.value = last.radius;
			this.inputCornerRadius.state.isEnabled = hasBorderRadius;

			this.layoutCorner.state.isEnabled = hasBorderRadius;
			this.buttonCornerBottomLeft.state.isActive = !!(last.corner & EShapeCorner.BOTTOM_LEFT);
			this.buttonCornerBottomRight.state.isActive = !!(
				last.corner & EShapeCorner.BOTTOM_RIGHT
			);
			this.buttonCornerTopLeft.state.isActive = !!(last.corner & EShapeCorner.TOP_LEFT);
			this.buttonCornerTopRight.state.isActive = !!(last.corner & EShapeCorner.TOP_RIGHT);
		}

		// Texture
		if (last != null) {
			this.buttonTextureFitTo.state.isDisabled = last.image == null;
			this.buttonTextureClear.state.isDisabled = last.image == null;
		}
	}

	protected override getType(): string {
		return "EEditorShape";
	}
}
