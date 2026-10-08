import type { AnchorRegisteredItem, AnchorTarget } from '@fex-design/core/anchor/types'
import { anchorItemClassName } from '@fex-design/components-styles/anchor'
import { cn } from '@fex-design/utils'
import { use, useEffect, type HTMLAttributes } from 'react'
import { AnchorItemContext, useAnchorContext } from './anchor-context'

export interface AnchorItemProps extends HTMLAttributes<HTMLLIElement> {
  value: string
  target: AnchorTarget
  targetOffset?: number
}

export function AnchorItem({
  value,
  target,
  targetOffset,
  className,
  children,
  ...props
}: AnchorItemProps) {
  const anchor = useAnchorContext('AnchorItem')
  const parent = use(AnchorItemContext)
  const item: AnchorRegisteredItem = {
    key: value,
    target,
    ...(targetOffset === undefined ? {} : { targetOffset }),
    ...(parent ? { parentKey: parent.key } : {}),
  }

  // Registration synchronizes this composed item with the shared anchor controller.
  useEffect(
    () => anchor.registerItem(item),
    [anchor.registerItem, parent?.key, target, targetOffset, value],
  )

  const active = anchor.activeKeys.includes(value)
  const highlighted = anchor.highlightedKeys.has(value)
  return (
    <AnchorItemContext value={item}>
      <li
        {...props}
        data-slot="anchor-item"
        data-active={active || undefined}
        data-highlighted={highlighted || undefined}
        className={cn(anchorItemClassName, className)}
      >
        {children}
      </li>
    </AnchorItemContext>
  )
}
