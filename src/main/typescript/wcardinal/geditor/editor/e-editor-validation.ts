import {
	DButton,
	DButtonAmbient,
	DControllers,
	DDiagramEditor,
	DDiagramLayer,
	DDialogMessage,
	DDialogOpener,
	DDialogProcessing,
	DLayoutHorizontal,
	DLayoutVertical,
	DLayoutVerticalOptions,
	DList,
	DListItem,
	DText,
	DThemeLayoutVertical,
	EShape,
	isArray
} from "@wcardinal/wcardinal-ui";
import { Texture } from "pixi.js";
import { ECommandShapeSelect } from "../command/e-command-shape-select";
import { EToolSelectSelectionStored } from "../tool/e-tool-select-selection";
import { EValidator, EValidatorResult } from "./e-validator";

export interface EEditorValidationSelection {
	set(target: EShape): boolean;
	clear(): boolean;
	isEmpty(): boolean;
	focus(): boolean;
	store(): EToolSelectSelectionStored;
	restore(stored: EToolSelectSelectionStored): void;
}

export interface EEditorValidationOptions extends DLayoutVerticalOptions<EThemeEditorValidation> {
	selection: EEditorValidationSelection;
	icons: Record<string, Texture>;
	diagram: DDiagramEditor;
	validator?: EValidator;
}

export interface EThemeEditorValidation extends DThemeLayoutVertical {
	getLabel(): string | undefined;
	getButtonRevalidateTitle(): string | undefined;
}

export class EEditorValidation extends DLayoutVertical<
	EThemeEditorValidation,
	EEditorValidationOptions
> {
	protected _selection: EEditorValidationSelection;
	protected _icons: Record<string, Texture>;
	protected _validator?: EValidator;
	protected _diagram: DDiagramEditor;

	protected _buttonRevalidate?: DButton<string>;
	protected _list?: DList<EValidatorResult>;
	protected _dialogError?: DDialogMessage;
	protected _dialogProcessing?: DDialogProcessing;

	constructor(options: EEditorValidationOptions) {
		super(options);

		// Selection
		const selection = options.selection;
		this._selection = selection;

		// Icons
		this._icons = options.icons;

		// Verifier
		this._validator = options.validator;

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
		this.addChild(
			new DLayoutHorizontal({
				x: "padding",
				width: "padding",
				height: "auto",
				children: [this.newTextLabel(), this.buttonRevalidate]
			})
		);
		this.addChild(this.list);
	}

	protected newTextLabel(): DText<string> {
		return new DText<string>({
			weight: 1,
			text: {
				value: this.theme.getLabel()
			}
		});
	}

	protected get buttonRevalidate(): DButton<string> {
		let result = this._buttonRevalidate;
		if (result == null) {
			result = this.newButtonRevalidate();
			this._buttonRevalidate = result;
		}
		return result;
	}

	protected newButtonRevalidate(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.refresh
			},
			title: this.theme.getButtonRevalidateTitle(),
			on: {
				active: (emitter): void => {
					this.onButtonValidateActive(emitter);
				}
			}
		});
	}

	protected onButtonValidateActive(opener?: DDialogOpener): void {
		const validator = this._validator;
		if (validator != null) {
			const canvas = this._diagram.canvas;
			if (canvas != null) {
				const dialogProcessing = this.dialogProcessing;
				dialogProcessing.open(opener);
				const data = this.list.data;
				try {
					const result = validator(canvas);
					if (isArray(result)) {
						data.clearAndAddAll(result);
						dialogProcessing.resolve();
					} else {
						result.then(
							(results) => {
								data.clearAndAddAll(results);
								dialogProcessing.resolve();
							},
							() => {
								data.clear();
								dialogProcessing.reject();
							}
						);
					}
				} catch {
					data.clear();
					dialogProcessing.reject();
				}
			}
		}
	}

	get list(): DList<EValidatorResult> {
		let result = this._list;
		if (result == null) {
			result = this.newList();
			this._list = result;
		}
		return result;
	}

	protected newList(): DList<EValidatorResult> {
		const result = new DList<EValidatorResult>({
			width: "padding",
			weight: 1,
			data: {
				toLabel: (value: EValidatorResult): string => {
					return value.message;
				}
			},
			updater: {
				newItem: (data) => {
					return new DListItem<EValidatorResult>(data, {
						on: {
							select: (value, item): void => {
								this.onListItemDown(value, item);
							}
						}
					});
				}
			}
		});
		return result;
	}

	protected onListItemDown(value: EValidatorResult, item: DListItem<EValidatorResult>): void {
		const shape = value.shape;
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
		let result = this._dialogError;
		if (result == null) {
			result = this.newDialogError();
			this._dialogError = result;
		}
		return result;
	}

	protected newDialogError(): DDialogMessage {
		return new DDialogMessage({
			message: "No shapes found."
		});
	}

	protected get dialogProcessing(): DDialogProcessing {
		let result = this._dialogProcessing;
		if (result == null) {
			result = this.newDialogProcessing();
			this._dialogProcessing = result;
		}
		return result;
	}

	protected newDialogProcessing(): DDialogProcessing {
		return new DDialogProcessing({
			footer: {
				button: {
					ok: "OK",
					cancel: null
				}
			}
		});
	}

	protected override getType(): string {
		return "EEditorValidation";
	}
}
