import { EShape, EShapeContainer } from "@wcardinal/wcardinal-ui";
import { UtilShapeSearch } from "./util-shape-search";

export class UtilShapeDeleter {
	private static EXCEPTIONS?: Set<EShape>;

	private static addAll(shapes: EShape[], result: Set<EShape>): Set<EShape> {
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			result.add(shape);
			this.addAll(shape.children, result);
		}
		return result;
	}

	static delete(
		parent: EShape | EShapeContainer,
		shapes?: EShape[],
		generateDeletedShapeList?: boolean,
		deletedShapeSet?: Set<EShape>
	): EShape[] | null {
		const children = parent.children;
		const length = children.length;

		// Update indices
		deletedShapeSet ??= UtilShapeDeleter.EXCEPTIONS ??= new Set<EShape>();
		for (let i = 0; i < length; ++i) {
			const child = children[i];
			if (child.selected) {
				child.index = length + i;
				deletedShapeSet.add(child);
				this.addAll(child.children, deletedShapeSet);
			} else {
				child.index = i;
			}
		}

		// Sort
		children.sort(UtilShapeSearch.COMPARATOR_INDEX);

		// Detach
		if (generateDeletedShapeList === true) {
			for (let i = length - 1; 0 <= i; --i) {
				const child = children[i];
				if (child.selected) {
					child.index -= length;
					child.parent = null;
					child.selected = false;
					child.uploaded = undefined;
					child.onDetach(deletedShapeSet);
				} else {
					if (UtilShapeDeleter.EXCEPTIONS === deletedShapeSet) {
						deletedShapeSet.clear();
					}
					const size = children.length - (i + 1);
					if (0 < size) {
						const result = children.splice(i + 1, size);
						if (shapes != null) {
							shapes.length = 0;
						}
						parent.onChildTransformChange();
						parent.toDirty();
						return result;
					} else {
						if (shapes != null) {
							shapes.length = 0;
						}
						return null;
					}
				}
			}
			if (UtilShapeDeleter.EXCEPTIONS === deletedShapeSet) {
				deletedShapeSet.clear();
			}
			if (0 < children.length) {
				const result = children.splice(0, children.length);
				if (shapes != null) {
					shapes.length = 0;
				}
				parent.onChildTransformChange();
				parent.toDirty();
				return result;
			} else {
				if (shapes != null) {
					shapes.length = 0;
				}
				return null;
			}
		} else {
			for (let i = length - 1; 0 <= i; --i) {
				const child = children[i];
				if (child.selected) {
					child.parent = null;
					child.selected = false;
					child.uploaded = undefined;
					child.onDetach(deletedShapeSet);
				} else {
					if (UtilShapeDeleter.EXCEPTIONS === deletedShapeSet) {
						deletedShapeSet.clear();
					}
					children.length = i + 1;
					if (shapes != null) {
						shapes.length = 0;
					}
					parent.onChildTransformChange();
					parent.toDirty();
					return null;
				}
			}
			if (UtilShapeDeleter.EXCEPTIONS === deletedShapeSet) {
				deletedShapeSet.clear();
			}
			if (0 < children.length) {
				children.length = 0;
				if (shapes != null) {
					shapes.length = 0;
				}
				parent.onChildTransformChange();
				parent.toDirty();
			} else {
				if (shapes != null) {
					shapes.length = 0;
				}
			}
			return null;
		}
	}
}
