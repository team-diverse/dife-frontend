import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import sytlisticTs from "@stylistic/eslint-plugin-ts";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
    { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReactConfig,
    {
        plugins: {
          "@stylistic/ts": sytlisticTs,
        },
        rules: {
          "@stylistic/ts/indent": ['error', 4],
          "@stylistic/ts/semi": ['error', "always"],
        },
        settings: {
          react: {
            version: "detect",
          }
        }
    },
    eslintConfigPrettier,
];
