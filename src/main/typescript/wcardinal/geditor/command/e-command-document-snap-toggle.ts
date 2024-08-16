import { DCommandBase, ESnapper } from "@wcardinal/wcardinal-ui";

export class ECommandDocumentSnapToggle extends DCommandBase {
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
		const snapper = this._snapper;
		snapper.enable = !snapper.enable;
		return true;
	}

	undo(): boolean {
		return this.redo();
	}
}
