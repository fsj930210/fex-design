export const popoverStyleDemo = {
  title: '自定义标题',
  content: '分别设置面板、标题、正文和箭头样式。',
  trigger: '按部位自定义样式',
  classNames: {
    root: 'w-72',
    title: 'text-blue-700 font-semibold',
    content: 'rounded bg-blue-50 p-3 text-blue-900',
  },
  variables: {
    '--popover-background': 'var(--muted-background)',
    '--popover-border': 'var(--color-blue-500)',
    '--popover-radius': '12px',
    '--popover-arrow-size': '16px',
  },
  customVariables: {
    '--popover-background': '#eff6ff',
    '--popover-foreground': '#1e3a8a',
    '--popover-border': '#60a5fa',
    '--popover-radius': '12px',
    '--popover-arrow-size': '16px',
  },
} as const
