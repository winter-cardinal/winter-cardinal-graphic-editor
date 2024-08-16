export const EEditorSearchConditionState = {
	NONE: -1,
	UNCONNECTED: 0,
	CONNECTED_PARTIALLY: 1,
	CONNECTED_FULLY: 2
} as const;

export type EEditorSearchConditionState =
	(typeof EEditorSearchConditionState)[keyof typeof EEditorSearchConditionState];
