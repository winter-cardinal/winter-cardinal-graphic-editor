import { EShapeActionExtensionInputType } from "./e-shape-action-extension-input";

export interface EShapeActionExtensionInputText {
	type: typeof EShapeActionExtensionInputType.TEXT;
	label?: string | null;
	initial?: string;
}
