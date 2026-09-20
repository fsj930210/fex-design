export const selectExamples = {
  primitive: [
    { id: 'basic', title: '基础组合', description: '组合 Root、Trigger、Content 与 Item。' },
    { id: 'virtual', title: '虚拟列表', description: '只渲染可视区与 overscan 项目。' },
  ],
  ui: [
    { id: 'basic', title: '基础用法', description: '使用 items 快速生成单选。' },
    { id: 'single', title: '单选', description: '单选值与受控变化。' },
    { id: 'multiple', title: '多选', description: '多选值、标签和最大数量。' },
    { id: 'field-names', title: '字段映射', description: '把任意对象字段映射为 value 与 label。' },
    { id: 'group', title: '分组', description: '使用分组和分组标题组织选项。' },
    { id: 'local-search', title: '本地搜索', description: '在已有选项中进行搜索。' },
    { id: 'remote-search', title: '远程搜索', description: '通过 onSearch 接入异步数据。' },
    { id: 'custom-search', title: '自定义搜索', description: '自定义搜索过滤逻辑。' },
    { id: 'clear', title: '清除', description: '复用 Input 的清除行为。' },
    { id: 'empty-demo', title: '空状态', description: '没有匹配选项时显示自定义内容。' },
    { id: 'popup-render-demo', title: '自定义面板', description: '扩展 Popover 面板内容。' },
    { id: 'prefix-suffix-demo', title: '前后缀', description: '通过 inputProps 自定义输入内容。' },
    { id: 'virtual', title: '虚拟列表', description: 'UI 与 Primitive 使用同一虚拟化能力。' },
  ],
} as const
