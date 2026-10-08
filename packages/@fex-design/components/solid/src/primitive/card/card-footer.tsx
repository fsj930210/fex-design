import { cardFooterClassName } from "@fex-design/components-styles/card"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type CardFooterProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>

export function CardFooter(props: CardFooterProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div {...rest} data-slot="card-footer" class={cn(cardFooterClassName, local.class)}>
      {local.children}
    </div>
  )
}
