import {
	DThemeButton,
	UtilKeyboardEventShortcut,
	UtilSvgAtlasBuilder
} from "@wcardinal/wcardinal-ui";

export interface FThemeGraphicEditor {
	getToolFileButtonTheme(): string | DThemeButton<string> | undefined;
	getToolFileButtonCreateTitle(): string | undefined;
	getToolFileButtonCreateShortcut(): string | undefined;
	getToolFileButtonOpenTitle(): string | undefined;
	getToolFileButtonOpenShortcut(): string | undefined;
	getToolFileButtonSaveTitle(): string | undefined;
	getToolFileButtonSaveShortcut(): string | undefined;
	getToolFileButtonSaveAsTitle(): string | undefined;
	getToolFileButtonSaveAsShortcut(): string | undefined;
	getToolFileButtonUploadTitle(): string | undefined;
	getToolFileButtonUploadShortcut(): string | undefined;
	getToolFileButtonDownloadTitle(): string | undefined;
	getToolFileButtonDownloadShortcut(): string | undefined;
	getToolFileButtonUndoTitle(): string | undefined;
	getToolFileButtonUndoShortcut(): string | undefined;
	getToolFileButtonRedoTitle(): string | undefined;
	getToolFileButtonRedoShortcut(): string | undefined;
	getToolFileButtonDeleteTitle(): string | undefined;
	getToolFileButtonDeleteShortcut(): string | undefined;

	getToolShapeButtonTheme(): string | DThemeButton<string> | undefined;
	getToolShapeButtonSelectTitle(): string | undefined;
	getToolShapeButtonCircleTitle(): string | undefined;
	getToolShapeButtonSemicircleTitle(): string | undefined;
	getToolShapeButtonRectangleTitle(): string | undefined;
	getToolShapeButtonRectangleRoundedTitle(): string | undefined;
	getToolShapeButtonTriangleTitle(): string | undefined;
	getToolShapeButtonTriangleRoundedTitle(): string | undefined;
	getToolShapeButtonLineTitle(): string | undefined;
	getToolShapeButtonPolygonTitle(): string | undefined;
	getToolShapeButtonLineConnectorTitle(): string | undefined;
	getToolShapeButtonElbowConnectorTitle(): string | undefined;
	getToolShapeButtonImageTitle(): string | undefined;
	getToolShapeButtonGraphicPieceTitle(): string | undefined;

	getEditorButtonTheme(): string | DThemeButton<string> | undefined;
	getEditorButtonCoordinateTitle(): string | undefined;
	getEditorButtonShapeTitle(): string | undefined;
	getEditorButtonTextTitle(): string | undefined;
	getEditorButtonDataTitle(): string | undefined;
	getEditorButtonDataMappingTitle(): string | undefined;
	getEditorButtonActionTitle(): string | undefined;
	getEditorButtonTreeTitle(): string | undefined;
	getEditorButtonLayerTitle(): string | undefined;
	getEditorButtonSnapTitle(): string | undefined;
	getEditorButtonValidationTitle(): string | undefined;
	getEditorButtonSearchTitle(): string | undefined;
	getEditorButtonCanvasLegacyTitle(): string | undefined;

	getViewButtonTheme(): string | DThemeButton<string> | undefined;
	getViewButtonZoomOutTitle(): string | undefined;
	getViewButtonZoomOutShortcut(): string | undefined;
	getViewButtonZoomInTitle(): string | undefined;
	getViewButtonZoomInShortcut(): string | undefined;
	getViewButtonZoomInShortcuts(): Array<string | UtilKeyboardEventShortcut> | undefined;
	getViewButtonDragAndPinchTitle(): string | undefined;
	getViewButtonDragAndPinchShortcut(): string | undefined;
	getViewButtonResetTitle(): string | undefined;
	getViewButtonResetShortcut(): string | undefined;
	getViewButtonFitTitle(): string | undefined;
	getViewButtonFitShortcut(): string | undefined;

	getIconBuilder(): UtilSvgAtlasBuilder;
	getMargin(): number;
}
