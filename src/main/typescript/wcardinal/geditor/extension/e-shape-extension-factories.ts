import { UtilSvgAtlasBuilder } from "@wcardinal/wcardinal-ui";
import { Texture } from "pixi.js";
import { EShapeExtensionFactory } from "./e-shape-extension-factory";

const toIconName = (index: number): string => {
	return `extension_factory_icon_${index}`;
};

export class EShapeExtensionFactories {
	protected static _factories: Array<EShapeExtensionFactory<unknown>> = [];

	static add<ITEM>(factory: EShapeExtensionFactory<ITEM>): void {
		this._factories.push(factory as any);
	}

	static each(iteratee: (factory: EShapeExtensionFactory<unknown>) => void): void {
		const factories = this._factories;
		for (let i = 0, imax = factories.length; i < imax; ++i) {
			iteratee(factories[i]);
		}
	}

	static merge(iconBuilder: UtilSvgAtlasBuilder): void {
		const factories = this._factories;
		for (let i = 0, imax = factories.length; i < imax; ++i) {
			const factory = factories[i];
			const icon = factory.icon;
			iconBuilder.add(toIconName(i), icon.width, icon.height, icon.svg);
		}
	}

	static build(icons: Record<string, Texture>): void {
		const factories = this._factories;
		for (let i = 0, imax = factories.length; i < imax; ++i) {
			const factory = factories[i];
			factory.icon.texture = icons[toIconName(i)];
		}
	}
}
