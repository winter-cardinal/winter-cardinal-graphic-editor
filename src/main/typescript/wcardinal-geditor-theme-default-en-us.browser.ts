/*
 * Copyright (C) 2019 Toshiba Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import * as d from "./wcardinal/geditor/theme/default/index-en-us";

d.loadThemeDefaultEnUsAll();

const global = window as any;
global.wcardinal = global.wcardinal || {};
const dest = (global.wcardinal.geditor = global.wcardinal.geditor || {});

const src = d as any;
for (const name in src) {
	dest[name] = src[name];
}
