import { EThemeDefaultEditorCanvas } from "./e-theme-default-editor-canvas";

export class EThemeDefaultJaJpEditorCanvas extends EThemeDefaultEditorCanvas {
	override getLabel(): string | undefined {
		return "キャンバス";
	}

	override getDefaultName(): string {
		return "名称未設定";
	}

	override getInputNameLabel(): string | undefined {
		return "名前";
	}

	override getInputLabelLabel(): string | undefined {
		return "表示名称";
	}

	override getInputWidthLabel(): string | undefined {
		return "幅";
	}

	override getInputHeightLabel(): string | undefined {
		return "高さ";
	}

	override getSelectCategoryLabel(): string | undefined {
		return "カテゴリ";
	}

	override getInputBackgroundLabel(): string | undefined {
		return "背景";
	}

	override getInputSummaryLabel(): string | undefined {
		return "概要";
	}

	override getInputDescriptionLabel(): string | undefined {
		return "説明";
	}
}
