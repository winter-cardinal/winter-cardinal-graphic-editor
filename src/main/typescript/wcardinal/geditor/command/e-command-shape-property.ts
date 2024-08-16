import { EShapeGroup } from "@wcardinal/wcardinal-ui";
import { EShapeCapabilities } from "@wcardinal/wcardinal-ui";
import { EShapeCapability } from "@wcardinal/wcardinal-ui";
import { DCommand, DCommandBase, EShape } from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";
import { EToolSelectSelectionUpdatedPart } from "../tool/e-tool-select-selection-updated-part";

export abstract class ECommandShapeProperty<PROPERTY, INITIAL_PROPERTY> extends DCommandBase {
	protected _selection: EToolSelectSelection;
	protected _shapes: EShape[];
	protected _capabilities: EShapeCapability[];
	protected _data: PROPERTY[];
	protected _property: INITIAL_PROPERTY;
	protected _targets: EShape[];
	protected _isMerged: boolean;

	constructor(
		selection: EToolSelectSelection,
		property: INITIAL_PROPERTY,
		targets: EShape[] = selection.get()
	) {
		super();
		this._selection = selection;
		this._shapes = [];
		this._capabilities = [];
		this._data = [];
		this._property = property;
		this._targets = targets;
		this._isMerged = false;
	}

	get selection(): EToolSelectSelection {
		return this._selection;
	}

	get shapes(): EShape[] {
		return this._shapes;
	}

	get capabilities(): EShapeCapability[] {
		return this._capabilities;
	}

	get data(): PROPERTY[] {
		return this._data;
	}

	protected toCapability(shape: EShape): EShapeCapability {
		return EShapeCapability.ALL;
	}

	protected isRecursive(): boolean {
		return false;
	}

	protected isMergeable(): boolean {
		return false;
	}

	protected isClassMergeable(
		target: DCommand
	): target is ECommandShapeProperty<PROPERTY, INITIAL_PROPERTY> {
		return target.constructor === this.constructor;
	}

	protected abstract getProperty(shape: EShape, capability: EShapeCapability): PROPERTY;
	protected abstract setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: PROPERTY
	): void;
	protected abstract initProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: INITIAL_PROPERTY
	): void;

	override execute(): boolean {
		const shapes = this._shapes;
		const capabilities = this._capabilities;
		const property = this._property;
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			this.initProperty(shapes[i], capabilities[i], property);
		}
		this._selection.update(this.getParts());
		return true;
	}

	protected init(
		targets: EShape[],
		shapes: EShape[],
		capabilities: EShapeCapability[],
		data: PROPERTY[],
		recursive: boolean
	): void {
		for (let i = 0, imax = targets.length; i < imax; ++i) {
			const target = targets[i];
			if (recursive && target instanceof EShapeGroup) {
				if (EShapeCapabilities.contains(target, EShapeCapability.CHILDREN)) {
					this.init(target.children, shapes, capabilities, data, recursive);
				}
			} else {
				const capability = this.toCapability(target);
				if (capability !== EShapeCapability.NONE) {
					shapes.push(target);
					data.push(this.getProperty(target, capability));
					capabilities.push(capability);
				}
			}
		}
	}

	override merge(target: DCommand): boolean {
		if (this.isMergeable() && this.isClassMergeable(target)) {
			this._isMerged = true;
			this._shapes = target.shapes;
			this._capabilities = target.capabilities;
			this._data = target.data;
			return true;
		}
		this.init(this._targets, this._shapes, this._capabilities, this._data, this.isRecursive());
		return false;
	}

	override isMerged(): boolean {
		return this._isMerged;
	}

	override redo(): boolean {
		const shapes = this._shapes;
		const data = this._data;
		const capabilities = this._capabilities;
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			const datum = data[i];
			const capability = capabilities[i];
			data[i] = this.getProperty(shape, capability);
			this.setProperty(shape, capability, datum);
		}
		this._selection.update(this.getParts());
		return true;
	}

	override undo(): boolean {
		return this.redo();
	}

	override destroy(): void {
		this._shapes.length = 0;
		this._data.length = 0;
	}

	protected getParts(): EToolSelectSelectionUpdatedPart {
		return EToolSelectSelectionUpdatedPart.PROPERTY;
	}
}
