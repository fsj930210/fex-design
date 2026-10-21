export const radioExamples = {
  primitive: [
    {
      id: 'form-appearance',
      title: '表单反馈样式',
      description:
        '由调用方施加 form-error / form-warning 类；组件仅提供外观，不创建校验状态。CSS 变量可快速定制颜色。',
      height: 1100,
    },
    { id: 'basic', title: '基础用法', description: '对照 Radio 与 RadioButton 的基础选择。' },
    { id: 'states', title: '状态', description: '对照两种形态的未选中、已选中和禁用状态。' },
    { id: 'sizes', title: '尺寸', description: '对照两种形态的 sm、md 和 lg 尺寸及精确像素值。' },
    {
      id: 'controlled',
      title: '受控与非受控',
      description: '用外部 Button 修改两种形态的受控值，并对照非受控值。',
    },
    { id: 'direction', title: 'LTR 与 RTL', description: '对照中文 LTR 与阿拉伯语 RTL 排列。' },
    {
      id: 'css-variables',
      title: '实例 CSS Variables',
      description: '覆盖单个 Radio 和 RadioButton 的尺寸与颜色。',
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
    { id: 'basic', title: '基础用法', description: '对照 Radio 与 RadioButton 的基础选择。' },
    { id: 'states', title: '状态', description: '对照两种形态的未选中、已选中和禁用状态。' },
    { id: 'sizes', title: '尺寸', description: '对照两种形态的 sm、md 和 lg 尺寸及精确像素值。' },
    {
      id: 'controlled',
      title: '受控与非受控',
      description: '用外部 Button 修改两种形态的受控值，并对照非受控值。',
    },
    { id: 'direction', title: 'LTR 与 RTL', description: '对照中文 LTR 与阿拉伯语 RTL 排列。' },
    {
      id: 'css-variables',
      title: '实例 CSS Variables',
      description: '覆盖单个 Radio 和 RadioButton 的尺寸与颜色。',
    },
    {
      id: 'semantic-styles',
      title: '结构化样式',
      description: '分别设置 root、control 和 label 的样式。',
    },
  ],
} as const
