import { cardTitleClassName } from "@fex-design/components-styles/card"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type CardTitleProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>

export function CardTitle(props: CardTitleProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div {...rest} data-slot="card-title" class={cn(cardTitleClassName, local.class)}>
      {local.children}
    </div>
  )
}
