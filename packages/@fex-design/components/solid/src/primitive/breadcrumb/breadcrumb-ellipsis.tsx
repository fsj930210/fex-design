import { breadcrumbEllipsisClassName } from "@fex-design/components-styles/breadcrumb"
import { cn } from "@fex-design/utils"
import { splitProps, type JSX, type ParentProps } from "solid-js"

export type BreadcrumbEllipsisProps = ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>

export function BreadcrumbEllipsis(props: BreadcrumbEllipsisProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <span
      {...rest}
      aria-hidden="true"
      class={cn(breadcrumbEllipsisClassName, local.class)}
      data-slot="breadcrumb-ellipsis"
    >
      {local.children ?? "…"}
    </span>
  )
}
