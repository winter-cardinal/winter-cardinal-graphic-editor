import {
	EShape,
	EShapeGroupShadowed,
	EShapeResourceManagerDeserializationMode,
	EShapeType
} from "@wcardinal/wcardinal-ui";
import { EShapeTableBodyRuntime } from "./e-shape-table-body-runtime";
import { EShapeTableIds } from "./e-shape-table-ids";

export class EShapeTableBody extends EShapeGroupShadowed {
	constructor(
		mode: EShapeResourceManagerDeserializationMode,
		type: EShapeType = EShapeTableIds.BODY_ID
	) {
		super(mode, type);
	}

	containsAbs(x: number, y: number, ax: number, ay: number): boolean {
		if (this.containsAbsBBox(x, y, ax, ay)) {
			const children = this.children;
			if (0 < children.length) {
				const first = children[0];
				const rowIndex = ((ay + y) / first.size.y) | 0;
				if (rowIndex < children.length) {
					const cells = first.children;
					for (let i = 0, imax = cells.length; i < imax; ++i) {
						const cell = cells[i];
						const cx = cell.transform.position.x;
						const csx = 0.5 * cell.size.x;
						if (x < cx + csx) {
							const runtime = this.runtime;
							if (runtime instanceof EShapeTableBodyRuntime) {
								runtime.onCellTouched(this, rowIndex, i);
							}
							return true;
						}
					}
					return true;
				} else {
					return false;
				}
			}
		}
		return false;
	}

	protected containsText(x: number, y: number): EShape | null {
		return null;
	}

	protected containsChildren(x: number, y: number): EShape | null {
		return null;
	}
}
