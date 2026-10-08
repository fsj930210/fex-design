import { tableCaptionClassName } from "@fex-design/components-styles/table"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type TableCaptionProps = ComponentProps<"caption">

export function TableCaption({ className, ...props }: TableCaptionProps) {
  return <caption data-slot="table-caption" className={cn(tableCaptionClassName, className)} {...props} />
}
