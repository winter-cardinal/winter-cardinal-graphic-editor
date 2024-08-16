import { DThemes, EShape, EShapeButton, EShapeType } from "@wcardinal/wcardinal-ui";
import { EShapeExtensions } from "../e-shape-extensions";
import { EEditorShapeButton } from "./e-editor-shape-button";
import { EThemeShapeButton } from "./e-theme-shape-button";

export class EShapeButtons {
	static getTheme(): EThemeShapeButton {
		return DThemes.get<EThemeShapeButton>("EShapeButton");
	}

	static create(existing?: EShape): EShapeButton {
		const result = new EShapeButton();
		if (existing) {
			result.copy(existing);
		} else {
			const label = this.getTheme().getLabel();
			result.stroke.set(false, 0x3399ff, 1);
			result.fill.set(true, 0x3399ff, 1);
			result.text.set(label, 0xffffff, 1);
			result.cursor = "pointer";
			result.state.isFocusable = true;
			result.interactive = true;
		}
		return result;
	}

	static load(): void {
		const theme = this.getTheme();
		const name = theme.getName();
		EShapeExtensions.add({
			type: EShapeType.BUTTON,
			name,
			icon: {
				width: 24,
				height: 24,
				// Material Icons https://material.io/tools/icons/
				// Available under Apache license version 2.0
				svg:
					`<g transform="scale(26.6666)" fill="#fff" stroke="none">` +
					`<path d="M22,9v6c0,1.1-0.9,2-2,2h-1l0-2h1V9H4v6h6v2H4c-1.1,0-2` +
					`-0.9-2-2V9c0-1.1,0.9-2,2-2h16C21.1,7,22,7.9,22,9z M14.5,19 l1.` +
					`09-2.41L18,15.5l-2.41-1.09L14.5,12l-1.09,2.41L11,15.5l2.41,1.0` +
					`9L14.5,19z M17,14l0.62-1.38L19,12l-1.38-0.62L17,10l-0.62,1.38 ` +
					`L15,12l1.38,0.62L17,14z M14.5,19l1.09-2.41L18,15.5l-2.41-1.09L` +
					`14.5,12l-1.09,2.41L11,15.5l2.41,1.09L14.5,19z M17,14l0.62-1.38` +
					` L19,12l-1.38-0.62L17,10l-0.62,1.38L15,12l1.38,0.62L17,14z"/>` +
					`</g>`
			},
			title: name,
			creator: (existing) => EShapeButtons.create(existing),
			editor: EEditorShapeButton
		});
	}
}
