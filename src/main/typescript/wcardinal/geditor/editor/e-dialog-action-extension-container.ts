import {
	DDialogLayered,
	DInputTextAndLabel,
	DLayoutVertical,
	EShapeActionValue
} from "@wcardinal/wcardinal-ui";
import { EShapeActionExtensions } from "../extension/e-shape-action-extensions";
import { EDialogActionExtension } from "./e-dialog-action-extension";

export class EDialogActionExtensionContainer {
	protected _data: Map<number, EDialogActionExtension>;
	protected _selected?: EDialogActionExtension | null;
	protected _dialog: DDialogLayered;
	protected _condition: DInputTextAndLabel;
	protected _layout: DLayoutVertical;

	constructor(
		dialog: DDialogLayered<any>,
		condition: DInputTextAndLabel,
		layout: DLayoutVertical
	) {
		this._data = new Map<number, EDialogActionExtension>();
		this._dialog = dialog;
		this._condition = condition;
		this._layout = layout;
	}

	get value(): EShapeActionValue | null {
		const selected = this._selected;
		if (selected) {
			return selected.value;
		}
		return null;
	}

	set value(value: EShapeActionValue | null) {
		if (value != null) {
			const datum = this._data.get(value.type);
			if (datum != null) {
				datum.value = value;
			}
		}
	}

	get(type: number): EDialogActionExtension | null {
		const data = this._data;
		let result = data.get(type);
		if (result != null) {
			return result;
		}
		const e = EShapeActionExtensions.get(type);
		if (e == null) {
			return null;
		}
		result = new EDialogActionExtension(e, this._dialog, this._condition, this._layout);
		data.set(type, result);
		return result;
	}

	show(type: number | null): void {
		if (type != null) {
			const datum = this.get(type);
			if (datum != null) {
				const selected = this._selected;
				if (selected !== datum) {
					if (selected != null) {
						selected.hide();
					}
					this._selected = datum;
					datum.show();
				}
			} else {
				this.hide();
			}
		} else {
			this.hide();
		}
	}

	hide(): void {
		const selected = this._selected;
		if (selected != null) {
			selected.hide();
			this._selected = null;
		}
	}

	reset(): void {
		this._data.forEach((datum): void => {
			datum.reset();
		});
	}

	onChange(type: number | null): void {
		this.show(type);
	}
}
