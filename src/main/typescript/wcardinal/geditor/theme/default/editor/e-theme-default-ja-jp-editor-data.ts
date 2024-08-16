import { EThemeDefaultEditorData } from "./e-theme-default-editor-data";

export class EThemeDefaultJaJpEditorData extends EThemeDefaultEditorData {
	override getLabel(): string | undefined {
		return "データ";
	}

	override getButtonNewTitle(): string | undefined {
		return "新規データ";
	}

	override getButtonDeleteTitle(): string | undefined {
		return "選択データを削除";
	}

	override getButtonBringForwardTitle(): string | undefined {
		return "選択データを上へ移動";
	}

	override getButtonSendBackwardTitle(): string | undefined {
		return "選択データを下へ移動";
	}
}
