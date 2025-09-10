import security from 'eslint-plugin-security';
import pluginCypress from 'eslint-plugin-cypress';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import stylistic from '@stylistic/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ['**/*.json', '**/*.test.*'],
}, ...compat.extends(
    'eslint:recommended',
    'plugin:react/recommended',
),
security.configs.recommended,
{
    plugins: {
        security,
        pluginCypress,
        '@typescript-eslint': typescriptEslint,
        '@stylistic': stylistic
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.amd,
            ...globals.jquery
        },
    },

    settings: {
        react: {
            version: 'detect',
        },
    },

    rules: {
        '@stylistic/indent': ['error', 4],
        '@stylistic/max-len': [2, {
            code: 80,
            tabWidth: 4,
            ignoreUrls: true,
        }],
        'linebreak-style': ['error', 'unix'],

        'no-unused-vars': ['error', {
            vars: 'all',
            args: 'none',
        }],

        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'space-before-function-paren': ['error', 'never'],
        'space-in-parens': ['error', 'never'],
        'no-trailing-spaces': ['error'],

        'key-spacing': ['error', {
            beforeColon: false,
        }],

        'func-call-spacing': ['error', 'never'],
        'security/detect-buffer-noassert': 1,
        'security/detect-child-process': 1,
        'security/detect-disable-mustache-escape': 1,
        'security/detect-eval-with-expression': 1,
        'security/detect-new-buffer': 1,
        'security/detect-no-csrf-before-method-override': 1,
        'security/detect-non-literal-fs-filename': 1,
        'security/detect-non-literal-regexp': 1,
        'security/detect-non-literal-require': 0,
        'security/detect-object-injection': 0,
        'security/detect-possible-timing-attacks': 1,
        'security/detect-pseudoRandomBytes': 1,
        'security/detect-unsafe-regex': 1,
    },
}, ...compat.extends(
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
).map(config => ({
    ...config,
    files: ['**/*.{ts,tsx}', '**/*.{js,jsx}'],
})), {
    files: ['**/*.{ts,tsx}', '**/*.{js,jsx}'],

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 5,
        sourceType: 'script',

        parserOptions: {
            project: ['./tsconfig.json'],
        },
    },
}];