import { EThemeDefaultDialogDataMappingValue } from "./e-theme-default-dialog-data-mapping-value";

export class EThemeDefaultJaJpDialogDataMappingValue extends EThemeDefaultDialogDataMappingValue {
	override getInputSourceLabel(): string | undefined {
		return "変換対象";
	}

	override getInputDestinationLabel(): string | undefined {
		return "変換規則";
	}

	override getInputInitialLabel(): string | undefined {
		return "初期値";
	}

	override getTableColumnDataIdLabel(): string | undefined {
		return "変換前";
	}

	override getTableColumnMappedToLabel(): string | undefined {
		return "変換後";
	}
}
