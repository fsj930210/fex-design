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
      id: 'styling',
      title: '结构化样式',
      description: '通过语义 class 和 style 定制 loading 区域。',
    },
  ],
} as const
