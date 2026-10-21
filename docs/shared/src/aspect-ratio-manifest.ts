export const aspectRatioExamples = {
  primitive: [
    { id: 'landscape', title: '横向比例', description: '使用 16:9 宽高比。' },
    { id: 'portrait', title: '竖向比例', description: '使用 9:16 宽高比。' },
    { id: 'square', title: '正方形比例', description: '使用 1:1 宽高比。' },
    {
      id: 'css-variables',
      title: 'CSS 变量',
      description: '定制自身和直接子组件的 CSS 变量，浮层单独设置作用域。',
      height: 440,
    },
    {
      id: 'semantic-styles',
      title: '结构化样式',
      description: '按部件归属设置 class/style，组合部件通过直接子组件 API 定制。',
      height: 440,
    },
  ],
  ui: [
    { id: 'landscape', title: '横向比例', description: '使用 16:9 宽高比。' },
    { id: 'portrait', title: '竖向比例', description: '使用 9:16 宽高比。' },
    { id: 'square', title: '正方形比例', description: '使用 1:1 宽高比。' },
    {
      id: 'css-variables',
      title: 'CSS 变量',
      description: '定制自身和直接子组件的 CSS 变量，浮层单独设置作用域。',
      height: 440,
    },
    {
      id: 'semantic-styles',
      title: '结构化样式',
      description: '按部件归属设置 class/style，组合部件通过直接子组件 API 定制。',
      height: 440,
    },
  ],
} as const
