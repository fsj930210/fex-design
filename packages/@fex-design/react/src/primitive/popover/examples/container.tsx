import { useRef } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
  PopoverTitle,
} from '@fex-design/react/primitive/popover'
import { Button } from '@fex-design/react/ui/button'

export function ContainerExample() {
  const container = useRef<HTMLDivElement>(null)
  return (
    <div className="grid w-full gap-4 py-12">
      <p>虚线框是挂载区域。浮层插入该区域，位置仍以触发按钮为参照。</p>
      <div
        ref={container}
        className="relative h-96 overflow-auto rounded-lg border-2 border-dashed p-6"
      >
        <p>自定义挂载区域</p>
        <div className="flex min-h-[560px] justify-center gap-4 pt-24">
          {[false, true].map((custom) => (
            <Popover key={String(custom)}>
              <PopoverTrigger>
                {(props) => <Button {...props}>{custom ? '在框内打开浮层' : '挂载到 body'}</Button>}
              </PopoverTrigger>
              <PopoverPortal container={custom ? container : undefined}>
                <PopoverContent className="w-48">
                  <PopoverTitle>{custom ? '挂载在虚线框内' : '挂载在 body'}</PopoverTitle>
                  <p>滚动框内内容，观察浮层跟随按钮的位置。</p>
                </PopoverContent>
              </PopoverPortal>
            </Popover>
          ))}
        </div>
      </div>
    </div>
  )
}
