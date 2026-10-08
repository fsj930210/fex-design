import { breadcrumbPageClassName } from "@fex-design/components-styles/breadcrumb"
import { cn } from "@fex-design/utils"
import { splitProps, type JSX, type ParentProps } from "solid-js"

export type BreadcrumbPageProps = ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>

export function BreadcrumbPage(props: BreadcrumbPageProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <span
      {...rest}
      aria-current="page"
      class={cn(breadcrumbPageClassName, local.class)}
      data-slot="breadcrumb-page"
    >
      {local.children}
    </span>
  )
}
