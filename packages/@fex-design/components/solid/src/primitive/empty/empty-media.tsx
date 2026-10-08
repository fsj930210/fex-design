import { emptyMediaClassName } from "@fex-design/components-styles/empty"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type EmptyMediaProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>

export function EmptyMedia(props: EmptyMediaProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return <div {...rest} data-slot="empty-media" class={cn(emptyMediaClassName, local.class)}>{local.children}</div>
}
