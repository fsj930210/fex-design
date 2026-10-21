import type { ReactNode, AnchorHTMLAttributes } from 'react'
import {
  MenuItem as PrimitiveItem,
  type MenuItemProps as PrimitiveItemProps,
} from '@fex-design/react/primitive/menu'
import {
  menuItemIconClassName,
  menuItemLabelClassName,
  menuItemSuffixClassName,
} from '@fex-design/components-styles/menu'
import type { MenuItemBinding } from './types'
export interface MenuItemProps extends Omit<PrimitiveItemProps, 'children'> {
  children?: ReactNode
  icon?: ReactNode
  suffix?: ReactNode
  href?: string | undefined
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
  rel?: string | undefined
  render?: ((binding: MenuItemBinding) => ReactNode) | undefined
}
export function MenuItem({
  children,
  icon,
  suffix,
  render,
  href,
  target,
  rel,
  ...props
}: MenuItemProps) {
  const content = (
    <>
      {icon != null && icon !== false && (
        <span data-slot="menu-icon" className={menuItemIconClassName}>
          {icon}
        </span>
      )}
      <span data-slot="menu-item-content" className={menuItemLabelClassName}>
        {children}
      </span>
      {suffix != null && suffix !== false && (
        <span data-slot="menu-suffix" className={menuItemSuffixClassName}>
          {suffix}
        </span>
      )}
    </>
  )
  return (
    <PrimitiveItem {...props}>
      {(binding) =>
        render ? (
          render({ ...binding, content })
        ) : href !== undefined ? (
          <a {...binding.props} href={href} target={target} rel={rel}>
            {content}
          </a>
        ) : (
          <button {...binding.props}>{content}</button>
        )
      }
    </PrimitiveItem>
  )
}
