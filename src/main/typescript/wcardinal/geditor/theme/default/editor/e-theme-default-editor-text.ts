import type { EThemeEditorText } from "../../../editor/e-editor-text";
import { EThemeDefaultEditorPane } from "./e-theme-default-editor-pane";

export abstract class EThemeDefaultEditorText
	extends EThemeDefaultEditorPane
	implements EThemeEditorText
{
	abstract getLabel(): string | undefined;

	getInputTextHeight(): number {
		return this.getLineHeight() * 3;
	}

	abstract getTextFontLabel(): string | undefined;

	abstract getFontFamilies(): Map<string, string>;

	abstract getButtonFontSizeIncreaseTitle(): string | undefined;

	abstract getButtonFontSizeDecreaseTitle(): string | undefined;

	abstract getButtonFontItalicTitle(): string | undefined;

	abstract getButtonFontBoldTitle(): string | undefined;

	abstract getButtonOutlineLabel(): string | undefined;

	abstract getInputOutlineWidthLabel(): string | undefined;

	abstract getTextAlignLabel(): string | undefined;

	abstract getButtonAlignOutsideLeftTitle(): string | undefined;

	abstract getButtonAlignLeftTitle(): string | undefined;

	abstract getButtonAlignCenterTitle(): string | undefined;

	abstract getButtonAlignRightTitle(): string | undefined;

	abstract getButtonAlignOutsideRightTitle(): string | undefined;

	abstract getButtonAlignOutsideTopTitle(): string | undefined;

	abstract getButtonAlignTopTitle(): string | undefined;

	abstract getButtonAlignMiddleTitle(): string | undefined;

	abstract getButtonAlignBottomTitle(): string | undefined;

	abstract getButtonAlignOutsideBottomTitle(): string | undefined;

	abstract getButtonDirectionLeftToRightTitle(): string | undefined;

	abstract getButtonDirectionTopToBottomTitle(): string | undefined;

	abstract getButtonDirectionBottomToTopTitle(): string | undefined;

	abstract getButtonDirectionRightToLeftTitle(): string | undefined;

	abstract getButtonClippingLabel(): string | undefined;

	abstract getButtonFittingLabel(): string | undefined;

	abstract getTextSpacingLabel(): string | undefined;

	abstract getTextPaddingLabel(): string | undefined;

	abstract getTextOffsetLabel(): string | undefined;
}
