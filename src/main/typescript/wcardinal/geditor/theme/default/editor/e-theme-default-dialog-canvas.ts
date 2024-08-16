import { DThemeDialogLayered, DThemes } from "@wcardinal/wcardinal-ui";
import type { EThemeEditorCanvas } from "../../../editor/e-editor-canvas";
import type { EThemeDialogCanvas } from "../../../editor/e-dialog-canvas";

export class EThemeDefaultDialogCanvas
	extends DThemes.getClass<DThemeDialogLayered>("DDialogLayered")
	implements EThemeDialogCanvas
{
	protected _editorCanvas: EThemeEditorCanvas;

	constructor() {
		super();
		this._editorCanvas = DThemes.get<EThemeEditorCanvas>("EEditorCanvas");
	}

	getInputNameLabel(): string | undefined {
		return this._editorCanvas.getInputNameLabel();
	}

	getInputLabelLabel(): string | undefined {
		return this._editorCanvas.getInputLabelLabel();
	}

	getInputWidthLabel(): string | undefined {
		return this._editorCanvas.getInputWidthLabel();
	}

	getInputHeightLabel(): string | undefined {
		return this._editorCanvas.getInputHeightLabel();
	}

	getSelectCategoryLabel(): string | undefined {
		return this._editorCanvas.getSelectCategoryLabel();
	}

	getInputSummaryLabel(): string | undefined {
		return this._editorCanvas.getInputSummaryLabel();
	}

	getInputDescriptionLabel(): string | undefined {
		return this._editorCanvas.getInputDescriptionLabel();
	}

	getInputBackgroundLabel(): string | undefined {
		return this._editorCanvas.getInputBackgroundLabel();
	}
}
