import { EThemeDefaultDialogDataMappingValue } from "./e-theme-default-dialog-data-mapping-value";

export class EThemeDefaultEnUsDialogDataMappingValue extends EThemeDefaultDialogDataMappingValue {
	override getInputSourceLabel(): string | undefined {
		return "From";
	}

	override getInputDestinationLabel(): string | undefined {
		return "To";
	}

	override getInputInitialLabel(): string | undefined {
		return "Initial";
	}

	override getTableColumnDataIdLabel(): string | undefined {
		return "Data ID";
	}

	override getTableColumnMappedToLabel(): string | undefined {
		return "Mapped To";
	}
}
