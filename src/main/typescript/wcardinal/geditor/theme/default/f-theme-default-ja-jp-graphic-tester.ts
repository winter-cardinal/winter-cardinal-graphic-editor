import { FThemeDefaultGraphicTester } from "./f-theme-default-graphic-tester";
import { toLabel } from "./to-label";

export class FThemeDefaultJaJpGraphicTester extends FThemeDefaultGraphicTester {
	override getToolFileButtonGraphicOpenTitle(): string | undefined {
		return toLabel("グラフィックを開く...", this.getToolFileButtonGraphicOpenShortcut());
	}

	override getToolFileButtonOpenTitle(): string | undefined {
		return toLabel("マッピングを開く...", this.getToolFileButtonOpenShortcut());
	}

	override getInputNameLabel(): string | undefined {
		return "名称";
	}

	override getTableColumnDataLabel(): string {
		return "データ";
	}

	override getTableColumnValueLabel(): string {
		return "値";
	}

	override newDialogCreateTextValue(): string {
		return "名称未設定";
	}
}
