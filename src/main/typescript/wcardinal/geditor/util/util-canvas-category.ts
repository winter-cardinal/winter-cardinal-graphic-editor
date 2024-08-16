import { DThemes, isFunction } from "@wcardinal/wcardinal-ui";
import { EThemeEditorCanvas } from "../editor/e-editor-canvas";

/**
 * A canvas category options.
 */
export interface UtilCanvasCategoryOptions {
	/**
	 * A default category ID or null.
	 *
	 * @default items[0].id or {@link EThemeEditorCanvas#getDefaultCategory()} if {@link items} is empty
	 */
	default?: string | null;

	/**
	 * Categories.
	 * IDs and labels are extracted by using {@link EThemeEditorCanvas#toCategoryId(unknown)} and {@link EThemeEditorCanvas#toCategoryLabel(unknown)}
	 *
	 * @default []
	 */
	items?: unknown[];

	/**
	 * True to allow changing categories.
	 *
	 * @default {@link EThemeEditorCanvas#isCategoryWritable()}
	 */
	writable?: boolean;
}

/**
 * A function returning a canvas category options.
 */
export type UtilCategoryOptionFunction = () =>
	| UtilCanvasCategoryOptions
	| Promise<UtilCanvasCategoryOptions>;

/**
 * A canvas category.
 */
export interface UtilCanvasCategoryItem {
	/** An ID */
	id: string;

	/** A label */
	label: string;
}

export interface UtilCanvasCategoryValue {
	default: string | null;
	items: UtilCanvasCategoryItem[];
	writable: boolean;
}

export class UtilCanvasCategory {
	protected _options?: UtilCanvasCategoryOptions | UtilCategoryOptionFunction;
	protected _promise?: Promise<UtilCanvasCategoryValue>;

	constructor(options?: UtilCanvasCategoryOptions | UtilCategoryOptionFunction) {
		this._options = options;
	}

	get(): Promise<UtilCanvasCategoryValue> {
		return (this._promise ??= this.fetch());
	}

	private fetch(): Promise<UtilCanvasCategoryValue> {
		return Promise.all([this.doFetch()]).then((resolveds) => {
			const resolved = resolveds[0];
			return this.toFetched(resolved);
		});
	}

	private doFetch(): UtilCanvasCategoryOptions | Promise<UtilCanvasCategoryOptions> | undefined {
		const options = this._options;
		if (isFunction(options)) {
			return options();
		} else {
			return options;
		}
	}

	private toFetched(options?: UtilCanvasCategoryOptions): UtilCanvasCategoryValue {
		const theme = DThemes.get<EThemeEditorCanvas>("EEditorCanvas");
		if (options != null) {
			const items = this.toItems(theme, options);
			return {
				default: this.toDefault(items, theme, options),
				items,
				writable: this.toWritable(theme, options)
			};
		}
		return {
			default: theme.getDefaultCategory(),
			items: [],
			writable: theme.isCategoryWritable()
		};
	}

	private toItems(
		theme: EThemeEditorCanvas,
		options: UtilCanvasCategoryOptions
	): UtilCanvasCategoryItem[] {
		const result: UtilCanvasCategoryItem[] = [];
		const items = options.items;
		if (items != null) {
			for (let i = 0, imax = items.length; i < imax; ++i) {
				const category = items[i];
				const id = theme.toCategoryId(category);
				const label = theme.toCategoryLabel(category);
				result.push({
					id,
					label
				});
			}
		}
		return result;
	}

	private toDefault(
		items: UtilCanvasCategoryItem[],
		theme: EThemeEditorCanvas,
		options: UtilCanvasCategoryOptions
	): string | null {
		if (options.default != null) {
			return options.default;
		} else if (0 < items.length) {
			return items[0].id;
		} else {
			return theme.getDefaultCategory();
		}
	}

	private toWritable(theme: EThemeEditorCanvas, options: UtilCanvasCategoryOptions) {
		return options.writable ?? theme.isCategoryWritable();
	}
}
