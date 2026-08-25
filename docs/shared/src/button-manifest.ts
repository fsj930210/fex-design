export const buttonExamples = {
  primitive: [
    {
      id: 'basic',
      title: '基础用法',
      description: '默认白底按钮与 Primary 实心按钮；Primitive 可直接使用内置 variant 与 color。',
    },
    {
      id: 'variants',
      title: '变体与语义色',
      description: '对照五种内置语义色、自定义色与渐变色，并展示六种 variant 的组合。',
    },
    { id: 'sizes', title: '尺寸', description: '对照内置尺寸，并使用高度、间距和字号 class 自定义尺寸。' },
    {
      id: 'states',
      title: '状态',
      description: '用鼠标悬停或 Tab 查看交互态；Pressed 仅用于可切换按钮。',
    },
    {
      id: 'loading',
      title: '加载',
      description: '对比内置加载图标的位置，并通过 ButtonIcon 组合自定义加载指示器。',
    },
    { id: 'icons', title: '图标', description: '通过 ButtonIcon 组合前置、后置或纯图标按钮。' },
    {
      id: 'direction',
      title: 'LTR 与 RTL',
      description: '验证逻辑起止方向下的 ButtonIcon 位置与 ButtonGroup 连接边界。',
    },
    {
      id: 'effects',
      title: '交互效果',
      description: '使用状态 class 组合 hover、press 和 underline 反馈。',
    },
    {
      id: 'combinations',
      title: '组合用法',
      description: '组合自定义颜色、图标、状态与 ButtonGroup。',
    },
    { id: 'group', title: '按钮组', description: '连接式、有间距与垂直按钮组。' },
  ],
  ui: [
    { id: 'basic', title: '基础用法', description: '默认白底按钮与 Primary 实心按钮。' },
    {
      id: 'variants',
      title: '变体与语义色',
      description: '对照五种内置语义色、自定义色与渐变色，并展示六种 variant 的组合。',
    },
    { id: 'sizes', title: '尺寸', description: '文本与图标按钮的内置尺寸，以及直接覆盖尺寸变量的自定义尺寸。' },
    {
      id: 'states',
      title: '状态',
      description: '用鼠标悬停或 Tab 查看交互态；Pressed 仅用于可切换按钮。',
    },
    { id: 'loading', title: '加载', description: '对比提交中的禁用行为、内置加载图标位置和自定义加载指示器。' },
    { id: 'icons', title: '图标', description: '图标位于文本前方、后方或单独使用。' },
    {
      id: 'direction',
      title: 'LTR 与 RTL',
      description: '同时展示左右书写方向下的图标位置与按钮组连接边界。',
    },
    {
      id: 'effects',
      title: '交互效果',
      description: '可选的 hover、press、underline 等视觉反馈。',
    },
    {
      id: 'combinations',
      title: '组合用法',
      description: '视觉类型、图标、加载和效果的常见组合。',
    },
    {
      id: 'group',
      title: '按钮组',
      description:
        '连接式按钮共享边界，适合互斥或连续操作；spacing 创建有间距的独立操作组，orientation="vertical" 改为垂直排列。',
    },
  ],
} as const
