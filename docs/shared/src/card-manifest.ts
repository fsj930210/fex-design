export const cardExamples = {
  primitive: [
    {
      id: 'basic',
      title: '基础用法',
      description: '使用 CardHeader、CardContent 与 CardFooter 组合账户信息。',
    },
    {
      id: 'extra',
      title: 'Extra 区域',
      description: '使用 CardExtra 在 Header 中添加状态信息。',
    },
    {
      id: 'custom-header',
      title: '自定义 Header',
      description: '使用 CardHeader 组合自定义标题、说明、操作和统计信息。',
    },
    {
      id: 'css-variables',
      title: '实例 CSS Variables',
      description: '通过 CSS Variables 覆盖当前 Card 的圆角、边框、阴影和区域样式。',
    },
    { id: 'direction', title: 'LTR 与 RTL', description: '观察 Card 各区域在逻辑方向下的排列。' },
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
      title: '基础用法',
      description: '使用 title、description 和 footer 配置账户信息。',
    },
    { id: 'extra', title: 'Extra 区域', description: '使用 extra 在 Header 中添加状态信息。' },
    {
      id: 'custom-header',
      title: '自定义 Header',
      description: '通过 header 替换默认 Header，并定义标题区内容。',
    },

    {
      id: 'css-variables',
      title: '实例 CSS Variables',
      description: '通过 CSS Variables 覆盖当前 Card 的圆角、边框、阴影和区域样式。',
    },
    { id: 'direction', title: 'LTR 与 RTL', description: '观察 Card 快捷区域在逻辑方向下的排列。' },
    {
      id: 'semantic-styles',
      title: '结构化样式',
      description: '按部件归属设置 class/style，组合部件通过直接子组件 API 定制。',
      height: 440,
    },
  ],
} as const
