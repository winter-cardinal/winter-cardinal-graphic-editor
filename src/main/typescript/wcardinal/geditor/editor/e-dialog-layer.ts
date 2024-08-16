import {
	DBase,
	DButtonCheck,
	DButtonColor,
	DDialogLayered,
	DDialogLayeredOptions,
	DInputLabel,
	DInputReal,
	DInputTextAndLabel,
	DLayoutHorizontal,
	DLayoutSpace,
	DSelectMultiple,
	DThemeDialogLayered,
	EShapeActionValueGestureOperationType
} from "@wcardinal/wcardinal-ui";
import { DisplayObject } from "pixi.js";
import { EDialogLayerValue } from "./e-dialog-layer-value";
import { EDialogLayerValueBackground } from "./e-dialog-layer-value-background";

export interface EThemeDialogLayer extends DThemeDialogLayered {
	getInputNameLabel(): string | undefined;
	getInputPositionLabel(): string | undefined;
	getInputSizeLabel(): string | undefined;
	getTextBackgroundLabel(): string | undefined;
	getCheckBackgroundLabel(): string | undefined;
	getCheckVisibleLabel(): string | undefined;
	getCheckInteractiveLabel(): string | undefined;
	getSelectGestureLabel(): string | undefined;
	getSelectGestureValueLabel(type: EShapeActionValueGestureOperationType): string | undefined;
}

export class EDialogLayer extends DDialogLayered<EDialogLayerValue | null, EThemeDialogLayer> {
	protected _inputName?: DInputTextAndLabel;
	protected _inputX?: DInputReal;
	protected _inputY?: DInputReal;
	protected _inputPositionLayout?: DLayoutHorizontal;
	protected _inputWidth?: DInputReal;
	protected _inputHeight?: DInputReal;
	protected _inputSizeLayout?: DLayoutHorizontal;
	protected _checkBackground?: DButtonCheck<string>;
	protected _checkBackgroundLayout?: DLayoutHorizontal;
	protected _colorBackground?: DButtonColor;
	protected _colorBackgroundLayout?: DLayoutHorizontal;
	protected _checkVisible?: DButtonCheck<string>;
	protected _checkVisibleLayout?: DLayoutHorizontal;
	protected _checkInteractive?: DButtonCheck<string>;
	protected _checkInteractiveLayout?: DLayoutHorizontal;
	protected _selectGesture?: DSelectMultiple<EShapeActionValueGestureOperationType>;
	protected _selectGestureLayout?: DLayoutHorizontal;

	protected override newContentChildren(
		theme: EThemeDialogLayer,
		options?: DDialogLayeredOptions<EDialogLayerValue | null, EThemeDialogLayer>
	): Array<DisplayObject | null> {
		const result = super.newContentChildren(theme, options);
		result.push(
			this.inputName,
			this.inputPositionLayout,
			this.inputSizeLayout,
			this.checkBackgroundLayout,
			this.colorBackgroundLayout,
			this.selectGestureLayout,
			this.checkVisibleLayout,
			this.checkInteractiveLayout
		);
		return result;
	}

	protected newLabel(label: string): DInputLabel {
		return new DInputLabel({
			width: 60,
			text: {
				value: label
			}
		});
	}

	protected newSpace(): DLayoutSpace {
		return new DLayoutSpace({
			width: 60
		});
	}

	protected newLabeled<INPUT_A extends DBase, INPUT_B extends DBase>(
		label: string | null | undefined,
		inputA: INPUT_A,
		inputB: INPUT_B | null
	): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "padding",
			height: "auto",
			children: [
				label != null ? this.newLabel(label) : this.newSpace(),
				inputA,
				inputB,
				this.newSpace()
			]
		});
	}

	protected get inputName(): DInputTextAndLabel {
		let result = this._inputName;
		if (result == null) {
			result = this.newInputName();
			this._inputName = result;
		}
		return result;
	}

	protected newInputName(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
			label: {
				width: 60,
				text: {
					value: this.theme.getInputNameLabel()
				}
			},
			input: {
				weight: 1,
				text: {
					value: ""
				},
				on: {
					enter: () => {
						this.ok();
					}
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected get inputX(): DInputReal {
		let result = this._inputX;
		if (result == null) {
			result = this.newInputX();
			this._inputX = result;
		}
		return result;
	}

	protected newInputX(): DInputReal {
		return new DInputReal({
			weight: 1,
			on: {
				enter: () => {
					this.ok();
				}
			}
		});
	}

	protected get inputY(): DInputReal {
		let result = this._inputY;
		if (result == null) {
			result = this.newInputY();
			this._inputY = result;
		}
		return result;
	}

	protected newInputY(): DInputReal {
		return new DInputReal({
			weight: 1,
			on: {
				enter: () => {
					this.ok();
				}
			}
		});
	}

	protected get inputPositionLayout(): DLayoutHorizontal {
		let result = this._inputPositionLayout;
		if (result == null) {
			result = this.newLabeled(this.theme.getInputPositionLabel(), this.inputX, this.inputY);
			this._inputPositionLayout = result;
		}
		return result;
	}

	protected get inputWidth(): DInputReal {
		let result = this._inputWidth;
		if (result == null) {
			result = this.newInputWidth();
			this._inputWidth = result;
		}
		return result;
	}

	protected newInputWidth(): DInputReal {
		return new DInputReal({
			weight: 1,
			on: {
				enter: () => {
					this.ok();
				}
			}
		});
	}

	protected get inputHeight(): DInputReal {
		let result = this._inputHeight;
		if (result == null) {
			result = this.newInputHeight();
			this._inputHeight = result;
		}
		return result;
	}

	protected newInputHeight(): DInputReal {
		return new DInputReal({
			weight: 1,
			on: {
				enter: () => {
					this.ok();
				}
			}
		});
	}

	protected get inputSizeLayout(): DLayoutHorizontal {
		let result = this._inputSizeLayout;
		if (result == null) {
			result = this.newLabeled(
				this.theme.getInputSizeLabel(),
				this.inputWidth,
				this.inputHeight
			);
			this._inputSizeLayout = result;
		}
		return result;
	}

	protected get checkBackground(): DButtonCheck<string> {
		let result = this._checkBackground;
		if (result == null) {
			result = this.newCheckBackground();
			this._checkBackground = result;
		}
		return result;
	}

	protected newCheckBackground(): DButtonCheck<string> {
		return new DButtonCheck<string>({
			weight: 1,
			text: {
				value: this.theme.getCheckBackgroundLabel(),
				align: {
					horizontal: "LEFT"
				}
			},
			on: {
				active: (): void => {
					this.onCheckBackgroundChange(true);
				},

				inactive: (): void => {
					this.onCheckBackgroundChange(false);
				}
			}
		});
	}

	protected onCheckBackgroundChange(isActive: boolean): void {
		this.colorBackground.state.isDisabled = !isActive;
	}

	protected get checkBackgroundLayout(): DLayoutHorizontal {
		let result = this._checkBackgroundLayout;
		if (result == null) {
			result = this.newLabeled(
				this.theme.getTextBackgroundLabel(),
				this.checkBackground,
				null
			);
			this._checkBackgroundLayout = result;
		}
		return result;
	}

	protected get colorBackground(): DButtonColor {
		let result = this._colorBackground;
		if (result == null) {
			result = this.newColorBackground();
			this._colorBackground = result;
		}
		return result;
	}

	protected newColorBackground(): DButtonColor {
		return new DButtonColor({
			weight: 1
		});
	}

	protected get colorBackgroundLayout(): DLayoutHorizontal {
		let result = this._colorBackgroundLayout;
		if (result == null) {
			result = this.newLabeled(null, this.colorBackground, null);
			this._colorBackgroundLayout = result;
		}
		return result;
	}

	protected get checkVisible(): DButtonCheck<string> {
		let result = this._checkVisible;
		if (result == null) {
			result = this.newCheckVisible();
			this._checkVisible = result;
		}
		return result;
	}

	protected newCheckVisible(): DButtonCheck<string> {
		return new DButtonCheck<string>({
			weight: 1,
			text: {
				value: this.theme.getCheckVisibleLabel(),
				align: {
					horizontal: "LEFT"
				}
			}
		});
	}

	protected get checkVisibleLayout(): DLayoutHorizontal {
		let result = this._checkVisibleLayout;
		if (result == null) {
			result = this.newLabeled(null, this.checkVisible, null);
			this._checkVisibleLayout = result;
		}
		return result;
	}

	protected get checkInteractive(): DButtonCheck<string> {
		let result = this._checkInteractive;
		if (result == null) {
			result = this.newCheckInteractive();
			this._checkInteractive = result;
		}
		return result;
	}

	protected newCheckInteractive(): DButtonCheck<string> {
		return new DButtonCheck<string>({
			weight: 1,
			text: {
				value: this.theme.getCheckInteractiveLabel(),
				align: {
					horizontal: "LEFT"
				}
			}
		});
	}

	protected get checkInteractiveLayout(): DLayoutHorizontal {
		let result = this._checkInteractiveLayout;
		if (result == null) {
			result = this.newLabeled(null, this.checkInteractive, null);
			this._checkInteractiveLayout = result;
		}
		return result;
	}

	protected get selectGesture(): DSelectMultiple<EShapeActionValueGestureOperationType> {
		let result = this._selectGesture;
		if (result == null) {
			result = this.newSelectGesture();
			this._selectGesture = result;
		}
		return result;
	}

	protected newSelectGesture(): DSelectMultiple<EShapeActionValueGestureOperationType> {
		const theme = this.theme;
		return new DSelectMultiple<EShapeActionValueGestureOperationType>({
			weight: 1,
			values: this.fromGestureOperationType(EShapeActionValueGestureOperationType.ALL),
			menu: {
				items: [
					{
						value: EShapeActionValueGestureOperationType.DRAG,
						text: {
							value: theme.getSelectGestureValueLabel(
								EShapeActionValueGestureOperationType.DRAG
							)
						},
						check: true
					},
					{
						value: EShapeActionValueGestureOperationType.PINCH,
						text: {
							value: theme.getSelectGestureValueLabel(
								EShapeActionValueGestureOperationType.PINCH
							)
						},
						check: true
					}
				]
			}
		});
	}

	protected toGestureOperationType(
		types: EShapeActionValueGestureOperationType[]
	): EShapeActionValueGestureOperationType {
		let result = EShapeActionValueGestureOperationType.NONE;
		for (let i = 0, imax = types.length; i < imax; ++i) {
			result |= types[i];
		}
		return result;
	}

	protected fromGestureOperationType(
		type: EShapeActionValueGestureOperationType
	): EShapeActionValueGestureOperationType[] {
		const result: EShapeActionValueGestureOperationType[] = [];
		if (type & EShapeActionValueGestureOperationType.DRAG) {
			result.push(EShapeActionValueGestureOperationType.DRAG);
		}
		if (type & EShapeActionValueGestureOperationType.PINCH) {
			result.push(EShapeActionValueGestureOperationType.PINCH);
		}
		return result;
	}

	protected get selectGestureLayout(): DLayoutHorizontal {
		let result = this._selectGestureLayout;
		if (result == null) {
			result = this.newLabeled(this.theme.getSelectGestureLabel(), this.selectGesture, null);
			this._selectGestureLayout = result;
		}
		return result;
	}

	reset(width: number, height: number): this {
		this.inputName.input.value = "";
		this.inputX.value = 0;
		this.inputY.value = 0;
		this.inputWidth.value = width;
		this.inputHeight.value = height;
		this.checkBackground.state.isActive = false;
		this.colorBackground.value.color = 0xffffff;
		this.colorBackground.value.alpha = 1;
		this.checkVisible.state.isActive = true;
		this.checkInteractive.state.isActive = true;
		this.selectGesture.values = [];
		this.onCheckBackgroundChange(false);
		return this;
	}

	get value(): EDialogLayerValue | null {
		return new EDialogLayerValue(
			this.inputName.input.value,
			this.inputX.value,
			this.inputY.value,
			this.inputWidth.value,
			this.inputHeight.value,
			new EDialogLayerValueBackground(
				this.checkBackground.state.isActive,
				this.colorBackground.value.color,
				this.colorBackground.value.alpha
			),
			this.checkVisible.state.isActive,
			this.checkInteractive.state.isActive,
			this.toGestureOperationType(this.selectGesture.values)
		);
	}

	set value(value: EDialogLayerValue | null) {
		if (value != null) {
			this.inputName.input.value = value.name;
			this.inputX.value = value.x;
			this.inputY.value = value.y;
			this.inputWidth.value = value.width;
			this.inputHeight.value = value.height;
			this.checkBackground.state.isActive = value.background.enable;
			this.colorBackground.value.color = value.background.color;
			this.colorBackground.value.alpha = value.background.alpha;
			this.checkVisible.state.isActive = value.visible;
			this.checkInteractive.state.isActive = value.interactive;
			this.selectGesture.values = this.fromGestureOperationType(value.gesture);
			this.onCheckBackgroundChange(value.background.enable);
		}
	}

	protected getResolvedValue(): EDialogLayerValue | null {
		return this.value;
	}

	protected getType(): string {
		return "EDialogLayer";
	}
}
