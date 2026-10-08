import { breadcrumbPageClassName } from "@fex-design/components-styles/breadcrumb"
import { cn } from "@fex-design/utils"
import type { HTMLAttributes } from "react"

export type BreadcrumbPageProps = HTMLAttributes<HTMLSpanElement>

export function BreadcrumbPage({ className, children, ...props }: BreadcrumbPageProps) {
  return (
    <span
      {...props}
      aria-current={props["aria-current"] ?? "page"}
      className={cn(breadcrumbPageClassName, className)}
      data-slot="breadcrumb-page"
    >
      {children}
    </span>
  )
}
