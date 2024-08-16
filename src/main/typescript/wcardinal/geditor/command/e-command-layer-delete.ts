import { DCommandBase, DDiagramLayer, DDiagramLayerContainer } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection, EToolSelectSelectionStored } from "../tool/e-tool-select-selection";

export class ECommandLayerDelete extends DCommandBase {
	protected _layerContainer: DDiagramLayerContainer;
	protected _layerActive: DDiagramLayer | null;
	protected _layer: DDiagramLayer;
	protected _layerIndex: number;
	protected _selection: EToolSelectSelection;
	protected _selectionStored: EToolSelectSelectionStored | null;

	constructor(
		layer: DDiagramLayer,
		layerContainer: DDiagramLayerContainer,
		selection: EToolSelectSelection
	) {
		super();
		this._layerContainer = layerContainer;
		this._layerActive = layerContainer.active;
		this._layer = layer;
		layer.reference += 1;
		this._layerIndex = -1;
		this._selection = selection;
		this._selectionStored = null;
	}

	get layerContainer(): DDiagramLayerContainer {
		return this._layerContainer;
	}

	get layerActive(): DDiagramLayer | null {
		return this._layerActive;
	}

	get layer(): DDiagramLayer {
		return this._layer;
	}

	get layerIndex(): number {
		return this._layerIndex;
	}

	get selection(): EToolSelectSelection {
		return this._selection;
	}

	get selectionStored(): EToolSelectSelectionStored | null {
		return this._selectionStored;
	}

	execute(): boolean {
		const layer = this._layer;
		const layerContainer = this._layerContainer;
		const selection = this._selection;
		if (layer === layerContainer.active && !selection.isEmpty()) {
			this._selectionStored = selection.store();
			selection.clear();
		} else {
			this._selectionStored = null;
		}
		this._layerIndex = layerContainer.delete(layer, true);
		return true;
	}

	redo(): boolean {
		if (this._selectionStored != null) {
			this._selection.clear();
		}
		this._layerContainer.delete(this._layer, true);
		return true;
	}

	undo(): boolean {
		this._layerContainer.attachAt(
			this._layer,
			this._layerIndex,
			this._layer === this._layerActive
		);
		if (this._selectionStored != null) {
			this._selection.restore(this._selectionStored);
		}
		return true;
	}

	destroy(): void {
		const layer = this._layer;
		layer.reference -= 1;
		if (layer.parent == null && layer.reference <= 0) {
			layer.destroy();
		}

		this._layerActive = null;
		this._selectionStored = null;
	}
}
