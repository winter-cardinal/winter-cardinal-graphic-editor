import {
	DApplications,
	DControllers,
	DDiagram,
	DDiagramEditor,
	DDiagramLayer,
	DDiagrams,
	DDiagramSerialized,
	DDiagramSerializedItem,
	DDiagramSerializedVersion,
	DList,
	EShape,
	EShapeActionValue,
	EShapeBase,
	EShapeCapabilities,
	EShapeCapability,
	EShapeConnectorLine,
	EShapeContainer,
	EShapeCorner,
	EShapeEmbeddedDatum,
	EShapeGradientLike,
	EShapeGroup,
	EShapePointsMarkerType,
	EShapePointsStyle,
	EShapeResourceManagerDeserialization,
	EShapeResourceManagerSerialization,
	EShapeStrokeStyle,
	EShapeDataValue,
	EShapeTextAlignHorizontal,
	EShapeTextAlignVertical,
	EShapeTextDirection,
	EShapeTextStyle,
	EShapeTextWeight,
	ESnapperModifierAnchor,
	isNumber,
	deserializeAll,
	EShapeDataMappingValue,
	DDiagramCanvas,
	DDiagramCanvasEditor,
	EShapeResourceManagerDeserializationMode,
	DBase,
	EShapeImageLike,
	EShapeFillDirection
} from "@wcardinal/wcardinal-ui";
import { IPoint, Matrix, Point, Rectangle, utils } from "pixi.js";
import { ECommandComposition } from "../command/e-command-composition";
import { ECommandShapeActionValueAdd } from "../command/e-command-shape-action-value-add";
import { ECommandShapeActionValueBringForward } from "../command/e-command-shape-action-value-bring-forward";
import { ECommandShapeActionValueRemove } from "../command/e-command-shape-action-value-remove";
import { ECommandShapeActionValueReplace } from "../command/e-command-shape-action-value-replace";
import { ECommandShapeActionValueSendBackward } from "../command/e-command-shape-action-value-send-backward";
import { ECommandShapeTreeBringForward } from "../command/e-command-shape-tree-bring-forward";
import { ECommandShapeTreeBringToFront } from "../command/e-command-shape-tree-bring-to-front";
import { ECommandShapeCreate } from "../command/e-command-shape-create";
import { ECommandShapeDelete } from "../command/e-command-shape-delete";
import { ECommandShapePropertyAll } from "../command/e-command-shape-property-all";
import { ECommandShapePropertyCornerOff } from "../command/e-command-shape-property-corner-off";
import { ECommandShapePropertyCursor } from "../command/e-command-shape-property-cursor";
import { ECommandShapePropertyLineHeadMargin } from "../command/e-command-shape-property-line-head-margin";
import { ECommandShapePropertyLineTailMargin } from "../command/e-command-shape-property-line-tail-margin";
import { ECommandShapePropertyFillColor } from "../command/e-command-shape-property-fill-color";
import { ECommandShapePropertyFillEnable } from "../command/e-command-shape-property-fill-enable";
import { ECommandShapePropertyFocusable } from "../command/e-command-shape-property-focusable";
import { ECommandShapePropertyId } from "../command/e-command-shape-property-id";
import { ECommandShapePropertyImage } from "../command/e-command-shape-property-image";
import { ECommandShapePropertyImageFitTo } from "../command/e-command-shape-property-image-fit-to";
import { ECommandShapePropertyInteractive } from "../command/e-command-shape-property-interactive";
import { ECommandShapePropertyLineHeadColor } from "../command/e-command-shape-property-line-head-color";
import { ECommandShapePropertyLineHeadSizeX } from "../command/e-command-shape-property-line-head-size-x";
import { ECommandShapePropertyLineHeadSizeY } from "../command/e-command-shape-property-line-head-size-y";
import { ECommandShapePropertyLineHeadType } from "../command/e-command-shape-property-line-head-type";
import { ECommandShapePropertyLineTailColor } from "../command/e-command-shape-property-line-tail-color";
import { ECommandShapePropertyLineTailSizeX } from "../command/e-command-shape-property-line-tail-size-x";
import { ECommandShapePropertyLineTailSizeY } from "../command/e-command-shape-property-line-tail-size-y";
import { ECommandShapePropertyLineTailType } from "../command/e-command-shape-property-line-tail-type";
import { ECommandShapePropertyPointsStyle } from "../command/e-command-shape-property-points-style";
import { ECommandShapePropertyPosition } from "../command/e-command-shape-property-position";
import { ECommandShapePropertyPositionAndRotate } from "../command/e-command-shape-property-position-and-rotation";
import { ECommandShapePropertyPositionX } from "../command/e-command-shape-property-position-x";
import { ECommandShapePropertyPositionY } from "../command/e-command-shape-property-position-y";
import { ECommandShapePropertyRadius } from "../command/e-command-shape-property-radius";
import { ECommandShapePropertyRotation } from "../command/e-command-shape-property-rotation";
import { ECommandShapePropertyShortcut } from "../command/e-command-shape-property-shortcut";
import { ECommandShapePropertySizeX } from "../command/e-command-shape-property-size-x";
import { ECommandShapePropertySizeY } from "../command/e-command-shape-property-size-y";
import { ECommandShapePropertySkew } from "../command/e-command-shape-property-skew";
import { ECommandShapePropertyStrokeAlign } from "../command/e-command-shape-property-stroke-align";
import { ECommandShapePropertyStrokeColor } from "../command/e-command-shape-property-stroke-color";
import { ECommandShapePropertyStrokeEnable } from "../command/e-command-shape-property-stroke-enable";
import { ECommandShapePropertyStrokeSideOff } from "../command/e-command-shape-property-stroke-side-off";
import { ECommandShapePropertyStrokeStyle } from "../command/e-command-shape-property-stroke-style";
import { ECommandShapePropertyStrokeWidth } from "../command/e-command-shape-property-stroke-width";
import { ECommandShapePropertyTextAlignHorizontal } from "../command/e-command-shape-property-text-align-horizontal";
import { ECommandShapePropertyTextAlignVertical } from "../command/e-command-shape-property-text-align-vertical";
import { ECommandShapePropertyTextClipping } from "../command/e-command-shape-property-text-clipping";
import { ECommandShapePropertyTextColor } from "../command/e-command-shape-property-text-color";
import { ECommandShapePropertyTextDirection } from "../command/e-command-shape-property-text-direction";
import { ECommandShapePropertyTextFamily } from "../command/e-command-shape-property-text-family";
import { ECommandShapePropertyTextOffsetHorizontal } from "../command/e-command-shape-property-text-offset-horizontal";
import { ECommandShapePropertyTextOffsetVertical } from "../command/e-command-shape-property-text-offset-vertical";
import { ECommandShapePropertyTextOutlineColor } from "../command/e-command-shape-property-text-outline-color";
import { ECommandShapePropertyTextOutlineEnable } from "../command/e-command-shape-property-text-outline-enable";
import { ECommandShapePropertyTextOutlineWidth } from "../command/e-command-shape-property-text-outline-width";
import { ECommandShapePropertyTextPaddingHorizontal } from "../command/e-command-shape-property-text-padding-horizontal";
import { ECommandShapePropertyTextPaddingVertical } from "../command/e-command-shape-property-text-padding-vertical";
import { ECommandShapePropertyTextSize } from "../command/e-command-shape-property-text-size";
import { ECommandShapePropertyTextSpacingHorizontal } from "../command/e-command-shape-property-text-spacing-horizontal";
import { ECommandShapePropertyTextSpacingVertical } from "../command/e-command-shape-property-text-spacing-vertical";
import { ECommandShapePropertyTextStyle } from "../command/e-command-shape-property-text-style";
import { ECommandShapePropertyTextValue } from "../command/e-command-shape-property-text-value";
import { ECommandShapePropertyTextWeight } from "../command/e-command-shape-property-text-weight";
import { ECommandShapePropertyTitle } from "../command/e-command-shape-property-title";
import { ECommandShapeReplace } from "../command/e-command-shape-replace";
import { ECommandShapeTreeSendBackward } from "../command/e-command-shape-tree-send-backward";
import { ECommandShapeTreeSendToBack } from "../command/e-command-shape-tree-send-to-back";
import { ECommandShapeDataValueAdd } from "../command/e-command-shape-data-value-add";
import { ECommandShapeDataValueBringForward } from "../command/e-command-shape-data-value-bring-forward";
import { ECommandShapeDataValueRemove } from "../command/e-command-shape-data-value-remove";
import { ECommandShapeDataValueReplace } from "../command/e-command-shape-data-value-replace";
import { ECommandShapeDataValueSendBackward } from "../command/e-command-shape-data-value-send-backward";
import { EToolSelectModifier, EToolSelectModifierOptions } from "./e-tool-select-modifier";
import { EToolSelectModifierContainer } from "./e-tool-select-modifier-container";
import { EToolSelectSelectionUpdatedPart } from "./e-tool-select-selection-updated-part";
import { ECommandShapeDataMappingValueAdd } from "../command/e-command-shape-data-mapping-value-add";
import { ECommandShapeDataMappingValueReplace } from "../command/e-command-shape-data-mapping-value-replace";
import { ECommandShapeDataMappingValueRemove } from "../command/e-command-shape-data-mapping-value-remove";
import { ECommandShapeDataMappingValueBringForward } from "../command/e-command-shape-data-mapping-value-bring-forward";
import { ECommandShapeDataMappingValueSendBackward } from "../command/e-command-shape-data-mapping-value-send-backward";
import { ECommandShapePropertyCapabilityLock } from "../command/e-command-shape-property-capability-lock";
import { ECommandShapePropertyCapabilityUnlock } from "../command/e-command-shape-property-capability-unlock";
import { ECommandShapePropertyPositionTop } from "../command/e-command-shape-property-position-top";
import { ECommandShapePropertyPositionLeft } from "../command/e-command-shape-property-position-left";
import { ECommandShapePropertyImageClear } from "../command/e-command-shape-property-image-clear";
import { ECommandShapePropertyCornerOn } from "../command/e-command-shape-property-corner-on";
import { ECommandShapePropertyStrokeSideOn } from "../command/e-command-shape-property-stroke-side-on";
import { ECommandShapeGroup } from "../command/e-command-shape-group";
import { ECommandShapeUngroup } from "../command/e-command-shape-ungroup";
import { ECommandShapePropertyTextSizeDelta } from "../command/e-command-shape-property-text-size-delta";
import { ECommandShapePropertyTextFitting } from "../command/e-command-shape-property-text-fitting";
import { UtilShapeTransforms } from "../util/util-shape-transforms";
import { UtilShapeConnectorTransforms } from "../util/util-shape-connector-transforms";
import { ECommandShapePropertyLineStyle } from "../command/e-command-shape-property-line-style";
import { UtilShapeDeleter } from "../util/util-shape-deleter";
import { UtilShapeSearch } from "../util/util-shape-search";
import { ECommandShapePropertyFillPercent } from "../command/e-command-shape-property-fill-percent";
import { ECommandShapePropertyFillDirection } from "../command/e-command-shape-property-fill-direction";

export type EToolSelectSelectionStored = EShape[];

const initLeft = (rect: Rectangle): number => {
	return rect.x;
};

const initCenter = (rect: Rectangle): number => {
	return rect.x + rect.width * 0.5;
};

const initRight = (rect: Rectangle): number => {
	return rect.x + rect.width;
};

const initTop = (rect: Rectangle): number => {
	return rect.y;
};

const initMiddle = (rect: Rectangle): number => {
	return rect.y + rect.height * 0.5;
};

const initBottom = (rect: Rectangle): number => {
	return rect.y + rect.height;
};

const initWidth = (rect: Rectangle): number => {
	return rect.width;
};

const initHeight = (rect: Rectangle): number => {
	return rect.height;
};

const initZero = (rect: Rectangle): number => {
	return 0;
};

const updateMin = (valueA: number, valueB: number): number => {
	return Math.min(valueA, valueB);
};

const updateMax = (valueA: number, valueB: number): number => {
	return Math.max(valueA, valueB);
};

const updateSum = (valueA: number, valueB: number): number => {
	return valueA + valueB;
};

const finishupIdentity = (value: number, size: number) => {
	return value;
};

const finishupAverage = (value: number, size: number) => {
	return value / size;
};

const assingX = (value: number, point: Point) => {
	point.x = value;
};

const assingY = (value: number, point: Point) => {
	point.y = value;
};

const applyLeft = (point: Point, diff: number, scale: IPoint, shape: EShape) => {
	shape.transform.position.x = point.x + diff / scale.x;
};

const applyCenter = (point: Point, diff: number, scale: IPoint, shape: EShape) => {
	shape.transform.position.x = point.x;
};

const applyRight = (point: Point, diff: number, scale: IPoint, shape: EShape) => {
	shape.transform.position.x = point.x - diff / scale.x;
};

const applyTop = (point: Point, diff: number, scale: IPoint, shape: EShape) => {
	shape.transform.position.y = point.y + diff / scale.y;
};

const applyMiddle = (point: Point, diff: number, scale: IPoint, shape: EShape) => {
	shape.transform.position.y = point.y;
};

const applyBottom = (point: Point, diff: number, scale: IPoint, shape: EShape) => {
	shape.transform.position.y = point.y - diff / scale.y;
};

export interface EToolSelectSelectionOptions {
	diagram: DDiagram | DDiagramEditor;
	modifier?: EToolSelectModifierOptions;
}

export class EToolSelectSelection extends utils.EventEmitter {
	protected _diagram: DDiagram | DDiagramEditor;
	protected _modifier: EToolSelectModifier;
	protected _modifierContainer: EToolSelectModifierContainer;
	protected _originGlobal: Point;
	protected _originLocal: Point;

	protected _rotationAxisGlobal: Point;

	protected _scale: Point;
	protected _scaleAxis0: Point;
	protected _scaleAxis1: Point;
	protected _scaleDet: number;
	protected _scaleDetInverse: number;
	protected _scaleTransform: Matrix;
	protected _scaleTransformInverse: Matrix;
	protected _scaleAnchor: ESnapperModifierAnchor;

	protected _shapes: EShape[];
	protected _shapeBound: Rectangle;
	protected _shapeBoundRect: Rectangle;

	protected _alignPoint: Point;
	protected _alignRectangle: Rectangle;

	protected _shiftPoint1: Point;
	protected _shiftPoint2: Point;

	protected _transform: Matrix;

	protected _translateDelta: Point;

	protected _isUpdated: boolean;
	protected _updatedParts: EToolSelectSelectionUpdatedPart;
	protected _lockCount: number;

	constructor(options: EToolSelectSelectionOptions) {
		super();

		const diagram = options.diagram;
		this._diagram = diagram;
		const modifier = new EToolSelectModifier(options.modifier);
		this._modifier = modifier;
		const modifierContainer = new EToolSelectModifierContainer();
		modifierContainer.addChild(modifier);
		diagram.on("unset", (canvas: DDiagramCanvas | DDiagramCanvasEditor): void => {
			if (modifierContainer.parent === canvas) {
				// Because after this event, a canvas is destroyed.
				// At that time, all its children also be destroyed.
				// The modifier container therefore should be removed.
				canvas.removeChild(modifierContainer);
			}
		});
		this._modifierContainer = modifierContainer;
		this._originGlobal = new Point();
		this._originLocal = new Point();

		this._rotationAxisGlobal = new Point();

		this._scale = new Point();
		this._scaleAxis0 = new Point();
		this._scaleAxis1 = new Point();
		this._scaleDet = 1;
		this._scaleDetInverse = 1;
		this._scaleTransform = new Matrix();
		this._scaleTransformInverse = new Matrix();
		this._scaleAnchor = ESnapperModifierAnchor.NONE;

		this._shapes = [];
		this._shapeBound = new Rectangle();
		this._shapeBoundRect = new Rectangle();

		this._alignPoint = new Point();
		this._alignRectangle = new Rectangle();

		this._shiftPoint1 = new Point();
		this._shiftPoint2 = new Point();

		this._transform = new Matrix();

		this._translateDelta = new Point();

		this._isUpdated = false;
		this._updatedParts = EToolSelectSelectionUpdatedPart.NONE;
		this._lockCount = 0;
	}

	lock(): void {
		this._lockCount += 1;
		if (this._lockCount === 1) {
			this._isUpdated = false;
			this._updatedParts = EToolSelectSelectionUpdatedPart.NONE;
		}
	}

	unlock(): void {
		this._lockCount -= 1;
		if (this._lockCount === 0) {
			if (this._isUpdated) {
				this.update(this._updatedParts);
			}
		}
	}

	update(): void;
	update(parts: EToolSelectSelectionUpdatedPart): void;
	update(...parts: Array<keyof typeof EToolSelectSelectionUpdatedPart>): void;
	update(
		parts?: EToolSelectSelectionUpdatedPart | keyof typeof EToolSelectSelectionUpdatedPart
	): void {
		let parsed = EToolSelectSelectionUpdatedPart.ALL;
		if (parts != null) {
			if (isNumber(parts)) {
				parsed = parts;
			} else {
				// eslint-disable-next-line prefer-rest-params
				parsed = this.toParts(arguments as any);
			}
		}
		if (this._lockCount <= 0) {
			this.updateModifier();
			this.emit("change", parsed, this);
		} else {
			this._isUpdated = true;
			this._updatedParts |= parsed;
		}
	}

	protected toParts(
		parts: Array<keyof typeof EToolSelectSelectionUpdatedPart>
	): EToolSelectSelectionUpdatedPart {
		if (isNumber(parts)) {
			return parts;
		}

		let result = EToolSelectSelectionUpdatedPart.NONE;
		for (let i = 0, imax = parts.length; i < imax; ++i) {
			result |= EToolSelectSelectionUpdatedPart[parts[i]];
		}
		return result;
	}

	updateModifier(): void {
		const diagram = this._diagram;
		const modifier = this._modifier;
		if (modifier.isAllowed()) {
			const shapes = this._shapes;
			const canvas = diagram.canvas;
			const modifierContainer = this._modifierContainer;
			if (canvas == null || shapes.length <= 0) {
				modifier.visible = false;
				DApplications.update(diagram);
			} else if (shapes.length <= 1) {
				const shape = shapes[0];

				if (shape.parent instanceof EShapeBase) {
					shape.updateTransform();
					const internalTransform = shape.transform.internalTransform;
					const a = internalTransform.a;
					const b = internalTransform.b;
					const c = internalTransform.c;
					const d = internalTransform.d;

					const pivot = shape.transform.pivot;
					const modifierPosition = modifier.position;
					modifierPosition.set(
						a * pivot.x + c * pivot.y + internalTransform.tx,
						b * pivot.x + d * pivot.y + internalTransform.ty
					);
					const layer = shape.root.parent;
					if (layer) {
						modifierContainer.transform.position.copyFrom(layer.transform.position);
					} else {
						modifierContainer.transform.position.set(0, 0);
					}

					const width = shape.size.x * Math.sqrt(a * a + b * b);
					const height = shape.size.y * Math.sqrt(c * c + d * d);
					modifier.width = width;
					modifier.height = height;
					modifier.pivot.set(width * 0.5, height * 0.5);

					const rx = Math.atan2(-c, d);
					const ry = Math.atan2(+b, a);
					const skew = (ry - rx) * 0.5;
					const rotation = (rx + ry) * 0.5;
					modifier.rotation = rotation;
					modifier.skew.set(skew, skew);
				} else {
					shape.updateTransform();
					const internalTransform = shape.transform.internalTransform;
					const a = internalTransform.a;
					const b = internalTransform.b;
					const c = internalTransform.c;
					const d = internalTransform.d;

					const pivot = shape.transform.pivot;
					const modifierPosition = modifier.position;
					modifierPosition.set(
						a * pivot.x + c * pivot.y + internalTransform.tx,
						b * pivot.x + d * pivot.y + internalTransform.ty
					);
					const layer = shape.root.parent;
					if (layer) {
						modifierContainer.transform.position.copyFrom(layer.transform.position);
					} else {
						modifierContainer.transform.position.set(0, 0);
					}

					modifier.width = shape.size.x;
					modifier.height = shape.size.y;
					modifier.pivot.set(shape.size.x * 0.5, shape.size.y * 0.5);

					modifier.rotation = shape.transform.rotation;
					modifier.skew.copyFrom(shape.transform.skew);
				}

				modifier.visible = true;
				modifier.group =
					EShapeCapabilities.contains(shape, EShapeCapability.CHILDREN) &&
					0 < shape.children.length;
				if (modifierContainer.parent !== canvas) {
					canvas.addChild(modifierContainer);
				}
				modifier.update();
				DApplications.update(diagram);
			} else {
				const bound = this._shapeBound;
				const tempRect = this._shapeBoundRect;
				shapes[0].getBoundsInternal(false, bound);
				for (let i = 1, imax = shapes.length; i < imax; ++i) {
					const shape = shapes[i];
					shape.getBoundsInternal(false, tempRect);
					bound.enlarge(tempRect);
				}
				const layer = shapes[0].root.parent;
				if (layer) {
					modifierContainer.transform.position.copyFrom(layer.transform.position);
				} else {
					modifierContainer.transform.position.set(0, 0);
				}

				modifier.position.set(bound.x, bound.y);
				modifier.width = bound.width;
				modifier.height = bound.height;
				modifier.rotation = 0;
				modifier.pivot.set(0, 0);
				modifier.skew.set(0, 0);
				modifier.visible = true;
				modifier.group = false;
				if (modifierContainer.parent !== canvas) {
					canvas.addChild(modifierContainer);
				}
				modifier.update();
				DApplications.update(diagram);
			}
		} else {
			modifier.visible = false;
			DApplications.update(diagram);
		}
	}

	toggle(shape: EShape): void {
		const shapes = this._shapes;
		if (shapes.length <= 0) {
			const root = shape.root;
			root.selected = true;
			shapes.push(root);
		} else {
			const first = shapes[0];
			if (UtilShapeSearch.isParent(shape, first)) {
				first.selected = false;
				if (EShapeCapabilities.contains(first, EShapeCapability.CHILDREN)) {
					const shapeOfParent = UtilShapeSearch.toOfParent(shape, first);
					shapeOfParent.selected = true;
					shapes[0] = shapeOfParent;
				} else {
					shapes.splice(0, 1);
				}
			} else if (first.parent === shape.parent) {
				if (!shape.selected) {
					shape.selected = true;
					shapes.push(shape);
				} else {
					shape.selected = false;
					shapes.splice(shapes.indexOf(shape), 1);
				}
			} else {
				const sharedParent = UtilShapeSearch.toSharedParent(first, shape);
				if (first.parent === sharedParent) {
					const shapeOfParent = UtilShapeSearch.toOfParent(shape, sharedParent);
					if (shapeOfParent.selected) {
						shapeOfParent.selected = false;
						shapes.splice(shapes.indexOf(shapeOfParent), 1);
					} else {
						shapeOfParent.selected = true;
						shapes.push(shapeOfParent);
					}
				} else {
					let newLength = 0;
					for (let i = 0, imax = shapes.length; i < imax; ++i) {
						const oldShape = shapes[i];
						oldShape.selected = false;
						const newShape = UtilShapeSearch.toOfParent(oldShape, sharedParent);
						if (!newShape.selected) {
							newShape.selected = true;
							shapes[newLength] = newShape;
							newLength += 1;
						}
					}
					shapes.length = newLength;

					const shapeOfParent = UtilShapeSearch.toOfParent(shape, sharedParent);
					if (!shapeOfParent.selected) {
						shapeOfParent.selected = true;
						shapes.push(shapeOfParent);
					}
				}
			}
		}
		this.update(EToolSelectSelectionUpdatedPart.SELECTION);
	}

	/**
	 * Please note that the specified targets must be root shapes.
	 *
	 * @param targets root shapes to be added
	 */
	addAll(targets: EShape[]): boolean {
		const shapes = this._shapes;
		let isChanged = false;

		// Convert to root shapes
		if (0 < shapes.length) {
			const first = shapes[0];
			if (first.root !== first) {
				const oldShapes = shapes.slice(0);
				shapes.length = 0;
				for (let i = 0, imax = oldShapes.length; i < imax; ++i) {
					const oldShape = oldShapes[i];
					oldShape.selected = false;
					const oldShapeRoot = oldShape.root;
					if (!oldShapeRoot.selected) {
						oldShapeRoot.selected = true;
						shapes.push(oldShapeRoot);
					}
				}
				isChanged = true;
			}
		}

		// Add targets
		for (let i = 0, imax = targets.length; i < imax; ++i) {
			const target = targets[i];
			if (!target.selected) {
				target.selected = true;
				shapes.push(target);
				isChanged = true;
			}
		}

		if (isChanged) {
			this.update(EToolSelectSelectionUpdatedPart.SELECTION);
		}
		return isChanged;
	}

	clearAndAddAll(targets: EShape[]): boolean {
		const shapes = this._shapes;
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			shapes[i].selected = false;
		}
		shapes.length = 0;

		for (let i = 0, imax = targets.length; i < imax; ++i) {
			const target = targets[i];
			target.selected = true;
			shapes.push(target);
		}

		this.update(EToolSelectSelectionUpdatedPart.SELECTION);
		return true;
	}

	set(target: EShape): boolean {
		const shapes = this._shapes;
		if (1 < shapes.length) {
			for (let i = 0, imax = shapes.length; i < imax; ++i) {
				shapes[i].selected = false;
			}
			shapes.length = 0;
			target.selected = true;
			shapes.push(target);
			this.update(EToolSelectSelectionUpdatedPart.SELECTION);
			return true;
		} else if (shapes.length === 1) {
			if (shapes[0] === target) {
				return false;
			} else {
				shapes[0].selected = false;
				target.selected = true;
				shapes[0] = target;
				this.update(EToolSelectSelectionUpdatedPart.SELECTION);
				return true;
			}
		} else {
			target.selected = true;
			shapes.push(target);
			this.update(EToolSelectSelectionUpdatedPart.SELECTION);
			return true;
		}
	}

	get(): EShape[] {
		return this._shapes;
	}

	first(): EShape | null {
		const shapes = this._shapes;
		return 0 < shapes.length ? shapes[0] : null;
	}

	last(): EShape | null {
		const shapes = this._shapes;
		return 0 < shapes.length ? shapes[shapes.length - 1] : null;
	}

	swapLast(expectedLast: EShape, newLast: EShape): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			const last = shapes[shapes.length - 1];
			if (last === expectedLast) {
				last.selected = false;
				shapes[shapes.length - 1] = newLast;
				newLast.selected = true;
				this.update(
					EToolSelectSelectionUpdatedPart.TREE | EToolSelectSelectionUpdatedPart.SELECTION
				);
			}
		}
	}

	remove(target: EShape): void {
		const shapes = this._shapes;
		const index = shapes.indexOf(target);
		if (0 <= index) {
			target.selected = false;
			shapes.splice(index, 1);
			this.update(
				EToolSelectSelectionUpdatedPart.TREE | EToolSelectSelectionUpdatedPart.SELECTION
			);
		}
	}

	contains(shape: EShape): boolean {
		return shape.selected;
	}

	size(): number {
		return this._shapes.length;
	}

	isEmpty(): boolean {
		return this._shapes.length <= 0;
	}

	clear(): boolean {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			for (let i = 0, imax = shapes.length; i < imax; ++i) {
				shapes[i].selected = false;
			}
			this._shapes.length = 0;
			this.update(EToolSelectSelectionUpdatedPart.SELECTION);
			return true;
		}
		return false;
	}

	focus(): boolean {
		if (this.isEmpty()) {
			return false;
		}

		// Canvas
		const diagram = this._diagram;
		const canvas = diagram.canvas;
		if (canvas == null) {
			return false;
		}

		// Canvas parent
		const cparent = canvas.parent;
		if (!(cparent instanceof DBase)) {
			return false;
		}

		// Center
		const cw = canvas.width;
		const ch = canvas.height;
		const p = cparent.padding;
		const pl = p.getLeft();
		const pt = p.getTop();
		const pr = p.getRight();
		const pb = p.getBottom();
		const sw = Math.max(0, cparent.width - pl - pr);
		const sh = Math.max(0, cparent.height - pt - pb);
		const cx = pl + (sw - cw) * 0.5;
		const cy = pt + (sh - ch) * 0.5;

		// Offset
		const modifier = this._modifier;
		const point = this._alignPoint;
		point.set(modifier.width * 0.5, modifier.height * 0.5);
		modifier.toGlobal(point, point, false);
		cparent.toLocal(point, undefined, point, false);
		const cposition = canvas.position;
		const ox = cw * 0.5 - (point.x - cposition.x);
		const oy = ch * 0.5 - (point.y - cposition.y);

		// Move
		diagram.view.moveTo(cx + ox, cy + oy);
		return true;
	}

	protected prepare(): boolean {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			for (let i = 0, imax = shapes.length; i < imax; ++i) {
				const shape = shapes[i];
				if (shape instanceof EShapeConnectorLine) {
					UtilShapeConnectorTransforms.prepare(shape);
				} else {
					UtilShapeTransforms.prepare(shape);
				}
			}

			return true;
		}
		return false;
	}

	prepareTranslateSnap(): void {
		const diagram = this._diagram;
		if (diagram instanceof DDiagramEditor) {
			diagram.snapper.prepareForTranslate(this._modifier);
		}
	}

	prepareRotateSnap(): void {
		const diagram = this._diagram;
		if (diagram instanceof DDiagramEditor) {
			diagram.snapper.prepareForRotate(this._modifier);
		}
	}

	prepareScaleSnap(): void {
		const diagram = this._diagram;
		if (diagram instanceof DDiagramEditor) {
			diagram.snapper.prepareForScale(this._modifier, this._scaleAnchor);
		}
	}

	prepareTranslate(): boolean {
		return this.prepare();
	}

	prepareRotate(global?: Point): boolean {
		if (this.prepare()) {
			// Origin
			const originGlobal = this._originGlobal;
			const originLocal = this._originLocal;
			const modifier = this._modifier;
			originLocal.set(modifier.width * 0.5, modifier.height * 0.5);
			originGlobal.copyFrom(originLocal);
			modifier.updateTransform();
			modifier.transform.localTransform.apply(originLocal, originLocal);
			modifier.transform.worldTransform.apply(originGlobal, originGlobal);

			// Axis
			if (global == null) {
				return true;
			} else {
				const rotationAxisGlobal = this._rotationAxisGlobal;
				const vx = global.x - originGlobal.x;
				const vy = global.y - originGlobal.y;
				const v = Math.sqrt(vx * vx + vy * vy);
				if (0.001 < v) {
					const vi = 1 / v;
					rotationAxisGlobal.set(vx * vi, vy * vi);
					return true;
				} else {
					this.finalize();
					return false;
				}
			}
		}
		return false;
	}

	prepareScale(anchor: ESnapperModifierAnchor): boolean {
		if (this.prepare()) {
			if (this.prepareScaleOriginAndAxes(anchor)) {
				const modifier = this._modifier;
				const rotation = modifier.rotation;
				const skew = modifier.skew;
				const originLocal = this._originLocal;
				const scaleTransform = this._scaleTransform;
				scaleTransform.setTransform(0, 0, 0, 0, 1, 1, rotation, skew.x, skew.y).invert();
				scaleTransform.apply(originLocal, originLocal);
				scaleTransform.translate(-originLocal.x, -originLocal.y);
				scaleTransform.copyTo(this._scaleTransformInverse).invert();
				return true;
			} else {
				this.finalize();
				return false;
			}
		}
		return false;
	}

	protected prepareScaleOriginAndAxes(anchor: ESnapperModifierAnchor): boolean {
		const modifier = this._modifier;
		modifier.updateTransform();
		const localTransform = modifier.transform.localTransform;
		const worldTransform = modifier.transform.worldTransform;

		const width = modifier.width;
		const height = modifier.height;
		const originGlobal = this._originGlobal;
		const originLocal = this._originLocal;
		this._scaleAnchor = anchor;
		switch (anchor) {
			case ESnapperModifierAnchor.TOP_LEFT:
				originLocal.set(width, height);
				originGlobal.copyFrom(originLocal);
				localTransform.apply(originLocal, originLocal);
				worldTransform.apply(originGlobal, originGlobal);
				return this.prepareScaleAxes(0, height, width, 0, originGlobal);
			case ESnapperModifierAnchor.TOP_CENTER:
				originLocal.set(width * 0.5, height);
				originGlobal.copyFrom(originLocal);
				localTransform.apply(originLocal, originLocal);
				worldTransform.apply(originGlobal, originGlobal);
				return this.prepareScaleAxis(width * 0.5, 0, originGlobal);
			case ESnapperModifierAnchor.TOP_RIGHT:
				originLocal.set(0, height);
				originGlobal.copyFrom(originLocal);
				localTransform.apply(originLocal, originLocal);
				worldTransform.apply(originGlobal, originGlobal);
				return this.prepareScaleAxes(width, height, 0, 0, originGlobal);
			case ESnapperModifierAnchor.MIDDLE_LEFT:
				originLocal.set(width, height * 0.5);
				originGlobal.copyFrom(originLocal);
				localTransform.apply(originLocal, originLocal);
				worldTransform.apply(originGlobal, originGlobal);
				return this.prepareScaleAxis(0, height * 0.5, originGlobal);
			case ESnapperModifierAnchor.NONE:
				originLocal.set(width * 0.5, height * 0.5);
				originGlobal.copyFrom(originLocal);
				localTransform.apply(originLocal, originLocal);
				worldTransform.apply(originGlobal, originGlobal);
				if (0.001 < Math.abs(width)) {
					this._scaleAxis0.x = width;
				} else {
					return false;
				}
				if (0.001 < Math.abs(height)) {
					this._scaleAxis0.y = height;
				} else {
					return false;
				}
				return true;
			case ESnapperModifierAnchor.MIDDLE_RIGHT:
				originLocal.set(0, height * 0.5);
				originGlobal.copyFrom(originLocal);
				localTransform.apply(originLocal, originLocal);
				worldTransform.apply(originGlobal, originGlobal);
				return this.prepareScaleAxis(width, height * 0.5, originGlobal);
			case ESnapperModifierAnchor.BOTTOM_LEFT:
				originLocal.set(width, 0);
				originGlobal.copyFrom(originLocal);
				localTransform.apply(originLocal, originLocal);
				worldTransform.apply(originGlobal, originGlobal);
				return this.prepareScaleAxes(0, 0, width, height, originGlobal);
			case ESnapperModifierAnchor.BOTTOM_CENTER:
				originLocal.set(width * 0.5, 0);
				originGlobal.copyFrom(originLocal);
				localTransform.apply(originLocal, originLocal);
				worldTransform.apply(originGlobal, originGlobal);
				return this.prepareScaleAxis(width * 0.5, height, originGlobal);
			case ESnapperModifierAnchor.BOTTOM_RIGHT:
				originLocal.set(0, 0);
				originGlobal.copyFrom(originLocal);
				localTransform.apply(originLocal, originLocal);
				worldTransform.apply(originGlobal, originGlobal);
				return this.prepareScaleAxes(width, 0, 0, height, originGlobal);
		}
		return false;
	}

	protected prepareScaleAxis(x: number, y: number, origin: Point): boolean {
		const axis = this._scaleAxis0;
		axis.set(x, y);
		this._modifier.toGlobal(axis, axis, true);
		axis.x -= origin.x;
		axis.y -= origin.y;
		const v = Math.sqrt(axis.x * axis.x + axis.y * axis.y);
		if (0.001 < v) {
			const vi = 1 / v;
			axis.x *= vi;
			axis.y *= vi;
			this._scaleDet = v;
			this._scaleDetInverse = vi;
			return true;
		}
		return false;
	}

	protected prepareScaleAxes(
		x0: number,
		y0: number,
		x1: number,
		y1: number,
		originGlobal: Point
	): boolean {
		const modifier = this._modifier;
		const worldTransform = modifier.transform.worldTransform;

		// v0
		const axis0 = this._scaleAxis0;
		axis0.set(x0, y0);
		worldTransform.apply(axis0, axis0);
		axis0.x -= originGlobal.x;
		axis0.y -= originGlobal.y;

		// v1
		const axis1 = this._scaleAxis1;
		axis1.set(x1, y1);
		worldTransform.apply(axis1, axis1);
		axis1.x -= originGlobal.x;
		axis1.y -= originGlobal.y;

		const det = axis0.x * axis1.y - axis0.y * axis1.x;
		if (0.001 < Math.abs(det)) {
			this._scaleDet = det;
			this._scaleDetInverse = 1 / det;
			return true;
		}
		return false;
	}

	finalize(): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			for (let i = 0, imax = shapes.length; i < imax; ++i) {
				const shape = shapes[i];
				if (shape instanceof EShapeConnectorLine) {
					UtilShapeConnectorTransforms.finalize(shape);
				} else {
					UtilShapeTransforms.finalize(shape);
				}
			}
		}
	}

	saveForTranslate(): void {
		DControllers.getCommandController().push(new ECommandShapePropertyPosition(this));
	}

	saveForRotate(): void {
		DControllers.getCommandController().push(new ECommandShapePropertyPositionAndRotate(this));
	}

	saveForScale(): void {
		DControllers.getCommandController().push(new ECommandShapePropertyAll(this));
	}

	alignLeft(): void {
		this.align(initLeft, initWidth, updateMin, finishupIdentity, assingX, applyLeft);
	}

	alignCenter(): void {
		this.align(initCenter, initZero, updateSum, finishupAverage, assingX, applyCenter);
	}

	alignRight(): void {
		this.align(initRight, initWidth, updateMax, finishupIdentity, assingX, applyRight);
	}

	alignTop(): void {
		this.align(initTop, initHeight, updateMin, finishupIdentity, assingY, applyTop);
	}

	alignMiddle(): void {
		this.align(initMiddle, initZero, updateSum, finishupAverage, assingY, applyMiddle);
	}

	alignBottom(): void {
		this.align(initBottom, initHeight, updateMax, finishupIdentity, assingY, applyBottom);
	}

	align(
		init: (rect: Rectangle) => number,
		initSpace: (rect: Rectangle) => number,
		update: (valueA: number, valueB: number) => number,
		finishup: (value: number, size: number) => number,
		assing: (value: number, point: Point) => void,
		apply: (point: Point, diff: number, scale: IPoint, shape: EShape) => void
	): void {
		const diagram = this._diagram;
		const canvas = diagram.canvas;
		const shapes = this._shapes;
		const shapesLength = shapes.length;
		if (canvas && 1 <= shapesLength) {
			const parent = shapes[0].parent;
			if (parent) {
				const point = this._alignPoint;
				const rectangle = this._alignRectangle;

				let isFirst = true;
				let value: number = 0;
				const data: Array<[number, EShape]> = [];
				for (let i = 0; i < shapesLength; ++i) {
					const shape = shapes[i];
					if (EShapeCapabilities.contains(shape, EShapeCapability.POSITION)) {
						shape.getBounds(false, rectangle);
						if (isFirst) {
							isFirst = false;
							value = init(rectangle);
						} else {
							value = update(value, init(rectangle));
						}
						data.push([initSpace(rectangle), shape]);
					}
				}

				const dataLength = data.length;
				if (1 <= dataLength) {
					if (dataLength <= 1) {
						value = init(canvas.getBounds(false, rectangle));
					}
					value = finishup(value, dataLength);
					point.set(0, 0);
					assing(value, point);
					parent.toLocal(point, undefined, point);

					const scale = canvas.scale;
					for (let i = 0; i < dataLength; ++i) {
						const datum = data[i];
						apply(point, datum[0] * 0.5, scale, datum[1]);
					}
					this.update(EToolSelectSelectionUpdatedPart.PROPERTY);
				}
			}
		}
	}

	distributeHorizontally(): void {
		this.distribute(initCenter, initWidth, assingX, applyLeft);
	}

	distributeVertically(): void {
		this.distribute(initMiddle, initHeight, assingY, applyTop);
	}

	distribute(
		init: (rectangle: Rectangle) => number,
		initSpace: (rectangle: Rectangle) => number,
		assing: (value: number, point: Point) => void,
		apply: (point: Point, diff: number, scale: IPoint, shape: EShape) => void
	): void {
		const diagram = this._diagram;
		const canvas = diagram.canvas;
		const shapes = this._shapes;
		const shapesLength = shapes.length;
		if (canvas && 1 <= shapesLength) {
			const parent = shapes[0].parent;
			if (parent) {
				const point = this._alignPoint;
				const rectangle = this._alignRectangle;

				let spaceTotal = 0;
				const data: Array<[number, number, EShape]> = [];
				for (let i = 0; i < shapesLength; ++i) {
					const shape = shapes[i];
					if (EShapeCapabilities.contains(shape, EShapeCapability.POSITION)) {
						shape.getBounds(false, rectangle);
						const space = initSpace(rectangle);
						spaceTotal += space;
						data.push([init(rectangle), space, shape]);
					}
				}

				const dataLength = data.length;
				if (2 < dataLength) {
					data.sort((a: [number, number, EShape], b: [number, number, EShape]) => {
						return a[0] - b[0];
					});

					const first = data[0];
					const last = data[dataLength - 1];
					const spaceLeft =
						last[0] - first[0] - (spaceTotal - last[1] * 0.5 - first[1] * 0.5);
					const margin = spaceLeft / (dataLength - 1);

					point.set(0, 0);
					assing(first[0], point);
					parent.toLocal(point, undefined, point);

					let diff = first[1] * 0.5 + margin;
					const scale = canvas.scale;
					for (let i = 1, imax = dataLength - 1; i < imax; ++i) {
						const datum = data[i];
						const shape = datum[2];
						diff += datum[1] * 0.5;
						apply(point, diff, scale, shape);
						diff += datum[1] * 0.5 + margin;
					}

					this.update(EToolSelectSelectionUpdatedPart.PROPERTY);
				} else if (dataLength === 1) {
					point.set(0, 0);
					assing(init(canvas.getBounds(false, rectangle)), point);
					parent.toLocal(point, undefined, point);

					const datum = data[0];
					apply(point, 0, canvas.scale, datum[2]);

					this.update(EToolSelectSelectionUpdatedPart.PROPERTY);
				}
			}
		}
	}

	replace(shapeFactory: (existing: EShape) => EShape | null): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			const parent = shapes[0].parent;
			if (parent) {
				DControllers.getCommandController().push(
					new ECommandShapeReplace(parent, shapeFactory, this)
				);
			}
		}
	}

	group(): void {
		const shapes = this._shapes;
		if (2 <= shapes.length) {
			const parent = shapes[0].parent;
			if (parent) {
				DControllers.getCommandController().push(new ECommandShapeGroup(parent, this));
			}
		}
	}

	protected hasUngroupable(shapes: EShape[]): boolean {
		for (let i = shapes.length - 1; 0 <= i; --i) {
			if (this.isUngroupable(shapes[i])) {
				return true;
			}
		}
		return false;
	}

	protected isUngroupable(shape: EShape): boolean {
		return (
			shape instanceof EShapeGroup &&
			EShapeCapabilities.contains(shape, EShapeCapability.CHILDREN) &&
			EShapeCapabilities.contains(shape, EShapeCapability.UNGROUPING)
		);
	}

	ungroup(): void {
		const shapes = this._shapes;
		if (this.hasUngroupable(shapes)) {
			const parent = shapes[0].parent;
			if (parent) {
				DControllers.getCommandController().push(new ECommandShapeUngroup(parent, this));
			}
		}
	}

	setFill(color: number, alpha: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyFillColor(this, [color, alpha])
			);
		}
	}

	setFillEnabled(enable: boolean): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyFillEnable(this, enable)
			);
		}
	}

	setFillPercent(percent: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyFillPercent(this, percent)
			);
		}
	}

	setFillDirection(direction: EShapeFillDirection): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyFillDirection(this, direction)
			);
		}
	}

	setStroke(color: number, alpha: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyStrokeColor(this, [color, alpha])
			);
		}
	}

	setStrokeWidth(width: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyStrokeWidth(this, width)
			);
		}
	}

	setStrokeAlign(align: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyStrokeAlign(this, align)
			);
		}
	}

	setStrokeSide(side: number, isOn: boolean): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			if (isOn) {
				DControllers.getCommandController().push(
					new ECommandShapePropertyStrokeSideOn(this, side)
				);
			} else {
				DControllers.getCommandController().push(
					new ECommandShapePropertyStrokeSideOff(this, side)
				);
			}
		}
	}

	setStrokeStyle(add: EShapeStrokeStyle, remove: EShapeStrokeStyle): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyStrokeStyle(this, add, remove)
			);
		}
	}

	setStrokeEnabled(enable: boolean): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyStrokeEnable(this, enable)
			);
		}
	}

	setLineStyle(add: EShapeStrokeStyle, remove: EShapeStrokeStyle): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyLineStyle(this, add, remove)
			);
		}
	}

	setLineTailType(type: EShapePointsMarkerType): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyLineTailType(this, type)
			);
		}
	}

	setLineTailSizeX(size: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyLineTailSizeX(this, size)
			);
		}
	}

	setLineTailSizeY(size: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyLineTailSizeY(this, size)
			);
		}
	}

	setLineTailColor(color: number, alpha: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyLineTailColor(this, [color, alpha])
			);
		}
	}

	setLineTailMargin(margin: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyLineTailMargin(this, margin)
			);
		}
	}

	setLineHeadType(type: EShapePointsMarkerType): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyLineHeadType(this, type)
			);
		}
	}

	setLineHeadSizeX(size: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyLineHeadSizeX(this, size)
			);
		}
	}

	setLineHeadSizeY(size: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyLineHeadSizeY(this, size)
			);
		}
	}

	setLineHeadColor(color: number, alpha: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyLineHeadColor(this, [color, alpha])
			);
		}
	}

	setLineHeadMargin(margin: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyLineHeadMargin(this, margin)
			);
		}
	}

	setPointsStyle(add: EShapePointsStyle, remove: EShapePointsStyle): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyPointsStyle(this, add, remove)
			);
		}
	}

	setText(text: string): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyTextValue(this, text)
			);
		}
	}

	setTextColor(color: number, alpha: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyTextColor(this, [color, alpha])
			);
		}
	}

	setTextFamily(family: string): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyTextFamily(this, family)
			);
		}
	}

	setTextSize(size: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(new ECommandShapePropertyTextSize(this, size));
		}
	}

	setTextSizeDelta(delta: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyTextSizeDelta(this, delta)
			);
		}
	}

	setTextWeight(weight: EShapeTextWeight): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyTextWeight(this, weight)
			);
		}
	}

	setTextStyle(style: EShapeTextStyle): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyTextStyle(this, style)
			);
		}
	}

	setTextAlignHorizontal(align: EShapeTextAlignHorizontal): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyTextAlignHorizontal(this, align)
			);
		}
	}

	setTextAlignVertical(align: EShapeTextAlignVertical): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyTextAlignVertical(this, align)
			);
		}
	}

	setTextPaddingHorizontal(padding: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyTextPaddingHorizontal(this, padding)
			);
		}
	}

	setTextPaddingVertical(padding: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyTextPaddingVertical(this, padding)
			);
		}
	}

	setTextOffsetHorizontal(offset: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyTextOffsetHorizontal(this, offset)
			);
		}
	}

	setTextOffsetVertical(offset: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyTextOffsetVertical(this, offset)
			);
		}
	}

	setTextOutlineColor(color: number, alpha: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyTextOutlineColor(this, [color, alpha])
			);
		}
	}

	setTextOutlineWidth(width: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyTextOutlineWidth(this, width)
			);
		}
	}

	setTextOutlineEnabled(enable: boolean): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyTextOutlineEnable(this, enable)
			);
		}
	}

	setTextClipping(clipping: boolean): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyTextClipping(this, clipping)
			);
		}
	}

	setTextFitting(fitting: boolean): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyTextFitting(this, fitting)
			);
		}
	}

	setTextSpacingHorizontal(spacing: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyTextSpacingHorizontal(this, spacing)
			);
		}
	}

	setTextSpacingVertical(spacing: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyTextSpacingVertical(this, spacing)
			);
		}
	}

	setTextDirection(direction: EShapeTextDirection): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyTextDirection(this, direction)
			);
		}
	}

	setInteractive(interactive: boolean): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyInteractive(this, interactive)
			);
		}
	}

	setFocusable(isFocusable: boolean): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyFocusable(this, isFocusable)
			);
		}
	}

	setShortcut(shortcut: string | undefined): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyShortcut(this, shortcut)
			);
		}
	}

	setTitle(title: string | undefined): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(new ECommandShapePropertyTitle(this, title));
		}
	}

	setCursor(cursor: string | undefined): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(new ECommandShapePropertyCursor(this, cursor));
		}
	}

	setRadius(radius: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(new ECommandShapePropertyRadius(this, radius));
		}
	}

	setCorner(corner: EShapeCorner, isOn: boolean): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			if (isOn) {
				DControllers.getCommandController().push(
					new ECommandShapePropertyCornerOn(this, corner)
				);
			} else {
				DControllers.getCommandController().push(
					new ECommandShapePropertyCornerOff(this, corner)
				);
			}
		}
	}

	setImage(image: EShapeImageLike): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyImage(this, image, undefined)
			);
		}
	}

	setGradient(image: EShapeImageLike, gradient: EShapeGradientLike): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyImage(this, image, gradient)
			);
		}
	}

	fitToImage(): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(new ECommandShapePropertyImageFitTo(this));
		}
	}

	clearImage(): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(new ECommandShapePropertyImageClear(this));
		}
	}

	bringToFront(): boolean {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			const parent = shapes[0].parent;
			if (parent) {
				const children = parent.children;

				// Update indices
				const offset = children.length;
				const indices: number[] = [];
				for (let i = offset - 1; 0 <= i; --i) {
					const child = children[i];
					if (child.selected) {
						child.index = offset + i;
						indices.push(i);
					} else {
						child.index = i;
					}
				}

				// Sort
				children.sort(UtilShapeSearch.COMPARATOR_INDEX);

				//
				let isChanged = false;
				for (let i = 0, imax = indices.length; i < imax; ++i) {
					if (offset - 1 - i !== indices[i]) {
						isChanged = true;
					}
				}

				//
				if (isChanged) {
					parent.toDirty();
					DControllers.getCommandController().push(
						new ECommandShapeTreeBringToFront(indices, parent, this)
					);
					this.update(EToolSelectSelectionUpdatedPart.TREE);
				}
				return true;
			}
		}
		return false;
	}

	bringForward(): boolean {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			const parent = shapes[0].parent;
			if (parent) {
				let isChanged = false;
				const children = parent.children;

				const indices: number[] = [];
				let previous = null;
				for (let i = children.length - 1; 0 <= i; --i) {
					const child = children[i];
					if (child.selected) {
						if (previous) {
							children[i] = children[i + 1];
							children[i + 1] = child;
							indices.push(i);
							isChanged = true;
						}
					} else {
						previous = child;
					}
				}

				if (isChanged) {
					parent.toDirty();
					DControllers.getCommandController().push(
						new ECommandShapeTreeBringForward(indices, parent, this)
					);
					this.update(EToolSelectSelectionUpdatedPart.TREE);
				}
				return isChanged;
			}
		}
		return false;
	}

	sendBackward(): boolean {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			const parent = shapes[0].parent;
			if (parent) {
				let isChanged = false;
				const children = parent.children;

				const indices: number[] = [];
				let previous = null;
				for (let i = 0, imax = children.length; i < imax; ++i) {
					const child = children[i];
					if (child.selected) {
						if (previous) {
							children[i] = children[i - 1];
							children[i - 1] = child;
							indices.push(i);
							isChanged = true;
						}
					} else {
						previous = child;
					}
				}

				if (isChanged) {
					parent.toDirty();
					DControllers.getCommandController().push(
						new ECommandShapeTreeSendBackward(indices, parent, this)
					);
					this.update(EToolSelectSelectionUpdatedPart.TREE);
				}
				return isChanged;
			}
		}
		return false;
	}

	sendToBack(): boolean {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			const parent = shapes[0].parent;
			if (parent) {
				const children = parent.children;

				// Update indices
				const indices: number[] = [];
				const offset = children.length;
				for (let i = 0; i < offset; ++i) {
					const child = children[i];
					if (child.selected) {
						child.index = i - offset;
						indices.push(i);
					} else {
						child.index = i;
					}
				}

				// Sort
				children.sort(UtilShapeSearch.COMPARATOR_INDEX);

				//
				let isChanged = false;
				for (let i = 0; i < indices.length; ++i) {
					if (i !== indices[i]) {
						isChanged = true;
					}
				}

				//
				if (isChanged) {
					parent.toDirty();
					DControllers.getCommandController().push(
						new ECommandShapeTreeSendToBack(indices, parent, this)
					);
					this.update(EToolSelectSelectionUpdatedPart.TREE);
				}
				return true;
			}
		}
		return false;
	}

	serialize(): string | null {
		const diagram = this._diagram;
		const canvas = diagram.canvas;
		if (canvas == null) {
			return null;
		}

		// Update UUID
		const manager = new EShapeResourceManagerSerialization();
		const shapes = this._shapes;
		const shapesLength = shapes.length;
		if (0 < shapesLength) {
			const root = shapes[0].root;
			if (root != null) {
				const layer = root.parent;
				if (layer instanceof DDiagramLayer) {
					layer.addUuid(manager);
					layer.updateUuid(manager);
				}
			}
		}

		// Shape set
		const shapeSet = new Set<EShape | null>();
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			shapeSet.add(shapes[i]);
		}

		// Serialize selected shapes
		const items: DDiagramSerializedItem[] = [];
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			const item = shape.serialize(manager);
			item[16] = 0;
			if (shape instanceof EShapeConnectorLine) {
				let item29 = item[29];
				if (item29 & EShapeCapability.LINE_TAIL) {
					if (!shapeSet.has(shape.edge.tail.acceptor.shape)) {
						item29 &= ~EShapeCapability.LINE_TAIL;
					}
				}
				if (item29 & EShapeCapability.LINE_HEAD) {
					if (!shapeSet.has(shape.edge.head.acceptor.shape)) {
						item29 &= ~EShapeCapability.LINE_HEAD;
					}
				}
				item[29] = item29;
			}
			items.push(item);
		}

		// Done
		const serialized: DDiagramSerialized = {
			version: DDiagramSerializedVersion,
			name: canvas.name,
			label: canvas.label,
			width: canvas.width,
			height: canvas.height,
			summary: canvas.summary,
			description: canvas.description,
			resources: manager.resources,
			data: manager.data,
			pieces: manager.pieces,
			items,
			layers: [
				[
					diagram instanceof DDiagramEditor
						? diagram.theme.getBaseLayerLabel()
						: "Base Layer"
				]
			]
		};
		return JSON.stringify(serialized);
	}

	deserialize(data: string): void {
		const diagram = this._diagram;
		const layer = diagram.layer;
		if (layer != null) {
			const parsed = DDiagrams.parse(data);
			if (parsed != null) {
				DDiagrams.toPieceData(
					diagram.controller,
					parsed.pieces,
					EShapeResourceManagerDeserializationMode.EDITOR
				).then((pieceData): void => {
					this.deserialize_(layer, parsed, pieceData);
				});
			}
		}
	}

	protected deserialize_(
		layer: DDiagramLayer,
		parsed: DDiagramSerialized,
		pieceData?: Map<string, EShapeEmbeddedDatum | null>
	): void {
		const manager = new EShapeResourceManagerDeserialization(
			parsed,
			parsed.pieces,
			pieceData,
			EShapeResourceManagerDeserializationMode.EDITOR,
			0
		);
		const shapePromise = deserializeAll(parsed.items, manager);
		if (shapePromise) {
			shapePromise.then((shapes: EShape[]): void => {
				const shift = this.calcShift(shapes, layer);

				const shapesLength = shapes.length;
				const layerChildren = layer.children;
				for (let i = 0; i < shapesLength; ++i) {
					const shape = shapes[i];
					shape.parent = layer;
					shape.uploaded = undefined;
					layerChildren.push(shape);
				}
				layer.onChildTransformChange();
				layer.toDirty();
				for (let i = 0; i < shapesLength; ++i) {
					shapes[i].onAttach();
				}

				this.shift(shapes, shift);

				DControllers.getCommandController().push(
					new ECommandShapeCreate(shapes, layer, this, true)
				);
			});
		}
	}

	private calcShift(shapes: EShape[], parent: EShapeContainer): IPoint | null {
		if (shapes.length <= 0) {
			return null;
		}

		const work1 = this._shiftPoint1;
		const work2 = this._shiftPoint2;

		const first = shapes[0];
		first.updateTransform();
		const firstTransform = first.transform;
		work1.copyFrom(firstTransform.pivot);
		firstTransform.worldTransform.apply(work1, work1);
		parent.transform.worldTransform.apply(work1, work1);
		const gx = work1.x;
		const gy = work1.y;

		let delta = 0;
		while (true) {
			work1.set(gx + delta, gy + delta);
			const found = parent.hitTestBBox(work1, (target: EShape): boolean => {
				if (target.type === first.type) {
					target.updateTransform();
					const targetTransform = target.transform;
					work2.copyFrom(targetTransform.pivot);
					targetTransform.worldTransform.apply(work2, work2);
					const dx = work2.x - (gx + delta);
					const dy = work2.y - (gy + delta);
					return Math.abs(dx) <= 0.1 && Math.abs(dy) <= 0.1;
				}
				return false;
			});
			if (found == null) {
				work1.set(gx + delta, gy + delta);
				parent.toLocal(work1, undefined, work1);
				work2.set(work1.x - firstTransform.position.x, work1.y - firstTransform.position.y);
				return work2;
			}
			delta += 10;
		}
	}

	private shift(shapes: EShape[], amount: IPoint | null): void {
		if (shapes.length <= 0 || amount == null) {
			return;
		}
		const ax = amount.x;
		const ay = amount.y;
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			if (EShapeCapabilities.contains(shape, EShapeCapability.POSITION)) {
				const position = shape.transform.position;
				position.set(position.x + ax, position.y + ay);
			} else if (shape instanceof EShapeConnectorLine) {
				const edge = shape.edge;
				const head = edge.head;
				const tail = edge.tail;
				if (head.acceptor.shape == null && tail.acceptor.shape == null) {
					edge.lock();
					const headLocal = head.local;
					headLocal.set(headLocal.x + ax, headLocal.y + ay);
					const tailLocal = tail.local;
					tailLocal.set(tailLocal.x + ax, tailLocal.y + ay);
					edge.unlock();
				}
			}
		}
	}

	setId(id: string): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(new ECommandShapePropertyId(this, id));
		}
	}

	addActionValue(value: EShapeActionValue): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(new ECommandShapeActionValueAdd(value, this));
		}
	}

	replaceActionValue(
		target: EShapeActionValue,
		value: EShapeActionValue,
		list: DList<EShapeActionValue>
	): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapeActionValueReplace(target, value, this, list)
			);
		}
	}

	removeActionValue(value: EShapeActionValue): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapeActionValueRemove(value, this)
			);
		}
	}

	bringActionValueForward(value: EShapeActionValue): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapeActionValueBringForward(value, this)
			);
		}
	}

	sendActionValueBackward(value: EShapeActionValue): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapeActionValueSendBackward(value, this)
			);
		}
	}

	addDataValue(value: EShapeDataValue): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(new ECommandShapeDataValueAdd(value, this));
		}
	}

	replaceDataValue(
		oldValue: EShapeDataValue,
		newValue: EShapeDataValue,
		list: DList<EShapeDataValue>
	): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapeDataValueReplace(oldValue, newValue, this, list)
			);
		}
	}

	removeDataValue(value: EShapeDataValue): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(new ECommandShapeDataValueRemove(value, this));
		}
	}

	bringDataValueForward(value: EShapeDataValue): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapeDataValueBringForward(value, this)
			);
		}
	}

	sendDataValueBackward(value: EShapeDataValue): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapeDataValueSendBackward(value, this)
			);
		}
	}

	addDataMappingValue(value: EShapeDataMappingValue): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapeDataMappingValueAdd(value, this)
			);
		}
	}

	replaceDataMappingValue(
		oldValue: EShapeDataMappingValue,
		newValue: EShapeDataMappingValue,
		list: DList<EShapeDataMappingValue>
	): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapeDataMappingValueReplace(oldValue, newValue, this, list)
			);
		}
	}

	removeDataMappingValue(value: EShapeDataMappingValue): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapeDataMappingValueRemove(value, this)
			);
		}
	}

	bringDataMappingValueForward(value: EShapeDataMappingValue): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapeDataMappingValueBringForward(value, this)
			);
		}
	}

	sendDataMappingValueBackward(value: EShapeDataMappingValue): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapeDataMappingValueSendBackward(value, this)
			);
		}
	}

	setPositionX(x: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(new ECommandShapePropertyPositionX(this, x));
		}
	}

	setPositionY(y: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(new ECommandShapePropertyPositionY(this, y));
		}
	}

	setPositionLeft(left: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyPositionLeft(this, left)
			);
		}
	}

	setPositionTop(top: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyPositionTop(this, top)
			);
		}
	}

	setSizeX(x: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(new ECommandShapePropertySizeX(this, x));
		}
	}

	setSizeY(y: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(new ECommandShapePropertySizeY(this, y));
		}
	}

	setRotation(rotation: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyRotation(this, rotation)
			);
		}
	}

	setSkew(skew: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(new ECommandShapePropertySkew(this, skew));
		}
	}

	protected toInternalVector(vector: IPoint, result: IPoint): IPoint {
		// Convert to the internal coordinate vector
		// A = modifier.parent.worldTransform
		// (ndx, ndy)^T = A^-1 (0, 0)^T - A^-1 (dx, dy)^T
		const modifier = this._modifier;
		modifier.updateTransform();
		const worldTransform = modifier.parent.worldTransform;
		const a = worldTransform.a;
		const b = worldTransform.b;
		const c = worldTransform.c;
		const d = worldTransform.d;
		const detInverse = 1 / (a * d - c * b);
		result.set(
			(d * vector.x - c * vector.y) * detInverse,
			(a * vector.y - b * vector.x) * detInverse
		);
		return result;
	}

	translate(dx: number, dy: number, snap: boolean): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			const work = this._translateDelta;
			work.set(dx, dy);
			this.toInternalVector(work, work);

			if (snap) {
				const diagram = this._diagram;
				if (diagram instanceof DDiagramEditor) {
					diagram.snapper.toTranslationSnapped(work, work);
				}
			}

			const transform = this._transform.set(1, 0, 0, 1, work.x, work.y);
			for (let i = 0, imax = shapes.length; i < imax; ++i) {
				const shape = shapes[i];
				if (shape instanceof EShapeConnectorLine) {
					const edge = shape.edge;
					if (edge.tail.acceptor.shape == null && edge.head.acceptor.shape == null) {
						UtilShapeConnectorTransforms.apply(shape, transform);
					}
				} else {
					let capability = EShapeCapability.NONE;
					if (EShapeCapabilities.contains(shape, EShapeCapability.POSITION)) {
						capability |= EShapeCapability.POSITION;
					}
					if (capability !== EShapeCapability.NONE) {
						UtilShapeTransforms.apply(shape, transform, capability);
					}
				}
			}
			this.update(EToolSelectSelectionUpdatedPart.PROPERTY);
		}
	}

	rotateTo(global: Point, snap: boolean): void {
		const rotationAxisGlobal = this._rotationAxisGlobal;
		const originGlobal = this._originGlobal;
		const vx = global.x - originGlobal.x;
		const vy = global.y - originGlobal.y;
		const v = Math.sqrt(vx * vx + vy * vy);
		if (0.001 < v) {
			const vi = 1 / v;
			const nx = vx * vi;
			const ny = vy * vi;
			const dot = Math.max(
				-1,
				Math.min(1, rotationAxisGlobal.x * nx + rotationAxisGlobal.y * ny)
			);
			const cross = rotationAxisGlobal.x * ny - rotationAxisGlobal.y * nx;
			let rotation = 0 <= cross ? +Math.acos(dot) : -Math.acos(dot);
			if (snap) {
				const diagram = this._diagram;
				if (diagram instanceof DDiagramEditor) {
					const baseRotation = this._modifier.rotation;
					rotation = diagram.snapper.toRotationSnapped(baseRotation, rotation);
				}
			}
			this.rotate(rotation);
		}
	}

	rotate(rotation: number): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			const originLocal = this._originLocal;
			const transform = this._transform
				.identity()
				.translate(-originLocal.x, -originLocal.y)
				.rotate(rotation)
				.translate(+originLocal.x, +originLocal.y);
			for (let i = 0, imax = shapes.length; i < imax; ++i) {
				const shape = shapes[i];
				if (shape instanceof EShapeConnectorLine) {
					const edge = shape.edge;
					if (edge.tail.acceptor.shape == null && edge.head.acceptor.shape == null) {
						UtilShapeConnectorTransforms.apply(shape, transform);
					}
				} else {
					let capability = EShapeCapability.NONE;
					if (EShapeCapabilities.contains(shape, EShapeCapability.POSITION)) {
						capability |= EShapeCapability.POSITION;
					}
					if (EShapeCapabilities.contains(shape, EShapeCapability.ROTATION)) {
						capability |= EShapeCapability.ROTATION;
					}
					if (capability !== EShapeCapability.NONE) {
						UtilShapeTransforms.apply(shape, transform, capability);
					}
				}
			}
			this.update(EToolSelectSelectionUpdatedPart.PROPERTY);
		}
	}

	protected getScale(
		dx: number,
		dy: number,
		anchor: ESnapperModifierAnchor,
		keepRatio: boolean,
		result: Point
	): void {
		switch (anchor) {
			case ESnapperModifierAnchor.TOP_LEFT:
				this.getScaleXY(dx, dy, keepRatio, result);
				break;
			case ESnapperModifierAnchor.TOP_CENTER:
				this.getScaleY(dx, dy, keepRatio, result);
				break;
			case ESnapperModifierAnchor.TOP_RIGHT:
				this.getScaleXY(dx, dy, keepRatio, result);
				break;
			case ESnapperModifierAnchor.MIDDLE_LEFT:
				this.getScaleX(dx, dy, keepRatio, result);
				break;
			case ESnapperModifierAnchor.NONE:
				const axis = this._scaleAxis0;
				const width = axis.x;
				const height = axis.y;
				const scaleX = (width + dx) / width;
				const scaleY = (height + dy) / height;
				if (keepRatio) {
					result.x = result.y = Math.max(scaleX, scaleY);
				} else {
					result.set(scaleX, scaleY);
				}
				break;
			case ESnapperModifierAnchor.MIDDLE_RIGHT:
				this.getScaleX(dx, dy, keepRatio, result);
				break;
			case ESnapperModifierAnchor.BOTTOM_LEFT:
				this.getScaleXY(dx, dy, keepRatio, result);
				break;
			case ESnapperModifierAnchor.BOTTOM_CENTER:
				this.getScaleY(dx, dy, keepRatio, result);
				break;
			case ESnapperModifierAnchor.BOTTOM_RIGHT:
				this.getScaleXY(dx, dy, keepRatio, result);
				break;
		}
	}

	protected getScaleX(dx: number, dy: number, keepRatio: boolean, result: Point): void {
		const scale = this.calcScale(dx, dy);
		if (keepRatio) {
			result.set(scale, scale);
		} else {
			result.set(scale, 1);
		}
	}

	protected getScaleY(dx: number, dy: number, keepRatio: boolean, result: Point): void {
		const scale = this.calcScale(dx, dy);
		if (keepRatio) {
			result.set(scale, scale);
		} else {
			result.set(1, scale);
		}
	}

	protected calcScale(dx: number, dy: number): number {
		const axis = this._scaleAxis0;
		const dot = axis.x * dx + axis.y * dy;
		return (this._scaleDet + dot) * this._scaleDetInverse;
	}

	protected getScaleXY(dx: number, dy: number, keepRatio: boolean, result: Point): void {
		// v0
		const axis0 = this._scaleAxis0;
		const vx0 = axis0.x;
		const vy0 = axis0.y;

		// v1
		const axis1 = this._scaleAxis1;
		const vx1 = axis1.x;
		const vy1 = axis1.y;

		// v2
		const vx2 = vx0 + vx1 + dx;
		const vy2 = vy0 + vy1 + dy;

		// A = | vx0, vx1 |
		//     | vy0, vy1 |
		// D = (dx, dy)^T
		// V0 = (vx0, vy0)^T
		// V1 = (vx1, vy1)^T
		// V2 = V0 + V1 + D;
		// A x = V
		//
		// det A = vx0 * vy1 - vy0 * vx1
		// (det A) A^-1 = |  vy1 -vx1 |
		//                | -vy0  vx0 |
		const detInverse = this._scaleDetInverse;
		const scaleX = (+vy1 * vx2 - vx1 * vy2) * detInverse;
		const scaleY = (-vy0 * vx2 + vx0 * vy2) * detInverse;
		this.setScale(scaleX, scaleY, keepRatio, result);
	}

	protected setScale(scaleX: number, scaleY: number, keepRatio: boolean, result: Point): Point {
		if (keepRatio) {
			if (0 <= scaleX) {
				if (0 <= scaleY) {
					const scale = Math.max(scaleX, scaleY);
					result.set(scale, scale);
				} else {
					const scale = Math.max(scaleX, -scaleY);
					result.set(scale, -scale);
				}
			} else {
				if (0 <= scaleY) {
					const scale = Math.max(-scaleX, scaleY);
					result.set(-scale, scale);
				} else {
					const scale = Math.min(scaleX, scaleY);
					result.set(scale, scale);
				}
			}
		} else {
			result.set(scaleX, scaleY);
		}
		return result;
	}

	protected makeScaleTransform(scale: Point, result: Matrix): Matrix {
		return this._scaleTransform
			.copyTo(result)
			.scale(scale.x, scale.y)
			.prepend(this._scaleTransformInverse);
	}

	scale(dx: number, dy: number, keepRatio: boolean, snap: boolean): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			const scale = this._scale;
			const scaleAnchor = this._scaleAnchor;
			this.getScale(dx, dy, scaleAnchor, keepRatio, scale);

			const transform = this._transform;
			this.makeScaleTransform(scale, transform);

			if (snap) {
				const diagram = this._diagram;
				if (diagram instanceof DDiagramEditor) {
					if (diagram.snapper.toScaleSnapped(transform, scaleAnchor, keepRatio, scale)) {
						this.makeScaleTransform(scale, transform);
					}
				}
			}

			for (let i = 0, imax = shapes.length; i < imax; ++i) {
				const shape = shapes[i];
				if (shape instanceof EShapeConnectorLine) {
					const edge = shape.edge;
					if (edge.tail.acceptor.shape == null && edge.head.acceptor.shape == null) {
						UtilShapeConnectorTransforms.apply(shape, transform);
					}
				} else {
					let capability = EShapeCapability.NONE;
					if (EShapeCapabilities.contains(shape, EShapeCapability.POSITION)) {
						capability |= EShapeCapability.POSITION;
					}
					if (EShapeCapabilities.contains(shape, EShapeCapability.WIDTH)) {
						capability |= EShapeCapability.WIDTH;
					}
					if (EShapeCapabilities.contains(shape, EShapeCapability.HEIGHT)) {
						capability |= EShapeCapability.HEIGHT;
					}
					if (EShapeCapabilities.contains(shape, EShapeCapability.ROTATION)) {
						capability |= EShapeCapability.ROTATION;
					}
					if (EShapeCapabilities.contains(shape, EShapeCapability.SKEW)) {
						capability |= EShapeCapability.SKEW;
					}
					if (capability !== EShapeCapability.NONE) {
						UtilShapeTransforms.apply(shape, transform, capability);
					}
				}
			}

			this.update(EToolSelectSelectionUpdatedPart.PROPERTY);
		}
	}

	delete(save?: boolean): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			const parent = shapes[0].parent;
			if (parent) {
				if (save !== false) {
					const deleteds = UtilShapeDeleter.delete(parent, shapes, true);
					if (deleteds) {
						const indices = UtilShapeSearch.toIndices(deleteds);
						DControllers.getCommandController().push(
							new ECommandShapeDelete(deleteds, indices, parent, this, true)
						);
					}
				} else {
					UtilShapeDeleter.delete(parent, shapes, false);
				}
				this.update(
					EToolSelectSelectionUpdatedPart.TREE | EToolSelectSelectionUpdatedPart.SELECTION
				);
			}
		}
	}

	createChildren(creator: (shape: EShape) => EShape[] | null): void {
		this.lock();
		const commands: ECommandShapeCreate[] = [];
		const shapes = this._shapes;
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			const created = creator(shape);
			if (created) {
				commands.push(new ECommandShapeCreate(created, shape, this, false));
			}
		}
		if (0 < commands.length) {
			DControllers.getCommandController().push(new ECommandComposition(commands, this));
			this.update(EToolSelectSelectionUpdatedPart.TREE);
		}
		this.unlock();
	}

	deleteChildren(deletor: (shape: EShape) => EShape[] | null): void {
		this.lock();
		const commands: ECommandShapeDelete[] = [];
		const shapes = this._shapes;
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			const targets = deletor(shape);
			if (targets) {
				for (let j = 0, jmax = targets.length; j < jmax; ++j) {
					targets[j].selected = true;
				}
				const deleteds = UtilShapeDeleter.delete(shape, undefined, true);
				if (deleteds) {
					const indices = UtilShapeSearch.toIndices(deleteds);
					commands.push(new ECommandShapeDelete(deleteds, indices, shape, this, false));
				}
			}
		}
		if (0 < commands.length) {
			DControllers.getCommandController().push(new ECommandComposition(commands, this));
			this.update(EToolSelectSelectionUpdatedPart.TREE);
		}
		this.unlock();
	}

	lockCapability(target: EShapeCapability): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyCapabilityLock(this, target)
			);
		}
	}

	unlockCapability(target: EShapeCapability): void {
		const shapes = this._shapes;
		if (0 < shapes.length) {
			DControllers.getCommandController().push(
				new ECommandShapePropertyCapabilityUnlock(this, target)
			);
		}
	}

	store(): EToolSelectSelectionStored {
		return this._shapes.slice(0);
	}

	restore(stored: EToolSelectSelectionStored): void {
		const shapes = this._shapes;

		// Unselect
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			shapes[i].selected = false;
		}
		shapes.length = 0;

		// Select
		for (let i = 0, imax = stored.length; i < imax; ++i) {
			const newShape = stored[i];
			newShape.selected = true;
			shapes.push(newShape);
		}

		// Done
		this.update(EToolSelectSelectionUpdatedPart.SELECTION);
	}

	get modifier(): EToolSelectModifier {
		return this._modifier;
	}
}
