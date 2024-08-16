import { EThemeDefaultEditorSnap } from "./e-theme-default-editor-snap";

export class EThemeDefaultJaJpEditorSnap extends EThemeDefaultEditorSnap {
	override getLabel(): string | undefined {
		return "スナップ";
	}

	override getButtonTargetLabel(): string | undefined {
		return "スナップターゲット";
	}

	override getButtonTargetNewTitle(): string | undefined {
		return "新規スナップターゲット";
	}

	override getButtonTargetDeleteTitle(): string | undefined {
		return "選択スナップターゲットを削除";
	}

	override getButtonTargetBringForwardTitle(): string | undefined {
		return "選択スナップターゲットを上へ移動";
	}

	override getButtonTargetSendBackwardTitle(): string | undefined {
		return "選択スナップターゲットを下へ移動";
	}

	override getButtonTargetEyeTitle(): string | undefined {
		return "スナップターゲットの表示";
	}

	override getButtonGridLabel(): string | undefined {
		return "スナップグリッド";
	}

	override getButtonGridEyeTitle(): string | undefined {
		return "スナップグリッドの表示";
	}

	override getInputGridSizeLabel(): string | undefined {
		return "サイズ";
	}
}
