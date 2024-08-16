import {
	DBoard,
	DBoardOptions,
	DInputSearch,
	DLayoutVertical,
	DList,
	DText,
	DThemeBoard,
	DThemes
} from "@wcardinal/wcardinal-ui";
import { EDialogActionKeywordInput } from "./e-dialog-action-keyword-input";
import type { EDialogActionKeyword, EThemeDialogAction } from "./e-dialog-action";

export interface EDialogActionKeywordBoardOption extends DBoardOptions {}

export class EDialogActionKeywordBoard extends DBoard<
	DThemeBoard,
	EDialogActionKeywordBoardOption
> {
	protected _input?: DInputSearch;
	protected _list?: DList<EDialogActionKeyword>;
	protected _text?: DText<string>;
	protected _keywords?: EDialogActionKeyword[];

	constructor(options?: EDialogActionKeywordBoardOption) {
		super(options);

		this.addChild(
			new DLayoutVertical({
				x: "padding",
				y: "padding",
				width: "padding",
				height: "padding",
				children: [this.input, this.list, this.text]
			})
		);

		this.onInputChange("");
	}

	// Input
	protected get input(): DInputSearch {
		let result = this._input;
		if (result == null) {
			result = this.newInput();
			this._input = result;
		}
		return result;
	}

	protected newInput(): DInputSearch {
		return new EDialogActionKeywordInput({
			width: "padding",
			on: {
				input: (value: string): void => {
					this.onInputChange(value);
				}
			}
		});
	}

	protected onInputChange(word: string): void {
		this.list.data.clearAndAddAll(this.newKeywords(word));
	}

	protected newKeywords(word: string): EDialogActionKeyword[] {
		const keywords = (this._keywords ??=
			DThemes.get<EThemeDialogAction>("EDialogAction").newKeywords());
		if (0 < word.trim().length) {
			const filtered: EDialogActionKeyword[] = [];
			for (let i = 0, imax = keywords.length; i < imax; ++i) {
				const keyword = keywords[i];
				if (0 <= keyword.keyword.indexOf(word)) {
					filtered.push(keyword);
				}
			}
			return filtered;
		} else {
			return keywords;
		}
	}

	// List
	protected get list(): DList<EDialogActionKeyword> {
		let result = this._list;
		if (result == null) {
			result = this.newList();
			this._list = result;
		}
		return result;
	}

	protected newList(): DList<EDialogActionKeyword> {
		return new DList<EDialogActionKeyword>({
			weight: 1,
			width: "padding",
			data: {
				selection: {
					on: {
						change: (): void => {
							this.onListSelectionChange();
						}
					}
				},
				toLabel: (keyword) => {
					return keyword.keyword;
				},
				toId: (keyword) => {
					return keyword.keyword;
				}
			}
		});
	}

	protected onListSelectionChange(): void {
		const first = this.list.data.selection.first;
		if (first) {
			this.text.text = `${first.keyword}: ${first.type}\n${first.description}`;
		} else {
			this.text.text = "";
		}
	}

	// Text
	protected get text(): DText<string> {
		let result = this._text;
		if (result == null) {
			result = this.newText();
			this._text = result;
		}
		return result;
	}

	protected newText(): DText<string> {
		return new DText<string>({
			width: "padding",
			height: 120,
			state: "READ_ONLY",
			text: {
				style: {
					wordWrap: "NORMAL"
				}
			},
			theme: "DInputTextArea"
		});
	}

	protected getType(): string {
		return "DDialog";
	}
}
