import { DInputText, DSelect, EShapeActionValue } from "@wcardinal/wcardinal-ui";

export type EShapeActionExtensionToValue = (
	select: DSelect<number> | null,
	condition: DInputText,
	inputs: DInputText[]
) => EShapeActionValue | null;
