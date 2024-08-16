import { EShapeExtensionCreateable } from "./e-shape-extension-creatable";
import { EShapeExtensionNewType } from "./e-shape-extension-new-type";
import { EShapeExtensionNewTypeCreatable } from "./e-shape-extension-new-type-creatable";
import { EShapeExtensionNewTypeEditable } from "./e-shape-extension-new-type-editable";

export type EShapeExtension =
	| EShapeExtensionNewType
	| EShapeExtensionNewTypeCreatable
	| EShapeExtensionNewTypeEditable
	| EShapeExtensionCreateable;
