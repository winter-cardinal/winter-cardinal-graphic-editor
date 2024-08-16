import {
	DBaseStateSet,
	DCoordinateSize,
	DThemeButtonCheck,
	DThemes
} from "@wcardinal/wcardinal-ui";

export class EThemeDefaultButtonCheck extends DThemes.getClass<DThemeButtonCheck<string>>(
	"DButtonCheck"
) {
	override getImageTintColor(state: DBaseStateSet): number | null {
		if (state.inDisabled || !state.isActive) {
			return this.getColor(state);
		} else {
			return super.getImageTintColor(state);
		}
	}

	override getWidth(): DCoordinateSize {
		return this.getHeight();
	}
}
