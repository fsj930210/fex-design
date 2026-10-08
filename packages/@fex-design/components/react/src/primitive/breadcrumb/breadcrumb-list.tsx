import { breadcrumbListClassName } from "@fex-design/components-styles/breadcrumb"
import { cn } from "@fex-design/utils"
import type { HTMLAttributes } from "react"

export type BreadcrumbListProps = HTMLAttributes<HTMLOListElement>

export function BreadcrumbList({
  className,
  children,
  ...props
}: BreadcrumbListProps) {
  return (
    <ol {...props} className={cn(breadcrumbListClassName, className)} data-slot="breadcrumb-list">
      {children}
    </ol>
  )
}
