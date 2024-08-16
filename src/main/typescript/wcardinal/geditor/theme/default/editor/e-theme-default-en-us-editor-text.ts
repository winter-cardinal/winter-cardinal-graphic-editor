import { EThemeDefaultEditorText } from "./e-theme-default-editor-text";

export class EThemeDefaultEnUsEditorText extends EThemeDefaultEditorText {
	override getLabel(): string | undefined {
		return "Text";
	}

	override getTextFontLabel(): string | undefined {
		return "Font";
	}

	override getFontFamilies(): Map<string, string> {
		const result = new Map<string, string>();
		result.set("auto", "Auto");
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
			"Hiragino Kaku Gothic"
		);
		result.set('"Hiragino Maru Gothic Pro", sans-serif', "Hiragino Maru Gothic");
		result.set('"Hiragino Mincho Pro", serif', "Hiragino Mincho");
		result.set(
			'"Impact", "Charcoal", "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", sans-serif',
			"Impact"
		);
		result.set('"MS Gothic", sans-serif', "MS Gothic");
		result.set('"MS Mincho", serif', "MS Mincho");
		result.set('"MS PGothic", sans-serif', "MS PGothic");
		result.set('"MS PMincho", serif', "MS PMincho");
		result.set('"Meiryo", sans-serif', "Meiryo");
		result.set('"Meiryo UI", sans-serif', "Meiryo UI");
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
		result.set('"YuGothic", "Hiragino Sans", sans-serif', "YuGothic");
		result.set('"YuGothic UI", "Hiragino Sans", sans-serif', "YuGothic UI");
		result.set('"YuMincho", serif', "YuMincho");
		return result;
	}

	override getButtonFontSizeIncreaseTitle(): string | undefined {
		return "Increase Font Size";
	}

	override getButtonFontSizeDecreaseTitle(): string | undefined {
		return "Decrease Font Size";
	}

	override getButtonFontItalicTitle(): string | undefined {
		return "Italic Font";
	}

	override getButtonFontBoldTitle(): string | undefined {
		return "Bold Font";
	}

	override getButtonOutlineLabel(): string | undefined {
		return "Text Outline";
	}

	override getInputOutlineWidthLabel(): string | undefined {
		return "Width";
	}

	override getTextAlignLabel(): string | undefined {
		return "Text Align";
	}

	override getButtonAlignOutsideLeftTitle(): string | undefined {
		return "Align Outside Left";
	}

	override getButtonAlignLeftTitle(): string | undefined {
		return "Align Left";
	}

	override getButtonAlignCenterTitle(): string | undefined {
		return "Align Center";
	}

	override getButtonAlignRightTitle(): string | undefined {
		return "Align Right";
	}

	override getButtonAlignOutsideRightTitle(): string | undefined {
		return "Align Outside Right";
	}

	override getButtonAlignOutsideTopTitle(): string | undefined {
		return "Align Outside Top";
	}

	override getButtonAlignTopTitle(): string | undefined {
		return "Align Top";
	}

	override getButtonAlignMiddleTitle(): string | undefined {
		return "Align Middle";
	}

	override getButtonAlignBottomTitle(): string | undefined {
		return "Align Bottom";
	}

	override getButtonAlignOutsideBottomTitle(): string | undefined {
		return "Align Outside Bottom";
	}

	override getButtonDirectionLeftToRightTitle(): string | undefined {
		return "Left to Right";
	}

	override getButtonDirectionTopToBottomTitle(): string | undefined {
		return "Top to Bottom";
	}

	override getButtonDirectionBottomToTopTitle(): string | undefined {
		return "Bottom to Top";
	}

	override getButtonDirectionRightToLeftTitle(): string | undefined {
		return "Right to Left";
	}

	override getButtonClippingLabel(): string | undefined {
		return "Text Clipping";
	}

	override getButtonFittingLabel(): string | undefined {
		return "Text Fitting";
	}

	override getTextSpacingLabel(): string | undefined {
		return "Letter Spacing";
	}

	override getTextPaddingLabel(): string | undefined {
		return "Text Padding";
	}

	override getTextOffsetLabel(): string | undefined {
		return "Text Offset";
	}
}
