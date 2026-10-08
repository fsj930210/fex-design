import { emptyDescriptionClassName } from "@fex-design/components-styles/empty"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type EmptyDescriptionProps = ComponentProps<"p">

export function EmptyDescription({ className, ...props }: EmptyDescriptionProps) {
  return (
    <p
      data-slot="empty-description"
      className={cn(emptyDescriptionClassName, className)}
      {...props}
    />
  )
}
