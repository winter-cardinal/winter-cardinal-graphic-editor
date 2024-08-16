import { DCommandBase, ESnapper } from "@wcardinal/wcardinal-ui";

export class ECommandDocumentSnapTargetToggleVisibility extends DCommandBase {
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
		const target = this._snapper.target;
		target.visible = !target.visible;
		return true;
	}

	undo(): boolean {
		return this.redo();
	}
}
