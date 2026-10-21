export const timePickerExamples = {
  primitive: [
    {
      id: 'confirm',
      title: '选择确认',
      description: '调用方组合受控值与底部操作，确认提交，取消或关闭恢复已提交值。',
      height: 600,
    },
    {
      id: 'range',
      title: '时间范围',
      description: '共用输入外框、后缀、清除与一个浮层；默认确认后提交整个区间，也可显式关闭确认。',
      height: 800,
    },
    { id: 'sizes', title: '三种大小', description: 'sm、md、lg 输入与时间面板。', height: 700 },
    {
      id: 'appearance',
      title: '形态变体',
      description: 'outlined、filled、borderless、underlined 四种形态。',
      height: 800,
    },
    {
      id: 'affixes',
      title: '前后缀',
      description: '默认时钟图标、自定义前后缀及时间区域标识。',
      height: 700,
    },
    {
      id: 'css-variables',
      title: 'CSS 变量',
      description: '定制输入背景、文字、边框与聚焦光环。',
      height: 650,
    },
    {
      id: 'form-appearance',
      title: '表单反馈样式',
      description:
        '由调用方施加 form-error / form-warning 类；组件仅提供外观，不创建校验状态。CSS 变量可快速定制颜色。',
      height: 1100,
    },
    { id: 'basic', title: '基本用法', description: '默认输入和时间列。', height: 480 },
    {
      id: 'controlled',
      title: '受控与非受控',
      description:
        '外部按钮设置、清空 value 和控制 open；对照仅初始化读取 defaultValue 的非受控输入。',
      height: 780,
    },
    {
      id: 'format',
      title: '格式与步长',
      description: '对照 format 自动显示时分秒、时分、分秒、仅小时及 12 小时时段列，并演示步长。',
      height: 820,
    },
    {
      id: 'disabled',
      title: '禁用与只读',
      description: '禁用阻止打开与修改，只读允许查看。',
      height: 480,
    },
    {
      id: 'disabled-time',
      title: '禁用时间',
      description: '输入和列选择共用依赖时间约束。',
      height: 480,
    },
    {
      id: 'trigger',
      title: '自定义触发元素',
      description: '替换默认 Input，保留原生触发绑定。',
      height: 480,
    },
    {
      id: 'item',
      title: '自定义列内容',
      description: '修改选项内容，保留按钮语义和交互。',
      height: 480,
    },
    { id: 'direction', title: '阅读方向', description: 'LTR 与 RTL 使用相同组合。', height: 480 },
    {
      id: 'logic',
      title: 'useTimePicker',
      description: '使用 useTimePicker 手写 DOM 实现自己的 TimePicker。',
      height: 480,
    },
    {
      id: 'semantic-styles',
      title: '结构化样式',
      description: '按部件归属设置 class/style，组合部件通过直接子组件 API 定制。',
      height: 700,
    },
  ],
  ui: [
    {
      id: 'confirm',
      title: '选择确认',
      description: '调用方组合受控值与底部操作，确认提交，取消或关闭恢复已提交值。',
      height: 600,
    },
    {
      id: 'range',
      title: '时间范围',
      description: '共用输入外框、后缀、清除与一个浮层；默认确认后提交整个区间，也可显式关闭确认。',
      height: 800,
    },
    { id: 'sizes', title: '三种大小', description: 'sm、md、lg 输入与时间面板。', height: 700 },
    {
      id: 'appearance',
      title: '形态变体',
      description: 'outlined、filled、borderless、underlined 四种形态。',
      height: 800,
    },
    {
      id: 'affixes',
      title: '前后缀',
      description: '默认时钟图标、自定义前后缀及时间区域标识。',
      height: 700,
    },
    {
      id: 'css-variables',
      title: 'CSS 变量',
      description: '定制输入背景、文字、边框与聚焦光环。',
      height: 650,
    },
    {
      id: 'semantic-styles',
      title: '结构化样式',
      description: '通过 classNames 和 styles 分别定制输入、浮层、时间列及选中项。',
      height: 700,
    },
    {
      id: 'form-appearance',
      title: '表单反馈样式',
      description:
        '由调用方施加 form-error / form-warning 类；组件仅提供外观，不创建校验状态。CSS 变量可快速定制颜色。',
      height: 1100,
    },
    { id: 'basic', title: '基本用法', description: '默认输入和时间列。', height: 480 },
    {
      id: 'controlled',
      title: '受控与非受控',
      description:
        '外部按钮设置、清空 value 和控制 open；对照仅初始化读取 defaultValue 的非受控输入。',
      height: 780,
    },
    {
      id: 'format',
      title: '格式与步长',
      description: '对照 format 自动显示时分秒、时分、分秒、仅小时及 12 小时时段列，并演示步长。',
      height: 820,
    },
    {
      id: 'disabled',
      title: '禁用与只读',
      description: '禁用阻止打开与修改，只读允许查看。',
      height: 480,
    },
    {
      id: 'disabled-time',
      title: '禁用时间',
      description: '输入和列选择共用依赖时间约束。',
      height: 480,
    },
    {
      id: 'trigger',
      title: '自定义触发元素',
      description: '替换默认 Input，保留原生触发绑定。',
      height: 480,
    },
    {
      id: 'item',
      title: '自定义列内容',
      description: '修改选项内容，保留按钮语义和交互。',
      height: 480,
    },
    { id: 'direction', title: '阅读方向', description: 'LTR 与 RTL 使用相同组合。', height: 480 },
    {
      id: 'logic',
      title: 'useTimePicker',
      description: '使用 useTimePicker 手写 DOM 实现自己的 TimePicker。',
      height: 480,
    },
  ],
} as const
