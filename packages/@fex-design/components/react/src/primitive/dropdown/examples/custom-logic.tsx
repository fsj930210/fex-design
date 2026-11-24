import { useDropdown } from '@fex-design/react/primitive/dropdown'
import { useLazyRef } from '@fex-design/react/hooks/use-lazy-ref'

export function DropdownCustomLogicExample() {
  const { controller, snapshot, menuSnapshot } = useDropdown()
  const hosts = useLazyRef(() => ({
    trigger: (element: HTMLButtonElement | null) =>
      element ? controller.bindTrigger(element) : undefined,
    content: (element: HTMLDivElement | null) =>
      element ? controller.bindFloatingContent(element) : undefined,
    rename: (element: HTMLButtonElement | null) =>
      element ? controller.dom.bindItem(element, () => ({ value: 'rename' })) : undefined,
    duplicate: (element: HTMLButtonElement | null) =>
      element ? controller.dom.bindItem(element, () => ({ value: 'duplicate' })) : undefined,
  })).current
  return (
    <div className="flex min-h-48 flex-col items-start gap-4 p-6">
      <button
        ref={hosts.trigger}
        type="button"
        aria-haspopup="menu"
        aria-expanded={snapshot.open}
        className="rounded-md border px-3 py-2"
        onClick={() => controller.overlay.toggle()}
        onKeyDown={(event) => controller.triggerKeyDown(event.nativeEvent)}
      >
        操作
      </button>
      {snapshot.mounted && (
        <div
          ref={hosts.content}
          role="menu"
          aria-label="操作"
          tabIndex={-1}
          hidden={snapshot.phase === 'closed'}
          inert={!snapshot.open}
          className="flex flex-col rounded-md border bg-background p-1 shadow-md"
          style={{
            position: 'var(--floating-strategy, absolute)' as 'absolute',
            left: 'var(--floating-x, 0px)',
            top: 'var(--floating-y, 0px)',
          }}
        >
          <button ref={hosts.rename} type="button" className="rounded px-3 py-2 text-start">
            重命名
          </button>
          <button ref={hosts.duplicate} type="button" className="rounded px-3 py-2 text-start">
            复制
          </button>
        </div>
      )}
      <output>最近选择：{menuSnapshot.value.join(', ') || '尚未选择'}</output>
    </div>
  )
}
