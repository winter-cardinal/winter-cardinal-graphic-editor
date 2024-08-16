import {
	DApplicationLayerLike,
	DApplications,
	DControllers,
	DDiagramCanvasEditor,
	DDiagramEditor,
	DDiagramLayer,
	EShape,
	EShapeBase,
	EShapeCapabilities,
	EShapeCapability,
	EShapeType,
	ESnapperModifierAnchor,
	UtilKeyboardEvent,
	UtilPointerEvent
} from "@wcardinal/wcardinal-ui";
import { DisplayObject, InteractionEvent, Point, Rectangle } from "pixi.js";
import { UtilShapeAreaSelect } from "../util/util-shape-area-select";
import { ECommandShapeSelect } from "../command/e-command-shape-select";
import { EToolImpl } from "./e-tool-impl";
import { EToolSelectArea } from "./e-tool-select-area";
import { EToolSelectMode } from "./e-tool-select-mode";
import { EToolSelectModifier } from "./e-tool-select-modifier";
import { EToolSelectSelection, EToolSelectSelectionOptions } from "./e-tool-select-selection";
import { UtilHitTest } from "../util/util-hit-test";
import { UtilShapeSearch } from "../util/util-shape-search";

export interface EToolSelectAllowOptions {
	transformation?: boolean;
	deletion?: boolean;
}

export interface EToolSelectOptions {
	diagram: DDiagramEditor;
	selection?: Partial<EToolSelectSelectionOptions>;
	allow?: EToolSelectAllowOptions;
}

const toSelectionOptions = (options: EToolSelectOptions): EToolSelectSelectionOptions => {
	const selection = options.selection;
	return {
		diagram: options.diagram,
		modifier: selection && selection.modifier
	};
};

export class EToolSelect extends EToolImpl {
	protected _area: EToolSelectArea;
	protected _diagram: DDiagramEditor;
	protected _applicationLayer: DApplicationLayerLike | null;
	protected _selection: EToolSelectSelection;
	protected _onDownBound: (e: InteractionEvent) => void;
	protected _onMoveBound: (e: InteractionEvent) => void;
	protected _onUpBound: (e: InteractionEvent) => void;
	protected _onKeydownBound: (e: KeyboardEvent) => void;
	protected _onKeyupBound: (e: KeyboardEvent) => void;
	protected _onDblClickBound: (e: MouseEvent) => void;
	protected _onDownPoint: Point;
	protected _onMovePoint: Point;
	protected _onUpPoint: Point;
	protected _areaRect: Rectangle;
	protected _mode: EToolSelectMode;
	protected _isFirstMove: boolean;
	protected _childSelectTime: number;
	protected _childSelectChild: EShape | null;
	protected _isTransformationAllowed: boolean;
	protected _isDeletionAllowed: boolean;

	constructor(options: EToolSelectOptions) {
		super();

		this._selection = new EToolSelectSelection(toSelectionOptions(options));
		this._area = new EToolSelectArea();
		this._diagram = options.diagram;
		this._applicationLayer = null;
		this._onDownPoint = new Point();
		this._onMovePoint = new Point();
		this._onUpPoint = new Point();
		this._areaRect = new Rectangle();
		this._mode = EToolSelectMode.NONE;
		this._isFirstMove = false;
		this._childSelectTime = -1;
		this._childSelectChild = null;
		const allow = options.allow;
		if (allow) {
			this._isTransformationAllowed = allow.transformation !== false;
			this._isDeletionAllowed = allow.deletion !== false;
		} else {
			this._isTransformationAllowed = true;
			this._isDeletionAllowed = true;
		}

		this._onDownBound = (e: InteractionEvent) => {
			this.onDown(e);
		};
		this._onMoveBound = (e: InteractionEvent) => {
			this.onMove(e);
		};
		this._onUpBound = (e: InteractionEvent) => {
			this.onUp(e);
		};
		this._onKeydownBound = (e: KeyboardEvent) => {
			this.onKeydown(e);
		};
		this._onKeyupBound = (e: KeyboardEvent) => {
			this.onKeyup(e);
		};
		this._onDblClickBound = (e: MouseEvent) => {
			this.onDblClick(e);
		};
	}

	get selection(): EToolSelectSelection {
		return this._selection;
	}

	protected onActivate(): void {
		const diagram = this._diagram;
		diagram.on(UtilPointerEvent.down, this._onDownBound);
		diagram.on("dblclick", this._onDblClickBound);
		diagram.on("keydown", this._onKeydownBound);
		diagram.on("keyup", this._onKeyupBound);
	}

	protected onDeactivate(): void {
		const diagram = this._diagram;
		diagram.off(UtilPointerEvent.down, this._onDownBound);
		diagram.off("dblclick", this._onDblClickBound);
		diagram.off("keydown", this._onKeydownBound);
		diagram.off("keyup", this._onKeyupBound);
	}

	protected onDown(e: InteractionEvent): void {
		const originalEvent = e.data.originalEvent;
		if (originalEvent.altKey) {
			return;
		}
		const diagram = this._diagram;
		const diagramCanvas = diagram.canvas;
		const diagramLayer = diagram.layer;
		if (diagramCanvas && diagramLayer) {
			const isAddMode = originalEvent.ctrlKey || originalEvent.shiftKey;
			if (this._mode === EToolSelectMode.SELECT) {
				this._mode = EToolSelectMode.NONE;
				this.onSelectEnd(diagramCanvas, diagramLayer, isAddMode);
				return;
			}

			const global = e.data.global;
			const onDownPoint = this._onDownPoint;
			onDownPoint.copyFrom(global);
			const selection = this._selection;
			const modifier = selection.modifier;
			const hitObject = this.hitTest(global, modifier, diagramLayer);
			const commandController = DControllers.getCommandController();
			if (hitObject instanceof EShapeBase) {
				if (isAddMode) {
					const before = selection.store();
					selection.toggle(hitObject);
					const after = selection.store();
					commandController.push(new ECommandShapeSelect(before, after, selection));
				} else if (!selection.contains(hitObject)) {
					const first = selection.first();
					if (first == null) {
						const before = selection.store();
						if (selection.set(hitObject.root)) {
							const after = selection.store();
							commandController.push(
								new ECommandShapeSelect(before, after, selection)
							);
						}
					} else {
						const selected = UtilShapeSearch.toSelected(hitObject);
						if (selected != null) {
							if (EShapeCapabilities.contains(selected, EShapeCapability.CHILDREN)) {
								this._childSelectTime = Date.now();
								this._childSelectChild = UtilShapeSearch.toOfParent(
									hitObject,
									selected
								);
							}
						} else {
							const sharedParent = UtilShapeSearch.toSharedParent(first, hitObject);
							const before = selection.store();
							if (
								selection.set(UtilShapeSearch.toOfParent(hitObject, sharedParent))
							) {
								const after = selection.store();
								commandController.push(
									new ECommandShapeSelect(before, after, selection)
								);
							}
						}
					}
				}

				if (this._isTransformationAllowed && selection.prepareTranslate()) {
					selection.prepareTranslateSnap();
					this._mode = EToolSelectMode.TRANSLATE;
					this._isFirstMove = true;
				}
			} else if (hitObject === modifier) {
				switch (modifier.getLastHitAnchor()) {
					case ESnapperModifierAnchor.ROTATION:
						if (selection.prepareRotate(global)) {
							selection.prepareRotateSnap();
							this._mode = EToolSelectMode.ROTATE;
							this._isFirstMove = true;
						}
						break;
					default:
						if (selection.prepareScale(modifier.getLastHitAnchor())) {
							selection.prepareScaleSnap();
							this._mode = EToolSelectMode.SCALE;
							this._isFirstMove = true;
						}
				}
			} else {
				// Select area
				const area = this._area;
				diagramCanvas.toLocal(global, undefined, onDownPoint);
				area.x = onDownPoint.x;
				area.y = onDownPoint.y;
				area.size.set(0, 0);
				area.update();
				diagramCanvas.addChild(area);
				DApplications.update(diagram);

				// Select mode
				this._mode = EToolSelectMode.SELECT;
			}

			if (this._mode !== EToolSelectMode.NONE) {
				const oldApplicationLayer = this._applicationLayer;
				if (oldApplicationLayer) {
					this._applicationLayer = null;
					const oldInteractionManager = oldApplicationLayer.renderer.plugins.interaction;
					oldInteractionManager.off(UtilPointerEvent.move, this._onMoveBound);
					const onUpBound = this._onUpBound;
					oldInteractionManager.off(UtilPointerEvent.up, onUpBound);
					oldInteractionManager.off(UtilPointerEvent.upoutside, onUpBound);
					oldInteractionManager.off(UtilPointerEvent.cancel, onUpBound);
				}

				const newApplicationLayer = DApplications.getLayer(diagram);
				if (newApplicationLayer) {
					this._applicationLayer = newApplicationLayer;
					const newInteractionManager = newApplicationLayer.renderer.plugins.interaction;
					newInteractionManager.on(UtilPointerEvent.move, this._onMoveBound);
					const onUpBound = this._onUpBound;
					newInteractionManager.on(UtilPointerEvent.up, onUpBound);
					newInteractionManager.on(UtilPointerEvent.upoutside, onUpBound);
					newInteractionManager.on(UtilPointerEvent.cancel, onUpBound);
				}
			}
		}
	}

	protected onMove(e: InteractionEvent): void {
		const originalEvent = e.data.originalEvent;
		if (originalEvent.altKey) {
			return;
		}
		const diagram = this._diagram;
		const diagramCanvas = diagram.canvas;
		const diagramLayer = diagram.layer;
		const mode = this._mode;
		const applicationLayer = this._applicationLayer;
		if (diagramCanvas && diagramLayer && mode !== EToolSelectMode.NONE && applicationLayer) {
			const global = e.data.global;
			applicationLayer.lock();
			const onDownPoint = this._onDownPoint;
			if (mode === EToolSelectMode.SELECT) {
				const area = this._area;
				const onMovePoint = diagramCanvas.toLocal(global, undefined, this._onMovePoint);
				area.x = Math.min(onDownPoint.x, onMovePoint.x);
				area.y = Math.min(onDownPoint.y, onMovePoint.y);
				area.size.set(
					Math.max(onDownPoint.x, onMovePoint.x) - area.x,
					Math.max(onDownPoint.y, onMovePoint.y) - area.y
				);
				area.update();
			} else {
				const dx = global.x - onDownPoint.x;
				const dy = global.y - onDownPoint.y;
				if (1 <= Math.abs(dx) || 1 <= Math.abs(dy)) {
					const isFirstMove = this._isFirstMove;
					this._isFirstMove = false;
					this._childSelectChild = null;
					const selection = this._selection;
					selection.modifier.disallow();
					switch (mode) {
						case EToolSelectMode.TRANSLATE:
							if (isFirstMove) {
								selection.saveForTranslate();
							}
							selection.translate(dx, dy, true);
							break;
						case EToolSelectMode.ROTATE:
							if (isFirstMove) {
								selection.saveForRotate();
							}
							selection.rotateTo(global, true);
							break;
						case EToolSelectMode.SCALE:
							if (isFirstMove) {
								selection.saveForScale();
							}
							const keepRatio = originalEvent.shiftKey;
							selection.scale(dx, dy, keepRatio, true);
							break;
					}
				}
			}
			applicationLayer.unlock();
			applicationLayer.update();
		}
	}

	protected hitTest(
		global: Point,
		modifier: EToolSelectModifier,
		diagramLayer: DDiagramLayer
	): DisplayObject | EShape | null {
		// Modifier
		if (this._isTransformationAllowed && modifier.visible) {
			const applicationLayer = DApplications.getLayer(diagramLayer);
			if (applicationLayer) {
				const interactionManager = applicationLayer.renderer.plugins.interaction;
				const modifierHit = UtilHitTest.execute(global, modifier, interactionManager);
				if (modifierHit != null) {
					return modifierHit;
				}
			}
		}

		// Layer
		if (diagramLayer.visible) {
			return UtilHitTest.execute(global, diagramLayer);
		}

		// Found nothing
		return null;
	}

	protected onSelectEnd(
		canvas: DDiagramCanvasEditor,
		diagramLayer: DDiagramLayer,
		isAddMode: boolean
	): void {
		const area = this._area;
		const selection = this._selection;
		const commandController = DControllers.getCommandController();
		if (0 < area.size.x && 0 < area.size.y) {
			const areaRect = area.getBounds(false, this._areaRect);
			const foundShapes: EShape[] = [];
			UtilShapeAreaSelect.findShapes(diagramLayer, areaRect, foundShapes);
			if (isAddMode) {
				if (0 < foundShapes.length) {
					const before = selection.store();
					if (selection.addAll(foundShapes)) {
						const after = selection.store();
						commandController.push(new ECommandShapeSelect(before, after, selection));
					}
				}
			} else {
				if (0 < foundShapes.length || !selection.isEmpty()) {
					const before = selection.store();
					if (selection.clearAndAddAll(foundShapes)) {
						const after = selection.store();
						commandController.push(new ECommandShapeSelect(before, after, selection));
					}
				}
			}
		} else if (!isAddMode) {
			if (!selection.isEmpty()) {
				const before = selection.store();
				if (selection.clear()) {
					const after = selection.store();
					commandController.push(new ECommandShapeSelect(before, after, selection));
				}
			}
		}
		canvas.removeChild(area);
		DApplications.update(diagramLayer);
	}

	protected onUp(e: InteractionEvent): void {
		const diagram = this._diagram;
		const diagramCanvas = diagram.canvas;
		const diagramLayer = diagram.layer;
		const mode = this._mode;

		const applicationLayer = this._applicationLayer;
		if (applicationLayer) {
			this._applicationLayer = null;
			const interactionManager = applicationLayer.renderer.plugins.interaction;
			interactionManager.off(UtilPointerEvent.move, this._onMoveBound);
			const onUpBound = this._onUpBound;
			interactionManager.off(UtilPointerEvent.up, onUpBound);
			interactionManager.off(UtilPointerEvent.upoutside, onUpBound);
			interactionManager.off(UtilPointerEvent.cancel, onUpBound);
		}

		if (diagramCanvas && diagramLayer && mode !== EToolSelectMode.NONE) {
			this._mode = EToolSelectMode.NONE;

			if (mode === EToolSelectMode.SELECT) {
				const originalEvent = e.data.originalEvent;
				const isAddMode = originalEvent.ctrlKey || originalEvent.shiftKey;
				this.onSelectEnd(diagramCanvas, diagramLayer, isAddMode);
			} else {
				const selection = this._selection;

				// Finalize
				selection.finalize();

				// Select the child
				const childSelectChild = this._childSelectChild;
				if (childSelectChild != null) {
					this._childSelectChild = null;
					const elapsedTime = Date.now() - this._childSelectTime;
					if (elapsedTime < 333) {
						const before = selection.store();
						if (selection.set(childSelectChild)) {
							const after = selection.store();
							DControllers.getCommandController().push(
								new ECommandShapeSelect(before, after, selection)
							);
						}
					}
				}

				//
				selection.modifier.allow();
				selection.updateModifier();
				if (applicationLayer) {
					applicationLayer.update();
				}
			}
		}
	}

	protected getRotateAmount(e: KeyboardEvent): number {
		return (Math.PI * (e.ctrlKey ? 1 : 15)) / 180;
	}

	protected getScaleAmount(e: KeyboardEvent): number {
		return e.ctrlKey ? 1 : 10;
	}

	protected getTranslateAmount(e: KeyboardEvent): number {
		return e.ctrlKey ? 1 : 10;
	}

	protected onKeydown(e: KeyboardEvent): void {
		const selection = this._selection;
		if (!selection.isEmpty()) {
			if (this._isTransformationAllowed) {
				if (UtilKeyboardEvent.isArrowUpKey(e)) {
					if (e.shiftKey) {
						if (selection.prepareScale(ESnapperModifierAnchor.NONE)) {
							selection.saveForScale();
							selection.scale(0, this.getScaleAmount(e), false, false);
							selection.finalize();
						}
					} else {
						if (selection.prepareTranslate()) {
							selection.saveForTranslate();
							selection.translate(0, -this.getTranslateAmount(e), false);
							selection.finalize();
						}
					}
					e.preventDefault();
				} else if (UtilKeyboardEvent.isArrowRightKey(e)) {
					if (e.altKey) {
						if (selection.prepareRotate()) {
							selection.saveForRotate();
							selection.rotate(this.getRotateAmount(e));
							selection.finalize();
						}
					} else if (e.shiftKey) {
						if (selection.prepareScale(ESnapperModifierAnchor.NONE)) {
							selection.saveForScale();
							selection.scale(this.getScaleAmount(e), 0, false, false);
							selection.finalize();
						}
					} else {
						if (selection.prepareTranslate()) {
							selection.saveForTranslate();
							selection.translate(this.getTranslateAmount(e), 0, false);
							selection.finalize();
						}
					}
					e.preventDefault();
				} else if (UtilKeyboardEvent.isArrowDownKey(e)) {
					if (e.shiftKey) {
						if (selection.prepareScale(ESnapperModifierAnchor.NONE)) {
							selection.saveForScale();
							selection.scale(0, -this.getScaleAmount(e), false, false);
							selection.finalize();
						}
					} else {
						if (selection.prepareTranslate()) {
							selection.saveForTranslate();
							selection.translate(0, this.getTranslateAmount(e), false);
							selection.finalize();
						}
					}
					e.preventDefault();
				} else if (UtilKeyboardEvent.isArrowLeftKey(e)) {
					if (e.altKey) {
						if (selection.prepareRotate()) {
							selection.saveForRotate();
							selection.rotate(-this.getRotateAmount(e));
							selection.finalize();
						}
					} else if (e.shiftKey) {
						if (selection.prepareScale(ESnapperModifierAnchor.NONE)) {
							selection.saveForScale();
							selection.scale(-this.getScaleAmount(e), 0, false, false);
							selection.finalize();
						}
					} else {
						if (selection.prepareTranslate()) {
							selection.saveForTranslate();
							selection.translate(-this.getTranslateAmount(e), 0, false);
							selection.finalize();
						}
					}
					e.preventDefault();
				}
			}

			if (this._isDeletionAllowed) {
				if (UtilKeyboardEvent.isDeleteKey(e)) {
					selection.delete();
					e.preventDefault();
				}
			}
		}

		if (UtilKeyboardEvent.isSelectAllKey(e)) {
			const first = selection.first();
			const parent = first == null ? this._diagram.layer : first.parent;
			if (parent != null) {
				const children = parent.children;
				if (0 < children.length) {
					const before = selection.store();
					if (e.altKey) {
						const types = new Set<EShapeType>();
						for (let i = 0, imax = before.length; i < imax; ++i) {
							types.add(before[i].type);
						}
						const after: EShape[] = [];
						for (let i = 0, imax = children.length; i < imax; ++i) {
							const child = children[i];
							if (child.selected) {
								after.push(child);
							} else if (types.has(child.type)) {
								after.push(child);
							}
						}
						if (selection.clearAndAddAll(after)) {
							DControllers.getCommandController().push(
								new ECommandShapeSelect(before, after, selection)
							);
						}
					} else {
						if (selection.clearAndAddAll(children)) {
							const after = selection.store();
							DControllers.getCommandController().push(
								new ECommandShapeSelect(before, after, selection)
							);
						}
					}
				}
			}
		}
	}

	protected onKeyup(e: KeyboardEvent): void {
		// DO NOTHING
	}

	protected onDblClick(e: MouseEvent): void {
		const selection = this._selection;
		const last = selection.last();
		if (last != null) {
			this.emit("edit", last, this);
		}
	}
}
