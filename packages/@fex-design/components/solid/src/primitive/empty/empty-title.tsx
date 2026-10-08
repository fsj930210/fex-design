import { emptyTitleClassName } from "@fex-design/components-styles/empty"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type EmptyTitleProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>

export function EmptyTitle(props: EmptyTitleProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return <div {...rest} data-slot="empty-title" class={cn(emptyTitleClassName, local.class)}>{local.children}</div>
}
