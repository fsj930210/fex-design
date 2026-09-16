export const inputNumberExamples = {
  primitive: [
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
      title: '自定义逻辑层',
      description: '使用 useInputNumber 驱动自定义结构和系统 Button。',
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
  ],
  ui: [
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
      title: '自定义逻辑层',
      description: '使用 useInputNumber 驱动自定义结构和系统 Button。',
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
  ],
} as const
