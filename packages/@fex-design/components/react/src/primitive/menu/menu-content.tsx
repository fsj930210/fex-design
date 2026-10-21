import { use, type ComponentProps } from 'react'
import { useCoreStoreSelector } from '@fex-design/react/hooks/use-core-store-selector'
import { useComposedRef } from '@fex-design/react/hooks/use-composed-ref'
import { menuRootClassName, menuContentClassName } from '@fex-design/components-styles/menu'
import { cn, shallowEqualObject } from '@fex-design/utils'
import { MenuLevelContext, useMenuContext } from './context'
import { useMenuHost } from './use-menu-host'
export type MenuContentProps = ComponentProps<'div'>
export function MenuContent({ ref, className, ...props }: MenuContentProps) {
  const dom = useMenuContext(),
    level = use(MenuLevelContext)
  const state = useCoreStoreSelector(
    dom.controller,
    (next) => ({ layout: next.layout, size: next.size, dir: next.dir }),
    shallowEqualObject,
  )
  const bind = useMenuHost((element) => dom.bindContent(element, level))
  const composed = useComposedRef<HTMLDivElement>(bind, ref)
  return (
    <div
      {...props}
      ref={composed}
      role={state.layout === 'horizontal' ? 'menubar' : 'menu'}
      data-slot="menu-content"
      dir={state.dir}
      className={cn(
        menuRootClassName({ size: state.size }),
        menuContentClassName({ layout: state.layout }),
        className,
      )}
    />
  )
}
