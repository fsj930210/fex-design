export const inputExamples = {
  primitive: [
    { id: 'basic', title: '基础组合', description: '组合 Root、Control 与 Clear。' },
    {
      id: 'sizes',
      title: '尺寸',
      description: '展示 sm、md、lg 三种内置尺寸，高度分别为 24px、32px、44px。',
    },
    {
      id: 'variants',
      title: '形态变体',
      description: '展示 outlined、filled、borderless 与 underlined。',
    },
    { id: 'controlled', title: '受控与非受控', description: '使用 InputRoot 管理受控和非受控值。' },
    { id: 'affixes', title: '前后缀与 Addon', description: '展示四个结构区域。' },
    { id: 'group', title: '组合', description: '连接 Input 与 Button，以及 Input 与 Input。' },
    {
      id: 'password',
      title: '密码组合',
      description: '使用 Control、Suffix 和原生按钮组合密码可见性。',
    },
    {
      id: 'search',
      title: '搜索组合',
      description: '使用 Prefix、Addon 和 Button 组合各种搜索入口。',
    },
    { id: 'states', title: '原生状态', description: '展示 disabled、readOnly 与 aria-invalid。' },
    {
      id: 'validation',
      title: '校验失败',
      description: '使用 aria-invalid 展示错误样式，并通过 aria-describedby 关联错误说明。',
    },
    {
      id: 'focus',
      title: '命令式聚焦',
      description: '通过 InputControl 的原生元素引用调用 focus、blur 和 select。',
    },
  ],
  ui: [
    {
      id: 'basic',
      title: '基础 Input',
      description: '基础输入以及有值时按交互状态显示的清除按钮。',
    },
    {
      id: 'sizes',
      title: '尺寸',
      description: '展示 sm、md、lg 三种内置尺寸，与 Primitive 保持同一场景。',
    },
    { id: 'variants', title: '形态变体', description: '展示四种内置输入形态。' },
    { id: 'controlled', title: '受控与非受控', description: '展示内部状态和外部设置、清空。' },
    {
      id: 'affixes',
      title: 'Prefix、Suffix 与 Addon',
      description: '展示内容区域和可交互文本按钮。',
    },
    { id: 'group', title: 'InputGroup', description: '连接多个 Input 与 Button。' },
    { id: 'password', title: 'InputPassword', description: '展示密码可见性、关闭切换和错误状态。' },
    {
      id: 'search',
      title: 'InputSearch',
      description: '展示 loading、Enter、各位置搜索入口及移除默认按钮。',
    },
    {
      id: 'states',
      title: '状态',
      description: '展示 disabled、readOnly 和 aria-invalid，与 Primitive 保持同一场景。',
    },
    {
      id: 'validation',
      title: '校验失败',
      description: '展示与 Primitive 相同的错误样式和可访问错误说明。',
    },
    {
      id: 'focus',
      title: '命令式聚焦',
      description: '通过框架原生引用调用 focus、blur 和 select。',
    },
    {
      id: 'semantic-styles',
      title: '结构化样式',
      description: '使用 classNames、styles、CSS Variables 和状态选择器定制。',
    },
  ],
} as const
