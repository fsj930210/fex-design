import {
  isBadgePresetColor,
  type BadgeDotOptions,
} from "@fex-design/core"
import {
  badgeDotClassName,
  badgeDotColorClassName,
} from "@fex-design/components-styles/badge"
import { cn } from "@fex-design/utils"
import type { JSX } from "solid-js"
import { splitProps } from "solid-js"

export type BadgeDotProps = Omit<JSX.HTMLAttributes<HTMLSpanElement>, "color"> & BadgeDotOptions

export function BadgeDot(
  props: BadgeDotProps,
) {
  const [local, rest] = splitProps(props, ["class", "style", "color", "size"])
  return (
    <span
      {...rest}
      data-slot="badge-dot"
      data-color={local.color ?? "default"}
      data-size={local.size ?? "md"}
      class={cn(
        badgeDotClassName({ size: local.size }),
        badgeDotColorClassName({
          color: isBadgePresetColor(local.color) ? local.color : undefined,
        }),
        local.class,
      )}
      style={{
        ...(typeof local.style === "object" ? local.style : {}),
        "--badge-color": local.color && !isBadgePresetColor(local.color) ? local.color : undefined,
      }}
    />
  )
}
