import {
	DApplications,
	DControllers,
	DDiagramCanvasEditor,
	DDiagramEditor,
	EShapeAcceptorEdgeSide,
	EShapeAcceptorEdgeType,
	EShapeConnectorEdgeAcceptor,
	EShapeConnectorLine,
	EShapePointsMarkerType,
	UtilKeyboardEvent,
	UtilPointerEvent
} from "@wcardinal/wcardinal-ui";
import { IPoint, InteractionEvent, Point } from "pixi.js";
import { ECommandShapeCreate } from "../command/e-command-shape-create";
import { EToolImpl } from "./e-tool-impl";
import { EToolSelectSelection } from "./e-tool-select-selection";
import { EToolShapeAcceptorEdge, EToolShapeAcceptorEdgeFound } from "./e-tool-shape-acceptor-edge";

export const EToolShapeCreateLineConnectorPhase = {
	OFF: -1,
	TAIL: 0,
	HEAD: 1,
	DONE: 2
} as const;

export type EToolShapeCreateLineConnectorPhase =
	(typeof EToolShapeCreateLineConnectorPhase)[keyof typeof EToolShapeCreateLineConnectorPhase];

export interface EToolShapeCreateLineConnectorOptions {
	selection: EToolSelectSelection;
	diagram: DDiagramEditor;
	newShape?: () => EShapeConnectorLine;
	dangling?: boolean;
}

export class EToolShapeCreateLineConnector<
	OPTIONS extends EToolShapeCreateLineConnectorOptions = EToolShapeCreateLineConnectorOptions
> extends EToolImpl {
	protected _connector?: EShapeConnectorLine;

	protected _options: OPTIONS;
	protected _selection: EToolSelectSelection;
	protected _diagram: DDiagramEditor;
	protected _newShape: () => EShapeConnectorLine;
	protected _edge: EToolShapeAcceptorEdge;
	protected _phase: EToolShapeCreateLineConnectorPhase;

	protected _work: Point;
	protected _onDownBound: (e: InteractionEvent) => void;
	protected _onMoveBound: (e: InteractionEvent) => void;
	protected _onUpBound: (e: InteractionEvent) => void;
	protected _onKeyDownBound: (e: KeyboardEvent) => void;
	protected _onSetBound: (canvas: DDiagramCanvasEditor) => void;
	protected _onUnsetBound: (canvas: DDiagramCanvasEditor) => void;

	constructor(options: OPTIONS) {
		super();
		this._options = options;
		this._selection = options.selection;
		this._diagram = options.diagram;
		this._edge = new EToolShapeAcceptorEdge(options.diagram, false);
		this._newShape = options.newShape || (() => this.newShape());
		this._phase = EToolShapeCreateLineConnectorPhase.OFF;

		this._work = new Point();
		this._onDownBound = (e: InteractionEvent): void => {
			this.onDown(e);
		};
		this._onMoveBound = (e: InteractionEvent): void => {
			this.onMove(e);
		};
		this._onUpBound = (e: InteractionEvent): void => {
			this.onUp(e);
		};
		this._onKeyDownBound = (e: KeyboardEvent): void => {
			this.onKeyDown(e);
		};
		this._onSetBound = (canvas: DDiagramCanvasEditor): void => {
			this.onSet(canvas);
		};
		this._onUnsetBound = (canvas: DDiagramCanvasEditor): void => {
			this.onUnset(canvas);
		};
	}

	protected onActivate(): void {
		this._phase = EToolShapeCreateLineConnectorPhase.TAIL;
		const diagram = this._diagram;
		const layer = DApplications.getLayer(diagram);
		if (layer) {
			const interactionManager = layer.renderer.plugins.interaction;
			diagram.on(UtilPointerEvent.down, this._onDownBound);
			diagram.on(UtilPointerEvent.move, this._onMoveBound);
			const onUpBound = this._onUpBound;
			interactionManager.on(UtilPointerEvent.up, onUpBound);
			interactionManager.on(UtilPointerEvent.upoutside, onUpBound);
			interactionManager.on(UtilPointerEvent.cancel, onUpBound);
			diagram.on("keydown", this._onKeyDownBound);
			diagram.on("set", this._onSetBound);
			diagram.on("unset", this._onUnsetBound);
		}

		this._edge.begin(diagram.canvas, null);

		const selection = this._selection;
		selection.modifier.disallow();
		selection.updateModifier();
	}

	protected onDeactivate(): void {
		const diagram = this._diagram;
		const layer = DApplications.getLayer(diagram);
		if (layer) {
			const interactionManager = layer.renderer.plugins.interaction;
			diagram.off(UtilPointerEvent.down, this._onDownBound);
			diagram.off(UtilPointerEvent.move, this._onMoveBound);
			const onUpBound = this._onUpBound;
			interactionManager.off(UtilPointerEvent.up, onUpBound);
			interactionManager.off(UtilPointerEvent.upoutside, onUpBound);
			interactionManager.off(UtilPointerEvent.cancel, onUpBound);
			diagram.off("keydown", this._onKeyDownBound);
			diagram.off("set", this._onSetBound);
			diagram.off("unset", this._onUnsetBound);
		}

		this._edge.end();

		const selection = this._selection;
		selection.modifier.allow();
		selection.updateModifier();

		const connector = this._connector;
		if (connector != null) {
			this._connector = undefined;
			connector.detach();
			connector.destroy();
		}

		this._phase = EToolShapeCreateLineConnectorPhase.OFF;
	}

	protected onSet(canvas: DDiagramCanvasEditor): void {
		this._edge.begin(canvas, null);
	}

	protected onUnset(canvas: DDiagramCanvasEditor): void {
		this._edge.end();

		const connector = this._connector;
		if (connector != null) {
			this._connector = undefined;
			connector.detach();
			connector.destroy();
		}

		this._phase = EToolShapeCreateLineConnectorPhase.TAIL;
	}

	protected onDown(e: InteractionEvent): void {
		const originalEvent = e.data.originalEvent;
		if (originalEvent.altKey) {
			return;
		}
		switch (this._phase) {
			case EToolShapeCreateLineConnectorPhase.OFF:
				break;
			case EToolShapeCreateLineConnectorPhase.TAIL:
				if (this.onTail(e)) {
					this._phase = EToolShapeCreateLineConnectorPhase.HEAD;
				}
				break;
			case EToolShapeCreateLineConnectorPhase.HEAD:
				if (this.onHead(e)) {
					this._phase = EToolShapeCreateLineConnectorPhase.DONE;
				}
				break;
			case EToolShapeCreateLineConnectorPhase.DONE:
				break;
		}
	}

	protected onMove(e: InteractionEvent): void {
		const originalEvent = e.data.originalEvent;
		if (originalEvent.altKey) {
			return;
		}
		switch (this._phase) {
			case EToolShapeCreateLineConnectorPhase.OFF:
				break;
			case EToolShapeCreateLineConnectorPhase.TAIL:
				this.onTail(e);
				break;
			case EToolShapeCreateLineConnectorPhase.HEAD:
				this.onHead(e);
				break;
			case EToolShapeCreateLineConnectorPhase.DONE:
				break;
		}
	}

	protected onUp(e: InteractionEvent): void {
		this.onDone();
	}

	protected onTail(e: InteractionEvent): boolean {
		const diagram = this._diagram;
		const layer = diagram.layer;
		if (layer) {
			let connector = this._connector;
			const global = e.data.global;
			const local = layer.toLocal(global, undefined, this._work);
			const edge = this._edge.find(EShapeAcceptorEdgeType.TAIL, local.x, local.y);
			this._edge.update(EShapeAcceptorEdgeType.TAIL, local.x, local.y);
			if (this.isTailAccepted(connector, local, edge)) {
				if (connector == null) {
					connector = this._newShape();
					connector.fill.alpha = 1;
					this._connector = connector;
					connector.attach(layer);
				}
				this.onTailAccepted(connector, local, edge);
				DApplications.update(diagram);
				return true;
			} else {
				if (connector != null) {
					this.onTailUnaccepted(connector, local);
					DApplications.update(diagram);
					return false;
				}
			}
		}
		return false;
	}

	protected isDanglingEdgeAllowed(): boolean {
		return this._options.dangling ?? false;
	}

	protected isTailAccepted(
		connector: EShapeConnectorLine | undefined,
		local: IPoint,
		edge: EToolShapeAcceptorEdgeFound | null
	): boolean {
		if (edge == null) {
			return this.isDanglingEdgeAllowed();
		} else {
			return true;
		}
	}

	protected getTailType(): EShapePointsMarkerType {
		return EShapePointsMarkerType.CIRCLE;
	}

	protected onTailAccepted(
		connector: EShapeConnectorLine,
		local: IPoint,
		edge: EToolShapeAcceptorEdgeFound | null
	): void {
		connector.points.marker.tail.type = this.getTailType();
		if (edge != null) {
			connector.edge.tail.set(
				edge.shape,
				edge.id,
				edge.x,
				edge.y,
				0,
				edge.local.x,
				edge.local.y,
				undefined,
				undefined,
				edge.acceptor.side
			);
			connector.edge.head.local.copyFrom(edge.local);
		} else {
			connector.edge.tail.set(
				null,
				null,
				null,
				null,
				0,
				local.x,
				local.y,
				undefined,
				undefined,
				EShapeAcceptorEdgeSide.TOP
			);
			connector.edge.head.local.copyFrom(local);
		}
	}

	protected onTailUnaccepted(connector: EShapeConnectorLine, local: IPoint): void {
		connector.points.marker.tail.type = EShapePointsMarkerType.NONE;
		connector.edge.tail.set(
			null,
			null,
			null,
			null,
			0,
			local.x,
			local.y,
			undefined,
			undefined,
			EShapeAcceptorEdgeSide.TOP
		);
		connector.edge.head.local.copyFrom(local);
	}

	protected newShape(): EShapeConnectorLine {
		const result = new EShapeConnectorLine();
		result.fill.alpha = 1;
		return result;
	}

	protected onHead(e: InteractionEvent): boolean {
		const diagram = this._diagram;
		const layer = diagram.layer;
		if (layer) {
			const connector = this._connector;
			if (connector) {
				const global = e.data.global;
				const local = layer.toLocal(global, undefined, this._work);
				const edge = this._edge.find(EShapeAcceptorEdgeType.HEAD, local.x, local.y);
				this._edge.update(EShapeAcceptorEdgeType.HEAD, local.x, local.y);
				if (this.isHeadAccepted(connector, local, edge)) {
					this.onHeadAccepted(connector, local, edge);
					DApplications.update(diagram);
					return true;
				} else {
					this.onHeadUnaccepted(connector, local);
					DApplications.update(diagram);
					return false;
				}
			}
		}
		return false;
	}

	protected isHeadAccepted(
		connector: EShapeConnectorLine,
		local: IPoint,
		edge: EToolShapeAcceptorEdgeFound | null
	): boolean {
		if (edge == null) {
			return this.isDanglingEdgeAllowed();
		} else {
			return !this.isSameAcceptor(connector.edge.tail.acceptor, edge);
		}
	}

	protected isSameAcceptor(
		a: EShapeConnectorEdgeAcceptor,
		b: EToolShapeAcceptorEdgeFound
	): boolean {
		return a.shape === b.shape && a.edge === b.id && a.x === b.x && a.y === b.y;
	}

	protected getHeadType(): EShapePointsMarkerType {
		return EShapePointsMarkerType.TRIANGLE;
	}

	protected onHeadAccepted(
		connector: EShapeConnectorLine,
		local: IPoint,
		edge: EToolShapeAcceptorEdgeFound | null
	): void {
		connector.points.marker.head.type = this.getHeadType();
		if (edge != null) {
			connector.edge.head.set(
				edge.shape,
				edge.id,
				edge.x,
				edge.y,
				10,
				edge.local.x,
				edge.local.y,
				undefined,
				undefined,
				edge.acceptor.side
			);
		} else {
			connector.edge.head.set(
				null,
				null,
				null,
				null,
				10,
				local.x,
				local.y,
				undefined,
				undefined,
				EShapeAcceptorEdgeSide.TOP
			);
		}
	}

	protected onHeadUnaccepted(connector: EShapeConnectorLine, local: IPoint): void {
		connector.points.marker.head.type = EShapePointsMarkerType.NONE;
		connector.edge.head.set(
			null,
			null,
			null,
			null,
			0,
			local.x,
			local.y,
			undefined,
			undefined,
			EShapeAcceptorEdgeSide.TOP
		);
	}

	protected onDone(): void {
		if (this._phase === EToolShapeCreateLineConnectorPhase.DONE) {
			this._phase = EToolShapeCreateLineConnectorPhase.OFF;
			const connector = this._connector;
			if (connector) {
				this._connector = undefined;
				const diagram = this._diagram;
				const layer = diagram.layer;
				if (layer) {
					connector.edge.attach();
					DControllers.getCommandController().push(
						new ECommandShapeCreate([connector], layer, this._selection, true)
					);
				} else {
					connector.detach();
					connector.destroy();
				}
				this.emit("done", this);
			}
		}
	}

	protected onCancel(): void {
		const connector = this._connector;
		if (connector != null) {
			this._connector = undefined;
			connector.detach();
			connector.destroy();
		}
		if (this._phase !== EToolShapeCreateLineConnectorPhase.OFF) {
			this._phase = EToolShapeCreateLineConnectorPhase.OFF;
			this.emit("cancel", this);
		}
	}

	onKeyDown(e: KeyboardEvent): void {
		if (UtilKeyboardEvent.isCancelKey(e)) {
			this.onCancel();
		}
	}
}
