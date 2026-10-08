import { cardDescriptionClassName } from "@fex-design/components-styles/card"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type CardDescriptionProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>

export function CardDescription(props: CardDescriptionProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div {...rest} data-slot="card-description" class={cn(cardDescriptionClassName, local.class)}>
      {local.children}
    </div>
  )
}
