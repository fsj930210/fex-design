import { createSignal, onMount } from 'solid-js'
import type { JSX } from 'solid-js'
import { createResize } from '@fex-design/solid/primitives/create-resize'
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

export function DialogResizeExample() {
  const [open, setOpen] = createSignal(false)
  const [rect, setRect] = createSignal({ x: 0, y: 0, width: 480, height: 300 })
  const interaction = createResize({
    get rect() {
      return rect()
    },
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
      <Button onClick={show}>打开调整弹窗尺寸</Button>
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
                    })
                  }}
                  class="pe-20 font-semibold leading-6"
                >
                  调整弹窗尺寸
                </div>
              </DialogTitle>
            </DialogHeader>
            <DialogActions>
              <DialogClose />
            </DialogActions>
            <DialogBody class={'flex-1 min-h-0'}>
              <p>拖动四条边或四个角调整尺寸，最小宽度 280px、高度 200px。</p>
              <div
                {...interaction.getHandleProps('top')}
                class="absolute z-10 left-2 right-2 top-0 h-2 cursor-ns-resize"
                aria-label="top 缩放"
              />
              <div
                {...interaction.getHandleProps('right')}
                class="absolute z-10 right-0 top-2 bottom-2 w-2 cursor-ew-resize"
                aria-label="right 缩放"
              />
              <div
                {...interaction.getHandleProps('bottom')}
                class="absolute z-10 left-2 right-2 bottom-0 h-2 cursor-ns-resize"
                aria-label="bottom 缩放"
              />
              <div
                {...interaction.getHandleProps('left')}
                class="absolute z-10 left-0 top-2 bottom-2 w-2 cursor-ew-resize"
                aria-label="left 缩放"
              />
              <div
                {...interaction.getHandleProps('top-left')}
                class="absolute z-10 left-0 top-0 size-3 cursor-nwse-resize"
                aria-label="top-left 缩放"
              />
              <div
                {...interaction.getHandleProps('top-right')}
                class="absolute z-10 right-0 top-0 size-3 cursor-nesw-resize"
                aria-label="top-right 缩放"
              />
              <div
                {...interaction.getHandleProps('bottom-left')}
                class="absolute z-10 left-0 bottom-0 size-3 cursor-nesw-resize"
                aria-label="bottom-left 缩放"
              />
              <div
                {...interaction.getHandleProps('bottom-right')}
                class="absolute z-10 right-0 bottom-0 size-3 cursor-nwse-resize"
                aria-label="bottom-right 缩放"
              />
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
