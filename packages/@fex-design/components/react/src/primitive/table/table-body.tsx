import { tableBodyClassName } from "@fex-design/components-styles/table"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type TableBodyProps = ComponentProps<"tbody">

export function TableBody({ className, ...props }: TableBodyProps) {
  return <tbody data-slot="table-body" className={cn(tableBodyClassName, className)} {...props} />
}
