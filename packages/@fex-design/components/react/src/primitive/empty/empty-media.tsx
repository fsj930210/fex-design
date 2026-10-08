import { emptyMediaClassName } from "@fex-design/components-styles/empty"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type EmptyMediaProps = ComponentProps<"div">

export function EmptyMedia({ className, ...props }: EmptyMediaProps) {
  return <div data-slot="empty-media" className={cn(emptyMediaClassName, className)} {...props} />
}
