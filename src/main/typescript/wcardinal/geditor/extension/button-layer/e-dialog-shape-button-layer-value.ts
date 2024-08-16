import {
	DButtonCheck,
	DDiagramEditor,
	DDialogLayered,
	DDialogLayeredOptions,
	DInputLabel,
	DInputRealAndLabel,
	DInputTextAndLabel,
	DLayoutHorizontal,
	DLayoutSpace,
	DMenu,
	DMenuItemCheckOptions,
	DMenuItemOptions,
	DSelectMultiple,
	DThemeDialogLayered
} from "@wcardinal/wcardinal-ui";
import { DisplayObject } from "pixi.js";
import { EShapeButtonLayerButtonValue } from "./e-shape-button-layer-button-value";

export interface EDialogShapeButtonLayerValueOptions
	extends DDialogLayeredOptions<
		EShapeButtonLayerButtonValue | null,
		EThemeDialogShapeButtonLayerValue
	> {
	diagram?: DDiagramEditor;
}

export interface EThemeDialogShapeButtonLayerValue extends DThemeDialogLayered {
	getInputLabelLabel(): string;
	newInputLabel(): string;
	getInputWidthLabel(): string;
	getSelectLayerLabel(): string;
	getCheckBringToFromLabel(): string;
	getCheckIsGroupedLabel(): string;
	getCheckIsActiveLabel(): string;
}

export class EDialogShapeButtonLayerValue extends DDialogLayered<
	EShapeButtonLayerButtonValue | null,
	EThemeDialogShapeButtonLayerValue,
	EDialogShapeButtonLayerValueOptions
> {
	protected _inputLabel?: DInputTextAndLabel;
	protected _inputWidth?: DInputRealAndLabel;
	protected _selectLayer?: DSelectMultiple<number>;
	protected _checkBringToFront?: DButtonCheck<string>;
	protected _checkIsGrouped?: DButtonCheck<string>;
	protected _checkIsActive?: DButtonCheck<string>;

	protected override newContentChildren(
		theme: EThemeDialogShapeButtonLayerValue,
		options?: EDialogShapeButtonLayerValueOptions
	): Array<DisplayObject | null> {
		const result = super.newContentChildren(theme, options);
		result.push(
			this.inputLabel,
			this.inputWidth,
			this.newLayoutOf(theme.getSelectLayerLabel(), this.selectLayer),
			this.newLayoutOf(null, this.checkBringToFront),
			this.newLayoutOf(null, this.checkIsGrouped),
			this.newLayoutOf(null, this.checkIsActive)
		);
		return result;
	}

	protected newLayoutOf(label: string | null, target: DisplayObject): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "padding",
			height: "auto",
			children: [this.newLayoutLabel(label), target, this.newLayoutSpace()]
		});
	}

	protected newLayoutLabel(label: string | null): DisplayObject {
		if (label != null) {
			return new DInputLabel({
				width: 60,
				text: {
					value: label
				}
			});
		} else {
			return this.newLayoutSpace();
		}
	}

	protected newLayoutSpace(): DLayoutSpace {
		return new DLayoutSpace({
			width: 60
		});
	}

	get inputLabel(): DInputTextAndLabel {
		return (this._inputLabel ??= this.newInputLabel());
	}

	protected newInputLabel(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
			label: {
				width: 60,
				text: {
					value: this.theme.getInputLabelLabel()
				}
			},
			input: {
				weight: 1,
				text: {
					value: ""
				},
				on: {
					enter: (): void => {
						this.ok();
					}
				}
			},
			space: {
				width: 60
			}
		});
	}

	get inputWidth(): DInputRealAndLabel {
		return (this._inputWidth ??= this.newInputWidth());
	}

	protected newInputWidth(): DInputRealAndLabel {
		return new DInputRealAndLabel({
			width: "padding",
			height: "auto",
			label: {
				width: 60,
				text: {
					value: this.theme.getInputWidthLabel()
				}
			},
			input: {
				weight: 1,
				text: {
					value: 0
				},
				min: 0,
				on: {
					enter: (): void => {
						this.ok();
					}
				}
			},
			space: {
				width: 60
			}
		});
	}

	get selectLayer(): DSelectMultiple<number> {
		return (this._selectLayer ??= this.newSelectLayer());
	}

	protected newSelectLayer(): DSelectMultiple<number> {
		return new DSelectMultiple<number>({
			weight: 1
		});
	}

	protected newSelectLayerMenuItemOptions(): DMenuItemOptions<number>[] {
		const diagram = this.options?.diagram;
		if (diagram != null) {
			const canvas = diagram.canvas;
			if (canvas != null) {
				const result: Array<DMenuItemCheckOptions<number>> = [];
				const layers = canvas.layer.children;
				for (let i = layers.length - 1; 0 <= i; --i) {
					const layer = layers[i];
					result.push({
						value: i,
						text: {
							value: layer.name
						},
						check: true
					});
				}
				return result;
			}
		}
		return [];
	}

	protected get checkBringToFront(): DButtonCheck<string> {
		return (this._checkBringToFront ??= this.newCheckBringToFront());
	}

	protected newCheckBringToFront(): DButtonCheck<string> {
		return new DButtonCheck<string>({
			weight: 1,
			text: {
				value: this.theme.getCheckBringToFromLabel(),
				align: {
					horizontal: "LEFT"
				}
			}
		});
	}

	protected get checkIsGrouped(): DButtonCheck<string> {
		return (this._checkIsGrouped ??= this.newCheckIsGrouped());
	}

	protected newCheckIsGrouped(): DButtonCheck<string> {
		return new DButtonCheck<string>({
			weight: 1,
			text: {
				value: this.theme.getCheckIsGroupedLabel(),
				align: {
					horizontal: "LEFT"
				}
			}
		});
	}

	protected get checkIsActive(): DButtonCheck<string> {
		return (this._checkIsActive ??= this.newCheckIsActive());
	}

	protected newCheckIsActive(): DButtonCheck<string> {
		return new DButtonCheck<string>({
			weight: 1,
			text: {
				value: this.theme.getCheckIsActiveLabel(),
				align: {
					horizontal: "LEFT"
				}
			}
		});
	}

	reset(): this {
		this.inputLabel.input.value = this.theme.newInputLabel();
		this.inputWidth.input.value = 1;
		this.selectLayer.values = [];
		this.selectLayer.menu = new DMenu<number>({
			fit: true,
			items: this.newSelectLayerMenuItemOptions()
		});
		this.checkBringToFront.state.isActive = false;
		this.checkIsGrouped.state.isActive = true;
		return this;
	}

	get value(): EShapeButtonLayerButtonValue | null {
		return new EShapeButtonLayerButtonValue(
			this.inputLabel.input.value,
			this.inputWidth.input.value,
			this.selectLayer.values.slice(0),
			this.checkBringToFront.state.isActive,
			this.checkIsGrouped.state.isActive,
			this.checkIsActive.state.isActive
		);
	}

	set value(value: EShapeButtonLayerButtonValue | null) {
		this.selectLayer.menu = new DMenu<number>({
			fit: true,
			items: this.newSelectLayerMenuItemOptions()
		});
		if (value != null) {
			this.inputLabel.input.value = value.label;
			this.inputWidth.input.value = value.weight;
			this.selectLayer.values = value.layers;
			this.checkBringToFront.state.isActive = value.bringToFront;
			this.checkIsGrouped.state.isActive = value.isGrouped;
			this.checkIsActive.state.isActive = value.isActive;
		}
	}

	protected getResolvedValue(): EShapeButtonLayerButtonValue | null {
		return this.value;
	}

	protected override getType(): string {
		return "EDialogShapeButtonLayerValue";
	}
}
