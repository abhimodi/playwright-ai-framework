import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    {
        ignores: [
            'node_modules/**',
            'dist/**',
            'playwright-report/**',
            'reports/**',
            'test-results/**'
        ]
    },

    js.configs.recommended,

    ...tseslint.configs.recommended,

    {
        files: ['**/*.ts'],

        plugins: {
            import: importPlugin,
            'unused-imports': unusedImports
        },

        languageOptions: {
            parserOptions: {
                project: './tsconfig.json'
            }
        },

        rules: {
            /* ===== Best Practices ===== */
            'no-console': 'off',
            'no-debugger': 'warn',
            'no-duplicate-imports': 'error',

            /* ===== Imports ===== */
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true
                    }
                }
            ],

            /* ===== Unused ===== */
            '@typescript-eslint/no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_'
                }
            ],

            /* ===== TypeScript ===== */
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/consistent-type-imports': 'error'
        }
    },

    eslintConfigPrettier
];
