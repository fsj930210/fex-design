import { cardContentClassName } from "@fex-design/components-styles/card"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type CardContentProps = ComponentProps<"div">

export function CardContent({ className, ...props }: CardContentProps) {
  return <div data-slot="card-content" className={cn(cardContentClassName, className)} {...props} />
}
