import { useState } from 'react'
import type { CSSProperties } from 'react'
import { useResize } from '@fex-design/react/hooks/use-resize'
import { Button } from '@fex-design/react/primitive/button'
import {
  DialogRoot,
  DialogPortal,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogActions,
  DialogClose,
  DialogBody,
  DialogFooter,
} from '@fex-design/react/primitive/dialog'

export function DialogResizeExample() {
  const [open, setOpen] = useState(false)
  const [rect, setRect] = useState({ x: 0, y: 0, width: 480, height: 300 })
  const interaction = useResize({
    rect,
    bounds: 'viewport',
    minWidth: 280,
    minHeight: 200,
    onResize: setRect,
  })
  function show() {
    const width = Math.min(480, window.innerWidth - 32)
    const height = Math.min(300, window.innerHeight - 64)
    setRect({
      x: (window.innerWidth - width) / 2,
      y: (window.innerHeight - height) / 2,
      width,
      height,
    })
    setOpen(true)
  }
  const style: CSSProperties = {
    left: rect.x + 'px',
    top: rect.y + 'px',
    width: rect.width + 'px',
    height: rect.height + 'px',
    translate: 'none',
    transform: 'none',
    transitionProperty: 'opacity, scale',
    maxWidth: 'none',
    maxHeight: 'none',
    display: 'flex',
    flexDirection: 'column',
  }
  return (
    <>
      <Button onClick={show}>打开调整弹窗尺寸</Button>
      <DialogRoot open={open} onOpenChange={setOpen} modal={false}>
        <DialogPortal>
          <DialogContent style={style}>
            <DialogHeader>
              <DialogTitle>
                <div
                  ref={(element) => {
                    interaction
                      .getTargetProps()
                      .ref(element?.closest<HTMLElement>('[data-slot="dialog-content"]') ?? null)
                  }}
                  {...{}}
                  className="pe-20 font-semibold leading-6"
                >
                  调整弹窗尺寸
                </div>
              </DialogTitle>
            </DialogHeader>
            <DialogActions>
              <DialogClose />
            </DialogActions>
            <DialogBody className={'flex-1 min-h-0'}>
              <p>拖动四条边或四个角调整尺寸，最小宽度 280px、高度 200px。</p>
              <div
                {...interaction.getHandleProps('top')}
                className="absolute z-10 left-2 right-2 top-0 h-2 cursor-ns-resize"
                aria-label="top 缩放"
              />
              <div
                {...interaction.getHandleProps('right')}
                className="absolute z-10 right-0 top-2 bottom-2 w-2 cursor-ew-resize"
                aria-label="right 缩放"
              />
              <div
                {...interaction.getHandleProps('bottom')}
                className="absolute z-10 left-2 right-2 bottom-0 h-2 cursor-ns-resize"
                aria-label="bottom 缩放"
              />
              <div
                {...interaction.getHandleProps('left')}
                className="absolute z-10 left-0 top-2 bottom-2 w-2 cursor-ew-resize"
                aria-label="left 缩放"
              />
              <div
                {...interaction.getHandleProps('top-left')}
                className="absolute z-10 left-0 top-0 size-3 cursor-nwse-resize"
                aria-label="top-left 缩放"
              />
              <div
                {...interaction.getHandleProps('top-right')}
                className="absolute z-10 right-0 top-0 size-3 cursor-nesw-resize"
                aria-label="top-right 缩放"
              />
              <div
                {...interaction.getHandleProps('bottom-left')}
                className="absolute z-10 left-0 bottom-0 size-3 cursor-nesw-resize"
                aria-label="bottom-left 缩放"
              />
              <div
                {...interaction.getHandleProps('bottom-right')}
                className="absolute z-10 right-0 bottom-0 size-3 cursor-nwse-resize"
                aria-label="bottom-right 缩放"
              />
            </DialogBody>
            <DialogFooter className={''}>
              <Button onClick={() => setOpen(false)}>关闭窗口</Button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </>
  )
}
