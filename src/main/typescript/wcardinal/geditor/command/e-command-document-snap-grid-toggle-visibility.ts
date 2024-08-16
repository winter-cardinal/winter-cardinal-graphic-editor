import { DCommandBase, ESnapper } from "@wcardinal/wcardinal-ui";

export class ECommandDocumentSnapGridToggleVisibility extends DCommandBase {
	protected _snapper: ESnapper;

	constructor(snapper: ESnapper) {
		super();
		this._snapper = snapper;
	}

	get snapper(): ESnapper {
		return this._snapper;
	}

	execute(): boolean {
		return this.redo();
	}

	redo(): boolean {
		const grid = this._snapper.grid;
		grid.visible = !grid.visible;
		return true;
	}

	undo(): boolean {
		return this.redo();
	}
}
