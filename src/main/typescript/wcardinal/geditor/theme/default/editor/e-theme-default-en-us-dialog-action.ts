import type { EDialogActionKeyword } from "../../../editor/e-dialog-action";
import { EThemeDefaultDialogAction } from "./e-theme-default-dialog-action";

export class EThemeDefaultEnUsDialogAction extends EThemeDefaultDialogAction {
	override getSelectActionLabel(): string | undefined {
		return "Action";
	}

	override getButtonKeywordTitle(): string | undefined {
		return "Show / Hide Keyword List";
	}

	override getInputOriginXLabel(): string | undefined {
		return "X Origin";
	}

	override getInputOriginYLabel(): string | undefined {
		return "Y Origin";
	}

	override getSelectWhenLabel(): string | undefined {
		return "When";
	}

	override getSelectLayerLabel(): string | undefined {
		return "Layer";
	}

	override getInputConditionLabel(): string | undefined {
		return "When";
	}

	override getInputIntervalLabel(): string | undefined {
		return "Interval";
	}

	override getInputIntervalUnitLabel(): string | undefined {
		return "ms";
	}

	override getInputSizeLabel(): string | undefined {
		return "Size";
	}

	override getInputAmountLabel(): string | undefined {
		return "Amount";
	}

	override getInputValueLabel(): string | undefined {
		return "Value";
	}

	override getInputInitializationLabel(): string | undefined {
		return "Init.";
	}

	override getCheckPointEventsLabel(): string | undefined {
		return "Pointer Event";
	}

	override getInputTargetNameLabel(): string | undefined {
		return "Name";
	}

	override getButtonColorLabel(): string | undefined {
		return "Color";
	}

	override getInputTargetLabel(): string | undefined {
		return "Target";
	}

	override getInputArgumentLabel(): string | undefined {
		return "Arg.";
	}

	override getInputColorCodeLabel(): string | undefined {
		return "RGB";
	}

	override getInputAlphaCodeLabel(): string | undefined {
		return "Alpha";
	}

	override getInputBrightnessLabel(): string | undefined {
		return "Brt.";
	}

	override getInputBlendLabel(): string | undefined {
		return "Bld. rate";
	}

	override getInputInitialLabel(): string | undefined {
		return "Initial";
	}

	override getInputStepLabel(): string | undefined {
		return "Step";
	}

	override getInputMinLabel(): string | undefined {
		return "Min";
	}

	override getInputMaxLabel(): string | undefined {
		return "Max";
	}

	override getInputScaleLabel(): string | undefined {
		return "Scale";
	}

	override getCheckBringToFrontLabel(): string | undefined {
		return "Bring to Front";
	}

	override getCheckInNewWindowLabel(): string | undefined {
		return "In New Window";
	}

	/* eslint-disable prettier/prettier */
	override newKeywords(): EDialogActionKeyword[] {
		const result: EDialogActionKeyword[] = [];

		// Basics
		result.push(this.newKeyword("time", "number", "A current UNIX timestamp in milliseconds."));

		// States
		result.push(this.newKeyword("isInitializing", "boolean", "True when a shape is initializing."));
		result.push(this.newKeyword("isHovered", "boolean", "True when a shape is hovered."));
		result.push(this.newKeyword("isActive", "boolean", "True when a shape is active."));
		result.push(this.newKeyword("isActivated", "boolean", "True when a shape state be active."));
		result.push(this.newKeyword("isDeactivated", "boolean", "True when a shape state be unactive."));
		result.push(this.newKeyword("isPressed", "boolean", "True when a shape is pressed."));
		result.push(this.newKeyword("isReadOnly", "boolean", "True if a shape is read-only."));
		result.push(this.newKeyword("isEnabled", "boolean", "True if a shape is enabled."));
		result.push(this.newKeyword("isDisabled", "boolean", "True if a shape is disabled."));
		result.push(this.newKeyword("isActionable", "boolean", "True if a shape is actionable."));
		result.push(this.newKeyword("isGesturing", "boolean", "True when a shape is being gestured."));
		result.push(this.newKeyword("isFocused", "boolean", "True when a shape has a focuse."));
		result.push(this.newKeyword("isFocusable", "boolean", "True if a shape is focusable."));
		result.push(this.newKeyword("isUnfocusable", "boolean", "True if a shape is not focusable."));
		result.push(this.newKeyword("isClicked", "boolean", "True when a shape is clicked."));
		result.push(this.newKeyword("isDblClicked", "boolean", "True when a shape is double-clicked."));
		result.push(this.newKeyword("isDown", "boolean", "True when a pointer or a key gets down on a shape."));
		result.push(this.newKeyword("isUp", "boolean", "True when a pointer or a key gets up on a shape."));
		result.push(this.newKeyword("isUpOutside", "boolean", "True when a pointer or a key gets up outside of a shape."));
		result.push(this.newKeyword("isRightClicked", "boolean", "True when a secondary pointer is clicked on a shape."));
		result.push(this.newKeyword("isRightDown", "boolean", "True when a secondary pointer gets down on a shape."));
		result.push(this.newKeyword("isRightUp", "boolean", "True when a secondary pointer gets up on a shape."));
		result.push(this.newKeyword("isRightUpOutside", "boolean", "True when a secondary pointer gets up outside of a shape."));
		result.push(this.newKeyword("isRightPressed", "boolean", "True when a shape is pressed by a secondary pointer."));

		// Shape properties
		result.push(this.newKeyword("id", "string", "A shape ID."));
		result.push(this.newKeyword("type", "number", "A shape type."));
		result.push(this.newKeyword("size.x", "number", "A shape width."));
		result.push(this.newKeyword("size.y", "number", "A shape height."));
		result.push(this.newKeyword("fill.enable", "boolean", "True if a fill of a shape is enabled."));
		result.push(this.newKeyword("fill.color", "number", "A fill color of a shape."));
		result.push(this.newKeyword("fill.alpha", "number", "A fill alpha of a shape."));
		result.push(this.newKeyword("fill.percent", "number", "A fill percent of a shape."));
		result.push(this.newKeyword("stroke.enable", "boolean", "True if a shape stroke is enabled."));
		result.push(this.newKeyword("stroke.color", "number", "A stroke color of a shape."));
		result.push(this.newKeyword("stroke.alpha", "number", "A stroke alpha of a shape."));
		result.push(this.newKeyword("stroke.width", "number", "A stroke width of a shape."));
		result.push(this.newKeyword("stroke.align", "number", "A stroke alignment of a shape."));
		result.push(this.newKeyword("transform.position.x", "number", "A shape X position."));
		result.push(this.newKeyword("transform.position.y", "number", "A shape Y position."));
		result.push(this.newKeyword("transform.pivot.x", "number", "A X-coordinate pivot of a shape."));
		result.push(this.newKeyword("transform.pivot.y", "number", "A Y-coordinate pivot of a shape."));
		result.push(this.newKeyword("transform.rotation", "number", "A rotation of a shape."));
		result.push(this.newKeyword("transform.skew.x", "number", "A X-coordinate skew of a shape."));
		result.push(this.newKeyword("transform.skew.y", "number", "A Y-coordinate skew of a shape."));
		result.push(this.newKeyword("transform.scale.x", "number", "A X-coordinate scale of a shape."));
		result.push(this.newKeyword("transform.scale.y", "number", "A Y-coordinate scale of a shape."));
		result.push(this.newKeyword("points.length", "number", "A point length of a shape."));
		result.push(this.newKeyword("points.values", "number[]", "A point values of a shape."));
		result.push(this.newKeyword("text.value", "string", "A text value of a shape."));
		result.push(this.newKeyword("text.color", "number", "A text color of a shape."));
		result.push(this.newKeyword("text.alpha", "number", "A text alpha of a shape."));
		result.push(this.newKeyword("text.family", "string", "A font family of a shape."));
		result.push(this.newKeyword("text.size", "number", "A font size of a shape."));
		result.push(this.newKeyword("cursor", "string", "A cursor of a shape."));
		result.push(this.newKeyword("shortcut", "string | undefined", "A shortcut key of a shape."));
		result.push(this.newKeyword("title", "string | undefined", "A tooltip text of a shape."));
		result.push(this.newKeyword("visible", "boolean", "True if a shape is visible."));
		result.push(this.newKeyword("interactive", "boolean", "True if a shape is interactive."));

		// First data
		result.push(this.newKeyword("data.id", "string", "An ID of the first data."));
		result.push(this.newKeyword("data.initial", "string", "An initial value expression of the first data."));
		result.push(this.newKeyword("data.format", "string", "A formatter expression of the first data."));
		result.push(this.newKeyword("data.capacity", "number", "A capacity of the first data."));
		result.push(this.newKeyword("data.order", "number", "An data order of the first data. Zero: Ascending order. One: Descending order."));
		result.push(this.newKeyword("data.value", "unknown", "A value of the first data."));
		result.push(this.newKeyword("data.nvalue", "number", "A normalized value of the first data."));
		result.push(this.newKeyword("data.time", "number", "An UNIX timestamp in milliseconds of the first data."));
		result.push(this.newKeyword("data.values", "unknown[]", "Values of the first data."));
		result.push(this.newKeyword("data.times", "number[]", "UNIX timestamps in milliseconds of the first data."));
		result.push(this.newKeyword("data.range.from", "number", "A lower bound of the first data."));
		result.push(this.newKeyword("data.range.to", "number", "An upper bound of the first data."));

		// Data by index
		result.push(this.newKeyword("data.get(n).id", "string", "An ID of the n-th data."));
		result.push(this.newKeyword("data.get(n).initial", "string", "An initial value expression of the n-th data."));
		result.push(this.newKeyword("data.get(n).format", "string", "A formatter expression of the n-th data."));
		result.push(this.newKeyword("data.get(n).capacity", "number", "A capacity of the n-th data."));
		result.push(this.newKeyword("data.get(n).order", "number", "An data order of the n-th data. Zero: Ascending order. One: Descending order."));
		result.push(this.newKeyword("data.get(n).value", "unknown", "A value of the n-th data."));
		result.push(this.newKeyword("data.get(n).nvalue", "number", "A normalized value of the n-th data."));
		result.push(this.newKeyword("data.get(n).time", "number", "An UNIX timestamp in milliseconds of the n-th data."));
		result.push(this.newKeyword("data.get(n).values", "unknown[]", "Values of the n-th data."));
		result.push(this.newKeyword("data.get(n).times", "number[]", "UNIX timestamps in milliseconds of the n-th data."));
		result.push(this.newKeyword("data.get(n).range.from", "number", "A lower bound of the n-th data."));
		result.push(this.newKeyword("data.get(n).range.to", "number", "An upper bound of the n-th data."));

		// Data by alias
		result.push(this.newKeyword("${alias}.id", "string", "An ID of the data the alias points to."));
		result.push(this.newKeyword("${alias}.initial", "string", "An initial value expression of the data the alias points to."));
		result.push(this.newKeyword("${alias}.format", "string", "A formatter expression of the data the alias points to."));
		result.push(this.newKeyword("${alias}.capacity", "number", "A capacity of the data the alias points to."));
		result.push(this.newKeyword("${alias}.order", "number", "An order of the data the alias points to. Zero: Ascending order. One: Descending order."));
		result.push(this.newKeyword("${alias}.value", "unknown", "A value of the data the alias points to."));
		result.push(this.newKeyword("${alias}.nvalue", "number", "A normalized value of the data the alias points to."));
		result.push(this.newKeyword("${alias}.time", "number", "An UNIX timestamp in milliseconds of the data the alias points to."));
		result.push(this.newKeyword("${alias}.values", "unknown[]", "Values of the data the alias points to."));
		result.push(this.newKeyword("${alias}.times", "number[]", "UNIX timestamps in milliseconds of the data the alias points to."));
		result.push(this.newKeyword("${alias}.range.from", "number", "A lower bound of the data the alias points to."));
		result.push(this.newKeyword("${alias}.range.to", "number", "An upper bound of the data the alias points to."));

		return result;
	}
	/* eslint-enable prettier/prettier */
}
