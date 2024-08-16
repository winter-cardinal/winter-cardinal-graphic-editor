import type { EThemeEditorCoordinate } from "../../../editor/e-editor-coordinate";
import { EThemeDefaultEditor } from "./e-theme-default-editor";

export abstract class EThemeDefaultEditorCoordinate
	extends EThemeDefaultEditor
	implements EThemeEditorCoordinate
{
	abstract getLabel(): string | undefined;

	abstract getInputIdLabel(): string | undefined;

	abstract getInputPositionXLabel(): string | undefined;

	abstract getInputPositionYLabel(): string | undefined;

	abstract getInputPositionLeftLabel(): string | undefined;

	abstract getInputPositionTopLabel(): string | undefined;

	abstract getInputSizeXLabel(): string | undefined;

	abstract getInputSizeYLabel(): string | undefined;

	abstract getInputRotationLabel(): string | undefined;

	abstract getInputSkewLabel(): string | undefined;

	abstract getButtonAlignLeftTitle(): string | undefined;

	abstract getButtonAlignCenterTitle(): string | undefined;

	abstract getButtonAlignRightTitle(): string | undefined;

	abstract getButtonAlignTopTitle(): string | undefined;

	abstract getButtonAlignMiddleTitle(): string | undefined;

	abstract getButtonAlignBottomTitle(): string | undefined;

	abstract getButtonDistributeHorizontallyTitle(): string | undefined;

	abstract getButtonDistributeVerticallyTitle(): string | undefined;

	abstract getButtonRotateLeftTitle(): string | undefined;

	abstract getButtonRotateRightTitle(): string | undefined;
}
