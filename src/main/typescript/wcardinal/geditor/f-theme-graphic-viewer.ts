import {
	DThemeButton,
	UtilKeyboardEventShortcut,
	UtilSvgAtlasBuilder
} from "@wcardinal/wcardinal-ui";

export interface FThemeGraphicViewer {
	getToolFileButtonGraphicTheme(): string | DThemeButton<string> | undefined;
	getToolFileButtonGraphicOpenTitle(): string | undefined;
	getToolFileButtonGraphicOpenShortcut(): string | undefined;

	getViewButtonTheme(): string | DThemeButton<string> | undefined;
	getViewButtonZoomOutTitle(): string | undefined;
	getViewButtonZoomOutShortcut(): string | undefined;
	getViewButtonZoomInTitle(): string | undefined;
	getViewButtonZoomInShortcut(): string | undefined;
	getViewButtonZoomInShortcuts(): Array<string | UtilKeyboardEventShortcut> | undefined;
	getViewButtonResetTitle(): string | undefined;
	getViewButtonResetShortcut(): string | undefined;
	getViewButtonFitTitle(): string | undefined;
	getViewButtonFitShortcut(): string | undefined;

	getIconBuilder(): UtilSvgAtlasBuilder;
	getMargin(): number;
}
