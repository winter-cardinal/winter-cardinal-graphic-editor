import {
	DBaseStateSet,
	DCoordinatePosition,
	DCoordinateSize,
	DShadow,
	DThemeDialog,
	DThemeLayoutVertical,
	DThemes
} from "@wcardinal/wcardinal-ui";

export class EThemeDefaultButtonToolLayout extends DThemes.getClass<DThemeLayoutVertical>(
	"DLayoutVertical"
) {
	protected _dialog: DThemeDialog;

	constructor() {
		super();
		this._dialog = DThemes.get<DThemeDialog>("DDialog");
	}

	getX(): DCoordinatePosition {
		return 8;
	}

	getY(): DCoordinatePosition {
		return 8;
	}

	getWidth(): DCoordinateSize {
		return "auto";
	}

	getHeight(): DCoordinateSize {
		return "auto";
	}

	getMultiplicity(): number {
		return 2;
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

	getBackgroundColor(state: DBaseStateSet): number | null {
		return this._dialog.getBackgroundColor(state);
	}

	getBorderColor(state: DBaseStateSet): number | null {
		return this._dialog.getBorderColor(state);
	}

	getBorderAlign(): number {
		return 0;
	}

	getShadow(): DShadow | null {
		return this.newShadowWeak();
	}
}
