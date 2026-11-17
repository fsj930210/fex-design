import { createSignal, onMount } from 'solid-js'
import type { JSX } from 'solid-js'
import { createMove } from '@fex-design/solid/primitives/create-move'
import { Button } from '@fex-design/solid/primitive/button'
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
} from '@fex-design/solid/primitive/dialog'

export function DialogDraggableExample() {
  const [open, setOpen] = createSignal(false)
  const [rect, setRect] = createSignal({ x: 0, y: 0, width: 480, height: 300 })
  const interaction = createMove({
    get position() {
      return { x: rect().x, y: rect().y }
    },
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
  const style = (): JSX.CSSProperties => ({
    left: rect().x + 'px',
    top: rect().y + 'px',
    width: rect().width + 'px',
    height: rect().height + 'px',
    translate: 'none',
    transform: 'none',
    'transition-property': 'opacity, scale',
    'max-width': 'none',
    'max-height': 'none',
    display: 'flex',
    'flex-direction': 'column',
  })
  return (
    <>
      <Button onClick={show}>打开拖拽弹窗</Button>
      <DialogRoot open={open()} onOpenChange={setOpen} modal={false}>
        <DialogPortal>
          <DialogContent style={style()}>
            <DialogHeader>
              <DialogTitle>
                <div
                  ref={(element) => {
                    onMount(() => {
                      interaction.setTarget(
                        element.closest<HTMLElement>('[data-slot="dialog-content"]'),
                      )
                      interaction.setHandle(element)
                    })
                  }}
                  {...interaction.getHandleProps()}
                  class="cursor-move touch-none select-none pe-20 font-semibold leading-6"
                >
                  拖拽弹窗
                </div>
              </DialogTitle>
            </DialogHeader>
            <DialogActions>
              <DialogClose />
            </DialogActions>
            <DialogBody class={'flex-1 min-h-0'}>
              <p>按住标题区拖动窗口，窗口保持在展示区域内。</p>
            </DialogBody>
            <DialogFooter class={''}>
              <Button onClick={() => setOpen(false)}>关闭窗口</Button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </>
  )
}
