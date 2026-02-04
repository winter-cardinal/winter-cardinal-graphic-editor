import { EShapeType } from "@wcardinal/wcardinal-ui";
import { FThemeDefaultShapeType } from "./f-theme-default-shape-type";

export class FThemeDefaultEnUsShapeType extends FThemeDefaultShapeType {
	override getLabel(shapeType: EShapeType): string {
		switch (shapeType) {
			case EShapeType.CIRCLE:
				return "Circle";
			case EShapeType.RECTANGLE:
				return "Rectangle";
			case EShapeType.RECTANGLE_ROUNDED:
				return "Rounded Rectangle";
			case EShapeType.TRIANGLE:
				return "Triangle";
			case EShapeType.TRIANGLE_ROUNDED:
				return "Rounded Triangle";
			case EShapeType.LINE:
				return "Line";
			case EShapeType.IMAGE:
				return "Image";
			case EShapeType.IMAGE_SDF:
				return "SDF Image";
			case EShapeType.GROUP:
				return "Group";
			case EShapeType.BAR:
				return "Bar";
			case EShapeType.LABEL:
				return "Label";
			case EShapeType.NULL:
				return "Null";
			case EShapeType.GROUP_SHADOWED:
				return "Group";
			case EShapeType.LINE_OF_CIRCLES:
				return "Circles";
			case EShapeType.LINE_OF_RECTANGLES:
				return "Rectangles";
			case EShapeType.LINE_OF_RECTANGLE_ROUNDEDS:
				return "Rounded Rectangles";
			case EShapeType.LINE_OF_TRIANGLES:
				return "Triangles";
			case EShapeType.LINE_OF_TRIANGLE_ROUNDEDS:
				return "Rounded Triangles";
			case EShapeType.EMBEDDED:
				return `Graphic Piece`;
			case EShapeType.EMBEDDED_LAYER:
				return "Embedded Layer";
			case EShapeType.BUTTON:
				return "Button";
			case EShapeType.RECTANGLE_PIVOTED:
				return "Pivoted Rectangle";
			case EShapeType.CONNECTOR_LINE:
				return "Line Connector";
			case EShapeType.CONNECTOR_ELBOW:
				return "Elbow Connector";
			case EShapeType.SEMICIRCLE:
				return "Semicircle";
			case EShapeType.EMBEDDED_ACCEPTOR_EDGE:
				return "Acceptor Edge";
			case EShapeType.POLYGON:
				return "Polygon";
			default:
				if (EShapeType.EXTENSION <= shapeType) {
					return "Extension";
				}
		}
		return "Unknown";
	}
}
