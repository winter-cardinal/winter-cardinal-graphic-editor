import { EShape, EShapeRuntimeImpl } from "@wcardinal/wcardinal-ui";
import { EShapeChartLineActionRuntime } from "./e-shape-chart-line-action-runtime";

export class EShapeChartLineRuntime extends EShapeRuntimeImpl {
	constructor(shape: EShape) {
		super(shape);
		this.actions.push(new EShapeChartLineActionRuntime(shape));
	}
}
