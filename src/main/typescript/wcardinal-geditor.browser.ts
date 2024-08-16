import * as geditor from "./wcardinal/geditor/index.browser";

const global = window as any;
global.wcardinal = global.wcardinal || {};
global.wcardinal.geditor = geditor;
