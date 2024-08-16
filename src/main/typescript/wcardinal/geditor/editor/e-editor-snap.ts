import {
	DBaseState,
	DButton,
	DButtonAmbient,
	DButtonCheckRight,
	DControllers,
	DDiagramEditor,
	DDialogOpener,
	DInputRealAndLabel,
	DLayoutHorizontal,
	DLayoutSpace,
	DLayoutVertical,
	DLayoutVerticalOptions,
	DList,
	DListItem,
	DThemeLayoutVertical,
	ESnapper,
	ESnapperGrid,
	ESnapperTarget,
	ESnapperTargetValue
} from "@wcardinal/wcardinal-ui";
import { Texture } from "pixi.js";
import { ECommandDocumentSnapBringForward } from "../command/e-command-document-snap-bring-forward";
import { ECommandDocumentSnapCreate } from "../command/e-command-document-snap-create";
import { ECommandDocumentSnapDelete } from "../command/e-command-document-snap-delete";
import { ECommandDocumentSnapGridSize } from "../command/e-command-document-snap-grid-size";
import { ECommandDocumentSnapGridToggle } from "../command/e-command-document-snap-grid-toggle";
import { ECommandDocumentSnapGridToggleVisibility } from "../command/e-command-document-snap-grid-toggle-visibility";
import { ECommandDocumentSnapReplace } from "../command/e-command-document-snap-replace";
import { ECommandDocumentSnapSendBackward } from "../command/e-command-document-snap-send-backward";
import { ECommandDocumentSnapTargetToggle } from "../command/e-command-document-snap-target-toggle";
import { ECommandDocumentSnapTargetToggleVisibility } from "../command/e-command-document-snap-target-toggle-visibility";
import { ECommandDocumentSnapToggle } from "../command/e-command-document-snap-toggle";
import { EDialogSnap } from "../editor/e-dialog-snap";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";

export interface EEditorSnapOptions extends DLayoutVerticalOptions<EThemeEditorSnap> {
	selection: EToolSelectSelection;
	diagram: DDiagramEditor;
	icons: Record<string, Texture>;
}

export interface EThemeEditorSnap extends DThemeLayoutVertical {
	getLabel(): string | undefined;
	getButtonTargetLabel(): string | undefined;
	getButtonTargetNewTitle(): string | undefined;
	getButtonTargetDeleteTitle(): string | undefined;
	getButtonTargetBringForwardTitle(): string | undefined;
	getButtonTargetSendBackwardTitle(): string | undefined;
	getButtonTargetEyeTitle(): string | undefined;
	getListTargetItemLabel(value: ESnapperTargetValue): string | undefined;
	getButtonGridLabel(): string | undefined;
	getButtonGridEyeTitle(): string | undefined;
	getInputGridSizeLabel(): string | undefined;
}

export class EEditorSnap extends DLayoutVertical<EThemeEditorSnap, EEditorSnapOptions> {
	protected _icons: Record<string, Texture>;
	protected _diagram: DDiagramEditor;
	protected _snapper: ESnapper;

	protected _buttonLabel?: DButtonCheckRight<string>;
	protected _buttonTarget?: DButtonCheckRight<string>;
	protected _buttonTargetNew?: DButton<string>;
	protected _buttonTargetDelete?: DButton<string>;
	protected _buttonTargetBringForward?: DButton<string>;
	protected _buttonTargetSendBackward?: DButton<string>;
	protected _buttonTargetEye?: DButton<string>;
	protected _dialogTarget?: EDialogSnap;
	protected _listTarget?: DList<ESnapperTargetValue>;
	protected _buttonGrid?: DButtonCheckRight<string>;
	protected _buttonGridEye?: DButton<string>;
	protected _inputGridSize?: DInputRealAndLabel;

	constructor(options: EEditorSnapOptions) {
		super(options);

		// Icons
		this._icons = options.icons;

		// Diagram
		const diagram = options.diagram;
		this._diagram = diagram;
		this.state.isDisabled = diagram.canvas == null;
		diagram.on("unset", (): void => {
			this.state.isDisabled = true;
		});
		diagram.on("set", (): void => {
			this.state.isDisabled = false;
		});

		// Snapper
		const snapper = diagram.snapper;
		this._snapper = snapper;
		snapper.on("change", (): void => {
			this.onSnapperChange(snapper);
		});
		const snapperTarget = snapper.target;
		snapperTarget.on("change", (): void => {
			this.onSnapperTargetChange(snapperTarget);
		});
		const snapperGrid = snapper.grid;
		snapperGrid.on("change", (): void => {
			this.onSnapperGridChange(snapperGrid);
		});

		// Layout
		this.addChild(this.buttonLabel);
		this.addChild(this.buttonGrid);
		this.addChild(
			new DLayoutHorizontal({
				x: "padding",
				width: "padding",
				height: "auto",
				children: [this.buttonGridEye, this.inputGridSize]
			})
		);
		this.addChild(this.buttonTarget);
		this.addChild(
			new DLayoutHorizontal({
				x: "padding",
				width: "padding",
				height: "auto",
				children: [
					new DLayoutSpace({ weight: 1 }),
					this.buttonTargetNew,
					this.buttonTargetDelete,
					this.buttonTargetBringForward,
					this.buttonTargetSendBackward,
					this.buttonTargetEye,
					new DLayoutSpace({ weight: 1 })
				]
			})
		);
		this.addChild(this.listTarget);

		// Selection
		const listSnapTarget = this.listTarget;
		listSnapTarget.data.selection.on("change", (): void => {
			this.onSelectionChange(listSnapTarget);
		});

		// Initialization
		this.onSnapperChange(snapper);
		this.onSnapperTargetChange(snapperTarget);
		this.onSnapperGridChange(snapperGrid);
		this.onSelectionChange(listSnapTarget);
	}

	protected get buttonLabel(): DButtonCheckRight<string> {
		let result = this._buttonLabel;
		if (result == null) {
			result = this.newButtonLabel();
			this._buttonLabel = result;
		}
		return result;
	}

	protected newButtonLabel(): DButtonCheckRight<string> {
		const snapper = this._diagram.snapper;
		return new DButtonCheckRight<string>({
			x: "padding",
			width: "padding",
			text: {
				value: this.theme.getLabel()
			},
			padding: 0,
			background: {
				color: null
			},
			on: {
				active: (): void => {
					if (!snapper.enable) {
						DControllers.getCommandController().push(
							new ECommandDocumentSnapToggle(snapper)
						);
					}
				},
				inactive: (): void => {
					if (snapper.enable) {
						DControllers.getCommandController().push(
							new ECommandDocumentSnapToggle(snapper)
						);
					}
				}
			}
		});
	}

	protected get buttonTarget(): DButtonCheckRight<string> {
		let result = this._buttonTarget;
		if (result == null) {
			result = this.newButtonTarget();
			this._buttonTarget = result;
		}
		return result;
	}

	protected newButtonTarget(): DButtonCheckRight<string> {
		return new DButtonCheckRight<string>({
			x: "padding",
			width: "padding",
			text: {
				value: this.theme.getButtonTargetLabel()
			},
			padding: 0,
			background: {
				color: null
			},
			on: {
				active: (): void => {
					const snapper = this._snapper;
					if (!snapper.target.enable) {
						DControllers.getCommandController().push(
							new ECommandDocumentSnapTargetToggle(snapper)
						);
					}
				},
				inactive: (): void => {
					const snapper = this._snapper;
					if (snapper.target.enable) {
						DControllers.getCommandController().push(
							new ECommandDocumentSnapTargetToggle(snapper)
						);
					}
				}
			}
		});
	}

	protected get buttonTargetNew(): DButton<string> {
		let result = this._buttonTargetNew;
		if (result == null) {
			result = this.newButtonTargetNew();
			this._buttonTargetNew = result;
		}
		return result;
	}

	protected newButtonTargetNew(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.new
			},
			title: this.theme.getButtonTargetNewTitle(),
			on: {
				active: (emitter): void => {
					this.onButtonTargetNewActive(emitter);
				}
			}
		});
	}

	protected onButtonTargetNewActive(opener?: DDialogOpener): void {
		this.dialogTarget
			.reset()
			.open(opener)
			.then((value): void => {
				if (value != null) {
					DControllers.getCommandController().push(
						new ECommandDocumentSnapCreate(this._snapper, value)
					);
				}
			});
	}

	protected get buttonTargetDelete(): DButton<string> {
		let result = this._buttonTargetDelete;
		if (result == null) {
			result = this.newButtonTargetDelete();
			this._buttonTargetDelete = result;
		}
		return result;
	}

	protected newButtonTargetDelete(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.delete
			},
			title: this.theme.getButtonTargetDeleteTitle(),
			state: DBaseState.DISABLED,
			on: {
				active: (): void => {
					const listTarget = this.listTarget;
					const first = listTarget.data.selection.first;
					if (first != null) {
						const items = listTarget.data.items;
						const index = items.indexOf(first);
						if (0 <= index) {
							DControllers.getCommandController().push(
								new ECommandDocumentSnapDelete(this._snapper, index, first)
							);
						}
					}
				}
			}
		});
	}

	protected get buttonTargetBringForward(): DButton<string> {
		let result = this._buttonTargetBringForward;
		if (result == null) {
			result = this.newButtonTargetBringForward();
			this._buttonTargetBringForward = result;
		}
		return result;
	}

	protected newButtonTargetBringForward(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.arrow_up
			},
			title: this.theme.getButtonTargetBringForwardTitle(),
			state: DBaseState.DISABLED,
			on: {
				active: (): void => {
					const listTarget = this.listTarget;
					const first = listTarget.data.selection.first;
					const items = listTarget.data.items;
					if (first != null && items[0] !== first) {
						const index = items.indexOf(first);
						if (0 <= index) {
							DControllers.getCommandController().push(
								new ECommandDocumentSnapBringForward(this._snapper, index)
							);
						}
					}
				}
			}
		});
	}

	protected get buttonTargetSendBackward(): DButton<string> {
		let result = this._buttonTargetSendBackward;
		if (result == null) {
			result = this.newButtonTargetSendBackward();
			this._buttonTargetSendBackward = result;
		}
		return result;
	}

	protected newButtonTargetSendBackward(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.arrow_down
			},
			title: this.theme.getButtonTargetSendBackwardTitle(),
			state: DBaseState.DISABLED,
			on: {
				active: (): void => {
					const snapper = this._snapper;
					const listTarget = this.listTarget;
					const first = listTarget.data.selection.first;
					const items = listTarget.data.items;
					if (first != null && items[items.length] !== first) {
						const index = items.indexOf(first);
						if (0 <= index) {
							DControllers.getCommandController().push(
								new ECommandDocumentSnapSendBackward(snapper, index)
							);
						}
					}
				}
			}
		});
	}

	protected get buttonTargetEye(): DButton<string> {
		let result = this._buttonTargetEye;
		if (result == null) {
			result = this.newButtonTargetEye();
			this._buttonTargetEye = result;
		}
		return result;
	}

	protected newButtonTargetEye(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.eye
			},
			title: this.theme.getButtonTargetEyeTitle(),
			on: {
				active: (): void => {
					DControllers.getCommandController().push(
						new ECommandDocumentSnapTargetToggleVisibility(this._snapper)
					);
				}
			}
		});
	}

	protected get dialogTarget(): EDialogSnap {
		let result = this._dialogTarget;
		if (result == null) {
			result = this.newDialogTarget();
			this._dialogTarget = result;
		}
		return result;
	}

	protected newDialogTarget(): EDialogSnap {
		return new EDialogSnap();
	}

	protected get listTarget(): DList<ESnapperTargetValue> {
		let result = this._listTarget;
		if (result == null) {
			result = this.newListTarget();
			this._listTarget = result;
		}
		return result;
	}

	protected newListTarget(): DList<ESnapperTargetValue> {
		const theme = this.theme;
		const result = new DList<ESnapperTargetValue>({
			x: "padding",
			width: "padding",
			weight: 1,
			data: {
				toLabel: (value: ESnapperTargetValue): string | undefined => {
					return theme.getListTargetItemLabel(value);
				}
			},
			updater: {
				newItem: (data) => {
					return new DListItem<ESnapperTargetValue>(data, {
						on: {
							dblclick: (e, _, item): void => {
								this.onListTargetDblClick(e, _, item, result);
							}
						}
					});
				}
			}
		});
		return result;
	}

	protected onListTargetDblClick(
		e: MouseEvent | TouchEvent,
		_: unknown,
		item: DListItem<ESnapperTargetValue>,
		list: DList<ESnapperTargetValue>
	): void {
		const oldValue = item.value;
		if (oldValue != null) {
			const index = list.data.items.indexOf(oldValue);
			if (0 <= index) {
				const dialog = this.dialogTarget;
				dialog.value = oldValue;
				dialog.open(item).then((newValue): void => {
					if (newValue != null) {
						DControllers.getCommandController().push(
							new ECommandDocumentSnapReplace(this._snapper, oldValue, newValue, list)
						);
					}
				});
			}
		}
	}

	protected get buttonGrid(): DButtonCheckRight<string> {
		let result = this._buttonGrid;
		if (result == null) {
			result = this.newButtonGrid();
			this._buttonGrid = result;
		}
		return result;
	}

	protected newButtonGrid(): DButtonCheckRight<string> {
		return new DButtonCheckRight<string>({
			x: "padding",
			width: "padding",
			text: {
				value: this.theme.getButtonGridLabel()
			},
			padding: 0,
			background: {
				color: null
			},
			on: {
				active: (): void => {
					const snapper = this._snapper;
					if (!snapper.grid.enable) {
						DControllers.getCommandController().push(
							new ECommandDocumentSnapGridToggle(snapper)
						);
					}
				},
				inactive: (): void => {
					const snapper = this._snapper;
					if (snapper.grid.enable) {
						DControllers.getCommandController().push(
							new ECommandDocumentSnapGridToggle(snapper)
						);
					}
				}
			}
		});
	}

	protected get buttonGridEye(): DButton<string> {
		let result = this._buttonGridEye;
		if (result == null) {
			result = this.newButtonGridEye();
			this._buttonGridEye = result;
		}
		return result;
	}

	protected newButtonGridEye(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.eye
			},
			title: this.theme.getButtonGridEyeTitle(),
			on: {
				active: (): void => {
					DControllers.getCommandController().push(
						new ECommandDocumentSnapGridToggleVisibility(this._snapper)
					);
				}
			}
		});
	}

	protected get inputGridSize(): DInputRealAndLabel {
		let result = this._inputGridSize;
		if (result == null) {
			result = this.newInputGridSize();
			this._inputGridSize = result;
		}
		return result;
	}

	protected newInputGridSize(): DInputRealAndLabel {
		return new DInputRealAndLabel({
			weight: 1,
			label: {
				text: {
					value: this.theme.getInputGridSizeLabel()
				}
			},
			input: {
				weight: 1,
				text: {
					value: 10
				},
				min: 2,
				on: {
					change: (value: number): void => {
						DControllers.getCommandController().push(
							new ECommandDocumentSnapGridSize(this._snapper, value)
						);
					}
				}
			}
		});
	}

	protected onSnapperChange(snapper: ESnapper): void {
		this.buttonLabel.state.isActive = snapper.enable;
	}

	protected onSnapperTargetChange(target: ESnapperTarget): void {
		this.buttonTarget.state.isActive = target.enable;

		const icons = this._icons;
		this.buttonTargetEye.image = target.visible ? icons.eye : icons.eye_slash;

		const listTarget = this.listTarget;
		listTarget.data.items = target.values;
		this.onSelectionChange(listTarget);
	}

	protected onSnapperGridChange(grid: ESnapperGrid): void {
		this.buttonGrid.state.isActive = grid.enable;

		const icons = this._icons;
		this.buttonGridEye.image = grid.visible ? icons.eye : icons.eye_slash;

		this.inputGridSize.input.value = grid.size;
	}

	protected onSelectionChange(listSnapTarget: DList<ESnapperTargetValue>): void {
		this.buttonTargetDelete.state.isDisabled = listSnapTarget.data.selection.isEmpty();

		const first = listSnapTarget.data.selection.first;
		const items = listSnapTarget.data.items;
		this.buttonTargetBringForward.state.isDisabled = first == null || items[0] === first;
		this.buttonTargetSendBackward.state.isDisabled =
			first == null || items[items.length - 1] === first;
	}

	protected override getType(): string {
		return "EEditorSnap";
	}
}
