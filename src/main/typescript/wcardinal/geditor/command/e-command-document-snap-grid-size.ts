import { DCommandBase, ESnapper } from "@wcardinal/wcardinal-ui";

export class ECommandDocumentSnapGridSize extends DCommandBase {
	protected _snapper: ESnapper;
	protected _size: number;

	constructor(snapper: ESnapper, size: number) {
		super();
		this._snapper = snapper;
		this._size = size;
	}

	get snapper(): ESnapper {
		return this._snapper;
	}

	get size(): number {
		return this._size;
	}

	execute(): boolean {
		return this.redo();
	}

	redo(): boolean {
		const snapper = this._snapper;
		const size = this._size;
		this._size = snapper.grid.size;
		snapper.grid.size = size;
		return true;
	}

	undo(): boolean {
		return this.redo();
	}
}
