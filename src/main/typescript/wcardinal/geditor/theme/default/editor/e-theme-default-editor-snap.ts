import { ESnapperTargetValue, ESnapperTargetValueType } from "@wcardinal/wcardinal-ui";
import type { EThemeEditorSnap } from "../../../editor/e-editor-snap";
import { EThemeDefaultEditor } from "./e-theme-default-editor";

export abstract class EThemeDefaultEditorSnap
	extends EThemeDefaultEditor
	implements EThemeEditorSnap
{
	abstract getLabel(): string | undefined;

	abstract getButtonTargetLabel(): string | undefined;

	abstract getButtonTargetNewTitle(): string | undefined;

	abstract getButtonTargetDeleteTitle(): string | undefined;

	abstract getButtonTargetBringForwardTitle(): string | undefined;

	abstract getButtonTargetSendBackwardTitle(): string | undefined;

	abstract getButtonTargetEyeTitle(): string | undefined;

	getListTargetItemLabel(value: ESnapperTargetValue): string | undefined {
		if (value.type === ESnapperTargetValueType.VERTICAL) {
			return `X: ${value.position}`;
		} else {
			return `Y: ${value.position}`;
		}
	}

	abstract getButtonGridLabel(): string | undefined;

	abstract getButtonGridEyeTitle(): string | undefined;

	abstract getInputGridSizeLabel(): string | undefined;
}
