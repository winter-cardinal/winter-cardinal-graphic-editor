import { DApplications, EShape, EShapeRuntimeImpl } from "@wcardinal/wcardinal-ui";
import { InteractionEvent, InteractionManager, Point } from "pixi.js";
import { EShapeTable } from "./e-shape-table";
import { EShapeTableCellActionValueChangeColor } from "./e-shape-table-cell-action-value-change-color";
import {
	EShapeTableRowSelection,
	EShapeTableRowSelectionType
} from "./e-shape-table-row-selection";

export class EShapeTableBodyRuntime extends EShapeRuntimeImpl {
	protected static WORK_POINT = new Point();
	protected lastRowIndex: number;
	protected lastColumnIndex: number;
	protected selection?: EShapeTableRowSelection;

	constructor(shape: EShape) {
		super(shape);
		this.lastRowIndex = -1;
		this.lastColumnIndex = -1;
		this.init(shape);
	}

	protected init(shape: EShape): void {
		const parent = shape.parent;
		if (parent instanceof EShapeTable) {
			this.selection = parent.row.selection;

			const rows = shape.children;
			for (let i = 0, imax = rows.length; i < imax; ++i) {
				const row = rows[i];
				const cells = row.children;
				for (let j = 0, jmax = cells.length; j < jmax; ++j) {
					cells[j].action.add(new EShapeTableCellActionValueChangeColor());
				}
			}
		}
	}

	onClick(shape: EShape, e: InteractionEvent | KeyboardEvent): void {
		super.onClick(shape, e);

		// Update the selection
		const selection = this.selection;
		if (e != null && selection != null && selection.type !== EShapeTableRowSelectionType.NONE) {
			const lastRowIndex = this.lastRowIndex;
			if (0 <= lastRowIndex) {
				const indices = selection.indices;
				const isSingle = selection.type === EShapeTableRowSelectionType.SINGLE;
				const isNotSingle = !isSingle;
				const originalEvent = "data" in e ? e.data.originalEvent : e;
				const ctrlKey = originalEvent.ctrlKey;
				const shiftKey = originalEvent.shiftKey;
				if (isSingle || indices.length <= 0 || !(isNotSingle && (ctrlKey || shiftKey))) {
					selection.clearAndAdd(lastRowIndex);
				} else if (ctrlKey) {
					selection.toggle(lastRowIndex);
				} else if (shiftKey) {
					selection.addTo(lastRowIndex);
				}
			}
		}
	}

	onDblClick(
		shape: EShape,
		e: MouseEvent | TouchEvent,
		interactionManager: InteractionManager
	): boolean {
		const result = super.onDblClick(shape, e, interactionManager);

		// Focus on clicked cell
		const cell = this.getCell(shape, this.lastRowIndex, this.lastColumnIndex);
		if (cell != null) {
			cell.focus();
		}

		return result;
	}

	onOut(shape: EShape, e: InteractionEvent): void {
		super.onOut(shape, e);

		// Clear highlight
		const lastRowIndex = this.lastRowIndex;
		if (0 <= lastRowIndex) {
			this.setRowHovered(shape, lastRowIndex, false);
			this.lastRowIndex = -1;
		}
	}

	onCellTouched(shape: EShape, rowIndex: number, columnIndex: number): void {
		let isChanged = false;

		const lastRowTouched = this.lastRowIndex;
		if (lastRowTouched !== rowIndex) {
			this.setRowHovered(shape, lastRowTouched, false);
			this.setRowHovered(shape, rowIndex, true);
			this.lastRowIndex = rowIndex;
			isChanged = true;
		}

		const lastColumnIndex = this.lastColumnIndex;
		if (lastColumnIndex !== columnIndex) {
			this.lastColumnIndex = columnIndex;
			isChanged = true;
		}

		if (isChanged) {
			const cell = this.getCell(shape, rowIndex, columnIndex);
			shape.title = (cell && cell.text.value) || "";
			const layer = DApplications.getLayer(shape);
			if (layer) {
				layer.view.title = shape.title;
			}
		}
	}

	protected getRow(shape: EShape, index: number): EShape | null {
		const rows = shape.children;
		if (0 <= index && index < rows.length) {
			return rows[index];
		}
		return null;
	}

	protected getCell(shape: EShape, rowIndex: number, columnIndex: number): EShape | null {
		const row = this.getRow(shape, rowIndex);
		if (row != null) {
			const cells = row.children;
			if (0 <= columnIndex && columnIndex < cells.length) {
				return cells[columnIndex];
			}
		}
		return null;
	}

	protected setRowHovered(shape: EShape, index: number, isHovered: boolean): void {
		const row = this.getRow(shape, index);
		if (row != null) {
			const cells = row.children;
			for (let i = 0, imax = cells.length; i < imax; ++i) {
				cells[i].state.isHovered = isHovered;
			}
		}
	}
}
