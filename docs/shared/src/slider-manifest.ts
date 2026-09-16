export const sliderExamples = {
  primitive: [
    {
      id: 'basic',
      title: '基本使用',
      description: '单值、受控与非受控 Slider，并区分 onChange 与 onEnd。',
    },
    { id: 'weight', title: '权重分配', description: '一个值派生左右占比，并为两侧使用不同颜色。' },
    {
      id: 'range',
      title: '范围与多节点',
      description: '两个或多个 Thumb 选择范围，minStepsBetweenThumbs 限制最小步数。',
    },
    { id: 'disabled', title: '禁用状态', description: '对比整体禁用和单独禁用 Thumb。' },
    { id: 'draggable-range', title: '范围可拖拽', description: '拖动选中范围时保持其跨度不变。' },
    {
      id: 'editable',
      title: '动态增删节点',
      description: '点击轨道添加节点，Delete 或 Backspace 删除节点，并受 minCount、maxCount 限制。',
    },
    {
      id: 'marks',
      title: '刻度与步长',
      description: '对照展示 included、范围、Dots、step 与 step=null，并支持动态 Mark。',
    },
    {
      id: 'direction',
      title: '方向与反转',
      description: '比较中文 LTR、阿拉伯语 RTL、水平、垂直和 reverse。',
    },
    { id: 'sizes', title: '尺寸', description: '展示 sm、md、lg 三种尺寸。' },
    {
      id: 'css-variables',
      title: 'CSS Variables',
      description: '通过实例变量定制轨道、范围和 Thumb。',
    },
  ],
  ui: [
    {
      id: 'basic',
      title: '基本使用',
      description: '单值、受控与非受控 Slider，并区分 onChange 与 onEnd。',
    },
    { id: 'weight', title: '权重分配', description: '一个值派生左右占比，并为两侧使用不同颜色。' },
    { id: 'range', title: '范围与多节点', description: '数组值自动生成多个 Thumb。' },
    {
      id: 'disabled',
      title: '禁用状态',
      description: 'disabled 支持 boolean 或逐 Thumb 的 boolean[]。',
    },
    {
      id: 'draggable-range',
      title: '范围可拖拽',
      description: 'draggableRange 允许整体移动选中范围。',
    },
    {
      id: 'editable',
      title: '动态增删节点',
      description: 'editable 配合 minCount、maxCount 约束节点数量。',
    },
    {
      id: 'marks',
      title: '刻度与步长',
      description: '对照展示 included、范围、Dots、step 与 step=null，并支持动态 Mark。',
    },
    {
      id: 'direction',
      title: '方向与反转',
      description: '比较中文 LTR、阿拉伯语 RTL、水平、垂直和 reverse。',
    },
    { id: 'sizes', title: '尺寸', description: '展示 sm、md、lg 三种尺寸。' },
    {
      id: 'css-variables',
      title: 'CSS Variables',
      description: '通过实例变量定制轨道、范围和 Thumb。',
    },
    {
      id: 'semantic-styles',
      title: '结构化样式',
      description: '通过 classNames 和 styles 定制 root、track、range、thumb、mark。',
    },
  ],
} as const
