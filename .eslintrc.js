module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:react/recommended',
    // 'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/jsx-runtime',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint', 'react-refresh', 'jsx-a11y', 'prettier'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
  },
}

// module.exports = {
//   roor: true,
//   env: {
//     browser: true,
//     es2020: true,
//     node: true,
//   },
//   extends: [
//     // 'eslint:recommended',
//     // 'plugin:@typescript-eslint/recommended',
//     'plugin:react/recommended',
//     'plugin:@typescript-eslint/recommended-type-checked',
//     'plugin:react-hooks/recommended',
//     'plugin:jsx-a11y/recommended',
//     'plugin:react/jsx-runtime',
//     // 'prettier',
//   ],
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     // ecmaVersion: 11,
//     ecmaVersion: 'latest',
//     sourceType: 'module',
//     project: ['./tsconfig.json', './tsconfig.node.json'],
//   },
//   // plugins: ['@typescript-eslint'],
//   plugins: ['react-refresh', 'jsx-a11y', 'prettier'],
//   globals: {
//     describe: true,
//     it: true,
//     expect: true,
//     jest: true,
//   },
//   rules: {
//     // '@typescript-eslint/ban-ts-comment': 1,
//   },
// }

// module.exports = {
//   root: true,
//   env: {
//     browser: true,
//     es2020: true,
//     node: true,
//   },
//   overrides: [
//     {
//       files: ['**/*.cjs'],
//       env: {
//         node: true,
//       },
//     },
//   ],
//   extends: [
//     // 'eslint:recommended',
//     'plugin:react/recommended',
//     // 'plugin:@typescript-eslint/recommended',
//     'plugin:@typescript-eslint/recommended-type-checked',
//     'plugin:react-hooks/recommended',
//     'plugin:jsx-a11y/recommended',
//     'plugin:react/jsx-runtime',
//   ],
//   ignorePatterns: ['dist', '.eslintrc.cjs', 'Jenkinsfile'],
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     ecmaVersion: 'latest',
//     sourceType: 'module',
//     project: ['./tsconfig.json', './tsconfig.node.json'],
//     tsconfigRootDir: __dirname,
//   },
//   plugins: ['react-refresh', 'jsx-a11y', 'prettier'],
//   rules: {
//     'react-refresh/only-export-components': [
//       'warn',
//       { allowConstantExport: true },
//     ],
//     // 'eslint@typescript-eslint/no-unnecessary-type-assertion': 'warn',
//     '@typescript-eslint/no-misused-promises': [
//       'error',
//       {
//         checksVoidReturn: false,
//       },
//     ],
//     '@typescript-eslint/no-unused-vars': [
//       'error',
//       {
//         args: 'all',
//         argsIgnorePattern: '^_',
//         varsIgnorePattern: '^_',
//         caughtErrorsIgnorePattern: '^_',
//         destructuredArrayIgnorePattern: '^_',
//       },
//     ],
//     '@typescript-eslint/no-floating-promises': 'off',
//   },
// }
