import { FThemeDefaultGraphicTester } from "./f-theme-default-graphic-tester";
import { toLabel } from "./to-label";

export class FThemeDefaultEnUsGraphicTester extends FThemeDefaultGraphicTester {
	override getToolFileButtonGraphicOpenTitle(): string | undefined {
		return toLabel("Open Graphic...", this.getToolFileButtonGraphicOpenShortcut());
	}

	override getToolFileButtonOpenTitle(): string | undefined {
		return toLabel("Open Mapping...", this.getToolFileButtonOpenShortcut());
	}

	override getInputNameLabel(): string | undefined {
		return "Name";
	}

	override getTableColumnDataLabel(): string {
		return "Data";
	}

	override getTableColumnValueLabel(): string {
		return "Value";
	}

	override newDialogCreateTextValue(): string {
		return "Untitled";
	}
}
