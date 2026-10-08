import { breadcrumbSeparatorClassName } from "@fex-design/components-styles/breadcrumb"
import { cn } from "@fex-design/utils"
import { splitProps, type JSX, type ParentProps } from "solid-js"

export type BreadcrumbSeparatorProps = ParentProps<JSX.LiHTMLAttributes<HTMLLIElement>>

export function BreadcrumbSeparator(props: BreadcrumbSeparatorProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <li
      {...rest}
      aria-hidden="true"
      class={cn(breadcrumbSeparatorClassName, local.class)}
      data-slot="breadcrumb-separator"
    >
      {local.children ?? "/"}
    </li>
  )
}
