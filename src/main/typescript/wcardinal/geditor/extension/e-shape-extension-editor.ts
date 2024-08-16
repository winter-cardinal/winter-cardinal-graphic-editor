import {
	DContentOptions,
	DDiagramEditor,
	DPane,
	DPaneOptions,
	DThemePane
} from "@wcardinal/wcardinal-ui";
import { Texture } from "pixi.js";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";

export interface EShapeExtensionEditorOptions extends DPaneOptions {
	selection: EToolSelectSelection;
	diagram: DDiagramEditor;
	icons: Record<string, Texture>;
}

export interface EShapeExtensionEditor
	extends DPane<DThemePane, DContentOptions, EShapeExtensionEditorOptions> {}

export type EShapeExtensionEditorConstructor = new (
	options: EShapeExtensionEditorOptions
) => EShapeExtensionEditor;
