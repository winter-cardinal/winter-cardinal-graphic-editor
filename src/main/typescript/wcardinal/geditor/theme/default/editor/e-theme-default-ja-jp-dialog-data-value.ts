import {
	EShapeDataValueExtensions,
	EShapeDataValueOrder,
	EShapeDataValueRangeType,
	EShapeDataValueScope,
	EShapeDataValueType
} from "@wcardinal/wcardinal-ui";
import { EThemeDefaultDialogDataValue } from "./e-theme-default-dialog-data-value";

export class EThemeDefaultJaJpDialogDataValue extends EThemeDefaultDialogDataValue {
	override getInputIdLabel(): string | undefined {
		return "ID";
	}

	override getInputAsLabel(): string | undefined {
		return "別名";
	}

	override getSelectTypeLabel(): string | undefined {
		return "種別";
	}

	override getSelectTypeValueLabel(type: EShapeDataValueType): string | undefined {
		switch (type) {
			case EShapeDataValueType.BOOLEAN:
				return "真偽値";
			case EShapeDataValueType.BOOLEAN_ARRAY:
				return "真偽値の配列";
			case EShapeDataValueType.NUMBER:
				return "数値";
			case EShapeDataValueType.NUMBER_ARRAY:
				return "数値の配列";
			case EShapeDataValueType.STRING:
				return "文字列";
			case EShapeDataValueType.STRING_ARRAY:
				return "文字列の配列";
			case EShapeDataValueType.OBJECT:
				return "オブジェクト";
			case EShapeDataValueType.OBJECT_ARRAY:
				return "オブジェクトの配列";
			case EShapeDataValueType.TICKER:
				return "ティッカー";
			default:
				const extension = EShapeDataValueExtensions.get(type);
				if (extension) {
					return extension.label;
				}
				return "不明";
		}
	}

	override getSelectScopeLabel(): string | undefined {
		return "公開範囲";
	}

	override getSelectScopeValueLabel(type: EShapeDataValueScope): string | undefined {
		switch (type) {
			case EShapeDataValueScope.PUBLIC:
				return "公開";
			case EShapeDataValueScope.PROTECTED:
				return "図面内のみ公開";
			case EShapeDataValueScope.PRIVATE:
				return "非公開";
		}
	}

	override getInputInitialLabel(): string | undefined {
		return "初期値";
	}

	override getInputIntervalLabel(): string | undefined {
		return "周期";
	}

	override getInputIntervalUnitLabel(): string | undefined {
		return "ミリ秒";
	}

	override getInputFormatLabel(): string | undefined {
		return "書式";
	}

	override getSelectRangeTypeLabel(): string | undefined {
		return "範囲";
	}

	override getSelectRangeTypeValueLabel(type: EShapeDataValueRangeType): string | undefined {
		switch (type) {
			case EShapeDataValueRangeType.FROM:
				return "下限のみ";
			case EShapeDataValueRangeType.TO:
				return "上限のみ";
			case EShapeDataValueRangeType.FROM_TO:
				return "上下限あり";
			default:
				return "なし";
		}
	}

	override getInputRangeFromLabel(): string | undefined {
		return "下限";
	}

	override getInputRangeToLabel(): string | undefined {
		return "上限";
	}

	override getInputCapacityLabel(): string | undefined {
		return "保存個数";
	}

	override getSelectOrderLabel(): string | undefined {
		return "順序";
	}

	override getSelectOrderValueLabel(order: EShapeDataValueOrder): string | undefined {
		switch (order) {
			case EShapeDataValueOrder.ASCENDING:
				return "昇順";
			case EShapeDataValueOrder.DESCENDING:
				return "降順";
		}
	}
}
