import {
	DApplicationLayerLike,
	DApplications,
	DControllers,
	DDiagramEditor,
	EShape,
	toResized,
	UtilPointerEvent
} from "@wcardinal/wcardinal-ui";
import { InteractionEvent, Point } from "pixi.js";
import { ECommandShapeCreate } from "../command/e-command-shape-create";
import { EToolImpl } from "./e-tool-impl";
import { EToolSelectSelection } from "./e-tool-select-selection";

type SHAPE_CREATOR = () => EShape;

export class EToolShapeCreate extends EToolImpl {
	protected _diagram: DDiagramEditor;
	protected _applicationLayer: DApplicationLayerLike | null;
	protected _onDownBound: (e: InteractionEvent) => void;
	protected _onMoveBound: (e: InteractionEvent) => void;
	protected _onUpBound: (e: InteractionEvent) => void;
	protected _creator: SHAPE_CREATOR | undefined;
	protected _onDownPoint: Point;
	protected _onMovePoint: Point;
	protected _shape: EShape | null;
	protected _selection: EToolSelectSelection;

	constructor(selection: EToolSelectSelection, diagram: DDiagramEditor) {
		super();
		this._selection = selection;
		this._diagram = diagram;
		this._applicationLayer = null;
		this._onDownPoint = new Point();
		this._onMovePoint = new Point();
		this._shape = null;
		this._creator = undefined;
		this._onDownBound = (e: InteractionEvent): void => {
			this.onDown(e);
		};
		this._onMoveBound = (e: InteractionEvent): void => {
			this.onMove(e);
		};
		this._onUpBound = (e: InteractionEvent): void => {
			this.onUp(e);
		};
	}

	get shape(): SHAPE_CREATOR | undefined {
		return this._creator;
	}

	set shape(creator: SHAPE_CREATOR | undefined) {
		this._creator = creator;
	}

	protected onActivate(): void {
		this._diagram.on(UtilPointerEvent.down, this._onDownBound);
	}

	protected onDeactivate(): void {
		this._diagram.off(UtilPointerEvent.down, this._onDownBound);
		this.onDone();
	}

	onDown(e: InteractionEvent): void {
		const originalEvent = e.data.originalEvent;
		if (originalEvent.altKey) {
			return;
		}
		const selection = this._selection;
		const diagram = this._diagram;
		const diagramLayer = diagram.layer;
		const creator = this._creator;
		if (diagramLayer != null && creator != null && this._shape == null) {
			const onDownPoint = diagramLayer.toLocal(e.data.global, undefined, this._onDownPoint);
			diagram.snapper.toSnapped(onDownPoint, onDownPoint);
			this._onMovePoint.copyFrom(onDownPoint);

			const shape = (this._shape = creator());
			toResized(
				shape,
				onDownPoint,
				onDownPoint,
				originalEvent.ctrlKey,
				originalEvent.shiftKey
			);
			shape.attach(diagramLayer);
			selection.modifier.disallow();

			DControllers.getCommandController().push(
				new ECommandShapeCreate([shape], diagramLayer, this._selection, true)
			);

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

	onMove(e: InteractionEvent): void {
		const originalEvent = e.data.originalEvent;
		if (originalEvent.altKey) {
			return;
		}
		const shape = this._shape;
		if (shape) {
			const diagram = this._diagram;
			const diagramLayer = diagram.layer;
			const selection = this._selection;
			const applicationLayer = this._applicationLayer;
			if (diagramLayer && applicationLayer) {
				applicationLayer.lock();
				const onDownPoint = this._onDownPoint;
				const onMovePoint = diagramLayer.toLocal(
					e.data.global,
					undefined,
					this._onMovePoint
				);
				diagram.snapper.toSnapped(onMovePoint, onMovePoint);
				toResized(
					shape,
					onDownPoint,
					onMovePoint,
					originalEvent.ctrlKey,
					originalEvent.shiftKey
				);
				selection.update("PROPERTY");
				applicationLayer.unlock();
				applicationLayer.update();
			}
		}
	}

	onUp(e: InteractionEvent): void {
		this.onDone();
	}

	protected onDone(): void {
		const shape = this._shape;
		if (shape) {
			this._shape = null;
			const selection = this._selection;
			const onDownPoint = this._onDownPoint;
			const onMovePoint = this._onMovePoint;

			const applicationLayer = this._applicationLayer;
			if (applicationLayer) {
				this._applicationLayer = null;
				const interactionManager = applicationLayer.renderer.plugins.interaction;
				interactionManager.off(UtilPointerEvent.move, this._onMoveBound);
				const onUpBound = this._onUpBound;
				interactionManager.off(UtilPointerEvent.up, onUpBound);
				interactionManager.off(UtilPointerEvent.upoutside, onUpBound);
				interactionManager.off(UtilPointerEvent.cancel, onUpBound);

				applicationLayer.lock();
				if (onDownPoint.x === onMovePoint.x && onDownPoint.y === onMovePoint.y) {
					onMovePoint.set(onDownPoint.x + 100, onDownPoint.y + 100);
					toResized(shape, onDownPoint, onMovePoint, false, false);
				}
				selection.modifier.allow();
				selection.update("PROPERTY");
				applicationLayer.unlock();
				applicationLayer.update();
			}
			this.emit("done", this);
		}
	}
}
