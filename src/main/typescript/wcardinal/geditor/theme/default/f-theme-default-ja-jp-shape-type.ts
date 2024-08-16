import { EShapeType } from "@wcardinal/wcardinal-ui";
import { FThemeDefaultShapeType } from "./f-theme-default-shape-type";

export class FThemeDefaultJaJpShapeType extends FThemeDefaultShapeType {
	override getLabel(shapeType: EShapeType): string {
		switch (shapeType) {
			case EShapeType.CIRCLE:
				return "円";
			case EShapeType.RECTANGLE:
				return "四角形";
			case EShapeType.RECTANGLE_ROUNDED:
				return "四角形（角を丸める）";
			case EShapeType.TRIANGLE:
				return "三角形";
			case EShapeType.TRIANGLE_ROUNDED:
				return "三角形（角を丸める）";
			case EShapeType.LINE:
				return "線";
			case EShapeType.IMAGE:
				return "画像";
			case EShapeType.IMAGE_SDF:
				return "SDF画像";
			case EShapeType.GROUP:
				return "グループ";
			case EShapeType.BAR:
				return "バー";
			case EShapeType.LABEL:
				return "ラベル";
			case EShapeType.NULL:
				return "Null";
			case EShapeType.GROUP_SHADOWED:
				return "グループ";
			case EShapeType.LINE_OF_CIRCLES:
				return "円群";
			case EShapeType.LINE_OF_RECTANGLES:
				return "四角形群";
			case EShapeType.LINE_OF_RECTANGLE_ROUNDEDS:
				return "四角形群（角を丸める）";
			case EShapeType.LINE_OF_TRIANGLES:
				return "三角形群";
			case EShapeType.LINE_OF_TRIANGLE_ROUNDEDS:
				return "三角形群（角を丸める）";
			case EShapeType.EMBEDDED:
				return "グラフィックピース";
			case EShapeType.EMBEDDED_LAYER:
				return "埋め込みレイヤー";
			case EShapeType.BUTTON:
				return "ボタン";
			case EShapeType.RECTANGLE_PIVOTED:
				return "四角形（ピボット変換）";
			case EShapeType.CONNECTOR_LINE:
				return "コネクタ";
			case EShapeType.CONNECTOR_ELBOW:
				return "コネクタ（カギ線）";
			case EShapeType.SEMICIRCLE:
				return "半円";
			case EShapeType.EMBEDDED_ACCEPTOR_EDGE:
				return "接続点";
			default:
				if (EShapeType.EXTENSION <= shapeType) {
					return "拡張";
				}
		}
		return "不明";
	}
}
