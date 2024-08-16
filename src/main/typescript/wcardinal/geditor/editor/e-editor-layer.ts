import {
	DButton,
	DButtonAmbient,
	DControllers,
	DDiagramCanvasEditor,
	DDiagramEditor,
	DDiagramLayer,
	DDialogInputText,
	DDialogOpener,
	DLayoutHorizontal,
	DLayoutVertical,
	DLayoutVerticalOptions,
	DList,
	DListItem,
	DText,
	DThemeLayoutVertical,
	UtilKeyboardEvent
} from "@wcardinal/wcardinal-ui";
import { Point, Texture } from "pixi.js";
import { ECommandLayerBringForward } from "../command/e-command-layer-bring-forward";
import { ECommandLayerCreate } from "../command/e-command-layer-create";
import { ECommandLayerDelete } from "../command/e-command-layer-delete";
import { ECommandLayerChange } from "../command/e-command-layer-change";
import { ECommandLayerSendBackward } from "../command/e-command-layer-send-backward";
import { ECommandShapeSelect } from "../command/e-command-shape-select";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";
import { EDialogLayer } from "./e-dialog-layer";
import { EDialogLayerValue } from "./e-dialog-layer-value";
import { EEditorLayerItem } from "./e-editor-layer-item";

export interface EEditorLayerOptions extends DLayoutVerticalOptions<EThemeEditorLayer> {
	selection: EToolSelectSelection;
	diagram: DDiagramEditor;
	icons: Record<string, Texture>;
}

export interface EThemeEditorLayer extends DThemeLayoutVertical {
	getLabel(): string | undefined;
	getButtonNewTitle(): string | undefined;
	getButtonDeleteTitle(): string | undefined;
	getButtonBringForwardTitle(): string | undefined;
	getButtonSendBackwardTitle(): string | undefined;
}

export class EEditorLayer extends DLayoutVertical<EThemeEditorLayer, EEditorLayerOptions> {
	protected _icons: Record<string, Texture>;
	protected _diagram: DDiagramEditor;
	protected _selection: EToolSelectSelection;
	protected _isInitialized: boolean;

	protected _dialog?: EDialogLayer;
	protected _dialogRename?: DDialogInputText;
	protected _buttonNew?: DButton<string>;
	protected _buttonDelete?: DButton<string>;
	protected _buttonBringForward?: DButton<string>;
	protected _buttonSendBackward?: DButton<string>;
	protected _list?: DList<DDiagramLayer>;
	protected _onLayerChangeBound?: () => void;
	protected _canvas: DDiagramCanvasEditor | null;

	constructor(options: EEditorLayerOptions) {
		super(options);

		this._icons = options.icons;
		this._diagram = options.diagram;
		this._selection = options.selection;
		this._isInitialized = false;
		this._canvas = null;
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
		this.onCanvasChange(this._diagram.canvas, true);
	}

	protected initLayout(): void {
		this.addChild(
			new DLayoutHorizontal({
				x: "padding",
				width: "padding",
				height: "auto",
				children: [
					this.newTextLabel(),
					this.buttonNew,
					this.buttonDelete,
					this.buttonBringForward,
					this.buttonSendBackward
				]
			})
		);
		this.addChild(this.list);

		// Layer change even handling
		const diagram = this._diagram;
		diagram.on("set", (newCanvas: DDiagramCanvasEditor): void => {
			if (this.isShown()) {
				this.onCanvasChange(newCanvas, false);
			}
		});
		diagram.on("ready", (): void => {
			if (this.isShown()) {
				this.onLayerChange();
			}
		});
		diagram.on("unset", (): void => {
			if (this.isShown()) {
				this.onCanvasChange(null, false);
			}
		});
	}

	protected newTextLabel(): DText<string> {
		return new DText<string>({
			weight: 1,
			text: {
				value: this.theme.getLabel()
			}
		});
	}

	protected get onLayerChangeBound(): () => void {
		let result = this._onLayerChangeBound;
		if (result == null) {
			result = () => {
				this.onLayerChange();
			};
			this._onLayerChangeBound = result;
		}
		return result;
	}

	protected get dialog(): EDialogLayer {
		let result = this._dialog;
		if (result == null) {
			result = this.newDialog();
			this._dialog = result;
		}
		return result;
	}

	protected newDialog(): EDialogLayer {
		return new EDialogLayer();
	}

	protected get buttonNew(): DButton<string> {
		let result = this._buttonNew;
		if (result == null) {
			result = this.newButtonNew();
			this._buttonNew = result;
		}
		return result;
	}

	protected newButtonNew(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.new
			},
			title: this.theme.getButtonNewTitle(),
			on: {
				active: (emitter): void => {
					this.onButtonNewActive(emitter);
				}
			}
		});
	}

	protected onButtonNewActive(opener?: DDialogOpener): void {
		const canvas = this._canvas;
		if (canvas) {
			const dialogLayer = this.dialog;
			dialogLayer
				.reset(canvas.width, canvas.height)
				.open(opener)
				.then((value): void => {
					if (value) {
						DControllers.getCommandController().push(
							new ECommandLayerCreate(value, canvas.layer, this._selection)
						);
					}
				});
		}
	}

	protected get buttonDelete(): DButton<string> {
		let result = this._buttonDelete;
		if (result == null) {
			result = this.newButtonDelete();
			this._buttonDelete = result;
		}
		return result;
	}

	protected newButtonDelete(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.delete
			},
			title: this.theme.getButtonDeleteTitle(),
			on: {
				active: (): void => {
					const canvas = this._canvas;
					if (canvas) {
						const layer = canvas.layer;
						const size = layer.size();
						const active = layer.active;
						if (1 < size && active) {
							DControllers.getCommandController().push(
								new ECommandLayerDelete(active, canvas.layer, this._selection)
							);
						}
					}
				}
			}
		});
	}

	protected get buttonBringForward(): DButton<string> {
		let result = this._buttonBringForward;
		if (result == null) {
			result = this.newButtonBringForward();
			this._buttonBringForward = result;
		}
		return result;
	}

	protected newButtonBringForward(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.arrow_up
			},
			title: this.theme.getButtonBringForwardTitle(),
			on: {
				active: (): void => {
					const canvas = this._canvas;
					if (canvas) {
						const layer = canvas.layer;
						const active = layer.active;
						if (active) {
							const index = layer.children.indexOf(active);
							DControllers.getCommandController().push(
								new ECommandLayerBringForward(index, layer)
							);
						}
					}
				}
			}
		});
	}

	protected get buttonSendBackward(): DButton<string> {
		let result = this._buttonSendBackward;
		if (result == null) {
			result = this.newButtonSendBackward();
			this._buttonSendBackward = result;
		}
		return result;
	}

	protected newButtonSendBackward(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.arrow_down
			},
			title: this.theme.getButtonSendBackwardTitle(),
			on: {
				active: (): void => {
					const canvas = this._canvas;
					if (canvas) {
						const layer = canvas.layer;
						const active = layer.active;
						if (active) {
							const index = layer.children.indexOf(active);
							DControllers.getCommandController().push(
								new ECommandLayerSendBackward(index, layer)
							);
						}
					}
				}
			}
		});
	}

	protected get list(): DList<DDiagramLayer> {
		let result = this._list;
		if (result == null) {
			result = this.newList();
			this._list = result;
		}
		return result;
	}

	protected newList(): DList<DDiagramLayer> {
		const icons = this._icons;
		const iconsEye = icons.eye;
		const iconsEyeSlash = icons.eye_slash;
		const work = new Point();
		const result = new DList<DDiagramLayer>({
			x: "padding",
			width: "padding",
			weight: 1,
			data: {
				selection: {
					on: {
						change: (): void => {
							this.onListSelectionChange();
						}
					}
				},
				toImage: (layer) => {
					return layer.visible ? iconsEye : iconsEyeSlash;
				}
			},
			updater: {
				newItem: (data) => {
					return new EEditorLayerItem(iconsEye, iconsEyeSlash, work, data, {
						on: {
							eyeclick: (
								e: unknown,
								value: DDiagramLayer,
								item: DListItem<DDiagramLayer>
							): void => {
								if (value) {
									if (value.visible) {
										value.visible = false;
										item.image = iconsEyeSlash;
									} else {
										value.visible = true;
										item.image = iconsEye;
									}
								}
							},
							dblclick: (e, _, item): void => {
								this.onListDblClick(e, _, item, result);
							}
						}
					});
				}
			},
			on: {
				keydown: (e: KeyboardEvent): void => {
					if (UtilKeyboardEvent.isDeleteKey(e)) {
						const canvas = this._canvas;
						if (canvas) {
							const layer = canvas.layer;
							const size = layer.size();
							const active = layer.active;
							if (1 < size && active) {
								DControllers.getCommandController().push(
									new ECommandLayerDelete(active, layer, this._selection)
								);
							}
						}
					}
				}
			}
		});
		return result;
	}

	protected onListDblClick(
		e: MouseEvent | TouchEvent,
		_: unknown,
		item: DListItem<DDiagramLayer>,
		list: DList<DDiagramLayer>
	): void {
		const canvas = this._canvas;
		if (canvas) {
			const layerActive = canvas.layer.active;
			if (layerActive) {
				const oldValue = EDialogLayerValue.from(layerActive);
				const dialogLayer = this.dialog;
				dialogLayer.value = oldValue;
				dialogLayer.open(item).then((newValue): void => {
					if (newValue && !newValue.isEqual(oldValue)) {
						DControllers.getCommandController().push(
							new ECommandLayerChange(layerActive, newValue, canvas.layer)
						);
					}
				});
			}
		}
	}

	protected onListLayerChange(): void {
		const listLayer = this.list;

		const canvas = this._canvas;
		if (canvas) {
			const layerContainer = canvas.layer;
			const layers = layerContainer.children;
			const layerActive = layerContainer.active;

			const items = listLayer.data.items;
			for (let i = 0, imax = layers.length; i < imax; ++i) {
				items[i] = layers[imax - 1 - i];
			}
			items.length = layers.length;
			listLayer.update(true);

			if (layerActive != null) {
				listLayer.data.selection.clearAndAdd(layerActive);
			} else {
				listLayer.data.selection.clear();
			}
		} else {
			listLayer.data.items = [];
		}
	}

	protected onListSelectionChange(): void {
		const first = this.list.data.selection.first;
		if (first) {
			const canvas = this._canvas;
			if (canvas) {
				const layerActive = canvas.layer.active;
				if (layerActive !== first) {
					// Unselect
					const selection = this._selection;
					if (!selection.isEmpty()) {
						const before = selection.store();
						if (selection.clear()) {
							const after = selection.store();
							DControllers.getCommandController().push(
								new ECommandShapeSelect(before, after, selection)
							);
						}
					}

					// Change the active layer
					canvas.layer.active = first;
				}
			}
		}
	}

	protected onCanvasChange(newCanvas: DDiagramCanvasEditor | null, forcibly: boolean): void {
		const oldCanvas = this._canvas;
		if (newCanvas !== this._canvas) {
			const onLayerChangeBound = this.onLayerChangeBound;

			if (oldCanvas != null) {
				oldCanvas.layer.off("change", onLayerChangeBound);
			}

			this._canvas = newCanvas;
			if (newCanvas != null) {
				this.state.isDisabled = false;
				newCanvas.layer.on("change", onLayerChangeBound);
			} else {
				this.state.isDisabled = true;
			}

			this.onLayerChange();
		} else if (forcibly) {
			this.onLayerChange();
		}
	}

	protected isActiveDeletable(canvas: DDiagramCanvasEditor | null): boolean {
		if (canvas) {
			return 1 < canvas.layer.size();
		}
		return false;
	}

	protected isActiveNotLast(canvas: DDiagramCanvasEditor | null): boolean {
		if (canvas) {
			const layer = canvas.layer;
			const layers = layer.children;
			const active = layer.active;
			if (active) {
				return active !== layers[layers.length - 1];
			}
		}
		return false;
	}

	protected isActiveNotFirst(canvas: DDiagramCanvasEditor | null): boolean {
		if (canvas) {
			const layer = canvas.layer;
			const layers = layer.children;
			const active = layer.active;
			if (active) {
				return active !== layers[0];
			}
		}
		return false;
	}

	protected onLayerChange(): void {
		// Update buttons
		const canvas = this._canvas;
		this.state.isEnabled = canvas != null;
		this.buttonDelete.state.isEnabled = this.isActiveDeletable(canvas);
		this.buttonSendBackward.state.isEnabled = this.isActiveNotFirst(canvas);
		this.buttonBringForward.state.isEnabled = this.isActiveNotLast(canvas);

		// Update the list
		this.onListLayerChange();

		// Update the modifier
		this._selection.updateModifier();
	}

	protected override getType(): string {
		return "EEditorLayer";
	}
}
