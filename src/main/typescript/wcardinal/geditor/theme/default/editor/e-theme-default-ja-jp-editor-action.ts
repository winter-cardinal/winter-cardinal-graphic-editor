import { EThemeDefaultEditorAction } from "./e-theme-default-editor-action";

export class EThemeDefaultJaJpEditorAction extends EThemeDefaultEditorAction {
	override getLabel(): string | undefined {
		return "アクション";
	}

	override getButtonNewTitle(): string | undefined {
		return "新規アクション";
	}

	override getButtonDeleteTitle(): string | undefined {
		return "アクションを削除";
	}

	override getButtonBringForwardTitle(): string | undefined {
		return "選択アクションを上へ移動";
	}

	override getButtonSendBackwardTitle(): string | undefined {
		return "選択アクションを下へ移動";
	}

	override getCheckInteractiveLabel(): string | undefined {
		return "インタラクティブ";
	}

	override getCheckFocusableLabel(): string | undefined {
		return "フォーカス";
	}

	override getInputShortcutLabel(): string | undefined {
		return "ショートカット";
	}

	override getInputTitleLabel(): string | undefined {
		return "ツールチップ";
	}

	override getDropdownCursorLabel(): string | undefined {
		return "カーソル";
	}

	override getCursors(): Map<string, string> {
		const result = new Map<string, string>();
		result.set("", "なし");
		result.set("default", "デフォルト");
		result.set("context-menu", "コンテキストメニュー");
		result.set("help", "ヘルプ");
		result.set("pointer", "ポインター");
		result.set("progress", "プログレス");
		result.set("wait", "ビジー");
		result.set("cell", "セル");
		result.set("crosshair", "十字");
		result.set("text", "テキスト");
		result.set("vertical-text", "縦書きテキスト");
		result.set("alias", "エイリアス");
		result.set("copy", "コピー");
		result.set("move", "移動");
		result.set("no-drop", "ドロップ禁止");
		result.set("not-allowed", "禁止");
		result.set("grab", "掴む");
		result.set("grabbing", "掴んでいる");
		result.set("all-scroll", "スクロール");
		result.set("col-resize", "水平リサイズ");
		result.set("row-resize", "垂直リサイズ");
		result.set("n-resize", "リサイズ（北）");
		result.set("e-resize", "リサイズ（東）");
		result.set("s-resize", "リサイズ（南）");
		result.set("w-resize", "リサイズ（西）");
		result.set("ne-resize", "リサイズ（北東）");
		result.set("nw-resize", "リサイズ（北西）");
		result.set("se-resize", "リサイズ（南東）");
		result.set("sw-resize", "リサイズ（南西）");
		result.set("ew-resize", "リサイズ（東西）");
		result.set("ns-resize", "リサイズ（南北）");
		result.set("nesw-resize", "リサイズ（北東から南西）");
		result.set("nwse-resize", "リサイズ（北西から南東）");
		result.set("zoom-in", "ズームイン");
		result.set("zoom-out", "ズームアウト");
		return result;
	}
}
