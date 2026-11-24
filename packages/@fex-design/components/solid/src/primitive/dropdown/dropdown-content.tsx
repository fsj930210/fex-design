import { onCleanup, splitProps } from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import { menuContentClassName, menuRootClassName } from '@fex-design/components-styles/menu'
import { popoverMenuContentClassName } from '@fex-design/components-styles/popover'
import { cn } from '@fex-design/utils'
import { PopoverContent, type PopoverContentProps } from '../popover'
import { useDropdownContext } from './context'

export type DropdownContentProps = PopoverContentProps
export function DropdownContent(props: DropdownContentProps) {
  const [local, rest] = splitProps(props, ['class', 'ref'])
  const context = useDropdownContext()
  const { controller } = context
  const snapshot = createCoreStoreSignal(controller.menu)
  let unbind: (() => void) | undefined
  return (
    <PopoverContent
      {...rest}
      role="menu"
      aria-labelledby={
        props['aria-labelledby'] ?? (props['aria-label'] ? undefined : context.triggerId)
      }
      ref={(element) => {
        unbind?.()
        const stop = controller.bindContent(element)
        unbind = stop
        // PopoverContent can remove its host without disposing DropdownContent.
        onCleanup(() => {
          stop()
          if (unbind === stop) unbind = undefined
        })
        if (typeof local.ref === 'function') local.ref(element)
      }}
      class={cn(
        popoverMenuContentClassName,
        menuRootClassName({ size: snapshot().size, color: 'none' }),
        menuContentClassName({ layout: 'vertical', background: 'none' }),
        local.class,
      )}
    />
  )
}
