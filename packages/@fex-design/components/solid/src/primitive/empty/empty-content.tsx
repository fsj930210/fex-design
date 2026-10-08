import { emptyContentClassName } from "@fex-design/components-styles/empty"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type EmptyContentProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>

export function EmptyContent(props: EmptyContentProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return <div {...rest} data-slot="empty-content" class={cn(emptyContentClassName, local.class)}>{local.children}</div>
}
