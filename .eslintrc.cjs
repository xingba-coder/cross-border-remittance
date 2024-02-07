/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules:{
    'vue/multi-word-component-names': "off" 
  },
  env: {
    node: true // 项目中在 .vue 文件中直接使用 node.js 语法可能会报 ESLint 报错,只需将该项设置为 true 即可
  },
}
