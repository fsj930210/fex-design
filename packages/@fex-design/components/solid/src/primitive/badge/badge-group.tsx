import { splitOverflowItems } from "@fex-design/core/collection/split-overflow-items"
import type { BadgeGroupOptions } from "@fex-design/core"
import {
  badgeClassName,
  badgeGroupClassName,
} from "@fex-design/components-styles/badge"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { children, createMemo, For, Show, splitProps } from "solid-js"

export interface BadgeGroupProps
  extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>>, BadgeGroupOptions {
  overflow?: (count: number, items: readonly JSX.Element[]) => JSX.Element
}

export function BadgeGroup(props: BadgeGroupProps) {
  const [local, rest] = splitProps(props, ["class", "children", "maxCount", "overflow"])
  const resolved = children(() => local.children)
  const split = createMemo(() => splitOverflowItems(resolved.toArray(), local.maxCount))
  return (
    <div {...rest} data-slot="badge-group" class={cn(badgeGroupClassName, local.class)}>
      <For each={split().visibleItems}>{(item) => item}</For>
      <Show when={split().overflowCount > 0}>
        {local.overflow?.(split().overflowCount, split().overflowItems) ?? (
          <span data-slot="badge" class={badgeClassName()}>
            +{split().overflowCount}
          </span>
        )}
      </Show>
    </div>
  )
}
