export const skeletonExamples = {
  primitive: [
    {
      id: 'basic',
      title: '基本',
      description: '标明 Text、Avatar、Button、Input、Block 与 Image。',
    },
    { id: 'list', title: '列表', description: '组合头像和列表文本。' },
    { id: 'table', title: '表格', description: '组合表头、单元格和操作按钮。' },
    { id: 'image', title: '图片内容', description: '组合图片、标题和正文。' },
    { id: 'form', title: '表单', description: '组合标签、输入框和按钮。' },
    { id: 'animation', title: '动画', description: '对比无动画、呼吸和流光。' },
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
    {
      id: 'basic',
      title: '基本',
      description: '分别展示文本、头像、按钮、输入框、内容块和图片占位。',
    },
    { id: 'list', title: '列表', description: '组合头像和列表文本。' },
    { id: 'table', title: '表格', description: '组合表头、单元格和操作按钮。' },
    { id: 'image', title: '图片内容', description: '组合图片、标题和正文。' },
    { id: 'form', title: '表单', description: '组合标签、输入框和按钮。' },
    { id: 'animation', title: '动画', description: '对比无动画、呼吸和流光。' },
    { id: 'content', title: '子内容与 loading', description: '根据 loading 切换骨架和真实内容。' },
    { id: 'width', title: '宽度配置', description: '配置标题宽度和每一条段落宽度。' },

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
