import {
	DDiagramSerializedItem,
	deserializeBase,
	DThemes,
	EShape,
	EShapeResourceManagerDeserialization,
	EShapeResourceManagerDeserializationMode
} from "@wcardinal/wcardinal-ui";
import { EShapeChartLine, EShapeChartLineResourceSerialized } from "./e-shape-chart-line";
import { EShapeChartLineIds } from "./e-shape-chart-line-ids";
import { EShapeExtensions } from "../e-shape-extensions";
import { EEditorShapeChartLine } from "./e-editor-shape-chart-line";
import { EShapeChartLineRuntime } from "./e-shape-chart-line-runtime";
import { EShapeChartAxes } from "./e-shape-chart-axes";
import { EThemeShapeChartLine } from "./e-theme-shape-chart-line";

export class EShapeChartLines {
	static getTheme(): EThemeShapeChartLine {
		return DThemes.get<EThemeShapeChartLine>("EShapeChartLine");
	}

	static deserialize(
		item: DDiagramSerializedItem,
		manager: EShapeResourceManagerDeserialization
	): Promise<EShapeChartLine> | EShapeChartLine | null {
		const shape = new EShapeChartLine(manager.mode);
		const index = item[15];
		const resources = manager.resources;
		if (0 <= index && index < resources.length) {
			let parsed = manager.getExtension<EShapeChartLineResourceSerialized>(index);
			if (parsed == null) {
				parsed = JSON.parse(resources[index]) as EShapeChartLineResourceSerialized;
				manager.setExtension(index, parsed);
			}
			shape.axis.deserialize(parsed[0], manager);
			item[15] = parsed[parsed.length - 1];
		}
		const result = deserializeBase(item, manager, shape);
		shape.size.init();
		return result;
	}

	static create(existing?: EShape): EShapeChartLine {
		const result = new EShapeChartLine(EShapeResourceManagerDeserializationMode.EDITOR);
		if (existing) {
			result.copy(existing);
		}

		// Plot area
		EShapeChartAxes.newPlotArea(result);

		// Line
		EShapeChartAxes.newLine(result);

		// Axis
		EShapeChartAxes.newXAxis(result);
		EShapeChartAxes.newXAxisTickMajor(result);
		EShapeChartAxes.newYAxis(result);
		EShapeChartAxes.newYAxisTickMajor(result);

		if (existing instanceof EShapeChartLine) {
			result.axis.copy(existing.axis);
		}
		return result;
	}

	static load(): void {
		const theme = this.getTheme();
		const name = theme.getName();
		EShapeExtensions.add({
			type: EShapeChartLineIds.ID,
			name,
			icon: {
				width: 24,
				height: 24,
				// Material Icons https://material.io/tools/icons/
				// Available under Apache license version 2.0
				svg:
					`<g transform="scale(26.6666)" fill="#fff" stroke="none">` +
					`<path d="M23,8c0,1.1-0.9,2-2,2c-0.18,0-0.35-0.02-0.51-0.07l-3.56,` +
					`3.55C16.98,13.64,17,13.82,17,14c0,1.1-0.9,2-2,2s-2-0.9-2-2 c0-0.1` +
					`8,0.02-0.36,0.07-0.52l-2.55-2.55C10.36,10.98,10.18,11,10,11c-0.18` +
					`,0-0.36-0.02-0.52-0.07l-4.55,4.56 C4.98,15.65,5,15.82,5,16c0,1.1-` +
					`0.9,2-2,2s-2-0.9-2-2s0.9-2,2-2c0.18,0,0.35,0.02,0.51,0.07l4.56-4.` +
					`55C8.02,9.36,8,9.18,8,9 c0-1.1,0.9-2,2-2s2,0.9,2,2c0,0.18-0.02,0.` +
					`36-0.07,0.52l2.55,2.55C14.64,12.02,14.82,12,15,12c0.18,0,0.36,0.0` +
					`2,0.52,0.07 l3.55-3.56C19.02,8.35,19,8.18,19,8c0-1.1,0.9-2,2-2S23` +
					`,6.9,23,8z"/>` +
					`</g>`
			},
			title: name,
			creator: (existing) => EShapeChartLines.create(existing),
			editor: EEditorShapeChartLine,
			deserializer: (item, manager) => EShapeChartLines.deserialize(item, manager),
			runtime: EShapeChartLineRuntime
		});
	}
}
