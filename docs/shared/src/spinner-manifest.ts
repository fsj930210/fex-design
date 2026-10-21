export const spinnerExamples = {
  primitive: [
    { id: 'basic', title: '基础用法', description: '独立 Spinner。' },
    { id: 'sizes', title: '尺寸', description: '展示小、中、大三种指示器尺寸。' },
    { id: 'custom-indicator', title: '自定义指示器', description: '替换默认 LoadingIcon。' },
    {
      id: 'overlay',
      title: '内容加载',
      description: '手动组合内容区域的 loading 遮罩，并保留原内容。',
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
    { id: 'basic', title: '基础用法', description: '独立 Spinner。' },
    { id: 'sizes', title: '尺寸', description: '展示小、中、大三种指示器尺寸。' },
    { id: 'custom-indicator', title: '自定义指示器', description: '替换默认 LoadingIcon。' },
    {
      id: 'overlay',
      title: '内容加载',
      description: '切换内容区域的 loading 遮罩，并保留原内容。',
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
