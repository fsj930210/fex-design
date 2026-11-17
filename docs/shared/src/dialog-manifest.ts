export const dialogExamples = {
  primitive: [
    {
      order: 0,
      id: 'basic',
      title: '基础使用',
      description: '展示 Dialog 的标题、正文、关闭按钮和操作区。',
    },
    {
      order: 1,
      id: 'overlay',
      title: 'Overlay 行为',
      description: '分别切换模态语义、Overlay 显示和点击关闭行为；非模态对比时关闭 Overlay。',
    },
    {
      order: 2,
      id: 'close-delay',
      title: '关闭延迟',
      description:
        '打开动画保持默认速度，对比 0、200 和 1200ms 的关闭阶段；仅在关闭时同步设置动画时长。',
      height: 440,
    },
    {
      order: 3,
      id: 'custom-header',
      title: '自定义 Header',
      description: '通过直接子组件组合标题、全屏和关闭操作。',
    },
    {
      order: 4,
      id: 'custom-footer',
      title: '自定义 Footer',
      description: '组合 Footer、Close 和按钮替换默认操作区。',
    },
    {
      order: 5,
      id: 'fullscreen',
      title: '全屏',
      description: '切换视口全屏与浏览器全屏，并打开 Dialog 查看效果。',
    },
    {
      order: 6,
      id: 'position',
      title: '自定义位置',
      description: '弹窗距展示区域顶部 200px，保持水平居中。',
      height: 560,
    },
    {
      order: 7,
      id: 'form',
      title: '表单弹窗',
      description:
        '使用 Form、Input、Select 和 Checkbox 编辑姓名、邮箱、部门和通知偏好，校验通过后保存并关闭。',
      height: 660,
    },
    {
      order: 8,
      id: 'nested',
      title: '嵌套弹窗',
      description: '从外层打开内层弹窗，关闭内层后外层仍然保留。',
      height: 440,
    },
    {
      order: 9,
      id: 'draggable',
      title: '拖拽弹窗',
      description: '使用 useMove 实现 Dialog 拖拽，通过标题区移动窗口，并限制在展示区域内。',
      descriptionByFramework: {
        react: '使用 useMove 实现 Dialog 拖拽，通过标题区移动窗口，并限制在展示区域内。',
        vue: '使用 useMove 实现 Dialog 拖拽，通过标题区移动窗口，并限制在展示区域内。',
        solid: '使用 createMove 实现 Dialog 拖拽，通过标题区移动窗口，并限制在展示区域内。',
        svelte: '使用 moveAction 实现 Dialog 拖拽，通过标题区移动窗口，并限制在展示区域内。',
        angular: '使用 Move 指令 实现 Dialog 拖拽，通过标题区移动窗口，并限制在展示区域内。',
      },
      height: 560,
    },
    {
      order: 10,
      id: 'resize',
      title: '调整弹窗尺寸',
      description: '使用 useResize 实现 Dialog 尺寸调整，支持拖动四条边和四个角缩放。',
      descriptionByFramework: {
        react: '使用 useResize 实现 Dialog 尺寸调整，支持拖动四条边和四个角缩放。',
        vue: '使用 useResize 实现 Dialog 尺寸调整，支持拖动四条边和四个角缩放。',
        solid: '使用 createResize 实现 Dialog 尺寸调整，支持拖动四条边和四个角缩放。',
        svelte: '使用 resizeAction 实现 Dialog 尺寸调整，支持拖动四条边和四个角缩放。',
        angular: '使用 Resize 指令 实现 Dialog 尺寸调整，支持拖动四条边和四个角缩放。',
      },
      height: 560,
    },
    {
      order: 11,
      id: 'minimax',
      title: '最小化与最大化',
      description:
        '通过状态切换实现 Dialog 最小化与最大化，使用 useMove 拖动窗口和最小化工具条，恢复时保留原位置和尺寸。',
      descriptionByFramework: {
        react:
          '通过状态切换实现 Dialog 最小化与最大化，使用 useMove 拖动窗口和最小化工具条，恢复时保留原位置和尺寸。',
        vue: '通过状态切换实现 Dialog 最小化与最大化，使用 useMove 拖动窗口和最小化工具条，恢复时保留原位置和尺寸。',
        solid:
          '通过状态切换实现 Dialog 最小化与最大化，使用 createMove 拖动窗口和最小化工具条，恢复时保留原位置和尺寸。',
        svelte:
          '通过状态切换实现 Dialog 最小化与最大化，使用 moveAction 拖动窗口和最小化工具条，恢复时保留原位置和尺寸。',
        angular:
          '通过状态切换实现 Dialog 最小化与最大化，使用 Move 指令 拖动窗口和最小化工具条，恢复时保留原位置和尺寸。',
      },
      height: 560,
    },
    {
      order: 12,
      id: 'alert',
      title: '提示弹窗',
      description: '仅提供确定操作，无标题区与页脚分隔线。',
    },
    {
      order: 13,
      id: 'confirm',
      title: '确认弹窗',
      description: '提供确认、取消和关闭操作，无标题区与页脚分隔线。',
    },
    {
      order: 14,
      id: 'methods',
      title: '实例方法',
      description: '演示对象及函数更新、销毁当前弹窗，以及同时销毁两个弹窗。',
      height: 440,
    },
    {
      order: 15,
      id: 'direction',
      title: 'LTR 与 RTL',
      description: '使用原生 dir 属性对比两个书写方向。',
    },
    {
      order: 16,
      id: 'css-variables',
      title: 'CSS 变量',
      description: '覆盖 Dialog 宽高、层级、动画和 Overlay 背景变量。',
      height: 440,
    },
    {
      order: 17,
      id: 'semantic-styles',
      title: '结构化样式',
      description: '通过 classNames 和 styles 定制语义区域。',
      height: 440,
    },
  ],
  ui: [
    {
      order: 0,
      id: 'basic',
      title: '基础使用',
      description: '展示 Dialog 的标题、正文、关闭按钮和默认操作区。',
    },
    {
      order: 1,
      id: 'overlay',
      title: 'Overlay 行为',
      description: '分别切换模态语义、Overlay 显示和点击关闭行为；非模态对比时关闭 Overlay。',
    },
    {
      order: 2,
      id: 'close-delay',
      title: '关闭延迟',
      description:
        '打开动画保持默认速度，对比 0、200 和 1200ms 的关闭阶段；仅在关闭时同步设置动画时长。',
      height: 440,
    },
    {
      order: 3,
      id: 'custom-header',
      title: '自定义 Header',
      description: '使用 Header slot 或子组件调整标题和操作。',
    },
    {
      order: 4,
      id: 'custom-footer',
      title: '自定义 Footer',
      description: '替换默认确定/取消按钮。',
    },
    {
      order: 5,
      id: 'fullscreen',
      title: '全屏',
      description: '切换视口全屏与浏览器全屏，并打开 Dialog 查看效果。',
    },
    {
      order: 6,
      id: 'position',
      title: '自定义位置',
      description: '弹窗距展示区域顶部 200px，保持水平居中。',
      height: 560,
    },
    {
      order: 7,
      id: 'form',
      title: '表单弹窗',
      description:
        '使用 Form、Input、Select 和 Checkbox 编辑姓名、邮箱、部门和通知偏好，校验通过后保存并关闭。',
      height: 660,
    },
    {
      order: 8,
      id: 'nested',
      title: '嵌套弹窗',
      description: '从外层打开内层弹窗，关闭内层后外层仍然保留。',
      height: 440,
    },
    {
      order: 9,
      id: 'draggable',
      title: '拖拽弹窗',
      description: '使用 useMove 实现 Dialog 拖拽，通过标题区移动窗口，并限制在展示区域内。',
      descriptionByFramework: {
        react: '使用 useMove 实现 Dialog 拖拽，通过标题区移动窗口，并限制在展示区域内。',
        vue: '使用 useMove 实现 Dialog 拖拽，通过标题区移动窗口，并限制在展示区域内。',
        solid: '使用 createMove 实现 Dialog 拖拽，通过标题区移动窗口，并限制在展示区域内。',
        svelte: '使用 moveAction 实现 Dialog 拖拽，通过标题区移动窗口，并限制在展示区域内。',
        angular: '使用 Move 指令 实现 Dialog 拖拽，通过标题区移动窗口，并限制在展示区域内。',
      },
      height: 560,
    },
    {
      order: 10,
      id: 'resize',
      title: '调整弹窗尺寸',
      description: '使用 useResize 实现 Dialog 尺寸调整，支持拖动四条边和四个角缩放。',
      descriptionByFramework: {
        react: '使用 useResize 实现 Dialog 尺寸调整，支持拖动四条边和四个角缩放。',
        vue: '使用 useResize 实现 Dialog 尺寸调整，支持拖动四条边和四个角缩放。',
        solid: '使用 createResize 实现 Dialog 尺寸调整，支持拖动四条边和四个角缩放。',
        svelte: '使用 resizeAction 实现 Dialog 尺寸调整，支持拖动四条边和四个角缩放。',
        angular: '使用 Resize 指令 实现 Dialog 尺寸调整，支持拖动四条边和四个角缩放。',
      },
      height: 560,
    },
    {
      order: 11,
      id: 'minimax',
      title: '最小化与最大化',
      description:
        '通过状态切换实现 Dialog 最小化与最大化，使用 useMove 拖动窗口和最小化工具条，恢复时保留原位置和尺寸。',
      descriptionByFramework: {
        react:
          '通过状态切换实现 Dialog 最小化与最大化，使用 useMove 拖动窗口和最小化工具条，恢复时保留原位置和尺寸。',
        vue: '通过状态切换实现 Dialog 最小化与最大化，使用 useMove 拖动窗口和最小化工具条，恢复时保留原位置和尺寸。',
        solid:
          '通过状态切换实现 Dialog 最小化与最大化，使用 createMove 拖动窗口和最小化工具条，恢复时保留原位置和尺寸。',
        svelte:
          '通过状态切换实现 Dialog 最小化与最大化，使用 moveAction 拖动窗口和最小化工具条，恢复时保留原位置和尺寸。',
        angular:
          '通过状态切换实现 Dialog 最小化与最大化，使用 Move 指令 拖动窗口和最小化工具条，恢复时保留原位置和尺寸。',
      },
      height: 560,
    },
    {
      order: 12,
      id: 'alert',
      title: '提示弹窗',
      description: '仅提供确定操作，无标题区与页脚分隔线。',
    },
    {
      order: 13,
      id: 'confirm',
      title: '确认弹窗',
      description: '提供确认、取消和关闭操作，无标题区与页脚分隔线。',
    },
    {
      order: 14,
      id: 'methods',
      title: '实例方法',
      description: '演示对象及函数更新、销毁当前弹窗，以及同时销毁两个弹窗。',
      height: 440,
    },
    {
      order: 15,
      id: 'direction',
      title: 'LTR 与 RTL',
      description: '使用原生 dir 属性对比两个书写方向。',
    },
    {
      order: 16,
      id: 'css-variables',
      title: 'CSS 变量',
      description: '覆盖 Dialog 实例的 CSS 变量。',
      height: 440,
    },
    {
      order: 17,
      id: 'semantic-styles',
      title: '结构化样式',
      description: '使用 classNames 和 styles 调整语义区域。',
      height: 440,
    },
  ],
} as const
