/*
 * Copyright (C) 2019 Toshiba Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { EShapeConnector, EShapeEditor } from "@wcardinal/wcardinal-ui";
import { Matrix, Point } from "pixi.js";
import { UtilShapeTransforms } from "./util-shape-transforms";

export class UtilShapeConnectorTransformData extends EShapeEditor {
	tailVector: Point;
	headVector: Point;

	constructor() {
		super();
		this.tailVector = new Point();
		this.headVector = new Point();
	}
}

export class UtilShapeConnectorTransforms {
	static prepare(connector: EShapeConnector): void {
		let editor: UtilShapeConnectorTransformData | null = null;
		if (connector.editor instanceof UtilShapeConnectorTransformData) {
			editor = connector.editor;
		} else {
			editor = new UtilShapeConnectorTransformData();
			connector.editor = editor;
		}

		// Edges
		const tailVector = editor.tailVector;
		const headVector = editor.headVector;
		const edge = connector.edge;
		edge.tail.local.copyTo(tailVector);
		edge.head.local.copyTo(headVector);
		const localTransform = connector.transform.localTransform;
		localTransform.applyInverse(tailVector, tailVector);
		localTransform.applyInverse(headVector, headVector);

		// Other preparations
		UtilShapeTransforms.prepare(connector);
	}

	static finalize(connector: EShapeConnector): void {
		UtilShapeTransforms.finalize(connector);
	}

	static apply(connector: EShapeConnector, transform: Matrix): void {
		const editor = connector.editor;
		if (editor instanceof UtilShapeConnectorTransformData) {
			const localTransform = editor.localTransform;
			editor.internalTransformParentInverse
				.copyTo(localTransform)
				.append(transform)
				.append(editor.internalTransform);

			const a = localTransform.a;
			const b = localTransform.b;
			const c = localTransform.c;
			const d = localTransform.d;
			const tx = localTransform.tx;
			const ty = localTransform.ty;

			const edge = connector.edge;
			const tail = edge.tail;
			const head = edge.head;
			const editorTailVector = editor.tailVector;
			const editorTailVectorX = editorTailVector.x;
			const editorTailVectorY = editorTailVector.y;
			const newTailLocalX = a * editorTailVectorX + c * editorTailVectorY + tx;
			const newTailLocalY = b * editorTailVectorX + d * editorTailVectorY + ty;
			const editorHeadVector = editor.headVector;
			const editorHeadVectorX = editorHeadVector.x;
			const editorHeadVectorY = editorHeadVector.y;
			const newHeadLocalX = a * editorHeadVectorX + c * editorHeadVectorY + tx;
			const newHeadLocalY = b * editorHeadVectorX + d * editorHeadVectorY + ty;
			edge.lock();
			tail.local.set(newTailLocalX, newTailLocalY);
			head.local.set(newHeadLocalX, newHeadLocalY);
			edge.unlock();
		}
	}
}
