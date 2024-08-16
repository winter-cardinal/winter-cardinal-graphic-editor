import { utils } from "pixi.js";
import { ETool } from "./e-tool";

export class EToolImpl extends utils.EventEmitter implements ETool {
	protected _isActive: boolean;

	constructor() {
		super();
		this._isActive = false;
	}

	activate(): void {
		if (!this._isActive) {
			this._isActive = true;
			this.onActivate();
		}
	}

	deactivate(): void {
		if (this._isActive) {
			this._isActive = false;
			this.onDeactivate();
		}
	}

	protected onActivate(): void {
		// DO NOTHING
	}

	protected onDeactivate(): void {
		// DO NOTHING
	}

	isActive(): boolean {
		return this._isActive;
	}
}
