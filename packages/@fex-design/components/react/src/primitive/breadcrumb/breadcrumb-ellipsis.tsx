import { breadcrumbEllipsisClassName } from "@fex-design/components-styles/breadcrumb"
import { cn } from "@fex-design/utils"
import type { HTMLAttributes } from "react"

export type BreadcrumbEllipsisProps = HTMLAttributes<HTMLSpanElement>

export function BreadcrumbEllipsis({
  children,
  className,
  ...props
}: BreadcrumbEllipsisProps) {
  return (
    <span
      {...props}
      aria-hidden="true"
      className={cn(breadcrumbEllipsisClassName, className)}
      data-slot="breadcrumb-ellipsis"
    >
      {children ?? "..."}
    </span>
  )
}
