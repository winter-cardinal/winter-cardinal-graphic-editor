import { DCommandBase, ESnapper, ESnapperTargetValue } from "@wcardinal/wcardinal-ui";

export class ECommandDocumentSnapCreate extends DCommandBase {
	protected _snapper: ESnapper;
	protected _target: ESnapperTargetValue;

	constructor(snapper: ESnapper, target: ESnapperTargetValue) {
		super();
		this._snapper = snapper;
		this._target = target;
	}

	get snapper(): ESnapper {
		return this._snapper;
	}

	get target(): ESnapperTargetValue {
		return this._target;
	}

	execute(): boolean {
		return this.redo();
	}

	redo(): boolean {
		this._snapper.target.add(this._target);
		return true;
	}

	undo(): boolean {
		const target = this._snapper.target;
		target.remove(target.size - 1);
		return true;
	}
}
