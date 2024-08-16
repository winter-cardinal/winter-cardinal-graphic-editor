import {
	EShapeDataValueExtensions,
	EShapeDataValueOrder,
	EShapeDataValueRangeType,
	EShapeDataValueScope,
	EShapeDataValueType
} from "@wcardinal/wcardinal-ui";
import { EThemeDefaultDialogDataValue } from "./e-theme-default-dialog-data-value";

export class EThemeDefaultEnUsDialogDataValue extends EThemeDefaultDialogDataValue {
	override getInputIdLabel(): string | undefined {
		return "ID";
	}

	override getInputAsLabel(): string | undefined {
		return "As";
	}

	override getSelectTypeLabel(): string | undefined {
		return "Type";
	}

	override getSelectTypeValueLabel(type: EShapeDataValueType): string | undefined {
		switch (type) {
			case EShapeDataValueType.BOOLEAN:
				return "Boolean";
			case EShapeDataValueType.BOOLEAN_ARRAY:
				return "Boolean Array";
			case EShapeDataValueType.NUMBER:
				return "Number";
			case EShapeDataValueType.NUMBER_ARRAY:
				return "Number Array";
			case EShapeDataValueType.STRING:
				return "String";
			case EShapeDataValueType.STRING_ARRAY:
				return "String Array";
			case EShapeDataValueType.OBJECT:
				return "Object";
			case EShapeDataValueType.OBJECT_ARRAY:
				return "Object Array";
			case EShapeDataValueType.TICKER:
				return "Ticker";
			default:
				const extension = EShapeDataValueExtensions.get(type);
				if (extension) {
					return extension.label;
				}
				return "Unknown";
		}
	}

	override getSelectScopeLabel(): string | undefined {
		return "Scope";
	}

	override getSelectScopeValueLabel(type: EShapeDataValueScope): string | undefined {
		switch (type) {
			case EShapeDataValueScope.PUBLIC:
				return "Public";
			case EShapeDataValueScope.PROTECTED:
				return "Protected";
			case EShapeDataValueScope.PRIVATE:
				return "Private";
		}
	}

	override getInputInitialLabel(): string | undefined {
		return "Initial";
	}

	override getInputIntervalLabel(): string | undefined {
		return "Interval";
	}

	override getInputIntervalUnitLabel(): string | undefined {
		return "ms";
	}

	override getInputFormatLabel(): string | undefined {
		return "Format";
	}

	override getSelectRangeTypeLabel(): string | undefined {
		return "Range";
	}

	override getSelectRangeTypeValueLabel(type: EShapeDataValueRangeType): string | undefined {
		switch (type) {
			case EShapeDataValueRangeType.FROM:
				return "Lower Limit";
			case EShapeDataValueRangeType.TO:
				return "Upper Limit";
			case EShapeDataValueRangeType.FROM_TO:
				return "Upper and Lower Limit";
			default:
				return "No Range";
		}
	}

	override getInputRangeFromLabel(): string | undefined {
		return "Lower Limit";
	}

	override getInputRangeToLabel(): string | undefined {
		return "Upper Limit";
	}

	override getInputCapacityLabel(): string | undefined {
		return "Capacity";
	}

	override getSelectOrderLabel(): string | undefined {
		return "Order";
	}

	override getSelectOrderValueLabel(order: EShapeDataValueOrder): string | undefined {
		switch (order) {
			case EShapeDataValueOrder.ASCENDING:
				return "Ascending Order";
			case EShapeDataValueOrder.DESCENDING:
				return "Descending Order";
		}
	}
}
