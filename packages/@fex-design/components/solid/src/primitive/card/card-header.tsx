import { cardHeaderClassName } from "@fex-design/components-styles/card"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type CardHeaderProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>

export function CardHeader(props: CardHeaderProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div {...rest} data-slot="card-header" class={cn(cardHeaderClassName, local.class)}>
      {local.children}
    </div>
  )
}
