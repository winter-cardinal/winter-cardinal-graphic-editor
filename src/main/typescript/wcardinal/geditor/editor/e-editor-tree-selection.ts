import {
	DControllers,
	DTableData,
	DTableDataSelectionEachIteratee,
	DTableDataSelectionType,
	DTableDataTreeSelection,
	DTableDataTreeSelectionParent,
	EShape
} from "@wcardinal/wcardinal-ui";
import { utils } from "pixi.js";
import { ECommandShapeSelect } from "../command/e-command-shape-select";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";

const COMPARATOR = (a: [number, unknown], b: [number, unknown]): number => {
	return a[0] - b[0];
};

export class EEditorTreeSelection
	extends utils.EventEmitter
	implements DTableDataTreeSelection<EShape>
{
	protected _parent: DTableDataTreeSelectionParent<EShape>;
	protected _selection: EToolSelectSelection;

	constructor(parent: DTableDataTreeSelectionParent<EShape>, selection: EToolSelectSelection) {
		super();
		this._parent = parent;
		this._selection = selection;
	}

	get parent(): DTableData<EShape> {
		return this._parent;
	}

	get indices(): number[] {
		const selection = this._selection;
		const result: number[] = [];
		this._parent.each((row: EShape, index: number): void => {
			if (selection.contains(row)) {
				result.push(index);
			}
		});
		return result;
	}

	get rows(): EShape[] {
		const selection = this._selection;
		const result: EShape[] = [];
		this._parent.each((row: EShape, index: number): void => {
			if (selection.contains(row)) {
				result.push(row);
			}
		});
		return result;
	}

	get type(): DTableDataSelectionType {
		return DTableDataSelectionType.MULTIPLE;
	}

	get first(): number | null {
		const row = this._selection.first();
		if (row) {
			return this.toIndex(row);
		}
		return null;
	}

	get last(): number | null {
		const row = this._selection.last();
		if (row) {
			return this.toIndex(row);
		}
		return null;
	}

	onNodeChange(nodes?: EShape[]): void {
		// DO NOTHING
	}

	toggle(rowIndex: number): void {
		const row = this._parent.get(rowIndex);
		if (row) {
			const selection = this._selection;
			const before = selection.store();
			selection.toggle(row);
			selection.focus();
			const after = selection.store();
			DControllers.getCommandController().push(
				new ECommandShapeSelect(before, after, selection)
			);
		}
	}

	add(rowIndex: number): void {
		const row = this._parent.get(rowIndex);
		if (row) {
			const selection = this._selection;
			if (!selection.contains(row)) {
				const before = selection.store();
				selection.toggle(row);
				selection.focus();
				const after = selection.store();
				DControllers.getCommandController().push(
					new ECommandShapeSelect(before, after, selection)
				);
			}
		}
	}

	protected toIndex(target: EShape): number | null {
		let result: number | null = null;
		this._parent.each((row: EShape, index: number): boolean => {
			if (target === row) {
				result = index;
				return false;
			}
			return true;
		});
		return result;
	}

	addTo(rowIndex: number): void {
		const last = this._selection.last();
		if (last != null) {
			const index = this.toIndex(last);
			if (index != null) {
				this.addRange(index, false, rowIndex, true);
			}
		}
	}

	addRange(from: number, includeFrom: boolean, to: number, includeTo: boolean): void {
		const rows: EShape[] = [];
		const parent = this._parent;
		const selection = this._selection;
		if (from < to) {
			parent.each(
				(row: EShape): void => {
					if (!selection.contains(row)) {
						rows.push(row);
					}
				},
				from + (includeFrom ? 0 : 1),
				to + (includeTo ? 1 : 0)
			);
		} else {
			parent.each(
				(row: EShape): void => {
					if (!selection.contains(row)) {
						rows.push(row);
					}
				},
				to + (includeTo ? 0 : 1),
				from + (includeFrom ? 1 : 0)
			);
		}
		if (0 < rows.length) {
			const before = selection.store();
			selection.addAll(rows);
			selection.focus();
			const after = selection.store();
			DControllers.getCommandController().push(
				new ECommandShapeSelect(before, after, selection)
			);
		}
	}

	addAll(rowIndices: number[]): void {
		if (0 < rowIndices.length) {
			const rows: EShape[] = [];
			const parent = this._parent;
			const selection = this._selection;
			for (let i = 0, imax = rowIndices.length; i < imax; ++i) {
				const row = parent.get(rowIndices[i]);
				if (row && !selection.contains(row)) {
					rows.push(row);
				}
			}
			if (0 < rows.length) {
				const before = selection.store();
				selection.addAll(rows);
				selection.focus();
				const after = selection.store();
				DControllers.getCommandController().push(
					new ECommandShapeSelect(before, after, selection)
				);
			}
		}
	}

	contains(rowIndex: number): boolean {
		const row = this._parent.get(rowIndex);
		if (row) {
			return this._selection.contains(row);
		}
		return false;
	}

	remove(rowIndex: number): void {
		const row = this._parent.get(rowIndex);
		if (row) {
			const selection = this._selection;
			if (selection.contains(row)) {
				const before = selection.store();
				selection.remove(row);
				selection.focus();
				const after = selection.store();
				DControllers.getCommandController().push(
					new ECommandShapeSelect(before, after, selection)
				);
			}
		}
	}

	clear(): void {
		const selection = this._selection;
		if (!selection.isEmpty()) {
			const before = selection.store();
			selection.clear();
			selection.focus();
			const after = selection.store();
			DControllers.getCommandController().push(
				new ECommandShapeSelect(before, after, selection)
			);
		}
	}

	clearAndAdd(rowIndex: number): void {
		const row = this._parent.get(rowIndex);
		if (row) {
			const selection = this._selection;
			if (selection.contains(row)) {
				if (1 < selection.size()) {
					const before = selection.store();
					selection.set(row);
					selection.focus();
					const after = selection.store();
					DControllers.getCommandController().push(
						new ECommandShapeSelect(before, after, selection)
					);
				} else {
					selection.focus();
				}
			} else {
				const before = selection.store();
				selection.set(row);
				selection.focus();
				const after = selection.store();
				DControllers.getCommandController().push(
					new ECommandShapeSelect(before, after, selection)
				);
			}
		}
	}

	clearAndAddAll(rowIndices: number[]): void {
		const selection = this._selection;
		if (!selection.isEmpty() || 0 < rowIndices.length) {
			const rows: EShape[] = [];
			const parent = this._parent;
			for (let i = 0, imax = rowIndices.length; i < imax; ++i) {
				const row = parent.get(rowIndices[i]);
				if (row) {
					rows.push(row);
				}
			}

			const before = selection.store();
			selection.clearAndAddAll(rows);
			selection.focus();
			const after = selection.store();
			DControllers.getCommandController().push(
				new ECommandShapeSelect(before, after, selection)
			);
		}
	}

	shift(rowIndex: number, amount: number): void {
		// DO NOTHING
	}

	size(): number {
		return this._selection.size();
	}

	isEmpty(): boolean {
		return this._selection.isEmpty();
	}

	each(iteratee: DTableDataSelectionEachIteratee): void {
		const selection = this._selection;
		this._parent.each((row: EShape, index: number): boolean => {
			if (selection.contains(row)) {
				if (iteratee(index) === false) {
					return false;
				}
			}
			return true;
		});
	}

	toArray(): Array<[number, EShape]> {
		const selection = this._selection;
		const result: Array<[number, EShape]> = [];
		this._parent.each((row: EShape, index: number): void => {
			if (selection.contains(row)) {
				result.push([index, row]);
			}
		});
		return result;
	}

	toSortedArray(): Array<[number, EShape]> {
		return this.toArray().sort(COMPARATOR);
	}

	toObject(): Record<number, EShape> {
		const selection = this._selection;
		const result: Record<number, EShape> = {};
		this._parent.each((row: EShape, index: number): void => {
			if (selection.contains(row)) {
				result[index] = row;
			}
		});
		return result;
	}

	toMap(): Map<number, EShape> {
		const selection = this._selection;
		const result = new Map<number, EShape>();
		this._parent.each((row: EShape, index: number): void => {
			if (selection.contains(row)) {
				result.set(index, row);
			}
		});
		return result;
	}
}
