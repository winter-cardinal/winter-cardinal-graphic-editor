import {
	DDiagramLayer,
	DListData,
	DListItem,
	DListItemOptions,
	UtilPointerEvent
} from "@wcardinal/wcardinal-ui";
import { InteractionEvent, InteractionManager, Point, Texture } from "pixi.js";

export class EEditorLayerItem extends DListItem<DDiagramLayer> {
	protected _iconsEye: Texture;
	protected _iconsEyeSlash: Texture;
	protected _iconsWork: Point;

	constructor(
		iconsEye: Texture,
		iconsEyeSlash: Texture,
		work: Point,
		data: DListData<DDiagramLayer>,
		options?: DListItemOptions<DDiagramLayer>
	) {
		super(data, options);
		this._iconsEye = iconsEye;
		this._iconsEyeSlash = iconsEyeSlash;
		this._iconsWork = work;
	}

	protected onSelect(
		e: InteractionEvent | KeyboardEvent | MouseEvent | TouchEvent | undefined,
		value: DDiagramLayer
	): void {
		if (e != null) {
			const local = this._iconsWork;
			if ("data" in e) {
				this.toLocal(e.data.global, undefined, local);
				if (local.x <= this._iconsEye.width + this.padding.getLeft()) {
					this.emit("eyeclick", e, value, this);
					return;
				}
			}
		}
		super.onSelect(e, value);
	}

	onDblClick(e: MouseEvent | TouchEvent, interactionManager: InteractionManager): boolean {
		const global = UtilPointerEvent.toGlobal(e, interactionManager, this._iconsWork);
		const local = this.toLocal(global, undefined, global);
		if (this._iconsEye.width + this.padding.getLeft() < local.x) {
			return super.onDblClick(e, interactionManager);
		} else {
			this.emit("eyedblclick", e, interactionManager, this);
			return false;
		}
	}
}
