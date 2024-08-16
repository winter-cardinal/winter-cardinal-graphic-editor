import { EShape, EShapeCapability } from "@wcardinal/wcardinal-ui";
import { ECommandShapePropertySimple } from "../../command/e-command-shape-property-simple";
import { EShapeChartLine } from "./e-shape-chart-line";

export class ECommandChartTickXMajorCount extends ECommandShapePropertySimple<number> {
	protected override getProperty(shape: EShape, capability: EShapeCapability): number {
		if (shape instanceof EShapeChartLine) {
			return shape.axis.x.tick.major.count;
		}
		return 0;
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: number
	): void {
		if (shape instanceof EShapeChartLine) {
			shape.axis.x.tick.major.count = property;
		}
	}

	protected override isMergeable(): boolean {
		return true;
	}
}
