import {
	DBaseStateSet,
	DShadow,
	DThemeDialog,
	DThemeLayoutHorizontal,
	DThemes
} from "@wcardinal/wcardinal-ui";

export class EThemeDefaultEditorLayout extends DThemes.getClass<DThemeLayoutHorizontal>(
	"DLayoutHorizontal"
) {
	protected _dialog: DThemeDialog;

	constructor() {
		super();
		this._dialog = DThemes.get<DThemeDialog>("DDialog");
	}

	getMargin(): number {
		return 0;
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

	getReverse(): boolean {
		return false;
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
