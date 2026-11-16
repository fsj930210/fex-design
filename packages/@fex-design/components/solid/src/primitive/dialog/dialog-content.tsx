import { dialogContentClassName } from '@fex-design/components-styles/dialog'
import { cn } from '@fex-design/utils'
import { onCleanup, Show, splitProps, type ParentProps } from 'solid-js'
import { useDialog } from './dialog-context'

export interface DialogContentProps extends ParentProps {
  class?: string
}

export function DialogContent(props: DialogContentProps) {
  const [local, rest] = splitProps(props, ['children', 'class'])
  const { contentId, dialog, fullscreen, fullscreenActive, modal, snapshot, titleId } = useDialog('DialogContent')
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
        style={fullscreenActive() && fullscreen ? { width: typeof fullscreen === 'object' && fullscreen.width !== undefined ? typeof fullscreen.width === 'number' ? `${fullscreen.width}px` : fullscreen.width : '100vw', height: typeof fullscreen === 'object' && fullscreen.height !== undefined ? typeof fullscreen.height === 'number' ? `${fullscreen.height}px` : fullscreen.height : '100vh' } : undefined}
        class={cn(dialogContentClassName, fullscreenActive() && 'left-0 top-0 translate-x-0 translate-y-0 rounded-none', local.class)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            dialog.dismiss.escapeKey({
              target: event.target,
              currentTarget: event.currentTarget,
              event,
            })
          }
        }}
      >
        {local.children}
      </div>
    </Show>
  )
}




