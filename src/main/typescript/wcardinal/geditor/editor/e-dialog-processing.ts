import { DDialogProcessing } from "@wcardinal/wcardinal-ui";

export interface ReasonMalformedRange {
	upper: number;
	lower: number;
}

export class EDialogProcessing extends DDialogProcessing {
	protected toReasonMalformedLabel(target: string): string {
		switch (target) {
			case "uid":
				return "An ID";
			case "password":
				return "A password";
			case "description":
				return "A description";
			case "name":
				return "A name";
			case "label":
				return "A label";
			case "summary":
				return "A summary";
			default:
				return "Something";
		}
	}

	protected toReasonMalformedRange(target: string): ReasonMalformedRange {
		switch (target) {
			case "uid":
				return {
					lower: 1,
					upper: 32
				};
			case "password":
				return {
					lower: 6,
					upper: 32
				};
			case "description":
				return {
					lower: 0,
					upper: 256
				};
			case "name":
				return {
					lower: 1,
					upper: 32
				};
			case "label":
				return {
					lower: 0,
					upper: 16
				};
			case "summary":
				return {
					lower: 0,
					upper: 32
				};
			default:
				return {
					lower: 1,
					upper: 32
				};
		}
	}

	protected toReasonMalformed(at: string, target: string, reason: string): string {
		const label = this.toReasonMalformedLabel(target);
		switch (reason) {
			case "short":
			case "long":
				const range = this.toReasonMalformedRange(target);
				return `Failed to save '${at}'.\n${label} must be of ${range.lower} to ${range.upper}\ncharacters long.`;
			case "simple":
				return `Failed to save '${at}'.\n${label} must contain letters (A-Za-z_)\nand digits (0-9).`;
			case "slash":
				return `Failed to save '${at}'.\n${label} must not contain the slash mark (/).`;
			case "non-alphanumeric":
				return (
					`Failed to save '${at}'.\n${label} must contain only letters (A-Za-z_),\n` +
					`digits (0-9) and a sharp symbol (#).`
				);
			default:
				return `Failed to save '${at}'.\n${label} is invalid.`;
		}
	}

	protected toReasonTarget(
		at: string,
		target: string | null | undefined,
		targetLabel: string
	): string {
		if (target != null) {
			return `Failed to save '${at}'.\n${targetLabel} '${target}' does not exit.`;
		} else {
			return `Failed to save '${at}'.\n${targetLabel} is missing.`;
		}
	}

	protected toReasonTargetAt(
		at: string,
		target: string | null | undefined,
		atLabel: string,
		targetLabel: string
	): string {
		if (target != null) {
			return `Failed to save.\n${atLabel} '${at}'\nrequires ${targetLabel} '${target}'.`;
		} else {
			return `Failed to save.\n${atLabel} '${at}'\nrequires ${targetLabel}.`;
		}
	}

	protected toReason(reason?: string): string | undefined {
		if (reason == null) {
			return undefined;
		} else {
			if (0 < reason.length && reason[0] === "{") {
				try {
					const parsed = JSON.parse(reason);
					switch (parsed.id) {
						case "no-sensor-found":
							return this.toReasonTarget(parsed.at, parsed.target, "Sensor");
						case "no-device-model-found":
							return this.toReasonTarget(parsed.at, parsed.target, "Device model");
						case "malformed":
							return this.toReasonMalformed(parsed.at, parsed.target, parsed.reason);
						case "invalid-operation-mode":
							return "Failed to save.\nInvalid operation mode.";
						case "no-graphic-found":
							return this.toReasonTargetAt(
								parsed.at,
								parsed.target,
								"A graphic sensor mapping",
								"a graphic"
							);
						case "no-alarm-list-found":
							return this.toReasonTargetAt(
								parsed.at,
								parsed.target,
								"An alarm mapping",
								"an alarm list"
							);
						case "no-trend-graph-found":
							return this.toReasonTargetAt(
								parsed.at,
								parsed.target,
								"A trend graph sensor mapping",
								"a trend graph"
							);
					}
				} catch {
					return undefined;
				}
			} else {
				switch (reason) {
					case "duplication":
						return "Failed to save.\nThe name has already been used.";
					case "duplications":
						return "Failed to save.\nIDs must be unique.";
					case "invalid-operation-mode":
						return "Failed to save.\nInvalid operation mode.";
					case "validation":
						return "A validation error has occurred.";
					case "validation-fail":
						return "A validation failed.";
				}
			}
		}
		return undefined;
	}

	protected toButtonText(reason?: string): string {
		if (reason === "validation" || reason === "validation-fail" || reason != undefined) {
			return "OK";
		}
		return "Save";
	}

	reject(reason?: string): void {
		super.reject(this.toReason(reason));

		// Button text
		const footer = this.footer;
		if (footer) {
			const buttonOk = footer.buttonOk;
			if (buttonOk) {
				buttonOk.text = this.toButtonText(reason);
			}
		}
	}
}
