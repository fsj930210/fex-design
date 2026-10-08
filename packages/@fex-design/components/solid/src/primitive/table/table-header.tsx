import { tableHeaderClassName } from "@fex-design/components-styles/table"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type TableHeaderProps = ParentProps<JSX.HTMLAttributes<HTMLTableSectionElement>>

export function TableHeader(props: TableHeaderProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return <thead {...rest} data-slot="table-header" class={cn(tableHeaderClassName, local.class)}>{local.children}</thead>
}
