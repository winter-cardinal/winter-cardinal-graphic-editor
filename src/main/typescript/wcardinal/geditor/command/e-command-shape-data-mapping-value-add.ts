import {
	DCommandBase,
	EShapeCapabilities,
	EShapeCapability,
	EShapeDataMappingValue
} from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";

export class ECommandShapeDataMappingValueAdd extends DCommandBase {
	protected _selection: EToolSelectSelection;
	protected _value: EShapeDataMappingValue;

	constructor(value: EShapeDataMappingValue, selection: EToolSelectSelection) {
		super();
		this._selection = selection;
		this._value = value;
	}

	get selection(): EToolSelectSelection {
		return this._selection;
	}

	get value(): EShapeDataMappingValue {
		return this._value;
	}

	execute(): boolean {
		return this.redo();
	}

	redo(): boolean {
		const value = this._value;
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			if (EShapeCapabilities.contains(shape, EShapeCapability.DATA_MAPPING)) {
				shape.data.mapping.add(value);
			}
		}
		this._selection.update("PROPERTY");
		return true;
	}

	undo(): boolean {
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			if (EShapeCapabilities.contains(shape, EShapeCapability.DATA_MAPPING)) {
				const mapping = shape.data.getMapping();
				if (mapping) {
					mapping.remove(mapping.size() - 1);
				}
			}
		}
		this._selection.update("PROPERTY");
		return true;
	}
}
