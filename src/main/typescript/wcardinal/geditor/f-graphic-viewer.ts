import {
	DApplication,
	DApplicationOptions,
	DBase,
	DButton,
	DDiagram,
	DDiagrams,
	DDiagramSerializedName,
	DDiagramDataMapper,
	DDialogSelect,
	DLayoutHorizontal,
	DDialogOpener,
	DDiagramDataRemoteController,
	isString,
	DThemes
} from "@wcardinal/wcardinal-ui";
import { DisplayObject, Texture } from "pixi.js";
import { GraphicComponent } from "./data/graphic-component";
import { newDialogSelectWithThumbnails } from "./editor/e-dialog-select-with-thumbnails";
import { FThemeGraphicViewer } from "./f-theme-graphic-viewer";
import {
	UtilCanvasCategory,
	UtilCanvasCategoryOptions,
	UtilCategoryOptionFunction
} from "./util/util-canvas-category";

export interface FGraphicViewerController {
	graphic: GraphicComponent;
	remote?: DDiagramDataRemoteController;
	toThumbnail?: (id: number) => string | Texture | DisplayObject | undefined;
}

export interface FGraphicViewerButtonOptions {
	open?: boolean;
	view?: boolean;
}

export interface FGraphicViewerCanvasOptions {
	category?: UtilCanvasCategoryOptions | UtilCategoryOptionFunction;
}

export interface FGraphicViewerOptions {
	controller: FGraphicViewerController;
	application?: DApplicationOptions;
	header?: (buttons: DisplayObject[]) => DBase | null;
	button?: FGraphicViewerButtonOptions;
	margin?: number;
	canvas?: FGraphicViewerCanvasOptions;
	theme?: string | FThemeGraphicViewer;
}

export class FGraphicViewer<OPTIONS extends FGraphicViewerOptions = FGraphicViewerOptions> {
	protected _options: OPTIONS;
	protected _theme: FThemeGraphicViewer;
	protected _icons: Record<string, Texture>;
	protected _margin: number;
	protected _category: UtilCanvasCategory;

	protected _application: DApplication;
	protected _diagram?: DDiagram;
	protected _header?: DBase | null;

	protected _toolFileButtonGraphicOpen?: DButton<string>;

	protected _layoutViewButton?: DLayoutHorizontal;
	protected _viewButtonZoomOut?: DButton<string>;
	protected _viewButtonZoomIn?: DButton<string>;
	protected _viewButtonReset?: DButton<string>;
	protected _viewButtonFit?: DButton<string>;

	protected _dialogSelect?: Promise<DDialogSelect<DDiagramSerializedName, string>>;

	constructor(options: OPTIONS) {
		// Options
		this._options = options;
		const theme = this.toTheme(options);
		this._theme = theme;
		const margin = options.margin ?? theme.getMargin();
		this._margin = margin;
		const icons = theme.getIconBuilder().build();
		this._icons = icons;
		this._category = new UtilCanvasCategory(options.canvas?.category);

		// Application
		const application = new DApplication(options.application);
		this._application = application;
		const stage = application.stage;

		// Diagram
		const diagram = this.diagram;
		stage.addChild(diagram);

		// Header
		const header = this.header;
		if (header != null) {
			stage.addChild(header);
		}

		// View operations
		const button = options.button;
		if (button == null || button.view !== false) {
			stage.addChild(this.layoutViewButton);
		}
	}

	get application(): DApplication {
		return this._application;
	}

	get diagram(): DDiagram {
		let result = this._diagram;
		if (result == null) {
			result = this.newDiagram();
			this._diagram = result;
		}
		return result;
	}

	protected newDiagram(): DDiagram {
		const controller = this._options.controller;
		return new DDiagram({
			x: 0,
			y: 0,
			width: "100%",
			height: "100%",
			outline: {
				color: null
			},
			controller: controller.graphic,
			data: {
				mapper: this.newDataMapper(),
				remote: {
					controller: controller.remote
				}
			}
		});
	}

	protected get header(): DBase | null {
		let result = this._header;
		if (result === undefined) {
			result = this.newHeader();
			this._header = result;
		}
		return result;
	}

	protected newHeader(): DBase | null {
		const header = this._options.header;
		if (header != null) {
			const result = header(this.newToolFileButtons());
			if (result != null) {
				const margin = this._margin;
				result.x = margin;
				result.y = margin;
				result.setWidth((p) => p - 2 * margin);
				return result;
			}
		}
		return null;
	}

	protected newToolFileButtons(): DButton<string>[] {
		const result: DButton<string>[] = [];
		const button = this._options.button;
		if (button == null || button.open !== false) {
			result.push(this.toolFileButtonGraphicOpen);
		}
		return result;
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
		return new DButton<string>({
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
		this.dialogSelect.then((dialogSelect) => {
			dialogSelect.open(opener);
		});
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
		const margin = this._margin;
		const position = (p: number, s: number) => p - s - margin;
		return new DLayoutHorizontal({
			x: position,
			y: position,
			width: "auto",
			height: "auto",
			margin: 0,
			children: this.newViewButtons()
		});
	}

	protected newViewButtons(): DButton<string>[] {
		return [
			this.viewButtonZoomOut,
			this.viewButtonZoomIn,
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

	protected get dialogSelect(): Promise<DDialogSelect<DDiagramSerializedName, string>> {
		let result = this._dialogSelect;
		if (result == null) {
			result = this.newDialogSelect();
			this._dialogSelect = result;
		}
		return result;
	}

	protected newDialogSelect(): Promise<DDialogSelect<DDiagramSerializedName, string>> {
		return this._category.get().then((category) => {
			if (this._options.controller.toThumbnail != null) {
				const result = this.newDialogSelectImage();
				result.categories = category.items;
				return result;
			} else {
				const result = this.newDialogSelectNoImage();
				result.categories = category.items;
				return result;
			}
		});
	}

	protected newDialogSelectNoImage(): DDialogSelect<DDiagramSerializedName, string> {
		return new DDialogSelect<DDiagramSerializedName, string>({
			controller: this._options.controller.graphic,
			on: {
				select: (value: DDiagramSerializedName): void => {
					this.onDialogSelectSelect(value);
				}
			}
		});
	}

	protected newDialogSelectImage(): DDialogSelect<DDiagramSerializedName, string> {
		const controller = this._options.controller;
		return newDialogSelectWithThumbnails(
			controller.graphic,
			controller.toThumbnail,
			(value: DDiagramSerializedName): void => {
				this.onDialogSelectSelect(value);
			}
		);
	}

	protected onDialogSelectSelect(value: DDiagramSerializedName): void {
		this._options.controller.graphic.get(value.id).then((serialized): void => {
			this.diagram.set(DDiagrams.toSerialized(serialized));
		});
	}

	protected newDataMapper(): DDiagramDataMapper | undefined {
		return undefined;
	}

	protected toTheme(options?: FGraphicViewerOptions): FThemeGraphicViewer {
		const theme = options?.theme;
		if (theme) {
			if (isString(theme)) {
				return DThemes.getInstance().get(theme);
			}
			return theme;
		}
		return this.getThemeDefault();
	}

	protected getThemeDefault(): FThemeGraphicViewer {
		return DThemes.getInstance().get(this.getType());
	}

	protected getType(): string {
		return "FGraphicViewer";
	}
}
