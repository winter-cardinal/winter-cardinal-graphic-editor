import {
	DThemes,
	EShape,
	EShapeAcceptorEdgeSide,
	EShapeAcceptorEdgeType,
	EShapeEmbeddedAcceptorEdge,
	EShapeType
} from "@wcardinal/wcardinal-ui";
import { EShapeExtensions } from "../e-shape-extensions";
import { EEditorShapeEmbeddedAcceptorEdge } from "./e-editor-shape-embedded-acceptor-edge";
import { EThemeShapeEmbeddedAcceptorEdge } from "./e-theme-shape-embedded-acceptor-edge";

export class EShapeEmbeddedAcceptorEdges {
	static getTheme(): EThemeShapeEmbeddedAcceptorEdge {
		return DThemes.get<EThemeShapeEmbeddedAcceptorEdge>("EShapeEmbeddedAcceptorEdge");
	}

	static create(existing?: EShape): EShapeEmbeddedAcceptorEdge {
		const result = new EShapeEmbeddedAcceptorEdge();
		if (existing) {
			result.copy(existing);
		} else {
			result.subtype = EShapeAcceptorEdgeType.HEAD; // Connectable to heads only
			result.side = EShapeAcceptorEdgeSide.LEFT; // Connectable from the left side
			result.vvisible = true; // True if visible in the viewer mode
			result.stroke.set(false, 0x3399ff, 1);
			result.fill.set(true, 0x3399ff, 1);
		}
		return result;
	}

	static load(): void {
		const theme = this.getTheme();
		const name = theme.getName();
		EShapeExtensions.add({
			type: EShapeType.EMBEDDED_ACCEPTOR_EDGE,
			name,
			icon: {
				width: 24,
				height: 24,
				// Material Icons https://material.io/tools/icons/
				// Available under Apache license version 2.0
				svg:
					`<g transform="scale(0.667,0.667) translate(480, 480) rotate(+90) translate(-480, 480)" fill="#fff" stroke="none">` +
					`<path d="M480-640 280-440l56 56 104-103v407h80v-407l104 103 56-56-200-200ZM146-260q-32-49-49-105T80-480q0-83 31.5` +
					`-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 59-17 115t-49 105l-58-58q22-37` +
					` 33-78t11-84q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 43 11 84t33 78l-58 58Z"/>` +
					`</g>`
			},
			title: name,
			creator: (existing) => EShapeEmbeddedAcceptorEdges.create(existing),
			editor: EEditorShapeEmbeddedAcceptorEdge
		});
	}
}
