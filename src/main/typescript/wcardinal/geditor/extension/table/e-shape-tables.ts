import {
	createGroupUploaded,
	DDiagramSerializedItem,
	deserializeBase,
	DThemes,
	EShape,
	EShapeCapability,
	EShapeDefaults,
	EShapeGroupShadowed,
	EShapeRectangle,
	EShapeResourceManagerDeserialization,
	EShapeResourceManagerDeserializationMode,
	EShapeStrokeSide,
	EShapeTextAlignHorizontal,
	UtilRgb
} from "@wcardinal/wcardinal-ui";
import { EShapeTable, EShapeTableResourceSerialized } from "./e-shape-table";
import { EShapeTableBody } from "./e-shape-table-body";
import { EShapeTableColumnValue, EShapeTableColumnValueType } from "./e-shape-table-column-value";
import { EShapeTableColumnValueBody } from "./e-shape-table-column-value-body";
import { EShapeTableColumnValueHeader } from "./e-shape-table-column-value-header";
import { EShapeTableHeader } from "./e-shape-table-header";
import { EShapeExtensions } from "../e-shape-extensions";
import { EShapeTableIds } from "./e-shape-table-ids";
import { EEditorShapeTable } from "./e-editor-shape-table";
import { EShapeTableRuntime } from "./e-shape-table-runtime";
import { EShapeTableHeaderRuntime } from "./e-shape-table-header-runtime";
import { EShapeTableBodyRuntime } from "./e-shape-table-body-runtime";
import { EThemeShapeTable } from "./e-theme-shape-table";

export class EShapeTables {
	static getTheme(): EThemeShapeTable {
		return DThemes.get<EThemeShapeTable>("EShapeTable");
	}

	static create(existing?: EShape): EShapeTable {
		const mode = EShapeResourceManagerDeserializationMode.EDITOR;
		const result = new EShapeTable(mode);

		const header = new EShapeTableHeader(mode).attach(result);
		const headerCell = new EShapeRectangle().attach(header);
		headerCell.stroke.side = EShapeStrokeSide.BOTTOM;
		headerCell.stroke.width = 1;
		headerCell.stroke.color = UtilRgb.brighten(EShapeDefaults.STROKE_COLOR, 0.65);

		const body = new EShapeTableBody(mode).attach(result);
		body.state.isFocusable = true;
		body.interactive = true;
		const even = new EShapeGroupShadowed(mode).attach(body);
		const odd = new EShapeGroupShadowed(mode).attach(body);
		const cellEven = new EShapeRectangle().attach(even);
		cellEven.stroke.enable = false;
		cellEven.text.value = "-";
		cellEven.text.clipping = true;
		const cellOdd = new EShapeRectangle().attach(odd);
		cellOdd.fill.color = UtilRgb.darken(EShapeDefaults.FILL_COLOR, 0.05);
		cellOdd.stroke.enable = false;
		cellOdd.text.value = "-";
		cellOdd.text.clipping = true;

		result.column.add(
			new EShapeTableColumnValue(
				1,
				EShapeTableColumnValueType.TEXT,
				"",
				"",
				"",
				EShapeTextAlignHorizontal.CENTER,
				new EShapeTableColumnValueHeader(this.getTheme().newHeaderLabel()),
				new EShapeTableColumnValueBody()
			)
		);

		if (existing) {
			result.copy(existing);
		}
		result.onSizeChange();

		return result;
	}

	static load(): void {
		const theme = this.getTheme();
		const name = theme.getName();
		EShapeExtensions.add({
			type: EShapeTableIds.ID,
			name,
			icon: {
				width: 24,
				height: 24,
				// Material Icons https://material.io/tools/icons/
				// Available under Apache license version 2.0
				svg:
					`<g transform="scale(26.6666)" fill="#fff" stroke="none">` +
					`<path d="M20 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 2v3H5V5h15z` +
					`m-5 14h-5v-9h5v9zM5 10h3v9H5v-9zm12 9v-9h3v9h-3z"/>` +
					`</g>`
			},
			title: name,
			creator: (existing) => EShapeTables.create(existing),
			deserializer: (item, manager) => EShapeTables.deserialize(item, manager),
			editor: EEditorShapeTable,
			runtime: EShapeTableRuntime,
			uploaded: createGroupUploaded
		});

		EShapeExtensions.add({
			type: EShapeTableIds.HEADER_ID,
			name: theme.getHeaderName(),
			deserializer: (item, manager) => EShapeTables.deserializeHeader(item, manager),
			runtime: EShapeTableHeaderRuntime,
			capability: EShapeCapability.PRIMITIVE & ~EShapeCapability.CHILDREN
		});

		EShapeExtensions.add({
			type: EShapeTableIds.BODY_ID,
			name: theme.getBodyName(),
			deserializer: (item, manager) => EShapeTables.deserializeBody(item, manager),
			runtime: EShapeTableBodyRuntime,
			capability: EShapeCapability.PRIMITIVE & ~EShapeCapability.CHILDREN
		});
	}

	static deserialize(
		item: DDiagramSerializedItem,
		manager: EShapeResourceManagerDeserialization
	): Promise<EShapeTable> | EShapeTable | null {
		const shape = new EShapeTable(manager.mode);
		const index = item[15];
		const resources = manager.resources;
		if (0 <= index && index < resources.length) {
			let parsed = manager.getExtension<EShapeTableResourceSerialized>(index);
			if (parsed == null) {
				parsed = JSON.parse(resources[index]) as EShapeTableResourceSerialized;
				manager.setExtension(index, parsed);
			}
			shape.column.deserialize(parsed[0], manager);
			shape.row.deserialize(parsed[1], manager);
			item[15] = parsed[parsed.length - 1];
		}
		const result = deserializeBase(item, manager, shape);
		shape.size.init();
		return result;
	}

	static deserializeHeader(
		item: DDiagramSerializedItem,
		manager: EShapeResourceManagerDeserialization
	): Promise<EShapeTableHeader> | EShapeTableHeader | null {
		const shape = new EShapeTableHeader(manager.mode);
		const result = deserializeBase(item, manager, shape);
		shape.size.init();
		return result;
	}

	static deserializeBody(
		item: DDiagramSerializedItem,
		manager: EShapeResourceManagerDeserialization
	): Promise<EShapeTableHeader> | EShapeTableHeader | null {
		const shape = new EShapeTableBody(manager.mode);
		const result = deserializeBase(item, manager, shape);
		shape.size.init();
		return result;
	}
}
