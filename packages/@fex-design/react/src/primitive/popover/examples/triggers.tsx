import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverTitle,
} from '@fex-design/react/primitive/popover'
import type { PopoverOptions, PopoverRenderState } from '@fex-design/core/popover/types'
import type { ReactNode } from 'react'
import { Button } from '@fex-design/react/ui/button'
const cases = [
  { label: 'Hover 悬停', options: { trigger: ['hover'] } },
  { label: 'Focus 聚焦', options: { trigger: ['focus'] } },
  { label: 'Click 点击', options: { trigger: ['click'] } },
  { label: 'Context menu 右键', options: { trigger: ['context-menu'] } },
  { label: 'Hover + Focus', options: { trigger: ['hover', 'focus'] } },
  { label: 'Hover + Click', options: { trigger: ['hover', 'click'] } },
  { label: 'Focus + Click', options: { trigger: ['focus', 'click'] } },
  {
    label: '悬停延迟 300ms / 400ms',
    options: { trigger: ['hover'], hoverOpenDelay: 300, hoverCloseDelay: 400 },
  },
] satisfies { label: string; options: PopoverOptions }[]

function DemoPopover({
  label = '打开浮层',
  title = '提示信息',
  content = '这里可以放置说明和交互内容。',
  ...options
}: PopoverOptions & {
  label?: string
  title?: string
  content?: ReactNode | ((state: PopoverRenderState) => ReactNode)
}) {
  return (
    <Popover {...options}>
      {(state) => (
        <>
          <PopoverTrigger>{(props) => <Button {...props}>{label}</Button>}</PopoverTrigger>
          <PopoverPortal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>
                <PopoverTitle>{title}</PopoverTitle>
              </PopoverHeader>
              {typeof content === 'function' ? content(state) : content}
            </PopoverContent>
          </PopoverPortal>
        </>
      )}
    </Popover>
  )
}

export function TriggersExample() {
  return (
    <div className="w-full flex items-center justify-center min-h-[360px] py-16">
      {
        <div className="flex flex-wrap gap-3">
          {cases.map((item) => (
            <DemoPopover key={item.label} {...item.options} label={item.label} />
          ))}
        </div>
      }
    </div>
  )
}
