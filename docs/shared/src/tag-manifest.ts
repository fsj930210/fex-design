export const tagExamples = {
  primitive: [
    { id: 'basic', title: '基础使用', description: '展示常规 Tag、三种尺寸、TagClose 和 disabled 状态。' },
    { id: 'variants', title: 'Variant', description: '依次展示 filled、solid 和 outlined。' },
    { id: 'colors', title: 'Color', description: '展示五种预设色和通过 color 传入的自定义 CSS 颜色。' },
    { id: 'dynamic', title: '添加、删除 Tag', description: '组合 TagClose 动态添加和删除标签。' },
    { id: 'css-variables', title: 'CSS 变量覆盖', description: '覆盖 primary 和 danger 的组件级颜色变量。' },
    { id: 'direction', title: 'LTR 与 RTL', description: '使用原生 dir 展示左右书写方向和关闭按钮位置。' },
  ],
  ui: [
    { id: 'basic', title: '基础使用', description: '展示常规 Tag、三种尺寸、closable 和 disabled。' },
    { id: 'variants', title: 'Variant', description: '依次展示 filled、solid 和 outlined。' },
    { id: 'colors', title: 'Color', description: '展示五种预设色和通过 color 传入的自定义 CSS 颜色。' },
    { id: 'dynamic', title: '添加、删除 Tag', description: '使用 closable 动态添加和删除标签。' },
    { id: 'css-variables', title: 'CSS 变量覆盖', description: '覆盖 primary 和 danger 的组件级颜色变量。' },
    { id: 'direction', title: 'LTR 与 RTL', description: '使用原生 dir 展示左右书写方向和关闭按钮位置。' },
    { id: 'semantic-styles', title: '结构化样式', description: '使用 classNames 和 styles 定制 root 与 close。' },
  ],
} as const
