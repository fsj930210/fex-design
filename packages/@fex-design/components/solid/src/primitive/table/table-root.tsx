import { tableClassName, tableContainerClassName } from "@fex-design/components-styles/table"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type TableProps = ParentProps<JSX.TableHTMLAttributes<HTMLTableElement>>
export type TableRootProps = TableProps

export function TableRoot(props: TableRootProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div data-slot="table-container" class={tableContainerClassName}>
      <table {...rest} data-slot="table" class={cn(tableClassName, local.class)}>{local.children}</table>
    </div>
  )
}

export const Table = TableRoot
