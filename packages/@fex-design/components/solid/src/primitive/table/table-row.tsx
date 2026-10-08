import { tableRowClassName } from "@fex-design/components-styles/table"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type TableRowProps = ParentProps<JSX.HTMLAttributes<HTMLTableRowElement>>

export function TableRow(props: TableRowProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return <tr {...rest} data-slot="table-row" class={cn(tableRowClassName, local.class)}>{local.children}</tr>
}
