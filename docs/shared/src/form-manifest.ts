const primitiveExamples = [
  {
    id: 'layout',
    title: '布局与标签对齐',
    description:
      '多字段对比纵向、横向和行内布局，调整标签对齐、列宽、间距与换行，并观察说明和校验反馈。',
    height: 1400,
  },
  {
    id: 'basic',
    title: '基础表单',
    description: '填写团队成员资料，展示初始值、基础校验、提交和重置。',
    height: 720,
  },
  {
    id: 'validation-feedback',
    title: '完整控件校验反馈',
    description:
      '覆盖 Input、InputNumber、Select、Switch、Checkbox、Radio、DatePicker、TimePicker、Slider，展示失败外观、修正与动态错误。',
    height: 1600,
  },
  {
    id: 'schema-validation',
    title: '第三方 Schema 校验',
    description: '展示如何接入 Zod 等第三方校验库。',
    height: 820,
  },
  {
    id: 'submit',
    title: '提交与状态',
    description: '展示异步提交、提交状态和失败反馈。',
    height: 720,
  },
  {
    id: 'events',
    title: '字段事件与业务联动',
    description: '使用显式字段事件直接完成业务联动并展示最近变化。',
    height: 720,
  },
  {
    id: 'reset',
    title: '表单重置',
    description: '修改字段后重置表单，确认值回到初始化数据。',
    height: 720,
  },
  {
    id: 'dirty-state',
    title: '编辑状态',
    description: '对照编辑记录、当前值与初始值的差异，以及重置后的状态。',
    height: 820,
  },
  {
    id: 'linked-fields',
    title: '联动与字段依赖',
    description: '条件字段、地区城市级联和依赖字段重新校验。',
    height: 1250,
  },
  {
    id: 'nested-array',
    title: '嵌套对象与动态数组',
    description: '嵌套字段路径、动态成员的新增删除与逐项校验。',
    height: 1400,
  },
  {
    id: 'field-prefix',
    title: '字段路径前缀',
    description: '复用地址字段组，通过显式前缀区分寄送与账单地址。',
    height: 1300,
  },
  {
    id: 'nested-fields',
    title: '动态增减嵌套字段',
    description: '分组和嵌套成员两层数组独立增删，校验随路径移位。',
    height: 1500,
  },
  {
    id: 'complex-dynamic',
    title: '复杂动态增减',
    description: '复制分组、独立增删嵌套成员，以及条件字段与校验的同步变化。',
    height: 1700,
  },
  {
    id: 'nested-validation',
    title: '嵌套结构与校验',
    description: '对象和数组的字段校验、名称去重与预算合计约束。',
    height: 1500,
  },
  {
    id: 'scroll',
    title: '错误定位与滚动',
    description: '默认聚焦并滚动到首个错误，或定位指定错误字段。',
    height: 720,
  },
  {
    id: 'context-only',
    title: '只提供表单上下文',
    description: '业务面板负责结构与操作，字段仍共享原生 TanStack 实例。',
    height: 720,
  },
  {
    id: 'custom-control',
    title: '自定义控件',
    description: '对象值的自定义手机号控件，显式绑定、校验、提交和重置。',
    height: 720,
  },
  {
    id: 'direction',
    title: 'LTR 与 RTL',
    description: '切换原生方向，检查横向标签、反馈和操作区的镜像布局。',
    height: 720,
  },
  {
    id: 'css-variables',
    title: 'CSS 变量',
    description: '切换局部变量，定制间距、标签及说明和错误颜色。',
    height: 980,
  },
  {
    id: 'semantic-styles',
    title: '语义样式',
    description: '通过公开部件的 class/style 或 UI classNames/styles 定制外观。',
    height: 720,
  },
]
export const formExamples = { primitive: primitiveExamples, ui: primitiveExamples }
