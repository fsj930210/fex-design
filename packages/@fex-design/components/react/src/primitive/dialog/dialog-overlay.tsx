import { dialogOverlayClassName } from '@fex-design/components-styles/dialog'
import { cn } from '@fex-design/utils'
import type { ComponentProps, Ref } from 'react'
import { useMemoizedFn } from '@fex-design/react/hooks/use-memoized-fn'
import { useDialog } from './use-dialog'

export interface DialogOverlayProps extends ComponentProps<'div'> {
  ref?: Ref<HTMLDivElement>
}

export function DialogOverlay({ ref, className, onClick, ...props }: DialogOverlayProps) {
  const { dialog, snapshot } = useDialog('DialogOverlay')
  const setOverlay = useMemoizedFn((element: HTMLDivElement | null) => {
    dialog.setOverlayElement(element)
    if (typeof ref === 'function') ref(element)
    else if (ref && 'current' in ref) ref.current = element
  })
  return (
    <div
      {...props}
      ref={setOverlay}
      data-slot="dialog-overlay"
      data-state={snapshot.open ? 'open' : 'closed'}
      data-phase={snapshot.phase}
      className={cn(dialogOverlayClassName, className)}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && event.target === event.currentTarget) {
          dialog.close({ reason: 'overlay-pointer', event })
        }
      }}
    />
  )
}
