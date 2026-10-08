import { tableCaptionClassName } from "@fex-design/components-styles/table"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type TableCaptionProps = ParentProps<JSX.HTMLAttributes<HTMLElement>>

export function TableCaption(props: TableCaptionProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return <caption {...rest} data-slot="table-caption" class={cn(tableCaptionClassName, local.class)}>{local.children}</caption>
}
