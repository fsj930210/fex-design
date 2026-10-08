import {
  isBadgePresetColor,
  type BadgeRibbonOptions,
} from "@fex-design/core"
import {
  badgeRibbonClassName,
  badgeRibbonColorClassName,
  badgeRibbonTextClassName,
} from "@fex-design/components-styles/badge"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type BadgeRibbonProps = ParentProps<Omit<JSX.HTMLAttributes<HTMLSpanElement>, "color"> & BadgeRibbonOptions>

export function BadgeRibbon(props: BadgeRibbonProps) {
  const [local, rest] = splitProps(props, ["class", "style", "children", "color", "placement"])
  return (
    <span
      {...rest}
      data-slot="badge-ribbon"
      data-color={local.color ?? "primary"}
      data-placement={local.placement ?? "end"}
      class={cn(
        badgeRibbonClassName,
        badgeRibbonColorClassName({
          color: isBadgePresetColor(local.color) ? local.color : "primary",
        }),
        local.class,
      )}
      style={{
        ...(typeof local.style === "object" ? local.style : {}),
        "--badge-color": local.color && !isBadgePresetColor(local.color) ? local.color : undefined,
      }}
    >
      <span data-slot="badge-ribbon-text" class={badgeRibbonTextClassName}>
        {local.children}
      </span>
    </span>
  )
}
