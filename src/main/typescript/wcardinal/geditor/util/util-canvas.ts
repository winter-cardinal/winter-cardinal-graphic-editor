import { DColorAndAlpha, DThemes } from "@wcardinal/wcardinal-ui";
import { EThemeEditorCanvas } from "../editor/e-editor-canvas";
import {
	UtilCanvasCategory,
	UtilCanvasCategoryValue,
	UtilCategoryOptionFunction,
	UtilCanvasCategoryOptions
} from "./util-canvas-category";

export interface UtilCanvasValue {
	name: string;
	label: string;
	width: number;
	height: number;
	category: UtilCanvasCategoryValue;
	summary: string;
	description: string;
	background: DColorAndAlpha;
}

export interface UtilCanvasOptions {
	name?: string;
	label?: string;

	/**
	 * The default canvas width.
	 *
	 * @default EThemeEditorCanvas.getDefaultWidth()
	 */
	width?: number;

	/**
	 * The default canvas height.
	 *
	 * @default EThemeEditorCanvas#getDefaultHeight()
	 */
	height?: number;

	category?: UtilCanvasCategoryOptions | UtilCategoryOptionFunction;
	summary?: string;
	description?: string;
	background?: DColorAndAlpha;
}

export class UtilCanvas {
	protected _promise?: Promise<UtilCanvasValue>;
	protected _category: UtilCanvasCategory;
	protected _options?: UtilCanvasOptions;

	constructor(options?: UtilCanvasOptions) {
		this._category = new UtilCanvasCategory(options?.category);
		this._options = options;
	}

	get(): Promise<UtilCanvasValue> {
		return (this._promise ??= this.fetch());
	}

	protected fetch(): Promise<UtilCanvasValue> {
		return this._category.get().then((category) => {
			return this.toDefault(category);
		});
	}

	protected toDefault(category: UtilCanvasCategoryValue): UtilCanvasValue {
		const theme = DThemes.get<EThemeEditorCanvas>("EEditorCanvas");
		const options = this._options;
		if (options != null) {
			return {
				name: options.name ?? theme.getDefaultName(),
				label: options.label ?? theme.getDefaultLabel(),
				width: options.width ?? theme.getDefaultWidth(),
				height: options.height ?? theme.getDefaultHeight(),
				category,
				summary: options.summary ?? theme.getDefaultSummary(),
				description: options.description ?? theme.getDefaultDescription(),
				background: {
					color: options.background?.color ?? theme.getDefaultBackgroundColor(),
					alpha: options.background?.alpha ?? theme.getDefaultBackgroundAlpha()
				}
			};
		}
		return {
			name: theme.getDefaultName(),
			label: theme.getDefaultLabel(),
			width: theme.getDefaultWidth(),
			height: theme.getDefaultHeight(),
			category,
			summary: theme.getDefaultSummary(),
			description: theme.getDefaultDescription(),
			background: {
				color: theme.getDefaultBackgroundColor(),
				alpha: theme.getDefaultBackgroundAlpha()
			}
		};
	}
}
