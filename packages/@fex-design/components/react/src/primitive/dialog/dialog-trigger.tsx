import type { ComponentProps, MouseEvent, ReactNode, Ref } from 'react'
import { useMemoizedFn } from '@fex-design/react/hooks/use-memoized-fn'
import { useDialog } from './use-dialog'

export type DialogTriggerRenderProps = Omit<ComponentProps<'button'>, 'children' | 'ref'> & {
  'data-state': 'open' | 'closed'
  ref: Ref<HTMLButtonElement>
}

export interface DialogTriggerProps extends Omit<ComponentProps<'button'>, 'children'> {
  children: (props: DialogTriggerRenderProps) => ReactNode
  ref?: Ref<HTMLButtonElement>
}

export function DialogTrigger({ children, ...props }: DialogTriggerProps) {
  const { contentId, dialog, snapshot, triggerRef } = useDialog('DialogTrigger')
  const onClick = useMemoizedFn((event: MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(event)
    if (!event.defaultPrevented)
      dialog.toggle({ reason: 'trigger-click', event: event.nativeEvent })
  })
  return children({
    ...props,
    ref: (element) => {
      triggerRef.current = element
      if (typeof props.ref === 'function') props.ref(element)
      else if (props.ref) props.ref.current = element
    },
    type: props.type ?? 'button',
    'aria-haspopup': 'dialog',
    'aria-expanded': snapshot.open,
    'aria-controls': snapshot.open ? contentId : undefined,
    'data-state': snapshot.open ? 'open' : 'closed',
    onClick,
  })
}
