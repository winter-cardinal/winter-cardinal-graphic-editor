import { DDiagramEditor, EShape } from "@wcardinal/wcardinal-ui";
import { Texture } from "pixi.js";
import { ETool } from "../tool/e-tool";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";

/**
 * Icon options
 */
export interface EShapeExtensionIconOptions {
	/**
	 * The width of the SVG icon.
	 *
	 * @see svg
	 */
	width: number;

	/**
	 * The height of the SVG icon.
	 */
	height: number;

	/**
	 * The SVG icon of a shape.
	 * Since the SVG icons are scaled down by 3/80, that is approximately 1 / 26.667, before rendering,
	 * the icons might need to be scaled up by 26.667 as follows:
	 *
	 *     svg: `<g transform="scale(26.667)" fill="#fff"><path d="..."/></g>`
	 */
	svg: string;

	/**
	 * Internally-used field.
	 */
	texture?: Texture;
}

/**
 * Tooltips
 */
export interface EShapeExtensionTitle {
	/**
	 * A tooltip text of a button to create an instance of a shape.
	 */
	create: string;

	/**
	 * A tooltip text of a button to replace shape instances.
	 */
	change: string;
}

/**
 * A function to create an instance of a shape.
 * When creating an instance for replacing an existing instance,
 * the argument `existing` is set to an instance about to be replaced.
 * If the argument `existing` is not `undefined`, this function
 * is supposed to copy its position, size and other properties of that instance.
 */
export type EShapeExtensionCreator = (existing?: EShape) => EShape;

export interface EShapeExtensionCreatorTool extends ETool {
	on(name: "done" | "cancel", handler: () => void): unknown;
}

/**
 * Creating instances of some shapes, say connectors, requires tools specifically made for that.
 * This function is called to create that tool.
 */
export type EShapeExtensionCreatorToolCreator = (
	selection: EToolSelectSelection,
	diagram: DDiagramEditor
) => EShapeExtensionCreatorTool;

export interface EShapeExtensionCreatorOptions {
	tool: EShapeExtensionCreatorToolCreator;
}

export interface EShapeExtensionCreateable {
	icon: EShapeExtensionIconOptions;
	/** Tooltips */
	title: string | EShapeExtensionTitle;
	creator: EShapeExtensionCreator | EShapeExtensionCreatorOptions;
}
