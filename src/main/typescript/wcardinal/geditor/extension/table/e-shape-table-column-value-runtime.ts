import { NumberFormatters } from "@wcardinal/wcardinal-ui";
import { EShapeTableColumnValue, EShapeTableColumnValueType } from "./e-shape-table-column-value";

type ToValue = (row: unknown, index: number, rows: unknown[]) => unknown;
type FromValue = (row: unknown, index: number, rows: unknown[], value: unknown) => void;
type Formatter = (value: unknown, index: number) => string;

const toValueDefault: ToValue = (row: any, index: number): unknown => row[index];
const fromValueDefault: FromValue = (
	row: any,
	index: number,
	rows: unknown[],
	value: unknown
): void => {
	row[index] = value;
};
const formatterDefault: Formatter = (value: unknown): string => String(value);

export class EShapeTableColumnValueRuntime {
	toValue: ToValue;
	fromValue: FromValue;
	formatter: Formatter;

	constructor(value: EShapeTableColumnValue) {
		this.toValue = this.parseToValue(value.getter, toValueDefault, '""');
		this.fromValue = this.parseFromValue(value.setter, fromValueDefault);
		if (value.type === EShapeTableColumnValueType.TEXT) {
			this.formatter = this.parseFormat(value.format, formatterDefault, '""');
		} else {
			const format = value.format;
			if (0 < format.trim().length) {
				const formatter = NumberFormatters.create(format);
				this.formatter = (v: unknown) => {
					return formatter.format(v as number, 1);
				};
			} else {
				this.formatter = formatterDefault;
			}
		}
	}

	protected parseToValue(expression: string, def: ToValue, defLiteral: string): ToValue {
		if (expression.trim().length <= 0) {
			return def;
		}

		try {
			return Function(
				"row",
				"index",
				"rows",
				`try{ return (${expression}); } catch( e ) { return ${defLiteral}; }`
			) as ToValue;
		} catch {
			return def;
		}
	}

	protected parseFromValue(expression: string, def: FromValue): FromValue {
		if (expression.trim().length <= 0) {
			return def;
		}

		try {
			return Function(
				"row",
				"index",
				"rows",
				"value",
				`try{ ${expression} = value; } catch( e ) {}`
			) as FromValue;
		} catch {
			return def;
		}
	}

	protected parseFormat(expression: string, def: Formatter, defLiteral: string): Formatter {
		if (expression.trim().length <= 0) {
			return def;
		}

		try {
			return Function(
				"value",
				"index",
				`try{ return (${expression}); } catch( e ) { return ${defLiteral}; }`
			) as Formatter;
		} catch {
			return def;
		}
	}
}
