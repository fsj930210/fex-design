export const checkboxExamples = {
  primitive: [
    {
      id: 'form-appearance',
      title: '表单反馈样式',
      description:
        '由调用方施加 form-error / form-warning 类；组件仅提供外观，不创建校验状态。CSS 变量可快速定制颜色。',
      height: 1100,
    },
    { id: 'basic', title: '基础用法', description: '未选中与默认选中的 Checkbox。' },
    { id: 'states', title: '状态', description: '对照未选中、已选中、中间状态和禁用状态。' },
    { id: 'sizes', title: '尺寸', description: '对照 sm、md 和 lg 三种尺寸。' },
    {
      id: 'controlled',
      title: '受控与非受控',
      description: '通过外部按钮设置受控状态，并对照非受控初始值。',
    },
    { id: 'group', title: 'CheckboxGroup', description: '使用平级 value 数组管理一组选项。' },
    {
      id: 'check-all',
      title: '全选',
      description: '由业务选择结果计算 checked 和 indeterminate。',
    },
    {
      id: 'validation',
      title: '校验失败',
      description: '使用 aria-invalid，并通过 aria-describedby 关联错误说明。',
    },
    {
      id: 'custom-indicator',
      title: '自定义 Indicator',
      description: '替换选中状态使用的视觉标记。',
    },
    { id: 'direction', title: 'LTR 与 RTL', description: '对照中文 LTR 与阿拉伯语 RTL 排列。' },
    {
      id: 'css-variables',
      title: '实例 CSS Variables',
      description: '覆盖单个 Checkbox 的尺寸、背景和标记颜色。',
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
      id: 'form-appearance',
      title: '表单反馈样式',
      description:
        '由调用方施加 form-error / form-warning 类；组件仅提供外观，不创建校验状态。CSS 变量可快速定制颜色。',
      height: 1100,
    },
    { id: 'basic', title: '基础用法', description: '未选中与默认选中的 Checkbox。' },
    { id: 'states', title: '状态', description: '对照未选中、已选中、中间状态和禁用状态。' },
    { id: 'sizes', title: '尺寸', description: '对照 sm、md 和 lg 三种尺寸。' },
    {
      id: 'controlled',
      title: '受控与非受控',
      description: '通过外部按钮设置受控状态，并对照非受控初始值。',
    },
    { id: 'group', title: 'CheckboxGroup', description: '使用平级 value 数组管理一组选项。' },
    {
      id: 'check-all',
      title: '全选',
      description: '由业务选择结果计算 checked 和 indeterminate。',
    },
    {
      id: 'validation',
      title: '校验失败',
      description: '使用 aria-invalid，并通过 aria-describedby 关联错误说明。',
    },
    {
      id: 'custom-indicator',
      title: '自定义 Indicator',
      description: '替换选中状态使用的视觉标记。',
    },
    { id: 'direction', title: 'LTR 与 RTL', description: '对照中文 LTR 与阿拉伯语 RTL 排列。' },
    {
      id: 'css-variables',
      title: '实例 CSS Variables',
      description: '覆盖单个 Checkbox 的尺寸、背景和标记颜色。',
    },
    {
      id: 'semantic-styles',
      title: '结构化样式',
      description: '使用明显的颜色分别覆盖 root、control、indicator 和 label。',
    },
  ],
} as const
