import { EShapeActionValueDeserializers } from "@wcardinal/wcardinal-ui";
import { EShapeActionExtension } from "./e-shape-action-extension";

export class EShapeActionExtensions {
	protected static _extensions?: EShapeActionExtension[];
	protected static _typeToExtension?: Map<number, EShapeActionExtension>;

	static add(extension: EShapeActionExtension): void {
		(this._typeToExtension ??= new Map<number, EShapeActionExtension>()).set(
			extension.type,
			extension
		);
		(this._extensions ??= []).push(extension);
		EShapeActionValueDeserializers[extension.type] = extension.deserializer;
	}

	static get(type: number): EShapeActionExtension | undefined {
		const typeToExtension = this._typeToExtension;
		if (typeToExtension != null) {
			return typeToExtension.get(type);
		}
	}

	static each(iteratee: (extension: EShapeActionExtension) => void): void {
		const extensions = this._extensions;
		if (extensions != null) {
			for (let i = 0, imax = extensions.length; i < imax; ++i) {
				const extension = extensions[i];
				iteratee(extension);
			}
		}
	}
}
