(function (common) {
    'use strict';

	common.newHeader = (titleTop, titleThis) => {
		// この関数はヘッダーを作成するためにに呼び出されます。
		// 必要であればここでヘッダーを作成してください
		// 不要であればnullを返却するか、headerオプション自体を省略してください
		return (buttons) => {
			const items = [
				new wcardinal.ui.DButtonLink({
					width: "auto",
					url: "../",
					text: {
						value: titleTop,
						align: {
							horizontal: "LEFT"
						},
						style: {
							fontWeight: "bold",
							clipping: false
						}
					}
				}),
				new wcardinal.ui.DText({
					width: "auto",
					text: {
						value: "/",
						align: {
							horizontal: "LEFT"
						},
						style: {
							fontWeight: "bold",
							clipping: false
						}
					}
				}),
				new wcardinal.ui.DText({
					width: "auto",
					padding: {
						left: 10,
						right: 10
					},
					text: {
						value: titleThis,
						align: {
							horizontal: "LEFT"
						},
						style: {
							fontWeight: "bold",
							clipping: false
						}
					}
				}),
				new wcardinal.ui.DLayoutSpace({weight: 1}),
			];
			if (buttons != null) {
				for (let i = 0, imax = buttons.length; i < imax; ++i) {
					items.push(buttons[i]);
				}
			}
			items.push(
				new wcardinal.ui.DButtonAmbient({
					width: "auto",
					image: {
						source: wcardinal.geditor.iconBuilder.mappings.account
					},
					text: {
						value: "User name",
						style: {
							fontWeight: "bold",
							clipping: false
						}
					}
				}),
				new wcardinal.ui.DButtonAmbient({
					width: 30,
					image: {
						source: wcardinal.geditor.iconBuilder.mappings.more
					},
					title: "Settings"
				})
			);
			return new wcardinal.ui.DMenuBar({
				padding: 0,
				background: {
					color: null
				},
				margin: 5,
				interactive: "CHILDREN",
				items: items
			});
		};
	};
})(window.common ||= {});
