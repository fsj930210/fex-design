import { breadcrumbListClassName } from "@fex-design/components-styles/breadcrumb"
import { cn } from "@fex-design/utils"
import { splitProps, type JSX, type ParentProps } from "solid-js"

export type BreadcrumbListProps = ParentProps<JSX.OlHTMLAttributes<HTMLOListElement>>

export function BreadcrumbList(props: BreadcrumbListProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <ol {...rest} class={cn(breadcrumbListClassName, local.class)} data-slot="breadcrumb-list">
      {local.children}
    </ol>
  )
}
