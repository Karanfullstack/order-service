// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
export default tseslint.config(
    {
        rules: {
            'dot-notation': 'error',
        },
    },
    {
        ignores: [
            'dist/*', // ignore its content
        ],
    },
    eslintConfigPrettier,
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
);
