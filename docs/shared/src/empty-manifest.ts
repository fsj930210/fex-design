export const emptyExamples = {
  primitive: [
    { id: 'basic', title: '基础用法', description: '组合内置图形、标题和描述。' },
    { id: 'content', title: '操作内容', description: '使用 EmptyContent 添加一个或多个操作。' },
    { id: 'image', title: '图片定制', description: '对比默认图形、自定义图形和隐藏图形。' },
    {
      id: 'direction',
      title: 'LTR 与 RTL',
      description: '使用中文 LTR 与阿拉伯语 RTL 对比内容方向和操作排列。',
    },
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
    { id: 'basic', title: '基础用法', description: '使用默认图形、标题和描述快速创建空状态。' },
    {
      id: 'content',
      title: '操作内容',
      description: '通过 children、默认 slot 或内容投影添加操作。',
    },
    { id: 'image', title: '图片定制', description: '对比默认图形、自定义图形和隐藏图形。' },
    {
      id: 'direction',
      title: 'LTR 与 RTL',
      description: '使用中文 LTR 与阿拉伯语 RTL 对比内容方向和操作排列。',
    },

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
