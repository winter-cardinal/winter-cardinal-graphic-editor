import {
	DThemeButton,
	DThemes,
	UtilKeyboardEventShortcut,
	UtilSvgAtlasBuilder
} from "@wcardinal/wcardinal-ui";
import type { FThemeGraphicEditor } from "../../f-theme-graphic-editor";
import type { FThemeGraphicTester } from "../../f-theme-graphic-tester";

export abstract class FThemeDefaultGraphicTester implements FThemeGraphicTester {
	protected _editorTheme: FThemeGraphicEditor;

	constructor() {
		this._editorTheme = DThemes.get<FThemeGraphicEditor>("FGraphicEditor");
	}

	getToolFileButtonGraphicTheme(): string | DThemeButton<string> | undefined {
		return "EButtonToolFileGraphic";
	}

	abstract getToolFileButtonGraphicOpenTitle(): string | undefined;

	getToolFileButtonGraphicOpenShortcut(): string | undefined {
		return this._editorTheme.getToolFileButtonOpenShortcut();
	}

	getToolFileButtonTheme(): string | DThemeButton<string> | undefined {
		return this._editorTheme.getToolFileButtonTheme();
	}

	getToolFileButtonCreateTitle(): string | undefined {
		return this._editorTheme.getToolFileButtonCreateTitle();
	}

	getToolFileButtonCreateShortcut(): string | undefined {
		return this._editorTheme.getToolFileButtonCreateShortcut();
	}

	abstract getToolFileButtonOpenTitle(): string | undefined;

	getToolFileButtonOpenShortcut(): string | undefined {
		return "Ctrl+Alt+O";
	}

	getToolFileButtonUploadTitle(): string | undefined {
		return this._editorTheme.getToolFileButtonUploadTitle();
	}

	getToolFileButtonUploadShortcut(): string | undefined {
		return this._editorTheme.getToolFileButtonUploadShortcut();
	}

	getToolFileButtonDownloadTitle(): string | undefined {
		return this._editorTheme.getToolFileButtonDownloadTitle();
	}

	getToolFileButtonDownloadShortcut(): string | undefined {
		return this._editorTheme.getToolFileButtonDownloadShortcut();
	}

	getToolFileButtonSaveTitle(): string | undefined {
		return this._editorTheme.getToolFileButtonSaveTitle();
	}

	getToolFileButtonSaveShortcut(): string | undefined {
		return this._editorTheme.getToolFileButtonSaveShortcut();
	}

	getToolFileButtonDeleteTitle(): string | undefined {
		return this._editorTheme.getToolFileButtonDeleteTitle();
	}

	getToolFileButtonDeleteShortcut(): string | undefined {
		return this._editorTheme.getToolFileButtonDeleteShortcut();
	}

	getViewButtonTheme(): string | DThemeButton<string> | undefined {
		return this._editorTheme.getViewButtonTheme();
	}

	getViewButtonZoomOutTitle(): string | undefined {
		return this._editorTheme.getViewButtonZoomOutTitle();
	}

	getViewButtonZoomOutShortcut(): string | undefined {
		return this._editorTheme.getViewButtonZoomOutShortcut();
	}

	getViewButtonZoomInTitle(): string | undefined {
		return this._editorTheme.getViewButtonZoomInTitle();
	}

	getViewButtonZoomInShortcut(): string | undefined {
		return this._editorTheme.getViewButtonZoomInShortcut();
	}

	getViewButtonZoomInShortcuts(): Array<string | UtilKeyboardEventShortcut> | undefined {
		return this._editorTheme.getViewButtonZoomInShortcuts();
	}

	getViewButtonResetTitle(): string | undefined {
		return this._editorTheme.getViewButtonResetTitle();
	}

	getViewButtonResetShortcut(): string | undefined {
		return this._editorTheme.getViewButtonResetShortcut();
	}

	getViewButtonDragAndPinchTitle(): string | undefined {
		return this._editorTheme.getViewButtonDragAndPinchTitle();
	}

	getViewButtonDragAndPinchShortcut(): string | undefined {
		return this._editorTheme.getViewButtonDragAndPinchShortcut();
	}

	getViewButtonFitTitle(): string | undefined {
		return this._editorTheme.getViewButtonFitTitle();
	}

	getViewButtonFitShortcut(): string | undefined {
		return this._editorTheme.getViewButtonFitShortcut();
	}

	abstract getInputNameLabel(): string | undefined;

	abstract getTableColumnDataLabel(): string;

	abstract getTableColumnValueLabel(): string;

	abstract newDialogCreateTextValue(): string;

	getIconBuilder(): UtilSvgAtlasBuilder {
		return this._editorTheme.getIconBuilder();
	}

	getMargin(): number {
		return this._editorTheme.getMargin();
	}
}
