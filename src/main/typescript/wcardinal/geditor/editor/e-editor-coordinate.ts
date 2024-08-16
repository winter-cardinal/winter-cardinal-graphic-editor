import {
	DButton,
	DButtonAmbient,
	DButtonCheck,
	DInputRealAndLabel,
	DInputTextAndLabel,
	DLayoutHorizontal,
	DLayoutSpace,
	DLayoutVertical,
	DLayoutVerticalOptions,
	DText,
	DThemeLayoutVertical,
	EShape,
	EShapeCapabilities,
	EShapeCapability
} from "@wcardinal/wcardinal-ui";
import { Rectangle, Texture } from "pixi.js";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";

export interface EEditorCoordinateOptions extends DLayoutVerticalOptions<EThemeEditorCoordinate> {
	selection: EToolSelectSelection;
	icons: Record<string, Texture>;
}

export interface EThemeEditorCoordinate extends DThemeLayoutVertical {
	getLabel(): string | undefined;
	getInputIdLabel(): string | undefined;
	getInputPositionXLabel(): string | undefined;
	getInputPositionYLabel(): string | undefined;
	getInputPositionLeftLabel(): string | undefined;
	getInputPositionTopLabel(): string | undefined;
	getInputSizeXLabel(): string | undefined;
	getInputSizeYLabel(): string | undefined;
	getInputRotationLabel(): string | undefined;
	getInputSkewLabel(): string | undefined;
	getButtonAlignLeftTitle(): string | undefined;
	getButtonAlignCenterTitle(): string | undefined;
	getButtonAlignRightTitle(): string | undefined;
	getButtonAlignTopTitle(): string | undefined;
	getButtonAlignMiddleTitle(): string | undefined;
	getButtonAlignBottomTitle(): string | undefined;
	getButtonDistributeHorizontallyTitle(): string | undefined;
	getButtonDistributeVerticallyTitle(): string | undefined;
	getButtonRotateLeftTitle(): string | undefined;
	getButtonRotateRightTitle(): string | undefined;
}

const textFormat = (value: number): string => {
	return `${+value.toFixed(2)}`;
};

const textFormatDegree = (value: number): string => {
	return textFormat((value / Math.PI) * 180);
};

const textUnformatDegree = (text: string): number => {
	return (parseFloat(text) / 180) * Math.PI;
};

export class EEditorCoordinate extends DLayoutVertical<
	EThemeEditorCoordinate,
	EEditorCoordinateOptions
> {
	protected _selection: EToolSelectSelection;
	protected _icons: Record<string, Texture>;
	protected _workRectangle: Rectangle;

	protected _inputId?: DInputTextAndLabel;
	protected _inputPositionX?: DInputRealAndLabel;
	protected _inputPositionY?: DInputRealAndLabel;
	protected _inputPositionTop?: DInputRealAndLabel;
	protected _inputPositionLeft?: DInputRealAndLabel;
	protected _inputSizeX?: DInputRealAndLabel;
	protected _inputSizeY?: DInputRealAndLabel;
	protected _inputRotation?: DInputRealAndLabel;
	protected _inputSkew?: DInputRealAndLabel;

	protected _layoutAlignHorizontally?: DLayoutHorizontal;
	protected _layoutAlignVertically?: DLayoutHorizontal;
	protected _buttonAlignLeft?: DButton<string>;
	protected _buttonAlignCenter?: DButton<string>;
	protected _buttonAlignRight?: DButton<string>;
	protected _buttonAlignTop?: DButton<string>;
	protected _buttonAlignMiddle?: DButton<string>;
	protected _buttonAlignBottom?: DButton<string>;
	protected _buttonDistributeHorizontally?: DButton<string>;
	protected _buttonDistributeVertically?: DButton<string>;
	protected _buttonRotateLeft?: DButton<string>;
	protected _buttonRotateRight?: DButton<string>;
	protected _buttonLock?: DButtonCheck<string>;

	protected _updateInputShape: EShape | null;
	protected _updateInputId: number | null;
	protected _isUpdateInputShapeChanged: boolean;
	protected _renderInputsBound: () => void;

	constructor(options: EEditorCoordinateOptions) {
		super(options);

		this._icons = options.icons;
		this._selection = options.selection;
		this._workRectangle = new Rectangle();

		// Input updater
		this._updateInputShape = null;
		this._updateInputId = null;
		this._isUpdateInputShapeChanged = false;
		this._renderInputsBound = (): void => {
			this.renderInputs();
		};

		//
		this.addChild(this.newTextLabel());
		this.addChild(this.inputId);
		this.addChild(this.inputPositionX);
		this.addChild(this.inputPositionY);
		this.addChild(this.inputPositionLeft);
		this.addChild(this.inputPositionTop);
		this.addChild(this.inputSizeX);
		this.addChild(this.inputSizeY);
		this.addChild(this.inputRotation);
		this.addChild(this.inputSkew);
		this.addChild(this.layoutAlignHorizontally);
		this.addChild(this.layoutAlignVertically);

		//
		const selection = this._selection;
		selection.on("change", (): void => {
			this.onSelectionChange(selection);
		});
		this.onSelectionChange(selection);
	}

	protected newTextLabel(): DText<string> {
		return new DText<string>({
			width: "100%",
			text: {
				value: this.theme.getLabel()
			}
		});
	}

	protected get inputId(): DInputTextAndLabel {
		let result = this._inputId;
		if (result == null) {
			result = this.newInputId();
			this._inputId = result;
		}
		return result;
	}

	protected newInputId(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
			label: {
				text: {
					value: this.theme.getInputIdLabel()
				}
			},
			input: {
				weight: 1,
				on: {
					change: (value: string): void => {
						this._selection.setId(value);
					}
				}
			}
		});
	}

	protected get inputPositionX(): DInputRealAndLabel {
		let result = this._inputPositionX;
		if (result == null) {
			result = this.newInputPositionX();
			this._inputPositionX = result;
		}
		return result;
	}

	protected newInputPositionX(): DInputRealAndLabel {
		return new DInputRealAndLabel({
			width: "padding",
			height: "auto",
			label: {
				text: {
					value: this.theme.getInputPositionXLabel()
				}
			},
			input: {
				weight: 1,
				step: 1,
				text: {
					value: 0,
					formatter: textFormat
				},
				on: {
					input: (value: number): void => {
						this._selection.setPositionX(value);
					}
				}
			}
		});
	}

	protected get inputPositionY(): DInputRealAndLabel {
		let result = this._inputPositionY;
		if (result == null) {
			result = this.newInputPositionY();
			this._inputPositionY = result;
		}
		return result;
	}

	protected newInputPositionY(): DInputRealAndLabel {
		return new DInputRealAndLabel({
			width: "padding",
			height: "auto",
			label: {
				text: {
					value: this.theme.getInputPositionYLabel()
				}
			},
			input: {
				weight: 1,
				step: 1,
				text: {
					value: 0,
					formatter: textFormat
				},
				on: {
					input: (value: number): void => {
						this._selection.setPositionY(value);
					}
				}
			}
		});
	}

	protected get inputPositionLeft(): DInputRealAndLabel {
		let result = this._inputPositionLeft;
		if (result == null) {
			result = this.newInputPositionLeft();
			this._inputPositionLeft = result;
		}
		return result;
	}

	protected newInputPositionLeft(): DInputRealAndLabel {
		return new DInputRealAndLabel({
			width: "padding",
			height: "auto",
			label: {
				text: {
					value: this.theme.getInputPositionLeftLabel()
				}
			},
			input: {
				weight: 1,
				step: 1,
				text: {
					value: 0,
					formatter: textFormat
				},
				on: {
					input: (value: number): void => {
						this._selection.setPositionLeft(value);
					}
				}
			}
		});
	}

	protected get inputPositionTop(): DInputRealAndLabel {
		let result = this._inputPositionTop;
		if (result == null) {
			result = this.newInputPositionTop();
			this._inputPositionTop = result;
		}
		return result;
	}

	protected newInputPositionTop(): DInputRealAndLabel {
		return new DInputRealAndLabel({
			width: "padding",
			height: "auto",
			label: {
				text: {
					value: this.theme.getInputPositionTopLabel()
				}
			},
			input: {
				weight: 1,
				step: 1,
				text: {
					value: 0,
					formatter: textFormat
				},
				on: {
					input: (value: number): void => {
						this._selection.setPositionTop(value);
					}
				}
			}
		});
	}

	protected get inputSizeX(): DInputRealAndLabel {
		let result = this._inputSizeX;
		if (result == null) {
			result = this.newInputSizeX();
			this._inputSizeX = result;
		}
		return result;
	}

	protected newInputSizeX(): DInputRealAndLabel {
		return new DInputRealAndLabel({
			width: "padding",
			height: "auto",
			label: {
				text: {
					value: this.theme.getInputSizeXLabel()
				}
			},
			input: {
				weight: 1,
				step: 1,
				text: {
					value: 0,
					formatter: textFormat
				},
				on: {
					input: (value: number): void => {
						this._selection.setSizeX(value);
					}
				}
			}
		});
	}

	protected get inputSizeY(): DInputRealAndLabel {
		let result = this._inputSizeY;
		if (result == null) {
			result = this.newInputSizeY();
			this._inputSizeY = result;
		}
		return result;
	}

	protected newInputSizeY(): DInputRealAndLabel {
		return new DInputRealAndLabel({
			width: "padding",
			height: "auto",
			label: {
				text: {
					value: this.theme.getInputSizeYLabel()
				}
			},
			input: {
				weight: 1,
				step: 1,
				text: {
					value: 0,
					formatter: textFormat
				},
				on: {
					input: (value: number): void => {
						this._selection.setSizeY(value);
					}
				}
			}
		});
	}

	protected get inputRotation(): DInputRealAndLabel {
		let result = this._inputRotation;
		if (result == null) {
			result = this.newInputRotation();
			this._inputRotation = result;
		}
		return result;
	}

	protected newInputRotation(): DInputRealAndLabel {
		return new DInputRealAndLabel({
			width: "padding",
			height: "auto",
			label: {
				text: {
					value: this.theme.getInputRotationLabel()
				}
			},
			input: {
				weight: 1,
				step: 1,
				text: {
					value: 0,
					formatter: textFormatDegree
				},
				editing: {
					unformatter: textUnformatDegree
				},
				on: {
					input: (value: number): void => {
						this._selection.setRotation(value);
					}
				}
			}
		});
	}

	protected get inputSkew(): DInputRealAndLabel {
		let result = this._inputSkew;
		if (result == null) {
			result = this.newInputSkew();
			this._inputSkew = result;
		}
		return result;
	}

	protected newInputSkew(): DInputRealAndLabel {
		return new DInputRealAndLabel({
			width: "padding",
			height: "auto",
			label: {
				text: {
					value: this.theme.getInputSkewLabel()
				}
			},
			input: {
				weight: 1,
				step: 1,
				text: {
					value: 0,
					formatter: textFormatDegree
				},
				editing: {
					unformatter: textUnformatDegree
				},
				on: {
					input: (value: number): void => {
						this._selection.setSkew(value);
					}
				}
			}
		});
	}

	protected get layoutAlignHorizontally(): DLayoutHorizontal {
		let result = this._layoutAlignHorizontally;
		if (result == null) {
			result = this.newLayoutAlignHorizontally();
			this._layoutAlignHorizontally = result;
		}
		return result;
	}

	protected newLayoutAlignHorizontally(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "padding",
			height: "auto",
			children: [
				new DLayoutSpace({ weight: 1 }),
				this.buttonAlignLeft,
				this.buttonAlignCenter,
				this.buttonAlignRight,
				this.buttonDistributeHorizontally,
				this.buttonDistributeVertically,
				this.buttonLock,
				new DLayoutSpace({ weight: 1 })
			]
		});
	}

	protected get layoutAlignVertically(): DLayoutHorizontal {
		let result = this._layoutAlignVertically;
		if (result == null) {
			result = this.newLayoutAlignVertically();
			this._layoutAlignVertically = result;
		}
		return result;
	}

	protected newLayoutAlignVertically(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "padding",
			height: "auto",
			children: [
				new DLayoutSpace({ weight: 1 }),
				this.buttonAlignTop,
				this.buttonAlignMiddle,
				this.buttonAlignBottom,
				this.buttonRotateLeft,
				this.buttonRotateRight,
				new DLayoutSpace({ weight: 1 })
			]
		});
	}

	protected get buttonAlignLeft(): DButton<string> {
		let result = this._buttonAlignLeft;
		if (result == null) {
			result = this.newButtonAlignLeft();
			this._buttonAlignLeft = result;
		}
		return result;
	}

	protected newButtonAlignLeft(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.editor_coordinate_align_left
			},
			title: this.theme.getButtonAlignLeftTitle(),
			on: {
				active: (): void => {
					const selection = this._selection;
					selection.saveForTranslate();
					selection.alignLeft();
				}
			}
		});
	}

	protected get buttonAlignCenter(): DButton<string> {
		let result = this._buttonAlignCenter;
		if (result == null) {
			result = this.newButtonAlignCenter();
			this._buttonAlignCenter = result;
		}
		return result;
	}

	protected newButtonAlignCenter(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.editor_coordinate_align_center
			},
			title: this.theme.getButtonAlignCenterTitle(),
			on: {
				active: (): void => {
					const selection = this._selection;
					selection.saveForTranslate();
					selection.alignCenter();
				}
			}
		});
	}

	protected get buttonAlignRight(): DButton<string> {
		let result = this._buttonAlignRight;
		if (result == null) {
			result = this.newButtonAlignRight();
			this._buttonAlignRight = result;
		}
		return result;
	}

	protected newButtonAlignRight(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.editor_coordinate_align_right
			},
			title: this.theme.getButtonAlignRightTitle(),
			on: {
				active: (): void => {
					const selection = this._selection;
					selection.saveForTranslate();
					selection.alignRight();
				}
			}
		});
	}

	protected get buttonAlignTop(): DButton<string> {
		let result = this._buttonAlignTop;
		if (result == null) {
			result = this.newButtonAlignTop();
			this._buttonAlignTop = result;
		}
		return result;
	}

	protected newButtonAlignTop(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.editor_coordinate_align_top
			},
			title: this.theme.getButtonAlignTopTitle(),
			on: {
				active: (): void => {
					const selection = this._selection;
					selection.saveForTranslate();
					selection.alignTop();
				}
			}
		});
	}

	protected get buttonAlignMiddle(): DButton<string> {
		let result = this._buttonAlignMiddle;
		if (result == null) {
			result = this.newButtonAlignMiddle();
			this._buttonAlignMiddle = result;
		}
		return result;
	}

	protected newButtonAlignMiddle(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.editor_coordinate_align_middle
			},
			title: this.theme.getButtonAlignMiddleTitle(),
			on: {
				active: (): void => {
					const selection = this._selection;
					selection.saveForTranslate();
					selection.alignMiddle();
				}
			}
		});
	}

	protected get buttonAlignBottom(): DButton<string> {
		let result = this._buttonAlignBottom;
		if (result == null) {
			result = this.newButtonAlignBottom();
			this._buttonAlignBottom = result;
		}
		return result;
	}

	protected newButtonAlignBottom(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.editor_coordinate_align_bottom
			},
			title: this.theme.getButtonAlignBottomTitle(),
			on: {
				active: (): void => {
					const selection = this._selection;
					selection.saveForTranslate();
					selection.alignBottom();
				}
			}
		});
	}

	protected get buttonDistributeHorizontally(): DButton<string> {
		let result = this._buttonDistributeHorizontally;
		if (result == null) {
			result = this.newButtonDistributeHorizontally();
			this._buttonDistributeHorizontally = result;
		}
		return result;
	}

	protected newButtonDistributeHorizontally(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.editor_coordinate_distribute_horizontally
			},
			title: this.theme.getButtonDistributeHorizontallyTitle(),
			on: {
				active: (): void => {
					const selection = this._selection;
					selection.saveForTranslate();
					selection.distributeHorizontally();
				}
			}
		});
	}

	protected get buttonDistributeVertically(): DButton<string> {
		let result = this._buttonDistributeVertically;
		if (result == null) {
			result = this.newButtonDistributeVertically();
			this._buttonDistributeVertically = result;
		}
		return result;
	}

	protected newButtonDistributeVertically(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.editor_coordinate_distribute_vertically
			},
			title: this.theme.getButtonDistributeVerticallyTitle(),
			on: {
				active: (): void => {
					const selection = this._selection;
					selection.saveForTranslate();
					selection.distributeVertically();
				}
			}
		});
	}

	protected get buttonRotateLeft(): DButton<string> {
		let result = this._buttonRotateLeft;
		if (result == null) {
			result = this.newButtonRotateLeft();
			this._buttonRotateLeft = result;
		}
		return result;
	}

	protected newButtonRotateLeft(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.editor_coordinate_rotate_left
			},
			title: this.theme.getButtonRotateLeftTitle(),
			on: {
				active: (): void => {
					const selection = this._selection;
					if (selection.prepareRotate()) {
						selection.saveForRotate();
						selection.rotate(-0.5 * Math.PI);
						selection.finalize();
					}
				}
			}
		});
	}

	protected get buttonRotateRight(): DButton<string> {
		let result = this._buttonRotateRight;
		if (result == null) {
			result = this.newButtonRotateRight();
			this._buttonRotateRight = result;
		}
		return result;
	}

	protected newButtonRotateRight(): DButton<string> {
		return new DButtonAmbient<string>({
			width: 30,
			image: {
				source: this._icons.editor_coordinate_rotate_right
			},
			title: this.theme.getButtonRotateRightTitle(),
			on: {
				active: (): void => {
					const selection = this._selection;
					if (selection.prepareRotate()) {
						selection.saveForRotate();
						selection.rotate(+0.5 * Math.PI);
						selection.finalize();
					}
				}
			}
		});
	}

	protected get buttonLock(): DButtonCheck<string> {
		let result = this._buttonLock;
		if (result == null) {
			result = this.newButtonLock();
			this._buttonLock = result;
		}
		return result;
	}

	protected newButtonLock(): DButtonCheck<string> {
		return new DButtonCheck<string>({
			theme: "EButtonEditorLock",
			on: {
				active: (): void => {
					this._selection.lockCapability(EShapeCapability.COORDINATE);
				},
				inactive: (): void => {
					this._selection.unlockCapability(EShapeCapability.COORDINATE);
				}
			}
		});
	}

	protected onSelectionChange(selection: EToolSelectSelection): void {
		const last = selection.last();
		this.state.isDisabled = last == null;

		const hasPositionCapability = EShapeCapabilities.contains(last, EShapeCapability.POSITION);
		this.inputPositionX.state.isEnabled = hasPositionCapability;
		this.inputPositionY.state.isEnabled = hasPositionCapability;
		this.inputPositionLeft.state.isEnabled = hasPositionCapability;
		this.inputPositionTop.state.isEnabled = hasPositionCapability;
		this.inputRotation.state.isEnabled = EShapeCapabilities.contains(
			last,
			EShapeCapability.ROTATION
		);
		this.inputSizeX.state.isEnabled = EShapeCapabilities.contains(last, EShapeCapability.WIDTH);
		this.inputSizeY.state.isEnabled = EShapeCapabilities.contains(
			last,
			EShapeCapability.HEIGHT
		);
		this.inputSkew.state.isEnabled = EShapeCapabilities.contains(last, EShapeCapability.SKEW);
		this.buttonLock.state.isActive = this.isLocked(last);

		this.updateInputs(selection.get());
	}

	protected isLocked(last: EShape | null): boolean {
		if (last == null) {
			return false;
		}
		const capability = last.getCapability();
		if (capability == null) {
			return false;
		}
		const target = EShapeCapability.COORDINATE;
		if (capability.locked & target) {
			return true;
		}
		return false;
	}

	renderInputs(): void {
		this._updateInputId = null;
		if (this._isUpdateInputShapeChanged) {
			this._isUpdateInputShapeChanged = false;
			const shape = this._updateInputShape;
			if (shape != null) {
				const transform = shape.transform;
				const position = transform.position;
				const size = shape.size;

				this.inputId.input.value = shape.id;
				this.inputPositionX.input.value = position.x;
				this.inputPositionY.input.value = position.y;
				this.inputSizeX.input.value = size.x;
				this.inputSizeY.input.value = size.y;
				this.inputRotation.input.value = transform.rotation;
				this.inputSkew.input.value = transform.skew.x;

				const rectangle = this._workRectangle;
				shape.getBoundsLocal(false, rectangle);
				this.inputPositionLeft.input.value = rectangle.x;
				this.inputPositionTop.input.value = rectangle.y;
			}
			this._updateInputId = window.setTimeout(this._renderInputsBound, 100);
		}
	}

	updateInputs(shapes: EShape[]): void {
		const shape = 0 < shapes.length ? shapes[shapes.length - 1] : null;
		this._updateInputShape = shape;
		this._isUpdateInputShapeChanged = true;
		if (this._updateInputId == null) {
			this.renderInputs();
		}
	}

	protected override getType(): string {
		return "EEditorCoordinate";
	}
}
