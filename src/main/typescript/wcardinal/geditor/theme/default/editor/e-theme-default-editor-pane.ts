import { DCoordinateSize, DThemePane, DThemes } from "@wcardinal/wcardinal-ui";
import { EEDITOR_BUTTON_COUNT } from "../../../editor/e-editors";

export class EThemeDefaultEditorPane extends DThemes.getClass<DThemePane>("DPane") {
	getWidth(): DCoordinateSize {
		return 30 * EEDITOR_BUTTON_COUNT + 5 * (EEDITOR_BUTTON_COUNT - 1) + 16;
	}

	getHeight(): DCoordinateSize {
		return "100%";
	}

	getPaddingTop(): number {
		return 0;
	}

	getPaddingRight(): number {
		return 0;
	}

	getPaddingBottom(): number {
		return 0;
	}

	getPaddingLeft(): number {
		return 0;
	}

	getBackgroundColor(): number | null {
		return null;
	}

	getBorderColor(): number | null {
		return null;
	}
}
