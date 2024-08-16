import { DInputSearch, UtilHtmlElement } from "@wcardinal/wcardinal-ui";
import { Point, Rectangle } from "pixi.js";

export class EDialogActionKeywordInput extends DInputSearch {
	protected getClipperRect(
		resolution: number,
		point: Point,
		result: Rectangle
	): Rectangle | null {
		return UtilHtmlElement.getClipperRect(null, this, resolution, point, result);
	}
}
