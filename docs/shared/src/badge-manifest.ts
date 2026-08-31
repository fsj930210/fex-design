export const badgeExamples = {
  primitive: [
    {
      id: 'basic',
      title: '基础用法',
      description: '展示数字附着、自定义内容附着，以及可独立使用的 BadgeDot 小圆点。',
    },
    { id: 'custom', title: '自定义内容', description: '直接显示自定义短内容。' },
    {
      id: 'zero',
      title: '零值显示',
      description: '使用 Switch 控制 showZero：关闭时隐藏 0，开启时显示 0；示例自行提供附着容器。',
    },
    {
      id: 'overflow',
      title: '封顶数字',
      description: '示例自行提供附着容器；超过 overflowCount 后显示为 N+。',
    },
    {
      id: 'dot',
      title: '小圆点',
      description: '使用者自行将 BadgeDot 小圆点附着到入口元素右上角。',
    },
    { id: 'colors', title: '多彩徽标', description: '展示内置预设色和任意 CSS 自定义颜色。' },
    {
      id: 'ribbon',
      title: 'BadgeRibbon 结构化组合',
      description: '把 Ribbon 直接组合到卡片或容器边缘。',
    },
    {
      id: 'group',
      title: 'BadgeGroup 集合溢出',
      description: '使用 Primitive BadgeGroup 的 maxCount 收起过多徽标，并显示 +N。',
    },
    {
      id: 'direction',
      title: 'LTR 与 RTL',
      description: '对比 LTR 与 RTL 下逻辑行内结束侧的附着位置。',
    },
  ],
  ui: [
    {
      id: 'basic',
      title: '基础用法',
      description: '展示数字附着、自定义内容附着，以及可独立使用的 BadgeDot 小圆点。',
    },
    { id: 'custom', title: '自定义内容', description: '直接显示自定义短内容。' },
    {
      id: 'zero',
      title: '零值显示',
      description: '使用 Switch 控制 showZero：关闭时隐藏 0，开启时显示 0。',
    },
    {
      id: 'overflow',
      title: '封顶数字',
      description: '超过 overflowCount 后显示为 N+，默认使用 danger。',
    },
    { id: 'dot', title: '小圆点', description: '将没有数字内容的小圆点附着到入口元素右上角。' },
    { id: 'colors', title: '多彩徽标', description: '展示内置预设色和任意 CSS 自定义颜色。' },
    {
      id: 'ribbon',
      title: 'BadgeRibbon 结构化组合',
      description: '将 Ribbon 组合到卡片或容器边缘。',
    },
    {
      id: 'group',
      title: 'BadgeGroup 集合溢出',
      description: 'UI 直接重导出 Primitive BadgeGroup，行为和示例保持一致。',
    },
    {
      id: 'direction',
      title: 'LTR 与 RTL',
      description: '对比 LTR 与 RTL 下逻辑行内结束侧的附着位置。',
    },
    {
      id: 'standalone',
      title: '独立使用',
      description: 'UI Badge 不包裹内容时可直接作为独立徽标使用。',
    },
    {
      id: 'offset',
      title: '自定义位置偏移',
      description: '使用 offset 调整 UI 附着徽标相对默认右上角的位置。',
    },
    {
      id: 'styling',
      title: '结构化样式',
      description: '使用 classNames 和 styles 分别定制 root、content 与 indicator。',
    },
  ],
} as const
