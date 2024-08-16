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
	EShapeDataValue,
	EShapeDataValueExtensions,
	EShapeDataValueType
} from "@wcardinal/wcardinal-ui";
import { Texture } from "pixi.js";
import { EDialogDataValue } from "./e-dialog-data-value";

export interface EEditorDataSelection {
	isEmpty(): boolean;
	last(): EShape | null;
	addDataValue(value: EShapeDataValue): void;
	replaceDataValue(
		oldValue: EShapeDataValue,
		newValue: EShapeDataValue,
		list: DList<EShapeDataValue>
	): void;
	removeDataValue(value: EShapeDataValue): void;
	bringDataValueForward(value: EShapeDataValue): void;
	sendDataValueBackward(value: EShapeDataValue): void;
	on(name: "change", handler: () => void): void;
}

export interface EEditorDataOptions extends DLayoutVerticalOptions<EThemeEditorData> {
	selection: EEditorDataSelection;
	icons: Record<string, Texture>;
}

export interface EThemeEditorData extends DThemeLayoutVertical {
	getLabel(): string | undefined;
	getButtonNewTitle(): string | undefined;
	getButtonDeleteTitle(): string | undefined;
	getButtonBringForwardTitle(): string | undefined;
	getButtonSendBackwardTitle(): string | undefined;
}

export class EEditorData extends DLayoutVertical<EThemeEditorData, EEditorDataOptions> {
	protected _selection: EEditorDataSelection;
	protected _icons: Record<string, Texture>;

	protected _buttonNew?: DButton<string>;
	protected _buttonDelete?: DButton<string>;
	protected _buttonBringForward?: DButton<string>;
	protected _buttonSendBackward?: DButton<string>;

	protected _dialogDataValue?: EDialogDataValue;
	protected _listDataValue?: DList<EShapeDataValue>;
	protected _lastShape?: EShape | null;
	protected _lastShapeDataValue?: EShapeDataValue | null;

	constructor(options: EEditorDataOptions) {
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
		this.addChild(this.listDataValue);

		// Initialize
		selection.on("change", (): void => {
			this.onSelectionChange(selection);
		});
		const listDataValue = this.listDataValue;
		listDataValue.selection.on("change", (): void => {
			this.onListDataValueSelectionChange(listDataValue);
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
		this.dialogDataValue
			.reset()
			.open(opener)
			.then((value): void => {
				if (value != null) {
					this._selection.addDataValue(value);
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
					const first = this.listDataValue.selection.first;
					if (first != null) {
						this._selection.removeDataValue(first);
					}
				}
			}
		});
	}

	protected onListDataValueSelectionChangeButtonDelete(
		listDataValue: DList<EShapeDataValue>
	): void {
		this.buttonDelete.state.isDisabled = listDataValue.data.selection.isEmpty();
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
					const listDataValue = this.listDataValue;
					const first = listDataValue.data.selection.first;
					const items = listDataValue.data.items;
					if (first != null && items[0] !== first) {
						this._selection.bringDataValueForward(first);
					}
				}
			}
		});
	}

	protected onListDataValueSelectionChangeButtonBringForward(
		listDataValue: DList<EShapeDataValue>
	): void {
		const first = listDataValue.data.selection.first;
		const items = listDataValue.data.items;
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
					const listDataValue = this.listDataValue;
					const first = listDataValue.data.selection.first;
					const items = listDataValue.data.items;
					if (first != null && items[items.length - 1] !== first) {
						this._selection.sendDataValueBackward(first);
					}
				}
			}
		});
	}

	protected onListDataValueSelectionChangeButtonSendBackward(
		listDataValue: DList<EShapeDataValue>
	): void {
		const first = listDataValue.data.selection.first;
		const items = listDataValue.data.items;
		this.buttonSendBackward.state.isDisabled =
			first == null || items[items.length - 1] === first;
	}

	protected get dialogDataValue(): EDialogDataValue {
		let result = this._dialogDataValue;
		if (result == null) {
			result = this.newDialogDataValue();
			this._dialogDataValue = result;
		}
		return result;
	}

	protected newDialogDataValue(): EDialogDataValue {
		return new EDialogDataValue();
	}

	protected get listDataValue(): DList<EShapeDataValue> {
		let result = this._listDataValue;
		if (result == null) {
			result = this.newListDataValue();
			this._listDataValue = result;
		}
		return result;
	}

	protected newListDataValue(): DList<EShapeDataValue> {
		const result = new DList<EShapeDataValue>({
			width: "padding",
			weight: 1,
			data: {
				toLabel: (value: EShapeDataValue): string => {
					const type = value.type;
					const as = value.as;
					const prefix = 0 < as.length ? `${as}: ` : "";
					switch (type) {
						case EShapeDataValueType.BOOLEAN:
						case EShapeDataValueType.BOOLEAN_ARRAY:
						case EShapeDataValueType.NUMBER:
						case EShapeDataValueType.NUMBER_ARRAY:
						case EShapeDataValueType.STRING:
						case EShapeDataValueType.STRING_ARRAY:
						case EShapeDataValueType.OBJECT:
						case EShapeDataValueType.OBJECT_ARRAY:
							return prefix + value.id;
						case EShapeDataValueType.TICKER:
							return prefix + `Ticker ${value.initial} ms`;
						default:
							const extension = EShapeDataValueExtensions.get(type);
							if (extension) {
								return prefix + extension.label;
							}
							return prefix + "Unknown";
					}
				}
			},
			updater: {
				newItem: (data): DListItem<EShapeDataValue> => {
					return new DListItem<EShapeDataValue>(data, {
						on: {
							dblclick: (e, _, item): void => {
								this.onListDataValueDblClick(e, _, item, result);
							}
						}
					});
				}
			}
		});
		return result;
	}

	protected onListDataValueDblClick(
		e: MouseEvent | TouchEvent,
		_: unknown,
		item: DListItem<EShapeDataValue>,
		list: DList<EShapeDataValue>
	): void {
		const oldValue = item.value;
		if (oldValue != null) {
			const dialogDataValue = this.dialogDataValue;
			dialogDataValue.value = oldValue;
			dialogDataValue.open(item).then((newValue): void => {
				if (newValue != null) {
					this._selection.replaceDataValue(oldValue, newValue, list);
				}
			});
		}
	}

	protected onSelectionChangeListDataValue(selection: EEditorDataSelection): void {
		const listDataValue = this.listDataValue;
		listDataValue.data.items = selection.last()?.data.values || [];
		this.onListDataValueSelectionChange(listDataValue);
	}

	protected onSelectionChange(selection: EEditorDataSelection): void {
		this.state.isDisabled = selection.isEmpty();
		this.onSelectionChangeListDataValue(selection);
	}

	protected onListDataValueSelectionChange(listDataValue: DList<EShapeDataValue>): void {
		this.onListDataValueSelectionChangeButtonDelete(listDataValue);
		this.onListDataValueSelectionChangeButtonBringForward(listDataValue);
		this.onListDataValueSelectionChangeButtonSendBackward(listDataValue);
	}

	protected override getType(): string {
		return "EEditorData";
	}
}
