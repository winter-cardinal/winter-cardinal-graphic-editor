import {
	DDialogLayered,
	DDialogLayeredOptions,
	DInputTextAndLabel,
	DLayoutSpace,
	DTable,
	DTableColumnOptions,
	DThemeDialogLayered,
	EShape,
	EShapeDataMapper,
	EShapeDataMapperImpl,
	EShapeDataMappingValue,
	EShapeDataValueImpl,
	EShapeDataValueScope
} from "@wcardinal/wcardinal-ui";
import { DisplayObject } from "pixi.js";

export interface EDialogDataMappingValueTableRow {
	id: string;
	mappedId: string;
}

export interface EThemeDialogDataMappingValue extends DThemeDialogLayered {
	getInputSourceLabel(): string | undefined;
	getInputDestinationLabel(): string | undefined;
	getInputInitialLabel(): string | undefined;
	getTableColumnDataIdLabel(): string | undefined;
	getTableColumnMappedToLabel(): string | undefined;
}

export class EDialogDataMappingValue extends DDialogLayered<
	EShapeDataMappingValue | null,
	EThemeDialogDataMappingValue
> {
	protected _inputSource?: DInputTextAndLabel;
	protected _inputDestination?: DInputTextAndLabel;
	protected _inputInitial?: DInputTextAndLabel;

	protected _table?: DTable<EDialogDataMappingValueTableRow>;

	protected _ids?: string[];
	protected _isRowsDirty?: boolean;
	protected _onUpdateRowsTimeout?: number;
	protected _onUpdateRowsBound?: () => void;

	protected _newSource?: string;
	protected _lastSource?: string;
	protected _mapper?: EShapeDataMapper | null;

	protected _newDestination?: string;
	protected _lastDestination?: string;
	protected _destinations?: string[] | null;

	protected override newContentChildren(
		theme: EThemeDialogDataMappingValue,
		options?: DDialogLayeredOptions<EShapeDataMappingValue | null, EThemeDialogDataMappingValue>
	): Array<DisplayObject | null> {
		const result = super.newContentChildren(theme, options);
		result.push(
			this.inputSource,
			this.inputDestination,
			this.inputInitial,
			new DLayoutSpace({
				height: 6
			}),
			this.table
		);
		return result;
	}

	protected get inputSource(): DInputTextAndLabel {
		let result = this._inputSource;
		if (result == null) {
			result = this.newInputSource();
			this._inputSource = result;
		}
		return result;
	}

	protected newInputSource(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
			input: {
				weight: 1,
				on: {
					input: (value): void => {
						this.onInputSourceChanged(value);
					},

					enter: (): void => {
						this.ok();
					}
				}
			},
			label: {
				width: 60,
				text: {
					value: this.theme.getInputSourceLabel()
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected onInputSourceChanged(value: string): void {
		this._newSource = value;
		this.updateRows();
	}

	protected get inputDestination(): DInputTextAndLabel {
		let result = this._inputDestination;
		if (result == null) {
			result = this.newInputDestination();
			this._inputDestination = result;
		}
		return result;
	}

	protected newInputDestination(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
			input: {
				weight: 1,
				text: {
					value: ""
				},
				on: {
					input: (value): void => {
						this.onInputDestinationChanged(value);
					},

					enter: (): void => {
						this.ok();
					}
				}
			},
			label: {
				width: 60,
				text: {
					value: this.theme.getInputDestinationLabel()
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected onInputDestinationChanged(value: string): void {
		this._newDestination = value;
		this.updateRows();
	}

	protected get inputInitial(): DInputTextAndLabel {
		let result = this._inputInitial;
		if (result == null) {
			result = this.newInputInitial();
			this._inputInitial = result;
		}
		return result;
	}

	protected newInputInitial(): DInputTextAndLabel {
		return new DInputTextAndLabel({
			width: "padding",
			height: "auto",
			input: {
				weight: 1,
				text: {
					value: ""
				},
				on: {
					enter: (): void => {
						this.ok();
					}
				}
			},
			label: {
				width: 60,
				text: {
					value: this.theme.getInputInitialLabel()
				}
			},
			space: {
				width: 60
			}
		});
	}

	protected get table(): DTable<EDialogDataMappingValueTableRow> {
		let result = this._table;
		if (result == null) {
			result = this.newTable();
			this._table = result;
		}
		return result;
	}

	protected newTable(): DTable<EDialogDataMappingValueTableRow> {
		return new DTable<EDialogDataMappingValueTableRow>({
			width: "padding",
			height: 300,
			columns: this.newColumnOptions()
		});
	}

	protected newColumnOptions(): Array<DTableColumnOptions<EDialogDataMappingValueTableRow>> {
		const theme = this.theme;
		return [
			{
				type: "TEXT",
				label: theme.getTableColumnDataIdLabel(),
				editable: false,
				sortable: true,
				getter: (row: EDialogDataMappingValueTableRow): string => {
					return row.id;
				}
			},
			{
				type: "TEXT",
				label: theme.getTableColumnMappedToLabel(),
				editable: false,
				sortable: true,
				getter: (row: EDialogDataMappingValueTableRow): string => {
					return row.mappedId;
				}
			}
		];
	}

	set(value?: EShapeDataMappingValue | null, shape?: EShape | null): this {
		let isChanged = false;
		if (value !== undefined) {
			if (value != null) {
				this.inputSource.input.value = value[0];
				this.inputDestination.input.value = value[1];
				this.inputInitial.input.value = value[2];
				this._newSource = value[0];
				this._newDestination = value[1];
			} else {
				this.inputSource.input.value = "";
				this.inputDestination.input.value = "";
				this.inputInitial.input.value = "";
				this._newSource = "";
				this._newDestination = "";
			}
			isChanged = true;
		}
		if (shape !== undefined) {
			this._ids = this.toIds(shape);
			isChanged = true;
		}
		if (isChanged) {
			this.updateRows();
		}
		return this;
	}

	get value(): EShapeDataMappingValue | null {
		return [
			this.inputSource.input.value.trim(),
			this.inputDestination.input.value.trim(),
			this.inputInitial.input.value.trim()
		];
	}

	set value(value: EShapeDataMappingValue | null) {
		this.set(value);
	}

	protected getResolvedValue(): EShapeDataMappingValue | null {
		return this.value;
	}

	protected toIds(shape?: EShape | null): string[] {
		const result: string[] = [];
		if (shape != null) {
			const ids = new Set<string>();
			this.newIds(shape.children, ids);
			ids.forEach((id) => {
				result.push(id);
			});
			result.sort();
		}
		return result;
	}

	protected newIds(shapes: EShape[], result: Set<string>): void {
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			const data = shape.data;
			for (let j = 0, jmax = data.size(); j < jmax; ++j) {
				const value = data.get(j);
				if (value && value.scope !== EShapeDataValueScope.PRIVATE) {
					result.add(value.id);
				}
			}

			const children = shape.children;
			if (0 < children.length) {
				this.newIds(children, result);
			}
		}
	}

	protected get onUpdateRowsBound(): () => void {
		let result = this._onUpdateRowsBound;
		if (result == null) {
			result = this.newOnUpdateRowsBound();
			this._onUpdateRowsBound = result;
		}
		return result;
	}

	protected newOnUpdateRowsBound(): () => void {
		return (): void => {
			this.onUpdateRows();
		};
	}

	protected onUpdateRows(): void {
		this._onUpdateRowsTimeout = undefined;
		if (this._isRowsDirty) {
			this._isRowsDirty = false;
			this.table.data.clearAndAddAll(this.newRows());
			this._onUpdateRowsTimeout = window.setTimeout(this.onUpdateRowsBound, 100);
		}
	}

	protected newRows(): EDialogDataMappingValueTableRow[] {
		const ids = this._ids;
		if (ids == null || ids.length <= 0) {
			return [];
		}

		// Source
		let mapper = this._mapper;
		const newSource = this._newSource;
		if (mapper === undefined || this._lastSource !== newSource) {
			this._lastSource = newSource;
			if (newSource != null) {
				const newSourceTrimmed = newSource.trim();
				if (0 < newSourceTrimmed.length) {
					mapper = new EShapeDataMapperImpl(newSource);
				} else {
					mapper = null;
				}
			} else {
				mapper = null;
			}
		}

		// Destination
		let destinations = this._destinations;
		const newDestination = this._newDestination;
		if (destinations === undefined || this._lastDestination !== newDestination) {
			this._lastDestination = newDestination;
			destinations = EShapeDataMapperImpl.split(newDestination);
		}

		// Rows
		const result: EDialogDataMappingValueTableRow[] = [];
		if (mapper != null) {
			const value = new EShapeDataValueImpl();
			value.initial = "";
			for (let i = 0, imax = ids.length; i < imax; ++i) {
				const id = ids[i];
				value.id = id;
				if (mapper.map(value, destinations, "")) {
					result.push({
						id: id,
						mappedId: value.id
					});
				}
			}
		} else {
			for (let i = 0, imax = ids.length; i < imax; ++i) {
				const id = ids[i];
				result.push({
					id: id,
					mappedId: id
				});
			}
		}
		return result;
	}

	protected updateRows(): void {
		this._isRowsDirty = true;
		if (this._onUpdateRowsTimeout == null) {
			this.onUpdateRows();
		}
	}

	protected getType(): string {
		return "EDialogDataMappingValue";
	}
}
