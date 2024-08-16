import { DCoordinateSize, DThemeContent, DThemes } from "@wcardinal/wcardinal-ui";

export class EThemeDefaultEditorPaneContent extends DThemes.getClass<DThemeContent>("DContent") {
	getHeight(): DCoordinateSize {
		return "auto";
	}

	getPaddingTop(): number {
		return 8;
	}

	getPaddingRight(): number {
		return 8;
	}

	getPaddingBottom(): number {
		return 8;
	}

	getPaddingLeft(): number {
		return 8;
	}
}
