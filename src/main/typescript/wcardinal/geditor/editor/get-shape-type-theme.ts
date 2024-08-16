import { DThemes } from "@wcardinal/wcardinal-ui";
import { FThemeShapeType } from "../f-theme-shape-type";

let shapeTypeTheme: FThemeShapeType | undefined;
export const getShapeTypeTheme = (): FThemeShapeType => {
	return (shapeTypeTheme ??= DThemes.get<FThemeShapeType>("FShapeType"));
};
