const NONE = 0;
const PROPERTY = 1;
const PROPERTY_ID = 2;
const SELECTION = 4;
const TREE = 8;

export const EToolSelectSelectionUpdatedPart = {
	NONE,
	PROPERTY,
	PROPERTY_ID,
	SELECTION,
	TREE,
	ALL: PROPERTY | PROPERTY_ID | SELECTION | TREE
} as const;

export type EToolSelectSelectionUpdatedPart = number;
