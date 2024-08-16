import { DCommandBase, DDiagramLayer, DDiagramLayerContainer } from "@wcardinal/wcardinal-ui";
import { EDialogLayerValue } from "../editor/e-dialog-layer-value";

export class ECommandLayerChange extends DCommandBase {
	protected _layer: DDiagramLayer;
	protected _newValue: EDialogLayerValue;
	protected _oldValue: EDialogLayerValue;
	protected _layerContainer: DDiagramLayerContainer;

	constructor(
		layer: DDiagramLayer,
		value: EDialogLayerValue,
		layerContainer: DDiagramLayerContainer
	) {
		super();
		this._layer = layer;
		this._layerContainer = layerContainer;
		this._oldValue = EDialogLayerValue.from(layer);
		this._newValue = value;
	}

	get layer(): DDiagramLayer {
		return this._layer;
	}

	get newValue(): EDialogLayerValue {
		return this._newValue;
	}

	get oldValue(): EDialogLayerValue {
		return this._oldValue;
	}

	get layerContainer(): DDiagramLayerContainer {
		return this._layerContainer;
	}

	execute(): boolean {
		return this.redo();
	}

	redo(): boolean {
		this._newValue.copyTo(this._layer);
		const layerContainer = this._layerContainer;
		layerContainer.emit("change", layerContainer);
		return true;
	}

	undo(): boolean {
		this._oldValue.copyTo(this._layer);
		const layerContainer = this._layerContainer;
		layerContainer.emit("change", layerContainer);
		return true;
	}
}
