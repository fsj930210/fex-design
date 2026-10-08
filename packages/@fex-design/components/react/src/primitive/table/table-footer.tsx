import { tableFooterClassName } from "@fex-design/components-styles/table"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type TableFooterProps = ComponentProps<"tfoot">

export function TableFooter({ className, ...props }: TableFooterProps) {
  return <tfoot data-slot="table-footer" className={cn(tableFooterClassName, className)} {...props} />
}
