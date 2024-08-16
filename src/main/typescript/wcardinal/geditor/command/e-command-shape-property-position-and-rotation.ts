import {
	EShape,
	EShapeCapabilities,
	EShapeCapability,
	EShapeConnectorLine
} from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";
import { ECommandShapeProperty } from "./e-command-shape-property";

type PROPERTY = [number, number, number, number];

export class ECommandShapePropertyPositionAndRotate extends ECommandShapeProperty<PROPERTY, void> {
	constructor(selection: EToolSelectSelection) {
		super(selection, undefined);
	}

	protected override toCapability(shape: EShape): EShapeCapability {
		if (shape instanceof EShapeConnectorLine) {
			const edge = shape.edge;
			if (edge.tail.acceptor.shape == null && edge.head.acceptor.shape == null) {
				return EShapeCapability.ALL;
			}
			return EShapeCapability.NONE;
		} else {
			let result = EShapeCapability.NONE;
			if (EShapeCapabilities.contains(shape, EShapeCapability.POSITION)) {
				result |= EShapeCapability.POSITION;
			}
			if (EShapeCapabilities.contains(shape, EShapeCapability.ROTATION)) {
				result |= EShapeCapability.ROTATION;
			}
			return result;
		}
	}

	protected override getProperty(shape: EShape, capability: EShapeCapability): PROPERTY {
		if (shape instanceof EShapeConnectorLine) {
			const edge = shape.edge;
			const tailLocal = edge.tail.local;
			const headLocal = edge.head.local;
			return [tailLocal.x, tailLocal.y, headLocal.x, headLocal.y];
		} else {
			const transform = shape.transform;
			const position = transform.position;
			return [position.x, position.y, transform.rotation, 0];
		}
	}

	protected override setProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: PROPERTY
	): void {
		if (shape instanceof EShapeConnectorLine) {
			const edge = shape.edge;
			edge.tail.local.set(property[0], property[1]);
			edge.head.local.set(property[2], property[3]);
		} else {
			const transform = shape.transform;
			if (capability & EShapeCapability.POSITION) {
				transform.position.set(property[0], property[1]);
			}
			if (capability & EShapeCapability.ROTATION) {
				transform.rotation = property[2];
			}
		}
	}

	protected override initProperty(
		shape: EShape,
		capability: EShapeCapability,
		property: void
	): void {
		// DO NOTHING
	}
}
