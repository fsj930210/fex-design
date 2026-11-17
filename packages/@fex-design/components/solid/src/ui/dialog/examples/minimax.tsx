import { dialogIconCloseClassName } from '@fex-design/components-styles/dialog'
import { createSignal, onMount, Show } from 'solid-js'
import type { JSX } from 'solid-js'
import { createMove } from '@fex-design/solid/primitives/create-move'
import { Button } from '@fex-design/solid/ui/button'
import { MinusIcon } from '@fex-design/solid/icons/minus'
import { SquareIcon } from '@fex-design/solid/icons/square'
import { Dialog } from '@fex-design/solid/ui/dialog'

export function DialogMinimaxExample() {
  const [open, setOpen] = createSignal(false)
  const [rect, setRect] = createSignal({ x: 0, y: 0, width: 480, height: 300 })
  const [mode, setMode] = createSignal<'normal' | 'minimized' | 'maximized'>('normal')
  const [bar, setBar] = createSignal({ x: 16, y: 16 })
  const interaction = createMove({
    get position() {
      return mode() === 'minimized' ? bar() : { x: rect().x, y: rect().y }
    },
    bounds: 'viewport',
    get disabled() {
      return mode() === 'maximized'
    },
    onMove: (point) => {
      if (mode() === 'minimized') {
        setBar(point)
        return
      }
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
    setMode('normal')
    setOpen(true)
  }
  function minimize() {
    setBar({ x: 16, y: Math.max(0, window.innerHeight - 56) })
    setMode('minimized')
  }
  const style = (): JSX.CSSProperties => ({
    left:
      mode() === 'maximized' ? '0px' : mode() === 'minimized' ? bar().x + 'px' : rect().x + 'px',
    top: mode() === 'maximized' ? '0px' : mode() === 'minimized' ? bar().y + 'px' : rect().y + 'px',
    width:
      mode() === 'maximized'
        ? window.innerWidth + 'px'
        : mode() === 'minimized'
          ? '280px'
          : rect().width + 'px',
    height:
      mode() === 'maximized'
        ? window.innerHeight + 'px'
        : mode() === 'minimized'
          ? '40px'
          : rect().height + 'px',
    overflow: mode() === 'minimized' ? 'visible' : 'hidden',
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
      <Button onClick={show}>打开最小化与最大化</Button>
      <Dialog
        open={open()}
        onOpenChange={setOpen}
        modal={false}
        overlay={false}
        header={
          <div
            ref={(element) => {
              onMount(() => {
                interaction.setTarget(element.closest<HTMLElement>('[data-slot="dialog-content"]'))
                interaction.setHandle(element)
              })
            }}
            {...interaction.getHandleProps()}
            onDblClick={() => setMode('normal')}
            class="cursor-move touch-none select-none pe-20 font-semibold leading-6"
          >
            最小化与最大化
            {mode() === 'minimized' && (
              <button
                type="button"
                aria-label="预览窗口，点击恢复"
                class="absolute bottom-full start-0 z-20 hidden pb-2 group-hover/minimax:block"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => setMode('normal')}
              >
                <span class="block w-60 overflow-hidden rounded-md border border-border bg-background text-left text-foreground shadow-xl">
                  <span class="block h-[150px] w-[480px] origin-top-left scale-50">
                    <span class="block border-b border-border p-4 font-semibold">
                      最小化与最大化
                    </span>
                    <span class="block h-[180px] p-4 text-sm leading-6">
                      最小化后工具条仍可拖动，双击工具条或点击恢复按钮还原窗口，保留原位置和尺寸。
                    </span>
                    <span class="block border-t border-border p-4 text-right">
                      <span class="inline-block rounded-md border border-border px-3 py-1 text-sm">
                        关闭窗口
                      </span>
                    </span>
                  </span>
                </span>
              </button>
            )}
          </div>
        }
        actions={
          <>
            <Show when={mode() !== 'minimized'}>
              <Button
                variant="text"
                class={dialogIconCloseClassName}
                aria-label="最小化"
                onClick={minimize}
              >
                <MinusIcon class="size-4" />
              </Button>
            </Show>
            <Button
              variant="text"
              class={dialogIconCloseClassName}
              aria-label={mode() === 'normal' ? '最大化' : '恢复'}
              onClick={() => setMode(mode() === 'normal' ? 'maximized' : 'normal')}
            >
              <SquareIcon class="size-4" />
            </Button>
          </>
        }
        styles={{ content: style() }}
        classNames={{
          title: 'hidden',
          content:
            'group/minimax ' +
            (mode() === 'minimized'
              ? '[&_[data-slot=dialog-header]]:text-sm [&_[data-slot=dialog-title]]:text-sm [&_[data-slot=dialog-header]]:px-3 [&_[data-slot=dialog-header]]:py-[7px] [&_[data-slot=dialog-header]]:border-b-0 [&_[data-slot=dialog-header]]:rounded-[inherit] [&_[data-slot=dialog-actions]]:top-2 [&_[data-slot=dialog-actions]]:end-2'
              : ''),
          body: mode() === 'minimized' ? 'hidden' : 'flex-1 min-h-0',
          footer: mode() === 'minimized' ? 'hidden' : '',
        }}
        footer={<Button onClick={() => setOpen(false)}>关闭窗口</Button>}
      >
        <p>最小化后工具条仍可拖动，双击工具条或点击恢复按钮还原窗口，保留原位置和尺寸。</p>
      </Dialog>
    </>
  )
}
