export const emptyExamples = {
  primitive: [
    { id: 'basic', title: '基础用法', description: '组合内置图形、标题和描述。' },
    { id: 'content', title: '操作内容', description: '使用 EmptyContent 添加一个或多个操作。' },
    { id: 'image', title: '图片定制', description: '对比默认图形、自定义图形和隐藏图形。' },
    { id: 'direction', title: 'LTR 与 RTL', description: '使用中文 LTR 与阿拉伯语 RTL 对比内容方向和操作排列。' },
  ],
  ui: [
    { id: 'basic', title: '基础用法', description: '使用默认图形、标题和描述快速创建空状态。' },
    { id: 'content', title: '操作内容', description: '通过 children、默认 slot 或内容投影添加操作。' },
    { id: 'image', title: '图片定制', description: '对比默认图形、自定义图形和隐藏图形。' },
    { id: 'direction', title: 'LTR 与 RTL', description: '使用中文 LTR 与阿拉伯语 RTL 对比内容方向和操作排列。' },
    { id: 'styling', title: '结构化样式', description: '使用 classNames 和 styles 定制六个语义区域。' },
  ],
} as const
