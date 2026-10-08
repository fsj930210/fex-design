import { breadcrumbSeparatorClassName } from "@fex-design/components-styles/breadcrumb"
import { cn } from "@fex-design/utils"
import type { HTMLAttributes } from "react"

export type BreadcrumbSeparatorProps = HTMLAttributes<HTMLLIElement>

export function BreadcrumbSeparator({
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <li
      {...props}
      aria-hidden="true"
      className={cn(breadcrumbSeparatorClassName, className)}
      data-slot="breadcrumb-separator"
    >
      {children ?? "/"}
    </li>
  )
}
