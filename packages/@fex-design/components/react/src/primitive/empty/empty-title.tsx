import { emptyTitleClassName } from "@fex-design/components-styles/empty"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type EmptyTitleProps = ComponentProps<"div">

export function EmptyTitle({ className, ...props }: EmptyTitleProps) {
  return <div data-slot="empty-title" className={cn(emptyTitleClassName, className)} {...props} />
}
