import { ESubthemeDefaultEditorShapeButton } from "./e-subtheme-default-editor-shape-button";

export class ESubthemeDefaultJaJpEditorShapeButton extends ESubthemeDefaultEditorShapeButton {
	override getCheckIsToggleLabel(): string {
		return "トグル";
	}

	override getCheckIsGroupedLabel(): string {
		return "グルーピング";
	}

	override getCheckIsActiveLabel(): string {
		return "アクティブ";
	}
}
