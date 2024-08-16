import { EShapeAcceptorEdgeSide, EShapeAcceptorEdgeType } from "@wcardinal/wcardinal-ui";
import { ESubthemeDefaultEditorShapeEmbeddedAcceptorEdge } from "./e-subtheme-default-editor-shape-embedded-acceptor-edge";

export class ESubthemeDefaultJaJpEditorShapeEmbeddedAcceptorEdge extends ESubthemeDefaultEditorShapeEmbeddedAcceptorEdge {
	override toSelectSubtypeLabel(subType: EShapeAcceptorEdgeType): string {
		switch (subType) {
			case EShapeAcceptorEdgeType.HEAD:
				return "終点";
			case EShapeAcceptorEdgeType.TAIL:
				return "始点";
			case EShapeAcceptorEdgeType.ALL:
				return "全て";
		}
	}

	override toSelectSideLabel(side: EShapeAcceptorEdgeSide): string {
		switch (side) {
			case EShapeAcceptorEdgeSide.LEFT:
				return "左";
			case EShapeAcceptorEdgeSide.TOP:
				return "上";
			case EShapeAcceptorEdgeSide.RIGHT:
				return "右";
			case EShapeAcceptorEdgeSide.BOTTOM:
				return "下";
		}
		return "";
	}

	override getCheckIsVvisibleLabel(): string {
		return "ビューワーで表示";
	}
}
