import {
  isBadgePresetColor,
  type BadgeOptions,
} from "@fex-design/core"
import { badgeClassName } from "@fex-design/components-styles/badge"
import { cn } from "@fex-design/utils"
import type { ComponentProps, ReactNode } from "react"

export interface BadgeProps
  extends Omit<ComponentProps<"span">, "color">, BadgeOptions<ReactNode> {}
export type BadgeRootProps = BadgeProps

export function Badge({
  className,
  color,
  size = "md",
  count,
  showZero = false,
  overflowCount,
  children,
  style,
  ...props
}: BadgeProps) {
  const presetColor = isBadgePresetColor(color) ? color : undefined
  const customColor = color && !presetColor ? color : undefined
  const value =
    typeof count === "number" && overflowCount != null && count > overflowCount
      ? `${overflowCount}+`
      : count
  if (value == null && children == null) return null
  if (value === 0 && !showZero && children == null) return null
  return (
    <span
      data-slot="badge"
      data-color={color}
      data-size={size}
      className={cn(badgeClassName({ color: presetColor, size }), className)}
      style={
        {
          "--badge-color": customColor,
          ...style,
        } as ComponentProps<"span">["style"]
      }
      {...props}
    >
      {value ?? children}
    </span>
  )
}

export { Badge as BadgeRoot }
