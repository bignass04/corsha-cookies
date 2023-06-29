import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import esImport from 'eslint-plugin-import'; // 'import' is ambiguous & prettier has trouble

export default {
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaFeatures: { modules: true },
      ecmaVersion: 'latest',
      project: './tsconfig.json',
    },
  },
  plugins: {
    import: esImport,
    '@typescript-eslint': ts,
    ts,
    react,
    "jsx-a11y": jsxA11y,
  },
  files: ["src/**/*.{ts,tsx}"],
  ignores: ["./src/components/ErrorBoundary.tsx"],
  settings: {
    react: {
      createClass: "createReactClass", // Regex for Component Factory to use,
      pragma: "React",  // Pragma to use, default to "React"
      fragment: "Fragment",  // Fragment to use (may be a property of <pragma>), default to "Fragment"
      version: "detect"
    }
  },
  rules: {
    ...ts.configs['eslint-recommended'].rules,
    ...ts.configs.recommended.rules,
    'ts/return-await': 2,
  }
}
