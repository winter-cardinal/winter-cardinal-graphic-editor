import {
	DButtonCheckRight,
	DContentOptions,
	DControllers,
	DDiagramEditor,
	DLayoutVertical,
	DPane,
	DText,
	DThemePane,
	DThemes,
	EShapeButton
} from "@wcardinal/wcardinal-ui";
import { Texture } from "pixi.js";
import { EToolSelectSelection } from "../../tool/e-tool-select-selection";
import { EShapeExtensionEditorOptions } from "../e-shape-extension-editor";
import { ECommandShapeButtonPropertyIsActive } from "./e-command-shape-button-property-is-active";
import { ECommandShapeButtonPropertyIsGrouped } from "./e-command-shape-button-property-is-grouped";
import { ECommandShapeButtonPropertyIsToggle } from "./e-command-shape-button-property-is-toggle";

export interface ESubthemeEditorShapeButton {
	getLabel(): string;
	getCheckIsToggleLabel(): string;
	getCheckIsGroupedLabel(): string;
	getCheckIsActiveLabel(): string;
}

export class EEditorShapeButton extends DPane<
	DThemePane,
	DContentOptions,
	EShapeExtensionEditorOptions
> {
	protected _icons: Record<string, Texture>;
	protected _selection: EToolSelectSelection;
	protected _diagram: DDiagramEditor;
	protected _subtheme?: ESubthemeEditorShapeButton;

	protected _checkIsToggle?: DButtonCheckRight<string>;
	protected _checkIsGrouped?: DButtonCheckRight<string>;
	protected _checkIsActive?: DButtonCheckRight<string>;

	constructor(options: EShapeExtensionEditorOptions) {
		super(options);

		this._icons = options.icons;
		const selection = options.selection;
		this._selection = selection;
		this._diagram = options.diagram;

		// Layout
		this.initLayout();
	}

	protected initLayout(): void {
		// Content height
		this.content.setHeight("padding");

		// Layout
		new DLayoutVertical({
			parent: this.content,
			x: "padding",
			y: "padding",
			width: "padding",
			height: "padding",
			children: [
				this.newTextLabel(),
				this.checkIsToggle,
				this.checkIsGrouped,
				this.checkIsActive
			]
		});

		// Selection
		const selection = this._selection;
		this.state.isDisabled = selection.isEmpty();
		selection.on("change", (): void => {
			this.state.isDisabled = selection.isEmpty();
			this.onSelectionChange(selection);
		});
		this.onSelectionChange(selection);
	}

	protected newTextLabel(): DText<string> {
		return new DText<string>({
			width: "100%",
			text: {
				value: this.subtheme.getLabel()
			}
		});
	}

	protected get checkIsToggle(): DButtonCheckRight<string> {
		return (this._checkIsToggle ??= this.newCheckIsToggle());
	}

	protected newCheckIsToggle(): DButtonCheckRight<string> {
		return new DButtonCheckRight<string>({
			width: "padding",
			text: {
				value: this.subtheme.getCheckIsToggleLabel()
			},
			on: {
				active: (): void => {
					this.onCheckIsToggleChanged(true);
				},
				inactive: (): void => {
					this.onCheckIsToggleChanged(false);
				}
			}
		});
	}

	protected onCheckIsToggleChanged(isActive: boolean): void {
		DControllers.getCommandController().push(
			new ECommandShapeButtonPropertyIsToggle(this._selection, isActive)
		);
	}

	protected onSelectionChangeCheckIsToggle(selection: EToolSelectSelection): void {
		const state = this.checkIsToggle.state;
		const last = selection.last();
		if (last instanceof EShapeButton) {
			state.lock();
			state.isActive = last.isToggle;
			state.isDisabled = false;
			state.unlock();
		} else {
			state.isDisabled = true;
		}
	}

	protected get checkIsGrouped(): DButtonCheckRight<string> {
		return (this._checkIsGrouped ??= this.newCheckIsGrouped());
	}

	protected newCheckIsGrouped(): DButtonCheckRight<string> {
		return new DButtonCheckRight<string>({
			width: "padding",
			text: {
				value: this.subtheme.getCheckIsGroupedLabel()
			},
			on: {
				active: (): void => {
					this.onCheckIsGroupedChanged(true);
				},
				inactive: (): void => {
					this.onCheckIsGroupedChanged(false);
				}
			}
		});
	}

	protected onCheckIsGroupedChanged(isActive: boolean): void {
		DControllers.getCommandController().push(
			new ECommandShapeButtonPropertyIsGrouped(this._selection, isActive)
		);
	}

	protected onSelectionChangeCheckIsGrouped(selection: EToolSelectSelection): void {
		const state = this.checkIsGrouped.state;
		const last = selection.last();
		if (last instanceof EShapeButton) {
			state.lock();
			state.isActive = last.isGrouped;
			state.isDisabled = false;
			state.unlock();
		} else {
			state.isDisabled = true;
		}
	}

	protected get checkIsActive(): DButtonCheckRight<string> {
		return (this._checkIsActive ??= this.newCheckIsActive());
	}

	protected newCheckIsActive(): DButtonCheckRight<string> {
		return new DButtonCheckRight<string>({
			width: "padding",
			text: {
				value: this.subtheme.getCheckIsActiveLabel()
			},
			on: {
				active: (): void => {
					this.onCheckIsActiveChanged(true);
				},
				inactive: (): void => {
					this.onCheckIsActiveChanged(false);
				}
			}
		});
	}

	protected onCheckIsActiveChanged(isActive: boolean): void {
		DControllers.getCommandController().push(
			new ECommandShapeButtonPropertyIsActive(this._selection, isActive)
		);
	}

	protected onSelectionChangeCheckIsActive(selection: EToolSelectSelection): void {
		const state = this.checkIsActive.state;
		const last = selection.last();
		if (last instanceof EShapeButton) {
			state.lock();
			state.isActive = last.state.isActive;
			state.isDisabled = false;
			state.unlock();
		} else {
			state.isDisabled = true;
		}
	}

	protected onSelectionChange(selection: EToolSelectSelection): void {
		this.onSelectionChangeCheckIsToggle(selection);
		this.onSelectionChangeCheckIsGrouped(selection);
		this.onSelectionChangeCheckIsActive(selection);
	}

	protected get subtheme(): ESubthemeEditorShapeButton {
		return (this._subtheme ??= this.newSubtheme());
	}

	protected newSubtheme(): ESubthemeEditorShapeButton {
		return DThemes.get<ESubthemeEditorShapeButton>("EEditorShapeButton");
	}
}
