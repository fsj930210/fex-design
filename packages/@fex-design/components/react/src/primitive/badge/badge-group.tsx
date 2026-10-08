import { splitOverflowItems } from "@fex-design/core/collection/split-overflow-items"
import type { BadgeGroupOptions } from "@fex-design/core"
import {
  badgeClassName,
  badgeGroupClassName,
} from "@fex-design/components-styles/badge"
import { cn } from "@fex-design/utils"
import { Children, type ComponentProps, type ReactNode } from "react"

export interface BadgeGroupProps extends ComponentProps<"div">, BadgeGroupOptions {
  renderOverflow?: (count: number, items: readonly ReactNode[]) => ReactNode
}

export function BadgeGroup({
  maxCount,
  renderOverflow,
  className,
  children,
  ...props
}: BadgeGroupProps) {
  const split = splitOverflowItems(Children.toArray(children), maxCount)
  return (
    <div {...props} data-slot="badge-group" className={cn(badgeGroupClassName, className)}>
      {split.visibleItems}
      {split.overflowCount > 0 &&
        (renderOverflow?.(split.overflowCount, split.overflowItems) ?? (
          <span data-slot="badge" className={badgeClassName()}>
            +{split.overflowCount}
          </span>
        ))}
    </div>
  )
}
