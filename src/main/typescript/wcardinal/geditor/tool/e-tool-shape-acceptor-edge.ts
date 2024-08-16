import {
	DDiagramCanvasEditor,
	DDiagramEditor,
	EShape,
	EShapeAcceptorEdge,
	EShapeAcceptorEdgeType,
	EShapeAcceptors,
	EShapeCapabilities,
	EShapeCapability,
	EShapeConnectorLine
} from "@wcardinal/wcardinal-ui";
import { IPoint, Matrix, Point } from "pixi.js";
import { EToolShapeAcceptorEdgeRenderer } from "./e-tool-shape-acceptor-edge-renderer";

export interface EToolShapeAcceptorEdgeFound {
	shape: EShape;
	id: string;
	x: number | null;
	y: number | null;
	acceptor: EShapeAcceptorEdge;
	matrix: Matrix;
	local: IPoint;
	center: IPoint;
	distance: number;
}

const SIZE = 10;

export class EToolShapeAcceptorEdge {
	protected _diagram: DDiagramEditor;
	protected _edges?: Map<number, EToolShapeAcceptorEdgeFound[]>;
	protected _shape?: EShape | null;
	protected _canvasMode: boolean;
	protected _renderer: EToolShapeAcceptorEdgeRenderer;
	protected _work: Set<EToolShapeAcceptorEdgeFound>;

	constructor(diagram: DDiagramEditor, canvasMode: boolean) {
		this._diagram = diagram;
		this._canvasMode = canvasMode;
		this._renderer = new EToolShapeAcceptorEdgeRenderer(this);
		this._work = new Set<EToolShapeAcceptorEdgeFound>();
	}

	begin(canvas: DDiagramCanvasEditor | null, shape: EShape | null): void {
		this.clear();
		this._shape = shape;
		if (canvas != null) {
			this._renderer.begin(canvas);
		}
	}

	end(): void {
		this._renderer.end();
		this.clear();
	}

	update(type: EShapeAcceptorEdgeType, x: number, y: number): void {
		this._renderer.update(type, x, y);
	}

	show(): void {
		this._renderer.visible = true;
	}

	hide(): void {
		this._renderer.visible = false;
	}

	protected get edges(): Map<number, EToolShapeAcceptorEdgeFound[]> {
		let result = this._edges;
		if (result == null) {
			result = this.newEdges();
			this._edges = result;
		}
		return result;
	}

	protected newEdges(): Map<number, EToolShapeAcceptorEdgeFound[]> {
		const result = new Map<number, EToolShapeAcceptorEdgeFound[]>();
		const layer = this._diagram.layer;
		if (layer) {
			let layerPositionX = 0;
			let layerPositionY = 0;
			if (this._canvasMode) {
				const layerPosition = layer.transform.position;
				layerPositionX = layerPosition.x;
				layerPositionY = layerPosition.y;
			}
			const shape = this._shape;
			if (shape != null) {
				const shapeParent = shape.parent;
				if (shapeParent != null) {
					this.addAll(shapeParent.children, layerPositionX, layerPositionY, result);
				}
			} else {
				this.addAll(layer.children, layerPositionX, layerPositionY, result);
			}
		}
		return result;
	}

	protected addAll(
		shapes: EShape[],
		lx: number,
		ly: number,
		result: Map<number, EToolShapeAcceptorEdgeFound[]>
	): void {
		for (let i = 0, imax = shapes.length; i < imax; ++i) {
			const shape = shapes[i];
			if (!(shape instanceof EShapeConnectorLine)) {
				const size = shape.size;
				const sx = size.x;
				const sy = size.y;

				const transform = shape.transform;
				const internal = transform.internalTransform;
				const a = internal.a;
				const b = internal.b;
				const c = internal.c;
				const d = internal.d;

				const pivot = transform.pivot;
				const px = pivot.x;
				const py = pivot.y;

				const matrix = new Matrix(
					a * sx,
					b * sx,
					c * sy,
					d * sy,
					internal.tx + lx + (a * px + c * py),
					internal.ty + ly + (b * px + d * py)
				);

				EShapeAcceptors.get(shape.type).each(shape, (edge, id): void => {
					this.add(matrix, id, edge, shape, result);
				});

				if (EShapeCapabilities.contains(shape, EShapeCapability.CHILDREN)) {
					const children = shape.children;
					if (children) {
						this.addAll(children, lx, ly, result);
					}
				}
			}
		}
	}

	protected add(
		matrix: Matrix,
		id: string,
		acceptorEdge: EShapeAcceptorEdge,
		shape: EShape,
		coordinateToEdges: Map<number, EToolShapeAcceptorEdgeFound[]>
	): void {
		const aes = acceptorEdge.size;
		const aesx = aes.x;
		const aesy = aes.y;
		const aex = acceptorEdge.x;
		const aey = acceptorEdge.y;
		const a = matrix.a;
		const b = matrix.b;
		const c = matrix.c;
		const d = matrix.d;
		const tx = matrix.tx;
		const ty = matrix.ty;
		const x = a * aex + c * aey + tx;
		const y = b * aex + d * aey + ty;

		const edge: EToolShapeAcceptorEdgeFound = {
			shape,
			id,
			x: null,
			y: null,
			acceptor: acceptorEdge,
			matrix,
			local: new Point(x, y),
			center: new Point(x, y),
			distance: 0
		};
		if (aesx === 0 && aesy === 0) {
			const gx = this.toGridIndex(x);
			const gy = this.toGridIndex(y);
			const coordinate = this.toCoordinate(gx, gy);
			const edges = coordinateToEdges.get(coordinate);
			if (edges == null) {
				coordinateToEdges.set(coordinate, [edge]);
			} else {
				edges.push(edge);
			}
		} else {
			const aesxh = aesx * 0.5;
			const aesyh = aesy * 0.5;
			const aex0 = aex - aesxh;
			const aey0 = aey - aesyh;
			const aex1 = aex + aesxh;
			const aey1 = aey - aesyh;
			const aex2 = aex + aesxh;
			const aey2 = aey + aesyh;
			const aex3 = aex - aesxh;
			const aey3 = aey + aesyh;
			const x0 = a * aex0 + c * aey0;
			const y0 = b * aex0 + d * aey0;
			const x1 = a * aex1 + c * aey1;
			const y1 = b * aex1 + d * aey1;
			const x2 = a * aex2 + c * aey2;
			const y2 = b * aex2 + d * aey2;
			const x3 = a * aex3 + c * aey3;
			const y3 = b * aex3 + d * aey3;
			const x4 = Math.min(x0, x1, x2, x3) + tx;
			const y4 = Math.min(y0, y1, y2, y3) + ty;
			const x5 = Math.max(x0, x1, x2, x3) + tx;
			const y5 = Math.max(y0, y1, y2, y3) + ty;
			const ix0 = Math.floor(x4 / SIZE);
			const iy0 = Math.floor(y4 / SIZE);
			const ix1 = Math.ceil(x5 / SIZE);
			const iy1 = Math.ceil(y5 / SIZE);
			for (let ix = ix0; ix <= ix1; ++ix) {
				for (let iy = iy0; iy <= iy1; ++iy) {
					const coordinate = this.toCoordinate(ix, iy);
					const edges = coordinateToEdges.get(coordinate);
					if (edges == null) {
						coordinateToEdges.set(coordinate, [edge]);
					} else {
						edges.push(edge);
					}
				}
			}
		}
	}

	protected toCoordinate(ix: number, iy: number): number {
		return (ix % 1024) + (iy % 1024 << 10);
	}

	protected toGridIndex(x: number): number {
		return Math.round(x / SIZE);
	}

	find(type: EShapeAcceptorEdgeType, x: number, y: number): EToolShapeAcceptorEdgeFound | null {
		let result: EToolShapeAcceptorEdgeFound | null = null;
		let distance = 0;
		const edges = this.edges;
		const threshold = SIZE * SIZE;
		for (let ix = -SIZE; ix <= SIZE; ix += SIZE) {
			for (let iy = -SIZE; iy <= SIZE; iy += SIZE) {
				const gix = this.toGridIndex(x + ix);
				const giy = this.toGridIndex(y + iy);
				const foundEdges = edges.get(this.toCoordinate(gix, giy));
				if (foundEdges == null) {
					continue;
				}
				for (let i = 0, imax = foundEdges.length; i < imax; ++i) {
					const foundEdge = foundEdges[i];
					const acceptorEdge = foundEdge.acceptor;
					if ((acceptorEdge.type & type) === 0) {
						continue;
					}
					const size = acceptorEdge.size;
					const sx = size.x;
					const sy = size.y;
					if (sx === 0 && sy === 0) {
						const center = foundEdge.center;
						const dx = x - center.x;
						const dy = y - center.y;
						const dd = dx * dx + dy * dy;
						if (dd <= threshold && (result == null || dd < distance)) {
							result = foundEdge;
							distance = dd;
						}
					} else {
						const matrix = foundEdge.matrix;
						const a = matrix.a;
						const b = matrix.b;
						const c = matrix.c;
						const d = matrix.d;
						const tx = matrix.tx;
						const ty = matrix.ty;
						const det = a * d - c * b;
						if (0.0000001 < Math.abs(det)) {
							const di = 1 / det;
							const xtx = x - tx;
							const yty = y - ty;
							const lx = (+d * xtx - c * yty) * di;
							const ly = (-b * xtx + a * yty) * di;
							const sxh = sx * 0.5;
							const syh = sy * 0.5;
							const aex = acceptorEdge.x;
							const aey = acceptorEdge.y;
							const lx0 = aex - sxh;
							const ly0 = aey - syh;
							const lx1 = aex + sxh;
							const ly1 = aey + syh;
							const lx2 = Math.min(lx1, Math.max(lx0, lx));
							const ly2 = Math.min(ly1, Math.max(ly0, ly));
							const x0 = a * lx2 + c * ly2 + tx;
							const y0 = b * lx2 + d * ly2 + ty;
							const dx = x - x0;
							const dy = y - y0;
							const dd = dx * dx + dy * dy;
							if (dd <= threshold && (result == null || dd < distance)) {
								result = foundEdge;
								result.x = lx2;
								result.y = ly2;
								result.local.set(x0, y0);
								distance = dd;
							}
						} else {
							const center = foundEdge.center;
							const dx = x - center.x;
							const dy = y - center.y;
							const dd = dx * dx + dy * dy;
							if (dd <= threshold && (result == null || dd < distance)) {
								result = foundEdge;
								distance = dd;
							}
						}
					}
				}
			}
		}
		return result;
	}

	findAll(
		type: EShapeAcceptorEdgeType,
		x: number,
		y: number,
		range: number,
		limit: number,
		result: EToolShapeAcceptorEdgeFound[]
	): EToolShapeAcceptorEdgeFound[] {
		const edges = this.edges;
		range = Math.ceil(range / SIZE) * SIZE;
		const threshold = range * range;
		const work = this._work;
		work.clear();
		this.findAllS1(type, x, y, 0, 0, edges, threshold, work);
		for (let ir = SIZE; ir <= range && work.size < limit; ir += SIZE) {
			this.findAllS2(type, x, y, edges, threshold, ir, work);
		}
		let iresult = -1;
		work.forEach((found) => {
			result[++iresult] = found;
		});
		result.length = work.size;
		result.sort(this.compare);
		return result;
	}

	protected findAllS2(
		type: EShapeAcceptorEdgeType,
		x: number,
		y: number,
		edges: Map<number, EToolShapeAcceptorEdgeFound[]>,
		threshold: number,
		radius: number,
		result: Set<EToolShapeAcceptorEdgeFound>
	): void {
		for (let dx = -radius; dx <= radius; dx += SIZE) {
			this.findAllS1(type, x, y, dx, -radius, edges, threshold, result);
			this.findAllS1(type, x, y, dx, +radius, edges, threshold, result);
		}
		for (let dy = -radius + SIZE, iymax = radius - SIZE; dy <= iymax; dy += SIZE) {
			this.findAllS1(type, x, y, -radius, dy, edges, threshold, result);
			this.findAllS1(type, x, y, +radius, dy, edges, threshold, result);
		}
	}

	protected findAllS1(
		type: EShapeAcceptorEdgeType,
		x: number,
		y: number,
		dx: number,
		dy: number,
		edges: Map<number, EToolShapeAcceptorEdgeFound[]>,
		threshold: number,
		result: Set<EToolShapeAcceptorEdgeFound>
	): void {
		const gix = this.toGridIndex(x + dx);
		const giy = this.toGridIndex(y + dy);
		const foundEdges = edges.get(this.toCoordinate(gix, giy));
		if (foundEdges) {
			for (let i = 0, imax = foundEdges.length; i < imax; ++i) {
				const foundEdge = foundEdges[i];
				if (foundEdge.acceptor.type & type) {
					const foundEdgeLocal = foundEdge.local;
					const sx = x - foundEdgeLocal.x;
					const sy = y - foundEdgeLocal.y;
					const sd = sx * sx + sy * sy;
					if (sd <= threshold) {
						foundEdge.distance = sd;
						result.add(foundEdge);
					}
				}
			}
		}
	}

	protected compare(
		this: unknown,
		a: EToolShapeAcceptorEdgeFound,
		b: EToolShapeAcceptorEdgeFound
	): number {
		const ad = a.distance;
		const bd = b.distance;
		return ad < bd ? -1 : ad > bd ? +1 : 0;
	}

	protected clear(): void {
		this._edges = undefined;
	}
}
