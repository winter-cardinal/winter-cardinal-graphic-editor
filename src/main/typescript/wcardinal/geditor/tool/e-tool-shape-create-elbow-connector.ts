import { EShapeConnectorElbow, EShapeConnectorLine } from "@wcardinal/wcardinal-ui";
import {
	EToolShapeCreateLineConnector,
	EToolShapeCreateLineConnectorOptions
} from "./e-tool-shape-create-line-connector";

export interface EToolShapeCreateElbowConnectorOptions
	extends EToolShapeCreateLineConnectorOptions {}

export class EToolShapeCreateElbowConnector<
	OPTIONS extends EToolShapeCreateElbowConnectorOptions = EToolShapeCreateElbowConnectorOptions
> extends EToolShapeCreateLineConnector<OPTIONS> {
	protected newShape(): EShapeConnectorLine {
		const result = new EShapeConnectorElbow();
		result.fill.alpha = 1;
		return result;
	}
}
