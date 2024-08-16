import { DCommandBase, ESnapper } from "@wcardinal/wcardinal-ui";

export class ECommandDocumentSnapSendBackward extends DCommandBase {
	protected _snapper: ESnapper;
	protected _index: number;

	constructor(snapper: ESnapper, index: number) {
		super();
		this._snapper = snapper;
		this._index = index;
	}

	get snapper(): ESnapper {
		return this._snapper;
	}

	get index(): number {
		return this._index;
	}

	execute(): boolean {
		return this.redo();
	}

	redo(): boolean {
		const index = this._index;
		this._snapper.target.swap(index, index + 1);
		return true;
	}

	undo(): boolean {
		return this.redo();
	}
}
