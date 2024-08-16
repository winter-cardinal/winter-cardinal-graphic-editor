import { ESubthemeDefaultEditorShapeButtonLayer } from "./e-subtheme-default-editor-shape-button-layer";

export class ESubthemeDefaultJaJpEditorShapeButtonLayer extends ESubthemeDefaultEditorShapeButtonLayer {
	override getButtonNewTitle(): string | undefined {
		return "列の新規作成";
	}

	override getButtonDeleteTitle(): string | undefined {
		return "選択列を削除";
	}

	override getButtonBringForwardTitle(): string | undefined {
		return "選択列を前に移動";
	}

	override getButtonSendBackwardTitle(): string | undefined {
		return "選択列を後ろに移動";
	}

	override getInputMarginLabel(): string {
		return "マージン";
	}
}
