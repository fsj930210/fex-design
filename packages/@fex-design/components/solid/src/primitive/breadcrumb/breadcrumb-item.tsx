import { breadcrumbItemClassName } from "@fex-design/components-styles/breadcrumb"
import { cn } from "@fex-design/utils"
import { splitProps, type JSX, type ParentProps } from "solid-js"

export type BreadcrumbItemProps = ParentProps<JSX.LiHTMLAttributes<HTMLLIElement>>

export function BreadcrumbItem(props: BreadcrumbItemProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <li {...rest} class={cn(breadcrumbItemClassName, local.class)} data-slot="breadcrumb-item">
      {local.children}
    </li>
  )
}
