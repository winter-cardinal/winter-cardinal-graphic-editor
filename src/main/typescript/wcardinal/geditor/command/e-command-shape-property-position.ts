import {
	EShape,
	EShapeCapabilities,
	EShapeCapability,
	EShapeConnectorLine
} from "@wcardinal/wcardinal-ui";
import { EToolSelectSelection } from "../tool/e-tool-select-selection";
import { ECommandShapeProperty } from "./e-command-shape-property";

type PROPERTY = [number, number, number, number];

export class ECommandShapePropertyPosition extends ECommandShapeProperty<PROPERTY, void> {
	constructor(selection: EToolSelectSelection) {
		super(selection, undefined);
	}

	protected override toCapability(shape: EShape): EShapeCapability {
		if (shape instanceof EShapeConnectorLine) {
			const edge = shape.edge;
			if (edge.tail.acceptor.shape == null && edge.head.acceptor.shape == null) {
				return EShapeCapability.POSITION;
			}
			return EShapeCapability.NONE;
		} else {
			if (EShapeCapabilities.contains(shape, EShapeCapability.POSITION)) {
				return EShapeCapability.POSITION;
			}
			return EShapeCapability.NONE;
		}
	}

	protected override getProperty(shape: EShape, capability: EShapeCapability): PROPERTY {
		if (shape instanceof EShapeConnectorLine) {
			const edge = shape.edge;
			const tailLocal = edge.tail.local;
			const headLocal = edge.head.local;
			return [tailLocal.x, tailLocal.y, headLocal.x, headLocal.y];
		} else {
			const position = shape.transform.position;
			return [position.x, position.y, 0, 0];
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
			shape.transform.position.set(property[0], property[1]);
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
