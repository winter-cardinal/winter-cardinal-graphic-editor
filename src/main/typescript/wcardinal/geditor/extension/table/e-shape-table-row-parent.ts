import { EShape, EShapeData } from "@wcardinal/wcardinal-ui";

export interface EShapeTableRowParent {
	data: EShapeData;
	children: EShape[];
	updateUploaded(): void;
}
