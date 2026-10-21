import { Show, splitProps, useContext, type JSX } from 'solid-js'
import { getMenuBranchStore } from '@fex-design/core/menu/branch'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import { menuRootClassName, subMenuContentClassName } from '@fex-design/components-styles/menu'
import { cn } from '@fex-design/utils'
import { MenuLevelContext, SubMenuContext, useMenuContext } from './context'
import { useMenuHost } from './use-menu-host'
import type { MenuPopoverProps } from './popover-types'
import { subMenuBodyClassName } from '@fex-design/components-styles/menu'
import { mergeStyle } from '@fex-design/solid/primitives/merge-style'
export type SubMenuContentProps = JSX.HTMLAttributes<HTMLDivElement> & {
  container?: HTMLElement | null | undefined
}
export function SubMenuContent(props: SubMenuContentProps) {
  const [local, rest] = splitProps(props, ['class', 'style', 'ref', 'container', 'children'])
  const dom = useMenuContext(),
    branch = useContext(SubMenuContext)
  if (!branch) throw new Error('SubMenuContent requires SubMenu')
  const snapshot = createCoreStoreSignal(dom.controller),
    presence = createCoreStoreSignal(getMenuBranchStore(branch))
  const popup = () =>
    snapshot().layout === 'inline'
      ? undefined
      : (branch.popoverProps?.() as MenuPopoverProps | undefined)
  const host = useMenuHost(
    (element) => dom.bindContent(element, branch, () => ({ container: local.container })),
    () => [local.container, branch.value()],
  )
  return (
    <MenuLevelContext.Provider value={branch}>
      <div
        {...rest}
        ref={(element) => {
          host(element)
          if (typeof local.ref === 'function') local.ref(element)
        }}
        role="menu"
        data-slot="submenu-content"
        dir={snapshot().dir}
        hidden={presence().phase === 'closed'}
        inert={!presence().open}
        class={cn(
          snapshot().layout !== 'inline' && menuRootClassName({ size: snapshot().size }),
          subMenuContentClassName({ inline: snapshot().layout === 'inline' }),
          popup()?.classNames?.root,
          local.class,
        )}
        style={mergeStyle(popup()?.styles?.root, local.style)}
      >
        <Show when={presence().mounted}>
          <div
            data-slot="popover-body"
            class={cn(subMenuBodyClassName, popup()?.classNames?.content)}
            style={popup()?.styles?.content}
          >
            {local.children}
          </div>
        </Show>
      </div>
    </MenuLevelContext.Provider>
  )
}
