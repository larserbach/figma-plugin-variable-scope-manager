/* eslint-env node */
module.exports = {
files: ["src/**/*.ts", "src/**/*.tsx"], // Your TypeScript files extension,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@figma/figma-plugins/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  root: true
}