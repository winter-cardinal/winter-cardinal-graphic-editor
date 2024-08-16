import {
	DApplication,
	DApplicationOptions,
	DApplications,
	DBase,
	DBoard,
	DButton,
	DButtonFile,
	DButtonFileAs,
	DDiagram,
	DDiagramCanvas,
	DDiagramOptions,
	DDiagrams,
	DDiagramSerialized,
	DDiagramSerializedName,
	DDialogConfirmDelete,
	DDialogConfirmDiscard,
	DDialogInputText,
	DDialogSelect,
	DInputText,
	DInputTextAndLabel,
	DLayoutHorizontal,
	DLayoutSpace,
	DLayoutVertical,
	DTable,
	DTableColumnOptions,
	DTableDataFilterObject,
	EShape,
	EShapeBase,
	EShapeCapabilities,
	EShapeCapability,
	EShapeDataValue,
	UtilFileDownloader,
	UtilGestureModifier,
	UtilGestureModifiers,
	UtilKeyboardEvent,
	UtilPointerEvent,
	DInputSearch,
	DDialogOpener,
	EShapeEmbedded,
	DDialogProcessing,
	DThemes,
	isString
} from "@wcardinal/wcardinal-ui";
import {
	DisplayObject,
	InteractionEvent,
	InteractionManager,
	Point,
	Rectangle,
	Texture
} from "pixi.js";
import { GraphicComponent } from "./data/graphic-component";
import { GraphicTester } from "./data/graphic-tester";
import { GraphicTesterComponent } from "./data/graphic-tester-component";
import { GraphicTesterName } from "./data/graphic-tester-name";
import { GraphicTesterObject } from "./data/graphic-tester-object";
import { GraphicTesterObjectValue } from "./data/graphic-tester-object-value";
import { newGraphicTester } from "./data/new-graphic-tester";
import { toGraphicTesterObject } from "./data/to-graphic-tester-object";
import { toGraphicTesterSerialized } from "./data/to-graphic-tester-serialized";
import { toGraphicTesterSimple } from "./data/to-graphic-tester-simple";
import { EDialogProcessing } from "./editor/e-dialog-processing";
import { newDialogSelectWithThumbnails } from "./editor/e-dialog-select-with-thumbnails";
import { EToolSelectArea } from "./tool/e-tool-select-area";
import { EToolSelectMode } from "./tool/e-tool-select-mode";
import { EToolSelectSelection } from "./tool/e-tool-select-selection";
import { UtilCsv } from "./util/util-csv";
import { UtilDate } from "./util/util-date";
import { UtilShapeAreaSelect } from "./util/util-shape-area-select";
import { UtilHitTest } from "./util/util-hit-test";
import { FThemeGraphicTester } from "./f-theme-graphic-tester";
import {
	UtilCanvasCategory,
	UtilCanvasCategoryOptions,
	UtilCategoryOptionFunction
} from "./util/util-canvas-category";
import { UtilShapeSearch } from "./util/util-shape-search";

export interface FGraphicTesterController {
	graphic: GraphicComponent;
	graphicTester: GraphicTesterComponent;
	toThumbnail?: (id: number) => string | Texture | DisplayObject | undefined;
}

export interface FGraphicTesterCanvasOptions {
	category?: UtilCanvasCategoryOptions | UtilCategoryOptionFunction;
}

export interface FGraphicTesterOptions {
	controller: FGraphicTesterController;
	application?: DApplicationOptions;
	diagram?: DDiagramOptions;
	header?: () => DBase | null;
	editable?: boolean;
	margin?: number;
	canvas?: FGraphicTesterCanvasOptions;
	theme?: string | FThemeGraphicTester;
}

export interface FGraphicTesterDataMappingRow {
	uuids: number[];
	id: string;
	value: GraphicTesterObjectValue;
}

export interface FGraphicTesterDataFilter
	extends DTableDataFilterObject<FGraphicTesterDataMappingRow> {
	word: string;
}

export class FGraphicTester<OPTIONS extends FGraphicTesterOptions = FGraphicTesterOptions> {
	protected _options: OPTIONS;
	protected _theme: FThemeGraphicTester;
	protected _application: DApplication;
	protected _icons: Record<string, Texture>;
	protected _margin: number;
	protected _controller: FGraphicTesterController;
	protected _category: UtilCanvasCategory;

	protected _graphic?: DDiagramSerialized;
	protected _tester?: GraphicTester;
	protected _isEditable: boolean;
	protected _isChanged: boolean;

	protected _diagram?: DDiagram;
	protected _table?: DTable<FGraphicTesterDataMappingRow>;
	protected _tableFilter?: FGraphicTesterDataFilter;
	protected _tableFilterInput?: DInputText;
	protected _dialogProcessing?: DDialogProcessing;
	protected _dialogConfirmDelete?: DDialogConfirmDelete;
	protected _dialogSelectGraphic?: Promise<DDialogSelect<DDiagramSerializedName, string>>;
	protected _dialogSelectTester?: DDialogSelect<GraphicTesterName>;
	protected _dialogDiscard?: DDialogConfirmDiscard;
	protected _dialogCreate?: DDialogInputText;
	protected _inputName?: DInputTextAndLabel;
	protected _paneRight?: DLayoutVertical;
	protected _paneLeft?: DBoard;

	protected _toolFileButtonGraphicOpen?: DButton<string>;
	protected _toolFileButtonCreate?: DButton<string>;
	protected _toolFileButtonOpen?: DButton<string>;
	protected _toolFileButtonUpload?: DButtonFile<string>;
	protected _toolFileButtonDownload?: DButton<string>;
	protected _toolFileButtonSave?: DButton<string>;
	protected _toolFileButtonDelete?: DButton<string>;

	protected _layoutViewButton?: DLayoutHorizontal;
	protected _viewButtonZoomOut?: DButton<string>;
	protected _viewButtonZoomIn?: DButton<string>;
	protected _viewButtonDragAndPinch?: DButton<string>;
	protected _viewButtonReset?: DButton<string>;
	protected _viewButtonFit?: DButton<string>;

	protected _selectArea?: EToolSelectArea;
	protected _selectAreaRect: Rectangle;
	protected _interactionManager?: InteractionManager | null;
	protected _onDiagramMoveBound: (e: InteractionEvent) => void;
	protected _onDiagramUpBound: (e: InteractionEvent) => void;
	protected _onDiagramDownPoint: Point;
	protected _onDiagramMovePoint: Point;
	protected _selection?: EToolSelectSelection;
	protected _selectMode: EToolSelectMode;
	protected _childSelectTime: number;
	protected _childSelectChild: EShape | null;
	protected _isSelectSuspended: boolean;

	protected _expressionMap: Map<string, unknown>;
	protected _appliedValues: Map<EShapeDataValue, unknown>;
	protected _isMappingsDirty: boolean;

	constructor(options: OPTIONS) {
		this._options = options;
		const theme = this.toTheme(options);
		this._theme = theme;
		this._controller = options.controller;
		this._category = new UtilCanvasCategory(options.canvas?.category);
		this._icons = theme.getIconBuilder().build();
		const margin = options.margin ?? theme.getMargin();
		this._margin = margin;
		this._isEditable = options.editable !== false;
		this._isChanged = false;
		this._onDiagramMoveBound = (e: InteractionEvent): void => {
			this.onDiagramMove(e);
		};
		this._onDiagramUpBound = (e: InteractionEvent): void => {
			this.onDiagramUp(e);
		};
		this._onDiagramDownPoint = new Point();
		this._onDiagramMovePoint = new Point();
		this._selectAreaRect = new Rectangle();
		this._selectMode = EToolSelectMode.NONE;
		this._childSelectTime = 0;
		this._childSelectChild = null;
		this._isSelectSuspended = false;
		this._expressionMap = new Map<string, unknown>();
		this._appliedValues = new Map<EShapeDataValue, [string, string]>();
		this._isMappingsDirty = false;

		// Application
		const application = new DApplication(options.application);
		this._application = application;

		// Panes
		application.stage.addChild(this.newPanes(options));

		this.onChange();

		const onMappingsChangeBound = (): void => {
			if (this._isMappingsDirty) {
				this._isMappingsDirty = false;
				this.onMappingsChange();
			}
			setTimeout(onMappingsChangeBound, 100);
		};
		onMappingsChangeBound();
	}

	get application(): DApplication {
		return this._application;
	}

	get controller(): FGraphicTesterController {
		return this._controller;
	}

	protected newHeader(options: FGraphicTesterOptions): DBase | null {
		const header = options.header;
		if (header) {
			const result = header();
			if (result) {
				const margin = this._margin;
				result.x = margin;
				result.y = margin;
				result.setWidth((p) => p);
				return result;
			}
		}
		return null;
	}

	protected newPanes(options: OPTIONS): DBase {
		const margin = this._margin;
		return new DLayoutVertical({
			x: margin,
			y: margin,
			width: (p) => p - 2 * margin,
			height: (p) => p - 2 * margin,
			margin: margin,
			children: [
				this.newHeader(options),
				new DLayoutHorizontal({
					weight: 1,
					width: "padding",
					margin: this._margin * 0.5,
					children: [this.leftPane, this.rightPane]
				})
			]
		});
	}

	protected get leftPane(): DBoard {
		let result = this._paneLeft;
		if (result == null) {
			result = this.newLeftPane();
			this._paneLeft = result;
		}
		return result;
	}

	protected newLeftPane(): DBoard {
		return new DBoard({
			weight: 1,
			height: "padding",
			shadow: "WEAK",
			children: [this.diagram, this.toolFileButtonGraphicOpen, this.layoutViewButton]
		});
	}

	protected get toolFileButtonGraphicOpen(): DButton<string> {
		let result = this._toolFileButtonGraphicOpen;
		if (result == null) {
			result = this.newToolFileButtonGraphicOpen();
			this._toolFileButtonGraphicOpen = result;
		}
		return result;
	}

	protected newToolFileButtonGraphicOpen(): DButton<string> {
		const theme = this._theme;
		const margin = this._margin * 0.5;
		return new DButton<string>({
			x: margin,
			y: margin,
			image: {
				source: this._icons.open
			},
			title: theme.getToolFileButtonGraphicOpenTitle(),
			shortcut: theme.getToolFileButtonGraphicOpenShortcut(),
			theme: theme.getToolFileButtonGraphicTheme(),
			on: {
				active: (emitter): void => {
					this.onToolFileButtonGraphicOpenActive(emitter);
				}
			}
		});
	}

	protected onToolFileButtonGraphicOpenActive(opener?: DDialogOpener): void {
		if (this.isChanged) {
			this.dialogDiscard.open(opener).then(() => {
				this.dialogSelectGraphic.then((dialogSelectGraphic) => {
					dialogSelectGraphic.open(opener);
				});
			});
		} else {
			this.dialogSelectGraphic.then((dialogSelectGraphic) => {
				dialogSelectGraphic.open(opener);
			});
		}
	}

	protected get layoutViewButton(): DLayoutHorizontal {
		let result = this._layoutViewButton;
		if (result == null) {
			result = this.newLayoutViewButton();
			this._layoutViewButton = result;
		}
		return result;
	}

	protected newLayoutViewButton(): DLayoutHorizontal {
		const margin = this._margin * 0.5;
		const position = (p: number, s: number) => p - s - margin;
		return new DLayoutHorizontal({
			x: position,
			y: position,
			width: "auto",
			height: "auto",
			margin: 0,
			padding: 0,
			children: this.newViewButtons()
		});
	}

	protected newViewButtons(): DButton<string>[] {
		return [
			this.viewButtonZoomOut,
			this.viewButtonZoomIn,
			this.viewButtonDragAndPinch,
			this.viewButtonReset,
			this.viewButtonFit
		];
	}

	protected get viewButtonZoomOut(): DButton<string> {
		let result = this._viewButtonZoomOut;
		if (result == null) {
			result = this.newViewButtonZoomOut();
			this._viewButtonZoomOut = result;
		}
		return result;
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
		let result = this._viewButtonZoomIn;
		if (result == null) {
			result = this.newViewButtonZoomIn();
			this._viewButtonZoomIn = result;
		}
		return result;
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

	protected get viewButtonReset(): DButton<string> {
		let result = this._viewButtonReset;
		if (result == null) {
			result = this.newViewButtonReset();
			this._viewButtonReset = result;
		}
		return result;
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

	protected get viewButtonDragAndPinch(): DButton<string> {
		let result = this._viewButtonDragAndPinch;
		if (result == null) {
			result = this.newViewButtonDragAndPinch();
			this._viewButtonDragAndPinch = result;
		}
		return result;
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
					this._isSelectSuspended = true;
				},
				inactive: (): void => {
					this._isSelectSuspended = false;
				}
			}
		});
	}

	protected get viewButtonFit(): DButton<string> {
		let result = this._viewButtonFit;
		if (result == null) {
			result = this.newViewButtonFit();
			this._viewButtonFit = result;
		}
		return result;
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

	protected get rightPane(): DLayoutVertical {
		let result = this._paneRight;
		if (result == null) {
			result = this.newRightPane();
			this._paneRight = result;
		}
		return result;
	}

	protected newRightPane(): DLayoutVertical {
		return new DLayoutVertical({
			width: 400,
			height: "padding",
			margin: this._margin * 0.5,
			children: [
				new DLayoutHorizontal({
					width: "padding",
					height: "auto",
					children: [
						new DLayoutSpace({
							weight: 1
						}),
						this.toolFileButtonCreate,
						this.toolFileButtonOpen,
						this.toolFileButtonSave,
						this.toolFileButtonDelete
					]
				}),
				this.inputName,
				new DLayoutHorizontal({
					width: "padding",
					height: "auto",
					children: [
						this.tableFilterInput,
						this.toolFileButtonUpload,
						this.toolFileButtonDownload
					]
				}),
				this.table
			]
		});
	}

	protected get dialogProcessing(): DDialogProcessing {
		let result = this._dialogProcessing;
		if (result == null) {
			result = this.newDialogProcessing();
			this._dialogProcessing = result;
		}
		return result;
	}

	protected newDialogProcessing(): DDialogProcessing {
		return new EDialogProcessing();
	}

	protected get dialogDelete(): DDialogConfirmDelete {
		let result = this._dialogConfirmDelete;
		if (result == null) {
			result = this.newDialogDelete();
			this._dialogConfirmDelete = result;
		}
		return result;
	}

	protected newDialogDelete(): DDialogConfirmDelete {
		return new DDialogConfirmDelete({
			on: {
				ok: (): void => {
					const tester = this._tester;
					if (tester) {
						if (tester.id != null) {
							this._controller.graphicTester.delete(tester.id);
						}
						this.tester = undefined;
					}
				}
			}
		});
	}

	protected get tableFilterInput(): DInputText {
		let result = this._tableFilterInput;
		if (result == null) {
			result = this.newTableFilterInput();
			this._tableFilterInput = result;
		}
		return result;
	}

	protected newTableFilterInput(): DInputText {
		return new DInputSearch({
			weight: 1,
			on: {
				input: (value: string): void => {
					const word = value.trim();
					this.tableFilter.word = word;
					const filter = this.table.data.filter;
					if (0 < word.length) {
						filter.apply();
					} else {
						filter.unapply();
					}
				}
			}
		});
	}

	protected get toolFileButtonCreate(): DButton<string> {
		let result = this._toolFileButtonCreate;
		if (result == null) {
			result = this.newToolFileButtonCreate();
			this._toolFileButtonCreate = result;
		}
		return result;
	}

	protected newToolFileButtonCreate(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			image: {
				source: this.icons.new
			},
			title: theme.getToolFileButtonCreateTitle(),
			shortcut: theme.getToolFileButtonCreateShortcut(),
			theme: theme.getToolFileButtonTheme(),
			on: {
				active: (emitter): void => {
					this.onToolFileButtonCreateActive(emitter);
				}
			}
		});
	}

	protected onToolFileButtonCreateActive(opener?: DDialogOpener): void {
		if (this.isChanged) {
			this.dialogDiscard.open(opener).then(() => {
				this.dialogCreate.open(opener);
			});
		} else {
			this.dialogCreate.open(opener);
		}
	}

	protected get toolFileButtonOpen(): DButton<string> {
		let result = this._toolFileButtonOpen;
		if (result == null) {
			result = this.newToolFileButtonOpen();
			this._toolFileButtonOpen = result;
		}
		return result;
	}

	protected newToolFileButtonOpen(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			image: {
				source: this.icons.open
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
		if (this.isChanged) {
			this.dialogDiscard.open(opener).then(() => {
				this.dialogSelectMapping.open(opener);
			});
		} else {
			this.dialogSelectMapping.open(opener);
		}
	}

	protected get toolFileButtonUpload(): DButtonFile<string> {
		let result = this._toolFileButtonUpload;
		if (result == null) {
			result = this.newToolFileButtonUpload();
			this._toolFileButtonUpload = result;
		}
		return result;
	}

	protected newToolFileButtonUpload(): DButtonFile<string> {
		const theme = this._theme;
		return new DButtonFile<string>({
			image: {
				source: this.icons.upload
			},
			title: theme.getToolFileButtonUploadTitle(),
			shortcut: theme.getToolFileButtonUploadShortcut(),
			theme: theme.getToolFileButtonTheme(),
			as: DButtonFileAs.TEXT,
			on: {
				open: (data: string, file: File): void => {
					this.onToolFileButtonUploadOpen(data, file);
				}
			}
		});
	}

	protected onToolFileButtonUploadOpen(data: string, file: File): void {
		const tester = this._tester;
		if (tester) {
			tester.mappings = toGraphicTesterObject(data);
			this.onDiagramSelectionChange();
			this.toDirty();
			this.toMappingsDirty();
		}
	}

	protected get toolFileButtonDownload(): DButton<string> {
		let result = this._toolFileButtonDownload;
		if (result == null) {
			result = this.newToolFileButtonDownload();
			this._toolFileButtonDownload = result;
		}
		return result;
	}

	protected newToolFileButtonDownload(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			image: {
				source: this.icons.download
			},
			title: theme.getToolFileButtonDownloadTitle(),
			shortcut: theme.getToolFileButtonDownloadShortcut(),
			theme: theme.getToolFileButtonTheme(),
			on: {
				active: (): void => {
					this.onToolFileButtonDownloadActive();
				}
			}
		});
	}

	protected onToolFileButtonDownloadActive(): void {
		const graphic = this._graphic;
		const tester = this._tester;
		if (graphic && tester) {
			const diagram = this.diagram;
			const canvas = diagram.canvas;
			if (canvas) {
				const layers = canvas.layer.children;
				const uuidToDataValueIds = new Map<number, Set<string>>();
				const rows: Array<[number, string, string]> = [];
				for (let i = 0, imax = layers.length; i < imax; ++i) {
					this.toCsvRows(
						layers[i].children,
						tester.mappings,
						null,
						uuidToDataValueIds,
						rows
					);
				}
				rows.sort((a, b) => {
					return a[0] - b[0];
				});
				UtilFileDownloader.download(this.getFilename(), UtilCsv.stringify(rows));
			}
		}
	}

	protected toCsvRows(
		shapes: EShape[],
		mappings: Map<number, GraphicTesterObject>,
		dataShape: EShape | null,
		uuidToDataValueIds: Map<number, Set<string>>,
		result: Array<[number, string, string]>
	): Array<[number, string, string]> {
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			const uuid = (dataShape || shape).uuid;
			const object = mappings.get(uuid);
			const data = shape.data;
			let dataValueIds = uuidToDataValueIds.get(uuid);
			if (dataValueIds == null) {
				dataValueIds = new Set<string>();
				uuidToDataValueIds.set(uuid, dataValueIds);
			}
			for (let j = 0, jmax = data.size(); j < jmax; ++j) {
				const dataValue = data.get(j);
				if (dataValue) {
					const dataValueId = dataValue.id;
					if (!dataValueIds.has(dataValueId)) {
						dataValueIds.add(dataValueId);
						const value = (object && object[dataValueId]) || "";
						result.push([uuid, dataValueId, value]);
					}
				}
			}
			this.toCsvRows(
				shape.children,
				mappings,
				this.toDataShape(dataShape, shape),
				uuidToDataValueIds,
				result
			);
		}
		return result;
	}

	protected get toolFileButtonSave(): DButton<string> {
		let result = this._toolFileButtonSave;
		if (result == null) {
			result = this.newToolFileButtonSave();
			this._toolFileButtonSave = result;
		}
		return result;
	}

	protected newToolFileButtonSave(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			image: {
				source: this.icons.save
			},
			title: theme.getToolFileButtonSaveTitle(),
			shortcut: theme.getToolFileButtonSaveShortcut(),
			theme: theme.getToolFileButtonTheme(),
			on: {
				active: (emitter): void => {
					this.onToolFileButtonSaveActive(emitter);
				}
			}
		});
	}

	protected onToolFileButtonSaveActive(opener?: DDialogOpener): void {
		const graphic = this._graphic;
		const tester = this._tester;
		if (graphic && tester) {
			tester.name = this.inputName.input.value;
			const simple = toGraphicTesterSimple(tester);
			const dialogProcessing = this.dialogProcessing;
			dialogProcessing.open(opener);
			this._controller.graphicTester.save(simple).then(
				(id) => {
					simple.id = id;
					this.tester = toGraphicTesterSerialized(simple);
					dialogProcessing.resolve();
				},
				(reason: string) => {
					dialogProcessing.reject(reason);
				}
			);
		}
	}

	protected get toolFileButtonDelete(): DButton<string> {
		let result = this._toolFileButtonDelete;
		if (result == null) {
			result = this.newToolFileButtonDelete();
			this._toolFileButtonDelete = result;
		}
		return result;
	}

	protected newToolFileButtonDelete(): DButton<string> {
		const theme = this._theme;
		return new DButton<string>({
			image: {
				source: this.icons.delete
			},
			title: theme.getToolFileButtonDeleteTitle(),
			shortcut: theme.getToolFileButtonDeleteShortcut(),
			theme: theme.getToolFileButtonTheme(),
			on: {
				active: (emitter): void => {
					this.onToolFileButtonDeleteActive(emitter);
				}
			}
		});
	}

	protected onToolFileButtonDeleteActive(opener?: DDialogOpener): void {
		this.dialogDelete.open(opener);
	}

	protected get inputName(): DInputTextAndLabel {
		let result = this._inputName;
		if (result == null) {
			result = this.newInputName();
			this._inputName = result;
		}
		return result;
	}

	protected newInputName(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "100%",
			label: {
				text: {
					value: this._theme.getInputNameLabel()
				}
			},
			input: {
				weight: 1,
				on: {
					change: () => {
						this.toDirty();
					}
				}
			}
		});
	}

	protected get icons(): Record<string, Texture> {
		return this._icons;
	}

	protected get diagram(): DDiagram {
		let result = this._diagram;
		if (result == null) {
			result = this.newDiagram();
			this._diagram = result;
		}
		return result;
	}

	protected newDiagram(): DDiagram {
		const result = new DDiagram(this.toDiagramOptions(this._options));
		result.on("down", (e: InteractionEvent, diagram: DDiagram): void => {
			this.onDiagramDown(e, diagram);
		});
		result.on("keydown", (e: KeyboardEvent): void => {
			this.onDiagramKeydown(e);
		});
		return result;
	}

	protected toDiagramOptions(options: OPTIONS): DDiagramOptions {
		const result = options.diagram || {};
		result.controller ??= this._controller.graphic;
		result.width ??= "100%";
		result.height ??= "100%";
		result.mask ??= true;
		result.ambient ??= true;
		const view = (result.view ??= {});
		const gesture = (view.gesture ??= {});
		gesture.modifier ??= UtilGestureModifier.ALT;
		const checker = (gesture.checker ??= {});
		checker.start ??= (e: InteractionEvent, modifier: UtilGestureModifier): boolean => {
			return UtilGestureModifiers.match(e, modifier) || this._isSelectSuspended;
		};
		checker.move ??= (e: InteractionEvent, modifier: UtilGestureModifier): boolean => {
			const diagram = this._diagram;
			return (
				UtilGestureModifiers.match(e, modifier) || !!(diagram && diagram.state.isGesturing)
			);
		};
		const zoom = (view.zoom ??= {});
		const dblclick = (zoom.dblclick ??= {});
		dblclick.checker ??= (
			e: WheelEvent | MouseEvent | TouchEvent,
			modifier: UtilGestureModifier
		): boolean => {
			return this._isSelectSuspended;
		};
		return result;
	}

	protected get selection(): EToolSelectSelection {
		let result = this._selection;
		if (result == null) {
			result = new EToolSelectSelection({
				diagram: this.diagram,
				modifier: {
					editable: false
				}
			});
			result.on("change", () => {
				this.onDiagramSelectionChange();
			});
			this._selection = result;
		}
		return result;
	}

	protected toDataMappingRows(
		shapes: EShape[],
		mappings: Map<number, GraphicTesterObject>,
		dataShape: EShape | null,
		dataValueIdToRow: Map<string, FGraphicTesterDataMappingRow>,
		result: FGraphicTesterDataMappingRow[]
	): FGraphicTesterDataMappingRow[] {
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			const uuid = (dataShape || shape).uuid;
			const object = mappings.get(uuid);
			const data = shape.data;
			for (let j = 0, jmax = data.size(); j < jmax; ++j) {
				const dataValue = data.get(j);
				if (dataValue != null) {
					const dataValueId = dataValue.id;
					const value = (object && object[dataValueId]) || "";
					let row = dataValueIdToRow.get(dataValueId);
					if (row == null) {
						row = {
							uuids: [uuid],
							id: dataValueId,
							value
						};
						dataValueIdToRow.set(dataValueId, row);
						result.push(row);
					} else {
						row.uuids.push(uuid);
						row.value = value;
					}
				}
			}
			this.toDataMappingRows(
				shape.children,
				mappings,
				this.toDataShape(dataShape, shape),
				dataValueIdToRow,
				result
			);
		}
		return result;
	}

	protected toDataShape(dataShape: EShape | null, shape: EShape): EShape | null {
		if (dataShape) {
			return dataShape;
		}
		if (shape instanceof EShapeEmbedded) {
			return shape;
		}
		return null;
	}

	protected onDiagramSelectionChange(): void {
		const selection = this._selection;
		const tester = this._tester;
		const table = this.table;
		if (selection && tester) {
			const shapes = selection.get();
			if (0 < shapes.length) {
				const rows: FGraphicTesterDataMappingRow[] = [];
				this.toDataMappingRows(
					shapes,
					tester.mappings,
					null,
					new Map<string, FGraphicTesterDataMappingRow>(),
					rows
				);
				table.data.clearAndAddAll(rows);
			} else {
				table.data.clear();
			}
		} else {
			table.data.clear();
		}
	}

	protected onDiagramDown(e: InteractionEvent, diagram: DDiagram): void {
		if (this._isSelectSuspended) {
			return;
		}
		const originalEvent = e.data.originalEvent;
		if (originalEvent.altKey) {
			return;
		}
		const diagramCanvas = diagram.canvas;
		if (diagramCanvas) {
			const isAddMode = originalEvent.ctrlKey || originalEvent.shiftKey;
			if (this._selectMode === EToolSelectMode.SELECT) {
				this._selectMode = EToolSelectMode.NONE;
				this.onDiagramSelectEnd(diagramCanvas, isAddMode);
				return;
			}

			const global = e.data.global;
			const onDownPoint = this._onDiagramDownPoint;
			onDownPoint.copyFrom(global);
			const selection = this.selection;
			const hitObject = this.hitTest(global, diagramCanvas);
			if (hitObject instanceof EShapeBase) {
				if (isAddMode) {
					selection.toggle(hitObject);
				} else if (!selection.contains(hitObject)) {
					const first = selection.first();
					if (first == null) {
						selection.set(hitObject.root);
					} else {
						const selected = UtilShapeSearch.toSelected(hitObject);
						if (selected != null) {
							if (EShapeCapabilities.contains(selected, EShapeCapability.CHILDREN)) {
								this._childSelectTime = Date.now();
								this._childSelectChild = UtilShapeSearch.toOfParent(
									hitObject,
									selected
								);
							}
						} else {
							const sharedParent = UtilShapeSearch.toSharedParent(first, hitObject);
							selection.set(UtilShapeSearch.toOfParent(hitObject, sharedParent));
						}
					}
				}

				this._selectMode = EToolSelectMode.TRANSLATE;
			} else {
				// Select area
				const area = this.selectArea;
				diagramCanvas.toLocal(global, undefined, onDownPoint);
				area.x = onDownPoint.x;
				area.y = onDownPoint.y;
				area.size.set(0, 0);
				area.update();
				diagramCanvas.addChild(area);
				DApplications.update(diagram);

				// Select mode
				this._selectMode = EToolSelectMode.SELECT;
			}

			const oldInteractionManager = this._interactionManager;
			if (oldInteractionManager) {
				this._interactionManager = null;
				oldInteractionManager.off(UtilPointerEvent.move, this._onDiagramMoveBound);
				const onDiagramUpBound = this._onDiagramUpBound;
				oldInteractionManager.off(UtilPointerEvent.up, onDiagramUpBound);
				oldInteractionManager.off(UtilPointerEvent.upoutside, onDiagramUpBound);
				oldInteractionManager.off(UtilPointerEvent.cancel, onDiagramUpBound);
			}

			const applicationLayer = DApplications.getLayer(diagram);
			if (applicationLayer) {
				const newInteractionManager = applicationLayer.renderer.plugins.interaction;
				this._interactionManager = newInteractionManager;
				newInteractionManager.on(UtilPointerEvent.move, this._onDiagramMoveBound);
				const onDiagramUpBound = this._onDiagramUpBound;
				newInteractionManager.on(UtilPointerEvent.up, onDiagramUpBound);
				newInteractionManager.on(UtilPointerEvent.upoutside, onDiagramUpBound);
				newInteractionManager.on(UtilPointerEvent.cancel, onDiagramUpBound);
			}
		}
	}

	protected get selectArea(): EToolSelectArea {
		let result = this._selectArea;
		if (result == null) {
			result = new EToolSelectArea();
			this._selectArea = result;
		}
		return result;
	}

	protected onDiagramMove(e: InteractionEvent): void {
		const originalEvent = e.data.originalEvent;
		if (originalEvent.altKey) {
			return;
		}
		const diagram = this.diagram;
		const diagramCanvas = diagram.canvas;
		const diagramLayer = diagram.layer;
		const mode = this._selectMode;
		if (diagramCanvas && diagramLayer && mode !== EToolSelectMode.NONE) {
			const global = e.data.global;
			const onDownPoint = this._onDiagramDownPoint;
			if (mode === EToolSelectMode.SELECT) {
				const area = this.selectArea;
				const onMovePoint = diagramCanvas.toLocal(
					global,
					undefined,
					this._onDiagramMovePoint
				);
				area.x = Math.min(onDownPoint.x, onMovePoint.x);
				area.y = Math.min(onDownPoint.y, onMovePoint.y);
				area.size.set(
					Math.max(onDownPoint.x, onMovePoint.x) - area.x,
					Math.max(onDownPoint.y, onMovePoint.y) - area.y
				);
				area.update();
				DApplications.update(diagram);
			} else {
				const dx = global.x - onDownPoint.x;
				const dy = global.y - onDownPoint.y;
				if (1 <= Math.abs(dx) || 1 <= Math.abs(dy)) {
					this._childSelectChild = null;
				}
			}
		}
	}

	protected onDiagramUp(e: InteractionEvent): void {
		const diagram = this.diagram;
		const diagramCanvas = diagram.canvas;
		const diagramLayer = diagram.layer;
		const mode = this._selectMode;

		const interactionManager = this._interactionManager;
		if (interactionManager) {
			this._interactionManager = null;
			interactionManager.off(UtilPointerEvent.move, this._onDiagramMoveBound);
			const onDiagramUpBound = this._onDiagramUpBound;
			interactionManager.off(UtilPointerEvent.up, onDiagramUpBound);
			interactionManager.off(UtilPointerEvent.upoutside, onDiagramUpBound);
			interactionManager.off(UtilPointerEvent.cancel, onDiagramUpBound);
		}

		if (diagramCanvas && diagramLayer && mode !== EToolSelectMode.NONE) {
			this._selectMode = EToolSelectMode.NONE;

			if (mode === EToolSelectMode.SELECT) {
				const originalEvent = e.data.originalEvent;
				const isAddMode = originalEvent.ctrlKey || originalEvent.shiftKey;
				this.onDiagramSelectEnd(diagramCanvas, isAddMode);
			} else {
				// Select the child
				const selection = this.selection;
				const childSelectChild = this._childSelectChild;
				if (childSelectChild != null) {
					this._childSelectChild = null;
					const elapsedTime = Date.now() - this._childSelectTime;
					if (elapsedTime < 333) {
						selection.set(childSelectChild);
					}
				}
				DApplications.update(diagram);
			}
		}
	}

	protected onDiagramSelectEnd(canvas: DDiagramCanvas, isAddMode: boolean): void {
		const area = this.selectArea;
		const selection = this.selection;
		if (0 < area.size.x && 0 < area.size.y) {
			const areaRect = area.getBounds(false, this._selectAreaRect);
			const foundShapes: EShape[] = [];
			const layers = canvas.layer.children;
			for (let i = layers.length - 1; 0 <= i; --i) {
				UtilShapeAreaSelect.findShapes(layers[i], areaRect, foundShapes);
			}
			if (isAddMode) {
				if (0 < foundShapes.length) {
					selection.addAll(foundShapes);
				}
			} else {
				if (0 < foundShapes.length || !selection.isEmpty()) {
					selection.clearAndAddAll(foundShapes);
				}
			}
		} else if (!isAddMode) {
			if (!selection.isEmpty()) {
				selection.clear();
			}
		}
		canvas.removeChild(area);
		DApplications.update(canvas);
	}

	protected hitTest(global: Point, canvas: DDiagramCanvas): EShape | null {
		const layers = canvas.layer.children;
		for (let i = layers.length - 1; 0 <= i; --i) {
			const result = UtilHitTest.execute(global, layers[i]);
			if (result != null) {
				return result;
			}
		}
		return null;
	}

	protected onDiagramKeydown(e: KeyboardEvent): void {
		if (UtilKeyboardEvent.isSelectAllKey(e)) {
			const canvas = this.diagram.canvas;
			if (canvas != null) {
				const selection = this.selection;
				selection.clear();
				const layers = canvas.layer.children;
				for (let i = 0, imax = layers.length; i < imax; ++i) {
					const children = layers[i].children;
					if (0 < children.length) {
						selection.addAll(children);
					}
				}
			}
		}
	}

	protected get table(): DTable<FGraphicTesterDataMappingRow> {
		let result = this._table;
		if (result == null) {
			result = this.newTable();
			this._table = result;
		}
		return result;
	}

	protected newTable(): DTable<FGraphicTesterDataMappingRow> {
		return new DTable<FGraphicTesterDataMappingRow>({
			weight: 1,
			width: "padding",
			columns: this.newColumnOptions(),
			data: {
				filter: this.tableFilter
			}
		});
	}

	protected get tableFilter(): FGraphicTesterDataFilter {
		let result = this._tableFilter;
		if (result == null) {
			result = this.newTableFilter();
			this._tableFilter = result;
		}
		return result;
	}

	protected newTableFilter(): FGraphicTesterDataFilter {
		return {
			word: "",
			test(row: FGraphicTesterDataMappingRow): boolean {
				const word = this.word;
				return (
					word.length <= 0 ||
					0 <= row.id.indexOf(word) ||
					0 <= row.value[0].indexOf(word) ||
					0 <= row.value[1].indexOf(word)
				);
			}
		};
	}

	protected get dialogSelectGraphic(): Promise<DDialogSelect<DDiagramSerializedName, string>> {
		let result = this._dialogSelectGraphic;
		if (result == null) {
			result = this.newDialogSelectGraphic();
			this._dialogSelectGraphic = result;
		}
		return result;
	}

	protected newDialogSelectGraphic(): Promise<DDialogSelect<DDiagramSerializedName, string>> {
		return this._category.get().then((category) => {
			if (this._options.controller.toThumbnail != null) {
				const result = this.newDialogSelectGraphicImage();
				result.categories = category.items;
				return result;
			} else {
				const result = this.newDialogSelectGraphicNoImage();
				result.categories = category.items;
				return result;
			}
		});
	}

	protected newDialogSelectGraphicNoImage(): DDialogSelect<DDiagramSerializedName, string> {
		return new DDialogSelect<DDiagramSerializedName, string>({
			controller: this._controller.graphic,
			on: {
				select: (value: DDiagramSerializedName): void => {
					this.onDialogSelectGraphicSelect(value);
				}
			}
		});
	}

	protected newDialogSelectGraphicImage(): DDialogSelect<DDiagramSerializedName, string> {
		return newDialogSelectWithThumbnails(
			this._options.controller.graphic,
			this._controller.toThumbnail,
			(value: DDiagramSerializedName): void => {
				this.onDialogSelectGraphicSelect(value);
			}
		);
	}

	protected onDialogSelectGraphicSelect(value: DDiagramSerializedName): void {
		this._controller.graphic.get(value.id).then((serialized) => {
			this.graphic = DDiagrams.toSerialized(serialized);
		});
	}

	protected get graphic(): DDiagramSerialized | undefined {
		return this._graphic;
	}

	protected set graphic(graphic: DDiagramSerialized | undefined) {
		this._graphic = graphic;
		const diagram = this.diagram;
		if (graphic != null) {
			diagram.set(graphic);
		} else {
			diagram.set(null);
		}
		this._appliedValues.clear();
		this.tester = undefined;
	}

	protected get dialogSelectMapping(): DDialogSelect<GraphicTesterName> {
		let result = this._dialogSelectTester;
		if (result == null) {
			result = this.newDialogSelectMapping();
			this._dialogSelectTester = result;
		}
		return result;
	}

	protected newDialogSelectMapping(): DDialogSelect<GraphicTesterName> {
		const controller = this._controller;
		return new DDialogSelect<GraphicTesterName>({
			controller: {
				search: (word: string): Promise<GraphicTesterName[]> => {
					const graphic = this._graphic;
					if (graphic) {
						return controller.graphicTester.search(graphic.name, word);
					}
					return Promise.resolve([]);
				}
			},
			on: {
				select: (selected: GraphicTesterName): void => {
					controller.graphicTester.get(selected.id).then((serialized) => {
						const graphic = this._graphic;
						if (graphic) {
							this.tester = toGraphicTesterSerialized(serialized);
						}
					});
				}
			}
		});
	}

	protected get dialogDiscard(): DDialogConfirmDiscard {
		let result = this._dialogDiscard;
		if (result == null) {
			result = new DDialogConfirmDiscard();
			this._dialogDiscard = result;
		}
		return result;
	}

	protected get dialogCreate(): DDialogInputText {
		let result = this._dialogCreate;
		if (result == null) {
			result = this.newDialogCreate();
			this._dialogCreate = result;
		}
		return result;
	}

	protected newDialogCreate(): DDialogInputText {
		const result = new DDialogInputText({
			on: {
				open: (): void => {
					result.value = this._theme.newDialogCreateTextValue();
				},
				ok: (value: string): void => {
					const graphic = this._graphic;
					if (graphic) {
						this.tester = newGraphicTester(value, graphic);
					}
				}
			}
		});
		return result;
	}

	protected get tester(): GraphicTester | undefined {
		return this._tester;
	}

	protected set tester(tester: GraphicTester | undefined) {
		this._isChanged = false;
		const inputName = this.inputName.input;
		this._tester = tester;
		inputName.value = tester ? tester.name : "";
		this.onDiagramSelectionChange();
		this.onChange();
		this.toMappingsDirty();
	}

	get isNew(): boolean {
		const tester = this._tester;
		return tester != null && tester.id == null;
	}

	get isChanged(): boolean {
		return this._isChanged || this.isNew;
	}

	protected onChange(): void {
		const hasNoGraphc = this._graphic == null;
		const hasNoMapping = this._tester == null;
		const hasNoChanges = !this.isChanged;
		const isNotEditable = !this._isEditable;
		this.table.state.isDisabled = hasNoMapping;
		this.tableFilterInput.state.isDisabled = hasNoMapping;
		this.inputName.state.isDisabled = hasNoMapping || isNotEditable;
		this.toolFileButtonCreate.state.isDisabled = hasNoGraphc || isNotEditable;
		this.toolFileButtonOpen.state.isDisabled = hasNoGraphc;
		this.toolFileButtonUpload.state.isDisabled = hasNoMapping || isNotEditable;
		this.toolFileButtonDownload.state.isDisabled = hasNoMapping;
		this.toolFileButtonSave.state.isDisabled = hasNoMapping || hasNoChanges || isNotEditable;
		this.toolFileButtonDelete.state.isDisabled = hasNoMapping || isNotEditable;
	}

	protected evaluate(expression: string): unknown {
		return Function(`try { return (${expression}); } catch( e ) { return 0; }`)();
	}

	protected onMappingsChange(): void {
		const tester = this._tester;
		if (tester) {
			const mappings = tester.mappings;
			const diagram = this.diagram;
			const canvas = diagram.canvas;
			if (canvas) {
				let isChanged = false;
				const layers = canvas.layer.children;
				for (let i = 0, imax = layers.length; i < imax; ++i) {
					if (this.applyMappings(layers[i].children, mappings, null)) {
						isChanged = true;
					}
				}
				if (isChanged) {
					DApplications.update(diagram);
				}
			}
		}
	}

	protected applyMappings(
		shapes: EShape[],
		mappings: Map<number, GraphicTesterObject>,
		dataShape: EShape | null
	): boolean {
		let isChanged = false;
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];

			// Apply the mappings
			const uuid = (dataShape || shape).uuid;
			const mapping = mappings.get(uuid);
			if (mapping) {
				const data = shape.data;
				for (let j = 0, jmax = data.size(); j < jmax; ++j) {
					const dataValue = data.get(j);
					if (dataValue != null && this.applyMapping(dataValue, mapping[dataValue.id])) {
						isChanged = true;
					}
				}
			}

			// Children
			if (this.applyMappings(shape.children, mappings, this.toDataShape(dataShape, shape))) {
				isChanged = true;
			}
		}

		// Done
		return isChanged;
	}

	protected applyMapping(dataValue: EShapeDataValue, expression?: string): boolean {
		if (expression != null) {
			const expressionMap = this._expressionMap;
			if (expressionMap.has(expression)) {
				return this.applyMappingIfChanged(dataValue, expressionMap.get(expression));
			} else if (0 < expression.length) {
				try {
					const evaluated = this.evaluate(expression);
					expressionMap.set(expression, evaluated);
					return this.applyMappingIfChanged(dataValue, evaluated);
				} catch {
					// DO NOTHING
				}
			}
		}
		return false;
	}

	protected applyMappingIfChanged(dataValue: EShapeDataValue, value: unknown): boolean {
		const appliedValues = this._appliedValues;
		if (appliedValues.has(dataValue)) {
			const appliedValue = appliedValues.get(dataValue);
			if (appliedValue !== value) {
				appliedValues.set(dataValue, value);
				dataValue.value = value;
				return true;
			}
		} else {
			appliedValues.set(dataValue, value);
			dataValue.value = value;
			return true;
		}
		return false;
	}

	protected toDirty(): void {
		if (!this._isChanged) {
			this._isChanged = true;
			this.onChange();
		}
	}

	protected toMappingsDirty(): void {
		this._isMappingsDirty = true;
	}

	protected getFilename(): string {
		const name = this.inputName.input.value.toLowerCase();
		const date = UtilDate.format(Date.now());
		return `graphic-tester-${name}-${date}.csv`;
	}

	protected newColumnOptions(): Array<DTableColumnOptions<FGraphicTesterDataMappingRow>> {
		const isEditable = this._isEditable;
		const theme = this._theme;
		return [
			{
				type: "TEXT",
				label: theme.getTableColumnDataLabel(),
				editable: false,
				sortable: true,
				getter: (row: FGraphicTesterDataMappingRow): string => {
					return row.id;
				},
				setter: (row: FGraphicTesterDataMappingRow, index: number, value: string): void => {
					row.id = value;
					this.toDirty();
				}
			},
			{
				type: "TEXT",
				label: theme.getTableColumnValueLabel(),
				align: "LEFT",
				editable: isEditable,
				sortable: true,
				formatter: (value: GraphicTesterObjectValue | null): string => {
					return value || "";
				},
				getter: (row: FGraphicTesterDataMappingRow): GraphicTesterObjectValue => {
					return row.value;
				},
				setter: (
					row: FGraphicTesterDataMappingRow,
					index: number,
					value: GraphicTesterObjectValue
				): void => {
					const tester = this._tester;
					if (tester) {
						const uuids = row.uuids;
						const mappings = tester.mappings;
						const id = row.id;
						if (0 < value.length) {
							for (let i = 0, imax = uuids.length; i < imax; ++i) {
								const uuid = uuids[i];
								let object = mappings.get(uuid);
								if (object == null) {
									object = {};
									mappings.set(uuid, object);
								}
								object[id] = value;
							}
						} else {
							for (let i = 0, imax = uuids.length; i < imax; ++i) {
								const uuid = uuids[i];
								const object = mappings.get(uuid);
								if (object != null) {
									delete object[id];
								}
							}
						}
					}
					row.value = value;
					this.toDirty();
					this.toMappingsDirty();
				}
			}
		];
	}

	protected toTheme(options?: FGraphicTesterOptions): FThemeGraphicTester {
		const theme = options?.theme;
		if (theme) {
			if (isString(theme)) {
				return DThemes.getInstance().get(theme);
			}
			return theme;
		}
		return this.getThemeDefault();
	}

	protected getThemeDefault(): FThemeGraphicTester {
		return DThemes.getInstance().get(this.getType());
	}

	protected getType(): string {
		return "FGraphicTester";
	}
}
