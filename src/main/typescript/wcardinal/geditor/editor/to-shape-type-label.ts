import { EShapeType } from "@wcardinal/wcardinal-ui";
import { EShapeExtensions } from "../extension/e-shape-extensions";
import { getShapeTypeTheme } from "./get-shape-type-theme";

export const toShapeTypeLabel = (shapeType: EShapeType): string => {
	if (EShapeType.EXTENSION <= shapeType) {
		const extension = EShapeExtensions.get(shapeType);
		if (extension && "name" in extension) {
			const name = extension.name;
			if (name != null) {
				return name;
			}
		}
		return getShapeTypeTheme().getLabel(shapeType);
	}
	return getShapeTypeTheme().getLabel(shapeType);
};
