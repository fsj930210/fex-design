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

export function BasicExample() {
  return (
    <div className="w-full flex items-center justify-center min-h-[360px] py-16">
      {<DemoPopover />}
    </div>
  )
}
