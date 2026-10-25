import { createPopover } from '@fex-design/solid/primitive/popover'

export function CustomLogicExample() {
  const popover = createPopover(() => ({}))
  return (
    <section class="grid w-full max-w-sm gap-3 rounded-lg border p-4">
      <button
        type="button"
        aria-expanded={popover.snapshot().open}
        onClick={() => popover.overlay.toggle()}
      >
        {popover.snapshot().open ? 'Close details' : 'Open details'}
      </button>
      {popover.snapshot().open && (
        <div role="dialog" class="grid gap-2 rounded-md border p-3">
          <strong>Custom Popover</strong>
          <p>This panel is rendered by the example component.</p>
          <button type="button" onClick={() => popover.overlay.close()}>
            Dismiss
          </button>
        </div>
      )}
      <output aria-live="polite">{popover.snapshot().open ? 'Open' : 'Closed'}</output>
    </section>
  )
}
