import { EShapeAcceptorEdgeSide, EShapeAcceptorEdgeType } from "@wcardinal/wcardinal-ui";
import { ESubthemeDefaultEditorShapeEmbeddedAcceptorEdge } from "./e-subtheme-default-editor-shape-embedded-acceptor-edge";

export class ESubthemeDefaultEnUsEditorShapeEmbeddedAcceptorEdge extends ESubthemeDefaultEditorShapeEmbeddedAcceptorEdge {
	override toSelectSubtypeLabel(subType: EShapeAcceptorEdgeType): string {
		switch (subType) {
			case EShapeAcceptorEdgeType.HEAD:
				return "Head";
			case EShapeAcceptorEdgeType.TAIL:
				return "Tail";
			case EShapeAcceptorEdgeType.ALL:
				return "All";
		}
	}

	override toSelectSideLabel(side: EShapeAcceptorEdgeSide): string {
		switch (side) {
			case EShapeAcceptorEdgeSide.LEFT:
				return "Left";
			case EShapeAcceptorEdgeSide.TOP:
				return "Top";
			case EShapeAcceptorEdgeSide.RIGHT:
				return "Right";
			case EShapeAcceptorEdgeSide.BOTTOM:
				return "Bottom";
		}
		return "";
	}

	override getCheckIsVvisibleLabel(): string {
		return "Visible in Viewers";
	}
}
