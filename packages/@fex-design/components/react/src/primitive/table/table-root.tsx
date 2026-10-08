import { tableClassName, tableContainerClassName } from "@fex-design/components-styles/table"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type TableProps = ComponentProps<"table">
export type TableRootProps = TableProps

export function TableRoot({ className, ...props }: TableRootProps) {
  return (
    <div data-slot="table-container" className={tableContainerClassName}>
      <table data-slot="table" className={cn(tableClassName, className)} {...props} />
    </div>
  )
}

export const Table = TableRoot
