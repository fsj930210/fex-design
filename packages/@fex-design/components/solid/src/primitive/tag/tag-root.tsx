import { isTagPresetColor, type TagOptions, type TagPresetColor } from "@fex-design/core/tag/types"
import { tagClassName } from "@fex-design/components-styles/tag"
import { cn } from "@fex-design/utils"
import { splitProps, type JSX, type ParentProps } from "solid-js"

type TagStyle = JSX.CSSProperties & {
  "--tag-color"?: string
  "--tag-color-foreground"?: string
}

export interface TagProps
  extends ParentProps<Omit<JSX.HTMLAttributes<HTMLSpanElement>, "color">>, TagOptions {}
export type TagRootProps = TagProps

export function TagRoot(props: TagRootProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "style",
    "color",
    "variant",
    "size",
    "disabled",
  ])
  const presetColor = (): TagPresetColor | undefined =>
    isTagPresetColor(local.color) ? local.color : undefined
  const style = (): TagStyle => ({
    ...(local.color && !presetColor() ? { "--tag-color": local.color } : undefined),
    ...(typeof local.style === "object" ? local.style : {}),
  })
  return (
    <span
      {...rest}
      data-slot="tag"
      data-color={presetColor() ?? (local.color ? "custom" : undefined)}
      data-variant={local.variant ?? "filled"}
      data-size={local.size ?? "md"}
      data-disabled={local.disabled ? "true" : undefined}
      class={cn(
        tagClassName({
          variant: local.variant ?? "filled",
          color: presetColor(),
          size: local.size ?? "md",
        }),
        local.class,
      )}
      style={style()}
    />
  )
}

export const Tag = TagRoot
