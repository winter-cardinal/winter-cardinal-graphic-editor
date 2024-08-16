import { EShapeExtensionEditorConstructor } from "./e-shape-extension-editor";
import { EShapeExtensionNewTypeCreatable } from "./e-shape-extension-new-type-creatable";

export interface EShapeExtensionNewTypeEditableEditorOptions {
	constructor?: EShapeExtensionEditorConstructor;
	title?: string;
	theme?: string;
}

export interface EShapeExtensionNewTypeEditableEditor {
	constructor: EShapeExtensionEditorConstructor;
	title: string;
	theme: string;
}

export interface EShapeExtensionNewTypeEditable extends EShapeExtensionNewTypeCreatable {
	editor: EShapeExtensionEditorConstructor | EShapeExtensionNewTypeEditableEditorOptions;
}
