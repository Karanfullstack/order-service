// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
export default tseslint.config(
    {
        rules: {
            'no-console': 'error',
            'dot-notation': 'error',
        },
    },
    eslintConfigPrettier,
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
);
