import { tableCellClassName } from "@fex-design/components-styles/table"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type TableCellProps = ParentProps<JSX.TdHTMLAttributes<HTMLTableCellElement>>

export function TableCell(props: TableCellProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return <td {...rest} data-slot="table-cell" class={cn(tableCellClassName, local.class)}>{local.children}</td>
}
