module.exports = {
  root: true, // Prevent ESLint from looking for configs in parent folders
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    node: true, // Enable Node.js global variables and Node.js scoping.
    es2020: true, // Enable ES2020 globals (matches tsconfig.json target)
  },
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    // Add any custom rules here
    // For example, to enforce specific quote styles:
    // "quotes": ["error", "single"],
    "@typescript-eslint/no-explicit-any": "warn", // Warn on 'any' type
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], // Warn on unused vars, allowing _ prefix
  },
  ignorePatterns: [
    "node_modules/",
    "dist/",
    ".eslintrc.js", // Don't lint the ESLint config itself by default
    "coverage/",
    "*.md"
  ]
};
