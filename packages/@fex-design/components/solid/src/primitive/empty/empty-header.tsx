import { emptyHeaderClassName } from "@fex-design/components-styles/empty"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type EmptyHeaderProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>

export function EmptyHeader(props: EmptyHeaderProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return <div {...rest} data-slot="empty-header" class={cn(emptyHeaderClassName, local.class)}>{local.children}</div>
}
