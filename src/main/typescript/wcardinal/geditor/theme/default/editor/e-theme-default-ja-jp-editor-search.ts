import { EEditorSearchConditionState } from "../../../editor/e-editor-search-condition-state";
import { EEditorSearchConditionType } from "../../../editor/e-editor-search-condition-type";
import { EThemeDefaultEditorSearch } from "./e-theme-default-editor-search";

export class EThemeDefaultJaJpEditorSearch extends EThemeDefaultEditorSearch {
	override getLabel(): string | undefined {
		return "検索";
	}

	override getInputIdLabel(): string | undefined {
		return "ID";
	}

	override getSelectTypeLabel(): string | undefined {
		return "種別";
	}

	override toTypeLabel(type: EEditorSearchConditionType): string {
		switch (type) {
			case EEditorSearchConditionType.NONE:
				return "指定しない";
		}
		return "不明";
	}

	override getSelectStateLabel(): string | undefined {
		return "状態";
	}

	override toStateLabel(state: EEditorSearchConditionState): string {
		switch (state) {
			case EEditorSearchConditionState.NONE:
				return "指定しない";
			case EEditorSearchConditionState.CONNECTED_FULLY:
				return "完全に接続";
			case EEditorSearchConditionState.CONNECTED_PARTIALLY:
				return "部分的に接続";
			case EEditorSearchConditionState.UNCONNECTED:
				return "接続していない";
		}
		return "不明";
	}

	override getButtonExecuteTitle(): string | undefined {
		return "実行";
	}

	override getDialogErrorLabel(): string {
		return "シェイプが見つかりません";
	}
}
