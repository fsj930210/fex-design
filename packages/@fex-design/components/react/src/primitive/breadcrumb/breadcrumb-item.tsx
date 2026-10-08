import { breadcrumbItemClassName } from "@fex-design/components-styles/breadcrumb"
import { cn } from "@fex-design/utils"
import type { HTMLAttributes } from "react"

export type BreadcrumbItemProps = HTMLAttributes<HTMLLIElement>

export function BreadcrumbItem({ className, children, ...props }: BreadcrumbItemProps) {
  return (
    <li {...props} className={cn(breadcrumbItemClassName, className)} data-slot="breadcrumb-item">
      {children}
    </li>
  )
}
