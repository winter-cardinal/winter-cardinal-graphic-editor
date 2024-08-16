import { DThemeDialogLayered, DThemes } from "@wcardinal/wcardinal-ui";
import type { EThemeDialogDataMappingValue } from "../../../editor/e-dialog-data-mapping-value";

export abstract class EThemeDefaultDialogDataMappingValue
	extends DThemes.getClass<DThemeDialogLayered>("DDialogLayered")
	implements EThemeDialogDataMappingValue
{
	abstract getInputSourceLabel(): string | undefined;

	abstract getInputDestinationLabel(): string | undefined;

	abstract getInputInitialLabel(): string | undefined;

	abstract getTableColumnDataIdLabel(): string | undefined;

	abstract getTableColumnMappedToLabel(): string | undefined;
}
