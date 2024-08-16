import { DBaseStateSet } from "@wcardinal/wcardinal-ui";
import { DisplayObject, Texture } from "pixi.js";
import { EThemeDefaultButtonCheck } from "./e-theme-default-button-check";
import { iconBuilder } from "../f-icon-builder";

export abstract class EThemeDefaultButtonLock extends EThemeDefaultButtonCheck {
	abstract getTitle(): string;

	override getImageSource(state: DBaseStateSet): Texture | DisplayObject | null {
		if (state.isActive) {
			return iconBuilder.mappings.lock_close;
		} else {
			return iconBuilder.mappings.lock_open;
		}
	}
}
