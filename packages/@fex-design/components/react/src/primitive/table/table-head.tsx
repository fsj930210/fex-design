import { tableHeadClassName } from "@fex-design/components-styles/table"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type TableHeadProps = ComponentProps<"th">

export function TableHead({ className, ...props }: TableHeadProps) {
  return <th data-slot="table-head" className={cn(tableHeadClassName, className)} {...props} />
}
