import {
	DBase,
	DDialogLayered,
	DInputLabel,
	DInputText,
	DInputTextAndLabel,
	DLayoutHorizontal,
	DLayoutSpace,
	DLayoutVertical,
	DMenuItemOptionsUnion,
	DSelect,
	EShapeActionValue
} from "@wcardinal/wcardinal-ui";
import { EShapeActionExtension } from "../extension/e-shape-action-extension";
import { EShapeActionExtensionInputType } from "../extension/e-shape-action-extension-input";
import { EShapeActionExtensionItem } from "../extension/e-shape-action-extension-item";

export class EDialogActionExtension {
	protected _extension: EShapeActionExtension;
	protected _dialog: DDialogLayered<any>;
	protected _condition: DInputTextAndLabel;
	protected _layout: DLayoutVertical;

	protected _select?: DSelect<number> | null;
	protected _selectLayout?: DLayoutHorizontal | null;
	protected _inputs?: DInputText[];
	protected _inputLayouts?: DLayoutHorizontal[];

	constructor(
		extension: EShapeActionExtension,
		dialog: DDialogLayered<any>,
		condition: DInputTextAndLabel,
		layout: DLayoutVertical
	) {
		this._extension = extension;
		this._dialog = dialog;
		this._condition = condition;
		this._layout = layout;
	}

	get select(): DSelect<number> | null {
		let result = this._select;
		if (result === undefined) {
			result = this.newSelect();
			this._select = result;
		}
		return result;
	}

	protected newSelect(): DSelect<number> | null {
		const extensionItems = this._extension.items;
		if (extensionItems != null && 0 < extensionItems.length) {
			const result = new DSelect<number>({
				weight: 1,
				value: extensionItems[0].type,
				menu: {
					items: this.newSelectMenuItems(extensionItems)
				}
			});
			return result;
		}
		return null;
	}

	protected newSelectMenuItems(
		items: EShapeActionExtensionItem[]
	): DMenuItemOptionsUnion<number>[] {
		const result: DMenuItemOptionsUnion<number>[] = [];
		for (let i = 0, imax = items.length; i < imax; ++i) {
			const item = items[i];
			result.push({
				value: item.type,
				text: {
					value: item.label
				}
			});
		}
		return result;
	}

	protected get selectLayout(): DLayoutHorizontal | null {
		let result = this._selectLayout;
		if (result === undefined) {
			result = this.newSelectLayout();
			if (result != null) {
				const layout = this._layout;
				const conditionIndex = layout.getChildIndex(this._condition);
				if (0 <= conditionIndex) {
					layout.addChildAt(result, conditionIndex);
				} else {
					layout.addChild(result);
				}
			}
			this._selectLayout = result;
		}
		return result;
	}

	protected newSelectLayout(): DLayoutHorizontal | null {
		const select = this.select;
		if (select != null) {
			return this.newLabeled("", select);
		}
		return null;
	}

	protected get inputs(): DInputText[] {
		let result = this._inputs;
		if (result === undefined) {
			result = this.newInputs();
			this._inputs = result;
		}
		return result;
	}

	protected newInputs(): DInputText[] {
		const result: Array<DInputText> = [];
		const extensionInputs = this._extension.inputs;
		if (extensionInputs != null) {
			for (let i = 0, imax = extensionInputs.length; i < imax; ++i) {
				const input = extensionInputs[i];
				switch (input.type) {
					case EShapeActionExtensionInputType.TEXT:
						const inputText = this.newInputText();
						result.push(inputText);
						break;
				}
			}
		}
		return result;
	}

	protected newInputText(): DInputText {
		return new DInputText({
			weight: 1,
			on: {
				enter: () => {
					this.ok();
				}
			}
		});
	}

	protected newLabel(label: string): DInputLabel {
		return new DInputLabel({
			width: 60,
			text: {
				value: label
			}
		});
	}

	protected newSpace(): DLayoutSpace {
		return new DLayoutSpace({
			width: 60
		});
	}

	protected newLabeled<INPUT extends DBase>(
		label: string | null | undefined,
		input: INPUT
	): DLayoutHorizontal {
		return new DLayoutHorizontal({
			width: "padding",
			height: "auto",
			children: [
				label != null ? this.newLabel(label) : this.newSpace(),
				input,
				this.newSpace()
			]
		});
	}

	get inputLayouts(): DLayoutHorizontal[] {
		let result = this._inputLayouts;
		if (result === undefined) {
			result = this.newInputLayouts();
			this._inputLayouts = result;
		}
		return result;
	}

	protected newInputLayouts(): DLayoutHorizontal[] {
		const result: DLayoutHorizontal[] = [];
		const inputs = this.inputs;
		const layout = this._layout;
		const extensionInputs = this._extension.inputs;
		if (extensionInputs != null) {
			const conditionIndex = layout.getChildIndex(this._condition);
			for (let i = 0, imax = inputs.length; i < imax; ++i) {
				const labeled = this.newLabeled(extensionInputs[i].label, inputs[i]);
				result.push(labeled);
				if (0 <= conditionIndex) {
					layout.addChildAt(labeled, conditionIndex + 1 + i);
				} else {
					layout.addChild(labeled);
				}
			}
		}
		return result;
	}

	get value(): EShapeActionValue | null {
		return this._extension.toValue(this.select, this._condition.input, this.inputs);
	}

	set value(value: EShapeActionValue | null) {
		if (value != null) {
			this._extension.fromValue(value, this.select, this._condition.input, this.inputs);
		}
	}

	show(): void {
		// Select
		const selectLayout = this.selectLayout;
		if (selectLayout != null) {
			selectLayout.show();
		}

		// Inputs
		const inputLayouts = this.inputLayouts;
		if (0 < inputLayouts.length) {
			const extension = this._extension;
			if (extension.onShow != null) {
				extension.onShow(inputLayouts);
			} else {
				for (let i = 0, imax = inputLayouts.length; i < imax; ++i) {
					inputLayouts[i].show();
				}
			}
		}
	}

	hide(): void {
		// Select
		const selectLayout = this._selectLayout;
		if (selectLayout != null) {
			selectLayout.hide();
		}

		// Inputs
		const inputLayouts = this._inputLayouts;
		if (inputLayouts != null) {
			for (let i = 0, imax = inputLayouts.length; i < imax; ++i) {
				inputLayouts[i].hide();
			}
		}
	}

	reset(): void {
		// Select
		const select = this._select;
		if (select) {
			const items = this._extension.items;
			if (items != null && 0 < items.length) {
				select.value = items[0].type;
			} else {
				select.value = null;
			}
		}

		// Inputs
		const inputs = this._inputs;
		if (inputs) {
			const extensionInputs = this._extension.inputs;
			if (extensionInputs != null) {
				for (let i = 0, imax = inputs.length; i < imax; ++i) {
					inputs[i].value = extensionInputs[i].initial || "";
				}
			}
		}
	}

	protected ok(): void {
		this._dialog.ok();
	}
}
