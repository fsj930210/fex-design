export const anchorExamples = {
  primitive: [
    { id: 'basic', title: '基础用法', description: '使用结构化部件组合纵向 Anchor。' },
    { id: 'horizontal', title: '横向', description: '横向排列一级项目并同步指示条。' },
    { id: 'progress', title: 'Progress', description: '连续高亮已经阅读的项目。' },
    { id: 'controlled', title: '受控与非受控', description: '默认激活第二项，并在 change 时打印状态。' },
    { id: 'offset', title: '自定义 Offset', description: 'Item 的 targetOffset 覆盖 AnchorRoot 的值。' },
    { id: 'direction', title: 'LTR 与 RTL', description: '对照中文 LTR 与阿拉伯语 RTL。' },
    { id: 'custom-click', title: '自定义 onClick', description: '原生点击先执行，并可阻止内部滚动。' },
    { id: 'click-lock', title: '点击保持高亮', description: '目标无法到达阈值时，仍保持被点击项高亮。' },
  ],
  ui: [
    { id: 'basic', title: '基础用法', description: '通过 items 快速创建纵向 Anchor。' },
    { id: 'horizontal', title: '横向', description: '横向排列一级项目并同步指示条。' },
    { id: 'progress', title: 'Progress', description: '连续高亮已经阅读的项目。' },
    { id: 'controlled', title: '受控与非受控', description: '默认激活第二项，并在 change 时打印状态。' },
    { id: 'offset', title: '自定义 Offset', description: 'Item 的 targetOffset 覆盖 Anchor 的值。' },
    { id: 'direction', title: 'LTR 与 RTL', description: '对照中文 LTR 与阿拉伯语 RTL。' },
    { id: 'custom-click', title: '自定义 onClick', description: '处理项目点击，并可阻止内部滚动。' },
    { id: 'click-lock', title: '点击保持高亮', description: '目标无法到达阈值时，仍保持被点击项高亮。' },
    { id: 'semantic-styles', title: '结构化样式', description: '通过 UI 独有的 classNames 与 styles 定制语义部件。' },
  ],
} as const
