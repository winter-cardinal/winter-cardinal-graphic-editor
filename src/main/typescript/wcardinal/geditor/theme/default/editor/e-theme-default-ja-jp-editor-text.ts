import { EThemeDefaultEditorText } from "./e-theme-default-editor-text";

export class EThemeDefaultJaJpEditorText extends EThemeDefaultEditorText {
	override getLabel(): string | undefined {
		return "テキスト";
	}

	override getTextFontLabel(): string | undefined {
		return "フォント";
	}

	override getFontFamilies(): Map<string, string> {
		const result = new Map<string, string>();
		result.set("auto", "自動");
		result.set('"Arial", "Helvetica Neue", "Helvetica", sans-serif', "Arial");
		result.set(
			'"Calibri", "Candara", "Segoe", "Segoe UI", "Optima", "Arial", sans-serif',
			"Calibri"
		);
		result.set('"Cambria", "Georgia", serif', "Cambria");
		result.set(
			'"Candara", "Calibri","Segoe", "Segoe UI", "Optima", "Arial", sans-serif',
			"Candara"
		);
		result.set(
			'"Century Gothic", "CenturyGothic", "AppleGothic", sans-serif',
			"Century Gothic"
		);
		result.set('"Consolas", "monaco", monospace', "Consolas");
		result.set('"Copperplate", "Copperplate Gothic Light", fantasy', "Copperplate");
		result.set(
			'"Courier New", "Courier", "Lucida Sans Typewriter", "Lucida Typewriter", monospace',
			"Courier New"
		);
		result.set('"Dejavu Sans", "Arial", "Verdana", sans-serif', "Dejavu Sans");
		result.set('"Georgia", "Cambria", serif', "Georgia");
		result.set('"Helvetica", "Helvetica Neue", "Arial", sans-serif', "Helvetica");
		result.set(
			'"Hiragino Kaku Gothic Std", "Hiragino Kaku Gothic Pro", "Hiragino Sans", sans-serif',
			"ヒラギノ角ゴ"
		);
		result.set('"Hiragino Maru Gothic Pro", sans-serif', "ヒラギノ丸ゴ");
		result.set('"Hiragino Mincho Pro", serif', "ヒラギノ明朝");
		result.set(
			'"Impact", "Charcoal", "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", sans-serif',
			"Impact"
		);
		result.set('"MS Gothic", sans-serif', "ＭＳ ゴシック");
		result.set('"MS Mincho", serif', "ＭＳ 明朝");
		result.set('"MS PGothic", sans-serif', "ＭＳ Ｐゴシック");
		result.set('"MS PMincho", serif', "ＭＳ Ｐ明朝");
		result.set('"Meiryo", sans-serif', "メイリオ");
		result.set('"Meiryo UI", sans-serif', "メイリオＵＩ");
		result.set(
			'"Optima", "Segoe UI", "Segoe", "Candara", "Calibri", "Arial", sans-serif',
			"Optima"
		);
		result.set('"Roboto", system-ui', "Roboto");
		result.set(
			'"Segoe", "Candara", "Calibri","Segoe UI", "Optima", "Arial", sans-serif',
			"Segoe"
		);
		result.set(
			'"Segoe UI", "Segoe", "Candara", "Calibri", "Optima", "Arial", sans-serif',
			"Segoe UI"
		);
		result.set('"Verdana", "Dejavu Sans", "Arial", sans-serif', "Verdana");
		result.set('"YuGothic", "Hiragino Sans", sans-serif', "游ゴシック");
		result.set('"YuGothic UI", "Hiragino Sans", sans-serif', "游ゴシックＵＩ");
		result.set('"YuMincho", serif', "游明朝");
		return result;
	}

	override getButtonFontSizeIncreaseTitle(): string | undefined {
		return "フォントサイズの拡大";
	}

	override getButtonFontSizeDecreaseTitle(): string | undefined {
		return "フォントサイズの縮小";
	}

	override getButtonFontItalicTitle(): string | undefined {
		return "斜体";
	}

	override getButtonFontBoldTitle(): string | undefined {
		return "太字";
	}

	override getButtonOutlineLabel(): string | undefined {
		return "輪郭線";
	}

	override getInputOutlineWidthLabel(): string | undefined {
		return "線幅";
	}

	override getTextAlignLabel(): string | undefined {
		return "配置";
	}

	override getButtonAlignOutsideLeftTitle(): string | undefined {
		return "左外揃え";
	}

	override getButtonAlignLeftTitle(): string | undefined {
		return "左揃え";
	}

	override getButtonAlignCenterTitle(): string | undefined {
		return "中央揃え";
	}

	override getButtonAlignRightTitle(): string | undefined {
		return "右揃え";
	}

	override getButtonAlignOutsideRightTitle(): string | undefined {
		return "右外揃え";
	}

	override getButtonAlignOutsideTopTitle(): string | undefined {
		return "上外揃え";
	}

	override getButtonAlignTopTitle(): string | undefined {
		return "上揃え";
	}

	override getButtonAlignMiddleTitle(): string | undefined {
		return "上下中央揃え";
	}

	override getButtonAlignBottomTitle(): string | undefined {
		return "下揃え";
	}

	override getButtonAlignOutsideBottomTitle(): string | undefined {
		return "下外揃え";
	}

	override getButtonDirectionLeftToRightTitle(): string | undefined {
		return "左から右";
	}

	override getButtonDirectionTopToBottomTitle(): string | undefined {
		return "上から下";
	}

	override getButtonDirectionBottomToTopTitle(): string | undefined {
		return "下から上";
	}

	override getButtonDirectionRightToLeftTitle(): string | undefined {
		return "右から左";
	}

	override getButtonClippingLabel(): string | undefined {
		return "クリッピング";
	}

	override getButtonFittingLabel(): string | undefined {
		return "フィッティング";
	}

	override getTextSpacingLabel(): string | undefined {
		return "文字間隔";
	}

	override getTextPaddingLabel(): string | undefined {
		return "パティング";
	}

	override getTextOffsetLabel(): string | undefined {
		return "オフセット";
	}
}
