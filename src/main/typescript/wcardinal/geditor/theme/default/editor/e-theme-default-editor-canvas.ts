import {
	DThemeBoard,
	DThemeDiagramEditor,
	DThemes,
	isNumber,
	isString,
	toLabel
} from "@wcardinal/wcardinal-ui";
import type { EThemeEditorCanvas } from "../../../editor/e-editor-canvas";

export abstract class EThemeDefaultEditorCanvas
	extends DThemes.getClass<DThemeBoard>("DBoard")
	implements EThemeEditorCanvas
{
	protected _diagramEditorTheme: DThemeDiagramEditor;

	constructor() {
		super();
		this._diagramEditorTheme = DThemes.get<DThemeDiagramEditor>("DDiagramEditor");
	}

	abstract getLabel(): string | undefined;

	abstract getDefaultName(): string;

	getDefaultLabel(): string {
		return "";
	}

	getDefaultWidth(): number {
		return 500;
	}

	getDefaultHeight(): number {
		return 500;
	}

	getDefaultCategory(): string | null {
		return null;
	}

	getDefaultSummary(): string {
		return "";
	}

	getDefaultDescription(): string {
		return "";
	}

	getDefaultBackgroundColor(): number {
		return this._diagramEditorTheme.getCanvasBackgroundColor();
	}

	getDefaultBackgroundAlpha(): number {
		return this._diagramEditorTheme.getCanvasBackgroundAlpha();
	}

	abstract getInputNameLabel(): string | undefined;

	abstract getInputLabelLabel(): string | undefined;

	abstract getInputWidthLabel(): string | undefined;

	abstract getInputHeightLabel(): string | undefined;

	abstract getSelectCategoryLabel(): string | undefined;

	abstract getInputBackgroundLabel(): string | undefined;

	abstract getInputSummaryLabel(): string | undefined;

	abstract getInputDescriptionLabel(): string | undefined;

	toCategoryId(category: any): string {
		if (category != null) {
			if (isString(category)) {
				return category;
			} else if (isNumber(category)) {
				return String(category);
			} else if ("id" in category) {
				const id = category.id;
				if (isString(id)) {
					return id;
				}
				return String(id);
			} else if ("name" in category) {
				const name = category.name;
				if (isString(name)) {
					return name;
				}
				return String(name);
			} else if ("label" in category) {
				const label = category.label;
				if (isString(label)) {
					return label;
				}
				return String(label);
			}
		}
		return "";
	}

	toCategoryLabel(category: unknown): string {
		return toLabel(category);
	}

	isCategoryWritable(): boolean {
		return true;
	}
}
