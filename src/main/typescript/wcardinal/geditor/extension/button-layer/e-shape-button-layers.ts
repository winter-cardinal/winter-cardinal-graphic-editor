import {
	createGroupUploaded,
	DDiagramSerializedItem,
	deserializeBase,
	DThemes,
	EShape,
	EShapeCapability,
	EShapeResourceManagerDeserialization,
	EShapeResourceManagerDeserializationMode
} from "@wcardinal/wcardinal-ui";
import { EShapeButtonLayer, EShapeButtonLayerResourceSerialized } from "./e-shape-button-layer";
import { EShapeButtonLayerButtonValue } from "./e-shape-button-layer-button-value";
import { EShapeExtensions } from "../e-shape-extensions";
import { EShapeButtonLayerIds } from "./e-shape-button-layer-ids";
import { EEditorShapeButtonLayer } from "./e-editor-shape-button-layer";
import { EThemeShapeButtonLayer } from "./e-theme-shape-button-layer";

export class EShapeButtonLayers {
	static getTheme(): EThemeShapeButtonLayer {
		return DThemes.get<EThemeShapeButtonLayer>("EShapeButtonLayer");
	}

	static create(existing?: EShape): EShapeButtonLayer {
		const result = new EShapeButtonLayer(EShapeResourceManagerDeserializationMode.EDITOR);
		if (existing) {
			result.copy(existing);
			if (!(existing instanceof EShapeButtonLayer)) {
				const label = this.getTheme().getLabel();
				result.button.add(
					new EShapeButtonLayerButtonValue(label, 1, [], false, true, false)
				);
			}
		} else {
			const label = this.getTheme().getLabel();
			result.button.add(new EShapeButtonLayerButtonValue(label, 1, [], false, true, false));
		}
		result.onSizeChange();
		return result;
	}

	static load(): void {
		const theme = this.getTheme();
		const name = theme.getName();
		EShapeExtensions.add({
			type: EShapeButtonLayerIds.ID,
			name: name,
			icon: {
				width: 24,
				height: 24,
				// Material Icons https://material.io/tools/icons/
				// Available under Apache license version 2.0
				svg:
					`<g transform="scale(26.6666)" fill="#fff" stroke="none">` +
					`<path d="M22,9v6c0,1.1-0.9,2-2,2h-1l0-2h1V9H4v6h6v2H4c-1.1,0-2` +
					`-0.9-2-2V9c0-1.1,0.9-2,2-2h16C21.1,7,22,7.9,22,9z"/>` +
					`<path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7` +
					`.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.` +
					`26 9 12 4.53z" transform="translate(7.25,8) scale(0.6)"/>` +
					`</g>`
			},
			title: name,
			creator: (existing) => EShapeButtonLayers.create(existing),
			deserializer: (item, manager) => EShapeButtonLayers.deserialize(item, manager),
			editor: EEditorShapeButtonLayer,
			uploaded: createGroupUploaded,
			capability:
				(EShapeCapability.PRIMITIVE |
					EShapeCapability.STROKE_SIDE |
					EShapeCapability.BORDER_RADIUS) &
				~EShapeCapability.CHILDREN
		});
	}

	static deserialize(
		item: DDiagramSerializedItem,
		manager: EShapeResourceManagerDeserialization
	): Promise<EShapeButtonLayer> | EShapeButtonLayer | null {
		const shape = new EShapeButtonLayer(manager.mode);
		const index = item[15];
		const resources = manager.resources;
		if (0 <= index && index < resources.length) {
			let parsed = manager.getExtension<EShapeButtonLayerResourceSerialized>(index);
			if (parsed == null) {
				parsed = JSON.parse(resources[index]) as EShapeButtonLayerResourceSerialized;
				manager.setExtension(index, parsed);
			}
			shape.button.deserialize(parsed[0], manager);
			item[15] = parsed[parsed.length - 1];
		}
		const result = deserializeBase(item, manager, shape);
		shape.size.init();
		return result;
	}
}
