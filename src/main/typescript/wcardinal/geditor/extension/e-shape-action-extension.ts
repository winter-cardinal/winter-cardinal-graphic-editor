import { EShapeActionExtensionItem } from "./e-shape-action-extension-item";
import { EShapeActionExtensionInput } from "./e-shape-action-extension-input";
import { EShapeActionExtensionToValue } from "./e-shape-action-extension-to-value";
import { EShapeActionValueDeserializer, EShapeActionValueType } from "@wcardinal/wcardinal-ui";
import { EShapeActionExtensionFromValue } from "./e-shape-action-extension-from-value";
import { EShapeActionExtensionOnShow } from "./e-shape-action-extension-on-show";

export interface EShapeActionExtension {
	type: EShapeActionValueType;
	label: string;
	inputs?: EShapeActionExtensionInput[];
	items?: EShapeActionExtensionItem[];
	toValue: EShapeActionExtensionToValue;
	fromValue: EShapeActionExtensionFromValue;
	deserializer: EShapeActionValueDeserializer;
	onShow?: EShapeActionExtensionOnShow;
}
