import { DCoordinateSize, DThemeButtonAmbient, DThemes } from "@wcardinal/wcardinal-ui";

export class EThemeDefaultButtonAmbient extends DThemes.getClass<DThemeButtonAmbient<string>>(
	"DButtonAmbient"
) {
	getWidth(): DCoordinateSize {
		return this.getHeight();
	}
}
