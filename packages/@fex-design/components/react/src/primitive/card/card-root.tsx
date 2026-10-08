import { cardClassName } from "@fex-design/components-styles/card"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type CardProps = ComponentProps<"div">
export type CardRootProps = CardProps

export function CardRoot({ className, ...props }: CardRootProps) {
  return <div data-slot="card" className={cn(cardClassName, className)} {...props} />
}

export const Card = CardRoot
