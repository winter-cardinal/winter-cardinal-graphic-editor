import {
	createImage,
	DApplication,
	DApplicationOptions,
	DBase,
	DBaseState,
	DButton,
	DButtonFile,
	DButtonFileAs,
	DButtonGroup,
	DButtonRedo,
	DButtonUndo,
	DCommandSave,
	DControllers,
	DDiagramEditor,
	DDiagramEditorOptions,
	DDiagrams,
	DDiagramSerializedName,
	DDialogConfirmDelete,
	DDialogConfirmDiscard,
	DDialogOpener,
	DDialogProcessing,
	DDialogSaveAs,
	DDialogSelect,
	DDialogSelectController,
	DLayoutHorizontal,
	DLayoutSpace,
	DLayoutVertical,
	DThemes,
	DViewTarget,
	EShape,
	EShapeCircle,
	EShapeConnectorLine,
	EShapeEmbeddeds,
	EShapeLine,
	EShapeRectangle,
	EShapeRectangleRounded,
	EShapeResourceManagerDeserializationMode,
	EShapeSemicircle,
	EShapeTriangle,
	EShapeTriangleRounded,
	EShapeType,
	isArray,
	isFunction,
	isString,
	UtilClipboard,
	UtilFileDownloader,
	UtilGestureModifier,
	UtilGestureModifiers,
	UtilKeyboardEvent
} from "@wcardinal/wcardinal-ui";
import { Container, DisplayObject, InteractionEvent, Rectangle, Texture } from "pixi.js";
import { ECommandShapeCreate } from "./command/e-command-shape-create";
import { GraphicComponent } from "./data/graphic-component";
import { EDialogProcessing } from "./editor/e-dialog-processing";
import {
	getDialogSelectThumbnailSize,
	newDialogSelectWithThumbnails
} from "./editor/e-dialog-select-with-thumbnails";
import { EEditorAction } from "./editor/e-editor-action";
import { EEditorCanvas } from "./editor/e-editor-canvas";
import { EEditorCanvasLegacy } from "./editor/e-editor-canvas-legacy";
import { EEditorCoordinate } from "./editor/e-editor-coordinate";
import { EEditorLayer } from "./editor/e-editor-layer";
import { EEditorShape, EThemeEditorShape } from "./editor/e-editor-shape";
import { EEditorSnap } from "./editor/e-editor-snap";
import { EEditorData } from "./editor/e-editor-data";
import { EEditorText } from "./editor/e-editor-text";
import { EEditorTree, EThemeEditorTree } from "./editor/e-editor-tree";
import {
	EShapeExtensionCreateable,
	EShapeExtensionCreator
} from "./extension/e-shape-extension-creatable";
import { EShapeExtensionEditor } from "./extension/e-shape-extension-editor";
import { EShapeExtensionFactories } from "./extension/e-shape-extension-factories";
import { EShapeExtensionFactory } from "./extension/e-shape-extension-factory";
import {
	EShapeExtensionNewTypeEditable,
	EShapeExtensionNewTypeEditableEditor
} from "./extension/e-shape-extension-new-type-editable";
import { EShapeExtensions } from "./extension/e-shape-extensions";
import { EToolGroupImpl } from "./tool/e-tool-group-impl";
import { EToolSelect } from "./tool/e-tool-select";
import { EToolShapeCreate } from "./tool/e-tool-shape-create";
import { EToolShapeCreateLine } from "./tool/e-tool-shape-create-line";
import { EToolShapeEditLine } from "./tool/e-tool-shape-edit-line";
import { EToolShapeCreateLineConnector } from "./tool/e-tool-shape-create-line-connector";
import { EToolShapeEditLineConnector } from "./tool/e-tool-shape-edit-line-connector";
import { ETool } from "./tool/e-tool";
import { EShapeExtensionNewTypeCreatable } from "./extension/e-shape-extension-new-type-creatable";
import {
	EShapeExtensionUpdater,
	EShapeExtensionUpdaterCreator,
	EShapeExtensionUpdaterCreatorOptions
} from "./extension/e-shape-extension-new-type";
import { EEditorDataMapping } from "./editor/e-editor-data-mapping";
import { EToolShapeCreateElbowConnector } from "./tool/e-tool-shape-create-elbow-connector";
import { EValidator } from "./editor/e-validator";
import { EEditorValidation } from "./editor/e-editor-validation";
import { EEditorSearch } from "./editor/e-editor-search";
import { EFinder } from "./editor/e-finder";
import { ECommandDocumentCreate } from "./command/e-command-document-create";
import { ECommandDocumentOpen } from "./command/e-command-document-open";
import { FThemeGraphicEditor } from "./f-theme-graphic-editor";
import { EDialogCanvas, EDialogCanvasValue } from "./editor/e-dialog-canvas";
import { UtilCanvas, UtilCanvasOptions } from "./util/util-canvas";

/**
 * {@link FGraphicEditor} controller options
 */
export interface FGraphicEditorControllerOptions {
	/**
	 * A graphic controller that handles I/O requests of fetching / saving edited graphics.
	 */
	graphic: GraphicComponent;

	/**
	 * A function returning an URL of a thumbnail image of the given graphic.
	 *
	 * @param id an ID of a graphic
	 * @returns a thumbnail or undefined
	 */
	toThumbnail?: (id: number) => string | Texture | DisplayObject | undefined;

	/**
	 * A function returning an URL of a thumbnail image of the given graphic piece.
	 *
	 * @param id an ID of a graphic piece
	 * @returns a thumbnail or undefined
	 */
	toPieceThumbnail?: (id: number) => string | Texture | DisplayObject | undefined;
}

export interface FGraphicEditorController {
	graphic: GraphicComponent;
	toThumbnail?: (id: number) => string | Texture | DisplayObject | undefined;
	toPieceThumbnail?: (id: number) => string | Texture | DisplayObject | undefined;
}

export interface FGraphicEditorCanvasOptions extends UtilCanvasOptions {}

export interface FGraphicEditorPieceOptions {
	enable?: boolean;
	toId?: (diagram: DDiagramEditor) => number | null;
}

/**
 * {@link FGraphicEditor} validation options
 */
export interface FGraphicEditorValidationOptions {
	/**
	 * A graphic validator.
	 *
	 * @default undefined
	 */
	validator?: EValidator;

	/**
	 * True to force the validation before saving graphics.
	 *
	 * @default false
	 */
	force?: boolean;
}

export interface FGraphicEditorValidation {
	validator?: EValidator;
	force: boolean;
}

/**
 * {@link FGraphicEditor} search options
 */
export interface FGraphicEditorSearchOptions {
	finder?: EFinder;
	/**
	 * A throttling interval of the search.
	 *
	 * @default 333
	 */
	interval?: number;
}

export interface FGraphicEditorSearch {
	finder?: EFinder;
	interval?: number;
}

/**
 * {@link FGraphicEditor} connector options
 */
export interface FGraphicEditorConnectorOptions {
	/**
	 * True to allow creating dangling connectors.
	 * Even when this is set to false, the graphic editor doesn't check if there are dangling connectors.
	 * To validate graphics before saving them, please use {@link FGraphicEditorValidationOptions}.
	 */
	dangling?: boolean;
}

export interface FGraphicEditorCompatibilityEditorOptions {
	canvas?: boolean;
}

export interface FGraphicEditorCompatibilityOptions {
	editor?: FGraphicEditorCompatibilityEditorOptions;
}

/**
 * {@link FGraphicEditor} options
 */
export interface FGraphicEditorOptions {
	controller: FGraphicEditorControllerOptions;
	application?: DApplicationOptions;
	diagram?: DDiagramEditorOptions;

	/**
	 * A function to create a header.
	 * null / undefined to remove the header.
	 * @param buttons a list of file buttons like the `open` button.
	 * @returns A header or null.
	 */
	header?: (buttons: DisplayObject[]) => DBase | null;

	editable?: boolean;
	margin?: number;
	canvas?: FGraphicEditorCanvasOptions;
	piece?: FGraphicEditorPieceOptions;
	validation?: FGraphicEditorValidationOptions;
	search?: FGraphicEditorSearchOptions;
	connector?: FGraphicEditorConnectorOptions;
	compatibility?: FGraphicEditorCompatibilityOptions;
	theme?: string | FThemeGraphicEditor;
}

export class FGraphicEditor<OPTIONS extends FGraphicEditorOptions = FGraphicEditorOptions> {
	protected _application: DApplication;
	protected _options: OPTIONS;
	protected _theme: FThemeGraphicEditor;
	protected _margin: number;
	protected _controller: FGraphicEditorController;
	protected _isPieceEnabled: boolean;
	protected _toPieceId: (diagram: DDiagramEditor) => number | null;
	protected _isEditable: boolean;
	protected _icons: Record<string, Texture>;
	protected _validation: FGraphicEditorValidation;
	protected _search: FGraphicEditorSearch;
	protected _canvas: UtilCanvas;

	protected _diagram?: DDiagramEditor;
	protected _localBoundsCanvas?: Rectangle;
	protected _localBoundsDiagram?: Rectangle;

	protected _header?: DBase;

	protected _toolFileButtonCreate?: DButton<string>;
	protected _toolFileButtonOpen?: DButton<string>;
	protected _toolFileButtonSave?: DButton<string>;
	protected _toolFileButtonSaveAs?: DButton<string>;
	protected _toolFileButtonUpload?: DButton<string>;
	protected _toolFileButtonDownload?: DButton<string>;
	protected _toolFileButtonUndo?: DButton<string>;
	protected _toolFileButtonRedo?: DButton<string>;
	protected _toolFileButtonDelete?: DButton<string>;

	protected _toolShapeButtonGroup?: DButtonGroup;
	protected _toolShapeButtonSelect?: DButton<string>;
	protected _toolShapeButtonCircle?: DButton<string>;
	protected _toolShapeButtonSemicircle?: DButton<string>;
	protected _toolShapeButtonRectangle?: DButton<string>;
	protected _toolShapeButtonRectangleRounded?: DButton<string>;
	protected _toolShapeButtonTriangle?: DButton<string>;
	protected _toolShapeButtonTriangleRounded?: DButton<string>;
	protected _toolShapeButtonLine?: DButton<string>;
	protected _toolShapeButtonLineConnector?: DButton<string>;
	protected _toolShapeButtonElbowConnector?: DButton<string>;
	protected _toolShapeButtonImage?: DButton<string>;
	protected _toolShapeButtonGraphicPiece?: DButton<string>;

	protected _editorButtonGroup?: DButtonGroup | null;
	protected _editorButtonCoordinate?: DButton<string>;
	protected _editorButtonShape?: DButton<string>;
	protected _editorButtonText?: DButton<string>;
	protected _editorButtonData?: DButton<string>;
	protected _editorButtonDataMapping?: DButton<string>;
	protected _editorButtonTree?: DButton<string>;
	protected _editorButtonAction?: DButton<string>;
	protected _editorButtonLayer?: DButton<string>;
	protected _editorButtonSnap?: DButton<string>;
	protected _editorButtonValidation?: DButton<string>;
	protected _editorButtonSearch?: DButton<string>;
	protected _editorButtonCanvasLegacy?: DButton<string>;
	protected _editorButtonExtensionLast?: DButton<string>;

	protected _editorContainer?: DBase;
	protected _editorCoordinate?: EEditorCoordinate;
	protected _editorShape?: EEditorShape;
	protected _editorText?: EEditorText;
	protected _editorData?: EEditorData;
	protected _editorDataMapping?: EEditorDataMapping;
	protected _editorTree?: EEditorTree;
	protected _editorAction?: EEditorAction;
	protected _editorLayer?: EEditorLayer;
	protected _editorSnap?: EEditorSnap;
	protected _editorValidation?: EEditorValidation;
	protected _editorSearch?: EEditorSearch;
	protected _editorCanvas?: EEditorCanvas;
	protected _editorCanvasLegacy?: EEditorCanvasLegacy;

	protected _viewButtonZoomOut?: DButton<string>;
	protected _viewButtonZoomIn?: DButton<string>;
	protected _viewButtonDragAndPinch?: DButton<string>;
	protected _viewButtonReset?: DButton<string>;
	protected _viewButtonFit?: DButton<string>;

	protected _toolGroup?: EToolGroupImpl;
	protected _toolShapeSelect?: EToolSelect;
	protected _toolShapeCreate?: EToolShapeCreate;
	protected _toolShapeCreateLine?: EToolShapeCreateLine;
	protected _toolShapeCreateLineConnector?: EToolShapeCreateLineConnector;
	protected _toolShapeCreateElbowConnector?: EToolShapeCreateElbowConnector;
	protected _toolShapeEditLine?: EToolShapeEditLine;
	protected _toolShapeEditLineConnector?: EToolShapeEditLineConnector;

	protected _dialogSaveProcessing?: DDialogProcessing;
	protected _dialogDeleteProcessing?: DDialogProcessing;
	protected _dialogSaveAs?: DDialogSaveAs;
	protected _dialogCreate?: Promise<EDialogCanvas>;
	protected _dialogDiscard?: DDialogConfirmDiscard;
	protected _dialogSelect?: Promise<DDialogSelect<DDiagramSerializedName, string>>;
	protected _dialogSelectPiece?: Promise<DDialogSelect<DDiagramSerializedName, string>>;
	protected _dialogDelete?: DDialogConfirmDelete;

	constructor(options: OPTIONS) {
		// Options
		this._options = options;
		const theme = this.toTheme(options);
		this._theme = theme;
		this._margin = options.margin ?? theme.getMargin();
		const piece = options.piece;
		this._isPieceEnabled = piece?.enable ?? true;
		this._toPieceId = piece?.toId ?? (() => null);
		this._isEditable = options.editable !== false;
		this._icons = this.toIcons(theme);
		this._validation = this.toValidation(options);
		this._search = this.toSearch(options);
		this._controller = options.controller;
		this._canvas = new UtilCanvas(options.canvas);

		// Application
		this._application = new DApplication(options.application);

		// Others
		this._editorButtonGroup = null;
		this.init();
	}

	get application(): DApplication {
		return this._application;
	}

	get controller(): FGraphicEditorController {
		return this._controller;
	}

	protected toIcons(theme: FThemeGraphicEditor): Record<string, Texture> {
		const iconBuilder = theme.getIconBuilder();
		EShapeExtensions.merge(iconBuilder);
		EShapeExtensionFactories.merge(iconBuilder);
		const result = iconBuilder.build();
		EShapeExtensions.build(result);
		EShapeExtensionFactories.build(result);
		return result;
	}

	protected toValidation(options: OPTIONS): FGraphicEditorValidation {
		const validation = options.validation;
		if (validation != null) {
			return {
				validator: validation.validator,
				force: validation.force === true
			};
		}
		return {
			validator: undefined,
			force: false
		};
	}

	protected toSearch(options: OPTIONS): FGraphicEditorSearch {
		const search = options.search;
		if (search != null) {
			return {
				finder: search.finder
			};
		}
		return {
			finder: undefined
		};
	}

	protected init(): void {
		this.initDiagram();
		this.initHeader();
		this.initTools();
		this.initEditors();
		this.initCopyAndPaste();
		this.initShortcut();
	}

	protected initDiagram(): void {
		const diagram = this.diagram;
		this.getDiagramContainer().addChild(diagram);
		DControllers.setDocumentController(diagram);
	}

	protected initHeader(): void {
		const header = this.newHeader(this._options);
		if (header) {
			this.getHeaderContainer().addChild(header);
			this._header = header;
		}
	}

	protected initTools(): void {
		this.getToolButtonLayoutContainer().addChild(this.newToolButtonLayout());

		// Activates the select tool and then disables all the tools.
		// Otherwise, toolShapeButtonSelect.activate() won't work
		// because toolShapeButtonSelect.state.isActionable is not true.
		this.toolShapeButtonSelect.activate();
		this.toolShapeButtonGroup.disable();
	}

	protected initEditors(): void {
		this.getEditorLayoutContainer().addChild(this.newEditorLayout());

		if (!this.isEditorCanvasCompatible()) {
			this.diagram.addChild(this.editorCanvas);
		}

		// Activate the coordinate editor
		this.editorButtonCoordinate.activate();
	}

	protected initCopyAndPaste(): void {
		new UtilClipboard()
			.on("copy", (clipboardData: DataTransfer): void => {
				const serialized = this.toolShapeSelect.selection.serialize();
				if (serialized != null) {
					clipboardData.setData("text", serialized);
				}
			})
			.on("cut", (clipboardData: DataTransfer): void => {
				const serialized = this.toolShapeSelect.selection.serialize();
				if (serialized != null) {
					clipboardData.setData("text", serialized);
					this.toolShapeSelect.selection.delete();
				}
			})
			.on("paste", (clipboardData: DataTransfer): void => {
				const serialized = clipboardData.getData("text");
				this.toolShapeSelect.selection.deserialize(serialized);
			});
	}

	protected initShortcut(): void {
		this.initShortcutShape();
		this.initShortcutTree();
	}

	protected initShortcutShape(): void {
		const theme = DThemes.get<EThemeEditorShape>("EEditorShape");
		const groupShortcut = theme.getButtonGroupShortcut();
		if (groupShortcut != null) {
			UtilKeyboardEvent.on(this.diagram, groupShortcut, (e: KeyboardEvent): void => {
				this.toolShapeSelect.selection.group();
			});
		}
		const ungroupShortcut = theme.getButtonUngroupShortcut();
		if (ungroupShortcut != null) {
			UtilKeyboardEvent.on(this.diagram, ungroupShortcut, (e: KeyboardEvent): void => {
				this.toolShapeSelect.selection.ungroup();
			});
		}
	}

	protected initShortcutTree(): void {
		const theme = DThemes.get<EThemeEditorTree>("EEditorTree");
		const bringToFrontShortcut = theme.getButtonBringToFrontShortcut();
		if (bringToFrontShortcut != null) {
			UtilKeyboardEvent.on(this.diagram, bringToFrontShortcut, (e: KeyboardEvent): void => {
				this.toolShapeSelect.selection.bringToFront();
			});
		}
		const bringToForwardShortcut = theme.getButtonBringForwardShortcut();
		if (bringToForwardShortcut != null) {
			UtilKeyboardEvent.on(this.diagram, bringToForwardShortcut, (e: KeyboardEvent): void => {
				this.toolShapeSelect.selection.bringForward();
			});
		}
		const sendBackwardShortcut = theme.getButtonSendBackwardShortcut();
		if (sendBackwardShortcut != null) {
			UtilKeyboardEvent.on(this.diagram, sendBackwardShortcut, (e: KeyboardEvent): void => {
				this.toolShapeSelect.selection.sendBackward();
			});
		}
		const sendToBackShortcut = theme.getButtonSendToBackShortcut();
		if (sendToBackShortcut != null) {
			UtilKeyboardEvent.on(this.diagram, sendToBackShortcut, (e: KeyboardEvent): void => {
				this.toolShapeSelect.selection.sendToBack();
			});
		}
	}

	protected newHeader(options: OPTIONS): DBase | null {
		const header = options.header;
		if (header != null) {
			const result = header(this.newToolFileButtons());
			if (result) {
				const margin = this._margin;
				result.x = margin;
				result.y = margin;
				result.setWidth((p) => p - 2 * margin);
				return result;
			}
		}
		return null;
	}

	protected getHeaderContainer(): Container {
		return this._application.stage;
	}

	protected get toolFileButtonCreate(): DButton<string> {
		return (this._toolFileButtonCreate ??= this.newToolFileButtonCreate());
	}

	protected newToolFileButtonCreate(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			image: {
				source: this._icons.new
			},
			title: theme.getToolFileButtonCreateTitle(),
			shortcut: theme.getToolFileButtonCreateShortcut(),
			theme: theme.getToolFileButtonTheme(),
			state: this._isEditable ? undefined : DBaseState.DISABLED,
			on: {
				active: (emitter): void => {
					this.onToolFileButtonCreateActive(emitter);
				}
			}
		});
	}

	protected onToolFileButtonCreateActive(opener?: DDialogOpener): void {
		if (this.diagram.isChanged()) {
			this.dialogDiscard.open(opener).then((): void => {
				this.dialogCreate.then((dialogCreate) => {
					dialogCreate.reset().open(opener);
				});
			});
		} else {
			this.dialogCreate.then((dialogCreate) => {
				dialogCreate.reset().open(opener);
			});
		}
	}

	protected get toolFileButtonOpen(): DButton<string> {
		return (this._toolFileButtonOpen ??= this.newToolFileButtonOpen());
	}

	protected newToolFileButtonOpen(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			image: {
				source: this._icons.open
			},
			title: theme.getToolFileButtonOpenTitle(),
			shortcut: theme.getToolFileButtonOpenShortcut(),
			theme: theme.getToolFileButtonTheme(),
			on: {
				active: (emitter): void => {
					this.onToolFileButtonOpenActive(emitter);
				}
			}
		});
	}

	protected onToolFileButtonOpenActive(opener?: DDialogOpener): void {
		if (this.diagram.isChanged()) {
			this.dialogDiscard.open(opener).then((): void => {
				this.dialogSelect.then((dialogSelect) => {
					dialogSelect.open(opener);
				});
			});
		} else {
			this.dialogSelect.then((dialogSelect) => {
				dialogSelect.open(opener);
			});
		}
	}

	protected get toolFileButtonSave(): DButton<string> {
		return (this._toolFileButtonSave ??= this.newToolFileButtonSave());
	}

	protected newToolFileButtonSave(): DButton<string> {
		const theme = this._theme;
		const result = new DButton<string>({
			image: {
				source: this._icons.save
			},
			title: theme.getToolFileButtonSaveTitle(),
			shortcut: theme.getToolFileButtonSaveShortcut(),
			theme: theme.getToolFileButtonTheme(),
			state: DBaseState.DISABLED,
			on: {
				active: (): void => {
					this.onToolFileButtonSaveActive();
				}
			}
		});
		if (this._isEditable) {
			const diagram = this.diagram;
			diagram.on("change", (): void => {
				result.state.isDisabled = !diagram.isChanged();
			});
		}
		return result;
	}

	protected onToolFileButtonSaveActive(): void {
		this.validate().then(() => {
			DControllers.getCommandController().push(new DCommandSave());
		});
	}

	protected validate(): Promise<void> {
		const validation = this._validation;
		const validator = validation.validator;
		if (validator != null && validation.force) {
			const canvas = this.diagram.canvas;
			if (canvas) {
				try {
					const result = validator(canvas);
					if (result != null) {
						const dialogSaveProcessing = this.dialogSaveProcessing;
						dialogSaveProcessing.open(this.toolFileButtonSave);
						if (isArray(result)) {
							if (0 < result.length) {
								const editorValidation = this.editorValidation;
								editorValidation.list.data.clearAndAddAll(result);
								const editorButtonValidation = this.editorButtonValidation;
								if (!editorButtonValidation.state.isActive) {
									editorButtonValidation.activate();
								}
								dialogSaveProcessing.reject("validation");
								return Promise.reject();
							} else {
								return Promise.resolve();
							}
						} else {
							return result.then(
								(results) => {
									if (0 < results.length) {
										const editorValidation = this.editorValidation;
										editorValidation.list.data.clearAndAddAll(results);
										const editorButtonValidation = this.editorButtonValidation;
										if (!editorButtonValidation.state.isActive) {
											editorButtonValidation.activate();
										}
										dialogSaveProcessing.reject("validation");
										return Promise.reject();
									} else {
										return Promise.resolve();
									}
								},
								() => {
									dialogSaveProcessing.reject("validation-fail");
									return Promise.reject();
								}
							);
						}
					}
				} catch {
					const dialogSaveProcessing = this.dialogSaveProcessing;
					dialogSaveProcessing.open(this.toolFileButtonSave);
					dialogSaveProcessing.reject("validation-fail");
					return Promise.reject();
				}
			}
		}
		return Promise.resolve();
	}

	protected get toolFileButtonSaveAs(): DButton<string> {
		return (this._toolFileButtonSaveAs ??= this.newToolFileButtonSaveAs());
	}

	protected newToolFileButtonSaveAs(): DButton<string> {
		const theme = this._theme;
		const result = new DButton<string>({
			image: {
				source: this._icons.save_as
			},
			title: theme.getToolFileButtonSaveAsTitle(),
			shortcut: theme.getToolFileButtonSaveAsShortcut(),
			theme: theme.getToolFileButtonTheme(),
			state: DBaseState.DISABLED,
			on: {
				active: (): void => {
					this.onToolFileButtonSaveAsActive();
				}
			}
		});
		if (this._isEditable) {
			const diagram = this.diagram;
			diagram.on("set", (): void => {
				result.state.isDisabled = false;
			});
			diagram.on("unset", (): void => {
				result.state.isDisabled = true;
			});
		}
		return result;
	}

	protected onToolFileButtonSaveAsActive(): void {
		this.validate().then(() => {
			this.dialogSaveAs.open(this.toolFileButtonSaveAs);
		});
	}

	protected get toolFileButtonUpload(): DButton<string> {
		return (this._toolFileButtonUpload ??= this.newToolFileButtonUpload());
	}

	protected newToolFileButtonUpload(): DButton<string> {
		const theme = this._theme;
		const result = new DButtonFile<string>({
			image: {
				source: this._icons.upload
			},
			title: theme.getToolFileButtonUploadTitle(),
			shortcut: theme.getToolFileButtonUploadShortcut(),
			theme: theme.getToolFileButtonTheme(),
			as: DButtonFileAs.TEXT,
			checker: (): Promise<unknown> | boolean => {
				if (this.diagram.isChanged()) {
					return this.dialogDiscard.open(result);
				} else {
					return true;
				}
			},
			on: {
				open: (data: string): void => {
					this.onToolFileButtonUploadOpen(data);
				}
			}
		});
		return result;
	}

	protected onToolFileButtonUploadOpen(data: string): void {
		const parsed = DDiagrams.parse(data);
		if (parsed != null) {
			parsed.id = undefined;
			this.diagram.set(parsed);
		}
	}

	protected get toolFileButtonDownload(): DButton<string> {
		return (this._toolFileButtonDownload ??= this.newToolFileButtonDownload());
	}

	protected newToolFileButtonDownload(): DButton<string> {
		const theme = this._theme;
		const result = new DButton<string>({
			image: {
				source: this._icons.download
			},
			title: theme.getToolFileButtonDownloadTitle(),
			shortcut: theme.getToolFileButtonDownloadShortcut(),
			theme: theme.getToolFileButtonTheme(),
			state: DBaseState.DISABLED,
			on: {
				active: (): void => {
					this.onToolFileButtonDownloadActive();
				}
			}
		});
		const diagram = this.diagram;
		diagram.on("set", (): void => {
			result.state.isDisabled = false;
		});
		diagram.on("unset", (): void => {
			result.state.isDisabled = true;
		});
		return result;
	}

	protected onToolFileButtonDownloadActive(): void {
		const serialized = this.diagram.serialize();
		if (serialized != null) {
			UtilFileDownloader.download(`${serialized.name}.json`, JSON.stringify(serialized));
		}
	}

	protected get toolFileButtonUndo(): DButton<string> {
		return (this._toolFileButtonUndo ??= this.newToolFileButtonUndo());
	}

	protected newToolFileButtonUndo(): DButton<string> {
		const theme = this._theme;
		return new DButtonUndo<string>({
			title: theme.getToolFileButtonUndoTitle(),
			shortcut: theme.getToolFileButtonUndoShortcut(),
			theme: theme.getToolFileButtonTheme(),
			image: {
				source: this._icons.undo
			}
		});
	}

	protected get toolFileButtonRedo(): DButton<string> {
		return (this._toolFileButtonRedo ??= this.newToolFileButtonRedo());
	}

	protected newToolFileButtonRedo(): DButton<string> {
		const theme = this._theme;
		return new DButtonRedo<string>({
			title: theme.getToolFileButtonRedoTitle(),
			shortcut: theme.getToolFileButtonRedoShortcut(),
			theme: theme.getToolFileButtonTheme(),
			image: {
				source: this._icons.redo
			}
		});
	}

	protected get toolFileButtonDelete(): DButton<string> {
		return (this._toolFileButtonDelete ??= this.newToolFileButtonDelete());
	}

	protected newToolFileButtonDelete(): DButton<string> {
		const theme = this._theme;
		const result = new DButton<string>({
			image: {
				source: this._icons.delete
			},
			title: theme.getToolFileButtonDeleteTitle(),
			shortcut: theme.getToolFileButtonDeleteShortcut(),
			theme: theme.getToolFileButtonTheme(),
			state: DBaseState.DISABLED,
			on: {
				active: (emitter): void => {
					this.onToolFileButtonDelete(emitter);
				}
			}
		});
		if (this._isEditable) {
			const diagram = this.diagram;
			diagram.on("set", (): void => {
				result.state.isDisabled = false;
			});
			diagram.on("unset", (): void => {
				result.state.isDisabled = true;
			});
		}
		return result;
	}

	protected onToolFileButtonDelete(opener?: DDialogOpener): void {
		this.dialogDelete.open(opener);
	}

	protected get toolShapeButtonGroup(): DButtonGroup {
		return (this._toolShapeButtonGroup ??= this.newToolShapeButtonGroup());
	}

	protected newToolShapeButtonGroup(): DButtonGroup {
		const result = new DButtonGroup();
		const diagram = this.diagram;
		diagram.on("set", (): void => {
			result.enable();
		});
		diagram.on("unset", (): void => {
			result.disable();
		});
		return result;
	}

	protected get toolShapeButtonSelect(): DButton<string> {
		return (this._toolShapeButtonSelect ??= this.newToolShapeButtonSelect());
	}

	protected newToolShapeButtonSelect(): DButton<string> {
		const theme = this._theme;
		const result = new DButton<string>({
			group: this.toolShapeButtonGroup,
			toggle: true,
			title: theme.getToolShapeButtonSelectTitle(),
			theme: theme.getToolShapeButtonTheme(),
			image: {
				source: this._icons.select
			},
			on: {
				active: (): void => {
					this.onToolShapeButtonSelectActive();
				},
				inactive: (): void => {
					this.onToolShapeButtonSelectInactive();
				}
			}
		});

		return result;
	}

	protected onToolShapeButtonSelectActive(): void {
		this.toolGroup.activate(this.toolShapeSelect);
	}

	protected onToolShapeButtonSelectInactive(): void {
		this.toolGroup.deactivate(this.toolShapeSelect);
	}

	protected newToolShapeButtonCreate(
		title: string | undefined,
		icon: string,
		constructor: new () => EShape
	): DButton<string> {
		return new DButton<string>({
			group: this.toolShapeButtonGroup,
			toggle: true,
			title,
			theme: this._theme.getToolShapeButtonTheme(),
			image: {
				source: this._icons[icon]
			},
			on: {
				active: (): void => {
					this.onToolShapeButtonCreateActive(constructor);
				},
				inactive: (): void => {
					this.onToolShapeButtonCreateInactive();
				}
			}
		});
	}

	protected onToolShapeButtonCreateActive(constructor: new () => EShape): void {
		const toolShapeCreate = this.toolShapeCreate;
		toolShapeCreate.shape = () => new constructor();
		this.toolGroup.activate(toolShapeCreate, constructor);
	}

	protected onToolShapeButtonCreateInactive(): void {
		this.toolGroup.deactivate(this.toolShapeCreate);
	}

	protected get toolShapeButtonCircle(): DButton<string> {
		return (this._toolShapeButtonCircle ??= this.newToolShapeButtonCircle());
	}

	protected newToolShapeButtonCircle(): DButton<string> {
		const theme = this._theme;
		return this.newToolShapeButtonCreate(
			theme.getToolShapeButtonCircleTitle(),
			"shape_circle",
			EShapeCircle
		);
	}

	protected get toolShapeButtonSemicircle(): DButton<string> {
		return (this._toolShapeButtonSemicircle ??= this.newToolShapeButtonSemicircle());
	}

	protected newToolShapeButtonSemicircle(): DButton<string> {
		const theme = this._theme;
		return this.newToolShapeButtonCreate(
			theme.getToolShapeButtonSemicircleTitle(),
			"shape_semicircle",
			EShapeSemicircle
		);
	}

	protected get toolShapeButtonRectangle(): DButton<string> {
		return (this._toolShapeButtonRectangle ??= this.newToolShapeButtonRectangle());
	}

	protected newToolShapeButtonRectangle(): DButton<string> {
		const theme = this._theme;
		return this.newToolShapeButtonCreate(
			theme.getToolShapeButtonRectangleTitle(),
			"shape_rectangle",
			EShapeRectangle
		);
	}

	protected get toolShapeButtonRectangleRounded(): DButton<string> {
		return (this._toolShapeButtonRectangleRounded ??=
			this.newToolShapeButtonRectangleRounded());
	}

	protected newToolShapeButtonRectangleRounded(): DButton<string> {
		const theme = this._theme;
		return this.newToolShapeButtonCreate(
			theme.getToolShapeButtonRectangleRoundedTitle(),
			"shape_rectangle_rounded",
			EShapeRectangleRounded
		);
	}

	protected get toolShapeButtonTriangle(): DButton<string> {
		return (this._toolShapeButtonTriangle ??= this.newToolShapeButtonTriangle());
	}

	protected newToolShapeButtonTriangle(): DButton<string> {
		const theme = this._theme;
		return this.newToolShapeButtonCreate(
			theme.getToolShapeButtonTriangleTitle(),
			"shape_triangle",
			EShapeTriangle
		);
	}

	protected get toolShapeButtonTriangleRounded(): DButton<string> {
		return (this._toolShapeButtonTriangleRounded ??= this.newToolShapeButtonTriangleRounded());
	}

	protected newToolShapeButtonTriangleRounded(): DButton<string> {
		const theme = this._theme;
		return this.newToolShapeButtonCreate(
			theme.getToolShapeButtonTriangleRoundedTitle(),
			"shape_triangle_rounded",
			EShapeTriangleRounded
		);
	}

	protected get toolShapeButtonLine(): DButton<string> {
		return (this._toolShapeButtonLine ??= this.newToolShapeButtonLine());
	}

	protected newToolShapeButtonLine(): DButton<string> {
		const theme = this._theme;
		const result = new DButton<string>({
			group: this.toolShapeButtonGroup,
			toggle: true,
			title: theme.getToolShapeButtonLineTitle(),
			theme: theme.getToolShapeButtonTheme(),
			image: {
				source: this._icons.shape_line
			},
			on: {
				active: (): void => {
					this.onToolShapeButtonLineActive();
				},
				inactive: (): void => {
					this.onToolShapeButtonLineInactive();
				}
			}
		});
		this.toolShapeSelect.on("edit", (shape: EShape): void => {
			if (shape instanceof EShapeLine) {
				const toolShapeEditLine = this.toolShapeEditLine;
				toolShapeEditLine.shape = shape;
				this.toolGroup.activate(toolShapeEditLine);
			}
		});
		return result;
	}

	protected onToolShapeButtonLineActive(): void {
		this.toolGroup.activate(this.toolShapeCreateLine);
	}

	protected onToolShapeButtonLineInactive(): void {
		this.toolGroup.deactivate(this.toolShapeCreateLine);
	}

	protected get toolShapeButtonLineConnector(): DButton<string> {
		return (this._toolShapeButtonLineConnector ??= this.newToolShapeButtonLineConnector());
	}

	protected newToolShapeButtonLineConnector(): DButton<string> {
		const theme = this._theme;
		const result = new DButton<string>({
			group: this.toolShapeButtonGroup,
			toggle: true,
			title: theme.getToolShapeButtonLineConnectorTitle(),
			theme: theme.getToolShapeButtonTheme(),
			image: {
				source: this._icons.shape_line_connector
			},
			on: {
				active: (): void => {
					this.onToolShapeButtonLineConnectorActive();
				},
				inactive: (): void => {
					this.onToolShapeButtonLineConnectorInactive();
				}
			}
		});
		this.toolShapeSelect.on("edit", (shape: EShape): void => {
			if (shape instanceof EShapeConnectorLine) {
				const toolShapeEditLineConnector = this.toolShapeEditLineConnector;
				toolShapeEditLineConnector.shape = shape;
				this.toolGroup.activate(toolShapeEditLineConnector);
			}
		});
		return result;
	}

	protected onToolShapeButtonLineConnectorActive(): void {
		this.toolGroup.activate(this.toolShapeCreateLineConnector);
	}

	protected onToolShapeButtonLineConnectorInactive(): void {
		this.toolGroup.deactivate(this.toolShapeCreateLineConnector);
	}

	protected get toolShapeButtonElbowConnector(): DButton<string> {
		return (this._toolShapeButtonElbowConnector ??= this.newToolShapeButtonElbowConnector());
	}

	protected newToolShapeButtonElbowConnector(): DButton<string> {
		const theme = this._theme;
		const result = new DButton<string>({
			group: this.toolShapeButtonGroup,
			toggle: true,
			title: theme.getToolShapeButtonElbowConnectorTitle(),
			theme: theme.getToolShapeButtonTheme(),
			image: {
				source: this._icons.shape_elbow_connector
			},
			on: {
				active: (): void => {
					this.onToolShapeButtonElbowConnectorActive();
				},
				inactive: (): void => {
					this.onToolShapeButtonElbowConnectorInactive();
				}
			}
		});
		this.toolShapeSelect.on("edit", (shape: EShape): void => {
			if (shape instanceof EShapeConnectorLine) {
				const toolShapeEditLineConnector = this.toolShapeEditLineConnector;
				toolShapeEditLineConnector.shape = shape;
				this.toolGroup.activate(toolShapeEditLineConnector);
			}
		});
		return result;
	}

	protected onToolShapeButtonElbowConnectorActive(): void {
		this.toolGroup.activate(this.toolShapeCreateElbowConnector);
	}

	protected onToolShapeButtonElbowConnectorInactive(): void {
		this.toolGroup.deactivate(this.toolShapeCreateElbowConnector);
	}

	protected get toolShapeButtonImage(): DButton<string> {
		return (this._toolShapeButtonImage ??= this.newToolShapeButtonImage());
	}

	protected newToolShapeButtonImage(): DButton<string> {
		const theme = this._theme;
		return new DButtonFile<string>({
			group: this.toolShapeButtonGroup,
			title: theme.getToolShapeButtonImageTitle(),
			theme: theme.getToolShapeButtonTheme(),
			as: DButtonFileAs.DATA_URL,
			image: {
				source: this._icons.editor_image
			},
			on: {
				open: (dataUrl: string): void => {
					this.onToolShapeButtonImageOpen(dataUrl);
				}
			}
		});
	}

	protected onToolShapeButtonImageOpen(dataUrl: string): void {
		const diagram = this.diagram;
		const layer = diagram.layer;
		const canvas = diagram.canvas;
		if (canvas != null && layer != null) {
			createImage(dataUrl).then((shape): void => {
				shape.transform.position.set(canvas.width * 0.5, canvas.height * 0.5);
				shape.attach(layer);
				DControllers.getCommandController().push(
					new ECommandShapeCreate([shape], layer, this.toolShapeSelect.selection, true)
				);
			});
		}
	}

	protected get toolShapeButtonGraphicPiece(): DButton<string> {
		return (this._toolShapeButtonGraphicPiece ??= this.newToolShapeButtonGraphicPiece());
	}

	protected newToolShapeButtonGraphicPiece(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			group: this.toolShapeButtonGroup,
			title: theme.getToolShapeButtonGraphicPieceTitle(),
			theme: theme.getToolShapeButtonTheme(),
			image: {
				source: this._icons.graphic_piece
			},
			on: {
				active: (emitter): void => {
					this.onToolShapeButtonGraphicPieceActive(emitter);
				}
			}
		});
	}

	protected onToolShapeButtonGraphicPieceActive(opener?: DDialogOpener): void {
		this.dialogSelectPiece.then((dialogSelectPiece) => {
			dialogSelectPiece.open(opener);
		});
	}

	protected newToolShapeButtonExtensionFactory(
		factory: EShapeExtensionFactory<unknown>
	): DButton<string> {
		let dialogSelect: DDialogSelect<unknown> | null = null;
		return new DButton<string>({
			group: this.toolShapeButtonGroup,
			title: this.toExtensionTitle(factory),
			theme: this._theme.getToolShapeButtonTheme(),
			image: {
				source: factory.icon.texture
			},
			on: {
				active: (emitter): void => {
					(dialogSelect ??= this.newDialogSelectExtensionFactory(factory)).open(emitter);
				}
			}
		});
	}

	protected newToolShapeButtonExtension(
		extension:
			| EShapeExtensionCreateable
			| EShapeExtensionNewTypeCreatable
			| EShapeExtensionNewTypeEditable
	): DButton<string> {
		let creatorOrTool: EShapeExtensionCreator | ETool | null = null;
		const result = new DButton<string>({
			group: this.toolShapeButtonGroup,
			title: this.toExtensionTitle(extension),
			theme: this._theme.getToolShapeButtonTheme(),
			toggle: true,
			image: {
				source: extension.icon.texture
			},
			on: {
				active: (): void => {
					if (creatorOrTool == null) {
						creatorOrTool = this.toExtensionCreatorOrTool(extension);
					}
					this.onToolShapeButtonExtensionActive(creatorOrTool);
				},
				inactive: (): void => {
					if (creatorOrTool == null) {
						creatorOrTool = this.toExtensionCreatorOrTool(extension);
					}
					this.onToolShapeButtonExtensionInactive(creatorOrTool);
				}
			}
		});
		if ("type" in extension) {
			const updaterCreatorOrOptions = extension.updater;
			if (updaterCreatorOrOptions != null) {
				const type = extension.type;
				let updater: EShapeExtensionUpdater | null = null;
				this.toolShapeSelect.on("edit", (shape: EShape): void => {
					if (shape.type === type) {
						if (updater == null) {
							updater = this.toExtensionUpdater(updaterCreatorOrOptions);
						}
						updater.shape = shape;
						this.toolGroup.activate(updater);
					}
				});
			}
		}
		return result;
	}

	protected toExtensionUpdater(
		updaterCreatorOrOptions:
			| EShapeExtensionUpdaterCreator
			| EShapeExtensionUpdaterCreatorOptions
	): EShapeExtensionUpdater {
		const updaterCreator = isFunction(updaterCreatorOrOptions)
			? updaterCreatorOrOptions
			: updaterCreatorOrOptions.tool;
		const result = updaterCreator(this.toolShapeSelect.selection, this.diagram);
		result.on("done", (): void => {
			this.toolGroup.activate(this.toolShapeSelect);
		});
		result.on("cancel", (): void => {
			this.toolGroup.activate(this.toolShapeSelect);
		});
		return result;
	}

	protected toExtensionCreatorOrTool(
		extension:
			| EShapeExtensionCreateable
			| EShapeExtensionNewTypeCreatable
			| EShapeExtensionNewTypeEditable
	): EShapeExtensionCreator | ETool {
		const creator = extension.creator;
		if (isFunction(creator)) {
			return creator;
		} else {
			const result = creator.tool(this.toolShapeSelect.selection, this.diagram);
			result.on("done", (): void => {
				this.toolShapeButtonSelect.activate();
			});
			result.on("cancel", (): void => {
				this.toolShapeButtonSelect.activate();
			});
			return result;
		}
	}

	protected onToolShapeButtonExtensionActive(
		creatorOrTool: EShapeExtensionCreator | ETool
	): void {
		const toolGroup = this.toolGroup;
		if (isFunction(creatorOrTool)) {
			const toolShapeCreate = this.toolShapeCreate;
			toolShapeCreate.shape = creatorOrTool;
			toolGroup.activate(toolShapeCreate, creatorOrTool);
		} else {
			toolGroup.activate(creatorOrTool);
		}
	}

	protected onToolShapeButtonExtensionInactive(
		creatorOrTool: EShapeExtensionCreator | ETool
	): void {
		const toolGroup = this.toolGroup;
		if (isFunction(creatorOrTool)) {
			toolGroup.deactivate(this.toolShapeCreate, creatorOrTool);
		} else {
			toolGroup.deactivate(creatorOrTool);
		}
	}

	protected toExtensionTitle(
		extension: EShapeExtensionCreateable | EShapeExtensionFactory<unknown>
	): string {
		const title = extension.title;
		if (isString(title)) {
			return title;
		}
		return title.create;
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
					this.onDialogSelectExtensionFactorySelect(value, factory);
				}
			}
		});
	}

	protected onDialogSelectExtensionFactorySelect(
		value: unknown,
		factory: EShapeExtensionFactory<unknown>
	): void {
		const diagram = this.diagram;
		const layer = diagram.layer;
		const canvas = diagram.canvas;
		if (canvas && layer) {
			factory.item.toCreator(value).then((creator): void => {
				const shape = creator();
				shape.transform.position.set(canvas.width * 0.5, canvas.height * 0.5);
				shape.attach(layer);
				DControllers.getCommandController().push(
					new ECommandShapeCreate([shape], layer, this.toolShapeSelect.selection, true)
				);
			});
		}
	}

	protected newToolFileButtons(): DisplayObject[] {
		return [
			this.toolFileButtonCreate,
			this.toolFileButtonOpen,
			this.toolFileButtonSave,
			this.toolFileButtonSaveAs,
			this.toolFileButtonUpload,
			this.toolFileButtonDownload,
			this.toolFileButtonUndo,
			this.toolFileButtonRedo,
			this.toolFileButtonDelete
		];
	}

	protected newToolShapeButtons(): DisplayObject[] {
		const result: DisplayObject[] = [
			this.toolShapeButtonSelect,
			this.toolShapeButtonLine,
			this.toolShapeButtonCircle,
			this.toolShapeButtonSemicircle,
			this.toolShapeButtonRectangle,
			this.toolShapeButtonRectangleRounded,
			this.toolShapeButtonTriangle,
			this.toolShapeButtonTriangleRounded,
			this.toolShapeButtonLineConnector,
			this.toolShapeButtonElbowConnector,
			this.toolShapeButtonImage
		];
		if (this._isPieceEnabled) {
			result.push(this.toolShapeButtonGraphicPiece);
		}
		return result;
	}

	protected newToolShapeButtonsExtension(): DisplayObject[] {
		const result: DisplayObject[] = [];
		EShapeExtensions.each((extension): void => {
			if ("icon" in extension) {
				result.push(this.newToolShapeButtonExtension(extension));
			}
		});
		EShapeExtensionFactories.each((factory): void => {
			result.push(this.newToolShapeButtonExtensionFactory(factory));
		});
		return result;
	}

	protected getToolButtonLayoutContainer(): Container {
		return this._application.stage;
	}

	protected newToolButtonLayout(): DLayoutVertical {
		const margin = this._margin;
		return new DLayoutVertical({
			x: margin,
			y: this.getToolButtonLayoutY(margin),
			theme: "EButtonToolLayout",
			children: this.newToolButtons()
		});
	}

	protected getToolButtonLayoutY(margin: number): number {
		const header = this._header;
		if (header != null) {
			return margin + header.height + margin;
		}
		return margin;
	}

	protected newToolButtons(): DisplayObject[] {
		const toolFileButtonCreate = this._toolFileButtonCreate;
		if (toolFileButtonCreate == null || toolFileButtonCreate.parent == null) {
			return this.newToolFileButtons()
				.concat(new DLayoutSpace({ height: 10 }))
				.concat(this.newToolShapeButtons())
				.concat(this.newToolShapeButtonsExtension());
		} else {
			return this.newToolShapeButtons().concat(this.newToolShapeButtonsExtension());
		}
	}

	protected get editorButtonGroup(): DButtonGroup | undefined {
		return (this._editorButtonGroup ??= this.newEditorButtonGroup());
	}

	protected newEditorButtonGroup(): DButtonGroup | undefined {
		return undefined;
	}

	protected get editorButtonCoordinate(): DButton<string> {
		return (this._editorButtonCoordinate ??= this.newEditorButtonCoordinate());
	}

	protected newEditorButtonCoordinate(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			group: this.editorButtonGroup,
			toggle: true,
			image: {
				source: this._icons.editor_coordinate
			},
			title: theme.getEditorButtonCoordinateTitle(),
			theme: theme.getEditorButtonTheme(),
			on: {
				active: (): void => {
					this.editorCoordinate.show();
				},
				inactive: (): void => {
					this.editorCoordinate.hide();
				}
			}
		});
	}

	protected get editorCoordinate(): EEditorCoordinate {
		return (this._editorCoordinate ??= this.newEditorCoordinate());
	}

	protected newEditorCoordinate(): EEditorCoordinate {
		return this.initEditor(
			0,
			new EEditorCoordinate({
				parent: this.editorContainer,
				selection: this.toolShapeSelect.selection,
				icons: this._icons
			})
		);
	}

	protected initEditor<EDITOR extends DisplayObject>(zIndex: number, editor: EDITOR): EDITOR {
		editor.zIndex = zIndex;
		editor.parent.sortChildren();
		editor.interactive = true;
		if (editor instanceof DBase) {
			editor.state.isFocusable = false;
		}
		return editor;
	}

	protected get editorButtonShape(): DButton<string> {
		return (this._editorButtonShape ??= this.newEditorButtonShape());
	}

	protected newEditorButtonShape(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			group: this.editorButtonGroup,
			toggle: true,
			image: {
				source: this._icons.editor_shape
			},
			title: theme.getEditorButtonShapeTitle(),
			theme: theme.getEditorButtonTheme(),
			on: {
				active: (): void => {
					this.editorShape.show();
				},
				inactive: (): void => {
					this.editorShape.hide();
				}
			}
		});
	}

	protected get editorShape(): EEditorShape {
		return (this._editorShape ??= this.newEditorShape());
	}

	protected newEditorShape(): EEditorShape {
		return this.initEditor(
			1,
			new EEditorShape({
				parent: this.editorContainer,
				selection: this.toolShapeSelect.selection,
				icons: this._icons,
				canvas: this._canvas,
				content: {
					theme: "EEditorPaneContent"
				},
				piece: {
					enable: this._isPieceEnabled,
					controller: this._options.controller,
					exclude: () => {
						return this._toPieceId(this.diagram);
					}
				},
				connector: {
					dangling: this.isDanglingConnectorAllowed()
				}
			})
		);
	}

	protected get editorButtonText(): DButton<string> {
		return (this._editorButtonText ??= this.newEditorButtonText());
	}

	protected newEditorButtonText(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			group: this.editorButtonGroup,
			toggle: true,
			image: {
				source: this._icons.editor_text
			},
			title: theme.getEditorButtonTextTitle(),
			theme: theme.getEditorButtonTheme(),
			on: {
				active: (): void => {
					this.editorText.show();
				},
				inactive: (): void => {
					this.editorText.hide();
				}
			}
		});
	}

	protected get editorText(): EEditorText {
		return (this._editorText ??= this.newEditorText());
	}

	protected newEditorText(): EEditorText {
		return this.initEditor(
			2,
			new EEditorText({
				parent: this.editorContainer,
				selection: this.toolShapeSelect.selection,
				icons: this._icons,
				content: {
					theme: "EEditorPaneContent"
				}
			})
		);
	}

	protected get editorButtonData(): DButton<string> {
		return (this._editorButtonData ??= this.newEditorButtonData());
	}

	protected newEditorButtonData(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			group: this.editorButtonGroup,
			toggle: true,
			image: {
				source: this._icons.editor_data
			},
			title: theme.getEditorButtonDataTitle(),
			theme: theme.getEditorButtonTheme(),
			on: {
				active: (): void => {
					this.editorData.show();
				},
				inactive: (): void => {
					this.editorData.hide();
				}
			}
		});
	}

	protected get editorData(): EEditorData {
		return (this._editorData ??= this.newEditorData());
	}

	protected newEditorData(): EEditorData {
		return this.initEditor(
			3,
			new EEditorData({
				parent: this.editorContainer,
				selection: this.toolShapeSelect.selection,
				icons: this._icons
			})
		);
	}

	protected get editorButtonDataMapping(): DButton<string> {
		return (this._editorButtonDataMapping ??= this.newEditorButtonDataMapping());
	}

	protected newEditorButtonDataMapping(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			group: this.editorButtonGroup,
			toggle: true,
			image: {
				source: this._icons.editor_data_mapping
			},
			title: theme.getEditorButtonDataMappingTitle(),
			theme: theme.getEditorButtonTheme(),
			on: {
				active: (): void => {
					this.editorDataMapping.show();
				},
				inactive: (): void => {
					this.editorDataMapping.hide();
				}
			}
		});
	}

	protected get editorDataMapping(): EEditorDataMapping {
		return (this._editorDataMapping ??= this.newEditorDataMapping());
	}

	protected newEditorDataMapping(): EEditorDataMapping {
		return this.initEditor(
			4,
			new EEditorDataMapping({
				parent: this.editorContainer,
				selection: this.toolShapeSelect.selection,
				icons: this._icons
			})
		);
	}

	protected get editorButtonAction(): DButton<string> {
		return (this._editorButtonAction ??= this.newEditorButtonAction());
	}

	protected newEditorButtonAction(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			group: this.editorButtonGroup,
			toggle: true,
			image: {
				source: this._icons.editor_action
			},
			title: theme.getEditorButtonActionTitle(),
			theme: theme.getEditorButtonTheme(),
			on: {
				active: (): void => {
					this.editorAction.show();
				},
				inactive: (): void => {
					this.editorAction.hide();
				}
			}
		});
	}

	protected get editorAction(): EEditorAction {
		return (this._editorAction ??= this.newEditorAction());
	}

	protected newEditorAction(): EEditorAction {
		return this.initEditor(
			5,
			new EEditorAction({
				parent: this.editorContainer,
				selection: this.toolShapeSelect.selection,
				icons: this._icons,
				diagram: this.diagram
			})
		);
	}

	protected get editorButtonTree(): DButton<string> {
		return (this._editorButtonTree ??= this.newEditorButtonTree());
	}

	protected newEditorButtonTree(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			group: this.editorButtonGroup,
			toggle: true,
			image: {
				source: this._icons.editor_tree
			},
			title: theme.getEditorButtonTreeTitle(),
			theme: theme.getEditorButtonTheme(),
			on: {
				active: (): void => {
					this.editorTree.show();
				},
				inactive: (): void => {
					this.editorTree.hide();
				}
			}
		});
	}

	protected get editorTree(): EEditorTree {
		return (this._editorTree ??= this.newEditorTree());
	}

	protected newEditorTree(): EEditorTree {
		return this.initEditor(
			6,
			new EEditorTree({
				parent: this.editorContainer,
				selection: this.toolShapeSelect.selection,
				icons: this._icons,
				diagram: this.diagram
			})
		);
	}

	protected get editorButtonLayer(): DButton<string> {
		return (this._editorButtonLayer ??= this.newEditorButtonLayer());
	}

	protected newEditorButtonLayer(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			group: this.editorButtonGroup,
			toggle: true,
			image: {
				source: this._icons.editor_layer
			},
			title: theme.getEditorButtonLayerTitle(),
			theme: theme.getEditorButtonTheme(),
			on: {
				active: (): void => {
					this.editorLayer.show();
				},
				inactive: (): void => {
					this.editorLayer.hide();
				}
			}
		});
	}

	protected get editorLayer(): EEditorLayer {
		return (this._editorLayer ??= this.newEditorLayer());
	}

	protected newEditorLayer(): EEditorLayer {
		return this.initEditor(
			7,
			new EEditorLayer({
				parent: this.editorContainer,
				selection: this.toolShapeSelect.selection,
				icons: this._icons,
				diagram: this.diagram
			})
		);
	}

	protected get editorButtonSnap(): DButton<string> {
		return (this._editorButtonSnap ??= this.newEditorButtonSnap());
	}

	protected newEditorButtonSnap(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			group: this.editorButtonGroup,
			toggle: true,
			image: {
				source: this._icons.editor_snap
			},
			title: theme.getEditorButtonSnapTitle(),
			theme: theme.getEditorButtonTheme(),
			on: {
				active: (): void => {
					this.editorSnap.show();
				},
				inactive: (): void => {
					this.editorSnap.hide();
				}
			}
		});
	}

	protected get editorSnap(): EEditorSnap {
		return (this._editorSnap ??= this.newEditorSnap());
	}

	protected newEditorSnap(): EEditorSnap {
		return this.initEditor(
			8,
			new EEditorSnap({
				parent: this.editorContainer,
				selection: this.toolShapeSelect.selection,
				icons: this._icons,
				diagram: this.diagram
			})
		);
	}

	protected get editorButtonValidation(): DButton<string> {
		return (this._editorButtonValidation ??= this.newEditorButtonValidation());
	}

	protected newEditorButtonValidation(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			group: this.editorButtonGroup,
			toggle: true,
			image: {
				source: this._icons.editor_validation
			},
			title: theme.getEditorButtonValidationTitle(),
			theme: theme.getEditorButtonTheme(),
			on: {
				active: (): void => {
					this.editorValidation.show();
				},
				inactive: (): void => {
					this.editorValidation.hide();
				}
			}
		});
	}

	protected get editorValidation(): EEditorValidation {
		return (this._editorValidation ??= this.newEditorValidation());
	}

	protected newEditorValidation(): EEditorValidation {
		return this.initEditor(
			9,
			new EEditorValidation({
				parent: this.editorContainer,
				selection: this.toolShapeSelect.selection,
				icons: this._icons,
				diagram: this.diagram,
				validator: this._validation.validator
			})
		);
	}

	protected get editorButtonSearch(): DButton<string> {
		return (this._editorButtonSearch ??= this.newEditorButtonSearch());
	}

	protected newEditorButtonSearch(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			group: this.editorButtonGroup,
			toggle: true,
			image: {
				source: this._icons.editor_search
			},
			title: theme.getEditorButtonSearchTitle(),
			theme: theme.getEditorButtonTheme(),
			on: {
				active: (): void => {
					this.editorSearch.show();
				},
				inactive: (): void => {
					this.editorSearch.hide();
				}
			}
		});
	}

	protected get editorSearch(): EEditorSearch {
		return (this._editorSearch ??= this.newEditorSearch());
	}

	protected newEditorSearch(): EEditorSearch {
		return this.initEditor(
			9,
			new EEditorSearch({
				parent: this.editorContainer,
				selection: this.toolShapeSelect.selection,
				icons: this._icons,
				diagram: this.diagram,
				finder: this._search.finder,
				interval: this._search.interval
			})
		);
	}

	protected get editorCanvas(): EEditorCanvas {
		return (this._editorCanvas ??= this.newEditorCanvas());
	}

	protected newEditorCanvas(): EEditorCanvas {
		return new EEditorCanvas({
			icons: this._icons,
			diagram: this.diagram,
			canvas: this._canvas
		});
	}

	protected isEditorCanvasCompatible(): boolean {
		return !!this._options.compatibility?.editor?.canvas;
	}

	protected get editorButtonCanvasLegacy(): DButton<string> {
		return (this._editorButtonCanvasLegacy ??= this.newEditorButtonCanvasLegacy());
	}

	protected newEditorButtonCanvasLegacy(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			group: this.editorButtonGroup,
			toggle: true,
			image: {
				source: this._icons.editor_canvas_legacy
			},
			title: theme.getEditorButtonCanvasLegacyTitle(),
			theme: theme.getEditorButtonTheme(),
			on: {
				active: (): void => {
					this.editorCanvasLegacy.show();
				},
				inactive: (): void => {
					this.editorCanvasLegacy.hide();
				}
			}
		});
	}

	protected get editorCanvasLegacy(): EEditorCanvasLegacy {
		return (this._editorCanvasLegacy ??= this.newEditorCanvasLegacy());
	}

	protected newEditorCanvasLegacy(): EEditorCanvasLegacy {
		return this.initEditor(
			10,
			new EEditorCanvasLegacy({
				parent: this.editorContainer,
				diagram: this.diagram,
				canvas: this._canvas,
				content: {
					theme: "EEditorPaneContent"
				}
			})
		);
	}

	protected newEditorButtonExtension(
		extension: EShapeExtensionNewTypeEditable,
		editor: EShapeExtensionNewTypeEditableEditor
	): DButton<string> {
		let editorInstance: EShapeExtensionEditor | null = null;
		const result = new DButton<string>({
			group: this.editorButtonGroup,
			toggle: true,
			image: {
				source: extension.icon.texture
			},
			title: editor.title,
			theme: this._theme.getEditorButtonTheme(),
			visible: false,
			on: {
				active: (): void => {
					editorInstance ??= this.newEditorExtension(editor);
					editorInstance.show();
				},
				inactive: (): void => {
					if (editorInstance) {
						editorInstance.hide();
					}
				}
			}
		});
		const selection = this.toolShapeSelect.selection;
		selection.on("change", (): void => {
			this.onEditorButtonExtensionSelectionChange(result, extension.type);
		});
		return result;
	}

	protected newEditorExtension(
		editor: EShapeExtensionNewTypeEditableEditor
	): EShapeExtensionEditor {
		return this.initEditor(
			11,
			new editor.constructor({
				parent: this.editorContainer,
				selection: this.toolShapeSelect.selection,
				diagram: this.diagram,
				icons: this._icons,
				content: {
					theme: "EEditorPaneContent"
				},
				theme: editor.theme
			})
		);
	}

	protected onEditorButtonExtensionSelectionChange(
		button: DButton<string>,
		extensionType: EShapeType
	): void {
		const selection = this.toolShapeSelect.selection;
		const last = selection.last();
		const buttonLast = this._editorButtonExtensionLast;
		if (last != null && last.type === extensionType && buttonLast !== button) {
			let wasActive = false;
			if (buttonLast != null) {
				buttonLast.hide();
				if (buttonLast.state.isActive) {
					buttonLast.activate();
					wasActive = true;
				}
			}
			button.show();
			this._editorButtonExtensionLast = button;
			if (wasActive && !button.state.isActive) {
				button.activate();
			}
		}
	}

	protected get viewButtonZoomOut(): DButton<string> {
		return (this._viewButtonZoomOut ??= this.newViewButtonZoomOut());
	}

	protected newViewButtonZoomOut(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			image: {
				source: this._icons.view_zoom_out
			},
			title: theme.getViewButtonZoomOutTitle(),
			shortcut: theme.getViewButtonZoomOutShortcut(),
			theme: theme.getViewButtonTheme(),
			on: {
				active: (): void => {
					this.diagram.view.zoomOut();
				}
			}
		});
	}

	protected get viewButtonZoomIn(): DButton<string> {
		return (this._viewButtonZoomIn ??= this.newViewButtonZoomIn());
	}

	protected newViewButtonZoomIn(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			image: {
				source: this._icons.view_zoom_in
			},
			title: theme.getViewButtonZoomInTitle(),
			shortcut: theme.getViewButtonZoomInShortcut(),
			shortcuts: theme.getViewButtonZoomInShortcuts(),
			theme: theme.getViewButtonTheme(),
			on: {
				active: (): void => {
					this.diagram.view.zoomIn();
				}
			}
		});
	}

	protected get viewButtonDragAndPinch(): DButton<string> {
		return (this._viewButtonDragAndPinch ??= this.newViewButtonDragAndPinch());
	}

	protected newViewButtonDragAndPinch(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			image: {
				source: this._icons.camera
			},
			toggle: true,
			title: theme.getViewButtonDragAndPinchTitle(),
			shortcut: theme.getViewButtonDragAndPinchShortcut(),
			theme: theme.getViewButtonTheme(),
			on: {
				active: (): void => {
					this.toolGroup.suspend();
				},
				inactive: (): void => {
					this.toolGroup.resume();
				}
			}
		});
	}

	protected get viewButtonReset(): DButton<string> {
		return (this._viewButtonReset ??= this.newViewButtonReset());
	}

	protected newViewButtonReset(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			image: {
				source: this._icons.view_reset
			},
			title: theme.getViewButtonResetTitle(),
			shortcut: theme.getViewButtonResetShortcut(),
			theme: theme.getViewButtonTheme(),
			on: {
				active: (): void => {
					this.diagram.view.reset();
				}
			}
		});
	}

	protected get viewButtonFit(): DButton<string> {
		return (this._viewButtonFit ??= this.newViewButtonFit());
	}

	protected newViewButtonFit(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			image: {
				source: this._icons.view_fit
			},
			title: theme.getViewButtonFitTitle(),
			shortcut: theme.getViewButtonFitShortcut(),
			theme: theme.getViewButtonTheme(),
			on: {
				active: (): void => {
					this.diagram.view.fit();
				}
			}
		});
	}

	protected newEditorButtons(): DisplayObject[] {
		const result: DisplayObject[] = [
			this.editorButtonCoordinate,
			this.editorButtonShape,
			this.editorButtonText,
			this.editorButtonData,
			this.editorButtonDataMapping,
			this.editorButtonAction,
			this.editorButtonTree,
			this.editorButtonLayer,
			this.editorButtonSnap
		];
		if (this._validation.validator != null) {
			result.push(this.editorButtonValidation);
		}
		result.push(this.editorButtonSearch);
		if (this.isEditorCanvasCompatible()) {
			result.push(this.editorButtonCanvasLegacy);
		}
		EShapeExtensions.each((extension): void => {
			if ("editor" in extension) {
				const editor = this.toEditorExtentionConstructorOptions(extension);
				if (editor) {
					result.push(this.newEditorButtonExtension(extension, editor));
				}
			}
		});
		result.push(
			new DLayoutSpace({
				weight: 1
			}),
			this.viewButtonZoomOut,
			this.viewButtonZoomIn,
			this.viewButtonDragAndPinch,
			this.viewButtonReset,
			this.viewButtonFit
		);
		return result;
	}

	protected toEditorExtentionConstructorOptions(
		extension: EShapeExtensionNewTypeEditable
	): EShapeExtensionNewTypeEditableEditor | undefined {
		const editor = extension.editor;
		if (isFunction(editor)) {
			return {
				constructor: editor,
				title: extension.name || "",
				theme: "EEditorPane"
			};
		} else if (editor.constructor) {
			return {
				constructor: editor.constructor,
				title: editor.title ?? (extension.name || ""),
				theme: editor.theme ?? "EEditorPane"
			};
		}
	}

	protected get editorContainer(): DBase {
		return (this._editorContainer ??= this.newEditorContainer());
	}

	protected newEditorContainer(): DBase {
		return new DLayoutHorizontal({
			width: "auto",
			height: "padding"
		});
	}

	protected getEditorLayoutContainer(): Container {
		return this._application.stage;
	}

	protected newEditorLayout(): DLayoutHorizontal {
		const margin = this._margin;
		const y = this.getToolButtonLayoutY(margin);
		return new DLayoutHorizontal({
			x: (p: number, s: number) => p - s - margin,
			y,
			width: "auto",
			height: (p) => p - y - margin,
			theme: "EEditorLayout",
			children: [this.editorContainer, this.newEditorButtonLayout()],
			on: {
				resize: (width: number, height: number): void => {
					this.onEditorLayoutResized(width, height);
				}
			}
		});
	}

	protected newEditorButtonLayout(): DLayoutVertical {
		return new DLayoutVertical({
			theme: "EEditorButtonLayout",
			children: this.newEditorButtons()
		});
	}

	protected onEditorLayoutResized(width: number, height: number): void {
		// The tool layout width is `margin + 65`.
		// The editor layout width is `width`.
		// Therefore here shifts the diagram `(margin + 65 - width) * 0.5` along the X axis.
		const diagram = this.diagram;
		const theme = diagram.theme;
		const padding = diagram.padding;
		const margin = this._margin;
		const os = padding.getLeft() - padding.getRight();
		padding.left = theme.getPaddingLeft() + margin + 65;
		padding.right = theme.getPaddingRight() + margin + width;
		const canvas = diagram.canvas;
		if (canvas != null) {
			const ns = padding.getLeft() - padding.getRight();
			canvas.position.x += (ns - os) * 0.5;
		}
	}

	protected get toolShapeSelect(): EToolSelect {
		return (this._toolShapeSelect ??= this.newToolShapeSelect());
	}

	protected newToolShapeSelect(): EToolSelect {
		const diagram = this.diagram;
		const result = new EToolSelect({ diagram });
		diagram.on("set", (): void => {
			result.selection.clear();
		});
		diagram.on("unset", (): void => {
			result.selection.clear();
		});
		return result;
	}

	protected get toolShapeCreate(): EToolShapeCreate {
		return (this._toolShapeCreate ??= this.newToolShapeCreate());
	}

	protected newToolShapeCreate(): EToolShapeCreate {
		const result = new EToolShapeCreate(this.toolShapeSelect.selection, this.diagram);
		result.on("done", (): void => {
			this.toolShapeButtonSelect.activate();
		});
		return result;
	}

	protected get toolShapeCreateLine(): EToolShapeCreateLine {
		return (this._toolShapeCreateLine ??= this.newToolShapeCreateLine());
	}

	protected newToolShapeCreateLine(): EToolShapeCreateLine {
		const result = new EToolShapeCreateLine({
			selection: this.toolShapeSelect.selection,
			diagram: this.diagram
		});
		result.on("done", (): void => {
			this.toolShapeButtonSelect.activate();
		});
		result.on("cancel", (): void => {
			this.toolShapeButtonSelect.activate();
		});
		return result;
	}

	protected get toolShapeCreateLineConnector(): EToolShapeCreateLineConnector {
		return (this._toolShapeCreateLineConnector ??= this.newToolShapeCreateLineConnector());
	}

	protected newToolShapeCreateLineConnector(): EToolShapeCreateLineConnector {
		const result = new EToolShapeCreateLineConnector({
			selection: this.toolShapeSelect.selection,
			diagram: this.diagram,
			dangling: this.isDanglingConnectorAllowed()
		});
		result.on("done", (): void => {
			this.toolShapeButtonSelect.activate();
		});
		result.on("cancel", (): void => {
			this.toolShapeButtonSelect.activate();
		});
		return result;
	}

	protected get toolShapeCreateElbowConnector(): EToolShapeCreateElbowConnector {
		return (this._toolShapeCreateElbowConnector ??= this.newToolShapeCreateElbowConnector());
	}

	protected newToolShapeCreateElbowConnector(): EToolShapeCreateElbowConnector {
		const result = new EToolShapeCreateElbowConnector({
			selection: this.toolShapeSelect.selection,
			diagram: this.diagram,
			dangling: this.isDanglingConnectorAllowed()
		});
		result.on("done", (): void => {
			this.toolShapeButtonSelect.activate();
		});
		result.on("cancel", (): void => {
			this.toolShapeButtonSelect.activate();
		});
		return result;
	}

	protected isDanglingConnectorAllowed(): boolean | undefined {
		return this._options.connector?.dangling;
	}

	protected get toolShapeEditLine(): EToolShapeEditLine {
		return (this._toolShapeEditLine ??= this.newToolShapeEditLine());
	}

	protected newToolShapeEditLine(): EToolShapeEditLine {
		const result = new EToolShapeEditLine({
			selection: this.toolShapeSelect.selection,
			diagram: this.diagram
		});
		result.on("done", (): void => {
			this.toolGroup.activate(this.toolShapeSelect);
		});
		result.on("cancel", (): void => {
			this.toolGroup.activate(this.toolShapeSelect);
		});
		return result;
	}

	protected get toolShapeEditLineConnector(): EToolShapeEditLineConnector {
		return (this._toolShapeEditLineConnector ??= this.newToolShapeEditLineConnector());
	}

	protected newToolShapeEditLineConnector(): EToolShapeEditLineConnector {
		const result = new EToolShapeEditLineConnector({
			selection: this.toolShapeSelect.selection,
			diagram: this.diagram,
			dangling: this.isDanglingConnectorAllowed()
		});
		result.on("done", (): void => {
			this.toolGroup.activate(this.toolShapeSelect);
		});
		result.on("cancel", (): void => {
			this.toolGroup.activate(this.toolShapeSelect);
		});
		return result;
	}

	protected get toolGroup(): EToolGroupImpl {
		return (this._toolGroup ??= this.newToolGroup());
	}

	protected newToolGroup(): EToolGroupImpl {
		return new EToolGroupImpl();
	}

	protected get diagram(): DDiagramEditor {
		return (this._diagram ??= this.newDiagram());
	}

	protected newDiagram(): DDiagramEditor {
		return new DDiagramEditor(this.toDiagramOptions(this._options));
	}

	protected getDiagramContainer(): Container {
		return this._application.stage;
	}

	protected toDiagramOptions(options: OPTIONS): DDiagramEditorOptions {
		const result = options.diagram || {};

		// Controller
		result.controller ??= this._controller.graphic;

		// Coordinate
		result.x ??= 0;
		result.y ??= 0;
		result.width ??= "100%";
		result.height ??= "100%";

		// Outline
		const outline = (result.outline ??= {});
		outline.color ??= null;

		// View settings
		const view = (result.view ??= {});
		const gesture = (view.gesture ??= {});
		gesture.modifier ??= UtilGestureModifier.ALT;
		const checker = (gesture.checker ??= {});
		checker.start ??= (e: InteractionEvent, modifier: UtilGestureModifier): boolean => {
			return UtilGestureModifiers.match(e, modifier) || this.toolGroup.isSuspended();
		};
		checker.move ??= (e: InteractionEvent, modifier: UtilGestureModifier): boolean => {
			return UtilGestureModifiers.match(e, modifier) || this.diagram.state.isGesturing;
		};
		const zoom = (view.zoom ??= {});
		const dblclick = (zoom.dblclick ??= {});
		dblclick.checker ??= (
			e: WheelEvent | MouseEvent | TouchEvent,
			modifier: UtilGestureModifier
		): boolean => {
			return this.toolGroup.isSuspended();
		};
		const viewOn = (view.on ??= {});
		viewOn.gesturestart ??= () => {
			this.onDiagramViewOnStart();
		};
		viewOn.transformstart ??= () => {
			this.onDiagramViewOnStart();
		};
		viewOn.wheeltranslationstart ??= () => {
			this.onDiagramViewOnStart();
		};
		view.constraint ??= (
			target: DViewTarget,
			x: number,
			y: number,
			scaleX: number,
			scaleY: number
		) => {
			this.onDiagramViewConstraint(target, x, y, scaleX, scaleY);
		};

		// Thumbnail settings
		const thumbnail = result.thumbnail;
		if (thumbnail?.enable) {
			thumbnail.size ??= getDialogSelectThumbnailSize() * 2;
		}

		// Event settings
		const on = (result.on ??= {});
		on.saving ??= (): void => {
			this.onDiagramSaving(this._toolFileButtonSave);
		};
		on.saved ??= (reason: string | null): void => {
			this.onDiagramSaved(reason, this._toolFileButtonSave);
		};
		on.deleting ??= (): void => {
			this.onDiagramDeleting(this._toolFileButtonDelete);
		};
		on.deleted ??= (reason: string | null): void => {
			this.onDiagramDeleted(reason, this._toolFileButtonDelete);
		};

		// Snapshot event settings
		const snapshot = (result.snapshot ??= {});
		const snapshotOn = (snapshot.on ??= {});
		snapshotOn.taking ??= (): void => {
			this.onDiagramSnapshotTaking();
		};
		snapshotOn.took ??= (): void => {
			this.onDiagramSnapshotTook();
		};

		// Done
		return result;
	}

	protected onDiagramViewOnStart(): void {
		const diagram = this._diagram;
		if (diagram != null) {
			const d = (this._localBoundsDiagram ??= new Rectangle());
			const p = diagram.padding;
			const l = p.getLeft() - 65 - this._margin;
			const t = p.getTop();
			const r = diagram.width - p.getRight();
			const b = diagram.height - p.getBottom();
			d.x = l;
			d.y = t;
			d.width = Math.max(0, r - l);
			d.height = Math.max(0, b - t);

			const canvas = diagram.canvas;
			if (canvas != null) {
				const c = (this._localBoundsCanvas ??= new Rectangle());
				canvas.getLocalBounds(c);
			}
		}
	}

	protected onDiagramViewConstraint(
		target: DViewTarget,
		x: number,
		y: number,
		sx: number,
		sy: number
	): void {
		const d = this._localBoundsDiagram;
		const c = this._localBoundsCanvas;
		if (d != null && c != null) {
			target.position.set(
				Math.max(d.x - (c.x + c.width) * sx, Math.min(d.x + d.width - c.x * sx, x)),
				Math.max(d.y - (c.y + c.height) * sy, Math.min(d.y + d.height - c.y * sy, y))
			);
			target.scale.set(sx, sy);
		}
	}

	protected onDiagramSaving(opener?: DDialogOpener): void {
		this.dialogSaveProcessing.open(opener);
	}

	protected onDiagramSaved(reason: string | null, opener?: DDialogOpener): void {
		const dialogSaveProcessing = this.dialogSaveProcessing;
		if (reason == null) {
			dialogSaveProcessing.resolve();
		} else {
			if (reason === "duplication") {
				dialogSaveProcessing.once("close", () => {
					this.dialogSaveAs.open(opener);
				});
			}
			dialogSaveProcessing.reject(reason);
		}
	}

	protected onDiagramDeleting(opener?: DDialogOpener): void {
		this.dialogDeleteProcessing.open(opener);
	}

	protected onDiagramDeleted(reason: string | null, opener?: DDialogOpener): void {
		const dialogDeleteProcessing = this.dialogDeleteProcessing;
		if (reason == null) {
			dialogDeleteProcessing.resolve();
		} else {
			dialogDeleteProcessing.reject(reason);
		}
	}

	protected onDiagramSnapshotTaking(): void {
		this.toolShapeSelect.selection.modifier.renderable = false;
	}

	protected onDiagramSnapshotTook(): void {
		this.toolShapeSelect.selection.modifier.renderable = true;
	}

	protected get dialogSaveProcessing(): DDialogProcessing {
		return (this._dialogSaveProcessing ??= this.newDialogSaveProcessing());
	}

	protected newDialogSaveProcessing(): DDialogProcessing {
		return new EDialogProcessing();
	}

	protected get dialogDeleteProcessing(): DDialogProcessing {
		return (this._dialogDeleteProcessing ??= this.newDialogDeleteProcessing());
	}

	protected newDialogDeleteProcessing(): DDialogProcessing {
		return new EDialogProcessing();
	}

	protected get dialogSaveAs(): DDialogSaveAs {
		return (this._dialogSaveAs ??= this.newDialogSaveAs());
	}

	protected newDialogSaveAs(): DDialogSaveAs {
		return new DDialogSaveAs();
	}

	protected get dialogCreate(): Promise<EDialogCanvas> {
		return (this._dialogCreate ??= this.newDialogCreate());
	}

	protected newDialogCreate(): Promise<EDialogCanvas> {
		return this._canvas.get().then((canvas) => {
			return new EDialogCanvas({
				canvas,
				on: {
					ok: (value, emitter): void => {
						this.onDialogCreateOk(value, emitter);
					}
				}
			});
		});
	}

	protected onDialogCreateOk(value: EDialogCanvasValue, opener: DDialogOpener): void {
		this.diagram.create(value).then((canvas) => {
			DControllers.getCommandController().push(
				new ECommandDocumentCreate(this.diagram, canvas)
			);
		});
	}

	protected get dialogDiscard(): DDialogConfirmDiscard {
		return (this._dialogDiscard ??= this.newDialogDiscard());
	}

	protected newDialogDiscard(): DDialogConfirmDiscard {
		return new DDialogConfirmDiscard();
	}

	protected get dialogSelect(): Promise<DDialogSelect<DDiagramSerializedName, string>> {
		return (this._dialogSelect ??= this.newDialogSelect());
	}

	protected newDialogSelect(): Promise<DDialogSelect<DDiagramSerializedName, string>> {
		return this._canvas.get().then((canvas) => {
			if (this._options.diagram?.thumbnail?.enable) {
				const result = this.newDialogSelectImage();
				result.categories = canvas.category.items;
				return result;
			} else {
				const result = this.newDialogSelectNoImage();
				result.categories = canvas.category.items;
				return result;
			}
		});
	}

	protected newDialogSelectNoImage(): DDialogSelect<DDiagramSerializedName, string> {
		return new DDialogSelect<DDiagramSerializedName, string>({
			controller: this._controller.graphic,
			on: {
				select: (value: DDiagramSerializedName): void => {
					this.onDialogSelectSelect(value);
				}
			}
		});
	}

	protected onDialogSelectSelect(value: DDiagramSerializedName): void {
		this.diagram.open(value.id).then((canvas) => {
			DControllers.getCommandController().push(
				new ECommandDocumentOpen(this.diagram, canvas)
			);
		});
	}

	protected newDialogSelectImage(): DDialogSelect<DDiagramSerializedName, string> {
		return newDialogSelectWithThumbnails(
			this._options.controller.graphic,
			this._controller.toThumbnail,
			(value: DDiagramSerializedName): void => {
				this.onDialogSelectSelect(value);
			}
		);
	}

	protected get dialogSelectPiece(): Promise<DDialogSelect<DDiagramSerializedName, string>> {
		return (this._dialogSelectPiece ??= this.newDialogSelectPiece());
	}

	protected newDialogSelectPiece(): Promise<DDialogSelect<DDiagramSerializedName, string>> {
		return this._canvas.get().then((canvas) => {
			if (this._options.diagram?.thumbnail?.enable) {
				const result = this.newDialogSelectPieceImage();
				result.categories = canvas.category.items;
				return result;
			} else {
				const result = this.newDialogSelectPieceNoImage();
				result.categories = canvas.category.items;
				return result;
			}
		});
	}

	protected newDialogSelectPieceNoImage(): DDialogSelect<DDiagramSerializedName, string> {
		return new DDialogSelect<DDiagramSerializedName, string>({
			controller: this.newDialogSelectPieceController(),
			on: {
				select: (value: DDiagramSerializedName): void => {
					this.onDialogSelectPieceSelect(value);
				}
			}
		});
	}

	protected newDialogSelectPieceImage(): DDialogSelect<DDiagramSerializedName, string> {
		return newDialogSelectWithThumbnails(
			this.newDialogSelectPieceController(),
			this._options.controller.toPieceThumbnail,
			(value: DDiagramSerializedName): void => {
				this.onDialogSelectPieceSelect(value);
			}
		);
	}

	protected newDialogSelectPieceController(): DDialogSelectController<
		DDiagramSerializedName,
		string
	> {
		const graphicPiece = this._options.controller.graphic.piece;
		return {
			search: (
				word: string,
				categoryId?: string | null
			): Promise<DDiagramSerializedName[]> => {
				return graphicPiece.search(word, categoryId).then((pieces) => {
					return this.toDialogSelectPieceResult(pieces);
				});
			}
		};
	}

	protected toDialogSelectPieceResult(
		targets: DDiagramSerializedName[]
	): DDiagramSerializedName[] {
		const pieceId = this._toPieceId(this.diagram);
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

	protected onDialogSelectPieceSelect(value: DDiagramSerializedName): void {
		const diagram = this.diagram;
		const layer = diagram.layer;
		const canvas = diagram.canvas;
		if (canvas && layer) {
			const graphic = this._options.controller.graphic;
			graphic.piece.get(value.id).then((serialized): void => {
				EShapeEmbeddeds.from(
					serialized,
					graphic,
					EShapeResourceManagerDeserializationMode.EDITOR
				).then((shape): void => {
					shape.transform.position.set(canvas.width * 0.5, canvas.height * 0.5);
					shape.attach(layer);
					DControllers.getCommandController().push(
						new ECommandShapeCreate(
							[shape],
							layer,
							this.toolShapeSelect.selection,
							true
						)
					);
				});
			});
		}
	}

	protected get dialogDelete(): DDialogConfirmDelete {
		return (this._dialogDelete ??= this.newDialogDelete());
	}

	protected newDialogDelete(): DDialogConfirmDelete {
		return new DDialogConfirmDelete({
			on: {
				ok: (value, emitter): void => {
					this.onDialogDeleteOk(emitter);
				}
			}
		});
	}

	protected onDialogDeleteOk(opener: DDialogOpener): void {
		this.diagram.delete().then(() => {
			DControllers.getCommandController().clear();
		});
	}

	protected toTheme(options?: FGraphicEditorOptions): FThemeGraphicEditor {
		const theme = options?.theme;
		if (theme) {
			if (isString(theme)) {
				return DThemes.getInstance().get(theme);
			}
			return theme;
		}
		return this.getThemeDefault();
	}

	protected getThemeDefault(): FThemeGraphicEditor {
		return DThemes.getInstance().get(this.getType());
	}

	protected getType(): string {
		return "FGraphicEditor";
	}
}
