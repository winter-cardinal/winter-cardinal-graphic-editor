import { FThemeDefaultGraphicEditor } from "./f-theme-default-graphic-editor";
import { toLabel } from "./to-label";

export class FThemeDefaultEnUsGraphicEditor extends FThemeDefaultGraphicEditor {
	override getToolFileButtonCreateTitle(): string | undefined {
		return toLabel("New File...", this.getToolFileButtonCreateShortcut());
	}

	override getToolFileButtonOpenTitle(): string | undefined {
		return toLabel("Open File...", this.getToolFileButtonOpenShortcut());
	}

	override getToolFileButtonSaveTitle(): string | undefined {
		return toLabel("Save", this.getToolFileButtonSaveShortcut());
	}

	override getToolFileButtonSaveAsTitle(): string | undefined {
		return toLabel("Save As...", this.getToolFileButtonSaveAsShortcut());
	}

	override getToolFileButtonUploadTitle(): string | undefined {
		return toLabel("Upload from File...", this.getToolFileButtonUploadShortcut());
	}

	override getToolFileButtonDownloadTitle(): string | undefined {
		return toLabel("Download", this.getToolFileButtonDownloadShortcut());
	}

	override getToolFileButtonUndoTitle(): string | undefined {
		return toLabel("Undo", this.getToolFileButtonUndoShortcut());
	}

	override getToolFileButtonRedoTitle(): string | undefined {
		return toLabel("Redo", this.getToolFileButtonRedoShortcut());
	}

	override getToolFileButtonDeleteTitle(): string | undefined {
		return toLabel("Delete...", this.getToolFileButtonDeleteShortcut());
	}

	override getToolShapeButtonSelectTitle(): string | undefined {
		return "Select tool";
	}

	override getViewButtonZoomOutTitle(): string | undefined {
		return toLabel("Zoom Out", this.getViewButtonZoomOutShortcut());
	}

	override getViewButtonZoomInTitle(): string | undefined {
		return toLabel("Zoom In", this.getViewButtonZoomInShortcut());
	}

	override getViewButtonDragAndPinchTitle(): string | undefined {
		return toLabel("Drag and Pinch Viewport", this.getViewButtonDragAndPinchShortcut());
	}

	override getViewButtonResetTitle(): string | undefined {
		return toLabel("Reset Viewport", this.getViewButtonResetShortcut());
	}

	override getViewButtonFitTitle(): string | undefined {
		return toLabel("Fit Viewport to Screen", this.getViewButtonFitShortcut());
	}
}
