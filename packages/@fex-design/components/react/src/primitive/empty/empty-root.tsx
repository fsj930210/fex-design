import { emptyClassName } from "@fex-design/components-styles/empty"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type EmptyProps = ComponentProps<"div">
export type EmptyRootProps = EmptyProps

export function EmptyRoot({ className, ...props }: EmptyRootProps) {
  return <div data-slot="empty" className={cn(emptyClassName, className)} {...props} />
}

export const Empty = EmptyRoot
