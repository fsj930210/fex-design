export const inputNumberExamples = {
  primitive: [
    {
      id: 'form-appearance',
      title: '表单反馈样式',
      description:
        '由调用方施加 form-error / form-warning 类；组件仅提供外观，不创建校验状态。CSS 变量可快速定制颜色。',
      height: 1100,
    },
    { id: 'basic', title: '基本使用', description: '受控与非受控数字值使用默认增减操作。' },
    {
      id: 'constraints',
      title: '数值约束',
      description: '展示 min、max、step、precision 与边界控制。',
    },
    {
      id: 'formatter',
      title: '解析与格式化',
      description: '金额和百分比保持展示文本与 number 值分离。',
    },
    { id: 'editing', title: '编辑与提交', description: '保留不完整输入文本，并在失焦时规范化。' },
    { id: 'controls', title: '增减控制', description: '展示默认、隐藏和可替换的增减控制。' },
    { id: 'keyboard', title: '键盘步进', description: 'ArrowUp 与 ArrowDown 按 step 修改数值。' },
    { id: 'range', title: '越界状态', description: '区分受控越界值与 min、max 动态变化。' },
    {
      id: 'custom-logic',
      title: 'useInputNumber',
      description: '使用 useInputNumber 手写 DOM 实现自己的 InputNumber。',
    },
    {
      id: 'affixes',
      title: '单位与操作共存',
      description: 'Prefix、Clear、Suffix 与增减操作同时存在。',
    },
    {
      id: 'validation',
      title: '校验失败',
      description: '使用 aria-invalid 与 aria-describedby 关联可见错误说明。',
    },
    {
      id: 'css-variables',
      title: 'CSS 变量',
      description: '定制自身和直接子组件的 CSS 变量，浮层单独设置作用域。',
      height: 440,
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
    { id: 'basic', title: '基本使用', description: '受控与非受控数字值使用默认增减操作。' },
    {
      id: 'constraints',
      title: '数值约束',
      description: '展示 min、max、step、precision 与边界控制。',
    },
    {
      id: 'formatter',
      title: '解析与格式化',
      description: '金额和百分比保持展示文本与 number 值分离。',
    },
    { id: 'editing', title: '编辑与提交', description: '保留不完整输入文本，并在失焦时规范化。' },
    { id: 'controls', title: '增减控制', description: '展示默认、隐藏和可替换的增减控制。' },
    { id: 'keyboard', title: '键盘步进', description: 'ArrowUp 与 ArrowDown 按 step 修改数值。' },
    { id: 'range', title: '越界状态', description: '区分受控越界值与 min、max 动态变化。' },
    {
      id: 'custom-logic',
      title: 'useInputNumber',
      description: '使用 useInputNumber 手写 DOM 实现自己的 InputNumber。',
    },
    {
      id: 'affixes',
      title: '单位与操作共存',
      description: 'Prefix、Clear、Suffix 与增减操作同时存在。',
    },
    {
      id: 'validation',
      title: '校验失败',
      description: '使用 aria-invalid 与 aria-describedby 关联可见错误说明。',
    },
    {
      id: 'semantic-styles',
      title: '结构化样式',
      description: '定制 root、control、clear、suffix 和增减操作。',
    },
    {
      id: 'css-variables',
      title: 'CSS 变量',
      description: '定制自身和直接子组件的 CSS 变量，浮层单独设置作用域。',
      height: 440,
    },
  ],
} as const
