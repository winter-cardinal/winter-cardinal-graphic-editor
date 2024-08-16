import { DDiagramLayer } from "@wcardinal/wcardinal-ui";

export class EDialogLayerValueBackground {
	enable: boolean;
	color: number;
	alpha: number;

	constructor(enable: boolean, color: number, alpha: number) {
		this.enable = enable;
		this.color = color;
		this.alpha = alpha;
	}

	isEqual(target: EDialogLayerValueBackground): boolean {
		return (
			this.enable === target.enable &&
			this.color === target.color &&
			this.alpha === target.alpha
		);
	}

	static from(layer: DDiagramLayer): EDialogLayerValueBackground {
		return new EDialogLayerValueBackground(
			layer.background.enable,
			layer.background.color,
			layer.background.alpha
		);
	}
}
