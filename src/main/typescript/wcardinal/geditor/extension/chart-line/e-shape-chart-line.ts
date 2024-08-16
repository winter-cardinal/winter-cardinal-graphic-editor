import {
	DDiagramSerializedItem,
	EShape,
	EShapeCopyPart,
	EShapeGroup,
	EShapeResourceManagerDeserializationMode,
	EShapeResourceManagerSerialization,
	EShapeType
} from "@wcardinal/wcardinal-ui";
import { EShapeChartAxis } from "./e-shape-chart-axis";
import { EShapeChartLineIds } from "./e-shape-chart-line-ids";

export type EShapeChartLineResourceSerialized = [number, number, number];

export class EShapeChartLine extends EShapeGroup {
	axis: EShapeChartAxis;

	constructor(
		mode: EShapeResourceManagerDeserializationMode,
		type: EShapeType = EShapeChartLineIds.ID
	) {
		super(mode, type);
		this.axis = new EShapeChartAxis();
	}

	copy(source: EShape, part: EShapeCopyPart = EShapeCopyPart.ALL): this {
		const result = super.copy(source, part);
		if (source instanceof EShapeChartLine) {
			this.axis.copy(source.axis);
		}
		return result;
	}

	serialize(manager: EShapeResourceManagerSerialization): DDiagramSerializedItem {
		const result = super.serialize(manager);
		const resource = result[15];
		result[15] = manager.addResource(`[${this.axis.serialize(manager)},${resource}]`);
		return result;
	}
}
