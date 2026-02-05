import {
	EShapeActionMiscExtensions,
	EShapeActionOpenDialogExtensions,
	EShapeActionOpenExtensions,
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
	EShapeActionValueShowHideType,
	EShapeActionValueTransformMoveType,
	EShapeActionValueTransformResizeType,
	EShapeActionValueTransformRotateType,
	EShapeActionValueTransformType,
	EShapeActionValueType,
	UtilHtmlElementWhen
} from "@wcardinal/wcardinal-ui";
import { EThemeDefaultShapeActionValue } from "./e-theme-default-shape-action-value";

export class EThemeDefaultJaJpShapeActionValue extends EThemeDefaultShapeActionValue {
	override toTypeLabel(type: EShapeActionValueType): string {
		switch (type) {
			case EShapeActionValueType.SHOW_HIDE:
				return "表示切替";
			case EShapeActionValueType.BLINK:
				return "点滅";
			case EShapeActionValueType.TRANSFORM:
				return "移動・回転・拡大縮小";
			case EShapeActionValueType.OPEN:
				return "開く";
			case EShapeActionValueType.CHANGE_COLOR:
			case EShapeActionValueType.CHANGE_COLOR_LEGACY:
				return "色変更";
			case EShapeActionValueType.CHANGE_FILL_PERCENT:
				return "塗り％";
			case EShapeActionValueType.CHANGE_TEXT:
				return "テキスト変更";
			case EShapeActionValueType.CHANGE_CURSOR:
				return "カーソル変更";
			case EShapeActionValueType.EMIT_EVENT:
				return "イベント発火";
			case EShapeActionValueType.GESTURE:
				return "操作";
			case EShapeActionValueType.MISC:
				return "その他";
			default:
				if (EShapeActionValueType.EXTENSION <= type) {
					return "拡張";
				} else {
					return "不明";
				}
		}
	}

	override toBlinkTypeLabel(type: EShapeActionValueBlinkType): string {
		switch (type) {
			case EShapeActionValueBlinkType.VISIBILITY:
				return "表示切替";
			case EShapeActionValueBlinkType.BRIGHTEN:
				return "明るく";
			case EShapeActionValueBlinkType.DARKEN:
				return "暗く";
			case EShapeActionValueBlinkType.OPACITY:
				return "透明度";
			case EShapeActionValueBlinkType.COLOR_FILL:
				return "塗り";
			case EShapeActionValueBlinkType.COLOR_STROKE:
				return "境界線";
		}
	}

	override toShowHideTypeLabel(type: EShapeActionValueShowHideType): string {
		switch (type) {
			case EShapeActionValueShowHideType.SHAPE_SHOW:
				return "表示";
			case EShapeActionValueShowHideType.SHAPE_HIDE:
				return "非表示";
			case EShapeActionValueShowHideType.SHAPE:
				return "シェイプ";
			case EShapeActionValueShowHideType.LAYER:
				return "レイヤー";
		}
	}

	override toTransformTypeLabel(type: EShapeActionValueTransformType): string {
		switch (type) {
			case EShapeActionValueTransformType.MOVE:
				return "移動";
			case EShapeActionValueTransformType.ROTATE:
				return "回転";
			case EShapeActionValueTransformType.RESIZE:
				return "拡大縮小";
		}
	}

	override toTransformRotateTypeLabel(type: EShapeActionValueTransformRotateType): string {
		switch (type) {
			case EShapeActionValueTransformRotateType.RELATIVE:
				return "相対角度";
			case EShapeActionValueTransformRotateType.ABSOLUTE:
				return "絶対角度";
		}
	}

	override toTransformMoveTypeLabel(type: EShapeActionValueTransformMoveType): string {
		switch (type) {
			case EShapeActionValueTransformMoveType.RELATIVE_X:
				return "相対X座標";
			case EShapeActionValueTransformMoveType.RELATIVE_Y:
				return "相対Y座標";
			case EShapeActionValueTransformMoveType.ABSOLUTE_X:
				return "絶対X座標";
			case EShapeActionValueTransformMoveType.ABSOLUTE_Y:
				return "絶対Y座標";
			case EShapeActionValueTransformMoveType.FORWARD_OR_BACKWARD:
				return "前後";
			case EShapeActionValueTransformMoveType.LEFT_OR_RIGHT:
				return "左右";
		}
	}

	override toTransformResizeTypeLabel(type: EShapeActionValueTransformResizeType): string {
		switch (type) {
			case EShapeActionValueTransformResizeType.ABSOLUTE_SIZE:
				return "幅と高さ";
			case EShapeActionValueTransformResizeType.RELATIVE_SIZE:
				return "幅と高さ（％）";
			case EShapeActionValueTransformResizeType.ABSOLUTE_HEIGHT:
				return "高さ";
			case EShapeActionValueTransformResizeType.RELATIVE_HEIGHT:
				return "高さ（％）";
			case EShapeActionValueTransformResizeType.ABSOLUTE_WIDTH:
				return "幅";
			case EShapeActionValueTransformResizeType.RELATIVE_WIDTH:
				return "幅（％）";
		}
	}

	override toChangeColorTypeValueLabel(type: EShapeActionValueChangeColorType): string {
		switch (type) {
			case EShapeActionValueChangeColorType.NONE:
				return "無し";
			case EShapeActionValueChangeColorType.FILL:
				return "塗り";
			case EShapeActionValueChangeColorType.STROKE:
				return "境界線";
			case EShapeActionValueChangeColorType.TEXT:
				return "テキスト";
			case EShapeActionValueChangeColorType.TEXT_OUTLINE:
				return "テキスト境界線";
		}
		return "不明";
	}

	override toChangeColorTargetLabel(type: EShapeActionValueChangeColorTarget): string {
		switch (type) {
			case EShapeActionValueChangeColorTarget.COLOR_AND_ALPHA:
				return "色";
			case EShapeActionValueChangeColorTarget.COLOR:
				return "RGB";
			case EShapeActionValueChangeColorTarget.ALPHA:
				return "透明度";
			case EShapeActionValueChangeColorTarget.CODE:
				return "色（動的）";
			case EShapeActionValueChangeColorTarget.BRIGHTNESS:
				return "明るさ";
		}
	}

	override toChangeTextTypeLabel(type: EShapeActionValueChangeTextType): string {
		switch (type) {
			case EShapeActionValueChangeTextType.TEXT:
				return "テキスト";
			case EShapeActionValueChangeTextType.NUMBER:
				return "数値";
		}
	}

	override toOpenTypeLabel(type: EShapeActionValueOpenType): string {
		switch (type) {
			case EShapeActionValueOpenType.DIAGRAM_LEGACY:
				return "グラフィック";
			case EShapeActionValueOpenType.PAGE_LEGACY:
				return "ページ（新規ウィンドウ）";
			case EShapeActionValueOpenType.PAGE_INPLACE_LEGACY:
				return "ページ（現在のウィンドウ）";
			case EShapeActionValueOpenType.DIALOG_TEXT:
				return "ダイアログ（テキスト）";
			case EShapeActionValueOpenType.DIALOG_INTEGER:
				return "ダイアログ（整数）";
			case EShapeActionValueOpenType.DIALOG_REAL:
				return "ダイアログ（実数）";
			case EShapeActionValueOpenType.DIALOG_BOOLEAN:
				return "ダイアログ（真偽値）";
			case EShapeActionValueOpenType.DIALOG_DATE:
				return "ダイアログ（日付）";
			case EShapeActionValueOpenType.DIALOG_TIME:
				return "ダイアログ（時刻）";
			case EShapeActionValueOpenType.DIALOG_DATETIME:
				return "ダイアログ（日時）";
			case EShapeActionValueOpenType.DIAGRAM:
				return "グラフィック";
			case EShapeActionValueOpenType.PAGE:
				return "ページ";
			case EShapeActionValueOpenType.DIALOG:
				return "ダイアログ";
			default:
				if (EShapeActionValueOpenType.EXTENSION <= type) {
					const extension = EShapeActionOpenExtensions.get(type);
					if (extension) {
						return extension.label;
					}
					return "拡張";
				} else {
					return "不明";
				}
		}
	}

	override toOpenDialogTypeLabel(type: EShapeActionValueOpenDialogType): string {
		switch (type) {
			case EShapeActionValueOpenDialogType.TEXT:
				return "テキスト";
			case EShapeActionValueOpenDialogType.INTEGER:
				return "整数";
			case EShapeActionValueOpenDialogType.REAL:
				return "実数";
			case EShapeActionValueOpenDialogType.BOOLEAN:
				return "真偽値";
			case EShapeActionValueOpenDialogType.DATE:
				return "日付";
			case EShapeActionValueOpenDialogType.TIME:
				return "時刻";
			case EShapeActionValueOpenDialogType.DATETIME:
				return "日時";
			default:
				if (EShapeActionValueOpenDialogType.EXTENSION <= type) {
					const extension = EShapeActionOpenDialogExtensions.get(type);
					if (extension) {
						return extension.label;
					}
					return "拡張";
				} else {
					return "不明";
				}
		}
	}

	override toGestureTypeLabel(type: EShapeActionValueGestureType): string {
		switch (type) {
			case EShapeActionValueGestureType.SHAPE:
				return "シェイプ";
			case EShapeActionValueGestureType.LAYER:
				return "レイヤー";
		}
	}

	override toGestureOperationTypeLabel(type: EShapeActionValueGestureOperationType): string {
		switch (type) {
			case EShapeActionValueGestureOperationType.DRAG:
				return "ドラッグ";
			case EShapeActionValueGestureOperationType.PINCH:
				return "ピンチ";
		}
		return "不明";
	}

	override toMiscTypeLabel(type: EShapeActionValueMiscType): string {
		switch (type) {
			case EShapeActionValueMiscType.INPUT_TEXT:
				return "入力（テキスト）";
			case EShapeActionValueMiscType.INPUT_INTEGER:
				return "入力（整数）";
			case EShapeActionValueMiscType.INPUT_REAL:
				return "入力（実数）";
			case EShapeActionValueMiscType.EMIT_EVENT:
				return this.toOnInputActionLabel(EShapeActionValueOnInputAction.EMIT_EVENT);
			case EShapeActionValueMiscType.WRITE_BOTH:
				return this.toOnInputActionLabel(EShapeActionValueOnInputAction.WRITE_BOTH);
			case EShapeActionValueMiscType.WRITE_LOCAL:
				return this.toOnInputActionLabel(EShapeActionValueOnInputAction.WRITE_LOCAL);
			case EShapeActionValueMiscType.WRITE_REMOTE:
				return this.toOnInputActionLabel(EShapeActionValueOnInputAction.WRITE_REMOTE);
			case EShapeActionValueMiscType.HTML_ELEMENT:
				return "HTML要素";
			case EShapeActionValueMiscType.HTML_ELEMENT_WITHOUT_POINTER_EVENTS:
				return "HTML要素（ポインター無効）";
			case EShapeActionValueMiscType.SHOW_HIDE_LAYER:
				return "レイヤー表示切替";
			case EShapeActionValueMiscType.GESTURE_LAYER:
				return "レイヤー操作";
			case EShapeActionValueMiscType.GESTURE:
				return "操作";
			case EShapeActionValueMiscType.EXECUTE:
				return "実行";
			default:
				if (EShapeActionValueMiscType.EXTENSION <= type) {
					const extension = EShapeActionMiscExtensions.get(type);
					if (extension) {
						return extension.label;
					}
					return "拡張";
				} else {
					return "不明";
				}
		}
	}

	override toHtmlElementWhenLabel(when: UtilHtmlElementWhen): string {
		switch (when) {
			case UtilHtmlElementWhen.CLICKED:
				return "クリック時";
			case UtilHtmlElementWhen.DOUBLE_CLICKED:
				return "ダブルクリック時";
			case UtilHtmlElementWhen.FOCUSED:
				return "フォーカス時";
			case UtilHtmlElementWhen.ALWAYS:
				return "常時";
		}
		return "不明";
	}

	override toOnInputActionLabel(type: EShapeActionValueOnInputAction): string {
		switch (type) {
			case EShapeActionValueOnInputAction.EMIT_EVENT:
				return "イベント発火";
			case EShapeActionValueOnInputAction.WRITE_BOTH:
				return "書込み（両方）";
			case EShapeActionValueOnInputAction.WRITE_LOCAL:
				return "書込み（ローカル）";
			case EShapeActionValueOnInputAction.WRITE_REMOTE:
				return "書込み（リモート）";
		}
		return "不明";
	}
}
