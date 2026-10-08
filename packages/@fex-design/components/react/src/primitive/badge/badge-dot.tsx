import {
  isBadgePresetColor,
  type BadgeDotOptions,
} from "@fex-design/core"
import {
  badgeDotClassName,
  badgeDotColorClassName,
} from "@fex-design/components-styles/badge"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type BadgeDotProps = Omit<ComponentProps<"span">, "color"> & BadgeDotOptions

export function BadgeDot({
  className,
  color,
  size = "md",
  style,
  ...props
}: BadgeDotProps) {
  const presetColor = isBadgePresetColor(color) ? color : undefined
  const customColor = color && !presetColor ? color : undefined
  return (
    <span
      data-slot="badge-dot"
      data-color={color ?? "default"}
      data-size={size}
      className={cn(
        badgeDotClassName({ size }),
        badgeDotColorClassName({ color: presetColor }),
        className,
      )}
      style={
        {
          "--badge-color": customColor,
          ...style,
        } as ComponentProps<"span">["style"]
      }
      {...props}
    />
  )
}
