import { breadcrumbLinkClassName } from "@fex-design/components-styles/breadcrumb"
import { cn } from "@fex-design/utils"
import type { AnchorHTMLAttributes, ReactNode, Ref } from "react"

export type BreadcrumbLinkRenderProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children"
> & { "data-slot": string; ref?: Ref<HTMLAnchorElement> }

export interface BreadcrumbLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children"
> {
  ref?: Ref<HTMLAnchorElement>
  children?: ReactNode | ((props: BreadcrumbLinkRenderProps) => ReactNode)
}

export function BreadcrumbLink({
  children,
  className,
  ref,
  ...props
}: BreadcrumbLinkProps) {
  const linkProps: BreadcrumbLinkRenderProps = {
    ...props,
    className: cn(breadcrumbLinkClassName, className),
    "data-slot": "breadcrumb-link",
    ref,
  }
  return typeof children === "function" ? children(linkProps) : <a {...linkProps}>{children}</a>
}
