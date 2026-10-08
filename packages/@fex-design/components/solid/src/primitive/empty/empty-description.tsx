import { emptyDescriptionClassName } from "@fex-design/components-styles/empty"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type EmptyDescriptionProps = ParentProps<JSX.HTMLAttributes<HTMLParagraphElement>>

export function EmptyDescription(props: EmptyDescriptionProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return <p {...rest} data-slot="empty-description" class={cn(emptyDescriptionClassName, local.class)}>{local.children}</p>
}
