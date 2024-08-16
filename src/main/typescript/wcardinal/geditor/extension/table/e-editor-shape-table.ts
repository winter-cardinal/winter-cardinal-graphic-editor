import {
	DButton,
	DButtonAmbient,
	DContentOptions,
	DControllers,
	DDialogOpener,
	DInputReal,
	DLayoutHorizontal,
	DLayoutVertical,
	DList,
	DListItem,
	DPane,
	DSelect,
	DText,
	DThemePane,
	DThemes
} from "@wcardinal/wcardinal-ui";
import { Texture } from "pixi.js";
import { EToolSelectSelection } from "../../tool/e-tool-select-selection";
import { EShapeExtensionEditorOptions } from "../e-shape-extension-editor";
import { ECommandShapeTableColumnValueAdd } from "./e-command-shape-table-column-value-add";
import { ECommandShapeTableColumnValueBringForward } from "./e-command-shape-table-column-value-bring-forward";
import { ECommandShapeTableColumnValueRemove } from "./e-command-shape-table-column-value-remove";
import { ECommandShapeTableColumnValueReplace } from "./e-command-shape-table-column-value-replace";
import { ECommandShapeTableColumnValueSendBackward } from "./e-command-shape-table-column-value-send-backward";
import { ECommandShapeTableRowHeight } from "./e-command-shape-table-row-height";
import { ECommandShapeTableRowSelectionType } from "./e-command-shape-table-row-selection-type";
import { EDialogTableColumn } from "./e-dialog-shape-table-column";
import { EShapeTable } from "./e-shape-table";
import { EShapeTableColumnValue } from "./e-shape-table-column-value";
import { EShapeTableRowSelectionType } from "./e-shape-table-row-selection";

export interface EEditorShapeTableOptions extends EShapeExtensionEditorOptions {}

export interface ESubthemeEditorShapeTable {
	getLabel(): string;
	getButtonNewTitle(): string;
	getButtonDeleteTitle(): string;
	getButtonBringForwardTitle(): string;
	getButtonSendBackwardTitle(): string;
	getInputRowHeightLabel(): string;
	getSelectRowSelectionTypeLabel(): string;
	toSelectRowSelectionTypeLabel(type: EShapeTableRowSelectionType): string;
}

export class EEditorShapeTable extends DPane<
	DThemePane,
	DContentOptions,
	EEditorShapeTableOptions
> {
	protected _icons: Record<string, Texture>;
	protected _selection: EToolSelectSelection;
	protected _subtheme?: ESubthemeEditorShapeTable;

	protected _buttonNew?: DButton<string>;
	protected _buttonDelete?: DButton<string>;
	protected _buttonBringForward?: DButton<string>;
	protected _buttonSendBackward?: DButton<string>;
	protected _columnDialog?: EDialogTableColumn;
	protected _columnList?: DList<EShapeTableColumnValue>;
	protected _inputRowHeight?: DInputReal;
	protected _selectRowSelectionType?: DSelect<EShapeTableRowSelectionType>;

	constructor(options: EEditorShapeTableOptions) {
		super(options);

		this._icons = options.icons;

		const selection = options.selection;
		this._selection = selection;

		this.state.isDisabled = selection.isEmpty();
		selection.on("change", (): void => {
			this.state.isDisabled = selection.isEmpty();
		});

		this.content.setHeight("padding");

		new DLayoutVertical({
			parent: this.content,
			x: "padding",
			y: "padding",
			width: "padding",
			height: "padding",
			children: [
				new DLayoutHorizontal({
					width: "100%",
					height: "auto",
					children: [
						this.newTextLabel(),
						this.buttonNew,
						this.buttonDelete,
						this.buttonBringForward,
						this.buttonSendBackward
					]
				}),
				this.columnList,
				new DText<string>({
					width: "100%",
					text: {
						value: this.subtheme.getInputRowHeightLabel()
					}
				}),
				this.inputRowHeight,
				new DText<string>({
					width: "100%",
					text: {
						value: this.subtheme.getSelectRowSelectionTypeLabel()
					}
				}),
				this.selectRowSelectionType
			]
		});

		selection.on("change", (): void => {
			this.onSelectionChange(selection);
		});
		const columnList = this.columnList;
		columnList.data.selection.on("change", (): void => {
			this.onListSelectionChange(columnList);
		});
		this.onSelectionChange(selection);
	}

	protected newTextLabel(): DText<string> {
		return new DText<string>({
			weight: 1,
			text: {
				value: this.subtheme.getLabel()
			}
		});
	}

	protected get buttonNew(): DButton<string> {
		return (this._buttonNew ??= this.newButtonNew());
	}

	protected newButtonNew(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.new
			},
			title: this.subtheme.getButtonNewTitle(),
			on: {
				active: (emitter): void => {
					this.onButtonNewActive(emitter);
				}
			}
		});
	}

	protected onButtonNewActive(opener?: DDialogOpener): void {
		this.columnDialog
			.reset()
			.open(opener)
			.then((value): void => {
				if (value != null) {
					DControllers.getCommandController().push(
						new ECommandShapeTableColumnValueAdd(value, this._selection)
					);
				}
			});
	}

	protected onSelectionChangeButtonNew(selection: EToolSelectSelection): void {
		const buttonNew = this.buttonNew;
		if (selection.last() instanceof EShapeTable) {
			buttonNew.state.isDisabled = false;
		} else {
			buttonNew.state.isDisabled = true;
		}
	}

	protected get buttonDelete(): DButton<string> {
		return (this._buttonDelete ??= this.newButtonDelete());
	}

	protected newButtonDelete(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.delete
			},
			title: this.subtheme.getButtonDeleteTitle(),
			on: {
				active: (): void => {
					const columnList = this.columnList;
					const first = columnList.data.selection.first;
					if (first != null && 1 < columnList.data.size()) {
						DControllers.getCommandController().push(
							new ECommandShapeTableColumnValueRemove(first, this._selection)
						);
					}
				}
			}
		});
	}

	protected onListSelectionChangeButtonDelete(columnList: DList<EShapeTableColumnValue>): void {
		this.buttonDelete.state.isDisabled =
			columnList.data.size() <= 1 || columnList.data.selection.isEmpty();
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
			title: this.subtheme.getButtonBringForwardTitle(),
			on: {
				active: (): void => {
					const columnList = this.columnList;
					const first = columnList.selection.first;
					if (first != null && columnList.data.items[0] !== first) {
						DControllers.getCommandController().push(
							new ECommandShapeTableColumnValueBringForward(first, this._selection)
						);
					}
				}
			}
		});
	}

	protected onListSelectionChangeButtonBringForward(
		columnList: DList<EShapeTableColumnValue>
	): void {
		const first = columnList.data.selection.first;
		const items = columnList.data.items;
		this.buttonBringForward.state.isDisabled = first == null || items[0] === first;
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
			title: this.subtheme.getButtonSendBackwardTitle(),
			on: {
				active: (): void => {
					const columnList = this.columnList;
					const first = columnList.selection.first;
					const items = columnList.data.items;
					if (first != null && items[items.length - 1] !== first) {
						DControllers.getCommandController().push(
							new ECommandShapeTableColumnValueSendBackward(first, this._selection)
						);
					}
				}
			}
		});
	}

	protected onListSelectionChangeButtonSendBackward(
		columnList: DList<EShapeTableColumnValue>
	): void {
		const first = columnList.selection.first;
		const items = columnList.data.items;
		this.buttonSendBackward.state.isDisabled =
			first == null || items[items.length - 1] === first;
	}

	protected get columnDialog(): EDialogTableColumn {
		return (this._columnDialog ??= this.newColumnDialog());
	}

	protected newColumnDialog(): EDialogTableColumn {
		return new EDialogTableColumn();
	}

	protected get columnList(): DList<EShapeTableColumnValue> {
		return (this._columnList ??= this.newColumnList());
	}

	protected newColumnList(): DList<EShapeTableColumnValue> {
		const result = new DList<EShapeTableColumnValue>({
			width: "100%",
			weight: 1,
			data: {
				toLabel: (value): string => {
					return value.toLabel();
				}
			},
			updater: {
				newItem: (data): DListItem<EShapeTableColumnValue> => {
					return new DListItem<EShapeTableColumnValue>(data, {
						on: {
							dblclick: (e, _, item): void => {
								this.onColumnListDblClick(e, _, item, result);
							}
						}
					});
				}
			}
		});
		return result;
	}

	protected onColumnListDblClick(
		e: MouseEvent | TouchEvent,
		_: unknown,
		item: DListItem<EShapeTableColumnValue>,
		list: DList<EShapeTableColumnValue>
	): void {
		const oldValue = item.value;
		if (oldValue != null) {
			const columnDialog = this.columnDialog;
			columnDialog.value = oldValue;
			columnDialog.open(item).then((): void => {
				const newValue = columnDialog.value;
				if (newValue != null) {
					DControllers.getCommandController().push(
						new ECommandShapeTableColumnValueReplace(
							oldValue,
							newValue,
							this._selection,
							list
						)
					);
				}
			});
		}
	}

	protected onSelectionChangeColumnList(selection: EToolSelectSelection): void {
		const last = selection.last();
		const columnList = this.columnList;
		columnList.data.items = last instanceof EShapeTable ? last.column.values : [];
		this.onListSelectionChange(columnList);
	}

	protected get inputRowHeight(): DInputReal {
		return (this._inputRowHeight ??= this.newInputRowHeight());
	}

	protected newInputRowHeight(): DInputReal {
		return new DInputReal({
			width: "100%",
			min: 5,
			step: 1,
			on: {
				change: (value: number): void => {
					DControllers.getCommandController().push(
						new ECommandShapeTableRowHeight(value, this._selection)
					);
				}
			}
		});
	}

	protected onSelectionChangeInputRowHeight(selection: EToolSelectSelection): void {
		const last = selection.last();
		const input = this.inputRowHeight;
		if (last instanceof EShapeTable) {
			input.value = last.row.height;
			input.state.isDisabled = false;
		} else {
			input.state.isDisabled = true;
		}
	}

	protected get selectRowSelectionType(): DSelect<EShapeTableRowSelectionType> {
		return (this._selectRowSelectionType ??= this.newSelectRowSelectionType());
	}

	protected newSelectRowSelectionType(): DSelect<EShapeTableRowSelectionType> {
		const subtheme = this.subtheme;
		return new DSelect<EShapeTableRowSelectionType>({
			width: "100%",
			value: EShapeTableRowSelectionType.SINGLE,
			menu: {
				items: [
					{
						value: EShapeTableRowSelectionType.NONE,
						text: {
							value: subtheme.toSelectRowSelectionTypeLabel(
								EShapeTableRowSelectionType.NONE
							)
						}
					},
					{
						value: EShapeTableRowSelectionType.SINGLE,
						text: {
							value: subtheme.toSelectRowSelectionTypeLabel(
								EShapeTableRowSelectionType.SINGLE
							)
						}
					},
					{
						value: EShapeTableRowSelectionType.MULTIPLE,
						text: {
							value: subtheme.toSelectRowSelectionTypeLabel(
								EShapeTableRowSelectionType.MULTIPLE
							)
						}
					}
				]
			},
			on: {
				change: (value: EShapeTableRowSelectionType | null): void => {
					if (value == null) {
						value = EShapeTableRowSelectionType.SINGLE;
					}
					DControllers.getCommandController().push(
						new ECommandShapeTableRowSelectionType(value, this._selection)
					);
				}
			}
		});
	}

	protected onSelectionChangeSelectRowSelectionType(selection: EToolSelectSelection): void {
		const last = selection.last();
		const select = this.selectRowSelectionType;
		if (last instanceof EShapeTable) {
			select.value = last.row.selection.type;
			select.state.isDisabled = false;
		} else {
			select.state.isDisabled = true;
		}
	}

	protected onSelectionChange(selection: EToolSelectSelection): void {
		this.onSelectionChangeButtonNew(selection);
		this.onSelectionChangeColumnList(selection);
		this.onSelectionChangeInputRowHeight(selection);
		this.onSelectionChangeSelectRowSelectionType(selection);
	}

	protected onListSelectionChange(columnList: DList<EShapeTableColumnValue>): void {
		this.onListSelectionChangeButtonDelete(columnList);
		this.onListSelectionChangeButtonBringForward(columnList);
		this.onListSelectionChangeButtonSendBackward(columnList);
	}

	protected get subtheme(): ESubthemeEditorShapeTable {
		return (this._subtheme ??= this.newSubtheme());
	}

	protected newSubtheme(): ESubthemeEditorShapeTable {
		return DThemes.get<ESubthemeEditorShapeTable>("EEditorShapeTable");
	}
}
