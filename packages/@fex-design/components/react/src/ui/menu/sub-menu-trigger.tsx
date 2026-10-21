import type { ReactNode } from 'react'
import {
  SubMenuTrigger as PrimitiveTrigger,
  type SubMenuTriggerProps as PrimitiveTriggerProps,
} from '@fex-design/react/primitive/menu'
import { ChevronRightIcon } from '@fex-design/react/icons/chevron'
import {
  menuItemIconClassName,
  menuItemLabelClassName,
  menuItemSuffixClassName,
  menuExpandIconClassName,
} from '@fex-design/components-styles/menu'
type TriggerRenderer = Extract<NonNullable<PrimitiveTriggerProps['children']>, Function>
export interface SubMenuTriggerProps extends Omit<PrimitiveTriggerProps, 'children'> {
  children?: ReactNode
  icon?: ReactNode
  suffix?: ReactNode
  render?:
    | ((binding: Parameters<TriggerRenderer>[0] & { content: ReactNode }) => ReactNode)
    | undefined
}
export function SubMenuTrigger({
  children,
  icon,
  suffix,
  render,
  indicator,
  ...props
}: SubMenuTriggerProps) {
  return (
    <PrimitiveTrigger {...props}>
      {(binding) => {
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
            {indicator !== false && indicator !== null && (
              <span data-slot="submenu-indicator" className={menuExpandIconClassName}>
                {indicator ?? <ChevronRightIcon />}
              </span>
            )}
          </>
        )
        return render ? (
          render({ ...binding, content })
        ) : (
          <button {...binding.props}>{content}</button>
        )
      }}
    </PrimitiveTrigger>
  )
}
