export const scrollbarExamples = {
  primitive: [
    { id: 'basic', title: '纵向滚动', description: '仅开启纵向滚动，使用默认部件组合。' },
    { id: 'horizontal', title: '横向滚动', description: '关闭纵向滚动，横向浏览多个面板。' },
    { id: 'both-axes', title: '双轴滚动', description: '同时显示横向、纵向滚动条及交角。' },
    { id: 'direction', title: '阅读方向', description: '对比 LTR 与 RTL 的滚动条位置和横向交互。' },
    {
      id: 'track-visibility',
      title: '显示轨道',
      description: 'showTrack 默认关闭；开启后显示轨道与交角背景，不改变滑块尺寸和交互。',
    },
    {
      id: 'configuration',
      title: '动态配置',
      description:
        '使用 Select、InputNumber、Checkbox 调整隐藏模式、延迟和禁用状态，观察滚动位置。',
    },
    {
      id: 'visibility',
      title: '可见策略',
      description: '对比 auto、always、hidden 及内容不足一屏的情况。',
    },
    {
      id: 'interaction',
      title: '轨道与滑块交互',
      description: '点击轨道翻页或跳转，设置最小滑块尺寸，并关闭拖动。',
    },
    {
      id: 'overflow',
      title: '按轴覆盖',
      description: 'Viewport 按轴覆盖 Root，未设置的轴继承 Root 配置。',
    },
    {
      id: 'parts',
      title: 'Track 与 Thumb',
      description: '显式组合 Bar、Track、Thumb 和 Corner，保持默认外观。',
    },
    {
      id: 'css-variables',
      title: 'CSS 变量',
      description: '通过组件公开变量统一尺寸、圆角、内边距、颜色和过渡时长。',
    },
    {
      id: 'viewport',
      title: '原生容器与程序化滚动',
      description: '透传焦点与键盘属性，通过原生元素引用执行 scrollTo、scrollBy。',
    },
    {
      id: 'table',
      title: '表格与滚动条位置',
      description: '单个原生表格固定换行表头，测量高度后调整纵向轨道起点。',
    },
    {
      id: 'custom-logic',
      title: 'useScrollbar',
      description: '使用 useScrollbar 手写 DOM 实现自己的 Scrollbar。',
    },
    {
      id: 'semantic-styles',
      title: '结构化样式',
      description: '按部件归属设置 class/style，组合部件通过直接子组件 API 定制。',
      height: 440,
    },
  ],
  ui: [
    { id: 'basic', title: '纵向滚动', description: '仅开启纵向滚动，使用默认部件组合。' },
    { id: 'horizontal', title: '横向滚动', description: '关闭纵向滚动，横向浏览多个面板。' },
    { id: 'both-axes', title: '双轴滚动', description: '同时显示横向、纵向滚动条及交角。' },
    { id: 'direction', title: '阅读方向', description: '对比 LTR 与 RTL 的滚动条位置和横向交互。' },
    {
      id: 'track-visibility',
      title: '显示轨道',
      description: 'showTrack 默认关闭；开启后显示轨道与交角背景，不改变滑块尺寸和交互。',
    },
    {
      id: 'configuration',
      title: '动态配置',
      description:
        '使用 Select、InputNumber、Checkbox 调整隐藏模式、延迟和禁用状态，观察滚动位置。',
    },
    {
      id: 'visibility',
      title: '可见策略',
      description: '对比 auto、always、hidden 及内容不足一屏的情况。',
    },
    {
      id: 'interaction',
      title: '轨道与滑块交互',
      description: '点击轨道翻页或跳转，设置最小滑块尺寸，并关闭拖动。',
    },
    {
      id: 'overflow',
      title: '按轴覆盖',
      description: 'Viewport 按轴覆盖 Root，未设置的轴继承 Root 配置。',
    },
    {
      id: 'parts',
      title: 'Track 与 Thumb',
      description: '显式组合 Bar、Track、Thumb 和 Corner，保持默认外观。',
    },

    {
      id: 'css-variables',
      title: 'CSS 变量',
      description: '通过组件公开变量统一尺寸、圆角、内边距、颜色和过渡时长。',
    },
    {
      id: 'viewport',
      title: '原生容器与程序化滚动',
      description: '透传焦点与键盘属性，通过原生元素引用执行 scrollTo、scrollBy。',
    },
    {
      id: 'table',
      title: '表格与滚动条位置',
      description: '单个原生表格固定换行表头，测量高度后调整纵向轨道起点。',
    },
    {
      id: 'custom-logic',
      title: 'useScrollbar',
      description: '使用 useScrollbar 手写 DOM 实现自己的 Scrollbar。',
    },
    {
      id: 'semantic-styles',
      title: '结构化样式',
      description: '按部件归属设置 class/style，组合部件通过直接子组件 API 定制。',
      height: 440,
    },
  ],
} as const
