import {
	DDialogLayered,
	DDialogLayeredOptions,
	DInputLabel,
	DInputReal,
	DInputText,
	DLayoutHorizontal,
	DLayoutSpace,
	DSelect,
	DThemeDialogLayered,
	EShapeTextAlignHorizontal
} from "@wcardinal/wcardinal-ui";
import { DisplayObject } from "pixi.js";
import { EShapeTableColumnValue, EShapeTableColumnValueType } from "./e-shape-table-column-value";
import { EShapeTableColumnValueBody } from "./e-shape-table-column-value-body";
import { EShapeTableColumnValueHeader } from "./e-shape-table-column-value-header";

export interface EThemeDialogShapeTableColumn extends DThemeDialogLayered {
	getSelectColumnValueTypeLabel(): string;
	toSelectColumnValueTypeLabel(type: EShapeTableColumnValueType): string;
	getInputLabelLabel(): string;
	newInputLabel(): string;
	getInputWidthLabel(): string;
	getInputGetterLabel(): string;
	getInputSetterLabel(): string;
	getInputFormatLabel(): string;
	getSelectTextAlignLabel(): string;
	toTextAlignLabel(align: EShapeTextAlignHorizontal): string;
}

export class EDialogTableColumn extends DDialogLayered<
	EShapeTableColumnValue | null,
	EThemeDialogShapeTableColumn
> {
	protected _selectType!: DSelect<EShapeTableColumnValueType>;
	protected _inputLabel!: DInputText;
	protected _inputWidth!: DInputReal;
	protected _inputGetter!: DInputText;
	protected _inputSetter!: DInputText;
	protected _inputFormat!: DInputText;
	protected _selectAlign!: DSelect<EShapeTextAlignHorizontal>;

	protected override newContentChildren(
		theme: EThemeDialogShapeTableColumn,
		options?: DDialogLayeredOptions<EShapeTableColumnValue | null, EThemeDialogShapeTableColumn>
	): Array<DisplayObject | null> {
		const result = super.newContentChildren(theme, options);

		// Type
		result.push(
			new DLayoutHorizontal({
				width: "padding",
				height: "auto",
				children: [
					new DInputLabel({
						width: 60,
						text: {
							value: theme.getSelectColumnValueTypeLabel()
						}
					}),
					new DSelect<EShapeTableColumnValueType>({
						weight: 1,
						value: EShapeTableColumnValueType.TEXT,
						menu: {
							items: [
								{
									value: EShapeTableColumnValueType.TEXT,
									text: {
										value: theme.toSelectColumnValueTypeLabel(
											EShapeTableColumnValueType.TEXT
										)
									}
								},
								{
									value: EShapeTableColumnValueType.NUMBER,
									text: {
										value: theme.toSelectColumnValueTypeLabel(
											EShapeTableColumnValueType.NUMBER
										)
									}
								}
							]
						},
						on: {
							init: (self: DSelect<EShapeTableColumnValueType>): void => {
								this._selectType = self;
							}
						}
					}),
					new DLayoutSpace({
						width: 60
					})
				]
			})
		);

		// Label
		result.push(
			new DLayoutHorizontal({
				width: "padding",
				height: "auto",
				children: [
					new DInputLabel({
						width: 60,
						text: {
							value: theme.getInputLabelLabel()
						}
					}),
					new DInputText({
						weight: 1,
						text: {
							value: ""
						},
						on: {
							init: (self: DInputText): void => {
								this._inputLabel = self;
							},
							enter: () => {
								this.ok();
							}
						}
					}),
					new DLayoutSpace({
						width: 60
					})
				]
			})
		);

		// Width Weight
		result.push(
			new DLayoutHorizontal({
				width: "padding",
				height: "auto",
				children: [
					new DInputLabel({
						width: 60,
						text: {
							value: theme.getInputWidthLabel()
						}
					}),
					new DInputReal({
						weight: 1,
						text: {
							value: 0
						},
						min: 0,
						on: {
							init: (self: DInputReal): void => {
								this._inputWidth = self;
							},
							enter: () => {
								this.ok();
							}
						}
					}),
					new DLayoutSpace({
						width: 60
					})
				]
			})
		);

		// Getter / setter
		result.push(
			new DLayoutHorizontal({
				width: "padding",
				height: "auto",
				children: [
					new DInputLabel({
						width: 60,
						text: {
							value: theme.getInputGetterLabel()
						}
					}),
					new DInputText({
						weight: 1,
						text: {
							value: ""
						},
						on: {
							init: (self: DInputText): void => {
								this._inputGetter = self;
							},
							enter: () => {
								this.ok();
							}
						}
					}),
					new DLayoutSpace({
						width: 60
					})
				]
			})
		);

		result.push(
			new DLayoutHorizontal({
				width: "padding",
				height: "auto",
				children: [
					new DInputLabel({
						width: 60,
						text: {
							value: theme.getInputSetterLabel()
						}
					}),
					new DInputText({
						weight: 1,
						text: {
							value: ""
						},
						on: {
							init: (self: DInputText): void => {
								this._inputSetter = self;
							},
							enter: () => {
								this.ok();
							}
						}
					}),
					new DLayoutSpace({
						width: 60
					})
				]
			})
		);

		// Format
		result.push(
			new DLayoutHorizontal({
				width: "padding",
				height: "auto",
				children: [
					new DInputLabel({
						width: 60,
						text: {
							value: theme.getInputFormatLabel()
						}
					}),
					new DInputText({
						weight: 1,
						text: {
							value: ""
						},
						on: {
							init: (self: DInputText): void => {
								this._inputFormat = self;
							},
							enter: () => {
								this.ok();
							}
						}
					}),
					new DLayoutSpace({
						width: 60
					})
				]
			})
		);

		// Align
		result.push(
			new DLayoutHorizontal({
				width: "padding",
				height: "auto",
				children: [
					new DInputLabel({
						width: 60,
						text: {
							value: theme.getSelectTextAlignLabel()
						}
					}),
					new DSelect<EShapeTextAlignHorizontal>({
						weight: 1,
						value: EShapeTextAlignHorizontal.CENTER,
						menu: {
							items: [
								{
									value: EShapeTextAlignHorizontal.LEFT,
									text: {
										value: theme.toTextAlignLabel(
											EShapeTextAlignHorizontal.LEFT
										)
									}
								},
								{
									value: EShapeTextAlignHorizontal.CENTER,
									text: {
										value: theme.toTextAlignLabel(
											EShapeTextAlignHorizontal.CENTER
										)
									}
								},
								{
									value: EShapeTextAlignHorizontal.RIGHT,
									text: {
										value: theme.toTextAlignLabel(
											EShapeTextAlignHorizontal.RIGHT
										)
									}
								}
							]
						},
						on: {
							init: (self: DSelect<EShapeTextAlignHorizontal>): void => {
								this._selectAlign = self;
							}
						}
					}),
					new DLayoutSpace({
						width: 60
					})
				]
			})
		);

		return result;
	}

	reset(): this {
		this._selectType.value = EShapeTableColumnValueType.TEXT;
		this._inputLabel.value = this.theme.newInputLabel();
		this._inputWidth.value = 1;
		this._inputGetter.value = "";
		this._inputSetter.value = "";
		this._inputFormat.value = "";
		this._selectAlign.value = EShapeTextAlignHorizontal.CENTER;
		return this;
	}

	get value(): EShapeTableColumnValue | null {
		return new EShapeTableColumnValue(
			this._inputWidth.value,
			this._selectType.value || EShapeTableColumnValueType.TEXT,
			this._inputGetter.value,
			this._inputSetter.value,
			this._inputFormat.value,
			this._selectAlign.value || EShapeTextAlignHorizontal.LEFT,
			new EShapeTableColumnValueHeader(this._inputLabel.value),
			new EShapeTableColumnValueBody()
		);
	}

	set value(value: EShapeTableColumnValue | null) {
		if (value != null) {
			this._selectType.value = value.type;
			this._inputLabel.value = value.header.label;
			this._inputWidth.value = value.weight;
			this._inputGetter.value = value.getter;
			this._inputSetter.value = value.setter;
			this._inputFormat.value = value.format;
			this._selectAlign.value = value.align;
		}
	}

	protected getResolvedValue(): EShapeTableColumnValue | null {
		return this.value;
	}

	protected override getType(): string {
		return "EDialogShapeTableColumn";
	}
}
