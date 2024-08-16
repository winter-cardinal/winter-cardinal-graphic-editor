import {
	DDiagramSerializedItem,
	EShape,
	EShapeCopyPart,
	EShapeGroupShadowed,
	EShapeLockPart,
	EShapeRectangle,
	EShapeResourceManagerDeserializationMode,
	EShapeResourceManagerSerialization,
	EShapeType
} from "@wcardinal/wcardinal-ui";
import { EShapeTableCell } from "./e-shape-table-cell";
import { EShapeTableColumn } from "./e-shape-table-column";
import { EShapeTableIds } from "./e-shape-table-ids";
import { EShapeTableRow } from "./e-shape-table-row";

export type EShapeTableResourceSerialized = [number, number, number];

export class EShapeTable extends EShapeGroupShadowed {
	column: EShapeTableColumn;
	row: EShapeTableRow;
	cell: EShapeTableCell;
	protected _columnWidths: number[] = [];
	protected _columnXs: number[] = [];

	constructor(
		mode: EShapeResourceManagerDeserializationMode,
		type: EShapeType = EShapeTableIds.ID
	) {
		super(mode, type);

		this.column = new EShapeTableColumn(() => {
			this.onColumnChange();
		});
		this.row = new EShapeTableRow(this, () => {
			this.onRowChange();
		});
		this.cell = new EShapeTableCell(this);
	}

	protected onColumnChange(): void {
		this.newCellsHeader();
		this.newCellsBody(true);
		this.layoutCells();
	}

	protected onRowChange(): void {
		this.newCellsBody(false);
		this.layoutCells();
	}

	onSizeChange(): void {
		super.onSizeChange();
		this.newCellsBody(false);
		this.layoutCells();
	}

	protected newCellsHeader(): void {
		if (this.children.length <= 0) {
			return;
		}
		const header = this.children[0];
		const column = this.column;
		const columnCount = column.size();
		const values = column.values;

		// Create / delete children
		const children = header.children;
		const childrenLength = children.length;
		if (childrenLength < columnCount) {
			const master = children[childrenLength - 1] || this;
			for (let i = childrenLength; i < columnCount; ++i) {
				const cell = new EShapeRectangle().copy(master);
				cell.text.value = values[i].header.label;
				cell.attach(header);
			}
		} else if (columnCount < childrenLength) {
			for (let i = childrenLength - 1; columnCount <= i; --i) {
				children[i].detach();
			}
		}

		// Update text
		for (let i = 0; i < columnCount; ++i) {
			children[i].text.value = values[i].header.label;
		}
	}

	protected toRowCountRequired(): number {
		return Math.min(1000, Math.max(1, Math.floor(Math.abs(this.size.y) / this.row.height))) - 1;
	}

	protected newCellsBody(isColumnDirty: boolean): void {
		// Rows
		if (this.children.length <= 1) {
			return;
		}
		const body = this.children[1];
		const rows = body.children;
		const rowsLength = rows.length;
		const rowCountRequired = this.toRowCountRequired();
		const rowCount = Math.max(2, rowCountRequired);
		if (rowsLength < rowCount) {
			const masterEven = (0 < rowsLength ? rows[0] : null) || this;
			const masterOdd = (1 < rowsLength ? rows[1] : null) || this;
			const mode = this.mode;
			for (let irow = rowsLength; irow < rowCount; ++irow) {
				const master = irow % 2 === 0 ? masterEven : masterOdd;
				new EShapeGroupShadowed(mode).copy(master, EShapeCopyPart.ACTION).attach(body);
			}
		} else if (rowCount < rowsLength) {
			for (let i = rowsLength - 1; rowCount <= i; --i) {
				rows[i].detach();
			}
		}
		if (0 < rows.length) {
			rows[0].visible = 0 < rowCountRequired;
		}
		if (1 < rows.length) {
			rows[1].visible = 1 < rowCountRequired;
		}

		// Cells
		const masterCellEven = (0 < rows.length ? rows[0].children[0] : null) || this;
		const masterCellOdd = (1 < rows.length ? rows[1].children[0] : null) || this;
		const column = this.column;
		const columnValues = column.values;
		const columnCount = column.size();
		for (let irow = 0; irow < rowCount; ++irow) {
			const columnCountRequired = irow <= 1 ? Math.max(1, columnCount) : columnCount;
			const row = rows[irow];
			const cells = row.children;
			const cellsLength = cells.length;
			const master = irow % 2 === 0 ? masterCellEven : masterCellOdd;
			if (cellsLength < columnCountRequired) {
				for (let icolumn = cellsLength; icolumn < columnCountRequired; ++icolumn) {
					new EShapeRectangle().copy(master).attach(row);
				}
			} else if (columnCountRequired < cellsLength) {
				for (let i = cellsLength - 1; columnCountRequired <= i; --i) {
					cells[i].detach();
				}
			}
			if (0 < cells.length) {
				cells[0].visible = 0 < columnCount;
			}
			if (1 < cells.length) {
				cells[1].visible = 1 < columnCount;
			}
			if (isColumnDirty) {
				for (let i = 0; i < columnCount; ++i) {
					cells[i].text.align.horizontal = columnValues[i].align;
				}
			}
		}
	}

	protected layoutCells(): void {
		if (this.children.length <= 1) {
			return;
		}
		const rowHeight = this.row.height;
		const rowHeightHalf = rowHeight * 0.5;
		const column = this.column;
		const size = this.size;
		const sizeX = size.x;
		const sizeY = size.y;
		const sxh = -sizeX * 0.5;
		const syh = -sizeY * 0.5;

		const columnValues = column.values;
		const columnValuesLength = columnValues.length;

		// Total weight
		let totalWeight = 0;
		for (let i = 0; i < columnValuesLength; ++i) {
			totalWeight += columnValues[i].weight;
		}
		totalWeight = Math.max(0.00001, totalWeight);

		// Column width and x position
		const columnWidths = this._columnWidths;
		const columnXs = this._columnXs;
		const columnWidthFactor = sizeX / totalWeight;
		let columnX = 0;
		for (let i = 0; i < columnValuesLength; ++i) {
			const columnWidth = columnValues[i].weight * columnWidthFactor;
			columnWidths[i] = columnWidth;
			columnXs[i] = columnX + columnWidth * 0.5;
			columnX += columnWidth;
		}

		// Header
		const header = this.children[0];
		header.lock(EShapeLockPart.ALL);
		header.size.set(sizeX, rowHeight);
		header.transform.position.set(0, syh + rowHeightHalf);
		header.unlock(EShapeLockPart.ALL, true);

		const hcells = header.children;
		const hcellsLength = hcells.length;
		for (let icolumn = 0; icolumn < hcellsLength; ++icolumn) {
			const hcell = hcells[icolumn];
			hcell.lock(EShapeLockPart.ALL);
			hcell.size.set(columnWidths[icolumn], rowHeight);
			hcell.transform.position.set(sxh + columnXs[icolumn], 0);
			hcell.unlock(EShapeLockPart.ALL, true);
		}

		// Body
		const body = this.children[1];
		body.lock(EShapeLockPart.ALL);
		body.size.set(sizeX, sizeY - rowHeight);
		body.transform.position.set(0, rowHeightHalf);
		body.unlock(EShapeLockPart.ALL, true);

		const rows = body.children;
		const rowsLength = rows.length;
		for (let irow = 0, y = syh + rowHeight; irow < rowsLength; ++irow, y += rowHeight) {
			const row = rows[irow];
			row.lock(EShapeLockPart.ALL);
			row.size.set(sizeX, rowHeight);
			row.transform.position.set(0, y);
			row.unlock(EShapeLockPart.ALL, true);

			const cells = row.children;
			const cellsLength = cells.length;
			for (let icolumn = 0; icolumn < cellsLength; ++icolumn) {
				const cell = cells[icolumn];
				cell.lock(EShapeLockPart.ALL);
				cell.size.set(columnWidths[icolumn], rowHeight);
				cell.transform.position.set(sxh + columnXs[icolumn], 0);
				cell.unlock(EShapeLockPart.ALL, true);
			}
		}
	}

	copy(source: EShape, part: EShapeCopyPart = EShapeCopyPart.ALL): this {
		const result = super.copy(source, part);
		if (source instanceof EShapeTable) {
			this.column.copy(source.column);
			this.row.copy(source.row);
		}
		return result;
	}

	serialize(manager: EShapeResourceManagerSerialization): DDiagramSerializedItem {
		const result = super.serialize(manager);
		const resource = result[15];
		result[15] = manager.addResource(
			`[${this.column.serialize(manager)},${this.row.serialize(manager)},${resource}]`
		);
		return result;
	}
}
