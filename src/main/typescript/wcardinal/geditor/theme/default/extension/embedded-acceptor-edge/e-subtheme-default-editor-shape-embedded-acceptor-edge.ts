import { DThemes, EShapeAcceptorEdgeSide, EShapeAcceptorEdgeType } from "@wcardinal/wcardinal-ui";
import { ESubthemeEditorShapeEmbeddedAcceptorEdge } from "../../../../extension/embedded-acceptor-edge/e-editor-shape-embedded-acceptor-edge";
import { EThemeShapeEmbeddedAcceptorEdge } from "../../../../extension/embedded-acceptor-edge/e-theme-shape-embedded-acceptor-edge";

export abstract class ESubthemeDefaultEditorShapeEmbeddedAcceptorEdge
	implements ESubthemeEditorShapeEmbeddedAcceptorEdge
{
	protected _embeddedAcceptorEdge: EThemeShapeEmbeddedAcceptorEdge;

	constructor() {
		this._embeddedAcceptorEdge = DThemes.get("EShapeEmbeddedAcceptorEdge");
	}

	getLabel(): string {
		return this._embeddedAcceptorEdge.getName();
	}

	abstract toSelectSubtypeLabel(subType: EShapeAcceptorEdgeType): string;
	abstract toSelectSideLabel(side: EShapeAcceptorEdgeSide): string;
	abstract getCheckIsVvisibleLabel(): string;
}
