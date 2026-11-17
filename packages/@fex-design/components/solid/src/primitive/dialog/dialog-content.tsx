import { dialogContentClassName } from '@fex-design/components-styles/dialog'
import { cn } from '@fex-design/utils'
import { onCleanup, Show, splitProps, type ParentProps, type JSX } from 'solid-js'
import { useDialog } from './dialog-context'

export interface DialogContentProps extends ParentProps {
  class?: string
  style?: JSX.CSSProperties
}

export function DialogContent(props: DialogContentProps) {
  const [local, rest] = splitProps(props, ['children', 'class', 'style'])
  const { contentId, dialog, fullscreen, fullscreenActive, modal, snapshot, titleId } =
    useDialog('DialogContent')
  onCleanup(() => dialog.setLayerElement(null))
  return (
    <Show when={snapshot().mounted}>
      <div
        ref={(element) => dialog.setLayerElement(element)}
        id={contentId}
        role="dialog"
        aria-modal={modal ? 'true' : undefined}
        aria-labelledby={titleId}
        tabIndex={-1}
        data-slot="dialog-content"
        data-state={snapshot().open ? 'open' : 'closed'}
        data-phase={snapshot().phase}
        style={{
          ...local.style,
          ...(fullscreenActive() && fullscreen()
            ? {
                width:
                  typeof fullscreen() === 'object' && fullscreen()!.width !== undefined
                    ? typeof fullscreen()!.width === 'number'
                      ? `${fullscreen()!.width}px`
                      : fullscreen()!.width
                    : '100vw',
                height:
                  typeof fullscreen() === 'object' && fullscreen()!.height !== undefined
                    ? typeof fullscreen()!.height === 'number'
                      ? `${fullscreen()!.height}px`
                      : fullscreen()!.height
                    : '100vh',
              }
            : {}),
        }}
        class={cn(dialogContentClassName, fullscreenActive() && 'rounded-none', local.class)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            dialog.close({ reason: 'escape-key', event })
          }
        }}
      >
        {local.children}
      </div>
    </Show>
  )
}
