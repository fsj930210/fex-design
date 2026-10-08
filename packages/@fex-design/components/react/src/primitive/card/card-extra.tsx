import { cardExtraClassName } from "@fex-design/components-styles/card"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type CardExtraProps = ComponentProps<"div">

export function CardExtra({ className, ...props }: CardExtraProps) {
  return <div data-slot="card-extra" className={cn(cardExtraClassName, className)} {...props} />
}
