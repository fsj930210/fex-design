import { emptyHeaderClassName } from "@fex-design/components-styles/empty"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type EmptyHeaderProps = ComponentProps<"div">

export function EmptyHeader({ className, ...props }: EmptyHeaderProps) {
  return <div data-slot="empty-header" className={cn(emptyHeaderClassName, className)} {...props} />
}
