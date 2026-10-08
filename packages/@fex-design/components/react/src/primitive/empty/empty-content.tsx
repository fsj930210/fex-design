import { emptyContentClassName } from "@fex-design/components-styles/empty"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type EmptyContentProps = ComponentProps<"div">

export function EmptyContent({ className, ...props }: EmptyContentProps) {
  return (
    <div data-slot="empty-content" className={cn(emptyContentClassName, className)} {...props} />
  )
}
