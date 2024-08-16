import { DDialogSelectController, EShape } from "@wcardinal/wcardinal-ui";
import { EShapeExtensionIconOptions } from "./e-shape-extension-creatable";

/**
 * Tooltip settings.
 */
export interface EShapeExtensionFactoryTitle {
	/**
	 * A tooltip text of a button to create an instance of a shape.
	 */
	create: string;

	/**
	 * A tooltip text of a button to replace shape instances.
	 */
	change: string;
}

export interface EShapeExtensionFactory<ITEM> extends DDialogSelectController<ITEM> {
	/** Icon settings */
	icon: EShapeExtensionIconOptions;
	/** Tooltip settings */
	title: string | EShapeExtensionFactoryTitle;
	item: {
		toLabel?: (item: ITEM) => string;
		toCreator: (item: ITEM) => Promise<(existing?: EShape) => EShape>;
	};
}
