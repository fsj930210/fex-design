import { tableHeaderClassName } from "@fex-design/components-styles/table"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type TableHeaderProps = ComponentProps<"thead">

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return <thead data-slot="table-header" className={cn(tableHeaderClassName, className)} {...props} />
}
