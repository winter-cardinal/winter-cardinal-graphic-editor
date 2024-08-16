import {
	DBaseState,
	DButton,
	DButtonAmbient,
	DButtonCheckRight,
	DDiagram,
	DDiagramEditor,
	DDialogOpener,
	DDropdown,
	DInputText,
	DLayoutHorizontal,
	DLayoutVertical,
	DLayoutVerticalOptions,
	DList,
	DListItem,
	DMenuItemOptionsUnion,
	DText,
	DThemeButtonColor,
	DThemeLayoutVertical,
	DThemes,
	EShapeActionValue,
	EShapeActionValueChangeColor
} from "@wcardinal/wcardinal-ui";
import { Texture } from "pixi.js";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";
import { EDialogAction } from "./e-dialog-action";

export interface EEditorActionOptions extends DLayoutVerticalOptions<EThemeEditorAction> {
	selection: EToolSelectSelection;
	diagram: DDiagram | DDiagramEditor;
	icons: Record<string, Texture>;
}

export interface EThemeEditorAction extends DThemeLayoutVertical {
	getLabel(): string | undefined;
	getButtonNewTitle(): string | undefined;
	getButtonDeleteTitle(): string | undefined;
	getButtonBringForwardTitle(): string | undefined;
	getButtonSendBackwardTitle(): string | undefined;
	getCheckInteractiveLabel(): string | undefined;
	getCheckFocusableLabel(): string | undefined;
	getInputShortcutLabel(): string | undefined;
	getInputTitleLabel(): string | undefined;
	getDropdownCursorLabel(): string | undefined;
	getCursors(): Map<string, string>;
}

export class EEditorAction extends DLayoutVertical<EThemeEditorAction, EEditorActionOptions> {
	protected _icons: Record<string, Texture>;
	protected _selection: EToolSelectSelection;
	protected _diagram: DDiagram | DDiagramEditor;

	protected _buttonNew?: DButton<string>;
	protected _buttonDelete?: DButton<string>;
	protected _buttonBringForward?: DButton<string>;
	protected _buttonSendBackward?: DButton<string>;
	protected _actionDialog?: EDialogAction;
	protected _actionList?: DList<EShapeActionValue>;
	protected _checkInteractive?: DButtonCheckRight<string>;
	protected _checkFocusable?: DButtonCheckRight<string>;

	protected _labelTitle?: DText<string>;
	protected _inputTitle?: DInputText;

	protected _labelShortcut?: DText<string>;
	protected _inputShortcut?: DInputText;

	protected _labelCursor?: DText<string>;
	protected _dropdownCursor?: DDropdown<string>;
	protected _cursors?: Map<string, string>;

	constructor(options: EEditorActionOptions) {
		super(options);

		this._icons = options.icons;

		const selection = options.selection;
		this._selection = selection;

		this._diagram = options.diagram;

		this.addChild(
			new DLayoutHorizontal({
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
		this.addChild(this.actionList);
		this.addChild(this.checkInteractive);
		this.addChild(this.checkFocusable);
		this.addChild(this.labelTitle);
		this.addChild(this.inputTitle);
		this.addChild(this.labelShortcut);
		this.addChild(this.inputShortcut);
		this.addChild(this.labelCursor);
		this.addChild(this.dropdownCursor);

		selection.on("change", (): void => {
			this.onSelectionChange(selection);
		});
		const actionList = this.actionList;
		actionList.data.selection.on("change", (): void => {
			this.onListSelectionChange(actionList);
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
		return (this._buttonNew ??= this.newButtonNew());
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
		this.actionDialog
			.reset()
			.open(opener)
			.then((value): void => {
				if (value != null) {
					this._selection.addActionValue(value);
				}
			});
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
			title: this.theme.getButtonDeleteTitle(),
			state: DBaseState.DISABLED,
			on: {
				active: (): void => {
					const first = this.actionList.data.selection.first;
					if (first != null) {
						this._selection.removeActionValue(first);
					}
				}
			}
		});
	}

	protected onListSelectionChangeButtonDelete(actionList: DList<EShapeActionValue>): void {
		this.buttonDelete.state.isDisabled = actionList.data.selection.isEmpty();
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
			state: DBaseState.DISABLED,
			on: {
				active: (): void => {
					const actionList = this.actionList;
					const first = actionList.data.selection.first;
					const items = actionList.data.items;
					if (first != null && items[0] !== first) {
						this._selection.bringActionValueForward(first);
					}
				}
			}
		});
	}

	protected onListSelectionChangeButtonBringForward(actionList: DList<EShapeActionValue>): void {
		const first = actionList.data.selection.first;
		const items = actionList.data.items;
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
			title: this.theme.getButtonSendBackwardTitle(),
			state: DBaseState.DISABLED,
			on: {
				active: (): void => {
					const actionList = this.actionList;
					const first = actionList.data.selection.first;
					const items = actionList.data.items;
					if (first != null && items[items.length - 1] !== first) {
						this._selection.sendActionValueBackward(first);
					}
				}
			}
		});
	}

	protected onListSelectionChangeButtonSendBackward(actionList: DList<EShapeActionValue>): void {
		const first = actionList.data.selection.first;
		const items = actionList.data.items;
		this.buttonSendBackward.state.isDisabled =
			first == null || items[items.length - 1] === first;
	}

	protected get actionDialog(): EDialogAction {
		return (this._actionDialog ??= this.newActionDialog());
	}

	protected newActionDialog(): EDialogAction {
		return new EDialogAction({
			icons: this._icons,
			diagram: this._diagram
		});
	}

	protected get actionList(): DList<EShapeActionValue> {
		return (this._actionList ??= this.newActionList());
	}

	protected newActionList(): DList<EShapeActionValue> {
		const result = new DList<EShapeActionValue>({
			width: "padding",
			weight: 1,
			data: {
				toLabel: (item) => {
					return item.toLabel();
				}
			},
			updater: {
				newItem: (data) => {
					return new DListItem<EShapeActionValue>(data, {
						image: {
							tint: {
								color: null
							}
						},
						on: {
							dblclick: (e, _, item): void => {
								this.onActionListDblClick(e, _, item, result);
							},

							set: (value, index, item): void => {
								this.onActionListSet(item, value);
							},

							unset: (item) => {
								this.onActionListUnset(item);
							}
						}
					});
				}
			}
		});
		return result;
	}

	protected onActionListDblClick(
		e: MouseEvent | TouchEvent,
		_: unknown,
		item: DListItem<EShapeActionValue>,
		list: DList<EShapeActionValue>
	): void {
		const oldActionValue = item.value;
		if (oldActionValue != null) {
			const actionDialog = this.actionDialog;
			actionDialog.reset();
			actionDialog.value = oldActionValue;
			actionDialog.open(item).then((): void => {
				const newActionValue = actionDialog.value;
				if (newActionValue != null) {
					this._selection.replaceActionValue(oldActionValue, newActionValue, list);
				}
			});
		}
	}

	protected onActionListSet(item: DListItem<EShapeActionValue>, value: EShapeActionValue): void {
		if (value instanceof EShapeActionValueChangeColor) {
			const image = item.image.get(0);
			if (image != null) {
				const theme = DThemes.get<DThemeButtonColor>("DButtonColor");
				image.source = theme.getImageSource(item.state);
				image.tint.color = value.color;
			}
		} else {
			item.image = null;
		}
	}

	protected onActionListUnset(item: DListItem<EShapeActionValue>): void {
		item.image = null;
	}

	protected onSelectionChangeActionList(selection: EToolSelectSelection): void {
		const last = selection.last();
		const actionList = this.actionList;
		actionList.data.items = last != null ? last.action.values : [];
		this.onListSelectionChange(actionList);
	}

	protected get checkInteractive(): DButtonCheckRight<string> {
		return (this._checkInteractive ??= this.newCheckInteractive());
	}

	protected newCheckInteractive(): DButtonCheckRight<string> {
		return new DButtonCheckRight<string>({
			width: "padding",
			text: {
				value: this.theme.getCheckInteractiveLabel()
			},
			padding: 0,
			background: {
				color: null
			},
			on: {
				active: (): void => {
					this._selection.setInteractive(true);
				},
				inactive: (): void => {
					this._selection.setInteractive(false);
				}
			}
		});
	}

	protected onSelectionChangeCheckInteractive(selection: EToolSelectSelection): void {
		const last = selection.last();
		const checkInteractive = this.checkInteractive;
		if (last != null) {
			checkInteractive.state.isActive = last.interactive;
			checkInteractive.state.isDisabled = false;
		} else {
			checkInteractive.state.isDisabled = true;
		}
	}

	protected get checkFocusable(): DButtonCheckRight<string> {
		return (this._checkFocusable ??= this.newCheckFocusable());
	}

	protected newCheckFocusable(): DButtonCheckRight<string> {
		return new DButtonCheckRight<string>({
			width: "padding",
			text: {
				value: this.theme.getCheckFocusableLabel()
			},
			padding: 0,
			background: {
				color: null
			},
			on: {
				active: (): void => {
					this._selection.setFocusable(true);
				},
				inactive: (): void => {
					this._selection.setFocusable(false);
				}
			}
		});
	}

	protected onSelectionChangeCheckFocusable(selection: EToolSelectSelection): void {
		const last = selection.last();
		const checkFocusable = this.checkFocusable;
		if (last != null) {
			checkFocusable.state.isActive = last.state.isFocusable;
			checkFocusable.state.isDisabled = false;
		} else {
			checkFocusable.state.isDisabled = true;
		}
	}

	protected get labelShortcut(): DText<string> {
		return (this._labelShortcut ??= this.newLabelShortcut());
	}

	protected newLabelShortcut(): DText<string> {
		return new DText<string>({
			width: "padding",
			text: {
				value: this.theme.getInputShortcutLabel()
			}
		});
	}

	protected get inputShortcut(): DInputText {
		return (this._inputShortcut ??= this.newInputShortcut());
	}

	protected newInputShortcut(): DInputText {
		return new DInputText({
			width: "padding",
			on: {
				change: (value: string): void => {
					this._selection.setShortcut(this.toNormalizedShortcut(value));
				}
			}
		});
	}

	protected toNormalizedShortcut(value: string): string | undefined {
		const trimmed = value.trim();
		if (0 < trimmed.length) {
			return trimmed;
		}
	}

	protected onSelectionChangeInputShortcut(selection: EToolSelectSelection): void {
		this.inputShortcut.value = selection.last()?.shortcut || "";
	}

	protected get labelTitle(): DText<string> {
		return (this._labelTitle ??= this.newLabelTitle());
	}

	protected newLabelTitle(): DText<string> {
		return new DText<string>({
			width: "padding",
			text: {
				value: this.theme.getInputTitleLabel()
			}
		});
	}

	protected get inputTitle(): DInputText {
		return (this._inputTitle ??= this.newInputTitle());
	}

	protected newInputTitle(): DInputText {
		return new DInputText({
			width: "padding",
			on: {
				change: (value: string): void => {
					this._selection.setTitle(this.toNormalizedTitle(value));
				}
			}
		});
	}

	protected toNormalizedTitle(value: string): string | undefined {
		if (0 < value.trim().length) {
			return value;
		}
	}

	protected onSelectionChangeInputTitle(selection: EToolSelectSelection): void {
		this.inputTitle.value = selection.last()?.title || "";
	}

	protected get labelCursor(): DText<string> {
		return (this._labelCursor ??= this.newLabelCursor());
	}

	protected newLabelCursor(): DText<string> {
		return new DText<string>({
			width: "padding",
			text: {
				value: this.theme.getDropdownCursorLabel()
			}
		});
	}

	protected get dropdownCursor(): DDropdown<string> {
		return (this._dropdownCursor ??= this.newDropdownCursor());
	}

	protected newDropdownCursor(): DDropdown<string> {
		return new DDropdown<string>({
			width: "padding",
			menu: {
				width: "auto",
				column: 3,
				fit: false,
				items: this.newDropdownCursorMenuItems()
			},
			on: {
				select: (value): void => {
					this.dropdownCursor.text = this.cursors.get(value) ?? value;
					this._selection.setCursor(value);
				}
			}
		});
	}

	protected newDropdownCursorMenuItems(): DMenuItemOptionsUnion<string>[] {
		const result: DMenuItemOptionsUnion<string>[] = [];
		this.cursors.forEach((label, cursor): void => {
			result.push({
				width: 200,
				value: cursor,
				text: {
					value: label
				}
			});
		});
		return result;
	}

	protected get cursors(): Map<string, string> {
		return (this._cursors ??= this.theme.getCursors());
	}

	protected onSelectionChangeDropdownCursor(selection: EToolSelectSelection): void {
		const cursor = selection.last()?.cursor ?? "";
		this.dropdownCursor.text = this.cursors.get(cursor) ?? cursor;
	}

	protected onSelectionChange(selection: EToolSelectSelection): void {
		this.state.isDisabled = selection.isEmpty();
		this.onSelectionChangeActionList(selection);
		this.onSelectionChangeCheckInteractive(selection);
		this.onSelectionChangeCheckFocusable(selection);
		this.onSelectionChangeInputShortcut(selection);
		this.onSelectionChangeInputTitle(selection);
		this.onSelectionChangeDropdownCursor(selection);
	}

	protected onListSelectionChange(actionList: DList<EShapeActionValue>): void {
		this.onListSelectionChangeButtonDelete(actionList);
		this.onListSelectionChangeButtonBringForward(actionList);
		this.onListSelectionChangeButtonSendBackward(actionList);
	}

	protected override getType(): string {
		return "EEditorAction";
	}
}
