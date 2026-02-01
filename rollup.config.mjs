import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import pckg from "./package.json" with { type: "json" };
import path from "path";
import copy from "rollup-plugin-copy";
import terser from "@rollup/plugin-terser";
import fse from "fs-extra";

// In/out directories
const DIR_DIST = "dist/";
const DIR_JS = "src/main/sample/js/";
const DIR_JS_WCGE_ROOT = `${DIR_JS}wcardinal-geditor/`;
const DIR_JS_WCGE = `${DIR_JS_WCGE_ROOT}latest/`;
const DIR_JS_PIXI_ROOT = `${DIR_JS}pixi/`;
const DIR_JS_PIXI = `${DIR_JS_PIXI_ROOT}latest/`;
const DIR_JS_WCUI_ROOT = `${DIR_JS}wcardinal-ui/`;
const DIR_JS_WCUI = `${DIR_JS_WCUI_ROOT}latest/`;

// Copy node modules
console.log(`\x1b[32mEmptying ${DIR_JS_WCGE_ROOT}\x1b[39m`);
fse.emptyDirSync(DIR_JS_WCGE_ROOT);

console.log(`\x1b[32mEmptying ${DIR_JS_PIXI_ROOT}\x1b[39m`);
fse.emptyDirSync(DIR_JS_PIXI_ROOT);

console.log(`\x1b[32mEmptying ${DIR_JS_WCUI_ROOT}\x1b[39m`);
fse.emptyDirSync(DIR_JS_WCUI_ROOT);

console.log(`\x1b[32mCopying node modules to ${DIR_JS}\x1b[39m`);
const filter = (src) => src.endsWith("/") || src.endsWith(".js") || src.endsWith(".js.map");
fse.copySync("./node_modules/pixi.js/dist/", DIR_JS_PIXI, { filter });
fse.copySync("./node_modules/@wcardinal/wcardinal-ui/dist/", DIR_JS_WCUI, { filter });

// Banner
const BANNER =
`/*
 WinterCardinal Graphic Editor v${pckg.version}
 Copyright (C) TOSHIBA Coorporation
 SPDX-License-Identifier: Apache-2.0

 Material Design icons by Google
 Apache license version 2.0.
*/`

// Terser options
const TERSER_OPTIONS = {
	compress: {
		passes: 3
	},
	output: {
		preamble: BANNER
	}
};

const EXTERNAL = [
	"pixi.js",
	"@wcardinal/wcardinal-ui"
];

const GLOBALS = {
	"pixi.js": "PIXI",
	"@wcardinal/wcardinal-ui": "wcardinal.ui"
};

const identity = () => {
	return {};
};

const minifier = ( process.env.ROLLUP_WATCH ? identity : terser );

export default [{
	input: `${DIR_DIST}wcardinal-geditor.browser.js`,
	output: [{
		name: "none",
		file: `${DIR_DIST}wcardinal-geditor.js`,
		format: "iife",
		banner: BANNER,
		freeze: false,
		globals: GLOBALS
	}],
	plugins: [
		nodeResolve(),
		commonjs(),
		copy({
			targets: [
				{ src: "dist/wcardinal-geditor.js", dest: DIR_JS_WCGE }
			],
			hook: "writeBundle"
		})
	],
	external: EXTERNAL
}, {
	input: `${DIR_DIST}wcardinal-geditor.esm.js`,
	output: [{
		file: `${DIR_DIST}wcardinal-geditor.cjs.js`,
		format: "cjs",
		banner: BANNER
	}],
	plugins: [
		nodeResolve(),
		commonjs()
	],
	external: EXTERNAL
}, {
	input: `${DIR_DIST}wcardinal-geditor.browser.js`,
	output: [{
		name: "none",
		file: `${DIR_DIST}wcardinal-geditor.min.js`,
		format: "iife",
		sourcemap: true,
		sourcemapPathTransform: ( relativePath ) => {
			return path.relative( "../src/main/typescript/", relativePath )
		},
		banner: BANNER,
		freeze: false,
		globals: GLOBALS
	}],
	plugins: [
		nodeResolve(),
		commonjs(),
		minifier( TERSER_OPTIONS ),
		copy({
			targets: [
				{ src: "dist/wcardinal-geditor.min.js", dest: DIR_JS_WCGE },
				{ src: "dist/wcardinal-geditor.min.js.map", dest: DIR_JS_WCGE }
			],
			hook: "writeBundle"
		})
	],
	external: EXTERNAL
}, {
	input: `${DIR_DIST}wcardinal-geditor-theme-default-en-us.browser.js`,
	output: [{
		name: "none",
		file: `${DIR_DIST}wcardinal-geditor-theme-default-en-us.js`,
		format: "iife",
		banner: BANNER,
		freeze: false,
		globals: GLOBALS
	}],
	plugins: [
		nodeResolve(),
		commonjs(),
		copy({
			targets: [
				{ src: "dist/wcardinal-geditor-theme-default-en-us.js", dest: DIR_JS_WCGE },
				{ src: "dist/wcardinal-geditor-theme-default-en-us.js", dest: DIR_DIST, rename: "wcardinal-geditor-theme-default.js" },
				{ src: "dist/wcardinal-geditor-theme-default-en-us.js", dest: DIR_JS_WCGE, rename: "wcardinal-geditor-theme-default.js" }
			],
			hook: "writeBundle"
		})
	],
	external: EXTERNAL
}, {
	input: `${DIR_DIST}wcardinal-geditor-theme-default-en-us.browser.js`,
	output: [{
		name: "none",
		file: `${DIR_DIST}wcardinal-geditor-theme-default-en-us.min.js`,
		format: "iife",
		sourcemap: true,
		sourcemapPathTransform: ( relativePath ) => {
			return path.relative( "../src/main/typescript/", relativePath )
		},
		banner: BANNER,
		freeze: false,
		globals: GLOBALS
	}],
	plugins: [
		nodeResolve(),
		commonjs(),
		minifier( TERSER_OPTIONS ),
		copy({
			targets: [
				{ src: "dist/wcardinal-geditor-theme-default-en-us.min.js", dest: DIR_JS_WCGE },
				{ src: "dist/wcardinal-geditor-theme-default-en-us.min.js.map", dest: DIR_JS_WCGE },
				{ src: "dist/wcardinal-geditor-theme-default-en-us.min.js", dest: DIR_DIST, rename: "wcardinal-geditor-theme-default.min.js" },
				{ src: "dist/wcardinal-geditor-theme-default-en-us.min.js.map", dest: DIR_DIST, rename: "wcardinal-geditor-theme-default.min.js.map" },
				{ src: "dist/wcardinal-geditor-theme-default-en-us.min.js", dest: DIR_JS_WCGE, rename: "wcardinal-geditor-theme-default.min.js" },
				{ src: "dist/wcardinal-geditor-theme-default-en-us.min.js.map", dest: DIR_JS_WCGE, rename: "wcardinal-geditor-theme-default.min.js.map" }
			],
			hook: "writeBundle"
		})
	],
	external: EXTERNAL
}, {
	input: `${DIR_DIST}wcardinal-geditor-theme-default-ja-jp.browser.js`,
	output: [{
		name: "none",
		file: `${DIR_DIST}wcardinal-geditor-theme-default-ja-jp.js`,
		format: "iife",
		banner: BANNER,
		freeze: false,
		globals: GLOBALS
	}],
	plugins: [
		nodeResolve(),
		commonjs(),
		copy({
			targets: [
				{ src: "dist/wcardinal-geditor-theme-default-ja-jp.js", dest: DIR_JS_WCGE }
			],
			hook: "writeBundle"
		})
	],
	external: EXTERNAL
}, {
	input: `${DIR_DIST}wcardinal-geditor-theme-default-ja-jp.browser.js`,
	output: [{
		name: "none",
		file: `${DIR_DIST}wcardinal-geditor-theme-default-ja-jp.min.js`,
		format: "iife",
		sourcemap: true,
		sourcemapPathTransform: ( relativePath ) => {
			return path.relative( "../src/main/typescript/", relativePath )
		},
		banner: BANNER,
		freeze: false,
		globals: GLOBALS
	}],
	plugins: [
		nodeResolve(),
		commonjs(),
		minifier( TERSER_OPTIONS ),
		copy({
			targets: [
				{ src: "dist/wcardinal-geditor-theme-default-ja-jp.min.js", dest: DIR_JS_WCGE },
				{ src: "dist/wcardinal-geditor-theme-default-ja-jp.min.js.map", dest: DIR_JS_WCGE }
			],
			hook: "writeBundle"
		})
	],
	external: EXTERNAL
}];
