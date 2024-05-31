module.exports = {
  // Language options
  languageOptions: {
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 12,
      sourceType: "module"
    }
  },

  // Extends (presets)
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],

  // Plugins
  plugins: ["@typescript-eslint", "playwright"],

  // Rules
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_" }
    ],
    "no-console": "warn",
    "semi": ["error", "always"]
  },

  // Overrides for specific file types
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": ["warn"]
      }
    },
    {
      files: ["tests/**/*"],
      extends: "plugin:playwright/recommended",
      rules: {
        "no-unused-expressions": "off"
      }
    }
  ]
};
