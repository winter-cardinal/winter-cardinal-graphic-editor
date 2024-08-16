import { DCoordinateSize, DThemes, DThemeLayoutVertical } from "@wcardinal/wcardinal-ui";

export class EThemeDefaultEditorButtonLayout extends DThemes.getClass<DThemeLayoutVertical>(
	"DLayoutVertical"
) {
	getWidth(): DCoordinateSize {
		return "auto";
	}

	getHeight(): DCoordinateSize {
		return "100%";
	}

	getMargin(): number {
		return 5;
	}

	getPaddingTop(): number {
		return 4;
	}

	getPaddingRight(): number {
		return 4;
	}

	getPaddingBottom(): number {
		return 4;
	}

	getPaddingLeft(): number {
		return 4;
	}
}
