import { cardExtraClassName } from "@fex-design/components-styles/card"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type CardExtraProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>

export function CardExtra(props: CardExtraProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div {...rest} data-slot="card-extra" class={cn(cardExtraClassName, local.class)}>
      {local.children}
    </div>
  )
}
