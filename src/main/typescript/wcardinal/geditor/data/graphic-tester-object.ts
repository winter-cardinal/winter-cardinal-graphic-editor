import { GraphicTesterObjectValue } from "./graphic-tester-object-value";

export interface GraphicTesterObject {
	[original: string]: GraphicTesterObjectValue | undefined;
}
