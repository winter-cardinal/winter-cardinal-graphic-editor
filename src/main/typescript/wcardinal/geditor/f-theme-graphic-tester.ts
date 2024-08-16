import {
	DThemeButton,
	UtilKeyboardEventShortcut,
	UtilSvgAtlasBuilder
} from "@wcardinal/wcardinal-ui";

export interface FThemeGraphicTester {
	getToolFileButtonGraphicTheme(): string | DThemeButton<string> | undefined;
	getToolFileButtonGraphicOpenTitle(): string | undefined;
	getToolFileButtonGraphicOpenShortcut(): string | undefined;

	getToolFileButtonTheme(): string | DThemeButton<string> | undefined;
	getToolFileButtonCreateTitle(): string | undefined;
	getToolFileButtonCreateShortcut(): string | undefined;
	getToolFileButtonOpenTitle(): string | undefined;
	getToolFileButtonOpenShortcut(): string | undefined;
	getToolFileButtonSaveTitle(): string | undefined;
	getToolFileButtonSaveShortcut(): string | undefined;
	getToolFileButtonUploadTitle(): string | undefined;
	getToolFileButtonUploadShortcut(): string | undefined;
	getToolFileButtonDownloadTitle(): string | undefined;
	getToolFileButtonDownloadShortcut(): string | undefined;
	getToolFileButtonDeleteTitle(): string | undefined;
	getToolFileButtonDeleteShortcut(): string | undefined;

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

	getInputNameLabel(): string | undefined;
	getTableColumnDataLabel(): string;
	getTableColumnValueLabel(): string;
	newDialogCreateTextValue(): string;

	getIconBuilder(): UtilSvgAtlasBuilder;
	getMargin(): number;
}
