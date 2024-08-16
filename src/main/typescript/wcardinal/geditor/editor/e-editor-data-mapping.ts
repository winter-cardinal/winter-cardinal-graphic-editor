import {
	DBaseState,
	DButton,
	DButtonAmbient,
	DDialogOpener,
	DLayoutHorizontal,
	DLayoutVertical,
	DLayoutVerticalOptions,
	DList,
	DListItem,
	DText,
	DThemeLayoutVertical,
	EShape,
	EShapeCapabilities,
	EShapeCapability,
	EShapeDataMappingValue
} from "@wcardinal/wcardinal-ui";
import { Texture } from "pixi.js";
import { EDialogDataMappingValue } from "./e-dialog-data-mapping-value";

export interface EEditorDataMappingSelection {
	isEmpty(): boolean;
	last(): EShape | null;
	addDataMappingValue(value: EShapeDataMappingValue): void;
	replaceDataMappingValue(
		oldValue: EShapeDataMappingValue,
		newValue: EShapeDataMappingValue,
		list: DList<EShapeDataMappingValue>
	): void;
	removeDataMappingValue(value: EShapeDataMappingValue): void;
	bringDataMappingValueForward(value: EShapeDataMappingValue): void;
	sendDataMappingValueBackward(value: EShapeDataMappingValue): void;
	on(name: "change", handler: () => void): void;
}

export interface EEditorDataMappingOptions extends DLayoutVerticalOptions<EThemeEditorDataMapping> {
	selection: EEditorDataMappingSelection;
	icons: Record<string, Texture>;
}

export interface EThemeEditorDataMapping extends DThemeLayoutVertical {
	getLabel(): string | undefined;
	getButtonNewTitle(): string | undefined;
	getButtonDeleteTitle(): string | undefined;
	getButtonBringForwardTitle(): string | undefined;
	getButtonSendBackwardTitle(): string | undefined;
}

export class EEditorDataMapping extends DLayoutVertical<
	EThemeEditorDataMapping,
	EEditorDataMappingOptions
> {
	protected _selection: EEditorDataMappingSelection;
	protected _icons: Record<string, Texture>;

	protected _buttonNew?: DButton<string>;
	protected _buttonDelete?: DButton<string>;
	protected _buttonBringForward?: DButton<string>;
	protected _buttonSendBackward?: DButton<string>;

	protected _dialogDataMappingValue?: EDialogDataMappingValue;
	protected _listDataMappingValue?: DList<EShapeDataMappingValue>;
	protected _lastShape?: EShape | null;
	protected _lastShapeDataMappingValue?: EShapeDataMappingValue | null;

	constructor(options: EEditorDataMappingOptions) {
		super(options);

		// Selection
		const selection = options.selection;
		this._selection = selection;

		// Icons
		this._icons = options.icons;

		// Layout
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
		this.addChild(this.listDataMappingValue);

		// Initialize
		selection.on("change", (): void => {
			this.onSelectionChange(selection);
		});
		const listDataMappingValue = this.listDataMappingValue;
		listDataMappingValue.selection.on("change", (): void => {
			this.onListDataMappingValueSelectionChange(listDataMappingValue);
		});
		this.onSelectionChange(selection);
	}

	protected newTextLabel(): DText<string> {
		return new DText<string>({
			weight: 1,
			text: {
				value: this.theme.getLabel()
			}
		});
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
		this.dialogDataMappingValue
			.set(null, this._selection.last())
			.open(opener)
			.then((value): void => {
				if (value != null) {
					this._selection.addDataMappingValue(value);
				}
			});
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
			state: DBaseState.DISABLED,
			on: {
				active: (): void => {
					const first = this.listDataMappingValue.selection.first;
					if (first != null) {
						this._selection.removeDataMappingValue(first);
					}
				}
			}
		});
	}

	protected onListDataMappingValueSelectionChangeButtonDelete(
		listDataMappingValue: DList<EShapeDataMappingValue>
	): void {
		this.buttonDelete.state.isDisabled = listDataMappingValue.data.selection.isEmpty();
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
			state: DBaseState.DISABLED,
			on: {
				active: (): void => {
					const listDataMappingValue = this.listDataMappingValue;
					const first = listDataMappingValue.data.selection.first;
					const items = listDataMappingValue.data.items;
					if (first != null && items[0] !== first) {
						this._selection.bringDataMappingValueForward(first);
					}
				}
			}
		});
	}

	protected onListDataMappingValueSelectionChangeButtonBringForward(
		listDataMappingValue: DList<EShapeDataMappingValue>
	): void {
		const first = listDataMappingValue.data.selection.first;
		const items = listDataMappingValue.data.items;
		this.buttonBringForward.state.isDisabled = first == null || items[0] === first;
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
			state: DBaseState.DISABLED,
			on: {
				active: (): void => {
					const listDataMappingValue = this.listDataMappingValue;
					const first = listDataMappingValue.data.selection.first;
					const items = listDataMappingValue.data.items;
					if (first != null && items[items.length - 1] !== first) {
						this._selection.sendDataMappingValueBackward(first);
					}
				}
			}
		});
	}

	protected onListDataMappingValueSelectionChangeButtonSendBackward(
		listDataMappingValue: DList<EShapeDataMappingValue>
	): void {
		const first = listDataMappingValue.data.selection.first;
		const items = listDataMappingValue.data.items;
		this.buttonSendBackward.state.isDisabled =
			first == null || items[items.length - 1] === first;
	}

	protected get dialogDataMappingValue(): EDialogDataMappingValue {
		let result = this._dialogDataMappingValue;
		if (result == null) {
			result = this.newDialogDataMappingValue();
			this._dialogDataMappingValue = result;
		}
		return result;
	}

	protected newDialogDataMappingValue(): EDialogDataMappingValue {
		return new EDialogDataMappingValue();
	}

	protected get listDataMappingValue(): DList<EShapeDataMappingValue> {
		let result = this._listDataMappingValue;
		if (result == null) {
			result = this.newListDataMappingValue();
			this._listDataMappingValue = result;
		}
		return result;
	}

	protected newListDataMappingValue(): DList<EShapeDataMappingValue> {
		const result = new DList<EShapeDataMappingValue>({
			width: "padding",
			weight: 1,
			data: {
				toLabel: (value: EShapeDataMappingValue): string => {
					const source = value[0];
					const destination = value[1];
					const initial = value[2];
					if (0 < destination.length) {
						if (0 < initial.length) {
							return `${source} -> ${destination}, ${initial}`;
						} else {
							return `${source} -> ${destination}`;
						}
					} else {
						if (0 < initial.length) {
							return `${source} -> ${initial}`;
						} else {
							return `${source}`;
						}
					}
				}
			},
			updater: {
				newItem: (data): DListItem<EShapeDataMappingValue> => {
					return new DListItem<EShapeDataMappingValue>(data, {
						on: {
							dblclick: (e, _, item): void => {
								this.onListDataMappingValueDblClick(e, _, item, result);
							}
						}
					});
				}
			}
		});
		return result;
	}

	protected onListDataMappingValueDblClick(
		e: MouseEvent | TouchEvent,
		_: unknown,
		item: DListItem<EShapeDataMappingValue>,
		list: DList<EShapeDataMappingValue>
	): void {
		const oldValue = item.value;
		if (oldValue != null) {
			this.dialogDataMappingValue
				.set(oldValue, this._selection.last())
				.open(item)
				.then((newValue): void => {
					if (newValue != null) {
						this._selection.replaceDataMappingValue(oldValue, newValue, list);
					}
				});
		}
	}

	protected onSelectionChangeListDataMappingValue(selection: EEditorDataMappingSelection): void {
		const listDataMappingValue = this.listDataMappingValue;
		listDataMappingValue.data.items = selection.last()?.data.getMapping()?.values || [];
		this.onListDataMappingValueSelectionChange(listDataMappingValue);
	}

	protected onSelectionChange(selection: EEditorDataMappingSelection): void {
		this.state.isDisabled = !EShapeCapabilities.contains(
			selection.last(),
			EShapeCapability.DATA_MAPPING
		);
		this.onSelectionChangeListDataMappingValue(selection);
	}

	protected onListDataMappingValueSelectionChange(
		listDataMappingValue: DList<EShapeDataMappingValue>
	): void {
		this.onListDataMappingValueSelectionChangeButtonDelete(listDataMappingValue);
		this.onListDataMappingValueSelectionChangeButtonBringForward(listDataMappingValue);
		this.onListDataMappingValueSelectionChangeButtonSendBackward(listDataMappingValue);
	}

	protected override getType(): string {
		return "EEditorDataMapping";
	}
}
