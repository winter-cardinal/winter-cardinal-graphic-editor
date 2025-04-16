import { EThemeDefaultEditorAction } from "./e-theme-default-editor-action";

export class EThemeDefaultEnUsEditorAction extends EThemeDefaultEditorAction {
	override getLabel(): string | undefined {
		return "Action";
	}

	override getButtonNewTitle(): string | undefined {
		return "New Action";
	}

	override getButtonDeleteTitle(): string | undefined {
		return "Delete Action";
	}

	override getButtonBringForwardTitle(): string | undefined {
		return "Bring Selected Action Forward";
	}

	override getButtonSendBackwardTitle(): string | undefined {
		return "Send Selected Action Backward";
	}

	override getCheckInteractiveLabel(): string | undefined {
		return "Interactive";
	}

	override getCheckFocusableLabel(): string | undefined {
		return "Focusable";
	}

	override getInputShortcutLabel(): string | undefined {
		return "Shortcut";
	}

	override getInputTitleLabel(): string | undefined {
		return "Tooltip";
	}

	override getDropdownCursorLabel(): string | undefined {
		return "Cursor";
	}

	override getCursors(): Map<string, string> {
		const result = new Map<string, string>();
		result.set("", "Unset");
		result.set("none", "None");
		result.set("default", "Default");
		result.set("context-menu", "Context Menu");
		result.set("help", "Help");
		result.set("pointer", "Pointer");
		result.set("progress", "Progress");
		result.set("wait", "Wait");
		result.set("cell", "Cell");
		result.set("crosshair", "Crosshair");
		result.set("text", "Text");
		result.set("vertical-text", "Vertical Text");
		result.set("alias", "Alias");
		result.set("copy", "Copy");
		result.set("move", "Move");
		result.set("no-drop", "No Drop");
		result.set("not-allowed", "Not Allowed");
		result.set("grab", "Grab");
		result.set("grabbing", "Grabbing");
		result.set("all-scroll", "All Scroll");
		result.set("col-resize", "Column Resize");
		result.set("row-resize", "Row Resize");
		result.set("n-resize", "North Resize");
		result.set("e-resize", "East Resize");
		result.set("s-resize", "South Resize");
		result.set("w-resize", "West Resize");
		result.set("ne-resize", "North-East Resize");
		result.set("nw-resize", "North-West Resize");
		result.set("se-resize", "South-East Resize");
		result.set("sw-resize", "South-West Resize");
		result.set("ew-resize", "East-West Resize");
		result.set("ns-resize", "North-South Resize");
		result.set("nesw-resize", "NE-to-SW Resize");
		result.set("nwse-resize", "NW-to-SE Resize");
		result.set("zoom-in", "Zoom In");
		result.set("zoom-out", "Zoom Out");
		return result;
	}
}
