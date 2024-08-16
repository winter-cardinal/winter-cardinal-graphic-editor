import {
	DCommandBase,
	DList,
	EShapeCapabilities,
	EShapeCapability,
	EShapeDataMappingValue
} from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";

export class ECommandShapeDataMappingValueReplace extends DCommandBase {
	protected _selection: EToolSelectSelection;
	protected _oldValue: EShapeDataMappingValue;
	protected _newValue: EShapeDataMappingValue;
	protected _indices: number[];
	protected _oldValues: EShapeDataMappingValue[];
	protected _list: DList<EShapeDataMappingValue>;

	constructor(
		oldValue: EShapeDataMappingValue,
		newValue: EShapeDataMappingValue,
		selection: EToolSelectSelection,
		list: DList<EShapeDataMappingValue>
	) {
		super();
		this._selection = selection;
		this._oldValue = oldValue;
		this._newValue = newValue;
		this._list = list;

		const indices: number[] = [];
		const oldValues: EShapeDataMappingValue[] = [];
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			if (EShapeCapabilities.contains(shape, EShapeCapability.DATA_MAPPING)) {
				const mapping = shape.data.getMapping();
				if (mapping) {
					const index = mapping.indexOf(oldValue);
					indices.push(index);
					if (0 <= index) {
						oldValues.push(mapping.get(index)!);
						mapping.set(index, newValue);
					} else {
						oldValues.push(newValue);
					}
				} else {
					indices.push(-1);
					oldValues.push(newValue);
				}
			} else {
				indices.push(-1);
				oldValues.push(newValue);
			}
		}
		this._indices = indices;
		this._oldValues = oldValues;
		if (list.data.selection.contains(oldValue)) {
			list.data.selection.clearAndAdd(newValue);
		}
		this._selection.update("PROPERTY");
	}

	get selection(): EToolSelectSelection {
		return this._selection;
	}

	get oldValue(): EShapeDataMappingValue {
		return this._oldValue;
	}

	get newValue(): EShapeDataMappingValue {
		return this._newValue;
	}

	get indices(): number[] {
		return this._indices;
	}

	get oldValues(): EShapeDataMappingValue[] {
		return this._oldValues;
	}

	get list(): DList<EShapeDataMappingValue> {
		return this._list;
	}

	execute(): boolean {
		return true;
	}

	redo(): boolean {
		const newValue = this._newValue;
		const indices = this._indices;
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			const index = indices[i];
			if (0 <= index) {
				const mapping = shape.data.getMapping();
				if (mapping) {
					mapping.set(index, newValue);
				}
			}
		}
		const list = this._list;
		if (list.data.selection.contains(this._oldValue)) {
			list.data.selection.clearAndAdd(newValue);
		}
		this._selection.update("PROPERTY");
		return true;
	}

	undo(): boolean {
		const indices = this._indices;
		const oldValues = this._oldValues;
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			const index = indices[i];
			if (0 <= index) {
				const mapping = shape.data.getMapping();
				if (mapping) {
					mapping.set(index, oldValues[i]);
				}
			}
		}
		const list = this._list;
		if (list.data.selection.contains(this._newValue)) {
			list.data.selection.clearAndAdd(this._oldValue);
		}
		this._selection.update("PROPERTY");
		return true;
	}
}
