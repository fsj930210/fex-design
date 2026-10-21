import { use, type ComponentProps } from 'react'
import { createPortal } from 'react-dom'
import { getMenuBranchStore } from '@fex-design/core/menu/branch'
import { useLatest } from '@fex-design/react/hooks/use-latest'
import { useCoreStore } from '@fex-design/react/hooks/use-core-store'
import { useCoreStoreSelector } from '@fex-design/react/hooks/use-core-store-selector'
import { useComposedRef } from '@fex-design/react/hooks/use-composed-ref'
import { menuRootClassName, subMenuContentClassName } from '@fex-design/components-styles/menu'
import { cn, shallowEqualObject } from '@fex-design/utils'
import { MenuLevelContext, SubMenuContext, useMenuContext } from './context'
import { useMenuHost } from './use-menu-host'
import type { MenuPopoverProps } from './popover-types'
import { subMenuBodyClassName } from '@fex-design/components-styles/menu'
export interface SubMenuContentProps extends ComponentProps<'div'> {
  container?: HTMLElement | null | undefined
}
export function SubMenuContent({
  container,
  ref,
  className,
  style,
  children,
  ...rest
}: SubMenuContentProps) {
  const dom = useMenuContext(),
    branch = use(SubMenuContext)
  if (!branch) throw new Error('SubMenuContent requires SubMenu')
  const state = useCoreStoreSelector(
    dom.controller,
    (next) => ({ layout: next.layout, size: next.size, dir: next.dir }),
    shallowEqualObject,
  )
  const presence = useCoreStore(getMenuBranchStore(branch)),
    options = useLatest({ container, managedPortal: true })
  const bind = useMenuHost((element) => dom.bindContent(element, branch, () => options.current))
  const composed = useComposedRef<HTMLDivElement>(bind, ref)
  const popup =
    state.layout === 'inline'
      ? undefined
      : (branch.popoverProps?.() as MenuPopoverProps | undefined)
  const content = (
    <MenuLevelContext value={branch}>
      <div
        {...rest}
        ref={composed}
        role="menu"
        hidden={presence.phase === 'closed'}
        inert={!presence.open}
        data-slot="submenu-content"
        dir={state.dir}
        className={cn(
          state.layout !== 'inline' && menuRootClassName({ size: state.size }),
          subMenuContentClassName({ inline: state.layout === 'inline' }),
          popup?.classNames?.root,
          className,
        )}
        style={{ ...popup?.styles?.root, ...style }}
      >
        {presence.mounted ? (
          <div
            data-slot="popover-body"
            className={cn(subMenuBodyClassName, popup?.classNames?.content)}
            style={popup?.styles?.content}
          >
            {children}
          </div>
        ) : null}
      </div>
    </MenuLevelContext>
  )
  // React portals preserve synthetic event ownership outside the application root.
  return state.layout === 'inline' || typeof document === 'undefined'
    ? content
    : createPortal(content, container ?? presence.container ?? document.body)
}
