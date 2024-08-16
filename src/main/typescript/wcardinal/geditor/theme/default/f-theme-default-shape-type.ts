import { EShapeType } from "@wcardinal/wcardinal-ui";
import type { FThemeShapeType } from "../../f-theme-shape-type";

export abstract class FThemeDefaultShapeType implements FThemeShapeType {
	abstract getLabel(shapeType: EShapeType): string;
}
