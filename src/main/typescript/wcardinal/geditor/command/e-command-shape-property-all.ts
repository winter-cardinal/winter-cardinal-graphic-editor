import {
	EShape,
	EShapeCapabilities,
	EShapeCapability,
	EShapeConnectorLine
} from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";
import { ECommandShapeProperty } from "./e-command-shape-property";

type PROPERTY = [number, number, number, number, number, number];

export class ECommandShapePropertyAll extends ECommandShapeProperty<PROPERTY, void> {
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
			if (EShapeCapabilities.contains(shape, EShapeCapability.WIDTH)) {
				result |= EShapeCapability.WIDTH;
			}
			if (EShapeCapabilities.contains(shape, EShapeCapability.HEIGHT)) {
				result |= EShapeCapability.HEIGHT;
			}
			if (EShapeCapabilities.contains(shape, EShapeCapability.ROTATION)) {
				result |= EShapeCapability.ROTATION;
			}
			if (EShapeCapabilities.contains(shape, EShapeCapability.SKEW)) {
				result |= EShapeCapability.SKEW;
			}
			return result;
		}
	}

	protected override getProperty(shape: EShape, capability: EShapeCapability): PROPERTY {
		if (shape instanceof EShapeConnectorLine) {
			const edge = shape.edge;
			const tailLocal = edge.tail.local;
			const headLocal = edge.head.local;
			return [tailLocal.x, tailLocal.y, headLocal.x, headLocal.y, 0, 0];
		} else {
			const transform = shape.transform;
			const position = transform.position;
			const size = shape.size;
			const skew = transform.skew;
			return [position.x, position.y, size.x, size.y, transform.rotation, skew.x];
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
			if (capability & EShapeCapability.HEIGHT) {
				if (capability & EShapeCapability.WIDTH) {
					shape.size.set(property[2], property[3]);
				} else {
					shape.size.y = property[3];
				}
			} else if (capability & EShapeCapability.WIDTH) {
				shape.size.x = property[2];
			}
			if (capability & EShapeCapability.ROTATION) {
				transform.rotation = property[4];
			}
			if (capability & EShapeCapability.SKEW) {
				transform.skew.set(property[5], property[5]);
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
