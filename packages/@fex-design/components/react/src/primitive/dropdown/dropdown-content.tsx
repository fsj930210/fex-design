import { useComposedRef } from '@fex-design/react/hooks/use-composed-ref'
import { useMemoizedFn } from '@fex-design/react/hooks/use-memoized-fn'
import { useCoreStoreSelector } from '@fex-design/react/hooks/use-core-store-selector'
import { menuContentClassName, menuRootClassName } from '@fex-design/components-styles/menu'
import { popoverMenuContentClassName } from '@fex-design/components-styles/popover'
import { cn } from '@fex-design/utils'
import { PopoverContent, type PopoverContentProps } from '../popover'
import { useDropdownContext } from './context'

export type DropdownContentProps = PopoverContentProps
export function DropdownContent({ ref, className, ...props }: DropdownContentProps) {
  const { controller, triggerId } = useDropdownContext()
  const size = useCoreStoreSelector(controller.menu, (snapshot) => snapshot.size)
  const bind = useMemoizedFn((element: HTMLDivElement | null) => {
    if (element) return controller.bindContent(element)
  })
  const composed = useComposedRef(bind, ref)
  return (
    <PopoverContent
      {...props}
      ref={composed}
      role="menu"
      aria-labelledby={props['aria-labelledby'] ?? (props['aria-label'] ? undefined : triggerId)}
      className={cn(
        popoverMenuContentClassName,
        menuRootClassName({ size, color: 'none' }),
        menuContentClassName({ layout: 'vertical', background: 'none' }),
        className,
      )}
    />
  )
}
