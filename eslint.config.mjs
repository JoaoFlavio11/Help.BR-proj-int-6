import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    rules: { },
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: "./tsconfig.json"  // Adiciona o caminho para o arquivo tsconfig.json
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
