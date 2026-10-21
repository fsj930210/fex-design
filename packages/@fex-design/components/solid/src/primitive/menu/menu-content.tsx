import { splitProps, useContext, type JSX } from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import { menuRootClassName, menuContentClassName } from '@fex-design/components-styles/menu'
import { cn } from '@fex-design/utils'
import { MenuLevelContext, useMenuContext } from './context'
import { useMenuHost } from './use-menu-host'
export type MenuContentProps = JSX.HTMLAttributes<HTMLDivElement>
export function MenuContent(props: MenuContentProps) {
  const [local, rest] = splitProps(props, ['class', 'ref'])
  const dom = useMenuContext(),
    parent = useContext(MenuLevelContext),
    snapshot = createCoreStoreSignal(dom.controller)
  const host = useMenuHost(
    (element) => dom.bindContent(element, parent),
    () => props,
  )
  return (
    <div
      {...rest}
      ref={(element) => {
        host(element)
        if (typeof local.ref === 'function') local.ref(element)
      }}
      role={snapshot().layout === 'horizontal' ? 'menubar' : 'menu'}
      dir={snapshot().dir}
      data-slot="menu-content"
      class={cn(
        menuRootClassName({ size: snapshot().size }),
        menuContentClassName({ layout: snapshot().layout }),
        local.class,
      )}
    />
  )
}
