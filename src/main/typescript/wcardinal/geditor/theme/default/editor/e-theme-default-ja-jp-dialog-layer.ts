import { EShapeActionValueGestureOperationType } from "@wcardinal/wcardinal-ui";
import { EThemeDefaultDialogLayer } from "./e-theme-default-dialog-layer";

export class EThemeDefaultJaJpDialogLayer extends EThemeDefaultDialogLayer {
	override getInputNameLabel(): string | undefined {
		return "名前";
	}

	override getInputPositionLabel(): string | undefined {
		return "位置";
	}

	override getInputSizeLabel(): string | undefined {
		return "サイズ";
	}

	override getTextBackgroundLabel(): string | undefined {
		return "背景";
	}

	override getCheckBackgroundLabel(): string | undefined {
		return "有効";
	}

	override getCheckVisibleLabel(): string | undefined {
		return "可視";
	}

	override getCheckInteractiveLabel(): string | undefined {
		return "インタラクティブ";
	}

	override getSelectGestureLabel(): string | undefined {
		return "操作";
	}

	override getSelectGestureValueLabel(
		type: EShapeActionValueGestureOperationType
	): string | undefined {
		switch (type) {
			case EShapeActionValueGestureOperationType.DRAG:
				return "ドラッグ";
			case EShapeActionValueGestureOperationType.PINCH:
				return "ピンチ";
		}
		return "不明";
	}
}
