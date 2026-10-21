import { useSyncExternalStore } from 'react'
import { usePopover } from '@fex-design/react/primitive/popover'

export function CustomLogicExample() {
  const { overlay } = usePopover()
  const snapshot = useSyncExternalStore(overlay.subscribe, overlay.getSnapshot)
  return (
    <section className="grid w-full max-w-sm gap-3 rounded-lg border p-4">
      <button type="button" aria-expanded={snapshot.open} onClick={() => overlay.toggle()}>
        {snapshot.open ? 'Close details' : 'Open details'}
      </button>
      {snapshot.open && <div role="dialog" className="grid gap-2 rounded-md border p-3"><strong>Custom Popover</strong><p>This panel is rendered by the example component.</p><button type="button" onClick={() => overlay.close()}>Dismiss</button></div>}
      <output aria-live="polite">{snapshot.open ? 'Open' : 'Closed'}</output>
    </section>
  )
}
