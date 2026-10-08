import { breadcrumbLinkClassName } from "@fex-design/components-styles/breadcrumb"
import { cn } from "@fex-design/utils"
import { splitProps, type JSX, type ParentProps } from "solid-js"

export type BreadcrumbLinkProps = ParentProps<JSX.AnchorHTMLAttributes<HTMLAnchorElement>>

export function BreadcrumbLink(props: BreadcrumbLinkProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <a {...rest} class={cn(breadcrumbLinkClassName, local.class)} data-slot="breadcrumb-link">
      {local.children}
    </a>
  )
}
