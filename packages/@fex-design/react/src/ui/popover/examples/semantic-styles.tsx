import type { CSSProperties } from 'react'
import { Popover } from '@fex-design/react/ui/popover'
import type { PopoverProps } from '@fex-design/react/ui/popover'
import { Button } from '@fex-design/react/ui/button'


export function SemanticStylesExample() {
  return <div className="w-full flex items-center justify-center min-h-[360px] py-16">{(<Popover title="自定义标题" content="分别设置面板、标题、正文和箭头样式。" arrow classNames={{ root: 'w-72', title: 'text-blue-700 font-semibold', content: 'rounded bg-blue-50 p-3 text-blue-900' }} styles={{ root: { '--popover-background': 'var(--muted-background)', '--popover-border': 'var(--color-blue-500)', '--popover-radius': '12px', '--popover-arrow-size': '16px' } as CSSProperties }}><Button>按部位自定义样式</Button></Popover>)}</div>
}
