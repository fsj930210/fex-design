import { isTagPresetColor, type TagOptions, type TagPresetColor } from "@fex-design/core/tag/types"
import { tagClassName } from "@fex-design/components-styles/tag"
import { cn } from "@fex-design/utils"
import type { ComponentProps, CSSProperties } from "react"

type TagCSSProperties = CSSProperties & {
  "--tag-color"?: string
  "--tag-color-foreground"?: string
}

export interface TagProps extends Omit<ComponentProps<"span">, "color">, TagOptions {}
export type TagRootProps = TagProps

export function TagRoot({
  color,
  variant = "filled",
  size = "md",
  disabled = false,
  className,
  style,
  ...props
}: TagRootProps) {
  const presetColor: TagPresetColor | undefined = isTagPresetColor(color) ? color : undefined
  const mergedStyle: TagCSSProperties = {
    ...(color && !presetColor ? { "--tag-color": color } : undefined),
    ...style,
  }
  return (
    <span
      {...props}
      data-slot="tag"
      data-color={presetColor ?? (color ? "custom" : undefined)}
      data-variant={variant}
      data-size={size}
      data-disabled={disabled ? "true" : undefined}
      className={cn(tagClassName({ variant, color: presetColor, size }), className)}
      style={mergedStyle}
    />
  )
}

export const Tag = TagRoot
