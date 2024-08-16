import {
	createGroupUploaded,
	EShapeCapabilities,
	EShapeDeserializers,
	EShapeOnDeserializeds,
	EShapeRuntimes,
	EShapeType,
	EShapeUploadeds,
	UtilSvgAtlasBuilder
} from "@wcardinal/wcardinal-ui";
import { Texture } from "pixi.js";
import { EShapeExtension } from "./e-shape-extension";

const toIconName = (index: number): string => {
	return `extension_icon_${index}`;
};

export class EShapeExtensions {
	protected static _extensions?: EShapeExtension[];
	protected static _typeToExtension?: Map<EShapeType, EShapeExtension>;

	static add(extension: EShapeExtension): void {
		if ("type" in extension) {
			const type = extension.type;

			// Name
			(this._typeToExtension ??= new Map<EShapeType, EShapeExtension>()).set(type, extension);

			// Deserializer
			const deserializer = extension.deserializer;
			if (deserializer != null) {
				EShapeDeserializers[type] = deserializer;
			}

			// OnDeserialized
			const onDeserialized = extension.onDeserialized;
			if (onDeserialized != null) {
				EShapeOnDeserializeds[type] = onDeserialized;
			}

			// Runtime
			const runtime = extension.runtime;
			if (runtime) {
				EShapeRuntimes[type] = runtime;
			}

			// Capability
			const capability = extension.capability;
			if (capability != null) {
				EShapeCapabilities.set(type, capability);
			}

			// Uploaded
			const uploaded = extension.uploaded;
			if (uploaded != null) {
				EShapeUploadeds[type] = uploaded;
			} else {
				if (EShapeUploadeds[type] == null) {
					EShapeUploadeds[type] = createGroupUploaded;
				}
			}
		}
		(this._extensions ??= []).push(extension);
	}

	static get(type: EShapeType): EShapeExtension | undefined {
		const typeToExtension = this._typeToExtension;
		if (typeToExtension != null) {
			return typeToExtension.get(type);
		}
	}

	static each(iteratee: (extension: EShapeExtension) => void): void {
		const extensions = this._extensions;
		if (extensions != null) {
			for (let i = 0, imax = extensions.length; i < imax; ++i) {
				const extension = extensions[i];
				iteratee(extension);
			}
		}
	}

	static merge(iconBuilder: UtilSvgAtlasBuilder): void {
		const extensions = this._extensions;
		if (extensions != null) {
			for (let i = 0, imax = extensions.length; i < imax; ++i) {
				const extension = extensions[i];
				if ("icon" in extension) {
					const icon = extension.icon;
					iconBuilder.add(toIconName(i), icon.width, icon.height, icon.svg);
				}
			}
		}
	}

	static build(icons: Record<string, Texture>): void {
		const extensions = this._extensions;
		if (extensions != null) {
			for (let i = 0, imax = extensions.length; i < imax; ++i) {
				const extension = extensions[i];
				if ("icon" in extension) {
					extension.icon.texture = icons[toIconName(i)];
				}
			}
		}
	}
}
