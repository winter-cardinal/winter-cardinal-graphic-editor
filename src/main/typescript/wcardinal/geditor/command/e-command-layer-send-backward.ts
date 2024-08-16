import { DApplications, DCommandBase, DDiagramLayerContainer } from "@wcardinal/wcardinal-ui";

export class ECommandLayerSendBackward extends DCommandBase {
	protected _index: number;
	protected _layerContainer: DDiagramLayerContainer;

	constructor(index: number, layerContainer: DDiagramLayerContainer) {
		super();
		this._index = index;
		this._layerContainer = layerContainer;
	}

	get index(): number {
		return this._index;
	}

	get layerContainer(): DDiagramLayerContainer {
		return this._layerContainer;
	}

	execute(): boolean {
		return this.redo();
	}

	redo(): boolean {
		const index = this._index;
		const layerContainer = this._layerContainer;
		const children = layerContainer.children;
		const tmp = children[index];
		children[index] = children[index - 1];
		children[index - 1] = tmp;
		(layerContainer as any).onChildrenChange(index);
		layerContainer.emit("change", layerContainer);
		DApplications.update(layerContainer);
		return true;
	}

	undo(): boolean {
		this.redo();
		return true;
	}
}
