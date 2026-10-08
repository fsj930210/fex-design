import { cardDescriptionClassName } from "@fex-design/components-styles/card"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type CardDescriptionProps = ComponentProps<"div">

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <div
      data-slot="card-description"
      className={cn(cardDescriptionClassName, className)}
      {...props}
    />
  )
}
