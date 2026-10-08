import { tableHeadClassName } from "@fex-design/components-styles/table"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type TableHeadProps = ParentProps<JSX.ThHTMLAttributes<HTMLTableCellElement>>

export function TableHead(props: TableHeadProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return <th {...rest} data-slot="table-head" class={cn(tableHeadClassName, local.class)}>{local.children}</th>
}
