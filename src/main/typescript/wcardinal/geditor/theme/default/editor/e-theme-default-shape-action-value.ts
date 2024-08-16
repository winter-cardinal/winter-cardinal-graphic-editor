import {
	EShapeActionValue,
	EShapeActionValueBlinkType,
	EShapeActionValueChangeColorTarget,
	EShapeActionValueChangeColorType,
	EShapeActionValueChangeTextType,
	EShapeActionValueGestureOperationType,
	EShapeActionValueGestureType,
	EShapeActionValueMiscType,
	EShapeActionValueOnInputAction,
	EShapeActionValueOpenDialogType,
	EShapeActionValueOpenType,
	EShapeActionValueOpetyped,
	EShapeActionValueShowHideType,
	EShapeActionValueSubtyped,
	EShapeActionValueTransformMoveType,
	EShapeActionValueTransformResizeType,
	EShapeActionValueTransformRotateType,
	EShapeActionValueTransformType,
	EShapeActionValueType,
	EThemeShapeActionValue,
	UtilHtmlElementWhen
} from "@wcardinal/wcardinal-ui";

export abstract class EThemeDefaultShapeActionValue implements EThemeShapeActionValue {
	toLabel(value: EShapeActionValue): string {
		const type = value.type;
		if (value instanceof EShapeActionValueSubtyped) {
			const subtype = value.subtype;
			if (value instanceof EShapeActionValueOpetyped) {
				const result = this.toOpetypedLabel(type, subtype, value.opetype, value);
				if (result != null) {
					return result;
				}
			} else {
				const result = this.toSubtypedLabel(type, subtype, value);
				if (result != null) {
					return result;
				}
			}
		}
		return this.toTypedLabel(type, value);
	}

	protected toTypedLabel(type: EShapeActionValueType, value: EShapeActionValue): string {
		return `${this.toTypeLabel(type)}: ${this.toConditionLabel(value.condition)}`;
	}

	protected toSubtypedLabel(
		type: EShapeActionValueType,
		subtype: any,
		value: EShapeActionValueSubtyped<any>
	): string | null {
		const typeLabel = this.toTypeLabel(type);
		switch (type) {
			case EShapeActionValueType.SHOW_HIDE:
				return `${typeLabel}: ${this.toShowHideTypeLabel(subtype)}`;
			case EShapeActionValueType.BLINK:
				return `${typeLabel}: ${this.toBlinkTypeLabel(subtype)}`;
			case EShapeActionValueType.CHANGE_COLOR:
			case EShapeActionValueType.CHANGE_COLOR_LEGACY:
				return `${typeLabel}: ${this.toChangeColorTypeLabel(subtype)}`;
			case EShapeActionValueType.CHANGE_TEXT:
				return `${typeLabel}: ${this.toChangeTextTypeLabel(subtype)}`;
			case EShapeActionValueType.OPEN:
				return `${typeLabel}: ${this.toOpenTypeLabel(subtype)}`;
			case EShapeActionValueType.GESTURE:
				return `${typeLabel}: ${this.toGestureTypeLabel(subtype)}`;
			case EShapeActionValueType.MISC:
				return `${typeLabel}: ${this.toMiscTypeLabel(subtype)}`;
		}
		return null;
	}

	protected toOpetypedLabel(
		type: EShapeActionValueType,
		subtype: EShapeActionValueTransformType,
		opetype: EShapeActionValueTransformRotateType,
		value: EShapeActionValueOpetyped<any, any>
	): string | null {
		switch (type) {
			case EShapeActionValueType.TRANSFORM:
				const subtypeLabel = this.toTransformTypeLabel(subtype);
				switch (subtype) {
					case EShapeActionValueTransformType.ROTATE:
						return `${subtypeLabel}: ${this.toTransformRotateTypeLabel(opetype)}`;
					case EShapeActionValueTransformType.MOVE:
						return `${subtypeLabel}: ${this.toTransformMoveTypeLabel(opetype)}`;
					case EShapeActionValueTransformType.RESIZE:
						return `${subtypeLabel}: ${this.toTransformResizeTypeLabel(opetype)}`;
				}
		}
		return null;
	}

	toConditionLabel(condition: string): string {
		const l = 20;
		if (l < condition.length) {
			return condition.substring(0, l) + "...";
		} else {
			return condition;
		}
	}

	abstract toTypeLabel(type: EShapeActionValueType): string;

	abstract toBlinkTypeLabel(type: EShapeActionValueBlinkType): string;

	abstract toShowHideTypeLabel(type: EShapeActionValueShowHideType): string;

	abstract toTransformTypeLabel(type: EShapeActionValueTransformType): string;

	abstract toTransformRotateTypeLabel(type: EShapeActionValueTransformRotateType): string;

	abstract toTransformMoveTypeLabel(type: EShapeActionValueTransformMoveType): string;

	abstract toTransformResizeTypeLabel(type: EShapeActionValueTransformResizeType): string;

	toChangeColorTypeLabel(type: EShapeActionValueChangeColorType): string {
		if (type === EShapeActionValueChangeColorType.NONE) {
			return this.toChangeColorTypeValueLabel(EShapeActionValueChangeColorType.NONE);
		}
		let result = "";
		let delimiter = "";
		if (type & EShapeActionValueChangeColorType.FILL) {
			result +=
				delimiter + this.toChangeColorTypeValueLabel(EShapeActionValueChangeColorType.FILL);
			delimiter = ", ";
		}
		if (type & EShapeActionValueChangeColorType.STROKE) {
			result +=
				delimiter +
				this.toChangeColorTypeValueLabel(EShapeActionValueChangeColorType.STROKE);
			delimiter = ", ";
		}
		if (type & EShapeActionValueChangeColorType.TEXT) {
			result +=
				delimiter + this.toChangeColorTypeValueLabel(EShapeActionValueChangeColorType.TEXT);
			delimiter = ", ";
		}
		if (type & EShapeActionValueChangeColorType.TEXT_OUTLINE) {
			result +=
				delimiter +
				this.toChangeColorTypeValueLabel(EShapeActionValueChangeColorType.TEXT_OUTLINE);
		}
		return result;
	}

	abstract toChangeColorTypeValueLabel(type: EShapeActionValueChangeColorType): string;

	abstract toChangeColorTargetLabel(type: EShapeActionValueChangeColorTarget): string;

	abstract toChangeTextTypeLabel(type: EShapeActionValueChangeTextType): string;

	abstract toOpenTypeLabel(type: EShapeActionValueOpenType): string;

	abstract toOpenDialogTypeLabel(type: EShapeActionValueOpenDialogType): string;

	abstract toGestureTypeLabel(type: EShapeActionValueGestureType): string;

	abstract toGestureOperationTypeLabel(type: EShapeActionValueGestureOperationType): string;

	abstract toMiscTypeLabel(type: EShapeActionValueMiscType): string;

	abstract toHtmlElementWhenLabel(when: UtilHtmlElementWhen): string;

	abstract toOnInputActionLabel(type: EShapeActionValueOnInputAction): string;
}
