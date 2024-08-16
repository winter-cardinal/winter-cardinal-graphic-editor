import { FThemeDefaultGraphicEditor } from "./f-theme-default-graphic-editor";
import { toLabel } from "./to-label";

export class FThemeDefaultJaJpGraphicEditor extends FThemeDefaultGraphicEditor {
	override getToolFileButtonCreateTitle(): string | undefined {
		return toLabel("新規作成...", this.getToolFileButtonCreateShortcut());
	}

	override getToolFileButtonOpenTitle(): string | undefined {
		return toLabel("開く...", this.getToolFileButtonOpenShortcut());
	}

	override getToolFileButtonSaveTitle(): string | undefined {
		return toLabel("保存", this.getToolFileButtonSaveShortcut());
	}

	override getToolFileButtonSaveAsTitle(): string | undefined {
		return toLabel("名前を付けて保存...", this.getToolFileButtonSaveAsShortcut());
	}

	override getToolFileButtonUploadTitle(): string | undefined {
		return toLabel("アップロード...", this.getToolFileButtonUploadShortcut());
	}

	override getToolFileButtonDownloadTitle(): string | undefined {
		return toLabel("ダウンロード", this.getToolFileButtonDownloadShortcut());
	}

	override getToolFileButtonUndoTitle(): string | undefined {
		return toLabel("元に戻す", this.getToolFileButtonUndoShortcut());
	}

	override getToolFileButtonRedoTitle(): string | undefined {
		return toLabel("やり直す", this.getToolFileButtonRedoShortcut());
	}

	override getToolFileButtonDeleteTitle(): string | undefined {
		return toLabel("削除...", this.getToolFileButtonDeleteShortcut());
	}

	override getToolShapeButtonSelectTitle(): string | undefined {
		return "選択ツール";
	}

	override getViewButtonZoomOutTitle(): string | undefined {
		return toLabel("ズームアウト", this.getViewButtonZoomOutShortcut());
	}

	override getViewButtonZoomInTitle(): string | undefined {
		return toLabel("ズームイン", this.getViewButtonZoomInShortcut());
	}

	override getViewButtonDragAndPinchTitle(): string | undefined {
		return toLabel("ビュー操作モード", this.getViewButtonDragAndPinchShortcut());
	}

	override getViewButtonResetTitle(): string | undefined {
		return toLabel("ビューのリセット", this.getViewButtonResetShortcut());
	}

	override getViewButtonFitTitle(): string | undefined {
		return toLabel("ビューをスクリーンにフィットさせる", this.getViewButtonFitShortcut());
	}
}
