import { useState } from 'react'
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

export function OffsetsExample() {
  const [sideOffset, setSideOffset] = useState(12)
  const [alignOffset, setAlignOffset] = useState(0)
  return (
    <div className="w-full flex items-center justify-center min-h-[480px] py-16">
      {
        <div className="grid gap-4">
          <label>
            浮层与触发元素距离：{sideOffset}px
            <input
              aria-label="浮层与触发元素距离"
              type="range"
              min="0"
              max="40"
              value={sideOffset}
              onChange={(event) => setSideOffset(Number(event.target.value))}
            />
          </label>
          <label>
            面板与触发元素对齐偏移：{alignOffset}px
            <input
              aria-label="面板与触发元素对齐偏移"
              type="range"
              min="-40"
              max="40"
              value={alignOffset}
              onChange={(event) => setAlignOffset(Number(event.target.value))}
            />
          </label>
          <div className="flex flex-wrap justify-center gap-16 pt-12 pb-24">
            {(['start', 'center', 'end'] as const).map((align) => (
              <DemoPopover
                key={align}
                side="bottom"
                avoidCollisions={false}
                align={align}
                sideOffset={sideOffset}
                alignOffset={alignOffset}
                label={align}
                arrow
              />
            ))}
          </div>
        </div>
      }
    </div>
  )
}
