import {
	DThemes,
	EShape,
	EShapeActionValueChangeColor,
	EShapeActionValueChangeColorTarget,
	EShapeActionValueChangeColorType,
	EShapeActionValueMiscInput,
	EShapeActionValueMiscType,
	EShapeActionValueOnInputAction,
	EShapeDefaults,
	EShapeRectangleRounded
} from "@wcardinal/wcardinal-ui";
import { EShapeExtensions } from "../e-shape-extensions";
import { EThemeShapeInput } from "./e-theme-shape-input";

export class EShapeInputs {
	static getTheme(): EThemeShapeInput {
		return DThemes.get<EThemeShapeInput>("EShapeInput");
	}

	static create(existing?: EShape): EShapeRectangleRounded {
		const result = new EShapeRectangleRounded();
		if (existing) {
			result.copy(existing);
		} else {
			result.stroke.set(true, EShapeDefaults.STROKE_COLOR, 1, 1);
			result.fill.set(true, 0xffffff, 1);
			result.text.set(this.getTheme().getLabel());
			result.cursor = "text";
			result.state.isFocusable = true;
			result.interactive = true;
		}
		result.action.add(
			new EShapeActionValueMiscInput(
				EShapeActionValueMiscType.INPUT_TEXT,
				'"ALWAYS"',
				"",
				EShapeActionValueOnInputAction.EMIT_EVENT
			)
		);
		result.action.add(
			new EShapeActionValueChangeColor(
				EShapeActionValueChangeColorType.STROKE,
				"inFocused",
				EShapeActionValueChangeColorTarget.COLOR,
				EShapeDefaults.HIGHLIGHT_COLOR,
				0,
				""
			)
		);
		result.action.add(
			new EShapeActionValueChangeColor(
				EShapeActionValueChangeColorType.TEXT,
				"inDisabled",
				EShapeActionValueChangeColorTarget.ALPHA,
				0,
				0.5,
				""
			)
		);
		return result;
	}

	static load(): void {
		const theme = this.getTheme();
		const name = theme.getName();
		EShapeExtensions.add({
			icon: {
				width: 24,
				height: 24,
				// Material Icons https://material.io/tools/icons/
				// Available under Apache license version 2.0
				svg:
					`<g transform="scale(26.6666)" fill="#fff" stroke="none">` +
					`<path d="M22,9v6c0,1.1-0.9,2-2,2h-1l0-2h1V9H4v6h6v2H4c-1.1,0-2` +
					`-0.9-2-2V9c0-1.1,0.9-2,2-2h16C21.1,7,22,7.9,22,9z"/>` +
					`<path d="M5 4v3h5.5v12h3V7H19V4H5z" transform="translate(7.25,8.5) scale(0.6)" />` +
					`</g>`
			},
			title: name,
			creator: (existing) => EShapeInputs.create(existing)
		});
	}
}
