import { onCleanup, Show } from 'solid-js'
import { createDropdown } from '@fex-design/solid/primitive/dropdown'
export function DropdownCustomLogicExample() {
  const { controller, popover, menuSnapshot } = createDropdown()
  const trigger = (element: HTMLButtonElement) => onCleanup(controller.bindTrigger(element))
  const content = (element: HTMLDivElement) => onCleanup(controller.bindFloatingContent(element))
  const rename = (element: HTMLButtonElement) =>
    onCleanup(controller.dom.bindItem(element, () => ({ value: 'rename' })))
  const duplicate = (element: HTMLButtonElement) =>
    onCleanup(controller.dom.bindItem(element, () => ({ value: 'duplicate' })))
  return (
    <div class="flex min-h-48 flex-col items-start gap-4 p-6">
      <button
        ref={trigger}
        type="button"
        aria-haspopup="menu"
        aria-expanded={popover.snapshot().open}
        class="rounded-md border px-3 py-2"
        onClick={() => controller.overlay.toggle()}
        onKeyDown={(event) => controller.triggerKeyDown(event)}
      >
        操作
      </button>
      <Show when={popover.snapshot().mounted}>
        <div
          ref={content}
          role="menu"
          aria-label="操作"
          tabIndex={-1}
          hidden={popover.snapshot().phase === 'closed'}
          inert={!popover.snapshot().open}
          class="flex flex-col rounded-md border bg-background p-1 shadow-md"
          style={{
            position: 'var(--floating-strategy, absolute)' as 'absolute',
            left: 'var(--floating-x, 0px)',
            top: 'var(--floating-y, 0px)',
          }}
        >
          <button ref={rename} type="button" class="rounded px-3 py-2 text-start">
            重命名
          </button>
          <button ref={duplicate} type="button" class="rounded px-3 py-2 text-start">
            复制
          </button>
        </div>
      </Show>
      <output>最近选择：{menuSnapshot().value.join(', ') || '尚未选择'}</output>
    </div>
  )
}
