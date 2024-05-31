import playwright from "eslint-plugin-playwright"
import typescript from "@typescript-eslint/eslint-plugin"

module.exports = [
    {
        // Plugins
  plugins: {
    playwright,typescript
},
  
        rules: {
            "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_" }
    ],
    "no-console": "warn",
    "semi": ["error", "always"]
        }
    }
];