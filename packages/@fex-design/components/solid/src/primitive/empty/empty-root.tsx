import { emptyClassName } from "@fex-design/components-styles/empty"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type EmptyProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>
export type EmptyRootProps = EmptyProps

export function EmptyRoot(props: EmptyRootProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return <div {...rest} data-slot="empty" class={cn(emptyClassName, local.class)}>{local.children}</div>
}

export const Empty = EmptyRoot
