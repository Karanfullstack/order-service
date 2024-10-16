// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
export default tseslint.config(
   {
      rules: {
         'dot-notation': 'error',
         'no-console': 'error',
      },
   },
   {
      ignores: ['dist/**/*.ts', 'dist/**', '**/*.mjs', 'eslint.config.mjs', '**/*.js'],
   },
   eslintConfigPrettier,
   eslint.configs.recommended,
   ...tseslint.configs.recommendedTypeChecked,
   {
      languageOptions: {
         parserOptions: {
            project: './tsconfig.json',
            projectService: true,
            tsconfigRootDir: import.meta.dirname,
         },
      },
   },
);
