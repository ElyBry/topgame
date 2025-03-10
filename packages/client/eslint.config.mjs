import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

export default tseslint.config(
  {
    ignores: ['dist/', 'src/__mocks__/*'],
  },
  eslint.configs.recommended,
  tseslint.configs.strict,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'warn',
      'no-unsafe-optional-chaining': 'off',
      'no-debugger': 'warn',
      'no-useless-constructor': 'warn',
      'react/prop-types': 'warn',
      'prefer-const': 'warn',
      '@typescript-eslint/no-console': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unsafe-optional-chaining': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/no-useless-constructor': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
    },
    languageOptions: {
      globals: {
        process: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        global: 'readonly',
        self: 'readonly',
        window: 'readonly',
        document: 'readonly',
      },
    },
  }
)
