import { EThemeDefaultEditorLayer } from "./e-theme-default-editor-layer";

export class EThemeDefaultJaJpEditorLayer extends EThemeDefaultEditorLayer {
	override getLabel(): string | undefined {
		return "レイヤー";
	}

	override getButtonNewTitle(): string | undefined {
		return "新規レイヤー";
	}

	override getButtonDeleteTitle(): string | undefined {
		return "選択レイヤーの削除";
	}

	override getButtonBringForwardTitle(): string | undefined {
		return "選択レイヤーを前面へ移動";
	}

	override getButtonSendBackwardTitle(): string | undefined {
		return "選択レイヤーを背面へ移動";
	}
}
