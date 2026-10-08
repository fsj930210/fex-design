import { tableBodyClassName } from "@fex-design/components-styles/table"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type TableBodyProps = ParentProps<JSX.HTMLAttributes<HTMLTableSectionElement>>

export function TableBody(props: TableBodyProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return <tbody {...rest} data-slot="table-body" class={cn(tableBodyClassName, local.class)}>{local.children}</tbody>
}
