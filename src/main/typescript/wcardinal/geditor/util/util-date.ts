import { NumberFormatter, NumberFormatters } from "@wcardinal/wcardinal-ui";

export class UtilDate {
	protected static DATE_FORMATTER: NumberFormatter | null = null;

	static getFormatter(): NumberFormatter {
		if (UtilDate.DATE_FORMATTER == null) {
			UtilDate.DATE_FORMATTER = NumberFormatters.create("%Y%M%D%H%m%s");
		}
		return UtilDate.DATE_FORMATTER;
	}

	static format(target: number): string {
		return this.getFormatter().format(target, 1);
	}
}
