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
import type { ComponentProps } from "react"

export interface BadgeRibbonProps
  extends Omit<ComponentProps<"span">, "color">, BadgeRibbonOptions {}

export function BadgeRibbon({
  color = "primary",
  placement = "end",
  className,
  children,
  style,
  ...props
}: BadgeRibbonProps) {
  const presetColor = isBadgePresetColor(color) ? color : undefined
  const customColor = color && !presetColor ? color : undefined
  return (
    <span
      {...props}
      data-slot="badge-ribbon"
      data-color={color}
      data-placement={placement}
      className={cn(
        badgeRibbonClassName,
        badgeRibbonColorClassName({ color: presetColor ?? "primary" }),
        className,
      )}
      style={{ "--badge-color": customColor, ...style } as ComponentProps<"div">["style"]}
    >
      <span data-slot="badge-ribbon-text" className={badgeRibbonTextClassName}>
        {children}
      </span>
    </span>
  )
}
