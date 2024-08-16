import { EThemeDefaultEditorDataMapping } from "./e-theme-default-editor-data-mapping";

export class EThemeDefaultJaJpEditorDataMapping extends EThemeDefaultEditorDataMapping {
	override getLabel(): string | undefined {
		return "データ変換";
	}

	override getButtonNewTitle(): string | undefined {
		return "新規データ変換";
	}

	override getButtonDeleteTitle(): string | undefined {
		return "選択データ変換を削除";
	}

	override getButtonBringForwardTitle(): string | undefined {
		return "選択データ変換を上へ移動";
	}

	override getButtonSendBackwardTitle(): string | undefined {
		return "選択データ変換を下へ移動";
	}
}
