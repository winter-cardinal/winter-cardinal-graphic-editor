import { DThemeDialogLayered, DThemes } from "@wcardinal/wcardinal-ui";
import type { EDialogActionKeyword, EThemeDialogAction } from "../../../editor/e-dialog-action";

export abstract class EThemeDefaultDialogAction
	extends DThemes.getClass<DThemeDialogLayered>("DDialogLayered")
	implements EThemeDialogAction
{
	abstract getSelectActionLabel(): string | undefined;

	abstract getButtonKeywordTitle(): string | undefined;

	abstract getInputOriginXLabel(): string | undefined;

	abstract getInputOriginYLabel(): string | undefined;

	abstract getSelectWhenLabel(): string | undefined;

	abstract getSelectLayerLabel(): string | undefined;

	abstract getInputConditionLabel(): string | undefined;

	abstract getInputIntervalLabel(): string | undefined;

	abstract getInputIntervalUnitLabel(): string | undefined;

	abstract getInputSizeLabel(): string | undefined;

	abstract getInputAmountLabel(): string | undefined;

	abstract getInputValueLabel(): string | undefined;

	abstract getInputInitializationLabel(): string | undefined;

	abstract getCheckPointEventsLabel(): string | undefined;

	abstract getInputTargetNameLabel(): string | undefined;

	abstract getButtonColorLabel(): string | undefined;

	abstract getInputTargetLabel(): string | undefined;

	abstract getInputArgumentLabel(): string | undefined;

	abstract getInputColorCodeLabel(): string | undefined;

	abstract getInputAlphaCodeLabel(): string | undefined;

	abstract getInputBrightnessLabel(): string | undefined;

	abstract getInputBlendLabel(): string | undefined;

	abstract getInputInitialLabel(): string | undefined;

	abstract getInputStepLabel(): string | undefined;

	abstract getInputMinLabel(): string | undefined;

	abstract getInputMaxLabel(): string | undefined;

	abstract getInputScaleLabel(): string | undefined;

	abstract getCheckBringToFrontLabel(): string | undefined;

	abstract getCheckInNewWindowLabel(): string | undefined;

	abstract newKeywords(): EDialogActionKeyword[];

	protected newKeyword(keyword: string, type: string, description: string): EDialogActionKeyword {
		return {
			keyword,
			type,
			description
		};
	}
}
