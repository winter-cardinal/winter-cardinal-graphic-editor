import { EShapeActionValueGestureOperationType } from "@wcardinal/wcardinal-ui";
import { EThemeDefaultDialogLayer } from "./e-theme-default-dialog-layer";

export class EThemeDefaultEnUsDialogLayer extends EThemeDefaultDialogLayer {
	override getInputNameLabel(): string | undefined {
		return "Name";
	}

	override getInputPositionLabel(): string | undefined {
		return "Position";
	}

	override getInputSizeLabel(): string | undefined {
		return "Size";
	}

	override getTextBackgroundLabel(): string | undefined {
		return "Bckgrnd";
	}

	override getCheckBackgroundLabel(): string | undefined {
		return "Enable";
	}

	override getCheckVisibleLabel(): string | undefined {
		return "Visible";
	}

	override getCheckInteractiveLabel(): string | undefined {
		return "Interactive";
	}

	override getSelectGestureLabel(): string | undefined {
		return "Gesture";
	}

	override getSelectGestureValueLabel(
		type: EShapeActionValueGestureOperationType
	): string | undefined {
		switch (type) {
			case EShapeActionValueGestureOperationType.DRAG:
				return "Drag";
			case EShapeActionValueGestureOperationType.PINCH:
				return "Pinch";
		}
		return "Unknown";
	}
}
