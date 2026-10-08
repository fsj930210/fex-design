import { cardFooterClassName } from "@fex-design/components-styles/card"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type CardFooterProps = ComponentProps<"div">

export function CardFooter({ className, ...props }: CardFooterProps) {
  return <div data-slot="card-footer" className={cn(cardFooterClassName, className)} {...props} />
}
