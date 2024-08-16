import {
	EShapeActionMiscExtensions,
	EShapeActionOpenDialogExtensions,
	EShapeActionOpenExtensions,
	EShapeActionValueBlinkType,
	EShapeActionValueChangeColorTarget,
	EShapeActionValueChangeColorType,
	EShapeActionValueChangeTextType,
	EShapeActionValueGestureOperationType,
	EShapeActionValueGestureType,
	EShapeActionValueMiscType,
	EShapeActionValueOnInputAction,
	EShapeActionValueOpenDialogType,
	EShapeActionValueOpenType,
	EShapeActionValueShowHideType,
	EShapeActionValueTransformMoveType,
	EShapeActionValueTransformResizeType,
	EShapeActionValueTransformRotateType,
	EShapeActionValueTransformType,
	EShapeActionValueType,
	UtilHtmlElementWhen
} from "@wcardinal/wcardinal-ui";
import { EThemeDefaultShapeActionValue } from "./e-theme-default-shape-action-value";

export class EThemeDefaultEnUsShapeActionValue extends EThemeDefaultShapeActionValue {
	override toTypeLabel(type: EShapeActionValueType): string {
		switch (type) {
			case EShapeActionValueType.SHOW_HIDE:
				return "Show / Hide";
			case EShapeActionValueType.BLINK:
				return "Blink";
			case EShapeActionValueType.TRANSFORM:
				return "Transform";
			case EShapeActionValueType.OPEN:
				return "Open";
			case EShapeActionValueType.CHANGE_COLOR:
			case EShapeActionValueType.CHANGE_COLOR_LEGACY:
				return "Change Color";
			case EShapeActionValueType.CHANGE_TEXT:
				return "Change Text";
			case EShapeActionValueType.CHANGE_CURSOR:
				return "Change Cursor";
			case EShapeActionValueType.EMIT_EVENT:
				return "Emit Event";
			case EShapeActionValueType.GESTURE:
				return "Gesture";
			case EShapeActionValueType.MISC:
				return "Misc.";
			default:
				if (EShapeActionValueType.EXTENSION <= type) {
					return "Extension";
				} else {
					return "Unknown";
				}
		}
	}

	override toBlinkTypeLabel(type: EShapeActionValueBlinkType): string {
		switch (type) {
			case EShapeActionValueBlinkType.VISIBILITY:
				return "Visibility";
			case EShapeActionValueBlinkType.BRIGHTEN:
				return "Brighten";
			case EShapeActionValueBlinkType.DARKEN:
				return "Darken";
			case EShapeActionValueBlinkType.OPACITY:
				return "Opacity";
			case EShapeActionValueBlinkType.COLOR_FILL:
				return "Fill";
			case EShapeActionValueBlinkType.COLOR_STROKE:
				return "Stroke";
		}
	}

	override toShowHideTypeLabel(type: EShapeActionValueShowHideType): string {
		switch (type) {
			case EShapeActionValueShowHideType.SHAPE_SHOW:
				return "Show";
			case EShapeActionValueShowHideType.SHAPE_HIDE:
				return "Hide";
			case EShapeActionValueShowHideType.SHAPE:
				return "Shape";
			case EShapeActionValueShowHideType.LAYER:
				return "Layer";
		}
	}

	override toTransformTypeLabel(type: EShapeActionValueTransformType): string {
		switch (type) {
			case EShapeActionValueTransformType.RESIZE:
				return "Resize";
			case EShapeActionValueTransformType.MOVE:
				return "Move";
			case EShapeActionValueTransformType.ROTATE:
				return "Rotate";
		}
	}

	override toTransformRotateTypeLabel(type: EShapeActionValueTransformRotateType): string {
		switch (type) {
			case EShapeActionValueTransformRotateType.RELATIVE:
				return "Relative";
			case EShapeActionValueTransformRotateType.ABSOLUTE:
				return "Absolute";
		}
	}

	override toTransformMoveTypeLabel(type: EShapeActionValueTransformMoveType): string {
		switch (type) {
			case EShapeActionValueTransformMoveType.RELATIVE_X:
				return "Relative X";
			case EShapeActionValueTransformMoveType.RELATIVE_Y:
				return "Relative Y";
			case EShapeActionValueTransformMoveType.ABSOLUTE_X:
				return "Absolute X";
			case EShapeActionValueTransformMoveType.ABSOLUTE_Y:
				return "Absolute Y";
			case EShapeActionValueTransformMoveType.FORWARD_OR_BACKWARD:
				return "Forward / Backward";
			case EShapeActionValueTransformMoveType.LEFT_OR_RIGHT:
				return "Left / Right";
		}
	}

	override toTransformResizeTypeLabel(type: EShapeActionValueTransformResizeType): string {
		switch (type) {
			case EShapeActionValueTransformResizeType.ABSOLUTE_SIZE:
				return "Height & Width";
			case EShapeActionValueTransformResizeType.RELATIVE_SIZE:
				return "Height & Width (%)";
			case EShapeActionValueTransformResizeType.ABSOLUTE_HEIGHT:
				return "Height";
			case EShapeActionValueTransformResizeType.RELATIVE_HEIGHT:
				return "Height (%)";
			case EShapeActionValueTransformResizeType.ABSOLUTE_WIDTH:
				return "Width";
			case EShapeActionValueTransformResizeType.RELATIVE_WIDTH:
				return "Width (%)";
		}
	}

	override toChangeColorTypeValueLabel(type: EShapeActionValueChangeColorType): string {
		switch (type) {
			case EShapeActionValueChangeColorType.NONE:
				return "None";
			case EShapeActionValueChangeColorType.FILL:
				return "Fill";
			case EShapeActionValueChangeColorType.STROKE:
				return "Stroke";
			case EShapeActionValueChangeColorType.TEXT:
				return "Text";
			case EShapeActionValueChangeColorType.TEXT_OUTLINE:
				return "Text Outline";
		}
		return "Unknown";
	}

	override toChangeColorTargetLabel(type: EShapeActionValueChangeColorTarget): string {
		switch (type) {
			case EShapeActionValueChangeColorTarget.COLOR_AND_ALPHA:
				return "Color";
			case EShapeActionValueChangeColorTarget.COLOR:
				return "RGB";
			case EShapeActionValueChangeColorTarget.ALPHA:
				return "Alpha";
			case EShapeActionValueChangeColorTarget.CODE:
				return "Dynamic Color";
			case EShapeActionValueChangeColorTarget.BRIGHTNESS:
				return "Brightness";
		}
	}

	override toChangeTextTypeLabel(type: EShapeActionValueChangeTextType): string {
		switch (type) {
			case EShapeActionValueChangeTextType.TEXT:
				return "Text";
			case EShapeActionValueChangeTextType.NUMBER:
				return "Number";
		}
	}

	override toOpenTypeLabel(type: EShapeActionValueOpenType): string {
		switch (type) {
			case EShapeActionValueOpenType.DIAGRAM_LEGACY:
				return "Graphic";
			case EShapeActionValueOpenType.PAGE_LEGACY:
				return "Page (New Window)";
			case EShapeActionValueOpenType.PAGE_INPLACE_LEGACY:
				return "Page (In-place)";
			case EShapeActionValueOpenType.DIALOG_TEXT:
				return "Dialog (Text)";
			case EShapeActionValueOpenType.DIALOG_INTEGER:
				return "Dialog (Integer)";
			case EShapeActionValueOpenType.DIALOG_REAL:
				return "Dialog (Real)";
			case EShapeActionValueOpenType.DIALOG_BOOLEAN:
				return "Dialog (Boolean)";
			case EShapeActionValueOpenType.DIALOG_DATE:
				return "Dialog (Date)";
			case EShapeActionValueOpenType.DIALOG_TIME:
				return "Dialog (Time)";
			case EShapeActionValueOpenType.DIALOG_DATETIME:
				return "Dialog (Datetime)";
			case EShapeActionValueOpenType.DIAGRAM:
				return "Graphic";
			case EShapeActionValueOpenType.PAGE:
				return "Page";
			case EShapeActionValueOpenType.DIALOG:
				return "Dialog";
			default:
				if (EShapeActionValueOpenType.EXTENSION <= type) {
					const extension = EShapeActionOpenExtensions.get(type);
					if (extension) {
						return extension.label;
					}
					return "Extension";
				} else {
					return "Unknown";
				}
		}
	}

	override toOpenDialogTypeLabel(type: EShapeActionValueOpenDialogType): string {
		switch (type) {
			case EShapeActionValueOpenDialogType.TEXT:
				return "Text";
			case EShapeActionValueOpenDialogType.INTEGER:
				return "Integer";
			case EShapeActionValueOpenDialogType.REAL:
				return "Real";
			case EShapeActionValueOpenDialogType.BOOLEAN:
				return "Boolean";
			case EShapeActionValueOpenDialogType.DATE:
				return "Date";
			case EShapeActionValueOpenDialogType.TIME:
				return "Time";
			case EShapeActionValueOpenDialogType.DATETIME:
				return "Datetime";
			default:
				if (EShapeActionValueOpenDialogType.EXTENSION <= type) {
					const extension = EShapeActionOpenDialogExtensions.get(type);
					if (extension) {
						return extension.label;
					}
					return "Extension";
				} else {
					return "Unknown";
				}
		}
	}

	override toGestureTypeLabel(type: EShapeActionValueGestureType): string {
		switch (type) {
			case EShapeActionValueGestureType.SHAPE:
				return "Shape";
			case EShapeActionValueGestureType.LAYER:
				return "Layer";
		}
	}

	override toGestureOperationTypeLabel(type: EShapeActionValueGestureOperationType): string {
		switch (type) {
			case EShapeActionValueGestureOperationType.DRAG:
				return "Drag";
			case EShapeActionValueGestureOperationType.PINCH:
				return "Pinch";
		}
		return "Unknown";
	}

	override toMiscTypeLabel(type: EShapeActionValueMiscType): string {
		switch (type) {
			case EShapeActionValueMiscType.INPUT_TEXT:
				return "Input (Text)";
			case EShapeActionValueMiscType.INPUT_INTEGER:
				return "Input (Integer)";
			case EShapeActionValueMiscType.INPUT_REAL:
				return "Input (Real)";
			case EShapeActionValueMiscType.EMIT_EVENT:
				return this.toOnInputActionLabel(EShapeActionValueOnInputAction.EMIT_EVENT);
			case EShapeActionValueMiscType.WRITE_BOTH:
				return this.toOnInputActionLabel(EShapeActionValueOnInputAction.WRITE_BOTH);
			case EShapeActionValueMiscType.WRITE_LOCAL:
				return this.toOnInputActionLabel(EShapeActionValueOnInputAction.WRITE_LOCAL);
			case EShapeActionValueMiscType.WRITE_REMOTE:
				return this.toOnInputActionLabel(EShapeActionValueOnInputAction.WRITE_REMOTE);
			case EShapeActionValueMiscType.HTML_ELEMENT:
				return "HTML Element";
			case EShapeActionValueMiscType.HTML_ELEMENT_WITHOUT_POINTER_EVENTS:
				return "HTML Element (No Pointer Event)";
			case EShapeActionValueMiscType.SHOW_HIDE_LAYER:
				return "Show / Hide Layers";
			case EShapeActionValueMiscType.GESTURE_LAYER:
				return "Layer Gesture";
			case EShapeActionValueMiscType.GESTURE:
				return "Gesture";
			case EShapeActionValueMiscType.EXECUTE:
				return "Execute";
			default:
				if (EShapeActionValueMiscType.EXTENSION <= type) {
					const extension = EShapeActionMiscExtensions.get(type);
					if (extension) {
						return extension.label;
					}
					return "Extension";
				} else {
					return "Unknown";
				}
		}
	}

	override toHtmlElementWhenLabel(when: UtilHtmlElementWhen): string {
		switch (when) {
			case UtilHtmlElementWhen.CLICKED:
				return "Clicked";
			case UtilHtmlElementWhen.DOUBLE_CLICKED:
				return "Double Clicked";
			case UtilHtmlElementWhen.FOCUSED:
				return "Focused";
			case UtilHtmlElementWhen.ALWAYS:
				return "Always";
		}
		return "Unknown";
	}

	override toOnInputActionLabel(type: EShapeActionValueOnInputAction): string {
		switch (type) {
			case EShapeActionValueOnInputAction.EMIT_EVENT:
				return "Emit Event";
			case EShapeActionValueOnInputAction.WRITE_BOTH:
				return "Write (Both)";
			case EShapeActionValueOnInputAction.WRITE_LOCAL:
				return "Write (Local)";
			case EShapeActionValueOnInputAction.WRITE_REMOTE:
				return "Write (Remote)";
		}
		return "Unknown";
	}
}
