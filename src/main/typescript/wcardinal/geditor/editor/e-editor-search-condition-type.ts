export const EEditorSearchConditionType = {
	NONE: -1
} as const;

export type EEditorSearchConditionType =
	(typeof EEditorSearchConditionType)[keyof typeof EEditorSearchConditionType];
