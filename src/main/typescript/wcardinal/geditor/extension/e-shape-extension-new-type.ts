import {
	DDiagramEditor,
	EShape,
	EShapeBuffer,
	EShapeCapability,
	EShapeDeserializer,
	EShapeOnDeserialized,
	EShapeRuntime,
	EShapeType,
	EShapeUploaded
} from "@wcardinal/wcardinal-ui";
import { ETool } from "../tool/e-tool";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";

export interface EShapeExtensionUpdater extends ETool {
	shape: EShape | null;
	on(name: "done" | "cancel", handler: () => void): unknown;
}

/**
 * A function to create the tool to update shapes.
 */
export type EShapeExtensionUpdaterCreator = (
	selection: EToolSelectSelection,
	diagram: DDiagramEditor
) => EShapeExtensionUpdater;

export interface EShapeExtensionUpdaterCreatorOptions {
	tool: EShapeExtensionUpdaterCreator;
}

export type EShapeExtensionRuntimeConstructor = new (shape: EShape) => EShapeRuntime;

export type EShapeExtensionUploadedCreator = (
	buffer: EShapeBuffer,
	shape: EShape,
	voffset: number,
	ioffset: number,
	antialiasWeight: number
) => EShapeUploaded | null;

export interface EShapeExtensionNewType {
	type: EShapeType;
	name?: string;
	/** A shape deserializer */
	deserializer?: EShapeDeserializer;
	/** @see EShapeOnDeserialized */
	onDeserialized?: EShapeOnDeserialized;
	uploaded?: EShapeExtensionUploadedCreator;
	runtime?: EShapeExtensionRuntimeConstructor;
	capability?: EShapeCapability;
	updater?: EShapeExtensionUpdaterCreator | EShapeExtensionUpdaterCreatorOptions;
}
