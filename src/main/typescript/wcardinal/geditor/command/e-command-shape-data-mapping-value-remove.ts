import {
	DCommandBase,
	EShapeCapabilities,
	EShapeCapability,
	EShapeDataMappingValue
} from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";

export class ECommandShapeDataMappingValueRemove extends DCommandBase {
	protected _selection: EToolSelectSelection;
	protected _target: EShapeDataMappingValue;
	protected _indices: number[];

	constructor(target: EShapeDataMappingValue, selection: EToolSelectSelection) {
		super();
		this._selection = selection;
		this._target = target;
		const indices: number[] = [];
		const shapes = this._selection.get();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			if (EShapeCapabilities.contains(shape, EShapeCapability.DATA_MAPPING)) {
				const mapping = shape.data.getMapping();
				if (mapping) {
					const index = mapping.indexOf(target);
					indices.push(index);
					if (0 <= index) {
						mapping.remove(index);
					}
				} else {
					indices.push(-1);
				}
			} else {
				indices.push(-1);
			}
		}
		this._indices = indices;
		this._selection.update("PROPERTY");
	}

	get selection(): EToolSelectSelection {
		return this._selection;
	}

	get target(): EShapeDataMappingValue {
		return this._target;
	}

	get indices(): number[] {
		return this._indices;
	}

	execute(): boolean {
		return true;
	}

	redo(): boolean {
		const shapes = this._selection.get();
		const indices = this._indices;
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			const index = indices[i];
			if (0 <= index) {
				const mapping = shape.data.getMapping();
				if (mapping) {
					mapping.remove(index);
				}
			}
		}
		this._selection.update("PROPERTY");
		return true;
	}

	undo(): boolean {
		const target = this._target;
		const shapes = this._selection.get();
		const indices = this._indices;
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			const index = indices[i];
			if (0 <= index) {
				const mapping = shape.data.getMapping();
				if (mapping) {
					mapping.add(target, index);
				}
			}
		}
		this._selection.update("PROPERTY");
		return true;
	}
}
