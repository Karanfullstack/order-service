import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
    // global ignores
    {
        ignores: ['dist/', 'node_modules/', 'package.json', 'package-lock.json'],
    },

    // applies to everything
    eslint.configs.recommended,

    // applies only to ts files
    {
        name: 'tseslint',
        files: ['src/**/*.ts'],
        extends: [
            //
            ...tseslint.configs.recommendedTypeChecked,
        ],
        plugins: {
            '@typescript-eslint': tseslint.plugin,
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: true,
            },
        },
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_', // Allows unused function arguments starting with _
                    varsIgnorePattern: '^_', // Allows unused variables starting with _
                },
            ],
            '@typescript-eslint/require-await': 'off',
        },
    },

    // global variables, applies to everything
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },

    // prettier config
    prettier,
);
