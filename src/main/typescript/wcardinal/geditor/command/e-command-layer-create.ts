import { DCommandBase, DDiagramLayer, DDiagramLayerContainer } from "@wcardinal/wcardinal-ui";
import { EDialogLayerValue } from "../editor/e-dialog-layer-value";
import { EToolSelectSelection, EToolSelectSelectionStored } from "../tool/e-tool-select-selection";

export class ECommandLayerCreate extends DCommandBase {
	protected _value: EDialogLayerValue;
	protected _layerContainer: DDiagramLayerContainer;
	protected _layerActive: DDiagramLayer | null;
	protected _layerCreated: DDiagramLayer | null;
	protected _selection: EToolSelectSelection;
	protected _selectionStored: EToolSelectSelectionStored | null;

	constructor(
		value: EDialogLayerValue,
		layerContainer: DDiagramLayerContainer,
		selection: EToolSelectSelection
	) {
		super();
		this._value = value;
		this._layerContainer = layerContainer;
		this._layerActive = layerContainer.active;
		this._layerCreated = null;
		this._selection = selection;
		this._selectionStored = null;
	}

	protected newLayer(
		value: EDialogLayerValue,
		layerContainer: DDiagramLayerContainer
	): DDiagramLayer {
		const result = layerContainer.create(value.name, true);
		value.copyTo(result);
		return result;
	}

	get value(): EDialogLayerValue {
		return this._value;
	}

	get layerContainer(): DDiagramLayerContainer {
		return this._layerContainer;
	}

	get layerActive(): DDiagramLayer | null {
		return this._layerActive;
	}

	get layerCreated(): DDiagramLayer | null {
		return this._layerCreated;
	}

	get selection(): EToolSelectSelection {
		return this._selection;
	}

	get selectionStored(): EToolSelectSelectionStored | null {
		return this._selectionStored;
	}

	execute(): boolean {
		const selection = this._selection;
		if (!selection.isEmpty()) {
			this._selectionStored = selection.store();
			selection.clear();
		} else {
			this._selectionStored = null;
		}
		this._layerCreated = this.newLayer(this._value, this._layerContainer);
		this._layerCreated.reference += 1;
		return true;
	}

	redo(): boolean {
		const selectionStored = this._selectionStored;
		if (selectionStored != null) {
			this._selection.clear();
		}
		const layerCreated = this._layerCreated;
		if (layerCreated != null) {
			this._layerContainer.attach(layerCreated, true);
		}
		return true;
	}

	undo(): boolean {
		const layerCreated = this._layerCreated;
		if (layerCreated != null) {
			this._layerContainer.detach(layerCreated, this._layerActive);
		}
		const selectionStored = this._selectionStored;
		if (selectionStored != null) {
			this._selection.restore(selectionStored);
		}
		return true;
	}

	destroy(): void {
		const layerCreated = this._layerCreated;
		if (layerCreated != null) {
			layerCreated.reference -= 1;
			if (layerCreated.parent == null && layerCreated.reference <= 0) {
				layerCreated.destroy();
			}
		}

		this._layerActive = null;
	}
}
