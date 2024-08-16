import {
	DButton,
	DButtonAmbient,
	DContentOptions,
	DControllers,
	DDiagramEditor,
	DDialogOpener,
	DInputRealAndLabel,
	DLayoutHorizontal,
	DLayoutVertical,
	DList,
	DListItem,
	DPane,
	DText,
	DThemePane,
	DThemes
} from "@wcardinal/wcardinal-ui";
import { Texture } from "pixi.js";
import { EToolSelectSelection } from "../../tool/e-tool-select-selection";
import { EShapeExtensionEditorOptions } from "../e-shape-extension-editor";
import { ECommandShapeButtonLayerValueAdd } from "./e-command-shape-button-layer-value-add";
import { ECommandShapeButtonLayerValueBringForward } from "./e-command-shape-button-layer-value-bring-forward";
import { ECommandShapeButtonLayerValueMargin } from "./e-command-shape-button-layer-value-margin";
import { ECommandShapeButtonLayerValueRemove } from "./e-command-shape-button-layer-value-remove";
import { ECommandShapeButtonLayerValueReplace } from "./e-command-shape-button-layer-value-replace";
import { ECommandShapeButtonLayerValueSendBackward } from "./e-command-shape-button-layer-value-send-backward";
import { EDialogShapeButtonLayerValue } from "./e-dialog-shape-button-layer-value";
import { EShapeButtonLayer } from "./e-shape-button-layer";
import { EShapeButtonLayerButtonValue } from "./e-shape-button-layer-button-value";

export interface EEditorShapeButtonLayerOptions extends EShapeExtensionEditorOptions {}

export interface ESubthemeEditorShapeButtonLayer {
	getLabel(): string;
	getButtonNewTitle(): string | undefined;
	getButtonDeleteTitle(): string | undefined;
	getButtonBringForwardTitle(): string | undefined;
	getButtonSendBackwardTitle(): string | undefined;
	getInputMarginLabel(): string;
}

export class EEditorShapeButtonLayer extends DPane<
	DThemePane,
	DContentOptions,
	EEditorShapeButtonLayerOptions
> {
	protected _icons: Record<string, Texture>;
	protected _selection: EToolSelectSelection;
	protected _diagram: DDiagramEditor;
	protected _subtheme?: ESubthemeEditorShapeButtonLayer;

	protected _buttonNew?: DButton<string>;
	protected _buttonDelete?: DButton<string>;
	protected _buttonBringForward?: DButton<string>;
	protected _buttonSendBackward?: DButton<string>;
	protected _dialogButton?: EDialogShapeButtonLayerValue;
	protected _columnList?: DList<EShapeButtonLayerButtonValue>;
	protected _inputMargin?: DInputRealAndLabel;

	constructor(options: EEditorShapeButtonLayerOptions) {
		super(options);

		this._icons = options.icons;
		const selection = options.selection;
		this._selection = selection;
		this._diagram = options.diagram;

		// Layout
		this.initLayout();
	}

	protected initLayout(): void {
		// Content height
		this.content.setHeight("padding");

		// Layout
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
				this.inputMargin
			]
		});

		// Selection
		const selection = this._selection;
		this.state.isDisabled = selection.isEmpty();
		selection.on("change", (): void => {
			this.state.isDisabled = selection.isEmpty();
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
		this.dialogButton
			.reset()
			.open(opener)
			.then((value): void => {
				if (value != null) {
					DControllers.getCommandController().push(
						new ECommandShapeButtonLayerValueAdd(value, this._selection)
					);
				}
			});
	}

	protected onSelectionChangeButtonNew(selection: EToolSelectSelection): void {
		const buttonNew = this.buttonNew;
		if (selection.last() instanceof EShapeButtonLayer) {
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
							new ECommandShapeButtonLayerValueRemove(first, this._selection)
						);
					}
				}
			}
		});
	}

	protected onListSelectionChangeButtonDelete(
		columnList: DList<EShapeButtonLayerButtonValue>
	): void {
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
							new ECommandShapeButtonLayerValueBringForward(first, this._selection)
						);
					}
				}
			}
		});
	}

	protected onListSelectionChangeButtonBringForward(
		columnList: DList<EShapeButtonLayerButtonValue>
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
							new ECommandShapeButtonLayerValueSendBackward(first, this._selection)
						);
					}
				}
			}
		});
	}

	protected onListSelectionChangeButtonSendBackward(
		columnList: DList<EShapeButtonLayerButtonValue>
	): void {
		const first = columnList.selection.first;
		const items = columnList.data.items;
		this.buttonSendBackward.state.isDisabled =
			first == null || items[items.length - 1] === first;
	}

	protected get dialogButton(): EDialogShapeButtonLayerValue {
		return (this._dialogButton ??= this.newDialogButton());
	}

	protected newDialogButton(): EDialogShapeButtonLayerValue {
		return new EDialogShapeButtonLayerValue({
			diagram: this._diagram
		});
	}

	protected get columnList(): DList<EShapeButtonLayerButtonValue> {
		return (this._columnList ??= this.newColumnList());
	}

	protected newColumnList(): DList<EShapeButtonLayerButtonValue> {
		const result = new DList<EShapeButtonLayerButtonValue>({
			width: "100%",
			weight: 1,
			data: {
				toLabel: (value): string => {
					return value.label;
				}
			},
			updater: {
				newItem: (data): DListItem<EShapeButtonLayerButtonValue> => {
					return new DListItem<EShapeButtonLayerButtonValue>(data, {
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
		item: DListItem<EShapeButtonLayerButtonValue>,
		list: DList<EShapeButtonLayerButtonValue>
	): void {
		const oldValue = item.value;
		if (oldValue != null) {
			const columnDialog = this.dialogButton;
			columnDialog.value = oldValue;
			columnDialog.open(item).then((newValue): void => {
				if (newValue != null) {
					DControllers.getCommandController().push(
						new ECommandShapeButtonLayerValueReplace(
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
		columnList.data.items = last instanceof EShapeButtonLayer ? last.button.values : [];
		this.onListSelectionChange(columnList);
	}

	protected get inputMargin(): DInputRealAndLabel {
		return (this._inputMargin ??= this.newInputMargin());
	}

	protected newInputMargin(): DInputRealAndLabel {
		return new DInputRealAndLabel({
			width: "100%",
			label: {
				text: {
					value: this.subtheme.getInputMarginLabel()
				}
			},
			input: {
				weight: 1,
				on: {
					change: (value: number): void => {
						DControllers.getCommandController().push(
							new ECommandShapeButtonLayerValueMargin(value, this._selection)
						);
					}
				}
			}
		});
	}

	protected onSelectionChangeInputRowHeight(selection: EToolSelectSelection): void {
		const last = selection.last();
		const input = this.inputMargin;
		if (last instanceof EShapeButtonLayer) {
			input.input.value = last.button.margin;
			input.state.isDisabled = false;
		} else {
			input.state.isDisabled = true;
		}
	}

	protected onSelectionChange(selection: EToolSelectSelection): void {
		this.onSelectionChangeButtonNew(selection);
		this.onSelectionChangeColumnList(selection);
	}

	protected onListSelectionChange(columnList: DList<EShapeButtonLayerButtonValue>): void {
		this.onListSelectionChangeButtonDelete(columnList);
		this.onListSelectionChangeButtonBringForward(columnList);
		this.onListSelectionChangeButtonSendBackward(columnList);
	}

	protected get subtheme(): ESubthemeEditorShapeButtonLayer {
		return (this._subtheme ??= this.newSubtheme());
	}

	protected newSubtheme(): ESubthemeEditorShapeButtonLayer {
		return DThemes.get<ESubthemeEditorShapeButtonLayer>("EEditorShapeButtonLayer");
	}
}
