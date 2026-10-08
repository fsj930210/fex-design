import {
  isBadgePresetColor,
  type BadgeOptions,
} from "@fex-design/core"
import { badgeClassName } from "@fex-design/components-styles/badge"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { Show, splitProps } from "solid-js"

export type BadgeProps = ParentProps<
  Omit<JSX.HTMLAttributes<HTMLSpanElement>, "color"> & BadgeOptions<JSX.Element>
>
export type BadgeRootProps = BadgeProps

export function Badge(props: BadgeProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "style",
    "children",
    "color",
    "size",
    "count",
    "showZero",
    "overflowCount",
  ])
  const value = () =>
    typeof local.count === "number" &&
    local.overflowCount !== undefined &&
    local.count > local.overflowCount
      ? `${local.overflowCount}+`
      : local.count
  const visible = () => value() !== 0 || Boolean(local.showZero) || local.children != null
  return (
    <Show when={visible()}>
      <span
        {...rest}
        data-slot="badge"
        data-color={local.color}
        data-size={local.size ?? "md"}
        class={cn(
          badgeClassName({
            color: isBadgePresetColor(local.color) ? local.color : undefined,
            size: local.size,
          }),
          local.class,
        )}
        style={{
          ...(typeof local.style === "object" ? local.style : {}),
          "--badge-color":
            local.color && !isBadgePresetColor(local.color) ? local.color : undefined,
        }}
      >
        {value() ?? local.children}
      </span>
    </Show>
  )
}

export { Badge as BadgeRoot }
