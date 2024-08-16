import { DDiagramCanvasEditor, EShape } from "@wcardinal/wcardinal-ui";

/**
 * A validation result.
 */
export interface EValidatorResult {
	/**
	 * An error message.
	 */
	message: string;

	/**
	 * An instance of a shape that caused this error or null.
	 */
	shape: EShape | null;
}

/**
 * A graphic validator.
 *
 * @param canvas a canvas to be validated.
 * @returns Validation results.
 */
export type EValidator = (
	canvas: DDiagramCanvasEditor
) => Promise<EValidatorResult[]> | EValidatorResult[];
