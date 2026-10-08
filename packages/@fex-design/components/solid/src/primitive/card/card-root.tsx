import { cardClassName } from "@fex-design/components-styles/card"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type CardProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>
export type CardRootProps = CardProps

export function CardRoot(props: CardRootProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div {...rest} data-slot="card" class={cn(cardClassName, local.class)}>
      {local.children}
    </div>
  )
}

export const Card = CardRoot
