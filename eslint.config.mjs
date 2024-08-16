import typescriptEslint from "@typescript-eslint/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default [{
	ignores: ["**/node_modules", "**/dist", "**/docs", "*.mjs"],
}, ...compat.extends(
	"eslint:recommended",
	"plugin:@typescript-eslint/recommended",
	"prettier",
	"plugin:prettier/recommended",
), {
	plugins: {
		"@typescript-eslint": typescriptEslint,
		"unused-imports": unusedImports,
	},

	languageOptions: {
		globals: {
			...globals.node,
		},

		parser: tsParser,
		ecmaVersion: 5,
		sourceType: "commonjs",

		parserOptions: {
			project: "./tsconfig.json",
		},
	},
	rules: {
		"@typescript-eslint/no-inferrable-types": "off",
		"@typescript-eslint/no-empty-object-type": ["error", {
			allowObjectTypes: "never",
			allowInterfaces: "with-single-extends"
		}],
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/no-this-alias": "off",
		"@typescript-eslint/no-explicit-any": "off",

		"@typescript-eslint/explicit-module-boundary-types": ["error", {
			allowArgumentsExplicitlyTypedAsAny: true,
		}],

		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-shadow": ["error"],

		"no-constant-condition": ["error", {
			checkLoops: false,
		}],

		"no-case-declarations": "off",
		"no-shadow": "off",
		"no-unused-vars": "off",
		"unused-imports/no-unused-imports": "error",

		"unused-imports/no-unused-vars": ["warn", {
			vars: "all",
			varsIgnorePattern: "^[A-Z_]+$",
			args: "none",
		}],
	},
}];
