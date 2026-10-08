import { cardContentClassName } from "@fex-design/components-styles/card"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type CardContentProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>

export function CardContent(props: CardContentProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div {...rest} data-slot="card-content" class={cn(cardContentClassName, local.class)}>
      {local.children}
    </div>
  )
}
