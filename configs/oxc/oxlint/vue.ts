export default {
  plugins: ['vue'],
  rules: {
    'vue/no-reserved-component-names': [
      'error',
      {
        htmlElementCaseSensitive: true,
      },
    ],
  },
}
