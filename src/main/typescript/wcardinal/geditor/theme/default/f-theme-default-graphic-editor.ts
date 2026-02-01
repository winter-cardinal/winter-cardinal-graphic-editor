import {
	DThemeButton,
	DThemes,
	EShapeType,
	UtilKeyboardEventShortcut,
	UtilSvgAtlasBuilder
} from "@wcardinal/wcardinal-ui";
import type { FThemeGraphicEditor } from "../../f-theme-graphic-editor";
import type { EThemeEditorCoordinate } from "../../editor/e-editor-coordinate";
import type { EThemeEditorShape } from "../../editor/e-editor-shape";
import type { EThemeEditorText } from "../../editor/e-editor-text";
import type { EThemeEditorData } from "../../editor/e-editor-data";
import type { EThemeEditorDataMapping } from "../../editor/e-editor-data-mapping";
import type { EThemeEditorAction } from "../../editor/e-editor-action";
import type { EThemeEditorTree } from "../../editor/e-editor-tree";
import type { EThemeEditorLayer } from "../../editor/e-editor-layer";
import type { EThemeEditorSnap } from "../../editor/e-editor-snap";
import type { EThemeEditorValidation } from "../../editor/e-editor-validation";
import type { EThemeEditorSearch } from "../../editor/e-editor-search";
import type { EThemeEditorCanvasLegacy } from "../../editor/e-editor-canvas-legacy";
import type { FThemeShapeType } from "../../f-theme-shape-type";
import { iconBuilder } from "./f-icon-builder";

export abstract class FThemeDefaultGraphicEditor implements FThemeGraphicEditor {
	protected _shapeType: FThemeShapeType;

	constructor() {
		this._shapeType = DThemes.get<FThemeShapeType>("FShapeType");
	}

	getToolFileButtonTheme(): string | DThemeButton<string> | undefined {
		return "EButtonToolFile";
	}

	abstract getToolFileButtonCreateTitle(): string | undefined;

	getToolFileButtonCreateShortcut(): string | undefined {
		return "Ctrl+M";
	}

	abstract getToolFileButtonOpenTitle(): string | undefined;

	getToolFileButtonOpenShortcut(): string | undefined {
		return "Ctrl+O";
	}

	abstract getToolFileButtonSaveTitle(): string | undefined;

	getToolFileButtonSaveShortcut(): string | undefined {
		return "Ctrl+S";
	}

	abstract getToolFileButtonSaveAsTitle(): string | undefined;

	getToolFileButtonSaveAsShortcut(): string | undefined {
		return "Ctrl+Shift+S";
	}

	abstract getToolFileButtonUploadTitle(): string | undefined;

	getToolFileButtonUploadShortcut(): string | undefined {
		return "Ctrl+U";
	}

	abstract getToolFileButtonDownloadTitle(): string | undefined;

	getToolFileButtonDownloadShortcut(): string | undefined {
		return "Ctrl+Shift+U";
	}

	abstract getToolFileButtonUndoTitle(): string | undefined;

	getToolFileButtonUndoShortcut(): string | undefined {
		return "Ctrl+Z";
	}

	abstract getToolFileButtonRedoTitle(): string | undefined;

	getToolFileButtonRedoShortcut(): string | undefined {
		return "Ctrl+Y";
	}

	abstract getToolFileButtonDeleteTitle(): string | undefined;

	getToolFileButtonDeleteShortcut(): string | undefined {
		return "Ctrl+E";
	}

	getToolShapeButtonTheme(): string | DThemeButton<string> | undefined {
		return "EButtonToolShape";
	}

	abstract getToolShapeButtonSelectTitle(): string | undefined;

	getToolShapeButtonCircleTitle(): string | undefined {
		return this._shapeType.getLabel(EShapeType.CIRCLE);
	}

	getToolShapeButtonSemicircleTitle(): string | undefined {
		return this._shapeType.getLabel(EShapeType.SEMICIRCLE);
	}

	getToolShapeButtonRectangleTitle(): string | undefined {
		return this._shapeType.getLabel(EShapeType.RECTANGLE);
	}

	getToolShapeButtonRectangleRoundedTitle(): string | undefined {
		return this._shapeType.getLabel(EShapeType.RECTANGLE_ROUNDED);
	}

	getToolShapeButtonTriangleTitle(): string | undefined {
		return this._shapeType.getLabel(EShapeType.TRIANGLE);
	}

	getToolShapeButtonTriangleRoundedTitle(): string | undefined {
		return this._shapeType.getLabel(EShapeType.TRIANGLE_ROUNDED);
	}

	getToolShapeButtonLineTitle(): string | undefined {
		return this._shapeType.getLabel(EShapeType.LINE);
	}

	getToolShapeButtonPolygonTitle(): string | undefined {
		return this._shapeType.getLabel(EShapeType.POLYGON);
	}

	getToolShapeButtonLineConnectorTitle(): string | undefined {
		return this._shapeType.getLabel(EShapeType.CONNECTOR_LINE);
	}

	getToolShapeButtonElbowConnectorTitle(): string | undefined {
		return this._shapeType.getLabel(EShapeType.CONNECTOR_ELBOW);
	}

	getToolShapeButtonImageTitle(): string | undefined {
		return `${this._shapeType.getLabel(EShapeType.IMAGE)}...`;
	}

	getToolShapeButtonGraphicPieceTitle(): string | undefined {
		return `${this._shapeType.getLabel(EShapeType.EMBEDDED)}...`;
	}

	getEditorButtonTheme(): string | DThemeButton<string> | undefined {
		return "EButtonEditor";
	}

	getEditorButtonCoordinateTitle(): string | undefined {
		return DThemes.get<EThemeEditorCoordinate>("EEditorCoordinate").getLabel();
	}

	getEditorButtonShapeTitle(): string | undefined {
		return DThemes.get<EThemeEditorShape>("EEditorShape").getLabel();
	}

	getEditorButtonTextTitle(): string | undefined {
		return DThemes.get<EThemeEditorText>("EEditorText").getLabel();
	}

	getEditorButtonDataTitle(): string | undefined {
		return DThemes.get<EThemeEditorData>("EEditorData").getLabel();
	}

	getEditorButtonDataMappingTitle(): string | undefined {
		return DThemes.get<EThemeEditorDataMapping>("EEditorDataMapping").getLabel();
	}

	getEditorButtonActionTitle(): string | undefined {
		return DThemes.get<EThemeEditorAction>("EEditorAction").getLabel();
	}

	getEditorButtonTreeTitle(): string | undefined {
		return DThemes.get<EThemeEditorTree>("EEditorTree").getLabel();
	}

	getEditorButtonLayerTitle(): string | undefined {
		return DThemes.get<EThemeEditorLayer>("EEditorLayer").getLabel();
	}

	getEditorButtonSnapTitle(): string | undefined {
		return DThemes.get<EThemeEditorSnap>("EEditorSnap").getLabel();
	}

	getEditorButtonValidationTitle(): string | undefined {
		return DThemes.get<EThemeEditorValidation>("EEditorValidation").getLabel();
	}

	getEditorButtonSearchTitle(): string | undefined {
		return DThemes.get<EThemeEditorSearch>("EEditorSearch").getLabel();
	}

	getEditorButtonCanvasLegacyTitle(): string | undefined {
		return DThemes.get<EThemeEditorCanvasLegacy>("EEditorCanvasLegacy").getLabel();
	}

	getViewButtonTheme(): string | DThemeButton<string> | undefined {
		return "EButtonView";
	}

	abstract getViewButtonZoomOutTitle(): string | undefined;

	getViewButtonZoomOutShortcut(): string | undefined {
		return "Ctrl+Alt+Minus";
	}

	abstract getViewButtonZoomInTitle(): string | undefined;

	getViewButtonZoomInShortcut(): string | undefined {
		return "Ctrl+Alt+Plus";
	}

	getViewButtonZoomInShortcuts(): Array<string | UtilKeyboardEventShortcut> | undefined {
		return ["Ctrl+Alt+;", "Ctrl+Alt+Shift+Plus"];
	}

	abstract getViewButtonDragAndPinchTitle(): string | undefined;

	getViewButtonDragAndPinchShortcut(): string | undefined {
		return "Ctrl+Alt+D";
	}

	abstract getViewButtonResetTitle(): string | undefined;

	getViewButtonResetShortcut(): string | undefined {
		return "Ctrl+Alt+R";
	}

	abstract getViewButtonFitTitle(): string | undefined;

	getViewButtonFitShortcut(): string | undefined {
		return "Ctrl+Alt+F";
	}

	getIconBuilder(): UtilSvgAtlasBuilder {
		return iconBuilder;
	}

	getMargin(): number {
		return 8;
	}
}
