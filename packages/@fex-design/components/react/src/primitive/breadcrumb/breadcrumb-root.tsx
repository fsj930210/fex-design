import { breadcrumbClassName } from "@fex-design/components-styles/breadcrumb"
import { cn } from "@fex-design/utils"
import type { HTMLAttributes } from "react"

export type BreadcrumbProps = HTMLAttributes<HTMLElement>
export type BreadcrumbRootProps = BreadcrumbProps

export function Breadcrumb({ className, children, ...props }: BreadcrumbProps) {
  return (
    <nav
      {...props}
      aria-label={props["aria-label"] ?? "Breadcrumb"}
      className={cn(breadcrumbClassName({}), className)}
      data-slot="breadcrumb"
    >
      {children}
    </nav>
  )
}

export { Breadcrumb as BreadcrumbRoot }
