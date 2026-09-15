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
import { Button } from '@fex-design/react/ui/button'
function DraftForm({ close }: { close: () => void }) {
  return (
    <div className="grid gap-3">
      <label>
        备注
        <input
          aria-label="备注"
          className="block rounded border p-2"
          defaultValue=""
          placeholder="关闭后再打开检查草稿"
        />
      </label>
      <Button onClick={close}>在浮层内关闭</Button>
    </div>
  )
}

function DemoPopover({
  label = '打开浮层',
  title,
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
                <PopoverTitle>{title ?? label}</PopoverTitle>
              </PopoverHeader>
              {typeof content === 'function' ? content(state) : content}
            </PopoverContent>
          </PopoverPortal>
        </>
      )}
    </Popover>
  )
}

export function ControlledExample() {
  const [open, setOpen] = useState(false)
  return (
    <div className="w-full flex items-center justify-center min-h-[360px] py-16">
      {
        <div className="grid gap-4">
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setOpen(!open)}>外部切换：{open ? '打开' : '关闭'}</Button>
            <DemoPopover
              open={open}
              onOpenChange={setOpen}
              label="受控表单"
              content={({ close }) => <DraftForm close={close} />}
            />
          </div>
          <DemoPopover
            defaultOpen={false}
            label="非受控：关闭保留草稿"
            content={({ close }) => <DraftForm close={close} />}
          />
          <DemoPopover
            destroyOnHidden
            label="关闭销毁：重新填写"
            content={({ close }) => <DraftForm close={close} />}
          />
          <DemoPopover
            lazyMount={false}
            label="提前挂载，关闭保留"
            content={({ close }) => <DraftForm close={close} />}
          />
          <DemoPopover
            lazyMount={false}
            destroyOnHidden
            label="提前挂载，关闭销毁"
            content={({ close }) => <DraftForm close={close} />}
          />
        </div>
      }
    </div>
  )
}
