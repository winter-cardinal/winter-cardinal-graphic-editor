import {
	DDiagramLayer,
	EShapeActionValueGestureOperationType,
	EShapeLayerState
} from "@wcardinal/wcardinal-ui";
import { EDialogLayerValueBackground } from "./e-dialog-layer-value-background";

export class EDialogLayerValue {
	readonly name: string;
	readonly x: number;
	readonly y: number;
	readonly width: number;
	readonly height: number;
	readonly background: EDialogLayerValueBackground;
	readonly visible: boolean;
	readonly interactive: boolean;
	readonly gesture: EShapeActionValueGestureOperationType;

	constructor(
		name: string,
		x: number,
		y: number,
		width: number,
		height: number,
		background: EDialogLayerValueBackground,
		visible: boolean,
		interactive: boolean,
		gesture: EShapeActionValueGestureOperationType
	) {
		this.name = name;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.background = background;
		this.visible = visible;
		this.interactive = interactive;
		this.gesture = gesture;
	}

	isEqual(target: EDialogLayerValue): boolean {
		return (
			this.name === target.name &&
			this.x === target.x &&
			this.y === target.y &&
			this.width === target.width &&
			this.height === target.height &&
			this.background.isEqual(target.background) &&
			this.visible === target.visible &&
			this.interactive === target.interactive &&
			this.gesture === target.gesture
		);
	}

	copyTo(layer: DDiagramLayer): this {
		layer.name = this.name;
		layer.position.set(this.x, this.y);
		layer.width = this.width;
		layer.height = this.height;
		layer.background.copy(this.background);
		const state = layer.state;
		state.lock();
		state.set(EShapeLayerState.INVISIBLE, !this.visible);
		state.set(EShapeLayerState.INTERACTIVE, this.interactive);
		const gesture = this.gesture;
		state.set(
			EShapeLayerState.DRAGGABLE,
			!!(gesture & EShapeActionValueGestureOperationType.DRAG)
		);
		state.set(
			EShapeLayerState.PINCHABLE,
			!!(gesture & EShapeActionValueGestureOperationType.PINCH)
		);
		state.unlock();
		return this;
	}

	static from(layer: DDiagramLayer): EDialogLayerValue {
		const drag = layer.state.is(EShapeLayerState.DRAGGABLE)
			? EShapeActionValueGestureOperationType.DRAG
			: EShapeActionValueGestureOperationType.NONE;
		const pinch = layer.state.is(EShapeLayerState.PINCHABLE)
			? EShapeActionValueGestureOperationType.PINCH
			: EShapeActionValueGestureOperationType.NONE;
		const gesture = drag | pinch;
		return new EDialogLayerValue(
			layer.name,
			layer.position.x,
			layer.position.y,
			layer.width,
			layer.height,
			EDialogLayerValueBackground.from(layer),
			!layer.state.is(EShapeLayerState.INVISIBLE),
			layer.state.is(EShapeLayerState.INTERACTIVE),
			gesture
		);
	}
}
