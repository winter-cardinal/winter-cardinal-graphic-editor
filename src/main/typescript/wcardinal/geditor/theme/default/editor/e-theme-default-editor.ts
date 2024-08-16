import { DCoordinateSize, DThemeLayoutVertical, DThemes } from "@wcardinal/wcardinal-ui";
import { EEDITOR_BUTTON_COUNT } from "../../../editor/e-editors";

export class EThemeDefaultEditor extends DThemes.getClass<DThemeLayoutVertical>("DLayoutVertical") {
	getWidth(): DCoordinateSize {
		return (
			this.getPaddingLeft() +
			30 * EEDITOR_BUTTON_COUNT +
			5 * (EEDITOR_BUTTON_COUNT - 1) +
			this.getPaddingRight()
		);
	}

	getHeight(): DCoordinateSize {
		return "100%";
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

	getBackgroundColor(): number | null {
		return null;
	}

	getBorderColor(): number | null {
		return null;
	}
}
