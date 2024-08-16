import { DCommand, DCommandBase } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";

export class ECommandComposition extends DCommandBase {
	protected _commands: DCommand[];
	protected _selection: EToolSelectSelection;

	constructor(commands: DCommand[], selection: EToolSelectSelection) {
		super();
		this._commands = commands;
		this._selection = selection;
	}

	get commands(): DCommand[] {
		return this._commands;
	}

	get selection(): EToolSelectSelection {
		return this._selection;
	}

	execute(): boolean {
		return true;
	}

	redo(): boolean {
		const selection = this._selection;
		const commands = this._commands;
		selection.lock();
		for (let i = 0, imax = commands.length; i < imax; ++i) {
			commands[i].redo();
		}
		selection.unlock();
		return true;
	}

	undo(): boolean {
		const selection = this._selection;
		selection.lock();
		const commands = this._commands;
		for (let i = commands.length - 1; 0 <= i; --i) {
			commands[i].undo();
		}
		selection.unlock();
		return true;
	}

	destroy(): void {
		const commands = this._commands;
		for (let i = 0, imax = commands.length; i < imax; ++i) {
			commands[i].destroy();
		}
	}
}
