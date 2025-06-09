module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "simple-import-sort"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // `react` and packages: Things that start with a letter (or digit or underscore), or `@` followed by a letter
          ["^react$", "^@?\\w"],
          // Internal packages
          ["^@store(/.*|$)"],
          ["^@components(/.*|$)"],
          ["^@ui(/.*|$)"],
          ["^@lib(/.*|$)"],
          ["^@pages(/.*|$)"],
          ["^@utils(/.*|$)"],
          ["^@hooks(/.*|$)"],
          ["^@services(/.*|$)"],
          // Side effect imports
          ["^\\u0000"],
          // Parent imports. Put `..` last
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          // Other relative imports. Put same-folder imports and `.` last
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          // Style imports
          ["^.+\\.(css|scss)$"],
          // Media imports
          ["^.+\\.(gif|png|svg|jpg)$"],
        ],
      },
    ],
    "simple-import-sort/exports": ["error"],
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "es2020",
  },
};
