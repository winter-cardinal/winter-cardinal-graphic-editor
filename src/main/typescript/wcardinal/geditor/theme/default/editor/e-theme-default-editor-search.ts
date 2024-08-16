import type { EThemeEditorSearch } from "../../../editor/e-editor-search";
import { EEditorSearchConditionState } from "../../../editor/e-editor-search-condition-state";
import { EEditorSearchConditionType } from "../../../editor/e-editor-search-condition-type";
import { EThemeDefaultEditor } from "./e-theme-default-editor";

export abstract class EThemeDefaultEditorSearch
	extends EThemeDefaultEditor
	implements EThemeEditorSearch
{
	abstract getLabel(): string | undefined;
	abstract getInputIdLabel(): string | undefined;
	abstract getSelectTypeLabel(): string | undefined;
	abstract toTypeLabel(type: EEditorSearchConditionType): string;
	abstract getSelectStateLabel(): string | undefined;
	abstract toStateLabel(state: EEditorSearchConditionState): string;
	abstract getButtonExecuteTitle(): string | undefined;
	abstract getDialogErrorLabel(): string;
}
