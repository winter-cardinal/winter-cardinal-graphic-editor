import { EEditorSearchConditionState } from "../../../editor/e-editor-search-condition-state";
import { EEditorSearchConditionType } from "../../../editor/e-editor-search-condition-type";
import { EThemeDefaultEditorSearch } from "./e-theme-default-editor-search";

export class EThemeDefaultEnUsEditorSearch extends EThemeDefaultEditorSearch {
	override getLabel(): string | undefined {
		return "Search";
	}

	override getInputIdLabel(): string | undefined {
		return "ID";
	}

	override getSelectTypeLabel(): string | undefined {
		return "Type";
	}

	override toTypeLabel(type: EEditorSearchConditionType): string {
		switch (type) {
			case EEditorSearchConditionType.NONE:
				return "Any";
		}
		return "Unknown";
	}

	override getSelectStateLabel(): string | undefined {
		return "State";
	}

	override toStateLabel(state: EEditorSearchConditionState): string {
		switch (state) {
			case EEditorSearchConditionState.NONE:
				return "Any";
			case EEditorSearchConditionState.CONNECTED_FULLY:
				return "Fully Connected";
			case EEditorSearchConditionState.CONNECTED_PARTIALLY:
				return "Partially Connected";
			case EEditorSearchConditionState.UNCONNECTED:
				return "Not Connected";
		}
		return "Unknown";
	}

	override getButtonExecuteTitle(): string | undefined {
		return "Execute";
	}

	override getDialogErrorLabel(): string {
		return "No Shapes Found";
	}
}
