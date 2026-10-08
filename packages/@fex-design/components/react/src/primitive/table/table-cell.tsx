import { tableCellClassName } from "@fex-design/components-styles/table"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type TableCellProps = ComponentProps<"td">

export function TableCell({ className, ...props }: TableCellProps) {
  return <td data-slot="table-cell" className={cn(tableCellClassName, className)} {...props} />
}
