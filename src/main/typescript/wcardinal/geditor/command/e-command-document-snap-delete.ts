import { DCommandBase, ESnapper, ESnapperTargetValue } from "@wcardinal/wcardinal-ui";

export class ECommandDocumentSnapDelete extends DCommandBase {
	protected _snapper: ESnapper;
	protected _index: number;
	protected _target: ESnapperTargetValue;

	constructor(snapper: ESnapper, index: number, target: ESnapperTargetValue) {
		super();
		this._snapper = snapper;
		this._index = index;
		this._target = target;
	}

	get snapper(): ESnapper {
		return this._snapper;
	}

	get index(): number {
		return this._index;
	}

	get target(): ESnapperTargetValue {
		return this._target;
	}

	execute(): boolean {
		return this.redo();
	}

	redo(): boolean {
		this._snapper.target.remove(this._index);
		return true;
	}

	undo(): boolean {
		this._snapper.target.add(this._target, this._index);
		return true;
	}
}
