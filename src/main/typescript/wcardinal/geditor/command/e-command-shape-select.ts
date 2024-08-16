import { DCommandBase } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelectionStored } from "../tool/e-tool-select-selection";

export interface ECommandShapeSelectSelection {
	restore(stored: EToolSelectSelectionStored): void;
}

export class ECommandShapeSelect extends DCommandBase {
	protected _before: EToolSelectSelectionStored;
	protected _after: EToolSelectSelectionStored;
	protected _selection: ECommandShapeSelectSelection;

	constructor(
		before: EToolSelectSelectionStored,
		after: EToolSelectSelectionStored,
		selection: ECommandShapeSelectSelection
	) {
		super();
		this._before = before;
		this._after = after;
		this._selection = selection;
	}

	get before(): EToolSelectSelectionStored {
		return this._before;
	}

	get after(): EToolSelectSelectionStored {
		return this._after;
	}

	get selection(): ECommandShapeSelectSelection {
		return this._selection;
	}

	override isClean(): boolean {
		return true;
	}

	override execute(): boolean {
		return true;
	}

	override redo(): boolean {
		this._selection.restore(this._after);
		return true;
	}

	override undo(): boolean {
		this._selection.restore(this._before);
		return true;
	}

	override destroy(): void {
		this._before.length = 0;
		this._after.length = 0;
	}
}
