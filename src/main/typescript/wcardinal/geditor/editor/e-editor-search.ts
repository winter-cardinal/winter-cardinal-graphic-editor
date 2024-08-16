import {
	DButton,
	DButtonPrimary,
	DControllers,
	DDiagramEditor,
	DDiagramLayer,
	DDialogMessage,
	DDialogOpener,
	DDialogProcessing,
	DIndicatorProcessing,
	DInputLabel,
	DInputSearch,
	DInputText,
	DLayoutHorizontal,
	DLayoutVertical,
	DLayoutVerticalOptions,
	DList,
	DListItem,
	DMenuItemTextOptions,
	DSelect,
	DText,
	DThemeLayoutVertical,
	EShape,
	EShapeConnectorLine,
	EShapeType,
	isArray
} from "@wcardinal/wcardinal-ui";
import { Texture } from "pixi.js";
import { ECommandShapeSelect } from "../command/e-command-shape-select";
import { EToolSelectSelectionStored } from "../tool/e-tool-select-selection";
import { EFinder } from "./e-finder";
import { toShapeLabel } from "./to-shape-label";
import { EEditorSearchConditionState } from "./e-editor-search-condition-state";
import { EShapeExtensions } from "../extension/e-shape-extensions";
import { EShapeExtension } from "../extension";
import { EEditorSearchConditionType } from "./e-editor-search-condition-type";
import { toShapeTypeLabel } from "./to-shape-type-label";

export interface EEditorSearchSelection {
	set(target: EShape): boolean;
	clear(): boolean;
	isEmpty(): boolean;
	focus(): boolean;
	store(): EToolSelectSelectionStored;
	restore(stored: EToolSelectSelectionStored): void;
}

export interface EEditorSearchOptions extends DLayoutVerticalOptions<EThemeEditorSearch> {
	selection: EEditorSearchSelection;
	icons: Record<string, Texture>;
	diagram: DDiagramEditor;
	finder?: EFinder;
	interval?: number;
}

export interface EThemeEditorSearch extends DThemeLayoutVertical {
	getLabel(): string | undefined;
	getInputIdLabel(): string | undefined;
	getSelectTypeLabel(): string | undefined;
	toTypeLabel(type: EEditorSearchConditionType): string;
	getSelectStateLabel(): string | undefined;
	toStateLabel(state: EEditorSearchConditionState): string;
	getButtonExecuteTitle(): string | undefined;
	getDialogErrorLabel(): string;
}

export interface EEditorSearchResult {
	word: string;
	shapes: EShape[];
}

export class EEditorSearch extends DLayoutVertical<EThemeEditorSearch, EEditorSearchOptions> {
	protected _selection: EEditorSearchSelection;
	protected _icons: Record<string, Texture>;
	protected _finder?: EFinder;
	protected _diagram: DDiagramEditor;

	protected _inputSearch?: DInputSearch;

	protected _inputId?: DInputText;
	protected _selectType?: DSelect<EEditorSearchConditionType | EShapeType>;
	protected _selectState?: DSelect<EEditorSearchConditionState>;
	protected _buttonExecute?: DButton<string>;
	protected _indicatorExecute?: DIndicatorProcessing<string>;

	protected _requested?: string;
	protected _searching?: string;
	protected _searched?: string;
	protected _searchedAt?: number;
	protected _timeoutId?: number | null;
	protected _interval: number;

	protected _list?: DList<EShape>;
	protected _dialogError?: DDialogMessage;
	protected _dialogProcessing?: DDialogProcessing;

	constructor(options: EEditorSearchOptions) {
		super(options);

		// Selection
		const selection = options.selection;
		this._selection = selection;

		// Icons
		this._icons = options.icons;

		// Finder
		this._finder = options.finder;

		// Interval
		this._interval = options.interval ?? 333;

		// Diagram
		const diagram = options.diagram;
		this._diagram = diagram;
		this.state.isDisabled = diagram.canvas == null;
		diagram.on("unset", (): void => {
			this.list.data.clear();
			this.state.isDisabled = true;
		});
		diagram.on("set", (): void => {
			this.state.isDisabled = false;
		});

		// Layout
		this.addChild(this.newTextLabel());
		if (this._finder != null) {
			this.addChild(this.inputSearch);
		} else {
			this.addChild(
				new DLayoutHorizontal({
					width: "padding",
					height: "auto",
					children: [
						new DInputLabel({
							width: 60,
							text: {
								value: this.theme.getInputIdLabel()
							}
						}),
						this.inputId
					]
				})
			);
			this.addChild(
				new DLayoutHorizontal({
					width: "padding",
					height: "auto",
					children: [
						new DInputLabel({
							width: 60,
							text: {
								value: this.theme.getSelectTypeLabel()
							}
						}),
						this.selectType
					]
				})
			);
			this.addChild(
				new DLayoutHorizontal({
					width: "padding",
					height: "auto",
					children: [
						new DInputLabel({
							width: 60,
							text: {
								value: this.theme.getSelectStateLabel()
							}
						}),
						this.selectState
					]
				})
			);
			this.addChild(this.buttonExecute);
		}
		this.addChild(this.list);
	}

	protected newTextLabel(): DText<string> {
		return new DText<string>({
			x: "padding",
			width: "padding",
			text: {
				value: this.theme.getLabel()
			}
		});
	}

	protected get inputSearch(): DInputSearch {
		return (this._inputSearch ??= this.newInputSearch());
	}

	protected newInputSearch(): DInputSearch {
		return new DInputSearch({
			x: "padding",
			width: "padding",
			on: {
				input: (newValue): void => {
					this.search(newValue);
				},

				enter: (emitter: DInputSearch): void => {
					this.search(emitter.value);
				}
			}
		});
	}

	get inputId(): DInputText {
		return (this._inputId ??= this.newInputId());
	}

	protected newInputId(): DInputText {
		return new DInputText({
			weight: 1,
			on: {
				enter: () => {
					this.buttonExecute.activate();
				}
			}
		});
	}

	get selectType(): DSelect<EEditorSearchConditionType | EShapeType> {
		return (this._selectType ??= this.newSelectType());
	}

	protected newSelectType(): DSelect<EEditorSearchConditionType | EShapeType> {
		return new DSelect<EEditorSearchConditionType | EShapeType>({
			weight: 1,
			value: EEditorSearchConditionType.NONE,
			menu: {
				width: "auto",
				column: 3,
				fit: false,
				items: this.newSelectTypeMenuItems()
			}
		});
	}

	protected newSelectTypeMenuItems(): DMenuItemTextOptions<
		EEditorSearchConditionType | EShapeType
	>[] {
		const result = [
			this.newSelectTypeMenuItem(
				EEditorSearchConditionType.NONE,
				this.theme.toTypeLabel(EEditorSearchConditionType.NONE)
			),
			this.newSelectTypeMenuItemShape(EShapeType.CIRCLE),
			this.newSelectTypeMenuItemShape(EShapeType.SEMICIRCLE),
			this.newSelectTypeMenuItemShape(EShapeType.RECTANGLE),
			this.newSelectTypeMenuItemShape(EShapeType.RECTANGLE_ROUNDED),
			this.newSelectTypeMenuItemShape(EShapeType.TRIANGLE),
			this.newSelectTypeMenuItemShape(EShapeType.TRIANGLE_ROUNDED),
			this.newSelectTypeMenuItemShape(EShapeType.LINE),
			this.newSelectTypeMenuItemShape(EShapeType.CONNECTOR_LINE),
			this.newSelectTypeMenuItemShape(EShapeType.CONNECTOR_ELBOW),
			this.newSelectTypeMenuItemShape(EShapeType.IMAGE),
			this.newSelectTypeMenuItemShape(EShapeType.GROUP),
			this.newSelectTypeMenuItemShape(EShapeType.BAR),
			this.newSelectTypeMenuItemShape(EShapeType.BUTTON),
			this.newSelectTypeMenuItemShape(EShapeType.EMBEDDED),
			this.newSelectTypeMenuItemShape(EShapeType.EMBEDDED_LAYER),
			this.newSelectTypeMenuItemShape(EShapeType.EMBEDDED_ACCEPTOR_EDGE)
		];
		EShapeExtensions.each((extension: EShapeExtension) => {
			if ("type" in extension) {
				result.push(this.newSelectTypeMenuItemShape(extension.type));
			}
		});
		return result;
	}

	protected newSelectTypeMenuItem(
		type: EEditorSearchConditionType | EShapeType,
		label: string
	): DMenuItemTextOptions<EEditorSearchConditionType | EShapeType> {
		return {
			width: 200,
			value: type,
			text: {
				value: label
			}
		};
	}

	protected newSelectTypeMenuItemShape(
		type: EShapeType
	): DMenuItemTextOptions<EEditorSearchConditionType | EShapeType> {
		return this.newSelectTypeMenuItem(type, toShapeTypeLabel(type));
	}

	protected getSelectTypeValue(): EShapeType | null {
		const selectType = this._selectType;
		if (selectType != null) {
			const value = selectType.value;
			if (value != null && 0 <= value) {
				return value as EShapeType;
			}
		}
		return null;
	}

	get selectState(): DSelect<EEditorSearchConditionState> {
		return (this._selectState ??= this.newSelectState());
	}

	protected newSelectState(): DSelect<EEditorSearchConditionState> {
		const theme = this.theme;
		return new DSelect<EEditorSearchConditionState>({
			weight: 1,
			value: EEditorSearchConditionState.NONE,
			menu: {
				items: [
					this.newSelectStateMenuItem(EEditorSearchConditionState.NONE, theme),
					this.newSelectStateMenuItem(EEditorSearchConditionState.CONNECTED_FULLY, theme),
					this.newSelectStateMenuItem(
						EEditorSearchConditionState.CONNECTED_PARTIALLY,
						theme
					),
					this.newSelectStateMenuItem(EEditorSearchConditionState.UNCONNECTED, theme)
				]
			}
		});
	}

	protected newSelectStateMenuItem(
		state: EEditorSearchConditionState,
		theme: EThemeEditorSearch
	): DMenuItemTextOptions<EEditorSearchConditionState> {
		return {
			value: state,
			text: {
				value: theme.toStateLabel(state)
			}
		};
	}

	protected getSelectStateValue(): EEditorSearchConditionState | null {
		const result = this.selectState.value;
		if (result != null && 0 <= result) {
			return result as EEditorSearchConditionState;
		}
		return null;
	}

	protected get buttonExecute(): DButton<string> {
		return (this._buttonExecute ??= this.newButtonExecute());
	}

	protected newButtonExecute(): DButton<string> {
		return new DButtonPrimary<string>({
			width: "padding",
			text: {
				value: this.theme.getButtonExecuteTitle()
			},
			image: {
				source: this._icons.editor_search
			},
			on: {
				active: (emitter): void => {
					this.onButtonExecuteActive(emitter);
				}
			}
		});
	}

	protected onButtonExecuteActive(opener?: DDialogOpener): void {
		const indicator = this.indicatorExecute;
		indicator.start();

		const shapes: EShape[] = [];
		const canvas = this._diagram.canvas;
		if (canvas != null) {
			const id = this.inputId.value.trim();
			const type = this.selectType.value ?? EEditorSearchConditionType.NONE;
			const state = this.selectState.value ?? EEditorSearchConditionState.NONE;
			canvas.shape.each((shape): boolean => {
				if (0 < id.length && shape.id.indexOf(id) < 0) {
					return true;
				}
				if (type !== EEditorSearchConditionType.NONE && type !== shape.type) {
					return true;
				}
				switch (state) {
					case EEditorSearchConditionState.CONNECTED_FULLY:
						if (shape instanceof EShapeConnectorLine) {
							const edge = shape.edge;
							const tail = edge.tail.acceptor.shape;
							const head = edge.head.acceptor.shape;
							if (tail == null || head == null) {
								return true;
							}
						} else {
							if (shape.connector.size() <= 0) {
								return true;
							}
						}
						break;
					case EEditorSearchConditionState.CONNECTED_PARTIALLY:
						if (shape instanceof EShapeConnectorLine) {
							const edge = shape.edge;
							const tail = edge.tail.acceptor.shape;
							const head = edge.head.acceptor.shape;
							if ((tail == null && head == null) || (tail != null && head != null)) {
								return true;
							}
						} else {
							return true;
						}
						break;
					case EEditorSearchConditionState.UNCONNECTED:
						if (shape instanceof EShapeConnectorLine) {
							const edge = shape.edge;
							const tail = edge.tail.acceptor.shape;
							const head = edge.head.acceptor.shape;
							if (tail != null || head != null) {
								return true;
							}
						} else {
							if (0 < shape.connector.size()) {
								return true;
							}
						}
						break;
				}
				shapes.push(shape);
				return true;
			});
		}
		this.list.data.clearAndAddAll(shapes);

		indicator.resolve();
	}

	protected get indicatorExecute(): DIndicatorProcessing<string> {
		return (this._indicatorExecute ??= this.newIndicatorExecute());
	}

	protected newIndicatorExecute(): DIndicatorProcessing<string> {
		return new DIndicatorProcessing<string>(this.buttonExecute);
	}

	protected search(word: string): void {
		const threshold = 500;
		const searching = this._searching;
		const searched = this._searched;
		const searchedAt = this._searchedAt;
		if (searching !== searched || (searchedAt != null && Date.now() - searchedAt < threshold)) {
			this._requested = word;
			if (this._timeoutId == null) {
				this._timeoutId = window.setTimeout(() => {
					this._timeoutId = null;
					const newWord = this._requested;
					if (newWord != null) {
						this._requested = undefined;
						this.search(newWord);
					}
				}, threshold);
			}
		} else {
			const timeoutId = this._timeoutId;
			if (timeoutId != null) {
				this._timeoutId = null;
				window.clearTimeout(timeoutId);
			}
			this._searching = word;
			this.doSearch(word).then((result) => {
				this.list.data.clearAndAddAll(result.shapes);
				this._searched = result.word;
				this._searchedAt = Date.now();
			});
		}
	}

	protected doSearch(word: string): Promise<EEditorSearchResult> {
		const finder = this._finder;
		if (finder == null) {
			return Promise.resolve({
				word,
				shapes: []
			});
		}
		const canvas = this._diagram.canvas;
		if (canvas == null) {
			return Promise.resolve({
				word,
				shapes: []
			});
		}
		const trimmed = word.trim();
		if (trimmed.length <= 0) {
			return Promise.resolve({
				word,
				shapes: []
			});
		}
		try {
			const found = finder(canvas, trimmed);
			if (isArray(found)) {
				return Promise.resolve({
					word,
					shapes: found
				});
			} else {
				return found.then(
					(shapes) => {
						return {
							word,
							shapes
						};
					},
					() => {
						return {
							word,
							shapes: []
						};
					}
				);
			}
		} catch {
			return Promise.resolve({
				word,
				shapes: []
			});
		}
	}

	get list(): DList<EShape> {
		return (this._list ??= this.newList());
	}

	protected newList(): DList<EShape> {
		return new DList<EShape>({
			width: "padding",
			weight: 1,
			data: {
				toLabel: (value: EShape) => {
					return toShapeLabel(value);
				},
				toTitle: (value: EShape) => {
					return undefined;
				},
				toImage: (value: EShape) => {
					return null;
				}
			},
			updater: {
				newItem: (data) => {
					return new DListItem<EShape>(data, {
						on: {
							select: (value, item): void => {
								this.onListItemDown(value, item);
							}
						}
					});
				}
			}
		});
	}

	protected onListItemDown(value: EShape, item: DListItem<EShape>): void {
		const shape = value;
		if (shape != null) {
			const canvas = this._diagram.canvas;
			const layer = shape.root.parent as DDiagramLayer | null;
			if (canvas != null && layer != null) {
				// Selection
				const selection = this._selection;
				const before = selection.store();
				if (selection.set(shape)) {
					selection.focus();
					const after = selection.store();
					DControllers.getCommandController().push(
						new ECommandShapeSelect(before, after, selection)
					);
				} else {
					selection.focus();
				}

				// Change the active layer
				const layerActive = canvas.layer.active;
				if (layerActive !== layer) {
					canvas.layer.active = layer;
				}
			} else {
				this.dialogError.open(item);
			}
		}
	}

	protected get dialogError(): DDialogMessage {
		return (this._dialogError ??= this.newDialogError());
	}

	protected newDialogError(): DDialogMessage {
		return new DDialogMessage({
			message: this.theme.getDialogErrorLabel()
		});
	}

	protected get dialogProcessing(): DDialogProcessing {
		return (this._dialogProcessing ??= this.newDialogProcessing());
	}

	protected newDialogProcessing(): DDialogProcessing {
		return new DDialogProcessing();
	}

	protected override getType(): string {
		return "EEditorSearch";
	}
}
