import { EShape, EShapeEmbedded, EShapeType } from "@wcardinal/wcardinal-ui";
import { EShapeExtensions } from "../extension/e-shape-extensions";
import { getShapeTypeTheme } from "./get-shape-type-theme";

export const toShapeLabel = (shape: EShape): string => {
	const id = shape.id;
	if (0 < id.length) {
		return id;
	}
	const shapeType = shape.type;
	if (EShapeType.EXTENSION <= shapeType) {
		const extension = EShapeExtensions.get(shapeType);
		if (extension && "name" in extension) {
			const name = extension.name;
			if (name != null) {
				return name;
			}
		}
		return getShapeTypeTheme().getLabel(shapeType);
	} else if (shapeType === EShapeType.EMBEDDED) {
		if (shape instanceof EShapeEmbedded) {
			return shape.name;
		} else {
			return getShapeTypeTheme().getLabel(shapeType);
		}
	}
	return getShapeTypeTheme().getLabel(shapeType);
};
