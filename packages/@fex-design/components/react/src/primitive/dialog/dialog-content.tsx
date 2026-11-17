import { dialogContentClassName } from '@fex-design/components-styles/dialog'
import { cn } from '@fex-design/utils'
import type { ComponentProps, KeyboardEvent, Ref } from 'react'
import { useMemoizedFn } from '@fex-design/react/hooks/use-memoized-fn'
import { useDialog } from './use-dialog'

function toEventInfo(event: {
  target: EventTarget | null
  currentTarget: EventTarget | null
  event?: Event
}) {
  return {
    target: event.target,
    currentTarget: event.currentTarget,
    event: 'event' in event ? event.event : undefined,
  }
}

export interface DialogContentProps extends ComponentProps<'div'> {
  ref?: Ref<HTMLDivElement>
}

export function DialogContent({ ref, className, onKeyDown, ...props }: DialogContentProps) {
  const { contentId, dialog, fullscreen, fullscreenActive, modal, snapshot, titleId } =
    useDialog('DialogContent')
  const setContent = useMemoizedFn((element: HTMLDivElement | null) => {
    dialog.setLayerElement(element)
    if (typeof ref === 'function') ref(element)
    else if (ref && 'current' in ref) ref.current = element
  })

  if (!snapshot.mounted) {
    return null
  }

  return (
    <div
      {...props}
      ref={setContent}
      id={contentId}
      role="dialog"
      aria-modal={modal ? 'true' : undefined}
      aria-labelledby={titleId}
      tabIndex={-1}
      data-slot="dialog-content"
      data-state={snapshot.open ? 'open' : 'closed'}
      data-phase={snapshot.phase}
      style={{
        ...props.style,
        ...(fullscreenActive && fullscreen
          ? {
              width:
                typeof fullscreen === 'object' && fullscreen.width !== undefined
                  ? typeof fullscreen.width === 'number'
                    ? `${fullscreen.width}px`
                    : fullscreen.width
                  : '100vw',
              height:
                typeof fullscreen === 'object' && fullscreen.height !== undefined
                  ? typeof fullscreen.height === 'number'
                    ? `${fullscreen.height}px`
                    : fullscreen.height
                  : '100vh',
            }
          : {}),
      }}
      className={cn(dialogContentClassName, fullscreenActive && 'rounded-none', className)}
      onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event)
        if (!event.defaultPrevented && event.key === 'Escape') {
          dialog.close({ reason: 'escape-key', event })
        }
      }}
    />
  )
}
