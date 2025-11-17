import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      // Error detection rules
      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "no-undef": "error",
      "no-unreachable": "error",
      "no-console": "warn",
      "no-debugger": "warn",
      "no-alert": "warn",

      // React specific rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Code quality rules
      eqeqeq: ["warn", "smart"],
      "no-duplicate-imports": "error",
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-irregular-whitespace": "error",
      "no-mixed-spaces-and-tabs": "error",

      // Best practices
      "prefer-const": "warn",
      "no-var": "warn",
      "object-shorthand": "warn",
    },
  },
];
