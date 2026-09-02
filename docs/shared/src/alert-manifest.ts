export const alertExamples = {
  primitive: [
    { id: 'basic', title: '基本展示', description: '组合 Alert、AlertTitle 和 AlertDescription。' },
    { id: 'types', title: 'Type', description: '展示 success、info、warning、error 和 CSS 变量自定义颜色。' },
    { id: 'variants', title: 'Variant', description: '展示 filled、outlined 和 solid。' },
    { id: 'closable', title: '可关闭', description: '组合 AlertAction 创建可关闭提示。' },
    { id: 'carousel', title: '循环公告', description: '可复制的无缝循环公告，悬停或聚焦时暂停。' },
    { id: 'custom', title: '自定义图标与操作', description: '组合 AlertIcon 和 AlertAction。' },
    { id: 'direction', title: 'LTR 与 RTL', description: '使用原生 dir 对比两个书写方向。' },
  ],
  ui: [
    { id: 'basic', title: '基本展示', description: '展示标题和描述的常用组合。' },
    { id: 'types', title: 'Type', description: '展示四种反馈类型和 CSS 变量自定义颜色。' },
    { id: 'variants', title: 'Variant', description: '展示 filled、outlined 和 solid。' },
    { id: 'closable', title: '可关闭', description: '关闭按钮会隐藏当前 Alert，并触发关闭事件。' },
    { id: 'carousel', title: '循环公告', description: '可复制的无缝循环公告，悬停或聚焦时暂停。' },
    { id: 'custom', title: '自定义图标与操作', description: '替换内置图标并添加操作区。' },
    { id: 'direction', title: 'LTR 与 RTL', description: '使用原生 dir 对比两个书写方向。' },
    { id: 'semantic-styles', title: '语义化样式', description: '使用 classNames 和 styles 调整各语义区域。' },
  ],
} as const
