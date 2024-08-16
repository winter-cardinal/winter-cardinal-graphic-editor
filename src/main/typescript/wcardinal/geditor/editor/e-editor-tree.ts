import {
	DButton,
	DButtonAmbient,
	DControllers,
	DDiagramCanvasEditor,
	DDiagramEditor,
	DLayoutHorizontal,
	DLayoutVertical,
	DLayoutVerticalOptions,
	DTable,
	DTableDataTree,
	DTableDataTreeSelection,
	DTableDataTreeSelectionParent,
	DText,
	DThemeLayoutVertical,
	EShape,
	EShapeCapabilities,
	EShapeCapability,
	UtilKeyboardEvent
} from "@wcardinal/wcardinal-ui";
import { Texture } from "pixi.js";
import { ECommandShapePropertyId } from "../command/e-command-shape-property-id";
import { EEditorTreeSelection } from "./e-editor-tree-selection";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";
import { EToolSelectSelectionUpdatedPart } from "../tool/e-tool-select-selection-updated-part";
import { toShapeLabel } from "./to-shape-label";

export interface EEditorTreeOptions extends DLayoutVerticalOptions<EThemeEditorTree> {
	selection: EToolSelectSelection;
	diagram: DDiagramEditor;
	icons: Record<string, Texture>;
}

export interface EThemeEditorTree extends DThemeLayoutVertical {
	getLabel(): string | undefined;
	getButtonBringToFrontTitle(): string | undefined;
	getButtonBringToFrontShortcut(): string | undefined;
	getButtonBringForwardTitle(): string | undefined;
	getButtonBringForwardShortcut(): string | undefined;
	getButtonSendBackwardTitle(): string | undefined;
	getButtonSendBackwardShortcut(): string | undefined;
	getButtonSendToBackTitle(): string | undefined;
	getButtonSendToBackShortcut(): string | undefined;
}

export class EEditorTree extends DLayoutVertical<EThemeEditorTree, EEditorTreeOptions> {
	protected _icons: Record<string, Texture>;
	protected _diagram: DDiagramEditor;
	protected _selection: EToolSelectSelection;
	protected _isInitialized: boolean;

	protected _table?: DTable<EShape, DTableDataTree<EShape>>;
	protected _layerOrder?: DLayoutHorizontal;
	protected _buttonBringToFront?: DButton<string>;
	protected _buttonBringForward?: DButton<string>;
	protected _buttonSendBackward?: DButton<string>;
	protected _buttonSendToBack?: DButton<string>;

	protected _updatedParts: EToolSelectSelectionUpdatedPart;

	constructor(options: EEditorTreeOptions) {
		super(options);

		this._icons = options.icons;
		const diagram = options.diagram;
		this._diagram = diagram;
		this._selection = options.selection;
		this._isInitialized = false;
		this._updatedParts = EToolSelectSelectionUpdatedPart.NONE;
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

		this.onSelectionChange(EToolSelectSelectionUpdatedPart.NONE);
	}

	protected initLayout(): void {
		this.addChild(this.layoutOrder);
		this.addChild(this.table);

		// Selection change event handling
		this._selection.on("change", (parts: EToolSelectSelectionUpdatedPart): void => {
			this.onSelectionChange(parts);
		});

		// Layer change even handling
		const onLayerChangeBound = (): void => {
			this.onLayerChange();
		};
		const diagram = this._diagram;
		const canvas = diagram.canvas;
		if (canvas) {
			this.state.isDisabled = false;
			canvas.layer.on("change", onLayerChangeBound);
		} else {
			this.state.isDisabled = true;
		}
		diagram.on("set", (newCanvas: DDiagramCanvasEditor): void => {
			this.state.isDisabled = false;
			newCanvas.layer.on("change", onLayerChangeBound);
		});
		diagram.on("ready", (): void => {
			this.onLayerChange();
		});
		diagram.on("unset", (oldCanvas: DDiagramCanvasEditor): void => {
			this.state.isDisabled = true;
			this.onLayerChange();
			oldCanvas.layer.off("change", onLayerChangeBound);
		});
		this.onLayerChange();
	}

	protected get layoutOrder(): DLayoutHorizontal {
		return (this._layerOrder ??= this.newLayoutOrder());
	}

	protected newLayoutOrder(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "padding",
			height: "auto",
			children: [
				this.newTextLabel(),
				this.buttonBringToFront,
				this.buttonBringForward,
				this.buttonSendBackward,
				this.buttonSendToBack
			]
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

	protected get buttonBringToFront(): DButton<string> {
		return (this._buttonBringToFront ??= this.newButtonBringToFront());
	}

	protected newButtonBringToFront(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.arrow_to_top
			},
			title: this.theme.getButtonBringToFrontTitle(),
			on: {
				active: (): void => {
					this._selection.bringToFront();
				}
			}
		});
	}

	protected get buttonBringForward(): DButton<string> {
		return (this._buttonBringForward ??= this.newButtonBringForward());
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
					this._selection.bringForward();
				}
			}
		});
	}

	protected get buttonSendBackward(): DButton<string> {
		return (this._buttonSendBackward ??= this.newButtonSendBackward());
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
					this._selection.sendBackward();
				}
			}
		});
	}

	protected get buttonSendToBack(): DButton<string> {
		return (this._buttonSendToBack ??= this.newButtonSendToBack());
	}

	protected newButtonSendToBack(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.arrow_to_bottom
			},
			title: this.theme.getButtonSendToBackTitle(),
			on: {
				active: (): void => {
					this._selection.sendToBack();
				}
			}
		});
	}

	protected onSelectionChange(parts: EToolSelectSelectionUpdatedPart): void {
		if (this.isShown()) {
			parts |= this._updatedParts;
			this._updatedParts = EToolSelectSelectionUpdatedPart.NONE;
			if (parts & EToolSelectSelectionUpdatedPart.TREE) {
				this.table.data.nodes = this._diagram.layer?.children;
			} else if (parts & EToolSelectSelectionUpdatedPart.SELECTION) {
				this.table.data.update();
			} else if (parts & EToolSelectSelectionUpdatedPart.PROPERTY_ID) {
				this.table.data.update(true);
			}
			this.layoutOrder.state.isEnabled = EShapeCapabilities.contains(
				this._selection.last(),
				EShapeCapability.ORDER_IN_LAYER
			);
		} else {
			this._updatedParts |= parts;
		}
	}

	protected onLayerChange(): void {
		this.table.data.nodes = this._diagram.layer?.children;
	}

	protected get table(): DTable<EShape, DTableDataTree<EShape>> {
		return (this._table ??= this.newTable());
	}

	protected newTable(): DTable<EShape, DTableDataTree<EShape>> {
		return new DTable<EShape, DTableDataTree<EShape>>({
			x: "padding",
			width: "padding",
			weight: 1,
			columns: [
				{
					type: "TREE",
					editable: true,
					getter: (row: EShape): string => {
						return toShapeLabel(row);
					},
					setter: (row: EShape, columnIndex: number, cell: string): void => {
						if (row.id !== cell) {
							DControllers.getCommandController().push(
								new ECommandShapePropertyId(this._selection, cell, [row])
							);
						}
					}
				}
			],
			data: new DTableDataTree<EShape>({
				reverse: true,
				toChildren: (shape: EShape): EShape[] | null | undefined => {
					if (EShapeCapabilities.contains(shape, EShapeCapability.CHILDREN)) {
						return shape.children;
					}
					return null;
				},
				selection: (
					parent: DTableDataTreeSelectionParent<EShape>
				): DTableDataTreeSelection<EShape> => {
					return new EEditorTreeSelection(parent, this._selection);
				}
			}),
			on: {
				keydown: (e: KeyboardEvent): void => {
					if (UtilKeyboardEvent.isDeleteKey(e)) {
						this._selection.delete();
						e.preventDefault();
					}
				}
			}
		});
	}

	protected override getType(): string {
		return "EEditorTree";
	}
}
