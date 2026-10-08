import { tableRowClassName } from "@fex-design/components-styles/table"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type TableRowProps = ComponentProps<"tr">

export function TableRow({ className, ...props }: TableRowProps) {
  return <tr data-slot="table-row" className={cn(tableRowClassName, className)} {...props} />
}
