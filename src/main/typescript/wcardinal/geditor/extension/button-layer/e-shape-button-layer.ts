import {
	DDiagramSerializedItem,
	EShape,
	EShapeButton,
	EShapeCopyPart,
	EShapeCorner,
	EShapeGroupShadowed,
	EShapeLockPart,
	EShapeResourceManagerDeserializationMode,
	EShapeResourceManagerSerialization,
	EShapeType
} from "@wcardinal/wcardinal-ui";
import { EShapeButtonLayerButtonValueContainer } from "./e-shape-button-layer-button-value-container";
import { EShapeButtonLayerIds } from "./e-shape-button-layer-ids";

export type EShapeButtonLayerResourceSerialized = [number, number];

export class EShapeButtonLayer extends EShapeGroupShadowed {
	protected _button: EShapeButtonLayerButtonValueContainer;
	protected _corner: EShapeCorner;

	constructor(
		mode: EShapeResourceManagerDeserializationMode,
		type: EShapeType = EShapeButtonLayerIds.ID
	) {
		super(mode, type);
		this._button = new EShapeButtonLayerButtonValueContainer(() => {
			this.onButtonValueChange();
		});
		this._corner = EShapeCorner.ALL;
	}

	get button(): EShapeButtonLayerButtonValueContainer {
		return this._button;
	}

	get corner(): EShapeCorner {
		return this._corner;
	}

	set corner(corner: EShapeCorner) {
		if (this._corner !== corner) {
			this._corner = corner;
			this.updateUploaded();
		}
	}

	protected onButtonValueChange(): void {
		this.newButtons();
		this.layoutButtons();
	}

	onSizeChange(): void {
		super.onSizeChange();
		this.layoutButtons();
	}

	protected newButtons(): void {
		const shapeButton = this.button;
		const buttonCount = shapeButton.size();
		const values = shapeButton.values;
		const children = this.children;
		const childrenLength = children.length;

		// Create / delete children
		if (childrenLength < buttonCount) {
			const master = 0 < childrenLength ? children[childrenLength - 1] : null;
			for (let i = childrenLength; i < buttonCount; ++i) {
				const button = new EShapeButton();
				const value = values[i];
				if (master != null) {
					button.copy(master);
					button.text.value = value.label;
				} else {
					button.stroke.set(false, 0x3399ff, 1);
					button.fill.set(true, 0x3399ff, 1);
					button.text.set(value.label, 0xffffff, 1);
					button.state.isFocusable = true;
					button.interactive = true;
				}
				if (0 < button.action.size()) {
					button.action.set(0, value.action);
				} else {
					button.action.add(value.action);
				}
				button.isToggle = true;
				button.isGrouped = true;
				button.attach(this);
			}
		} else if (buttonCount < childrenLength) {
			for (let i = childrenLength - 1; buttonCount <= i; --i) {
				children[i].detach();
			}
		}

		// Update corner, action and state
		const corner = this.corner;
		for (let i = 0; i < buttonCount; ++i) {
			const child = children[i];
			const value = values[i];
			child.corner = this.toCorner(i, buttonCount, corner);
			child.text.value = value.label;
			if (0 < child.action.size()) {
				child.action.set(0, value.action);
			} else {
				child.action.add(value.action);
			}
			child.state.isActive = value.isActive;
		}
	}

	protected layoutButtons(): void {
		const button = this.button;
		const buttonValues = button.values;
		const buttonValuesLength = buttonValues.length;
		const buttonMargin = button.margin;
		const size = this.size;
		const sizeX = size.x;
		const sizeY = size.y;

		const children = this.children;
		const childrenLength = children.length;

		// Total weight
		let totalWeight = 0;
		for (let i = 0; i < buttonValuesLength; ++i) {
			totalWeight += buttonValues[i].weight;
		}
		totalWeight = Math.max(0.0001, totalWeight);
		const buttonSpace = Math.max(0, sizeX - (buttonValuesLength - 1) * buttonMargin);
		const buttonSpaceFactor = buttonSpace / totalWeight;

		// Update
		let x = -sizeX * 0.5;
		for (let i = 0; i < childrenLength; ++i) {
			const buttonValue = buttonValues[i];
			const width = buttonValue.weight * buttonSpaceFactor;
			const child = children[i];
			child.lock(EShapeLockPart.ALL);
			child.size.set(width, sizeY);
			child.transform.position.set(x + width * 0.5, 0);
			child.unlock(EShapeLockPart.ALL, true);
			x += width + buttonMargin;
		}
	}

	protected toCorner(index: number, size: number, corner: EShapeCorner): EShapeCorner {
		let result = EShapeCorner.NONE;
		if (index === 0) {
			result |= EShapeCorner.LEFT & corner;
		}
		if (index === size - 1) {
			result |= EShapeCorner.RIGHT & corner;
		}
		return result;
	}

	copy(source: EShape, part: EShapeCopyPart = EShapeCopyPart.ALL): this {
		const result = super.copy(source, part);
		if (source instanceof EShapeButtonLayer) {
			this._button.copy(source.button);
		}
		return result;
	}

	serialize(manager: EShapeResourceManagerSerialization): DDiagramSerializedItem {
		const result = super.serialize(manager);
		const resource = result[15];
		result[15] = manager.addResource(`[${this._button.serialize(manager)},${resource}]`);
		return result;
	}
}
