import { ETool } from "./e-tool";
import { EToolGroup } from "./e-tool-group";

export class EToolGroupImpl implements EToolGroup {
	protected _isSuspended: boolean;
	protected _active: ETool | null;
	protected _activeParameter: any | null;

	constructor() {
		this._isSuspended = false;
		this._active = null;
		this._activeParameter = null;
	}

	activate(target: ETool, parameter?: any): void {
		const oldActive = this._active;
		const oldActiveParameter = this._activeParameter;
		if (oldActive !== target || oldActiveParameter !== parameter) {
			this._activeParameter = parameter;
			if (oldActive !== target) {
				if (oldActive) {
					oldActive.deactivate();
				}

				this._active = target;
				if (!this._isSuspended) {
					target.activate();
				}
			}
		}
	}

	deactivate(target: ETool, parameter?: any): void {
		if (this._active === target && this._activeParameter === parameter) {
			this._active = null;
			this._activeParameter = null;
			target.deactivate();
		}
	}

	suspend(): void {
		if (!this._isSuspended) {
			this._isSuspended = true;
			const active = this._active;
			if (active) {
				active.deactivate();
			}
		}
	}

	resume(): void {
		if (this._isSuspended) {
			this._isSuspended = false;
			const active = this._active;
			if (active) {
				active.activate();
			}
		}
	}

	isSuspended(): boolean {
		return this._isSuspended;
	}
}
