export interface GraphicTesterSimple {
	id?: number;

	graphicId: number;

	name: string;

	/**
	 * Stringified mappings:
	 *     JSON.stringify([UUID[], GraphicTesterObject[]]).
	 */
	mappings: string;
}
