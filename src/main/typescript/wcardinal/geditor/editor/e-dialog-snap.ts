import {
	DDialogLayered,
	DDialogLayeredOptions,
	DInputLabel,
	DInputReal,
	DLayoutHorizontal,
	DLayoutSpace,
	DSelect,
	DThemeDialogLayered,
	ESnapperTargetValue,
	ESnapperTargetValueType
} from "@wcardinal/wcardinal-ui";
import { DisplayObject } from "pixi.js";

export interface EThemeDialogSnap extends DThemeDialogLayered {
	getSelectDirectionLabel(): string | undefined;
	getSelectDirectionValueLabel(value: ESnapperTargetValueType): string | undefined;
	getInputPositionLabel(): string | undefined;
}

export class EDialogSnap extends DDialogLayered<ESnapperTargetValue | null, EThemeDialogSnap> {
	protected _selectType?: DSelect<ESnapperTargetValueType>;
	protected _inputPosition?: DInputReal;

	protected override newContentChildren(
		theme: EThemeDialogSnap,
		options?: DDialogLayeredOptions<ESnapperTargetValue | null, EThemeDialogSnap>
	): Array<DisplayObject | null> {
		const result = super.newContentChildren(theme, options);
		result.push(
			new DLayoutHorizontal({
				width: "padding",
				height: "auto",
				children: [
					new DInputLabel({
						width: 60,
						text: {
							value: theme.getSelectDirectionLabel()
						}
					}),
					this.selectType,
					new DLayoutSpace({
						width: 60
					})
				]
			})
		);
		result.push(
			new DLayoutHorizontal({
				width: "padding",
				height: "auto",
				children: [
					new DInputLabel({
						width: 60,
						text: {
							value: theme.getInputPositionLabel()
						}
					}),
					this.inputPosition,
					new DLayoutSpace({
						width: 60
					})
				]
			})
		);
		return result;
	}

	get selectType(): DSelect<ESnapperTargetValueType> {
		let result = this._selectType;
		if (result == null) {
			result = this.newSelectType();
			this._selectType = result;
		}
		return result;
	}

	protected newSelectType(): DSelect<ESnapperTargetValueType> {
		const theme = this.theme;
		return new DSelect<ESnapperTargetValueType>({
			weight: 1,
			value: ESnapperTargetValueType.VERTICAL,
			menu: {
				items: [
					{
						value: ESnapperTargetValueType.VERTICAL,
						text: {
							value: theme.getSelectDirectionValueLabel(
								ESnapperTargetValueType.VERTICAL
							)
						}
					},
					{
						value: ESnapperTargetValueType.HORIZONTAL,
						text: {
							value: theme.getSelectDirectionValueLabel(
								ESnapperTargetValueType.HORIZONTAL
							)
						}
					}
				]
			}
		});
	}

	get inputPosition(): DInputReal {
		let result = this._inputPosition;
		if (result == null) {
			result = this.newInputPosition();
			this._inputPosition = result;
		}
		return result;
	}

	protected newInputPosition(): DInputReal {
		return new DInputReal({
			weight: 1,
			text: {
				value: 0
			},
			step: 1,
			on: {
				enter: () => {
					this.ok();
				}
			}
		});
	}

	reset(): this {
		this.selectType.value = ESnapperTargetValueType.VERTICAL;
		this.inputPosition.value = 0;
		return this;
	}

	get value(): ESnapperTargetValue | null {
		const type = this.selectType.value;
		const position = this.inputPosition.value;
		if (type != null) {
			return new ESnapperTargetValue(type, position);
		}
		return null;
	}

	set value(value: ESnapperTargetValue | null) {
		if (value != null) {
			this.selectType.value = value.type;
			this.inputPosition.value = value.position;
		}
	}

	protected getResolvedValue(): ESnapperTargetValue | null {
		return this.value;
	}

	protected getType(): string {
		return "EDialogSnap";
	}
}
