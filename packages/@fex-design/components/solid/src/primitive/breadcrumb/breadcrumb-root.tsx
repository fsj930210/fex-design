import { breadcrumbClassName } from "@fex-design/components-styles/breadcrumb"
import { cn } from "@fex-design/utils"
import { splitProps, type JSX, type ParentProps } from "solid-js"

export type BreadcrumbProps = ParentProps<JSX.HTMLAttributes<HTMLElement>>
export type BreadcrumbRootProps = BreadcrumbProps

export function Breadcrumb(props: BreadcrumbProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <nav
      {...rest}
      aria-label="Breadcrumb"
      class={cn(breadcrumbClassName({}), local.class)}
      data-slot="breadcrumb"
    >
      {local.children}
    </nav>
  )
}

export { Breadcrumb as BreadcrumbRoot }
