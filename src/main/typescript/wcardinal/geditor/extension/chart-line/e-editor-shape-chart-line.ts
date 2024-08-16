import {
	DButtonCheck,
	DButtonCheckRight,
	DContentOptions,
	DInputInteger,
	DLayoutHorizontal,
	DLayoutVertical,
	DPane,
	DText,
	DThemePane,
	DThemes
} from "@wcardinal/wcardinal-ui";
import { EShapeExtensionEditorOptions } from "../e-shape-extension-editor";
import { EShapeChartLine } from "./e-shape-chart-line";
import { EShapeChartAxes } from "./e-shape-chart-axes";

export interface EEditorShapeChartLineOptions extends EShapeExtensionEditorOptions {}

export interface ESubthemeEditorShapeChartLine {
	getLabel(): string;
	getCheckXAxisLabel(): string;
	getCheckXAxisMajorTickLabel(): string;
	getCheckXAxisMinorTickLabel(): string;
	getCheckYAxisLabel(): string;
	getCheckYAxisMajorTickLabel(): string;
	getCheckYAxisMinorTickLabel(): string;

	getTextMajorTickCountLabel(): string;
	getTextMinorTickCountLabel(): string;
	getTextPaddingLabel(): string;
}

export class EEditorShapeChartLine extends DPane<
	DThemePane,
	DContentOptions,
	EEditorShapeChartLineOptions
> {
	protected _subtheme?: ESubthemeEditorShapeChartLine;

	constructor(options: EEditorShapeChartLineOptions) {
		super(options);

		const selection = options.selection;
		this.state.isDisabled = selection.isEmpty();
		selection.on("change", (): void => {
			this.state.isDisabled = selection.isEmpty();
		});

		const subtheme = this.subtheme;
		new DLayoutVertical({
			parent: this.content,
			x: "padding",
			y: "padding",
			width: "padding",
			height: "auto",
			children: [
				this.newTextLabel(),
				new DButtonCheckRight<string>({
					width: "100%",
					text: {
						value: subtheme.getCheckXAxisLabel()
					},
					padding: 0,
					background: {
						color: null
					},
					on: {
						init: (self: DButtonCheck): void => {
							const update = (): void => {
								const last = selection.last();
								if (last instanceof EShapeChartLine) {
									self.state.isActive = EShapeChartAxes.getXAxis(last) != null;
									self.state.isDisabled = false;
								} else {
									self.state.isDisabled = true;
								}
							};
							update();
							selection.on("change", update);
						},
						active: (): void => {
							EShapeChartAxes.createXAxis(selection);
						},
						inactive: (): void => {
							EShapeChartAxes.deleteXAxis(selection);
						}
					}
				}),
				new DButtonCheckRight<string>({
					width: "100%",
					text: {
						value: subtheme.getCheckXAxisMajorTickLabel()
					},
					padding: {
						top: 0,
						right: 0,
						left: 10,
						bottom: 0
					},
					background: {
						color: null
					},
					on: {
						init: (self: DButtonCheck): void => {
							const update = (): void => {
								const last = selection.last();
								if (last instanceof EShapeChartLine) {
									if (EShapeChartAxes.getXAxis(last) != null) {
										self.state.isActive =
											EShapeChartAxes.getXAxisTickMajor(last) != null;
										self.state.isDisabled = false;
									} else {
										self.state.isDisabled = true;
									}
								} else {
									self.state.isDisabled = true;
								}
							};
							update();
							selection.on("change", update);
						},
						active: (): void => {
							EShapeChartAxes.createXAxisTickMajor(selection);
						},
						inactive: (): void => {
							EShapeChartAxes.deleteXAxisTickMajor(selection);
						}
					}
				}),
				new DButtonCheckRight<string>({
					width: "100%",
					text: {
						value: subtheme.getCheckXAxisMinorTickLabel()
					},
					padding: {
						top: 0,
						right: 0,
						left: 10,
						bottom: 0
					},
					background: {
						color: null
					},
					on: {
						init: (self: DButtonCheck): void => {
							const update = (): void => {
								const last = selection.last();
								if (last instanceof EShapeChartLine) {
									if (EShapeChartAxes.getXAxis(last) != null) {
										self.state.isActive =
											EShapeChartAxes.getXAxisTickMinor(last) != null;
										self.state.isDisabled = false;
									} else {
										self.state.isDisabled = true;
									}
								} else {
									self.state.isDisabled = true;
								}
							};
							update();
							selection.on("change", update);
						},
						active: (): void => {
							EShapeChartAxes.createXAxisTickMinor(selection);
						},
						inactive: (): void => {
							EShapeChartAxes.deleteXAxisTickMinor(selection);
						}
					}
				}),
				new DButtonCheckRight<string>({
					width: "100%",
					text: {
						value: subtheme.getCheckYAxisLabel()
					},
					padding: 0,
					background: {
						color: null
					},
					on: {
						init: (self: DButtonCheck): void => {
							const update = (): void => {
								const last = selection.last();
								if (last instanceof EShapeChartLine) {
									self.state.isActive = EShapeChartAxes.getYAxis(last) != null;
									self.state.isDisabled = false;
								} else {
									self.state.isDisabled = true;
								}
							};
							update();
							selection.on("change", update);
						},
						active: (): void => {
							EShapeChartAxes.createYAxis(selection);
						},
						inactive: (): void => {
							EShapeChartAxes.deleteYAxis(selection);
						}
					}
				}),
				new DButtonCheckRight<string>({
					width: "100%",
					text: {
						value: subtheme.getCheckYAxisMajorTickLabel()
					},
					padding: {
						top: 0,
						right: 0,
						left: 10,
						bottom: 0
					},
					background: {
						color: null
					},
					on: {
						init: (self: DButtonCheck): void => {
							const update = (): void => {
								const last = selection.last();
								if (last instanceof EShapeChartLine) {
									if (EShapeChartAxes.getYAxis(last) != null) {
										self.state.isActive =
											EShapeChartAxes.getYAxisTickMajor(last) != null;
										self.state.isDisabled = false;
									} else {
										self.state.isDisabled = true;
									}
								} else {
									self.state.isDisabled = true;
								}
							};
							update();
							selection.on("change", update);
						},
						active: (): void => {
							EShapeChartAxes.createYAxisTickMajor(selection);
						},
						inactive: (): void => {
							EShapeChartAxes.deleteYAxisTickMajor(selection);
						}
					}
				}),
				new DButtonCheckRight<string>({
					width: "100%",
					text: {
						value: subtheme.getCheckYAxisMinorTickLabel()
					},
					padding: {
						top: 0,
						right: 0,
						left: 10,
						bottom: 0
					},
					background: {
						color: null
					},
					on: {
						init: (self: DButtonCheck): void => {
							const update = (): void => {
								const last = selection.last();
								if (last instanceof EShapeChartLine) {
									if (EShapeChartAxes.getYAxis(last) != null) {
										self.state.isActive =
											EShapeChartAxes.getYAxisTickMinor(last) != null;
										self.state.isDisabled = false;
									} else {
										self.state.isDisabled = true;
									}
								} else {
									self.state.isDisabled = true;
								}
							};
							update();
							selection.on("change", update);
						},
						active: (): void => {
							EShapeChartAxes.createYAxisTickMinor(selection);
						},
						inactive: (): void => {
							EShapeChartAxes.deleteYAxisTickMinor(selection);
						}
					}
				}),
				new DText<string>({
					width: "100%",
					text: {
						value: subtheme.getTextMajorTickCountLabel()
					}
				}),
				new DLayoutHorizontal({
					width: "100%",
					children: [
						new DInputInteger({
							weight: 1,
							min: 0,
							on: {
								init: (self: DInputInteger): void => {
									const update = (): void => {
										const last = selection.last();
										if (last instanceof EShapeChartLine) {
											self.value = last.axis.x.tick.major.count;
										}
									};
									update();
									selection.on("change", update);
								},
								change: (count: number): void => {
									EShapeChartAxes.setXAxisTickMajorCount(count, selection);
								}
							}
						}),
						new DInputInteger({
							weight: 1,
							min: 0,
							on: {
								init: (self: DInputInteger): void => {
									const update = (): void => {
										const last = selection.last();
										if (last instanceof EShapeChartLine) {
											self.value = last.axis.y.tick.major.count;
										}
									};
									update();
									selection.on("change", update);
								},
								change: (count: number): void => {
									EShapeChartAxes.setYAxisTickMajorCount(count, selection);
								}
							}
						})
					]
				}),
				new DText<string>({
					width: "100%",
					text: {
						value: subtheme.getTextMinorTickCountLabel()
					}
				}),
				new DLayoutHorizontal({
					width: "100%",
					children: [
						new DInputInteger({
							weight: 1,
							min: 0,
							on: {
								init: (self: DInputInteger): void => {
									const update = (): void => {
										const last = selection.last();
										if (last instanceof EShapeChartLine) {
											self.value = last.axis.x.tick.minor.count;
										}
									};
									update();
									selection.on("change", update);
								},
								change: (count: number): void => {
									EShapeChartAxes.setXAxisTickMinorCount(count, selection);
								}
							}
						}),
						new DInputInteger({
							weight: 1,
							min: 0,
							on: {
								init: (self: DInputInteger): void => {
									const update = (): void => {
										const last = selection.last();
										if (last instanceof EShapeChartLine) {
											self.value = last.axis.y.tick.minor.count;
										}
									};
									update();
									selection.on("change", update);
								},
								change: (count: number): void => {
									EShapeChartAxes.setYAxisTickMinorCount(count, selection);
								}
							}
						})
					]
				}),
				new DText<string>({
					width: "100%",
					text: {
						value: subtheme.getTextPaddingLabel()
					}
				}),
				new DLayoutHorizontal({
					width: "100%",
					children: [
						new DInputInteger({
							weight: 1,
							min: 0,
							on: {
								init: (self: DInputInteger): void => {
									const update = (): void => {
										const last = selection.last();
										if (last instanceof EShapeChartLine) {
											self.value = last.axis.x.padding;
										}
									};
									update();
									selection.on("change", update);
								},
								change: (padding: number): void => {
									EShapeChartAxes.setXAxisPadding(padding, selection);
								}
							}
						}),
						new DInputInteger({
							weight: 1,
							min: 0,
							on: {
								init: (self: DInputInteger): void => {
									const update = (): void => {
										const last = selection.last();
										if (last instanceof EShapeChartLine) {
											self.value = last.axis.y.padding;
										}
									};
									update();
									selection.on("change", update);
								},
								change: (padding: number): void => {
									EShapeChartAxes.setYAxisPadding(padding, selection);
								}
							}
						})
					]
				})
			],
			on: {
				init: (self: DLayoutVertical): void => {
					const update = (): void => {
						self.state.isDisabled = !(selection.last() instanceof EShapeChartLine);
					};
					update();
					selection.on("change", update);
				}
			}
		});
	}

	protected newTextLabel(): DText<string> {
		return new DText<string>({
			width: "100%",
			text: {
				value: this.subtheme.getLabel()
			}
		});
	}

	protected get subtheme(): ESubthemeEditorShapeChartLine {
		return (this._subtheme ??= this.newSubtheme());
	}

	protected newSubtheme(): ESubthemeEditorShapeChartLine {
		return DThemes.get<ESubthemeEditorShapeChartLine>("EEditorShapeChartLine");
	}
}
