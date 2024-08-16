import {
	DDialogLayered,
	DDialogLayeredOptions,
	DInputInteger,
	DInputIntegerAndLabel,
	DInputLabel,
	DInputRealAndLabel,
	DInputTextAndLabel,
	DLayoutHorizontal,
	DLayoutSpace,
	DMenuItemOptionsUnion,
	DSelect,
	DThemeDialogLayered,
	EShapeDataValue,
	EShapeDataValueExtensions,
	EShapeDataValueImpl,
	EShapeDataValueOrder,
	EShapeDataValueRangeType,
	EShapeDataValueScope,
	EShapeDataValueType
} from "@wcardinal/wcardinal-ui";
import { DisplayObject } from "pixi.js";

export interface EThemeDialogDataValue extends DThemeDialogLayered {
	getInputIdLabel(): string | undefined;
	getInputAsLabel(): string | undefined;
	getSelectTypeLabel(): string | undefined;
	getSelectTypeValueLabel(type: EShapeDataValueType): string | undefined;
	getSelectScopeLabel(): string | undefined;
	getSelectScopeValueLabel(type: EShapeDataValueScope): string | undefined;
	getInputInitialLabel(): string | undefined;
	getInputIntervalLabel(): string | undefined;
	getInputIntervalUnitLabel(): string | undefined;
	getInputFormatLabel(): string | undefined;
	getSelectRangeTypeLabel(): string | undefined;
	getSelectRangeTypeValueLabel(type: EShapeDataValueRangeType): string | undefined;
	getInputRangeFromLabel(): string | undefined;
	getInputRangeToLabel(): string | undefined;
	getInputCapacityLabel(): string | undefined;
	getSelectOrderLabel(): string | undefined;
	getSelectOrderValueLabel(order: EShapeDataValueOrder): string | undefined;
}

export class EDialogDataValue extends DDialogLayered<
	EShapeDataValue | null,
	EThemeDialogDataValue
> {
	protected _inputId?: DInputTextAndLabel;
	protected _inputAs?: DInputTextAndLabel;
	protected _layoutType?: DLayoutHorizontal;
	protected _selectType?: DSelect<EShapeDataValueType>;
	protected _layoutScope?: DLayoutHorizontal;
	protected _selectScope?: DSelect<EShapeDataValueScope>;
	protected _inputInitial?: DInputTextAndLabel;
	protected _layoutInterval?: DLayoutHorizontal;
	protected _inputInterval?: DInputInteger;
	protected _inputFormat?: DInputTextAndLabel;
	protected _layoutRangeType?: DLayoutHorizontal;
	protected _selectRangeType?: DSelect<EShapeDataValueRangeType>;
	protected _inputRangeFrom?: DInputRealAndLabel;
	protected _inputRangeTo?: DInputRealAndLabel;
	protected _inputCapacity?: DInputIntegerAndLabel;
	protected _layoutOrder?: DLayoutHorizontal;
	protected _selectOrder?: DSelect<EShapeDataValueOrder>;

	protected override newContentChildren(
		theme: EThemeDialogDataValue,
		options?: DDialogLayeredOptions<EShapeDataValue | null, EThemeDialogDataValue>
	): Array<DisplayObject | null> {
		const result = super.newContentChildren(theme, options);
		result.push(
			this.layoutType,
			this.layoutScope,
			this.inputId,
			this.inputAs,
			this.inputInitial,
			this.layoutInterval,
			this.inputFormat,
			this.layoutRangeType,
			this.inputRangeFrom,
			this.inputRangeTo,
			this.inputCapacity,
			this.layoutOrder
		);
		return result;
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
			input: {
				weight: 1,
				on: {
					enter: () => {
						this.ok();
					}
				}
			},
			label: {
				width: 60,
				text: {
					value: this.theme.getInputIdLabel()
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected get inputAs(): DInputTextAndLabel {
		let result = this._inputAs;
		if (result == null) {
			result = this.newInputAs();
			this._inputAs = result;
		}
		return result;
	}

	protected newInputAs(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
			input: {
				weight: 1,
				on: {
					enter: () => {
						this.ok();
					}
				}
			},
			label: {
				width: 60,
				text: {
					value: this.theme.getInputAsLabel()
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected get layoutType(): DLayoutHorizontal {
		let result = this._layoutType;
		if (result == null) {
			result = this.newLayoutType();
			this._layoutType = result;
		}
		return result;
	}

	protected newLayoutType(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "padding",
			height: "auto",
			children: [
				new DInputLabel({
					width: 60,
					text: {
						value: this.theme.getSelectTypeLabel()
					}
				}),
				this.selectType,
				new DLayoutSpace({
					width: 60
				})
			]
		});
	}

	protected get selectType(): DSelect<EShapeDataValueType> {
		let result = this._selectType;
		if (result == null) {
			result = this.newSelectType();
			result.on("change", (): void => {
				this.onChange();
			});
			this._selectType = result;
		}
		return result;
	}

	protected newSelectType(): DSelect<EShapeDataValueType> {
		return new DSelect<EShapeDataValueType>({
			weight: 1,
			value: EShapeDataValueType.NUMBER,
			menu: {
				items: this.newSelectTypeItems()
			}
		});
	}

	protected newSelectTypeItems(): DMenuItemOptionsUnion<EShapeDataValueType>[] {
		const theme = this.theme;
		const result: DMenuItemOptionsUnion<EShapeDataValueType>[] = [
			{
				value: EShapeDataValueType.BOOLEAN,
				text: {
					value: theme.getSelectTypeValueLabel(EShapeDataValueType.BOOLEAN)
				}
			},
			{
				value: EShapeDataValueType.BOOLEAN_ARRAY,
				text: {
					value: theme.getSelectTypeValueLabel(EShapeDataValueType.BOOLEAN_ARRAY)
				}
			},
			{
				value: EShapeDataValueType.NUMBER,
				text: {
					value: theme.getSelectTypeValueLabel(EShapeDataValueType.NUMBER)
				}
			},
			{
				value: EShapeDataValueType.NUMBER_ARRAY,
				text: {
					value: theme.getSelectTypeValueLabel(EShapeDataValueType.NUMBER_ARRAY)
				}
			},
			{
				value: EShapeDataValueType.STRING,
				text: {
					value: theme.getSelectTypeValueLabel(EShapeDataValueType.STRING)
				}
			},
			{
				value: EShapeDataValueType.STRING_ARRAY,
				text: {
					value: theme.getSelectTypeValueLabel(EShapeDataValueType.STRING_ARRAY)
				}
			},
			{
				value: EShapeDataValueType.OBJECT,
				text: {
					value: theme.getSelectTypeValueLabel(EShapeDataValueType.OBJECT)
				}
			},
			{
				value: EShapeDataValueType.OBJECT_ARRAY,
				text: {
					value: theme.getSelectTypeValueLabel(EShapeDataValueType.OBJECT_ARRAY)
				}
			},
			{
				value: EShapeDataValueType.TICKER,
				text: {
					value: theme.getSelectTypeValueLabel(EShapeDataValueType.TICKER)
				}
			}
		];
		EShapeDataValueExtensions.each((extension): void => {
			result.push({
				value: extension.type,
				text: {
					value: extension.label
				}
			});
		});
		return result;
	}

	protected get layoutScope(): DLayoutHorizontal {
		let result = this._layoutScope;
		if (result == null) {
			result = this.newLayoutScope();
			this._layoutScope = result;
		}
		return result;
	}

	protected newLayoutScope(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "padding",
			height: "auto",
			children: [
				new DInputLabel({
					width: 60,
					text: {
						value: this.theme.getSelectScopeLabel()
					}
				}),
				this.selectScope,
				new DLayoutSpace({
					width: 60
				})
			]
		});
	}

	protected get selectScope(): DSelect<EShapeDataValueScope> {
		let result = this._selectScope;
		if (result == null) {
			result = this.newSelectScope();
			this._selectScope = result;
		}
		return result;
	}

	protected newSelectScope(): DSelect<EShapeDataValueScope> {
		const theme = this.theme;
		return new DSelect<EShapeDataValueScope>({
			weight: 1,
			value: EShapeDataValueScope.PUBLIC,
			menu: {
				items: [
					{
						value: EShapeDataValueScope.PUBLIC,
						text: {
							value: theme.getSelectScopeValueLabel(EShapeDataValueScope.PUBLIC)
						}
					},
					{
						value: EShapeDataValueScope.PROTECTED,
						text: {
							value: theme.getSelectScopeValueLabel(EShapeDataValueScope.PROTECTED)
						}
					},
					{
						value: EShapeDataValueScope.PRIVATE,
						text: {
							value: theme.getSelectScopeValueLabel(EShapeDataValueScope.PRIVATE)
						}
					}
				]
			}
		});
	}

	protected get inputInitial(): DInputTextAndLabel {
		let result = this._inputInitial;
		if (result == null) {
			result = this.newInputInitial();
			this._inputInitial = result;
		}
		return result;
	}

	protected newInputInitial(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
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
			label: {
				width: 60,
				text: {
					value: this.theme.getInputInitialLabel()
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected get layoutInterval(): DLayoutHorizontal {
		let result = this._layoutInterval;
		if (result == null) {
			result = this.newLayoutInterval();
			this._layoutInterval = result;
		}
		return result;
	}

	protected newLayoutInterval(): DLayoutHorizontal {
		const theme = this.theme;
		return new DLayoutHorizontal({
			width: "padding",
			height: "auto",
			children: [
				new DInputLabel({
					width: 60,
					text: {
						value: theme.getInputIntervalLabel()
					}
				}),
				this.inputInterval,
				new DInputLabel({
					width: 60,
					text: {
						value: theme.getInputIntervalUnitLabel(),
						align: {
							horizontal: "LEFT"
						}
					}
				})
			]
		});
	}

	protected get inputInterval(): DInputInteger {
		let result = this._inputInterval;
		if (result == null) {
			result = this.newInputInterval();
			this._inputInterval = result;
		}
		return result;
	}

	protected newInputInterval(): DInputInteger {
		return new DInputInteger({
			weight: 1,
			text: {
				value: 1000
			},
			step: 1,
			min: 0,
			on: {
				enter: () => {
					this.ok();
				}
			}
		});
	}

	protected get inputFormat(): DInputTextAndLabel {
		let result = this._inputFormat;
		if (result == null) {
			result = this.newInputFormat();
			this._inputFormat = result;
		}
		return result;
	}

	protected newInputFormat(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
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
			label: {
				width: 60,
				text: {
					value: this.theme.getInputFormatLabel()
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected get layoutRangeType(): DLayoutHorizontal {
		let result = this._layoutRangeType;
		if (result == null) {
			result = this.newLayoutRangeType();
			this._layoutRangeType = result;
		}
		return result;
	}

	protected newLayoutRangeType(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "padding",
			height: "auto",
			children: [
				new DInputLabel({
					width: 60,
					text: {
						value: this.theme.getSelectRangeTypeLabel()
					}
				}),
				this.selectRangeType,
				new DLayoutSpace({
					width: 60
				})
			]
		});
	}

	protected get selectRangeType(): DSelect<EShapeDataValueRangeType> {
		let result = this._selectRangeType;
		if (result == null) {
			result = this.newSelectRangeType();
			result.on("change", (): void => {
				this.onChange();
			});
			this._selectRangeType = result;
		}
		return result;
	}

	protected newSelectRangeType(): DSelect<EShapeDataValueRangeType> {
		const theme = this.theme;
		return new DSelect<EShapeDataValueRangeType>({
			weight: 1,
			value: EShapeDataValueRangeType.NONE,
			menu: {
				items: [
					{
						value: EShapeDataValueRangeType.NONE,
						text: {
							value: theme.getSelectRangeTypeValueLabel(EShapeDataValueRangeType.NONE)
						}
					},
					{
						value: EShapeDataValueRangeType.FROM,
						text: {
							value: theme.getSelectRangeTypeValueLabel(EShapeDataValueRangeType.FROM)
						}
					},
					{
						value: EShapeDataValueRangeType.TO,
						text: {
							value: theme.getSelectRangeTypeValueLabel(EShapeDataValueRangeType.TO)
						}
					},
					{
						value: EShapeDataValueRangeType.FROM_TO,
						text: {
							value: theme.getSelectRangeTypeValueLabel(
								EShapeDataValueRangeType.FROM_TO
							)
						}
					}
				]
			}
		});
	}

	protected get inputRangeFrom(): DInputRealAndLabel {
		let result = this._inputRangeFrom;
		if (result == null) {
			result = this.newInputRangeFrom();
			this._inputRangeFrom = result;
		}
		return result;
	}

	protected newInputRangeFrom(): DInputRealAndLabel {
		return new DInputRealAndLabel({
			width: "padding",
			height: "auto",
			visible: false,
			input: {
				weight: 1,
				text: {
					value: 0
				},
				on: {
					enter: () => {
						this.ok();
					}
				}
			},
			label: {
				width: 90,
				text: {
					value: this.theme.getInputRangeFromLabel()
				}
			},
			space: {
				width: 90
			}
		});
	}

	protected get inputRangeTo(): DInputRealAndLabel {
		let result = this._inputRangeTo;
		if (result == null) {
			result = this.newInputRangeTo();
			this._inputRangeTo = result;
		}
		return result;
	}

	protected newInputRangeTo(): DInputRealAndLabel {
		return new DInputRealAndLabel({
			width: "padding",
			height: "auto",
			visible: false,
			input: {
				weight: 1,
				text: {
					value: 1
				},
				on: {
					enter: () => {
						this.ok();
					}
				}
			},
			label: {
				width: 90,
				text: {
					value: this.theme.getInputRangeToLabel()
				}
			},
			space: {
				width: 90
			}
		});
	}

	protected get inputCapacity(): DInputIntegerAndLabel {
		let result = this._inputCapacity;
		if (result == null) {
			result = this.newInputCapacity();
			this._inputCapacity = result;
		}
		return result;
	}

	protected newInputCapacity(): DInputIntegerAndLabel {
		return new DInputIntegerAndLabel({
			width: "padding",
			height: "auto",
			input: {
				weight: 1,
				text: {
					value: 0
				},
				on: {
					enter: () => {
						this.ok();
					}
				}
			},
			label: {
				width: 60,
				text: {
					value: this.theme.getInputCapacityLabel()
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected get layoutOrder(): DLayoutHorizontal {
		let result = this._layoutOrder;
		if (result == null) {
			result = this.newLayoutOrder();
			this._layoutOrder = result;
		}
		return result;
	}

	protected newLayoutOrder(): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "padding",
			height: "auto",
			children: [
				new DInputLabel({
					width: 60,
					text: {
						value: this.theme.getSelectOrderLabel()
					}
				}),
				this.selectOrder,
				new DLayoutSpace({
					width: 60
				})
			]
		});
	}

	protected get selectOrder(): DSelect<EShapeDataValueOrder> {
		let result = this._selectOrder;
		if (result == null) {
			result = this.newSelectOrder();
			this._selectOrder = result;
		}
		return result;
	}

	protected newSelectOrder(): DSelect<EShapeDataValueOrder> {
		const theme = this.theme;
		return new DSelect<EShapeDataValueOrder>({
			weight: 1,
			value: EShapeDataValueOrder.ASCENDING,
			menu: {
				items: [
					{
						value: EShapeDataValueOrder.ASCENDING,
						text: {
							value: theme.getSelectOrderValueLabel(EShapeDataValueOrder.ASCENDING)
						}
					},
					{
						value: EShapeDataValueOrder.DESCENDING,
						text: {
							value: theme.getSelectOrderValueLabel(EShapeDataValueOrder.DESCENDING)
						}
					}
				]
			},
			on: {
				init: (self: DSelect<EShapeDataValueOrder>): void => {
					this._selectOrder = self;
				}
			}
		});
	}

	protected onChange(): void {
		const type = this.selectType.value;
		switch (type) {
			case EShapeDataValueType.BOOLEAN:
			case EShapeDataValueType.BOOLEAN_ARRAY:
			case EShapeDataValueType.NUMBER:
			case EShapeDataValueType.NUMBER_ARRAY:
			case EShapeDataValueType.STRING:
			case EShapeDataValueType.STRING_ARRAY:
			case EShapeDataValueType.OBJECT:
			case EShapeDataValueType.OBJECT_ARRAY:
				this.layoutScope.show();
				this.inputId.show();
				this.inputAs.show();
				this.inputInitial.show();
				this.layoutInterval.hide();
				this.inputFormat.show();
				if (type === EShapeDataValueType.NUMBER) {
					this.layoutRangeType.show();
					const rangeType = this.selectRangeType.value;
					if (rangeType != null && (rangeType & EShapeDataValueRangeType.FROM) !== 0) {
						this.inputRangeFrom.show();
					} else {
						this.inputRangeFrom.hide();
					}
					if (rangeType != null && (rangeType & EShapeDataValueRangeType.TO) !== 0) {
						this.inputRangeTo.show();
					} else {
						this.inputRangeTo.hide();
					}
				} else {
					this.layoutRangeType.hide();
					this.inputRangeFrom.hide();
					this.inputRangeTo.hide();
				}
				break;
			case EShapeDataValueType.TICKER:
				this.layoutScope.hide();
				this.inputId.hide();
				this.inputAs.show();
				this.inputInitial.hide();
				this.layoutInterval.show();
				this.inputFormat.hide();
				this.layoutRangeType.hide();
				this.inputRangeFrom.hide();
				this.inputRangeTo.hide();
				break;
			default:
				this.layoutScope.hide();
				this.inputId.hide();
				this.inputAs.show();
				this.inputInitial.hide();
				this.layoutInterval.hide();
				this.inputFormat.hide();
				this.layoutRangeType.hide();
				this.inputRangeFrom.hide();
				this.inputRangeTo.hide();
				break;
		}
	}

	reset(): this {
		this.selectType.value = EShapeDataValueType.NUMBER;
		this.selectScope.value = EShapeDataValueScope.PUBLIC;
		this.inputId.input.value = "";
		this.inputAs.input.value = "";
		this.inputInitial.input.value = "";
		this.inputInterval.value = 1000;
		this.inputFormat.input.value = "";
		this.selectRangeType.value = EShapeDataValueRangeType.NONE;
		this.inputRangeFrom.input.value = 0;
		this.inputRangeTo.input.value = 1;
		this.inputCapacity.input.value = 0;
		this.selectOrder.value = EShapeDataValueOrder.ASCENDING;
		this.onChange();
		return this;
	}

	get value(): EShapeDataValue | null {
		const result = new EShapeDataValueImpl();
		const type = this.selectType.value ?? EShapeDataValueType.NUMBER;
		const scope = this.selectScope.value ?? EShapeDataValueScope.PUBLIC;
		const order = this.selectOrder.value ?? EShapeDataValueOrder.ASCENDING;
		result.type = type;
		switch (type) {
			case EShapeDataValueType.BOOLEAN:
			case EShapeDataValueType.BOOLEAN_ARRAY:
			case EShapeDataValueType.NUMBER:
			case EShapeDataValueType.NUMBER_ARRAY:
			case EShapeDataValueType.STRING:
			case EShapeDataValueType.STRING_ARRAY:
			case EShapeDataValueType.OBJECT:
			case EShapeDataValueType.OBJECT_ARRAY:
				result.scope = scope;
				result.id = this.inputId.input.value.trim();
				result.as = this.inputAs.input.value.trim();
				result.initial = this.inputInitial.input.value.trim();
				result.format = this.inputFormat.input.value.trim();
				if (type === EShapeDataValueType.NUMBER) {
					result.range.type = this.selectRangeType.value ?? EShapeDataValueRangeType.NONE;
					result.range.from = this.inputRangeFrom.input.value;
					result.range.to = this.inputRangeTo.input.value;
				} else {
					result.range.type = EShapeDataValueRangeType.NONE;
					result.range.from = 0;
					result.range.to = 1;
				}
				result.order = order;
				break;
			case EShapeDataValueType.TICKER:
				result.scope = EShapeDataValueScope.PUBLIC;
				result.id = "";
				result.as = this.inputAs.input.value.trim();
				result.initial = `${this.inputInterval.value}`;
				result.format = "";
				result.range.type = EShapeDataValueRangeType.NONE;
				result.range.from = 0;
				result.range.to = 1;
				result.order = order;
				break;
			default:
				result.scope = EShapeDataValueScope.PUBLIC;
				result.id = "";
				result.as = this.inputAs.input.value.trim();
				result.initial = "";
				result.format = "";
				result.range.type = EShapeDataValueRangeType.NONE;
				result.range.from = 0;
				result.range.to = 1;
				result.order = order;
				break;
		}
		return result;
	}

	set value(value: EShapeDataValue | null) {
		if (value != null) {
			this.selectType.value = value.type;
			this.selectScope.value = value.scope;
			this.inputId.input.value = value.id;
			this.inputAs.input.value = value.as;
			if (value.type === EShapeDataValueType.TICKER) {
				this.inputInitial.input.value = "";
				this.inputInterval.value = this.toInterval(value.initial);
			} else {
				this.inputInitial.input.value = value.initial;
				this.inputInterval.value = 1000;
			}
			this.inputFormat.input.value = value.format;
			this.selectRangeType.value = value.range.type;
			this.inputRangeFrom.input.value = value.range.from;
			this.inputRangeTo.input.value = value.range.to;
			this.inputCapacity.input.value = value.capacity;
			this.selectOrder.value = value.order;
			this.onChange();
		}
	}

	protected toInterval(target: string): number {
		try {
			const result = parseInt(target, 10);
			if (result === result) {
				return Math.max(0, result);
			}
		} catch {
			// DO NOTHING
		}
		return 1000;
	}

	protected getResolvedValue(): EShapeDataValue | null {
		return this.value;
	}

	protected getType(): string {
		return "EDialogDataValue";
	}
}
