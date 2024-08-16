import {
	EShapePointsMarkerType,
	EShapePointsStyle,
	EShapeStrokeStyle
} from "@wcardinal/wcardinal-ui";
import { EThemeDefaultEditorShape } from "./e-theme-default-editor-shape";
import { toLabel } from "../to-label";

export class EThemeDefaultJaJpEditorShape extends EThemeDefaultEditorShape {
	override getLabel(): string | undefined {
		return "シェイプ";
	}

	override getTextChangeToLabel(): string | undefined {
		return "シェイプの変更";
	}

	override getButtonGroupTitle(): string | undefined {
		return toLabel("選択シェイプをグループ化", this.getButtonGroupShortcut());
	}

	override getButtonUngroupTitle(): string | undefined {
		return toLabel("選択シェイプのグループを解除", this.getButtonUngroupShortcut());
	}

	override getButtonFillLabel(): string | undefined {
		return "塗り";
	}

	override getButtonStrokeLabel(): string | undefined {
		return "輪郭線";
	}

	override getInputStrokeWidthLabel(): string | undefined {
		return "幅";
	}

	override getInputStrokeAlignLabel(): string | undefined {
		return "位置";
	}

	override getButtonStrokeSideTopTitle(): string | undefined {
		return "上輪郭線";
	}

	override getButtonStrokeSideRightTitle(): string | undefined {
		return "右輪郭線";
	}

	override getButtonStrokeSideBottomTitle(): string | undefined {
		return "下輪郭線";
	}

	override getButtonStrokeSideLeftTitle(): string | undefined {
		return "左輪郭線";
	}

	override getButtonStrokeExpandableTitle(): string | undefined {
		return "線幅の拡大を許可";
	}

	override getButtonStrokeShrinkableTitle(): string | undefined {
		return "線幅の縮小を許可";
	}

	override getButtonStrokeScalableDotDashTitle(): string | undefined {
		return "点線／破線の拡大縮小を許可";
	}

	override getTextCornerLabel(): string | undefined {
		return "角の丸み";
	}

	override getButtonCornerTopLeftTitle(): string | undefined {
		return "左上角を丸める";
	}

	override getButtonCornerTopRightTitle(): string | undefined {
		return "右上角を丸める";
	}

	override getButtonCornerBottomRightTitle(): string | undefined {
		return "右下角を丸める";
	}

	override getButtonCornerBottomLeftTitle(): string | undefined {
		return "左下角を丸める";
	}

	override getTextLineLabel(): string | undefined {
		return "線";
	}

	override getSelectLineStyleLabel(style: EShapeStrokeStyle): string | undefined {
		switch (style) {
			case EShapeStrokeStyle.NONE:
				return "実線";
			case EShapeStrokeStyle.NON_EXPANDING_WIDTH:
				return "拡大しない";
			case EShapeStrokeStyle.NON_SHRINKING_WIDTH:
				return "縮小しない";
			case EShapeStrokeStyle.NON_SCALING_DOT_AND_DASH:
				return "点線／破線の間隔を維持";
			case EShapeStrokeStyle.DOTTED:
				return "点線";
			case EShapeStrokeStyle.DOTTED_DENSELY:
				return "点線（密）";
			case EShapeStrokeStyle.DOTTED_LOOSELY:
				return "点線（疎）";
			case EShapeStrokeStyle.DASHED:
				return "破線";
			case EShapeStrokeStyle.DASHED_DENSELY:
				return "破線（密）";
			case EShapeStrokeStyle.DASHED_LOOSELY:
				return "破線（疎）";
		}
		return "Unknown";
	}

	override getSelectLineTypeLabel(style: EShapePointsStyle): string | undefined {
		switch (style) {
			case EShapePointsStyle.NONE:
				return "折れ線";
			case EShapePointsStyle.CLOSED:
				return "閉じる";
		}
		return "Unknown";
	}

	override getButtonLineClosedTitle(): string | undefined {
		return "閉じる";
	}

	override getTextLineTailLabel(): string | undefined {
		return "線の始点側";
	}

	override getSelectLineTailTypeLabel(type: EShapePointsMarkerType): string | undefined {
		switch (type) {
			case EShapePointsMarkerType.NONE:
				return "マーカー無し";
			case EShapePointsMarkerType.CIRCLE:
				return "円";
			case EShapePointsMarkerType.TRIANGLE:
				return "三角形";
			case EShapePointsMarkerType.RECTANGLE:
				return "四角形";
		}
		return "不明";
	}

	override getInputLineTailMarginLabel(): string | undefined {
		return "余白";
	}

	override getTextLineHeadLabel(): string | undefined {
		return "線の終点側";
	}

	override getButtonTextureImageTitle(): string | undefined {
		return "画像をテクスチャとして適用...";
	}

	override getButtonTextureGradientTitle(): string | undefined {
		return "グラデーションをテクスチャとして適用...";
	}

	override getButtonTextureFitToTitle(): string | undefined {
		return "テクスチャにフィットさせる";
	}

	override getButtonTextureClearTitle(): string | undefined {
		return "テクスチャを削除";
	}
}
