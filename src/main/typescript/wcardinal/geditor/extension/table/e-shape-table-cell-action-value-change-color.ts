import {
	EShapeActionValueChangeColorCode,
	EShapeActionValueChangeColorType,
	EShapeDefaults,
	UtilRgb
} from "@wcardinal/wcardinal-ui";

export class EShapeTableCellActionValueChangeColor extends EShapeActionValueChangeColorCode {
	constructor() {
		super(
			EShapeActionValueChangeColorType.FILL,
			"",
			EShapeTableCellActionValueChangeColor.getColorCode(),
			"",
			""
		);
	}

	protected static getColorCode(): string {
		const activeHoverColor = UtilRgb.brighten(EShapeDefaults.HIGHLIGHT_COLOR, 0.8);
		const activeColor = UtilRgb.brighten(EShapeDefaults.HIGHLIGHT_COLOR, 0.75);
		const hoverColor = UtilRgb.brighten(EShapeDefaults.HIGHLIGHT_COLOR, 0.85);
		const disabledColor = UtilRgb.darken(EShapeDefaults.FILL_COLOR, 0.25);
		return (
			`inDisabled ? ${disabledColor} : ( isActive ?` +
			`	( isHovered ? ${activeHoverColor} : ${activeColor} ) :` +
			`	( isHovered ? ${hoverColor} : null )` +
			`)`
		);
	}
}
