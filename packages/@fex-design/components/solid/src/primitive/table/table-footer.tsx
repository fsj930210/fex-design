import { tableFooterClassName } from "@fex-design/components-styles/table"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type TableFooterProps = ParentProps<JSX.HTMLAttributes<HTMLTableSectionElement>>

export function TableFooter(props: TableFooterProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return <tfoot {...rest} data-slot="table-footer" class={cn(tableFooterClassName, local.class)}>{local.children}</tfoot>
}
