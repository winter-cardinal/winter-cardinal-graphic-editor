import {
	EShapeGroupShadowed,
	EShapeResourceManagerDeserializationMode
} from "@wcardinal/wcardinal-ui";
import { EShapeTableIds } from "./e-shape-table-ids";

export class EShapeTableHeader extends EShapeGroupShadowed {
	constructor(mode: EShapeResourceManagerDeserializationMode, type = EShapeTableIds.HEADER_ID) {
		super(mode, type);
	}
}
