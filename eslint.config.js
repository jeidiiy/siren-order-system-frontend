import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import autoImportGlobals from './.eslintrc-auto-import.js';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],

  {
    languageOptions: {
      globals: {
        ...autoImportGlobals.globals,
      }
    },
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
];
