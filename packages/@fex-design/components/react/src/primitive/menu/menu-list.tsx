import {
  handleMenuListFocus,
  handleMenuListKeyDown,
  syncMenuListTabStops,
  type MenuOrientation,
} from '@fex-design/core/menu/navigation'
import type {
  ComponentProps,
  FocusEvent,
  KeyboardEvent,
} from 'react'
import { useRef } from 'react'
import { useComposedRef } from '@fex-design/react/hooks/use-composed-ref'

export interface MenuListProps extends ComponentProps<'div'> {
  orientation?: MenuOrientation
  parentValue?: string | number
}

export function MenuList({
  orientation = 'vertical',
  parentValue,
  onFocus,
  onKeyDown,
  ref,
  ...props
}: MenuListProps) {
  const listRef = useRef<HTMLDivElement | null>(null)
  const composedRef = useComposedRef(listRef, ref)

  return (
    <div
      {...props}
      ref={(element) => {
        composedRef(element)
        if (element) syncMenuListTabStops(element)
      }}
      role={props.role ?? 'group'}
      aria-orientation={orientation}
      data-orientation={orientation}
      data-parent-value={parentValue}
      data-slot="menu-list"
      onFocus={(event: FocusEvent<HTMLDivElement>) => {
        onFocus?.(event)
        if (!event.defaultPrevented) handleMenuListFocus(event.nativeEvent)
      }}
      onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event)
        if (!event.defaultPrevented && listRef.current) {
          handleMenuListKeyDown(event.nativeEvent, listRef.current, orientation)
        }
      }}
    />
  )
}
