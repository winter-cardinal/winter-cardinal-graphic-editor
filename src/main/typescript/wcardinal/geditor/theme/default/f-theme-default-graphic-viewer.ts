import {
	DThemeButton,
	DThemes,
	UtilKeyboardEventShortcut,
	UtilSvgAtlasBuilder
} from "@wcardinal/wcardinal-ui";
import type { FThemeGraphicEditor } from "../../f-theme-graphic-editor";
import type { FThemeGraphicViewer } from "../../f-theme-graphic-viewer";
import type { FThemeGraphicTester } from "../../f-theme-graphic-tester";

export class FThemeDefaultGraphicViewer implements FThemeGraphicViewer {
	protected _editorTheme: FThemeGraphicEditor;
	protected _testerTheme: FThemeGraphicTester;

	constructor() {
		this._editorTheme = DThemes.get<FThemeGraphicEditor>("FGraphicEditor");
		this._testerTheme = DThemes.get<FThemeGraphicTester>("FGraphicTester");
	}

	getToolFileButtonGraphicTheme(): string | DThemeButton<string> | undefined {
		return this._testerTheme.getToolFileButtonGraphicTheme();
	}

	getToolFileButtonGraphicOpenTitle(): string | undefined {
		return this._testerTheme.getToolFileButtonGraphicOpenTitle();
	}

	getToolFileButtonGraphicOpenShortcut(): string | undefined {
		return this._testerTheme.getToolFileButtonGraphicOpenShortcut();
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

	getViewButtonFitTitle(): string | undefined {
		return this._editorTheme.getViewButtonFitTitle();
	}

	getViewButtonFitShortcut(): string | undefined {
		return this._editorTheme.getViewButtonFitShortcut();
	}

	getIconBuilder(): UtilSvgAtlasBuilder {
		return this._editorTheme.getIconBuilder();
	}

	getMargin(): number {
		return this._editorTheme.getMargin();
	}
}
