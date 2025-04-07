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
      'no-unused-vars': ['warn', {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,       // 구조분해 후 남은 rest만 써도 허용
        varsIgnorePattern: '^_',        // 변수명이 _로 시작하면 무시
        argsIgnorePattern: '^_',        // 함수 인자도 _로 시작하면 무시
      }],
    },
  },
];
