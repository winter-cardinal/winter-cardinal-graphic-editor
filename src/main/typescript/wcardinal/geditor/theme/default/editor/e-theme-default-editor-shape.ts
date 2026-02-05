import {
	DThemes,
	EShapePointsMarkerType,
	EShapePointsStyle,
	EShapeStrokeStyle,
	EShapeType
} from "@wcardinal/wcardinal-ui";
import type { EThemeEditorShape } from "../../../editor/e-editor-shape";
import { EThemeDefaultEditorPane } from "./e-theme-default-editor-pane";
import type { FThemeShapeType } from "../../../f-theme-shape-type";

export abstract class EThemeDefaultEditorShape
	extends EThemeDefaultEditorPane
	implements EThemeEditorShape
{
	protected _shapeType: FThemeShapeType;

	constructor() {
		super();
		this._shapeType = DThemes.get<FThemeShapeType>("FShapeType");
	}

	abstract getLabel(): string | undefined;

	abstract getTextChangeToLabel(): string | undefined;

	getButtonCircleTitle(): string | undefined {
		return this._shapeType.getLabel(EShapeType.CIRCLE);
	}

	getButtonSemicircleTitle(): string | undefined {
		return this._shapeType.getLabel(EShapeType.SEMICIRCLE);
	}

	getButtonRectangleTitle(): string | undefined {
		return this._shapeType.getLabel(EShapeType.RECTANGLE);
	}

	getButtonRectangleRoundedTitle(): string | undefined {
		return this._shapeType.getLabel(EShapeType.RECTANGLE_ROUNDED);
	}

	getButtonTriangleTitle(): string | undefined {
		return this._shapeType.getLabel(EShapeType.TRIANGLE);
	}

	getButtonTriangleRoundedTitle(): string | undefined {
		return this._shapeType.getLabel(EShapeType.TRIANGLE_ROUNDED);
	}

	getButtonLineTitle(): string | undefined {
		return this._shapeType.getLabel(EShapeType.LINE);
	}

	getButtonPolygonTitle(): string | undefined {
		return this._shapeType.getLabel(EShapeType.POLYGON);
	}

	getButtonLineConnectorTitle(): string | undefined {
		return this._shapeType.getLabel(EShapeType.CONNECTOR_LINE);
	}

	getButtonElbowConnectorTitle(): string | undefined {
		return this._shapeType.getLabel(EShapeType.CONNECTOR_ELBOW);
	}

	getButtonImageTitle(): string | undefined {
		return `${this._shapeType.getLabel(EShapeType.IMAGE)}...`;
	}

	getButtonGraphicPieceTitle(): string | undefined {
		return `${this._shapeType.getLabel(EShapeType.EMBEDDED)}...`;
	}

	abstract getButtonGroupTitle(): string | undefined;

	getButtonGroupShortcut(): string | undefined {
		return "Ctrl+G";
	}

	abstract getButtonUngroupTitle(): string | undefined;

	getButtonUngroupShortcut(): string | undefined {
		return "Ctrl+Shift+G";
	}

	abstract getButtonFillLabel(): string | undefined;

	abstract getButtonFillColorTitle(): string | undefined;

	abstract getInputFillPercentTitle(): string | undefined;

	abstract getButtonFillDirectionTopTitle(): string | undefined;

	abstract getButtonFillDirectionRightTitle(): string | undefined;

	abstract getButtonFillDirectionBottomTitle(): string | undefined;

	abstract getButtonFillDirectionLeftTitle(): string | undefined;

	abstract getButtonStrokeLabel(): string | undefined;

	abstract getInputStrokeWidthLabel(): string | undefined;

	abstract getInputStrokeAlignLabel(): string | undefined;

	abstract getButtonStrokeSideTopTitle(): string | undefined;

	abstract getButtonStrokeSideRightTitle(): string | undefined;

	abstract getButtonStrokeSideBottomTitle(): string | undefined;

	abstract getButtonStrokeSideLeftTitle(): string | undefined;

	abstract getButtonStrokeExpandableTitle(): string | undefined;

	abstract getButtonStrokeShrinkableTitle(): string | undefined;

	abstract getButtonStrokeScalableDotDashTitle(): string | undefined;

	abstract getTextCornerLabel(): string | undefined;

	abstract getButtonCornerTopLeftTitle(): string | undefined;

	abstract getButtonCornerTopRightTitle(): string | undefined;

	abstract getButtonCornerBottomRightTitle(): string | undefined;

	abstract getButtonCornerBottomLeftTitle(): string | undefined;

	abstract getTextLineLabel(): string | undefined;

	abstract getSelectLineStyleLabel(style: EShapeStrokeStyle): string | undefined;

	abstract getSelectLineTypeLabel(style: EShapePointsStyle): string | undefined;

	abstract getButtonLineClosedTitle(): string | undefined;

	abstract getTextLineTailLabel(): string | undefined;

	abstract getSelectLineTailTypeLabel(type: EShapePointsMarkerType): string | undefined;

	abstract getInputLineTailMarginLabel(): string | undefined;

	abstract getTextLineHeadLabel(): string | undefined;

	getSelectLineHeadTypeLabel(type: EShapePointsMarkerType): string | undefined {
		return this.getSelectLineTailTypeLabel(type);
	}

	getInputLineHeadMarginLabel(): string | undefined {
		return this.getInputLineTailMarginLabel();
	}

	abstract getButtonTextureImageTitle(): string | undefined;

	abstract getButtonTextureGradientTitle(): string | undefined;

	abstract getButtonTextureFitToTitle(): string | undefined;

	abstract getButtonTextureClearTitle(): string | undefined;
}
