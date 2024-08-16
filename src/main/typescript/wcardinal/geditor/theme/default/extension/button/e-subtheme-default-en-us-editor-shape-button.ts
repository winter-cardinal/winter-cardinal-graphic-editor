import { ESubthemeDefaultEditorShapeButton } from "./e-subtheme-default-editor-shape-button";

export class ESubthemeDefaultEnUsEditorShapeButton extends ESubthemeDefaultEditorShapeButton {
	override getCheckIsToggleLabel(): string {
		return "Toggle";
	}

	override getCheckIsGroupedLabel(): string {
		return "Grouped";
	}

	override getCheckIsActiveLabel(): string {
		return "Active";
	}
}
