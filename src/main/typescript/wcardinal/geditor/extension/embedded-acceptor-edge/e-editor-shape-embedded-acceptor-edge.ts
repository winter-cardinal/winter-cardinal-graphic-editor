import {
	DButtonCheckRight,
	DContentOptions,
	DControllers,
	DDiagramEditor,
	DLayoutVertical,
	DPane,
	DSelect,
	DSelectMultiple,
	DText,
	DThemePane,
	DThemes,
	EShapeAcceptorEdgeSide,
	EShapeAcceptorEdgeType,
	EShapeEmbeddedAcceptorEdge
} from "@wcardinal/wcardinal-ui";
import { Texture } from "pixi.js";
import { EToolSelectSelection } from "../../tool/e-tool-select-selection";
import { EShapeExtensionEditorOptions } from "../e-shape-extension-editor";
import { ECommandShapeEmbeddedAcceptorEdgePropertySide } from "./e-command-shape-embedded-acceptor-edge-property-side";
import { ECommandShapeEmbeddedAcceptorEdgePropertySubtype } from "./e-command-shape-embedded-acceptor-edge-property-subtype";
import { ECommandShapeEmbeddedAcceptorEdgePropertyVvisible } from "./e-command-shape-embedded-acceptor-edge-property-vvisible";

export interface EEditorShapeEmbeddedAcceptorEdgeOptions extends EShapeExtensionEditorOptions {}

export interface ESubthemeEditorShapeEmbeddedAcceptorEdge {
	getLabel(): string;
	toSelectSubtypeLabel(subType: EShapeAcceptorEdgeType): string;
	toSelectSideLabel(side: EShapeAcceptorEdgeSide): string;
	getCheckIsVvisibleLabel(): string;
}

export class EEditorShapeEmbeddedAcceptorEdge extends DPane<
	DThemePane,
	DContentOptions,
	EEditorShapeEmbeddedAcceptorEdgeOptions
> {
	protected _icons: Record<string, Texture>;
	protected _selection: EToolSelectSelection;
	protected _diagram: DDiagramEditor;
	protected _subtheme?: ESubthemeEditorShapeEmbeddedAcceptorEdge;

	protected _selectSubtype?: DSelect<EShapeAcceptorEdgeType>;
	protected _selectSide?: DSelectMultiple<EShapeAcceptorEdgeSide>;
	protected _checkVvisible?: DButtonCheckRight<string>;

	constructor(options: EEditorShapeEmbeddedAcceptorEdgeOptions) {
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
			children: [this.newTextLabel(), this.selectSubtype, this.selectSide, this.checkVvisible]
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

	protected get selectSubtype(): DSelect<EShapeAcceptorEdgeType> {
		return (this._selectSubtype ??= this.newSelectSubtype());
	}

	protected newSelectSubtype(): DSelect<EShapeAcceptorEdgeType> {
		const subtheme = this.subtheme;
		return new DSelect<EShapeAcceptorEdgeType>({
			width: "padding",
			value: EShapeAcceptorEdgeType.HEAD,
			menu: {
				items: [
					{
						value: EShapeAcceptorEdgeType.HEAD,
						text: {
							value: subtheme.toSelectSubtypeLabel(EShapeAcceptorEdgeType.HEAD)
						}
					},
					{
						value: EShapeAcceptorEdgeType.TAIL,
						text: {
							value: subtheme.toSelectSubtypeLabel(EShapeAcceptorEdgeType.TAIL)
						}
					},
					{
						value: EShapeAcceptorEdgeType.ALL,
						text: {
							value: subtheme.toSelectSubtypeLabel(EShapeAcceptorEdgeType.ALL)
						}
					}
				]
			},
			on: {
				change: (value: EShapeAcceptorEdgeType): void => {
					this.onSelectSubtypeChanged(value);
				}
			}
		});
	}

	protected onSelectSubtypeChanged(value: EShapeAcceptorEdgeType): void {
		DControllers.getCommandController().push(
			new ECommandShapeEmbeddedAcceptorEdgePropertySubtype(this._selection, value)
		);
	}

	protected get selectSide(): DSelectMultiple<EShapeAcceptorEdgeSide> {
		return (this._selectSide ??= this.newSelectSide());
	}

	protected newSelectSide(): DSelectMultiple<EShapeAcceptorEdgeSide> {
		const subtheme = this.subtheme;
		return new DSelectMultiple<EShapeAcceptorEdgeSide>({
			width: "padding",
			values: [EShapeAcceptorEdgeSide.LEFT],
			menu: {
				items: [
					{
						value: EShapeAcceptorEdgeSide.LEFT,
						text: {
							value: subtheme.toSelectSideLabel(EShapeAcceptorEdgeSide.LEFT)
						},
						check: true
					},
					{
						value: EShapeAcceptorEdgeSide.TOP,
						text: {
							value: subtheme.toSelectSideLabel(EShapeAcceptorEdgeSide.TOP)
						},
						check: true
					},
					{
						value: EShapeAcceptorEdgeSide.RIGHT,
						text: {
							value: subtheme.toSelectSideLabel(EShapeAcceptorEdgeSide.RIGHT)
						},
						check: true
					},
					{
						value: EShapeAcceptorEdgeSide.BOTTOM,
						text: {
							value: subtheme.toSelectSideLabel(EShapeAcceptorEdgeSide.BOTTOM)
						},
						check: true
					}
				]
			},
			on: {
				change: (values: EShapeAcceptorEdgeSide[]): void => {
					this.onSelectSideChange(values);
				}
			}
		});
	}

	protected onSelectSideChange(values: EShapeAcceptorEdgeSide[]): void {
		DControllers.getCommandController().push(
			new ECommandShapeEmbeddedAcceptorEdgePropertySide(
				this._selection,
				this.fromSelectSideValues(values)
			)
		);
	}

	protected toSelectSideValues(value: EShapeAcceptorEdgeSide): EShapeAcceptorEdgeSide[] {
		const result: EShapeAcceptorEdgeSide[] = [];
		if (value & EShapeAcceptorEdgeSide.LEFT) {
			result.push(EShapeAcceptorEdgeSide.LEFT);
		}
		if (value & EShapeAcceptorEdgeSide.TOP) {
			result.push(EShapeAcceptorEdgeSide.TOP);
		}
		if (value & EShapeAcceptorEdgeSide.RIGHT) {
			result.push(EShapeAcceptorEdgeSide.RIGHT);
		}
		if (value & EShapeAcceptorEdgeSide.BOTTOM) {
			result.push(EShapeAcceptorEdgeSide.BOTTOM);
		}
		return result;
	}

	protected fromSelectSideValues(values: EShapeAcceptorEdgeSide[]): EShapeAcceptorEdgeSide {
		let result = EShapeAcceptorEdgeSide.NONE;
		for (let i = 0, imax = values.length; i < imax; ++i) {
			result |= values[i];
		}
		return result;
	}

	protected get checkVvisible(): DButtonCheckRight<string> {
		return (this._checkVvisible ??= this.newCheckIsVvisible());
	}

	protected newCheckIsVvisible(): DButtonCheckRight<string> {
		return new DButtonCheckRight<string>({
			width: "padding",
			text: {
				value: this.subtheme.getCheckIsVvisibleLabel()
			},
			on: {
				active: (): void => {
					this.onCheckVvisibleChanged(true);
				},
				inactive: (): void => {
					this.onCheckVvisibleChanged(false);
				}
			}
		});
	}

	protected onCheckVvisibleChanged(isVvisible: boolean): void {
		DControllers.getCommandController().push(
			new ECommandShapeEmbeddedAcceptorEdgePropertyVvisible(this._selection, isVvisible)
		);
	}

	protected onSelectionChange(selection: EToolSelectSelection): void {
		const selectSubtype = this.selectSubtype;
		const selectSide = this.selectSide;
		const checkVvisible = this.checkVvisible;
		const last = selection.last();
		if (last instanceof EShapeEmbeddedAcceptorEdge) {
			selectSubtype.value = last.subtype;
			selectSubtype.state.isEnabled = true;
			selectSide.values = this.toSelectSideValues(last.side);
			selectSide.state.isEnabled = true;
			checkVvisible.state.isActive = last.vvisible;
			checkVvisible.state.isEnabled = true;
		} else {
			selectSubtype.state.isEnabled = false;
			selectSide.state.isEnabled = false;
			checkVvisible.state.isEnabled = false;
		}
	}

	protected get subtheme(): ESubthemeEditorShapeEmbeddedAcceptorEdge {
		return (this._subtheme ??= this.newSubtheme());
	}

	protected newSubtheme(): ESubthemeEditorShapeEmbeddedAcceptorEdge {
		return DThemes.get<ESubthemeEditorShapeEmbeddedAcceptorEdge>(
			"EEditorShapeEmbeddedAcceptorEdge"
		);
	}
}
