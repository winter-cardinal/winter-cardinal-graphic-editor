import {
	EShapePointsMarkerType,
	EShapePointsStyle,
	EShapeStrokeStyle
} from "@wcardinal/wcardinal-ui";
import { EThemeDefaultEditorShape } from "./e-theme-default-editor-shape";
import { toLabel } from "../to-label";

export class EThemeDefaultEnUsEditorShape extends EThemeDefaultEditorShape {
	override getLabel(): string | undefined {
		return "Shape";
	}

	override getTextChangeToLabel(): string | undefined {
		return "Change Shape To:";
	}

	override getButtonGroupTitle(): string | undefined {
		return toLabel("Group Selected Shapes", this.getButtonGroupShortcut());
	}

	override getButtonUngroupTitle(): string | undefined {
		return toLabel("Ungroup Selected Groups", this.getButtonUngroupShortcut());
	}

	override getButtonFillLabel(): string | undefined {
		return "Fill";
	}

	override getButtonStrokeLabel(): string | undefined {
		return "Stroke";
	}

	override getInputStrokeWidthLabel(): string | undefined {
		return "Width";
	}

	override getInputStrokeAlignLabel(): string | undefined {
		return "Align";
	}

	override getButtonStrokeSideTopTitle(): string | undefined {
		return "Top";
	}

	override getButtonStrokeSideRightTitle(): string | undefined {
		return "Right";
	}

	override getButtonStrokeSideBottomTitle(): string | undefined {
		return "Bottom";
	}

	override getButtonStrokeSideLeftTitle(): string | undefined {
		return "Left";
	}

	override getButtonStrokeExpandableTitle(): string | undefined {
		return "Expandable";
	}

	override getButtonStrokeShrinkableTitle(): string | undefined {
		return "Shrinkable";
	}

	override getButtonStrokeScalableDotDashTitle(): string | undefined {
		return "Scalable Dot / Dash";
	}

	override getTextCornerLabel(): string | undefined {
		return "Corner Radius";
	}

	override getButtonCornerTopLeftTitle(): string | undefined {
		return "Top-Left Corner";
	}

	override getButtonCornerTopRightTitle(): string | undefined {
		return "Top-Right Corner";
	}

	override getButtonCornerBottomRightTitle(): string | undefined {
		return "Bottom-Right Corner";
	}

	override getButtonCornerBottomLeftTitle(): string | undefined {
		return "Bottom-Left Corner";
	}

	override getTextLineLabel(): string | undefined {
		return "Line";
	}

	override getSelectLineStyleLabel(style: EShapeStrokeStyle): string | undefined {
		switch (style) {
			case EShapeStrokeStyle.NONE:
				return "Solid";
			case EShapeStrokeStyle.NON_EXPANDING_WIDTH:
				return "Non Expanding";
			case EShapeStrokeStyle.NON_SHRINKING_WIDTH:
				return "Non Shrinking";
			case EShapeStrokeStyle.NON_SCALING_DOT_AND_DASH:
				return "Non-Scaling Dot/Dash";
			case EShapeStrokeStyle.DOTTED:
				return "Dotted";
			case EShapeStrokeStyle.DOTTED_DENSELY:
				return "Densely Dotted";
			case EShapeStrokeStyle.DOTTED_LOOSELY:
				return "Loosely Dotted";
			case EShapeStrokeStyle.DASHED:
				return "Dashed";
			case EShapeStrokeStyle.DASHED_DENSELY:
				return "Densely Dashed";
			case EShapeStrokeStyle.DASHED_LOOSELY:
				return "Loosely Dashed";
		}
		return "Unknown";
	}

	override getSelectLineTypeLabel(style: EShapePointsStyle): string | undefined {
		switch (style) {
			case EShapePointsStyle.NONE:
				return "Polyline";
			case EShapePointsStyle.CLOSED:
				return "Closed";
		}
		return "Unknown";
	}

	override getButtonLineClosedTitle(): string | undefined {
		return "Closed";
	}

	override getTextLineTailLabel(): string | undefined {
		return "Line Tail";
	}

	override getSelectLineTailTypeLabel(type: EShapePointsMarkerType): string | undefined {
		switch (type) {
			case EShapePointsMarkerType.NONE:
				return "No Marker";
			case EShapePointsMarkerType.CIRCLE:
				return "Circle";
			case EShapePointsMarkerType.TRIANGLE:
				return "Triangle";
			case EShapePointsMarkerType.RECTANGLE:
				return "Rectangle";
		}
		return "None";
	}

	override getInputLineTailMarginLabel(): string | undefined {
		return "Margin";
	}

	override getTextLineHeadLabel(): string | undefined {
		return "Line Head";
	}

	override getButtonTextureImageTitle(): string | undefined {
		return "Apply Image as Texture...";
	}

	override getButtonTextureGradientTitle(): string | undefined {
		return "Apply Gradient as Texture...";
	}

	override getButtonTextureFitToTitle(): string | undefined {
		return "Fit to Texture";
	}

	override getButtonTextureClearTitle(): string | undefined {
		return "Clear Texture";
	}
}
