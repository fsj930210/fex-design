const scenes = [
  { id: 'basic', title: '基础用法', description: '使用图片和 fallback 展示一个头像。' },
  { id: 'badge', title: '徽标', description: '在头像右下角添加在线状态标记。' },
  { id: 'badge-with-icon', title: '带图标的徽标', description: '在 AvatarBadge 中放入图标。' },
  { id: 'group', title: '头像组', description: '组合多个相互重叠的头像。' },
  { id: 'group-count', title: '头像组数量', description: '使用 maxCount 自动显示剩余数量。' },
  { id: 'group-with-icon', title: '带图标的头像组', description: '自定义组合中的溢出节点。' },
  { id: 'sizes', title: '尺寸', description: '对照 sm、md 和 lg 三种尺寸。' },
  { id: 'shape', title: '形状', description: '对照圆形和方形头像。' },
  { id: 'group-shape', title: '头像组形状', description: '组合中每个 Avatar 独立控制形状。' },
  { id: 'max-count', title: '最大显示数量', description: '通过 maxCount 控制可见头像数量。' },
] as const

export const avatarExamples = {
  primitive: [
    { id: 'basic', title: '基础用法', description: '使用图片和 fallback 展示一个头像。' },
    { id: 'badge', title: '徽标', description: '在头像右下角添加在线状态标记。' },
    { id: 'badge-with-icon', title: '带图标的徽标', description: '在 AvatarBadge 中放入图标。' },
    { id: 'group', title: '头像组', description: '组合多个相互重叠的头像。' },
    { id: 'group-count', title: '头像组数量', description: '使用 maxCount 自动显示剩余数量。' },
    { id: 'group-with-icon', title: '带图标的头像组', description: '自定义组合中的溢出节点。' },
    { id: 'sizes', title: '尺寸', description: '对照 sm、md 和 lg 三种尺寸。' },
    { id: 'direction', title: 'LTR 与 RTL', description: '验证头像组在两种书写方向下的逻辑间距。' },
    { id: 'shape', title: '形状', description: '对照圆形和方形头像。' },
    { id: 'group-shape', title: '头像组形状', description: '组合中每个 Avatar 独立控制形状。' },
    { id: 'max-count', title: '最大显示数量', description: '通过 maxCount 控制可见头像数量。' },
    {
      id: 'css-variables',
      title: 'CSS 变量',
      description: '通过 CSS Variables 覆盖头像尺寸和组合重叠距离。',
    },
  ],
  ui: [
    { id: 'basic', title: '基础用法', description: '使用图片和 fallback 展示一个头像。' },
    { id: 'group', title: '头像组', description: '组合多个相互重叠的头像。' },
    { id: 'group-count', title: '头像组数量', description: '使用 maxCount 自动显示剩余数量。' },
    { id: 'group-with-icon', title: '带图标的头像组', description: '自定义组合中的溢出节点。' },
    { id: 'sizes', title: '尺寸', description: '对照 sm、md 和 lg 三种尺寸。' },
    { id: 'direction', title: 'LTR 与 RTL', description: '验证头像组在两种书写方向下的逻辑间距。' },
    { id: 'shape', title: '形状', description: '对照圆形和方形头像。' },
    { id: 'group-shape', title: '头像组形状', description: '组合中每个 Avatar 独立控制形状。' },
    { id: 'max-count', title: '最大显示数量', description: '通过 maxCount 控制可见头像数量。' },
    {
      id: 'styling',
      title: '结构化样式',
      description: '通过 classNames 和 styles 定制 Avatar 的语义部件。',
    },
    {
      id: 'css-variables',
      title: 'CSS 变量',
      description: '通过 CSS Variables 覆盖头像尺寸和组合重叠距离。',
    },
  ],
} as const
