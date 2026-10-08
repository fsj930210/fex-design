import { cardTitleClassName } from "@fex-design/components-styles/card"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type CardTitleProps = ComponentProps<"div">

export function CardTitle({ className, ...props }: CardTitleProps) {
  return <div data-slot="card-title" className={cn(cardTitleClassName, className)} {...props} />
}
