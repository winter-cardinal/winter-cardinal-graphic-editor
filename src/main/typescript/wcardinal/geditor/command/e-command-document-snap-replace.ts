import { DCommandBase, DList, ESnapper, ESnapperTargetValue } from "@wcardinal/wcardinal-ui";

export class ECommandDocumentSnapReplace extends DCommandBase {
	protected _snapper: ESnapper;
	protected _index: number;
	protected _oldValue: ESnapperTargetValue;
	protected _newValue: ESnapperTargetValue;
	protected _list: DList<ESnapperTargetValue>;

	constructor(
		snapper: ESnapper,
		oldValue: ESnapperTargetValue,
		newValue: ESnapperTargetValue,
		list: DList<ESnapperTargetValue>
	) {
		super();
		this._snapper = snapper;
		this._oldValue = oldValue;
		this._newValue = newValue;
		this._index = snapper.target.values.indexOf(this._oldValue);
		this._list = list;
	}

	get snapper(): ESnapper {
		return this._snapper;
	}

	get index(): number {
		return this._index;
	}

	get oldValue(): ESnapperTargetValue {
		return this._oldValue;
	}

	get newValue(): ESnapperTargetValue {
		return this._newValue;
	}

	get list(): DList<ESnapperTargetValue> {
		return this._list;
	}

	execute(): boolean {
		return this.redo();
	}

	redo(): boolean {
		const index = this._index;
		if (0 <= index) {
			const list = this._list;
			const newValue = this._newValue;
			const snapper = this._snapper;
			if (list.data.selection.contains(this._oldValue)) {
				snapper.target.replace(index, newValue);
				list.data.selection.clearAndAdd(newValue);
			} else {
				snapper.target.replace(index, newValue);
			}
		}
		return true;
	}

	undo(): boolean {
		const index = this._index;
		if (0 <= index) {
			const list = this._list;
			const oldValue = this._oldValue;
			const snapper = this._snapper;
			if (list.data.selection.contains(this._newValue)) {
				snapper.target.replace(index, oldValue);
				list.data.selection.clearAndAdd(oldValue);
			} else {
				snapper.target.replace(index, oldValue);
			}
		}
		return true;
	}
}
