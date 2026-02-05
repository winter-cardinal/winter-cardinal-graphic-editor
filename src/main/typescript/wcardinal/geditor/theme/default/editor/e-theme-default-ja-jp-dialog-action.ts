import type { EDialogActionKeyword } from "../../../editor/e-dialog-action";
import { EThemeDefaultDialogAction } from "./e-theme-default-dialog-action";

export class EThemeDefaultJaJpDialogAction extends EThemeDefaultDialogAction {
	override getSelectActionLabel(): string | undefined {
		return "種別";
	}

	override getButtonKeywordTitle(): string | undefined {
		return "キーワードリストの表示切替";
	}

	override getInputOriginXLabel(): string | undefined {
		return "基準X";
	}

	override getInputOriginYLabel(): string | undefined {
		return "基準Y";
	}

	override getSelectWhenLabel(): string | undefined {
		return "条件";
	}

	override getSelectLayerLabel(): string | undefined {
		return "レイヤー";
	}

	override getInputConditionLabel(): string | undefined {
		return "条件";
	}

	override getInputIntervalLabel(): string | undefined {
		return "周期";
	}

	override getInputIntervalUnitLabel(): string | undefined {
		return "ミリ秒";
	}

	override getInputSizeLabel(): string | undefined {
		return "サイズ";
	}

	override getInputAmountLabel(): string | undefined {
		return "量";
	}

	override getInputValueLabel(): string | undefined {
		return "値";
	}

	override getInputInitializationLabel(): string | undefined {
		return "初期化";
	}

	override getCheckPointEventsLabel(): string | undefined {
		return "ポインター操作";
	}

	override getInputTargetNameLabel(): string | undefined {
		return "名前";
	}

	override getButtonColorLabel(): string | undefined {
		return "色";
	}

	override getInputTargetLabel(): string | undefined {
		return "対象";
	}

	override getInputArgumentLabel(): string | undefined {
		return "引数";
	}

	override getInputColorCodeLabel(): string | undefined {
		return "RGB";
	}

	override getInputAlphaCodeLabel(): string | undefined {
		return "透明度";
	}

	override getInputBrightnessLabel(): string | undefined {
		return "明るさ";
	}

	override getInputBlendLabel(): string | undefined {
		return "混合比率";
	}

	override getInputInitialLabel(): string | undefined {
		return "初期値";
	}

	override getInputStepLabel(): string | undefined {
		return "間隔";
	}

	override getInputMinLabel(): string | undefined {
		return "最小値";
	}

	override getInputMaxLabel(): string | undefined {
		return "最大値";
	}

	override getInputScaleLabel(): string | undefined {
		return "上下限";
	}

	override getCheckBringToFrontLabel(): string | undefined {
		return "最前面へ移動";
	}

	override getCheckInNewWindowLabel(): string | undefined {
		return "新規ウィンドウ";
	}

	/* eslint-disable prettier/prettier */
	override newKeywords(): EDialogActionKeyword[] {
		const result: EDialogActionKeyword[] = [];

		// Basics
		result.push(this.newKeyword("time", "number", "現在のUNIXミリ秒"));

		// States
		result.push(this.newKeyword("isInitializing", "boolean", "シェイプが初期化済みかどうかの真偽値"));
		result.push(this.newKeyword("isHovered", "boolean", "シェイプにHover中かどうかの真偽値"));
		result.push(this.newKeyword("isActive", "boolean", "シェイプがアクティブかどうかの真偽値"));
		result.push(this.newKeyword("isActivated", "boolean", "シェイプがアクティブになる時に真となる真偽値"));
		result.push(this.newKeyword("isDeactivated", "boolean", "シェイプが非アクティブになる時に真となる真偽値"));
		result.push(this.newKeyword("isPressed", "boolean", "シェイプが押下されているかどうかの真偽値"));
		result.push(this.newKeyword("isReadOnly", "boolean", "シェイプが読み取り専用かどうかの真偽値"));
		result.push(this.newKeyword("isEnabled", "boolean", "シェイプが有効かどうかの真偽値"));
		result.push(this.newKeyword("isDisabled", "boolean", "シェイプが非有効かどうかの真偽値"));
		result.push(this.newKeyword("isActionable", "boolean", "シェイプがアクション可能な状態かどうかの真偽値"));
		result.push(this.newKeyword("isGesturing", "boolean", "シェイプがドラッグ等による操作中かどうかの真偽値"));
		result.push(this.newKeyword("isFocused", "boolean", "シェイプがフォーカスされているかどうかの真偽値"));
		result.push(this.newKeyword("isFocusable", "boolean", "シェイプがフォーカス可能かどうかの真偽値"));
		result.push(this.newKeyword("isUnfocusable", "boolean", "シェイプがフォーカス不可能かどうかの真偽値"));
		result.push(this.newKeyword("isClicked", "boolean", "シェイプがクリックされた時に真となる真偽値"));
		result.push(this.newKeyword("isDblClicked", "boolean", "シェイプがダブルクリックされた時に真となる真偽値"));
		result.push(this.newKeyword("isDown", "boolean", "シェイプ上でポインターかキーが押下された時に真となる真偽値"));
		result.push(this.newKeyword("isUp", "boolean", "シェイプ上でポインターかキーが離された時に真となる真偽値"));
		result.push(this.newKeyword("isUpOutside", "boolean", "シェイプ外でポインターかキーが離された時に真となる真偽値"));
		result.push(this.newKeyword("isRightClicked", "boolean", "シェイプが右クリックされた時に真となる真偽値"));
		result.push(this.newKeyword("isRightDown", "boolean", "シェイプ上で右ポインターが押下された時に真となる真偽値"));
		result.push(this.newKeyword("isRightUp", "boolean", "シェイプ上で右ポインターが離されたときに真となる真偽値"));
		result.push(this.newKeyword("isRightUpOutside", "boolean", "シェイプ外で右ポインターが離されたときに真となる真偽値"));
		result.push(this.newKeyword("isRightPressed", "boolean", "シェイプが右ポインターで押下されているかどうかの真偽値"));

		// Shape properties
		result.push(this.newKeyword("id", "string", "シェイプID"));
		result.push(this.newKeyword("type", "number", "シェイプ種別"));
		result.push(this.newKeyword("size.x", "number", "シェイプの横幅"));
		result.push(this.newKeyword("size.y", "number", "シェイプの高さ"));
		result.push(this.newKeyword("fill.enable", "boolean", "シェイプの塗りが有効かどうかの真偽値"));
		result.push(this.newKeyword("fill.color", "number", "シェイプの塗りのRGB色"));
		result.push(this.newKeyword("fill.alpha", "number", "シェイプの塗りの透明度"));
		result.push(this.newKeyword("fill.percent", "number", "シェイプの塗り%"));
		result.push(this.newKeyword("stroke.enable", "boolean", "シェイプの境界線が有効かどうかの真偽値"));
		result.push(this.newKeyword("stroke.color", "number", "シェイプの境界線のRGB色"));
		result.push(this.newKeyword("stroke.alpha", "number", "シェイプの境界線の透明度"));
		result.push(this.newKeyword("stroke.width", "number", "シェイプの境界線の線幅"));
		result.push(this.newKeyword("stroke.align", "number", "シェイプの境界線の位置"));
		result.push(this.newKeyword("transform.position.x", "number", "シェイプのX座標"));
		result.push(this.newKeyword("transform.position.y", "number", "シェイプのY座標"));
		result.push(this.newKeyword("transform.pivot.x", "number", "シェイプのXピボット位置"));
		result.push(this.newKeyword("transform.pivot.y", "number", "シェイプのYピボット位置"));
		result.push(this.newKeyword("transform.rotation", "number", "シェイプの回転角度（ラジアン単位）"));
		result.push(this.newKeyword("transform.skew.x", "number", "シェイプの歪のX成分"));
		result.push(this.newKeyword("transform.skew.y", "number", "シェイプの歪のY成分"));
		result.push(this.newKeyword("transform.scale.x", "number", "シェイプの拡大縮小率のX成分"));
		result.push(this.newKeyword("transform.scale.y", "number", "シェイプの拡大縮小率のY成分"));
		result.push(this.newKeyword("points.length", "number", "シェイプのポイント数"));
		result.push(this.newKeyword("points.values", "number[]", "シェイプのポイント配列"));
		result.push(this.newKeyword("text.value", "string", "シェイプのテキスト値"));
		result.push(this.newKeyword("text.color", "number", "シェイプのテキストのRGB色"));
		result.push(this.newKeyword("text.alpha", "number", "シェイプのテキストの透明度"));
		result.push(this.newKeyword("text.family", "string", "シェイプのテキストのフォントファミリー"));
		result.push(this.newKeyword("text.size", "number", "シェイプのテキストのフォントサイズ"));
		result.push(this.newKeyword("cursor", "string", "シェイプに割り当てられているカーソル"));
		result.push(this.newKeyword("shortcut", "string | undefined", "シェイプに割り当てられているショートカット"));
		result.push(this.newKeyword("title", "string | undefined", "シェイプに割り当てられているツールチップテキスト"));
		result.push(this.newKeyword("visible", "boolean", "シェイプが可視かどうかの真偽値"));
		result.push(this.newKeyword("interactive", "boolean", "シェイプがポインターに反応するかどうかの真偽値"));

		// First data
		result.push(this.newKeyword("data.id", "string", "最初のデータのID"));
		result.push(this.newKeyword("data.initial", "string", "最初のデータの初期値式"));
		result.push(this.newKeyword("data.format", "string", "最初のデータの書式式"));
		result.push(this.newKeyword("data.capacity", "number", "最初のデータのデータ保存個数上限"));
		result.push(this.newKeyword("data.order", "number", "最初のデータの並び順（0: 昇順、1: 降順）"));
		result.push(this.newKeyword("data.value", "unknown", "最初のデータのデータ値"));
		result.push(this.newKeyword("data.nvalue", "number", "最初のデータの正規化後のデータ値"));
		result.push(this.newKeyword("data.time", "number", "最初のデータのUNIXミリ秒"));
		result.push(this.newKeyword("data.values", "unknown[]", "最初のデータのデータ配列"));
		result.push(this.newKeyword("data.times", "number[]", "最初のデータのUNIXミリ秒の配列"));
		result.push(this.newKeyword("data.range.from", "number", "最初のデータの下限"));
		result.push(this.newKeyword("data.range.to", "number", "最初のデータの上限"));

		// Data by index
		result.push(this.newKeyword("data.get(n).id", "string", "n番目のデータのID"));
		result.push(this.newKeyword("data.get(n).initial", "string", "n番目のデータの初期値式"));
		result.push(this.newKeyword("data.get(n).format", "string", "n番目のデータの書式式"));
		result.push(this.newKeyword("data.get(n).capacity", "number", "n番目のデータのデータ保存個数上限"));
		result.push(this.newKeyword("data.get(n).order", "number", "n番目のデータの並び順（0: 昇順、1: 降順）"));
		result.push(this.newKeyword("data.get(n).value", "unknown", "n番目のデータのデータ値"));
		result.push(this.newKeyword("data.get(n).nvalue", "number", "n番目のデータの正規化後のデータ値"));
		result.push(this.newKeyword("data.get(n).time", "number", "n番目のデータのUNIXミリ秒"));
		result.push(this.newKeyword("data.get(n).values", "unknown[]", "n番目のデータのデータ配列"));
		result.push(this.newKeyword("data.get(n).times", "number[]", "n番目のデータのUNIXミリ秒の配列"));
		result.push(this.newKeyword("data.get(n).range.from", "number", "n番目のデータの下限"));
		result.push(this.newKeyword("data.get(n).range.to", "number", "n番目のデータの上限"));

		// Data by alias
		result.push(this.newKeyword("${alias}.id", "string", "エイリアスが指すデータのID"));
		result.push(this.newKeyword("${alias}.initial", "string", "エイリアスが指すデータの初期値式"));
		result.push(this.newKeyword("${alias}.format", "string", "エイリアスが指すデータの書式式"));
		result.push(this.newKeyword("${alias}.capacity", "number", "エイリアスが指すデータのデータ保存個数上限"));
		result.push(this.newKeyword("${alias}.order", "number", "エイリアスが指すデータの並び順（0: 昇順、1: 降順）"));
		result.push(this.newKeyword("${alias}.value", "unknown", "エイリアスが指すデータのデータ値"));
		result.push(this.newKeyword("${alias}.nvalue", "number", "エイリアスが指すデータの正規化後のデータ値"));
		result.push(this.newKeyword("${alias}.time", "number", "エイリアスが指すデータのUNIXミリ秒"));
		result.push(this.newKeyword("${alias}.values", "unknown[]", "エイリアスが指すデータのデータ配列"));
		result.push(this.newKeyword("${alias}.times", "number[]", "エイリアスが指すデータのUNIXミリ秒の配列"));
		result.push(this.newKeyword("${alias}.range.from", "number", "エイリアスが指すデータの下限"));
		result.push(this.newKeyword("${alias}.range.to", "number", "エイリアスが指すデータの上限"));

		return result;
	}
	/* eslint-enable prettier/prettier */
}
