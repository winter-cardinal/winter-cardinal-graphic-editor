export const toLabel = (label?: string, shortcut?: string): string | undefined => {
	if (label != null) {
		if (shortcut != null) {
			return `${label} (${shortcut})`;
		} else {
			return label;
		}
	}
};
