export class UtilCsvState {
	lines: string[];
	linesLength: number;
	cursor: number;
	line: string;
	lineLength: number;

	constructor(lines: string[]) {
		this.lines = lines;
		this.linesLength = lines.length;
		this.cursor = -1;
		this.line = "";
		this.lineLength = 0;
	}

	next(): boolean {
		const newCursor = this.cursor + 1;
		if (newCursor < this.linesLength) {
			this.cursor = newCursor;
			const nextLine = this.lines[newCursor];
			this.line = nextLine;
			this.lineLength = nextLine.length;
			return true;
		}
		return false;
	}
}

export class UtilCsv {
	static parseLine(state: UtilCsvState): string[] {
		const result = [];
		let icomma = -1;
		let line = state.line;
		let length = state.lineLength;
		for (let i = 0; i < length; ++i) {
			if (line.charAt(i) === '"') {
				// Find the corresponding double quote
				for (let j = i + 1; j < length; ++j) {
					const k = line.indexOf('"', j);
					if (k < 0) {
						// Not found.
						if (state.next()) {
							// Consumes the next line
							line += "\n" + state.line;
							length += 1 + state.lineLength;

							// And try again
							j -= 1;
							continue;
						} else {
							// Skip to the end.
							j = length + 1;
							result.push(this.unescape(line.substring(i + 1, j - 1)));
							i = j;
						}
					} else {
						j = k + 1;
						// If the next character is a double quote, then continues.
						if (j < length && line.charAt(j) === '"') {
							continue;
						}

						// The next character isn't a double quote
						result.push(this.unescape(line.substring(i + 1, j - 1)));
						i = j;
					}
					break;
				}
			} else {
				if (icomma < i) {
					icomma = line.indexOf(",", i);
					if (icomma < 0) {
						icomma = length;
					}
				}
				result.push(line.substring(i, icomma));
				i = icomma;
			}
		}
		return result;
	}

	static parse(str: string): string[][] {
		const lines = str.split(/(?:\r\n?|\n)/g);
		const result = [];
		const state = new UtilCsvState(lines);
		while (state.next()) {
			const row = this.parseLine(state);
			if (0 < row.length) {
				result.push(row);
			}
		}
		return result;
	}

	static stringifyLine(line: unknown[]): string {
		let result = "";
		let delimiter = "";
		for (let i = 0, imax = line.length; i < imax; ++i) {
			result += delimiter + this.escape(String(line[i]));
			delimiter = ",";
		}
		return result;
	}

	static stringify(lines: unknown[][]): string {
		let result = "";
		let delimiter = "";
		for (let i = 0, imax = lines.length; i < imax; ++i) {
			result += delimiter + this.stringifyLine(lines[i]);
			delimiter = "\n";
		}
		return result;
	}

	static escape(target: string): string {
		const result = target.replace(/"/g, '""');
		if (
			result.length !== target.length ||
			0 <= target.indexOf(",") ||
			0 <= target.indexOf("\n") ||
			0 <= target.indexOf("\r")
		) {
			return `"${result}"`;
		}
		return target;
	}

	static unescape(target: string): string {
		return target.replace(/""/g, '"');
	}
}
