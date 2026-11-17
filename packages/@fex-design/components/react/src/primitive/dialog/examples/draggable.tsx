import { useState } from 'react'
import type { CSSProperties } from 'react'
import { useMove } from '@fex-design/react/hooks/use-move'
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

export function DialogDraggableExample() {
  const [open, setOpen] = useState(false)
  const [rect, setRect] = useState({ x: 0, y: 0, width: 480, height: 300 })
  const interaction = useMove({
    position: rect,
    bounds: 'viewport',
    onMove: (point) => {
      setRect((previous) => ({ ...previous, ...point }))
    },
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
      <Button onClick={show}>打开拖拽弹窗</Button>
      <DialogRoot open={open} onOpenChange={setOpen} modal={false}>
        <DialogPortal>
          <DialogContent style={style}>
            <DialogHeader>
              <DialogTitle>
                <div
                  {...interaction.getHandleProps()}
                  ref={(element) => {
                    interaction
                      .getTargetProps()
                      .ref(element?.closest<HTMLElement>('[data-slot="dialog-content"]') ?? null)
                  }}
                  className="cursor-move touch-none select-none pe-20 font-semibold leading-6"
                >
                  拖拽弹窗
                </div>
              </DialogTitle>
            </DialogHeader>
            <DialogActions>
              <DialogClose />
            </DialogActions>
            <DialogBody className={'flex-1 min-h-0'}>
              <p>按住标题区拖动窗口，窗口保持在展示区域内。</p>
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
