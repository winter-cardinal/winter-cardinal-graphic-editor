import { DInputText, DSelect, EShapeActionValue } from "@wcardinal/wcardinal-ui";

export type EShapeActionExtensionFromValue = (
	value: EShapeActionValue,
	select: DSelect<number> | null,
	condition: DInputText,
	inputs: Array<DInputText>
) => void;
