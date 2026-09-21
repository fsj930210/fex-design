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
import { Button } from '@fex-design/react/primitive/button'

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

export function ArrowExample() {
  return (
    <div className="w-full flex items-center justify-center min-h-[360px] py-16">
      {
        <div className="flex flex-wrap gap-4">
          <DemoPopover arrow={false} placement="bottomLeft" label="不显示箭头" />
          <DemoPopover arrow placement="bottomLeft" label="箭头距面板边缘 16px" />
          <DemoPopover arrow arrowPadding={28} placement="bottomLeft" label="箭头距面板边缘 28px" />
        </div>
      }
    </div>
  )
}
