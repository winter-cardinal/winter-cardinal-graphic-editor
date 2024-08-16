import { DThemes } from "@wcardinal/wcardinal-ui";
import type { EThemeEditorCanvas } from "../../../editor/e-editor-canvas";
import type { EThemeEditorCanvasLegacy } from "../../../editor/e-editor-canvas-legacy";
import { EThemeDefaultEditorPane } from "./e-theme-default-editor-pane";

export class EThemeDefaultEditorCanvasLegacy
	extends EThemeDefaultEditorPane
	implements EThemeEditorCanvasLegacy
{
	protected _editorCanvas: EThemeEditorCanvas;

	constructor() {
		super();
		this._editorCanvas = DThemes.get<EThemeEditorCanvas>("EEditorCanvas");
	}

	getLabel(): string | undefined {
		return this._editorCanvas.getLabel();
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

	getInputBackgroundLabel(): string | undefined {
		return this._editorCanvas.getInputBackgroundLabel();
	}

	getInputSummaryLabel(): string | undefined {
		return this._editorCanvas.getInputSummaryLabel();
	}

	getInputDescriptionLabel(): string | undefined {
		return this._editorCanvas.getInputDescriptionLabel();
	}
}
