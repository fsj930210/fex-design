import { cardHeaderClassName } from "@fex-design/components-styles/card"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type CardHeaderProps = ComponentProps<"div">

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div data-slot="card-header" className={cn(cardHeaderClassName, className)} {...props} />
}
